import { prisma } from "./prisma";
import { computeScores, type ScoringResponse } from "./scoring";

// Recompute and persist dimension scores + overall/completeness for an assessment.
// Returns the computed result. Used by seed and by live edits.
export async function recomputeAssessment(assessmentId: string) {
  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      framework: { include: { dimensions: { include: { questions: true } } } },
      responses: true,
    },
  });
  if (!assessment) throw new Error("NOT_FOUND");

  const dims = assessment.framework.dimensions.map((d) => ({ id: d.id, key: d.key, weight: d.weight }));
  const questions = assessment.framework.dimensions.flatMap((d) =>
    d.questions.map((q) => ({ id: q.id, dimensionId: d.id, weight: q.weight }))
  );
  const responses: ScoringResponse[] = assessment.responses.map((r) => ({
    questionId: r.questionId,
    score: r.score,
    applicable: r.applicable,
    evidenceStatus: r.evidenceStatus,
  }));

  const result = computeScores(dims, questions, responses);

  await prisma.$transaction([
    ...result.dimensions.map((ds) =>
      prisma.dimensionScore.upsert({
        where: { assessmentId_dimensionId: { assessmentId, dimensionId: ds.dimensionId } },
        create: { assessmentId, dimensionId: ds.dimensionId, score: ds.score ?? 0, applicableCount: ds.applicableCount },
        update: { score: ds.score ?? 0, applicableCount: ds.applicableCount },
      })
    ),
    prisma.assessment.update({
      where: { id: assessmentId },
      data: { overallScore: result.overall, completeness: result.completeness, evidenceCoverage: result.evidenceCoverage },
    }),
  ]);

  return result;
}
