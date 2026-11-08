/**
 * Market prioritisation aid. Not an approved underwriting policy.
 *
 * Rules:
 *  - Weights are entered as non-negative numbers and normalised to sum to 100.
 *  - Scores are 1–5. A missing score (null) makes the market "Incomplete".
 *  - Hard-stop screens are pass / fail / unknown. Any fail excludes the market
 *    regardless of score. Any unknown makes it "Incomplete".
 *  - Only "Scored" markets are ranked. Incomplete or excluded markets are
 *    never given a numeric rank, so missing data cannot masquerade as a low score.
 */

export type ScreenState = "pass" | "fail" | "unknown";

export interface Criterion {
  id: string;
  label: string;
  help: string;
  defaultWeight: number;
}

export interface Screen {
  id: string;
  label: string;
}

export interface MarketInput {
  id: string;
  name: string;
  scores: Record<string, number | null>;
  screens: Record<string, ScreenState>;
}

export type MarketStatus = "scored" | "incomplete" | "excluded";

export interface MarketResult {
  id: string;
  name: string;
  status: MarketStatus;
  /** 0–100, only when status === "scored". */
  score: number | null;
  rank: number | null;
  missing: string[];
  failedScreens: string[];
  unknownScreens: string[];
}

export const CRITERIA: Criterion[] = [
  { id: "depth", label: "Market depth and investable FSPs", help: "Number and scale of institutions that could absorb the instruments the fund offers.", defaultWeight: 15 },
  { id: "regulation", label: "Regulatory clarity for minority investors", help: "Predictable licensing, ownership and capital rules for a foreign minority investor.", defaultWeight: 12 },
  { id: "exclusion", label: "Financial exclusion (need)", help: "Scale of underserved households and small businesses.", defaultWeight: 12 },
  { id: "competition", label: "Room for additional capital", help: "Higher score = less crowded by other investors for the same institutions.", defaultWeight: 8 },
  { id: "fx", label: "FX and convertibility", help: "Depreciation history, volatility, hedge availability and convertibility.", defaultWeight: 15 },
  { id: "exit", label: "Exit and refinancing routes", help: "Evidence of strategic buyers, secondary investors or refinancing capacity.", defaultWeight: 10 },
  { id: "feasibility", label: "Deployment feasibility from Nairobi", help: "Travel, language, time zone and existing team coverage.", defaultWeight: 10 },
  { id: "macro", label: "Macro and sovereign risk", help: "Higher score = lower risk.", defaultWeight: 10 },
  { id: "protection", label: "Consumer-protection environment", help: "Rules and enforcement on pricing transparency, collections and complaints.", defaultWeight: 8 },
];

export const SCREENS: Screen[] = [
  { id: "mandate", label: "Fund mandate permits the market" },
  { id: "sanctions", label: "No sanctions or legal restriction" },
  { id: "route", label: "Viable regulatory route for the instrument" },
  { id: "repatriation", label: "Capital and returns can be repatriated" },
];

const allPass = (): Record<string, ScreenState> => Object.fromEntries(SCREENS.map((s) => [s.id, "pass" as ScreenState]));

/** Illustrative placeholder scores. Same values as the Workstream 01 worked example. */
export const DEFAULT_MARKETS: MarketInput[] = [
  { id: "ke", name: "Kenya", screens: allPass(), scores: { depth: 4, regulation: 4, exclusion: 3, competition: 2, fx: 3, exit: 3, feasibility: 5, macro: 3, protection: 3 } },
  { id: "ug", name: "Uganda", screens: allPass(), scores: { depth: 3, regulation: 3, exclusion: 4, competition: 3, fx: 3, exit: 2, feasibility: 4, macro: 3, protection: 3 } },
  { id: "tz", name: "Tanzania", screens: allPass(), scores: { depth: 3, regulation: 3, exclusion: 4, competition: 3, fx: 3, exit: 2, feasibility: 4, macro: 3, protection: 3 } },
  { id: "gh", name: "Ghana", screens: allPass(), scores: { depth: 3, regulation: 3, exclusion: 3, competition: 3, fx: 2, exit: 3, feasibility: 2, macro: 2, protection: 3 } },
  {
    id: "ci",
    name: "Côte d'Ivoire",
    screens: { ...allPass(), route: "unknown" },
    scores: { depth: 3, regulation: null, exclusion: 4, competition: 3, fx: 4, exit: 2, feasibility: 2, macro: 3, protection: null },
  },
];

export function normaliseWeights(raw: Record<string, number>): Record<string, number> {
  const total = Object.values(raw).reduce((a, b) => a + (Number.isFinite(b) && b > 0 ? b : 0), 0);
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(raw)) out[k] = total > 0 && Number.isFinite(v) && v > 0 ? (v / total) * 100 : 0;
  return out;
}

export function scoreMarkets(markets: MarketInput[], rawWeights: Record<string, number>): { results: MarketResult[]; weightsValid: boolean } {
  const weights = normaliseWeights(rawWeights);
  const weightsValid = Object.values(weights).some((w) => w > 0);

  const results: MarketResult[] = markets.map((m) => {
    const missing = CRITERIA.filter((c) => weights[c.id] > 0 && (m.scores[c.id] === null || m.scores[c.id] === undefined)).map((c) => c.label);
    const failedScreens = SCREENS.filter((s) => m.screens[s.id] === "fail").map((s) => s.label);
    const unknownScreens = SCREENS.filter((s) => m.screens[s.id] !== "pass" && m.screens[s.id] !== "fail").map((s) => s.label);

    let status: MarketStatus = "scored";
    if (failedScreens.length) status = "excluded";
    else if (missing.length || unknownScreens.length || !weightsValid) status = "incomplete";

    let score: number | null = null;
    if (status === "scored") {
      score = CRITERIA.reduce((sum, c) => sum + (weights[c.id] * (m.scores[c.id] as number)) / 5, 0);
    }
    return { id: m.id, name: m.name, status, score, rank: null, missing, failedScreens, unknownScreens };
  });

  const ranked = results.filter((r) => r.status === "scored").sort((a, b) => (b.score as number) - (a.score as number));
  // Ties share a rank.
  ranked.forEach((r, idx) => {
    const prev = ranked[idx - 1];
    r.rank = prev && Math.abs((prev.score as number) - (r.score as number)) < 1e-9 ? prev.rank : idx + 1;
  });

  return { results, weightsValid };
}
