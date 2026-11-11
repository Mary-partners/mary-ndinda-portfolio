import { prisma } from "./prisma";
import { maturityBand } from "./utils";
import { DIMENSION_META } from "./constants";

// Latest finalized assessment per company (baseline or follow-up).
export async function latestAssessments(orgId: string) {
  const companies = await prisma.company.findMany({
    where: { orgId },
    include: {
      assessments: {
        where: { status: "finalized" },
        orderBy: { finalizedAt: "desc" },
        include: { dimensionScores: { include: { dimension: true } } },
      },
      advisor: true,
      programme: true,
    },
    orderBy: { legalName: "asc" },
  });
  return companies.map((c) => {
    const sorted = [...c.assessments].sort(
      (a, b) => (b.finalizedAt?.getTime() ?? 0) - (a.finalizedAt?.getTime() ?? 0)
    );
    const latest = sorted[0] ?? null;
    const baseline = c.assessments.find((a) => a.isBaseline) ?? null;
    return { company: c, latest, baseline };
  });
}

export async function getPortfolioStats(orgId: string) {
  const rows = await latestAssessments(orgId);
  const totalEnterprises = rows.length;
  const assessed = rows.filter((r) => r.latest).length;

  const maturities = rows.map((r) => r.latest?.overallScore ?? null).filter((n): n is number => n !== null);
  const avgMaturity = maturities.length ? maturities.reduce((a, b) => a + b, 0) / maturities.length : null;

  // Baseline avg for change
  const baselineScores = rows.map((r) => r.baseline?.overallScore ?? null).filter((n): n is number => n !== null);
  const avgBaseline = baselineScores.length ? baselineScores.reduce((a, b) => a + b, 0) / baselineScores.length : null;

  // Distribution by band
  const bands = ["Absent", "Informal", "Introduced", "Consistent", "Embedded"];
  const distribution = bands.map((band) => ({
    band,
    count: maturities.filter((m) => maturityBand(m).label === band).length,
  }));

  // Dimension averages across latest assessments
  const dimSums: Record<string, { sum: number; n: number }> = {};
  for (const r of rows) {
    if (!r.latest) continue;
    for (const ds of r.latest.dimensionScores) {
      const key = ds.dimension.key;
      dimSums[key] = dimSums[key] ?? { sum: 0, n: 0 };
      dimSums[key].sum += ds.score;
      dimSums[key].n += 1;
    }
  }
  const dimensionAverages = DIMENSION_META.map((d) => ({
    name: d.name,
    key: d.key,
    score: dimSums[d.key] ? dimSums[d.key].sum / dimSums[d.key].n : null,
  }));

  // Implementation + evidence counts
  const [plans, milestones, verifiedMilestones, evidence, verifiedEvidence, overdueMilestones, companiesWithVerified] =
    await Promise.all([
      prisma.improvementPlan.count({ where: { company: { orgId } } }),
      prisma.milestone.count({ where: { plan: { company: { orgId } } } }),
      prisma.milestone.count({ where: { plan: { company: { orgId } }, status: "Verified" } }),
      prisma.evidence.count({ where: { company: { orgId } } }),
      prisma.evidence.count({ where: { company: { orgId }, status: "Verified" } }),
      prisma.milestone.count({ where: { plan: { company: { orgId } }, status: { notIn: ["Verified", "Rejected"] }, dueDate: { lt: new Date() } } }),
      prisma.company.count({ where: { orgId, plans: { some: { milestones: { some: { status: "Verified" } } } } } }),
    ]);

  const openInterventions = await prisma.improvementPlan.count({
    where: { company: { orgId }, status: { notIn: ["Verified", "Rejected"] } },
  });

  // Advisor workload
  const advisors = await prisma.user.findMany({
    where: { memberships: { some: { orgId, role: "ADVISOR" } } },
    include: { advisedCompanies: { where: { orgId } } },
  });
  const advisorWorkload = advisors.map((a) => ({ name: a.name, companies: a.advisedCompanies.length }));

  // Adoption funnel (company-level denominators where possible)
  const withPlans = await prisma.company.count({ where: { orgId, plans: { some: {} } } });
  const withEvidence = await prisma.company.count({ where: { orgId, evidence: { some: {} } } });
  const withVerifiedEvidence = await prisma.company.count({ where: { orgId, evidence: { some: { status: "Verified" } } } });
  const funnel = [
    { label: "Enrolled enterprises", value: totalEnterprises },
    { label: "Assessed", value: assessed },
    { label: "Improvement plans agreed", value: withPlans },
    { label: "Practices introduced (evidence submitted)", value: withEvidence },
    { label: "Independently verified", value: withVerifiedEvidence },
    { label: "Sustained adoption (verified milestones)", value: companiesWithVerified },
  ];

  return {
    totalEnterprises,
    assessed,
    avgMaturity,
    avgBaseline,
    maturityChange: avgMaturity !== null && avgBaseline !== null ? avgMaturity - avgBaseline : null,
    distribution,
    dimensionAverages,
    plans,
    milestones,
    verifiedMilestones,
    evidence,
    verifiedEvidence,
    overdueMilestones,
    openInterventions,
    companiesWithVerified,
    pctVerifiedAdoption: totalEnterprises ? (companiesWithVerified / totalEnterprises) * 100 : 0,
    evidenceCoverage: evidence ? (verifiedEvidence / evidence) * 100 : 0,
    advisorWorkload,
    funnel,
    rows,
  };
}
