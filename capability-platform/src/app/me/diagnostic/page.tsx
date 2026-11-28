import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { SelfAssessment } from "@/components/auth/SelfAssessment";
import { itemAt } from "@/lib/mci-v2";
import { getReassessGate } from "@/lib/reassess";

export const dynamic = "force-dynamic";

export default async function FounderDiagnosticPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const company = await prisma.company.findFirst({
    where: { ownerUserId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, legalName: true, tradingName: true, founderName: true, inviteToken: true, org: { select: { name: true } } },
  });
  if (!company || !company.inviteToken) redirect("/me");

  // Already assessed within the 90-day window: send them back to their dashboard,
  // which shows when they can reassess.
  const gate = await getReassessGate(company.id);
  if (gate.hasAssessment && !gate.canStart) redirect("/me");

  const framework = await prisma.framework.findFirst({
    where: { isDefault: true },
    include: {
      dimensions: {
        orderBy: { order: "asc" },
        include: { questions: { orderBy: { order: "asc" }, select: { id: true, text: true, helpText: true, order: true } } },
      },
    },
  });
  if (!framework) redirect("/me");

  const dimensions = framework.dimensions.map((d) => ({
    key: d.key,
    name: d.name,
    description: d.description,
    questions: d.questions.map((q) => {
      const item = itemAt(d.key, q.order);
      return {
        id: q.id,
        text: q.text,
        anchors: item?.anchors ?? [],
        eligibility: item?.eligibility ?? null,
        evidence: item?.evidence ?? null,
      };
    }),
  }));

  return (
    <div className="py-6">
      <SelfAssessment
        embedded
        returnTo="/me"
        token={company.inviteToken}
        companyName={company.tradingName || company.legalName}
        orgName={company.org.name}
        defaultFounder={company.founderName ?? user.name ?? ""}
        dimensions={dimensions}
      />
    </div>
  );
}
