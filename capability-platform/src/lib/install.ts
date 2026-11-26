import type { PrismaClient } from "@prisma/client";
import { MCI_ITEMS, PILLAR_ORDER, PILLAR_NAMES, RUBRIC_VERSION } from "./mci-v2";
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

const FRAMEWORK_NAME = "Management Capital Index";

// Ensure the revised (v2) rubric is installed as the default framework.
// Legacy frameworks and their historical assessments are preserved unchanged;
// this adds the v2 framework if missing and makes it the single default.
export async function ensureFramework(prisma: PrismaClient) {
  let framework = await prisma.framework.findFirst({ where: { name: FRAMEWORK_NAME, version: RUBRIC_VERSION } });
  if (!framework) {
    framework = await prisma.framework.create({
      data: { name: FRAMEWORK_NAME, version: RUBRIC_VERSION, isDefault: true, orgId: null },
    });
    for (let i = 0; i < PILLAR_ORDER.length; i++) {
      const key = PILLAR_ORDER[i];
      const dim = await prisma.dimension.create({
        data: { frameworkId: framework.id, key, name: PILLAR_NAMES[key], description: null, weight: 1, order: i + 1 },
      });
      const items = MCI_ITEMS.filter((it) => it.pillar === key).sort((a, b) => a.order - b.order);
      for (const it of items) {
        await prisma.question.create({
          data: { dimensionId: dim.id, text: it.question, helpText: null, weight: 1, order: it.order },
        });
      }
    }
  }
  // v2 is the single default; demote any other default framework (legacy stays usable for its history).
  await prisma.framework.updateMany({ where: { id: { not: framework.id }, isDefault: true }, data: { isDefault: false } });
  if (!framework.isDefault) {
    framework = await prisma.framework.update({ where: { id: framework.id }, data: { isDefault: true } });
  }
  for (const k of DEFAULT_KPIS) {
    await prisma.kpiDefinition.upsert({ where: { key: k.key }, update: {}, create: k });
  }
  return framework;
}

const PUBLIC_ORG_NAME = "Public self-assessments";

// The organisation that holds founder-initiated public self-assessments.
// Created on demand; every platform administrator is added as a member so they
// can see the incoming assessments (via the org switcher).
export async function ensurePublicOrg(prisma: PrismaClient) {
  let org = await prisma.organisation.findFirst({ where: { name: PUBLIC_ORG_NAME } });
  if (!org) {
    org = await prisma.organisation.create({
      data: { name: PUBLIC_ORG_NAME, type: "Research intake", country: null, description: "Founder-initiated self-assessments taken from the public website." },
    });
  }
  const admins = await prisma.user.findMany({ where: { isPlatformAdmin: true }, select: { id: true } });
  for (const a of admins) {
    await prisma.membership.upsert({
      where: { userId_orgId_role: { userId: a.id, orgId: org.id, role: "ADMIN" } },
      update: {},
      create: { userId: a.id, orgId: org.id, role: "ADMIN" },
    });
  }
  return org;
}

export interface OwnerInput {
  name: string;
  email: string;
  password: string;
  // Optional: the platform administrator does not have to belong to a tenant
  // organisation. Organisations (the funds/accelerators/ESOs being supported)
  // are created inside the app after setup.
  orgName?: string;
  orgType?: string;
  country?: string;
}

export async function bootstrapOwner(prisma: PrismaClient, input: OwnerInput) {
  const count = await prisma.user.count();
  if (count > 0) throw new Error("ALREADY_INITIALISED");

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

  let org = null;
  const orgName = input.orgName?.trim();
  if (orgName) {
    org = await prisma.organisation.create({
      data: { name: orgName, type: input.orgType?.trim() || "Organisation", country: input.country?.trim() || null },
    });
    await prisma.membership.create({ data: { userId: user.id, orgId: org.id, role: "ADMIN" } });
  }

  await ensureFramework(prisma);
  await prisma.auditLog.create({
    data: { userId: user.id, orgId: org?.id ?? null, entity: "User", entityId: user.id, action: "setup.owner", detail: "Initial administrator account created." },
  });
  return { user, org };
}
