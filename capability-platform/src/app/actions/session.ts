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
  if (!name || !email || password.length < 8) redirect("/setup?error=invalid");
  // The administrator account only — organisations are created inside the app.
  const { user } = await bootstrapOwner(prisma, { name, email, password });
  await login(user.id);
  redirect("/organisations");
}

export async function signOut() {
  await logout();
  redirect("/login");
}

export async function switchOrg(orgId: string) {
  await setActiveOrg(orgId);
  redirect("/overview");
}
