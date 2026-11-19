import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SelfAssessment } from "@/components/auth/SelfAssessment";

export const dynamic = "force-dynamic";

export default async function AssessPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const company = await prisma.company.findUnique({
    where: { inviteToken: token },
    select: { legalName: true, tradingName: true, founderName: true, org: { select: { name: true } } },
  });
  if (!company) notFound();

  const framework = await prisma.framework.findFirst({
    where: { isDefault: true },
    include: {
      dimensions: {
        orderBy: { order: "asc" },
        include: { questions: { orderBy: { order: "asc" }, select: { id: true, text: true, helpText: true } } },
      },
    },
  });
  if (!framework) notFound();

  const dimensions = framework.dimensions.map((d) => ({
    key: d.key, name: d.name, description: d.description,
    questions: d.questions.map((q) => ({ id: q.id, text: q.text, helpText: q.helpText })),
  }));

  return (
    <SelfAssessment
      token={token}
      companyName={company.tradingName || company.legalName}
      orgName={company.org.name}
      defaultFounder={company.founderName ?? ""}
      dimensions={dimensions}
    />
  );
}
