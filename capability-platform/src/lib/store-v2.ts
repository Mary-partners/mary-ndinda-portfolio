import { prisma } from "./prisma";
import { itemAt } from "./mci-v2";
import { computeV2, type V2Input, type V2Result } from "./scoring-v2";

// Build the v2 scoring inputs for an assessment from its stored responses,
// mapping each DB question to its item code by (pillar key, order).
export async function v2InputsForAssessment(assessmentId: string): Promise<{ inputs: V2Input[]; dimIdByKey: Map<string, string> }> {
  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      framework: { include: { dimensions: { include: { questions: true } } } },
      responses: true,
    },
  });
  if (!assessment) throw new Error("NOT_FOUND");

  const respByQ = new Map(assessment.responses.map((r) => [r.questionId, r]));
  const dimIdByKey = new Map<string, string>();
  const inputs: V2Input[] = [];
  for (const d of assessment.framework.dimensions) {
    dimIdByKey.set(d.key, d.id);
    for (const q of d.questions) {
      const item = itemAt(d.key, q.order);
      if (!item) continue;
      const r = respByQ.get(q.id);
      if (!r) inputs.push({ code: item.code, status: "unanswered", score: null });
      else if (!r.applicable) inputs.push({ code: item.code, status: "na", score: null });
      else if (r.score === null || r.score === undefined) inputs.push({ code: item.code, status: "dontknow", score: null });
      else inputs.push({ code: item.code, status: "numeric", score: r.score });
    }
  }
  return { inputs, dimIdByKey };
}

// Recompute v2 results from stored responses and persist overall + per-pillar scores.
export async function storeV2(assessmentId: string): Promise<V2Result> {
  const { inputs, dimIdByKey } = await v2InputsForAssessment(assessmentId);
  const result = computeV2(inputs);

  await prisma.$transaction([
    ...result.pillars.map((p) => {
      const dimensionId = dimIdByKey.get(p.key)!;
      return prisma.dimensionScore.upsert({
        where: { assessmentId_dimensionId: { assessmentId, dimensionId } },
        create: { assessmentId, dimensionId, score: p.raw ?? 0, applicableCount: p.applicableCount },
        update: { score: p.raw ?? 0, applicableCount: p.applicableCount },
      });
    }),
    prisma.assessment.update({
      where: { id: assessmentId },
      data: { overallScore: result.overallRaw, completeness: result.answerCoverage, evidenceCoverage: 0 },
    }),
  ]);

  return result;
}
