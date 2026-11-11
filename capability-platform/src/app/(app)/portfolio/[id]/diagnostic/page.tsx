import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser, assertCompanyAccess, can } from "@/lib/auth";
import { PageHeader } from "@/components/ui/Page";
import { DiagnosticEditor } from "@/components/DiagnosticEditor";
import { MATURITY_ANCHORS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function DiagnosticPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ assessment?: string }>;
}) {
  const { id } = await params;
  const { assessment: assessmentParam } = await searchParams;
  const user = await requireUser();
  await assertCompanyAccess(id, user).catch(() => notFound());

  const company = await prisma.company.findUnique({ where: { id }, select: { id: true, legalName: true, tradingName: true } });
  if (!company) notFound();

  // Pick assessment: explicit param, else the open draft, else the latest finalized.
  let assessment = assessmentParam
    ? await prisma.assessment.findUnique({ where: { id: assessmentParam } })
    : null;
  if (!assessment) {
    assessment =
      (await prisma.assessment.findFirst({ where: { companyId: id, status: "draft" }, orderBy: { createdAt: "desc" } })) ??
      (await prisma.assessment.findFirst({ where: { companyId: id, status: "finalized" }, orderBy: { finalizedAt: "desc" } }));
  }
  if (!assessment || assessment.companyId !== id) notFound();

  const framework = await prisma.framework.findUnique({
    where: { id: assessment.frameworkId },
    include: { dimensions: { orderBy: { order: "asc" }, include: { questions: { orderBy: { order: "asc" } } } } },
  });
  if (!framework) notFound();

  const responses = await prisma.response.findMany({ where: { assessmentId: assessment.id } });
  const respMap: Record<string, { score: number | null; applicable: boolean; evidenceStatus: string }> = {};
  for (const r of responses) respMap[r.questionId] = { score: r.score, applicable: r.applicable, evidenceStatus: r.evidenceStatus };

  const editable = assessment.status === "draft" && can(user, "assessment.edit");
  const dims = framework.dimensions.map((d) => ({
    id: d.id, key: d.key, name: d.name, weight: d.weight,
    questions: d.questions.map((q) => ({ id: q.id, text: q.text, helpText: q.helpText, weight: q.weight })),
  }));

  return (
    <>
      <PageHeader
        title={`Diagnostic — ${company.tradingName ?? company.legalName}`}
        subtitle={`${assessment.label ?? assessment.type} · ${assessment.status === "draft" ? "Editable draft" : "Finalised (read-only)"} · Framework v${assessment.frameworkVersion}`}
        actions={<Link href={`/portfolio/${id}`} className="btn-ghost">Back to company</Link>}
      />

      <div className="mb-4 flex flex-wrap gap-2 rounded-lg border border-navy/10 bg-white p-3 text-xs text-ink-muted">
        <span className="font-semibold text-navy-700">Maturity anchors:</span>
        {MATURITY_ANCHORS.map((a) => (
          <span key={a.score}><strong className="text-navy-600">{a.score}</strong> {a.label}</span>
        ))}
        <span className="ml-auto italic">Custom SME anchors — not the official WMS scale.</span>
      </div>

      <DiagnosticEditor
        assessmentId={assessment.id}
        companyId={id}
        editable={editable}
        canFinalize={can(user, "assessment.finalize")}
        dimensions={dims}
        initial={respMap}
      />
    </>
  );
}
