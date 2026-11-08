"use client";

import { useMemo, useState } from "react";
import { CRITERIA, DEFAULT_MARKETS, SCREENS, normaliseWeights, scoreMarkets, type MarketInput, type ScreenState } from "@/lib/prioritisation";
import { EvidenceBadge } from "./evidence-badge";

const defaultWeights = () => Object.fromEntries(CRITERIA.map((c) => [c.id, c.defaultWeight]));
const clone = (m: MarketInput[]) => m.map((x) => ({ ...x, scores: { ...x.scores }, screens: { ...x.screens } }));

const statusText = { scored: "Scored", incomplete: "Incomplete", excluded: "Excluded by screen" } as const;
const statusGlyph = { scored: "●", incomplete: "◌", excluded: "✕" } as const;

export function PrioritisationTool() {
  const [weights, setWeights] = useState<Record<string, number>>(defaultWeights);
  const [markets, setMarkets] = useState<MarketInput[]>(() => clone(DEFAULT_MARKETS));

  const norm = useMemo(() => normaliseWeights(weights), [weights]);
  const rawTotal = Object.values(weights).reduce((a, b) => a + (b > 0 ? b : 0), 0);
  const { results, weightsValid } = useMemo(() => scoreMarkets(markets, weights), [markets, weights]);

  const setScore = (mid: string, cid: string, v: string) =>
    setMarkets((ms) => ms.map((m) => (m.id === mid ? { ...m, scores: { ...m.scores, [cid]: v === "" ? null : Number(v) } } : m)));
  const setScreen = (mid: string, sid: string, v: ScreenState) =>
    setMarkets((ms) => ms.map((m) => (m.id === mid ? { ...m, screens: { ...m.screens, [sid]: v } } : m)));

  const ranked = [...results].sort((a, b) => {
    const order = { scored: 0, incomplete: 1, excluded: 2 } as const;
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    return (b.score ?? 0) - (a.score ?? 0);
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <EvidenceBadge kind="illustrative" />
        <EvidenceBadge kind="proposed" />
        <button
          type="button"
          onClick={() => {
            setWeights(defaultWeights());
            setMarkets(clone(DEFAULT_MARKETS));
          }}
          className="ml-auto rounded-full border border-dashed border-ink/40 px-3.5 py-1.5 text-sm text-ink-2 hover:border-ink"
        >
          Reset tool
        </button>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-3">
        A prioritisation aid, not an approved underwriting policy. Default scores are placeholders for demonstration and are not a view on any country. A blank score means the evidence is missing. That market shows as <strong>Incomplete</strong>, not as zero. Any failed screen excludes a market whatever its score.
      </p>

      {/* Weights */}
      <fieldset className="mt-6 rounded-xl border border-rule bg-white/60 p-5">
        <legend className="px-1 font-serif text-lg text-ink">Criterion weights</legend>
        <p className="text-sm text-ink-3">
          Enter any relative weights. They are normalised to 100. Raw total: <span className="num-tab font-medium text-ink">{rawTotal}</span>
          {!weightsValid ? <span className="ml-2 font-medium text-risk">⚠ At least one weight must be above zero.</span> : null}
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map((c) => (
            <div key={c.id} className="grid grid-cols-[1fr_4.5rem_3.5rem] items-center gap-2">
              <label htmlFor={`w-${c.id}`} className="text-sm leading-snug text-ink">
                {c.label}
                <span className="block text-[0.72rem] text-ink-3">{c.help}</span>
              </label>
              <input
                id={`w-${c.id}`}
                type="number"
                min={0}
                max={100}
                step={1}
                value={Number.isFinite(weights[c.id]) ? weights[c.id] : ""}
                onChange={(e) => setWeights((w) => ({ ...w, [c.id]: e.target.value === "" ? 0 : Math.max(0, Number(e.target.value)) }))}
                className="num-tab h-9 rounded-md border border-ink/25 bg-white px-2 text-right text-ink"
              />
              <span className="num-tab text-right text-xs text-ink-3" aria-label={`${c.label} normalised weight`}>
                {norm[c.id].toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Scores grid */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-rule bg-white/60" role="region" aria-label="Market scores and screens" tabIndex={0}>
        <table className="w-full min-w-[46rem] text-sm">
          <caption className="sr-only">Editable scores (1–5, blank for missing) and hard-stop screens by market</caption>
          <thead className="bg-paper-2 text-[0.72rem] uppercase tracking-[0.06em] text-ink-2">
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-paper-2 px-3 py-2 text-left">Criterion</th>
              {markets.map((m) => (
                <th key={m.id} scope="col" className="px-2 py-2 text-center">{m.name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-rule/70">
            {SCREENS.map((s) => (
              <tr key={s.id} className="bg-paper-2/40">
                <th scope="row" className="sticky left-0 z-10 bg-[#f7f3ea] px-3 py-2 text-left font-medium text-ink">
                  <span className="mr-1 text-xs text-risk">Screen</span> {s.label}
                </th>
                {markets.map((m) => (
                  <td key={m.id} className="px-2 py-1.5 text-center">
                    <label className="sr-only" htmlFor={`s-${m.id}-${s.id}`}>{`${s.label}, ${m.name}`}</label>
                    <select
                      id={`s-${m.id}-${s.id}`}
                      value={m.screens[s.id]}
                      onChange={(e) => setScreen(m.id, s.id, e.target.value as ScreenState)}
                      className={`h-8 w-full max-w-[8rem] rounded-md border bg-white px-1 text-sm ${m.screens[s.id] === "fail" ? "border-risk font-semibold text-risk" : m.screens[s.id] === "unknown" ? "border-dashed border-ink/40 text-ink-3" : "border-ink/25 text-ink"}`}
                    >
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}
            {CRITERIA.map((c) => (
              <tr key={c.id}>
                <th scope="row" className="sticky left-0 z-10 bg-[#fdfbf7] px-3 py-2 text-left font-medium text-ink">
                  {c.label} <span className="num-tab text-xs font-normal text-ink-3">({norm[c.id].toFixed(1)})</span>
                </th>
                {markets.map((m) => {
                  const v = m.scores[c.id];
                  return (
                    <td key={m.id} className="px-2 py-1.5 text-center">
                      <label className="sr-only" htmlFor={`c-${m.id}-${c.id}`}>{`${c.label} score for ${m.name}, 1 to 5, blank if missing`}</label>
                      <select
                        id={`c-${m.id}-${c.id}`}
                        value={v === null || v === undefined ? "" : String(v)}
                        onChange={(e) => setScore(m.id, c.id, e.target.value)}
                        className={`num-tab h-8 w-full max-w-[8rem] rounded-md border bg-white px-1 text-sm ${v === null ? "border-dashed border-ink/40 text-ink-3" : "border-ink/25 text-ink"}`}
                      >
                        <option value="">Missing</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Output */}
      <div className="mt-6" aria-live="polite">
        <h3 className="font-serif text-xl text-ink">Result</h3>
        <ol className="mt-3 divide-y divide-rule rounded-xl border border-rule bg-paper">
          {ranked.map((r) => (
            <li key={r.id} className="grid gap-2 p-4 sm:grid-cols-[3rem_10rem_8rem_1fr] sm:items-baseline">
              <span className="num-tab font-serif text-2xl text-gold">{r.rank ? `#${r.rank}` : "–"}</span>
              <span className="font-medium text-ink">{r.name}</span>
              <span className={`text-sm ${r.status === "excluded" ? "font-semibold text-risk" : r.status === "incomplete" ? "text-ink-3" : "text-ink"}`}>
                <span aria-hidden="true">{statusGlyph[r.status]} </span>
                {r.status === "scored" ? `${r.score!.toFixed(1)} / 100` : statusText[r.status]}
              </span>
              <span className="text-sm leading-snug text-ink-2">
                {r.status === "excluded"
                  ? `Failed: ${r.failedScreens.join("; ")}. Not ranked.`
                  : r.status === "incomplete"
                    ? [!weightsValid ? "No positive weights." : "", r.unknownScreens.length ? `Screens unconfirmed: ${r.unknownScreens.join("; ")}.` : "", r.missing.length ? `Missing evidence: ${r.missing.join("; ")}.` : ""].filter(Boolean).join(" ") + " Not ranked."
                    : "All screens pass and every weighted criterion has a score."}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs leading-relaxed text-ink-3">
          Score = Σ(normalised weight × score) ÷ 5. Equal scores share a rank. A rank decides where to look first. It does not approve exposure, which remains a CIO and Investment Committee decision informed by institution-level diligence.
        </p>
      </div>
    </div>
  );
}
