import type { PrismaClient } from "@prisma/client";
import { FRAMEWORK_CONTENT } from "./framework-content";
import { DIMENSION_META } from "./constants";
import { hashPassword } from "./password";

// First-run installation helpers for a real (non-demo) deployment.
// - ensureFramework: installs the default capability framework (product content),
//   idempotently. No sample enterprises are created.
// - bootstrapOwner: creates the very first administrator account + organisation.

const DEFAULT_KPIS: { key: string; name: string; unit: string; category: string; higherIsBetter: boolean }[] = [
  { key: "revenue", name: "Annual revenue", unit: "currency", category: "financial", higherIsBetter: true },
  { key: "gross_margin", name: "Gross margin", unit: "%", category: "financial", higherIsBetter: true },
  { key: "operating_margin", name: "Operating margin", unit: "%", category: "financial", higherIsBetter: true },
  { key: "cash_runway", name: "Cash runway", unit: "months", category: "financial", higherIsBetter: true },
  { key: "customer_retention", name: "Customer retention", unit: "%", category: "commercial", higherIsBetter: true },
  { key: "employee_turnover", name: "Employee turnover", unit: "%", category: "people", higherIsBetter: false },
];

export async function ensureFramework(prisma: PrismaClient) {
  let framework = await prisma.framework.findFirst({ where: { isDefault: true } });
  if (!framework) {
    framework = await prisma.framework.create({
      data: { name: "MCL SME Capability Framework", version: "1.0", isDefault: true, orgId: null },
    });
    for (let i = 0; i < DIMENSION_META.length; i++) {
      const meta = DIMENSION_META[i];
      const dim = await prisma.dimension.create({
        data: { frameworkId: framework.id, key: meta.key, name: meta.name, description: meta.description, weight: 1, order: i + 1 },
      });
      const content = FRAMEWORK_CONTENT.find((c) => c.key === meta.key);
      if (content) {
        for (let q = 0; q < content.questions.length; q++) {
          const sq = content.questions[q];
          await prisma.question.create({
            data: { dimensionId: dim.id, text: sq.text, helpText: sq.helpText, weight: sq.weight ?? 1, order: q + 1, appliesTo: sq.appliesTo },
          });
        }
      }
    }
  }
  for (const k of DEFAULT_KPIS) {
    await prisma.kpiDefinition.upsert({ where: { key: k.key }, update: {}, create: k });
  }
  return framework;
}

export interface OwnerInput {
  name: string;
  email: string;
  password: string;
  orgName: string;
  orgType: string;
  country: string;
}

export async function bootstrapOwner(prisma: PrismaClient, input: OwnerInput) {
  const count = await prisma.user.count();
  if (count > 0) throw new Error("ALREADY_INITIALISED");

  const org = await prisma.organisation.create({
    data: { name: input.orgName.trim(), type: input.orgType.trim() || "Organisation", country: input.country.trim() || "—" },
  });
  const user = await prisma.user.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      role: "ADMIN",
      isPlatformAdmin: true,
      title: "Platform Administrator",
      passwordHash: hashPassword(input.password),
    },
  });
  await prisma.membership.create({ data: { userId: user.id, orgId: org.id, role: "ADMIN" } });
  await ensureFramework(prisma);
  await prisma.auditLog.create({
    data: { userId: user.id, orgId: org.id, entity: "User", entityId: user.id, action: "setup.owner", detail: "Initial administrator account and organisation created." },
  });
  return { user, org };
}
