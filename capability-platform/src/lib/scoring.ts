// Weighted 0-4 maturity scoring engine for the custom SME framework.
// Rules:
//  - Only applicable, answered (non-null) questions contribute.
//  - Unanswered questions are NEVER scored as zero.
//  - Dimension score = weighted average of answered applicable question scores.
//  - Overall = weighted average of dimensions that have a score.
//  - Completeness (coverage) is reported separately from maturity.

export interface ScoringQuestion {
  id: string;
  dimensionId: string;
  weight: number;
}
export interface ScoringDimension {
  id: string;
  key: string;
  weight: number;
}
export interface ScoringResponse {
  questionId: string;
  score: number | null;
  applicable: boolean;
  evidenceStatus?: string; // none | claimed | verified
}

export interface DimensionResult {
  dimensionId: string;
  key: string;
  score: number | null;
  applicableCount: number;
  answeredCount: number;
}
export interface ScoringResult {
  dimensions: DimensionResult[];
  overall: number | null;
  completeness: number; // 0..1 of applicable questions answered
  evidenceCoverage: number; // 0..1 of answered applicable questions with verified evidence
  totalApplicable: number;
  totalAnswered: number;
}

export function computeScores(
  dimensions: ScoringDimension[],
  questions: ScoringQuestion[],
  responses: ScoringResponse[]
): ScoringResult {
  const respByQ = new Map(responses.map((r) => [r.questionId, r]));
  const qByDim = new Map<string, ScoringQuestion[]>();
  for (const q of questions) {
    const arr = qByDim.get(q.dimensionId) ?? [];
    arr.push(q);
    qByDim.set(q.dimensionId, arr);
  }

  let totalApplicable = 0;
  let totalAnswered = 0;
  let answeredWithVerified = 0;

  const dimResults: DimensionResult[] = dimensions.map((dim) => {
    const qs = qByDim.get(dim.id) ?? [];
    let wsum = 0;
    let wscore = 0;
    let applicableCount = 0;
    let answeredCount = 0;

    for (const q of qs) {
      const r = respByQ.get(q.id);
      const applicable = r ? r.applicable : true;
      if (!applicable) continue;
      applicableCount++;
      totalApplicable++;
      if (r && r.score !== null && r.score !== undefined) {
        answeredCount++;
        totalAnswered++;
        wsum += q.weight;
        wscore += r.score * q.weight;
        if (r.evidenceStatus === "verified") answeredWithVerified++;
      }
    }

    return {
      dimensionId: dim.id,
      key: dim.key,
      score: wsum > 0 ? wscore / wsum : null,
      applicableCount,
      answeredCount,
    };
  });

  // Overall = weighted average across dimensions that have a score.
  let dw = 0;
  let dws = 0;
  for (const dim of dimensions) {
    const res = dimResults.find((d) => d.dimensionId === dim.id);
    if (res && res.score !== null) {
      dw += dim.weight;
      dws += res.score * dim.weight;
    }
  }

  return {
    dimensions: dimResults,
    overall: dw > 0 ? dws / dw : null,
    completeness: totalApplicable > 0 ? totalAnswered / totalApplicable : 0,
    evidenceCoverage: totalAnswered > 0 ? answeredWithVerified / totalAnswered : 0,
    totalApplicable,
    totalAnswered,
  };
}

// Transparent priority score for recommending interventions (higher = sooner).
// Not an opaque AI score — all inputs are explicit.
export function interventionPriority(input: {
  gap: number; // target - current (0..4)
  importance: number; // 1..3 strategic importance
  riskSeverity: number; // 1..3
  feasibility: number; // 1..3 (higher = easier)
  evidenceConfidence: number; // 1..3
}): number {
  const { gap, importance, riskSeverity, feasibility, evidenceConfidence } = input;
  // Weighted, bounded, and documented.
  return (
    gap * 2.0 + importance * 1.5 + riskSeverity * 1.5 + feasibility * 1.0 + evidenceConfidence * 0.5
  );
}
