/**
 * Simplified single-entry / single-exit equity case for the Decision Lab.
 *
 * Illustrative only. Units:
 *  - entryUsdM: USD millions invested at entry (one outflow at t = 0)
 *  - ownershipPct: % of equity held at exit (no dilution modelled)
 *  - netIncomeLcuM: year-of-exit net income, local-currency units (LCU) millions
 *  - exitPe: price/earnings multiple applied at exit
 *  - initialFx: LCU per USD at entry
 *  - depreciationPct: cumulative % change in LCU per USD between entry and exit
 *      exitFx = initialFx × (1 + depreciationPct/100); larger LCU/USD = weaker LCU
 *  - exitCostPct: transaction and other exit costs as % of gross proceeds
 *  - years: holding period (single inflow at t = years)
 *
 * Equity value is earnings × P/E directly. There is no net-debt bridge
 * because a P/E multiple values equity, not enterprise value.
 */

export interface EquityInputs {
  entryUsdM: number;
  ownershipPct: number;
  netIncomeLcuM: number;
  exitPe: number;
  initialFx: number;
  depreciationPct: number;
  exitCostPct: number;
  years: number;
}

export interface FieldSpec {
  key: keyof EquityInputs;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  integer?: boolean;
  help: string;
}

export const FIELDS: FieldSpec[] = [
  { key: "entryUsdM", label: "Entry investment", unit: "USD m", min: 0.1, max: 100, step: 0.1, help: "Single cash outflow at entry." },
  { key: "ownershipPct", label: "Ownership at exit", unit: "%", min: 0.1, max: 100, step: 0.1, help: "Assumes no dilution between entry and exit." },
  { key: "netIncomeLcuM", label: "Year-of-exit net income", unit: "LCU m", min: -5000, max: 50000, step: 10, help: "Net income attributable to shareholders in the exit year. Negative values are accepted but an earnings multiple is then not meaningful." },
  { key: "exitPe", label: "Exit P/E", unit: "x", min: 0.5, max: 40, step: 0.1, help: "Multiple of exit-year earnings paid for equity." },
  { key: "initialFx", label: "Initial FX rate", unit: "LCU per USD", min: 0.01, max: 100000, step: 0.01, help: "Local-currency units per US dollar at entry." },
  { key: "depreciationPct", label: "Cumulative LCU depreciation", unit: "%", min: -50, max: 400, step: 1, help: "Change in LCU per USD by exit. 20% means 100 becomes 120. Negative means appreciation." },
  { key: "exitCostPct", label: "Net exit costs", unit: "% of gross proceeds", min: 0, max: 25, step: 0.1, help: "Advisory, legal, taxes on exit and other frictions, simplified to one rate." },
  { key: "years", label: "Holding period", unit: "years", min: 1, max: 15, step: 1, integer: true, help: "Time from the single entry outflow to the single exit inflow." },
];

export const DEFAULT_INPUTS: EquityInputs = {
  entryUsdM: 5,
  ownershipPct: 25,
  netIncomeLcuM: 400,
  exitPe: 8,
  initialFx: 100,
  depreciationPct: 20,
  exitCostPct: 2,
  years: 5,
};

export interface Preset {
  id: "base" | "downside" | "stress";
  label: string;
  description: string;
  inputs: EquityInputs;
}

export const PRESETS: Preset[] = [
  {
    id: "base",
    label: "Base (illustrative)",
    description: "Plan earnings delivered, moderate depreciation, exit on schedule.",
    inputs: DEFAULT_INPUTS,
  },
  {
    id: "downside",
    label: "Downside (illustrative)",
    description: "Credit losses cut exit-year earnings by a quarter, multiple compresses to 6x, faster depreciation, exit one year late at higher cost.",
    inputs: { ...DEFAULT_INPUTS, netIncomeLcuM: 300, exitPe: 6, depreciationPct: 35, exitCostPct: 3, years: 6 },
  },
  {
    id: "stress",
    label: "Stress (illustrative)",
    description: "Earnings fall to well below plan, distressed 5x multiple, a currency crisis and a forced late exit.",
    inputs: { ...DEFAULT_INPUTS, netIncomeLcuM: 150, exitPe: 5, depreciationPct: 60, exitCostPct: 4, years: 7 },
  },
];

export type FieldErrors = Partial<Record<keyof EquityInputs, string>>;

/** Validate raw (possibly non-numeric) inputs against FIELDS. */
export function validate(raw: Record<keyof EquityInputs, string>): { values?: EquityInputs; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const values = {} as EquityInputs;
  for (const f of FIELDS) {
    const s = (raw[f.key] ?? "").trim();
    if (s === "") {
      errors[f.key] = "Required.";
      continue;
    }
    const n = Number(s);
    if (!Number.isFinite(n)) {
      errors[f.key] = "Enter a number.";
      continue;
    }
    if (n < f.min || n > f.max) {
      errors[f.key] = `Enter a value from ${f.min} to ${f.max}.`;
      continue;
    }
    if (f.integer && !Number.isInteger(n)) {
      errors[f.key] = "Enter a whole number of years.";
      continue;
    }
    values[f.key] = n;
  }
  return Object.keys(errors).length ? { errors } : { values, errors };
}

export type ResultStatus = "ok" | "zero-earnings" | "negative-earnings";

export interface EquityResult {
  status: ResultStatus;
  equityValueLcuM: number;
  investorShareLcuM: number;
  afterCostsLcuM: number;
  exitFx: number;
  proceedsUsdM: number;
  /** Proceeds if the exchange rate had not moved; isolates FX drag. */
  proceedsAtInitialFxUsdM: number;
  fxDragUsdM: number;
  moic: number;
  /** null when not meaningful (MOIC ≤ 0). */
  annualisedReturn: number | null;
  /** Exit P/E needed to return 1.0x at the modelled FX; null if not meaningful. */
  breakEvenPe: number | null;
}

export function computeEquityCase(i: EquityInputs): EquityResult {
  const exitFx = i.initialFx * (1 + i.depreciationPct / 100);
  const own = i.ownershipPct / 100;
  const keep = 1 - i.exitCostPct / 100;
  const equityValueLcuM = i.netIncomeLcuM * i.exitPe;
  const investorShareLcuM = equityValueLcuM * own;
  const afterCostsLcuM = investorShareLcuM * keep;

  if (i.netIncomeLcuM <= 0) {
    return {
      status: i.netIncomeLcuM === 0 ? "zero-earnings" : "negative-earnings",
      equityValueLcuM,
      investorShareLcuM,
      afterCostsLcuM,
      exitFx,
      proceedsUsdM: 0,
      proceedsAtInitialFxUsdM: 0,
      fxDragUsdM: 0,
      moic: 0,
      annualisedReturn: null,
      breakEvenPe: null,
    };
  }

  const proceedsUsdM = afterCostsLcuM / exitFx;
  const proceedsAtInitialFxUsdM = afterCostsLcuM / i.initialFx;
  const moic = proceedsUsdM / i.entryUsdM;
  const annualisedReturn = moic > 0 ? Math.pow(moic, 1 / i.years) - 1 : null;
  const breakEvenPe = (i.entryUsdM * exitFx) / (i.netIncomeLcuM * own * keep);

  return {
    status: "ok",
    equityValueLcuM,
    investorShareLcuM,
    afterCostsLcuM,
    exitFx,
    proceedsUsdM,
    proceedsAtInitialFxUsdM,
    fxDragUsdM: proceedsAtInitialFxUsdM - proceedsUsdM,
    moic,
    annualisedReturn,
    breakEvenPe,
  };
}

/** MOIC grid for exit P/E × depreciation sensitivities around the current inputs. */
export function sensitivityGrid(i: EquityInputs, pes: number[], deps: number[]): number[][] {
  return deps.map((d) => pes.map((pe) => computeEquityCase({ ...i, exitPe: pe, depreciationPct: d }).moic));
}
