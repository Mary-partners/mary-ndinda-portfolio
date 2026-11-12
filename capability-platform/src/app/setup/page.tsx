import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { SetupForm } from "@/components/auth/SetupForm";

export const dynamic = "force-dynamic";

export default async function SetupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const count = await prisma.user.count();
  if (count > 0) redirect("/login");

  const { error } = await searchParams;

  return (
    <AuthShell footnote="This one-time setup is only available until the first account exists.">
      <SetupForm error={Boolean(error)} />
    </AuthShell>
  );
}
