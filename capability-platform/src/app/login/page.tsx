import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const existing = await getCurrentUser();
  if (existing) redirect("/overview");

  const userCount = await prisma.user.count();
  if (userCount === 0) redirect("/setup");

  const { error } = await searchParams;
  const message = error === "invalid" ? "Incorrect email or password." : error ? "Please enter your email and password." : null;

  return (
    <AuthShell footnote="Capability intelligence for African SME support programmes">
      <SignInForm message={message} />
    </AuthShell>
  );
}
