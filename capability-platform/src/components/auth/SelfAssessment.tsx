"use client";

import * as React from "react";
import { submitSelfAssessment, type SelfResponse } from "@/app/actions/self-assess";
import { MATURITY_ANCHORS } from "@/lib/constants";
import { Gauge, Loader2, Check } from "lucide-react";

type Q = { id: string; text: string; helpText: string | null };
type Dim = { key: string; name: string; description: string | null; questions: Q[] };
type Answer = { score: number | null; na: boolean; hasEvidence: boolean };

export function SelfAssessment({ token, companyName, orgName, defaultFounder, dimensions }: {
  token: string; companyName: string; orgName: string; defaultFounder: string; dimensions: Dim[];
}) {
  const allQ = React.useMemo(() => dimensions.flatMap((d) => d.questions), [dimensions]);
  const [founder, setFounder] = React.useState(defaultFounder);
  const [ans, setAns] = React.useState<Record<string, Answer>>({});
  const [pending, setPending] = React.useState(false);

  const answered = Object.values(ans).filter((a) => a.na || a.score !== null).length;
  const total = allQ.length;
  const pct = total ? Math.round((answered / total) * 100) : 0;

  function set(qid: string, patch: Partial<Answer>) {
    setAns((prev) => {
      const base: Answer = prev[qid] ?? { score: null, na: false, hasEvidence: false };
      return { ...prev, [qid]: { ...base, ...patch } };
    });
  }

  async function submit() {
    if (pending) return;
    setPending(true);
    const responses: SelfResponse[] = allQ.map((q) => {
      const a = ans[q.id] ?? { score: null, na: false, hasEvidence: false };
      return { questionId: q.id, score: a.na ? null : a.score, applicable: !a.na, hasEvidence: a.hasEvidence };
    });
    try {
      await submitSelfAssessment(token, founder, responses);
    } catch (e) {
      // redirect() throws NEXT_REDIRECT by design; only real errors reach here.
      if (e && typeof e === "object" && "digest" in e && String((e as { digest?: string }).digest).startsWith("NEXT_REDIRECT")) return;
      setPending(false);
      alert("Something went wrong submitting your assessment. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-surface-muted pb-28">
      {/* header */}
      <header className="bg-navy-800 text-white">
        <div className="mx-auto w-full max-w-3xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-navy-900"><Gauge className="h-5 w-5" /></span>
            <div className="leading-tight"><div className="text-sm font-semibold">Management Capital Lab</div><div className="text-[11px] text-white/55">Self-assessment · invited by {orgName}</div></div>
          </div>
          <h1 className="mt-5 text-2xl font-semibold">Management capability check — {companyName}</h1>
          <p className="mt-2 max-w-xl text-sm text-white/70">About {total} short questions, roughly 15 minutes. Answer as honestly as you can — there are no right or wrong answers, and an honest baseline is the most useful. Rate each practice from 0 to 4.</p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
        {/* scale legend */}
        <div className="mt-5 rounded-xl border border-navy/10 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">The 0–4 scale</div>
          <div className="mt-2 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {MATURITY_ANCHORS.map((m) => (
              <div key={m.score} className="flex gap-2 text-sm">
                <span className="font-semibold text-gold-700">{m.score}</span>
                <span><span className="font-medium text-navy-700">{m.label}</span> <span className="text-ink-muted">— {m.desc}</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* founder name */}
        <div className="mt-4 rounded-xl border border-navy/10 bg-white p-4">
          <label className="block text-sm font-medium text-navy-700" htmlFor="founder">Your name <span className="font-normal text-ink-muted">(optional)</span></label>
          <input id="founder" value={founder} onChange={(e) => setFounder(e.target.value)} className="input mt-2" placeholder="Who is completing this?" />
        </div>

        {/* questions by dimension */}
        {dimensions.map((d, di) => (
          <section key={d.key} className="mt-5">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-semibold text-gold-700">{String(di + 1).padStart(2, "0")}</span>
              <h2 className="text-base font-semibold text-navy-700">{d.name}</h2>
            </div>
            {d.description && <p className="mt-0.5 text-xs text-ink-muted">{d.description}</p>}
            <div className="mt-3 space-y-3">
              {d.questions.map((q) => {
                const a = ans[q.id];
                return (
                  <div key={q.id} className="rounded-xl border border-navy/10 bg-white p-4">
                    <p className="text-sm text-navy-800">{q.text}</p>
                    {q.helpText && <p className="mt-1 text-xs text-ink-muted">{q.helpText}</p>}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {[0, 1, 2, 3, 4].map((n) => {
                        const active = a?.score === n && !a?.na;
                        return (
                          <button key={n} type="button" onClick={() => set(q.id, { score: n, na: false })}
                            className={`h-9 w-9 rounded-lg border text-sm font-semibold transition-colors ${active ? "border-navy-700 bg-navy-700 text-white" : "border-navy/15 bg-white text-navy-700 hover:bg-surface-muted"}`}>{n}</button>
                        );
                      })}
                      <button type="button" onClick={() => set(q.id, { na: !a?.na, score: null })}
                        className={`ml-1 h-9 rounded-lg border px-3 text-xs font-medium transition-colors ${a?.na ? "border-ink-muted bg-ink-muted text-white" : "border-navy/15 bg-white text-ink-muted hover:bg-surface-muted"}`}>N/A</button>
                    </div>
                    {a && !a.na && a.score !== null && (
                      <label className="mt-2.5 inline-flex cursor-pointer items-center gap-2 text-xs text-ink-muted">
                        <input type="checkbox" checked={a.hasEvidence} onChange={(e) => set(q.id, { hasEvidence: e.target.checked })} className="h-3.5 w-3.5 rounded border-navy/30" />
                        I can provide evidence for this if asked
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <p className="mt-6 text-xs text-ink-muted">Your answers are self-reported. They help build a capability baseline; any evidence you offer is only treated as verified once an independent reviewer confirms it.</p>
      </div>

      {/* sticky submit bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-navy/10 bg-white/95 backdrop-blur" style={{ paddingBottom: "env(safe-area-inset-bottom,0px)" }}>
        <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-5 py-3" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs text-ink-muted"><span>{answered} of {total} answered</span><span>{pct}%</span></div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-navy/10"><div className="h-1.5 rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} /></div>
          </div>
          <button onClick={submit} disabled={pending || answered === 0}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit &amp; get my report <Check className="h-4 w-4" /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
