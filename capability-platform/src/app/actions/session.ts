"use server";

import { redirect } from "next/navigation";
import { login, logout, setActiveOrg } from "@/lib/auth";

export async function loginAs(userId: string) {
  await login(userId);
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
