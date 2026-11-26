import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/app/actions/session";
import { FounderShell } from "@/components/founder/FounderShell";

export const dynamic = "force-dynamic";

export default async function MeLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const company = await prisma.company.findFirst({
    where: { ownerUserId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, tradingName: true, legalName: true, assessments: { where: { status: "finalized" }, select: { id: true }, take: 1 } },
  });
  const assessed = (company?.assessments.length ?? 0) > 0;

  return (
    <FounderShell
      userName={user.name}
      businessName={company?.tradingName || company?.legalName || "Your business"}
      companyId={company?.id ?? null}
      assessed={assessed}
      signOutAction={signOut}
    >
      {children}
    </FounderShell>
  );
}
