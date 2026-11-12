"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, can } from "@/lib/auth";
import { hashPassword } from "@/lib/password";

async function audit(userId: string, orgId: string, entity: string, entityId: string, action: string, detail?: string) {
  await prisma.auditLog.create({ data: { userId, orgId, entity, entityId, action, detail } });
}

const s = (v: FormDataEntryValue | null) => String(v ?? "").trim();
const n = (v: FormDataEntryValue | null) => {
  const t = String(v ?? "").trim().replace(/[, ]/g, "");
  if (!t) return null;
  const num = Number(t);
  return Number.isFinite(num) ? num : null;
};

// ---- Organisations ----
export async function createOrganisation(formData: FormData) {
  const user = await requireUser();
  if (!can(user, "org.manage")) throw new Error("FORBIDDEN");
  const name = s(formData.get("name"));
  if (!name) return;
  const org = await prisma.organisation.create({
    data: {
      name,
      type: s(formData.get("type")) || "Organisation",
      country: s(formData.get("country")) || "—",
      description: s(formData.get("description")) || null,
    },
  });
  await prisma.membership.create({ data: { userId: user.id, orgId: org.id, role: "ADMIN" } });
  await audit(user.id, org.id, "Organisation", org.id, "create", name);
  revalidatePath("/organisations");
  revalidatePath("/overview");
}

// ---- Programmes ----
export async function createProgramme(formData: FormData) {
  const user = await requireUser();
  if (!can(user, "programme.manage")) throw new Error("FORBIDDEN");
  const name = s(formData.get("name"));
  if (!name) return;
  const programme = await prisma.programme.create({
    data: {
      orgId: user.activeOrgId,
      name,
      fundingPartner: s(formData.get("fundingPartner")) || null,
      objectives: s(formData.get("objectives")) || null,
      sectorCoverage: s(formData.get("sectorCoverage")) || null,
      geography: s(formData.get("geography")) || null,
      targetEnterprises: n(formData.get("targetEnterprises")),
      budget: n(formData.get("budget")),
      reportingCadence: s(formData.get("reportingCadence")) || null,
      frameworkVersion: "1.0",
      status: s(formData.get("status")) || "Active",
    },
  });
  await audit(user.id, user.activeOrgId, "Programme", programme.id, "create", name);
  revalidatePath("/organisations");
  revalidatePath("/overview");
}

// ---- Companies (enterprises) ----
export async function createCompany(formData: FormData) {
  const user = await requireUser();
  if (!can(user, "company.manage")) throw new Error("FORBIDDEN");
  const legalName = s(formData.get("legalName"));
  if (!legalName) return;
  const programmeId = s(formData.get("programmeId")) || null;
  // Guard: programme must belong to the active org.
  if (programmeId) {
    const prog = await prisma.programme.findUnique({ where: { id: programmeId }, select: { orgId: true } });
    if (!prog || prog.orgId !== user.activeOrgId) throw new Error("FORBIDDEN");
  }
  const vision = s(formData.get("founderVision"));
  const objectiveType = s(formData.get("founderObjectiveType"));
  const company = await prisma.company.create({
    data: {
      orgId: user.activeOrgId,
      programmeId,
      legalName,
      tradingName: s(formData.get("tradingName")) || null,
      country: s(formData.get("country")) || "—",
      region: s(formData.get("region")) || null,
      sector: s(formData.get("sector")) || "—",
      subsector: s(formData.get("subsector")) || null,
      yearEstablished: n(formData.get("yearEstablished")),
      businessModel: s(formData.get("businessModel")) || null,
      stage: s(formData.get("stage")) || null,
      employees: n(formData.get("employees")),
      founderName: s(formData.get("founderName")) || null,
      isDemo: false,
      ...(vision || objectiveType
        ? { founderProfile: { create: { threeYearVision: vision || null, objectiveType: objectiveType || null } } }
        : {}),
    },
  });
  await audit(user.id, user.activeOrgId, "Company", company.id, "create", legalName);
  revalidatePath("/portfolio");
  revalidatePath("/overview");
}

// ---- Team members ----
export async function createUser(formData: FormData) {
  const user = await requireUser();
  if (!can(user, "user.manage")) throw new Error("FORBIDDEN");
  const name = s(formData.get("name"));
  const email = s(formData.get("email")).toLowerCase();
  const role = s(formData.get("role")) || "ADVISOR";
  const password = String(formData.get("password") ?? "");
  const title = s(formData.get("title")) || null;
  if (!name || !email || password.length < 8) return;

  const existing = await prisma.user.findUnique({ where: { email } });
  let target = existing;
  if (!target) {
    target = await prisma.user.create({
      data: { name, email, role, title, passwordHash: hashPassword(password) },
    });
  }
  // Add membership to the active org (idempotent on the unique [userId, orgId, role]).
  await prisma.membership.upsert({
    where: { userId_orgId_role: { userId: target.id, orgId: user.activeOrgId, role } },
    update: {},
    create: { userId: target.id, orgId: user.activeOrgId, role },
  });
  await audit(user.id, user.activeOrgId, "User", target.id, existing ? "member.add" : "create", `${email} (${role})`);
  revalidatePath("/organisations");
  revalidatePath("/settings");
}
