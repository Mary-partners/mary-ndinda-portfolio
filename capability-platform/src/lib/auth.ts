import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "./prisma";

const UID_COOKIE = "cap_uid";
const ORG_COOKIE = "cap_org";

function sessionSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return s;
  // Never sign real sessions with the weak development default in production.
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is not configured; refusing to sign sessions with an insecure default.");
  }
  return "dev-secret";
}
function sign(value: string): string {
  const mac = crypto.createHmac("sha256", sessionSecret()).update(value).digest("hex").slice(0, 16);
  return `${value}.${mac}`;
}
function verify(signed: string | undefined): string | null {
  if (!signed) return null;
  const idx = signed.lastIndexOf(".");
  if (idx < 0) return null;
  const value = signed.slice(0, idx);
  if (sign(value) === signed) return value;
  return null;
}

const COOKIE_OPTS = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 12 };

export async function login(userId: string) {
  const store = await cookies();
  store.set(UID_COOKIE, sign(userId), COOKIE_OPTS);
}
export async function logout() {
  const store = await cookies();
  store.delete(UID_COOKIE);
  store.delete(ORG_COOKIE);
}
export async function setActiveOrg(orgId: string) {
  const store = await cookies();
  store.set(ORG_COOKIE, sign(orgId), COOKIE_OPTS);
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string | null;
  isPlatformAdmin: boolean;
  memberships: { orgId: string; role: string; orgName: string }[];
  activeOrgId: string;
  activeRole: string;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const uid = verify(store.get(UID_COOKIE)?.value);
  if (!uid) return null;
  const user = await prisma.user.findUnique({
    where: { id: uid },
    include: { memberships: { include: { org: true } } },
  });
  if (!user) return null;
  const memberships = user.memberships.map((m) => ({ orgId: m.orgId, role: m.role, orgName: m.org.name }));
  const activeOrgId = verify(store.get(ORG_COOKIE)?.value) ?? memberships[0]?.orgId ?? "";
  const activeRole = memberships.find((m) => m.orgId === activeOrgId)?.role ?? user.role;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    title: user.title,
    isPlatformAdmin: user.isPlatformAdmin,
    memberships,
    activeOrgId,
    activeRole,
  };
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

// Tenant guard: ensure a company belongs to the user's active org (platform admins pass).
export async function assertCompanyAccess(companyId: string, user: SessionUser): Promise<void> {
  const company = await prisma.company.findUnique({ where: { id: companyId }, select: { orgId: true } });
  if (!company) throw new Error("NOT_FOUND");
  if (user.isPlatformAdmin) return;
  const allowed = user.memberships.some((m) => m.orgId === company.orgId);
  if (!allowed) throw new Error("FORBIDDEN");
}

export function can(user: SessionUser, action: string): boolean {
  const role = user.activeRole;
  if (user.isPlatformAdmin) return true;
  const matrix: Record<string, string[]> = {
    "assessment.edit": ["ADVISOR", "PROGRAM_MANAGER", "FOUNDER"],
    "assessment.finalize": ["ADVISOR", "PROGRAM_MANAGER"],
    "plan.edit": ["ADVISOR", "PROGRAM_MANAGER"],
    "implementation.update": ["ADVISOR", "PROGRAM_MANAGER", "FOUNDER"],
    "evidence.submit": ["FOUNDER", "ADVISOR"],
    "evidence.verify": ["REVIEWER", "PROGRAM_MANAGER"],
    "session.create": ["ADVISOR", "PROGRAM_MANAGER"],
    "programme.manage": ["PROGRAM_MANAGER", "ADMIN"],
    "org.manage": ["ADMIN"],
    "company.manage": ["PROGRAM_MANAGER", "ADMIN"],
    "user.manage": ["ADMIN"],
  };
  return (matrix[action] ?? []).includes(role);
}
