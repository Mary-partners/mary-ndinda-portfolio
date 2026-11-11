import { prisma } from "@/lib/prisma";
import { DIMENSION_META } from "@/lib/constants";

export async function getCompanyDetail(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      advisor: true,
      programme: true,
      founderProfile: true,
      constraints: true,
      kpis: { include: { definition: true } },
      sessions: { orderBy: { date: "desc" }, include: { advisor: true } },
      plans: {
        orderBy: { priority: "asc" },
        include: { milestones: { orderBy: { order: "asc" } }, tasks: true, evidence: { include: { reviews: true } } },
      },
      assessments: {
        orderBy: { createdAt: "desc" },
        include: { dimensionScores: { include: { dimension: true } } },
      },
    },
  });
  if (!company) return null;

  const finalized = company.assessments.filter((a) => a.status === "finalized");
  const latest = finalized.sort((a, b) => (b.finalizedAt?.getTime() ?? 0) - (a.finalizedAt?.getTime() ?? 0))[0] ?? null;
  const baseline = company.assessments.find((a) => a.isBaseline) ?? null;
  const draft = company.assessments.find((a) => a.status === "draft") ?? null;

  const dimRows = DIMENSION_META.map((d) => {
    const cur = latest?.dimensionScores.find((s) => s.dimension.key === d.key)?.score ?? null;
    const base = baseline?.dimensionScores.find((s) => s.dimension.key === d.key)?.score ?? null;
    return { key: d.key, name: d.name, current: cur, baseline: base, gap: cur !== null ? Math.max(0, 4 - cur) : null };
  });

  return { company, latest, baseline, draft, dimRows };
}
