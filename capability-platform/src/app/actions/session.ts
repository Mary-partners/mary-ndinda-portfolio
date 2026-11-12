"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { login, logout, setActiveOrg } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { bootstrapOwner } from "@/lib/install";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/login?error=missing");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.passwordHash)) redirect("/login?error=invalid");
  await login(user.id);
  redirect("/overview");
}

export async function completeSetup(formData: FormData) {
  const count = await prisma.user.count();
  if (count > 0) redirect("/login");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const orgName = String(formData.get("orgName") ?? "").trim();
  const orgType = String(formData.get("orgType") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  if (!name || !email || password.length < 8 || !orgName) redirect("/setup?error=invalid");
  const { user, org } = await bootstrapOwner(prisma, { name, email, password, orgName, orgType, country });
  await login(user.id);
  await setActiveOrg(org.id);
  redirect("/overview");
}

export async function signOut() {
  await logout();
  redirect("/login");
}

export async function switchOrg(orgId: string) {
  await setActiveOrg(orgId);
  redirect("/overview");
}
