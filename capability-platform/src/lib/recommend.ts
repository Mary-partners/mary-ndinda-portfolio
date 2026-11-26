import { prisma } from "./prisma";
import { SUGGESTED_ACTIONS } from "./framework-content";
import { DIMENSION_META } from "./constants";
import { indexScore, maturityBand } from "./utils";

const META = new Map(DIMENSION_META.map((d) => [d.key, d]));

export interface PlanResponse {
  pillarKey: string;
  order: number; // 1-based position within the pillar
  score: number | null;
  applicable: boolean;
}

export interface ActionItem {
  pillarKey: string;
  pillarName: string;
  pillarLabel: string;
  order: number;
  score: number;
  gap: number; // 4 - score
  action: string;
  rank: number; // higher = sooner (transparent: gap and pillar weight)
}

export interface ActionPlan {
  priorities: (ActionItem & { horizon: string })[]; // up to 3, mapped to 30/60/90
  moreActions: ActionItem[];
  weakestPillars: { key: string; name: string; index: number | null }[];
}

const HORIZONS = ["Days 1–30", "Days 31–60", "Days 61–90"];

// Deterministic, transparent: rank = gap*2 + pillarWeight*0.1 (weight 20 -> +2).
export function buildActionPlan(responses: PlanResponse[]): ActionPlan {
  const items: ActionItem[] = [];
  for (const r of responses) {
    if (!r.applicable || r.score === null || r.score === undefined) continue;
    const meta = META.get(r.pillarKey);
    const action = SUGGESTED_ACTIONS[r.pillarKey]?.[r.order - 1];
    if (!meta || !action) continue;
    if (r.score > 2) continue; // only weak practices need a corrective action
    const gap = 4 - r.score;
    items.push({
      pillarKey: r.pillarKey,
      pillarName: meta.name,
      pillarLabel: meta.label,
      order: r.order,
      score: r.score,
      gap,
      action,
      rank: gap * 2 + meta.weight * 0.1,
    });
  }
  // Prefer the weakest (score 0/1) first, then score 2; tie-break by rank then pillar weight.
  items.sort((a, b) => a.score - b.score || b.rank - a.rank || (META.get(b.pillarKey)!.weight - META.get(a.pillarKey)!.weight));

  const priorities = items.slice(0, 3).map((it, i) => ({ ...it, horizon: HORIZONS[i] }));
  const moreActions = items.slice(3);

  // Weakest pillars by average index.
  const byPillar = new Map<string, { sum: number; n: number }>();
  for (const r of responses) {
    if (!r.applicable || r.score === null || r.score === undefined) continue;
    const cur = byPillar.get(r.pillarKey) ?? { sum: 0, n: 0 };
    cur.sum += r.score; cur.n += 1;
    byPillar.set(r.pillarKey, cur);
  }
  const weakestPillars = DIMENSION_META.map((d) => {
    const agg = byPillar.get(d.key);
    return { key: d.key, name: d.name, index: agg && agg.n ? indexScore(agg.sum / agg.n) : null };
  })
    .filter((p) => p.index !== null)
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .slice(0, 3);

  return { priorities, moreActions, weakestPillars };
}

// Load the latest finalised assessment for a company and build its action plan.
export async function getActionPlan(companyId: string): Promise<ActionPlan | null> {
  const assessment = await prisma.assessment.findFirst({
    where: { companyId, status: "finalized" },
    orderBy: { finalizedAt: "desc" },
    include: { responses: { include: { question: { include: { dimension: true } } } } },
  });
  if (!assessment) return null;
  const responses: PlanResponse[] = assessment.responses.map((r) => ({
    pillarKey: r.question.dimension.key,
    order: r.question.order,
    score: r.score,
    applicable: r.applicable,
  }));
  return buildActionPlan(responses);
}

export function bandFor(score: number | null | undefined) {
  return maturityBand(score);
}
