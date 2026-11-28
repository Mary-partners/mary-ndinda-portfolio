"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { login, logout, setActiveOrg } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { bootstrapOwner } from "@/lib/install";

// Basic brute-force protection: cap failed attempts per email in a rolling window.
const LOGIN_WINDOW_MIN = 15;
const LOGIN_MAX_FAILS = 8;

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/login?error=missing");

  const since = new Date(Date.now() - LOGIN_WINDOW_MIN * 60 * 1000);
  const recentFails = await prisma.auditLog.count({
    where: { action: "login.failed", detail: email, createdAt: { gt: since } },
  });
  if (recentFails >= LOGIN_MAX_FAILS) redirect("/login?error=throttled");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    await prisma.auditLog.create({ data: { entity: "User", action: "login.failed", detail: email } });
    redirect("/login?error=invalid");
  }

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
  // The administrator account only; organisations are created inside the app.
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
