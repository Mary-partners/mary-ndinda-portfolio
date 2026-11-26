import { prisma } from "./prisma";
import { v2InputsForAssessment } from "./store-v2";
import { computeV2, buildPlanV2, type V2Result, type V2Plan } from "./scoring-v2";
import { RUBRIC_VERSION } from "./mci-v2";

export type FounderV2 =
  | { state: "none" }
  | { state: "legacy"; index: number | null; finalizedAt: Date | null }
  | { state: "v2"; result: V2Result; plan: V2Plan; finalizedAt: Date | null; isBaseline: boolean; priorIndex: number | null };

// Latest finalized result for a founder's company, scored with the version-aware
// service. Legacy (pre-v2) results are reported without recalculation.
export async function getFounderV2(companyId: string): Promise<FounderV2> {
  const latest = await prisma.assessment.findFirst({
    where: { companyId, status: "finalized" },
    orderBy: { finalizedAt: "desc" },
    select: { id: true, frameworkVersion: true, finalizedAt: true, isBaseline: true, overallScore: true },
  });
  if (!latest) return { state: "none" };

  if (latest.frameworkVersion !== RUBRIC_VERSION) {
    const idx = latest.overallScore != null ? Math.round((latest.overallScore / 4) * 100) : null;
    return { state: "legacy", index: idx, finalizedAt: latest.finalizedAt };
  }

  const { inputs } = await v2InputsForAssessment(latest.id);
  const result = computeV2(inputs);
  const plan = buildPlanV2(inputs);

  // Prior comparable v2 result (for change over time), if any.
  const prior = await prisma.assessment.findFirst({
    where: { companyId, status: "finalized", frameworkVersion: RUBRIC_VERSION, id: { not: latest.id }, finalizedAt: { lt: latest.finalizedAt ?? new Date() } },
    orderBy: { finalizedAt: "desc" },
    select: { overallScore: true },
  });
  const priorIndex = prior?.overallScore != null ? Math.round((prior.overallScore / 4) * 100) : null;

  return { state: "v2", result, plan, finalizedAt: latest.finalizedAt, isBaseline: latest.isBaseline, priorIndex };
}
