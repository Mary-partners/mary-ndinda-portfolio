// Version-aware scoring and action service for the MCI v2 rubric.
// Pure functions: the same results power the results screen and the PDF.

import {
  MCI_ITEMS, PILLAR_ORDER, PILLAR_NAMES, bandV2, roundHalfUp, tiebreakRank,
  type MciItem, type MciBand,
} from "./mci-v2";

export type RespStatus = "numeric" | "dontknow" | "unanswered" | "na";
export interface V2Input {
  code: string;
  status: RespStatus;
  score: number | null; // 0-4 when status === "numeric"
}

export interface PillarResult {
  key: string;
  name: string;
  raw: number | null;       // unrounded 0-4 mean, null if not qualifying
  display: number | null;   // 0-100, round-half-up(raw*25), null if not qualifying
  band: MciBand;
  applicableCount: number;
  numericCount: number;
  qualifies: boolean;
}
export interface V2Result {
  pillars: PillarResult[];
  overallRaw: number | null;
  mci: number | null;        // 0-100 round-half-up(overallRaw*25)
  overallBand: MciBand;
  overallQualifies: boolean;
  answerCoverage: number;    // 0..1 numeric applicable / applicable
  totalApplicable: number;
  totalNumeric: number;
  financialFlags: string[];  // essential codes with 0/1 or unknown/unanswered
}

function statusOf(inputs: Map<string, V2Input>, code: string): V2Input {
  return inputs.get(code) ?? { code, status: "unanswered", score: null };
}

export function computeV2(inputList: V2Input[]): V2Result {
  const inputs = new Map(inputList.map((i) => [i.code, i]));

  const pillars: PillarResult[] = PILLAR_ORDER.map((key) => {
    const items = MCI_ITEMS.filter((i) => i.pillar === key);
    let applicableCount = 0;
    let numericCount = 0;
    let sum = 0;
    for (const it of items) {
      const r = statusOf(inputs, it.code);
      if (r.status === "na") continue;
      applicableCount++;
      if (r.status === "numeric" && r.score !== null) {
        numericCount++;
        sum += r.score;
      }
    }
    const raw = numericCount > 0 ? sum / numericCount : null;
    const qualifies = applicableCount >= 4 && numericCount / applicableCount >= 0.75;
    return {
      key,
      name: PILLAR_NAMES[key],
      raw: qualifies ? raw : null,
      display: qualifies && raw !== null ? roundHalfUp(raw * 25) : null,
      band: qualifies ? bandV2(raw) : bandV2(null),
      applicableCount,
      numericCount,
      qualifies,
    };
  });

  const totalApplicable = pillars.reduce((a, p) => a + p.applicableCount, 0);
  const totalNumeric = pillars.reduce((a, p) => a + p.numericCount, 0);
  const allQualify = pillars.every((p) => p.qualifies);
  const overallQualifies = allQualify && totalApplicable > 0 && totalNumeric / totalApplicable >= 0.8;
  const overallRaw = overallQualifies ? pillars.reduce((a, p) => a + (p.raw ?? 0), 0) / pillars.length : null;
  const mci = overallQualifies && overallRaw !== null ? roundHalfUp(overallRaw * 25) : null;

  // Financial essential flags: applicable essentials scored 0/1, or unknown/unanswered.
  const financialFlags: string[] = [];
  for (const it of MCI_ITEMS.filter((i) => i.essential)) {
    const r = statusOf(inputs, it.code);
    if (r.status === "na") continue;
    if ((r.status === "numeric" && r.score !== null && r.score <= 1) || r.status === "dontknow" || r.status === "unanswered") {
      financialFlags.push(it.code);
    }
  }

  return {
    pillars,
    overallRaw,
    mci,
    overallBand: bandV2(overallRaw),
    overallQualifies,
    answerCoverage: totalApplicable > 0 ? totalNumeric / totalApplicable : 0,
    totalApplicable,
    totalNumeric,
    financialFlags,
  };
}

export interface ActionCandidate {
  code: string;
  item: MciItem;
  pillarKey: string;
  pillarName: string;
  cls: 1 | 2 | 3 | 4;
  score: number | null;      // numeric answer, null for unknown/unanswered
  status: RespStatus;
  selectedAnchor: string | null; // the statement the founder selected
  startNow: boolean;         // financial essential that needs immediate attention
}
export interface V2Plan {
  priorities: (ActionCandidate & { horizon: string })[]; // up to 3
  more: ActionCandidate[];
  startNow: ActionCandidate[]; // all financial-essential alerts
}

const HORIZONS = ["Days 1-30", "Days 31-60", "Days 61-90"];

export function buildPlanV2(inputList: V2Input[]): V2Plan {
  const inputs = new Map(inputList.map((i) => [i.code, i]));
  const candidates: ActionCandidate[] = [];

  for (const item of MCI_ITEMS) {
    const r = statusOf(inputs, item.code);
    if (r.status === "na") continue;
    const essential = Boolean(item.essential);
    let cls: 1 | 2 | 3 | 4 | null = null;

    if (r.status === "numeric" && r.score !== null) {
      if (r.score >= 3) continue; // no action needed
      if (essential && r.score <= 1) cls = 1;
      else if (!essential && r.score <= 1) cls = 3;
      else cls = 4; // score === 2 (essential or not)
    } else if (r.status === "dontknow" || r.status === "unanswered") {
      if (essential) cls = 2;
      else continue; // non-essential unknown/unanswered: no candidate
    }
    if (cls === null) continue;

    candidates.push({
      code: item.code,
      item,
      pillarKey: item.pillar,
      pillarName: PILLAR_NAMES[item.pillar],
      cls,
      score: r.status === "numeric" ? r.score : null,
      status: r.status,
      selectedAnchor: r.status === "numeric" && r.score !== null ? item.anchors[r.score] : null,
      startNow: essential && (r.status === "dontknow" || r.status === "unanswered" || (r.score !== null && r.score <= 1)),
    });
  }

  candidates.sort((a, b) => {
    if (a.cls !== b.cls) return a.cls - b.cls;
    const as = a.score ?? 99, bs = b.score ?? 99; // class 2 has no score; order by tiebreak
    if (as !== bs) return as - bs;
    return tiebreakRank(a.code) - tiebreakRank(b.code);
  });

  const priorities = candidates.slice(0, 3).map((c, i) => ({ ...c, horizon: HORIZONS[i] }));
  const more = candidates.slice(3);
  const startNow = candidates.filter((c) => c.startNow);
  return { priorities, more, startNow };
}
