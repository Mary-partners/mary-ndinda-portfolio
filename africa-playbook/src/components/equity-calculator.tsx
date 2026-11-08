"use client";

import { useMemo, useState } from "react";
import { computeEquityCase, DEFAULT_INPUTS, FIELDS, PRESETS, sensitivityGrid, validate, type EquityInputs } from "@/lib/equity-case";
import { EvidenceBadge } from "./evidence-badge";

type Raw = Record<keyof EquityInputs, string>;
const toRaw = (i: EquityInputs): Raw => Object.fromEntries(Object.entries(i).map(([k, v]) => [k, String(v)])) as Raw;

const fmt = (n: number, d = 2) => n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });
const pct = (n: number, d = 2) => `${n >= 0 ? "" : "−"}${fmt(Math.abs(n * 100), d)}%`;
const usd = (n: number) => `USD ${n < 0 ? "−" : ""}${fmt(Math.abs(n), 3)}m`;
const lcu = (n: number) => `LCU ${n < 0 ? "−" : ""}${fmt(Math.abs(n), 1)}m`;

const PES = [5, 6, 7, 8, 9, 10];
const DEPS = [0, 10, 20, 35, 50, 60];

export function EquityCalculator() {
  const [raw, setRaw] = useState<Raw>(toRaw(DEFAULT_INPUTS));
  const { values, errors } = useMemo(() => validate(raw), [raw]);
  const result = useMemo(() => (values ? computeEquityCase(values) : null), [values]);
  const grid = useMemo(() => (values && result?.status === "ok" ? sensitivityGrid(values, PES, DEPS) : null), [values, result]);

  const activePreset = PRESETS.find((p) => (Object.keys(p.inputs) as (keyof EquityInputs)[]).every((k) => Number(raw[k]) === p.inputs[k] && raw[k].trim() !== ""));

  return (
    <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      {/* Inputs */}
      <form className="no-print-controls" onSubmit={(e) => e.preventDefault()} aria-labelledby="calc-inputs-title" noValidate>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id="calc-inputs-title" className="font-serif text-xl text-ink">
            Assumptions
          </h3>
          <EvidenceBadge kind="illustrative" />
        </div>

        <fieldset className="mt-4">
          <legend className="eyebrow mb-2">Scenario presets (illustrative)</legend>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={activePreset?.id === p.id}
                aria-describedby={`preset-${p.id}`}
                onClick={() => setRaw(toRaw(p.inputs))}
                className={`rounded-full border px-3.5 py-1.5 text-sm ${activePreset?.id === p.id ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink"}`}
              >
                {p.label}
              </button>
            ))}
            <button type="button" onClick={() => setRaw(toRaw(DEFAULT_INPUTS))} className="rounded-full border border-dashed border-ink/40 px-3.5 py-1.5 text-sm text-ink-2 hover:border-ink">
              Reset to defaults
            </button>
          </div>
          <ul className="mt-3 space-y-1 text-[0.8rem] leading-snug text-ink-3">
            {PRESETS.map((p) => (
              <li key={p.id} id={`preset-${p.id}`}>
                <span className="font-medium text-ink-2">{p.label}:</span> {p.description}
              </li>
            ))}
          </ul>
        </fieldset>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          {FIELDS.map((f) => {
            const err = errors[f.key];
            const id = `in-${f.key}`;
            return (
              <div key={f.key}>
                <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-sm font-medium text-ink">
                  <span>{f.label}</span>
                  <span className="text-xs font-normal text-ink-3">{f.unit}</span>
                </label>
                <input
                  id={id}
                  inputMode="decimal"
                  type="number"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={raw[f.key]}
                  onChange={(e) => setRaw((r) => ({ ...r, [f.key]: e.target.value }))}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={`${id}-help${err ? ` ${id}-err` : ""}`}
                  className={`num-tab mt-1 h-10 w-full rounded-md border bg-white px-3 text-ink ${err ? "border-risk ring-1 ring-risk" : "border-ink/25"}`}
                />
                <p id={`${id}-help`} className="mt-1 text-[0.76rem] leading-snug text-ink-3">
                  {f.help}
                </p>
                {err ? (
                  <p id={`${id}-err`} className="mt-1 text-[0.8rem] font-medium text-risk">
                    <span aria-hidden="true">⚠ </span>
                    {f.label}: {err}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </form>

      {/* Results */}
      <div className="min-w-0" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-xl text-ink">Results</h3>
          <EvidenceBadge kind="illustrative" />
        </div>

        {!values ? (
          <div role="alert" className="mt-4 rounded-lg border-l-4 border-risk bg-risk-2/60 p-4 text-ink">
            <p className="font-medium">
              <span aria-hidden="true">⚠ </span>Results are not shown until every assumption is valid.
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-ink-2">
              {FIELDS.filter((f) => errors[f.key]).map((f) => (
                <li key={f.key}>
                  <a className="link" href={`#in-${f.key}`}>
                    {f.label}
                  </a>
                  : {errors[f.key]}
                </li>
              ))}
            </ul>
          </div>
        ) : result && result.status !== "ok" ? (
          <div role="alert" className="mt-4 rounded-lg border-l-4 border-risk bg-risk-2/60 p-4 text-ink">
            <p className="font-medium">
              <span aria-hidden="true">⚠ </span>
              {result.status === "zero-earnings" ? "Exit-year earnings are zero." : "Exit-year earnings are negative."}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">
              An earnings multiple cannot value a loss-making or zero-earning institution. The case would need a book-value, liquidation or recovery approach (see Workstream 04 and Workstream 11). No return is shown rather than a misleading one.
            </p>
          </div>
        ) : result ? (
          <>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-3">
              {[
                { k: "Investor exit proceeds", v: usd(result.proceedsUsdM), s: "after exit costs, at exit FX" },
                { k: "MOIC", v: `${fmt(result.moic, 3)}x`, s: result.moic < 1 ? "below capital returned (↓)" : "multiple of capital invested" },
                { k: "Annualised return", v: result.annualisedReturn === null ? "n/a" : pct(result.annualisedReturn), s: "single outflow, single inflow only" },
                { k: "Exit FX", v: `${fmt(result.exitFx, 2)} LCU/USD`, s: `from ${fmt(values.initialFx, 2)} at entry` },
                { k: "FX effect on proceeds", v: usd(-result.fxDragUsdM), s: "vs. no change in exchange rate" },
                { k: "Break-even exit P/E", v: result.breakEvenPe === null ? "n/a" : `${fmt(result.breakEvenPe, 2)}x`, s: "P/E needed to return 1.0x" },
              ].map((m) => (
                <div key={m.k} className="bg-paper p-4">
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-ink-3">{m.k}</dt>
                  <dd className="num-tab mt-1 font-serif text-2xl text-ink">{m.v}</dd>
                  <dd className="mt-0.5 text-xs text-ink-3">{m.s}</dd>
                </div>
              ))}
            </dl>

            <h4 className="mt-8 font-serif text-lg text-ink">Calculation bridge</h4>
            <div className="mt-2 overflow-x-auto rounded-lg border border-rule" role="region" aria-label="Calculation bridge" tabIndex={0}>
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Step-by-step calculation from exit earnings to USD proceeds</caption>
                <thead className="bg-paper-2 text-[0.72rem] uppercase tracking-[0.06em] text-ink-2">
                  <tr>
                    <th scope="col" className="px-3 py-2">Step</th>
                    <th scope="col" className="px-3 py-2">Formula</th>
                    <th scope="col" className="px-3 py-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="num-tab divide-y divide-rule/70 text-ink-2">
                  <tr><th scope="row" className="px-3 py-2 font-medium text-ink">Equity value</th><td className="px-3 py-2">{fmt(values.netIncomeLcuM, 0)} × {fmt(values.exitPe, 1)}x</td><td className="px-3 py-2 text-right">{lcu(result.equityValueLcuM)}</td></tr>
                  <tr><th scope="row" className="px-3 py-2 font-medium text-ink">Investor share</th><td className="px-3 py-2">× {fmt(values.ownershipPct, 1)}%</td><td className="px-3 py-2 text-right">{lcu(result.investorShareLcuM)}</td></tr>
                  <tr><th scope="row" className="px-3 py-2 font-medium text-ink">After exit costs</th><td className="px-3 py-2">× (1 − {fmt(values.exitCostPct, 1)}%)</td><td className="px-3 py-2 text-right">{lcu(result.afterCostsLcuM)}</td></tr>
                  <tr><th scope="row" className="px-3 py-2 font-medium text-ink">If FX unchanged</th><td className="px-3 py-2">÷ {fmt(values.initialFx, 2)}</td><td className="px-3 py-2 text-right">{usd(result.proceedsAtInitialFxUsdM)}</td></tr>
                  <tr><th scope="row" className="px-3 py-2 font-medium text-ink">At exit FX</th><td className="px-3 py-2">÷ {fmt(values.initialFx, 2)} × (1 + {fmt(values.depreciationPct, 0)}%) = ÷ {fmt(result.exitFx, 2)}</td><td className="px-3 py-2 text-right font-semibold text-ink">{usd(result.proceedsUsdM)}</td></tr>
                  <tr><th scope="row" className="px-3 py-2 font-medium text-ink">MOIC</th><td className="px-3 py-2">÷ entry {usd(values.entryUsdM)}</td><td className="px-3 py-2 text-right">{fmt(result.moic, 3)}x</td></tr>
                  <tr><th scope="row" className="px-3 py-2 font-medium text-ink">Annualised</th><td className="px-3 py-2">MOIC^(1/{values.years}) − 1</td><td className="px-3 py-2 text-right">{result.annualisedReturn === null ? "n/a" : pct(result.annualisedReturn)}</td></tr>
                </tbody>
              </table>
            </div>

            {grid ? (
              <>
                <h4 className="mt-8 font-serif text-lg text-ink">Sensitivity: MOIC by exit P/E and cumulative depreciation</h4>
                <p className="mt-1 text-xs text-ink-3">Other inputs held at current values. Cells below 1.0x are marked ↓ and shaded. The cell matching current inputs, if shown, is outlined.</p>
                <div className="mt-2 overflow-x-auto rounded-lg border border-rule" role="region" aria-label="Sensitivity table" tabIndex={0}>
                  <table className="w-full text-sm">
                    <caption className="sr-only">MOIC for combinations of exit P/E (columns) and cumulative local-currency depreciation (rows)</caption>
                    <thead className="bg-paper-2 text-[0.72rem] uppercase tracking-[0.06em] text-ink-2">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left">Depreciation ↓ / P/E →</th>
                        {PES.map((p) => (
                          <th key={p} scope="col" className="px-3 py-2 text-right">{p}x</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="num-tab">
                      {grid.map((row, ri) => (
                        <tr key={DEPS[ri]} className="border-t border-rule/70">
                          <th scope="row" className="px-3 py-2 text-left font-medium text-ink">{DEPS[ri]}%</th>
                          {row.map((m, ci) => {
                            const current = PES[ci] === values.exitPe && DEPS[ri] === values.depreciationPct;
                            const below = m < 1;
                            return (
                              <td key={ci} className={`px-3 py-2 text-right ${below ? "bg-risk-2/50 text-ink-2" : "text-ink"} ${current ? "outline-2 -outline-offset-2 outline-ink font-semibold" : ""}`}>
                                {below ? <span aria-label="below 1.0x">↓ </span> : null}
                                {fmt(m, 2)}x
                                {current ? <span className="sr-only"> (current inputs)</span> : null}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
          </>
        ) : null}

        <div className="mt-8 rounded-lg border border-rule bg-paper-2/60 p-5 text-sm leading-relaxed text-ink-2">
          <p className="font-medium text-ink">How to read this result</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Equity value is exit-year earnings × P/E. A P/E values equity directly, so no net-debt bridge is applied. An enterprise-value method (for example EV/EBITDA) would need one, and for regulated lenders P/B or dividend-based methods are often more meaningful.</li>
            <li>The annualised figure is valid only because there is one outflow and one inflow. It is not a general IRR. Dividends, staged drawdowns or partial exits need a proper cash-flow IRR.</li>
            <li>A larger LCU/USD number means a weaker local currency. Depreciation reduces USD proceeds even when local earnings meet plan.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
