"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { computeScores, type ScoringResponse } from "@/lib/scoring";
import { MATURITY_ANCHORS } from "@/lib/constants";
import { saveResponse } from "@/app/actions/assessment";
import { finalizeAssessment } from "@/app/actions/assessment";
import { fmtScore, cn } from "@/lib/utils";
import { Check, Loader2, Info } from "lucide-react";

interface Q { id: string; text: string; helpText?: string | null; weight: number }
interface Dim { id: string; key: string; name: string; weight: number; questions: Q[] }
interface Resp { score: number | null; applicable: boolean; evidenceStatus: string }

export function DiagnosticEditor({
  assessmentId,
  companyId,
  editable,
  canFinalize,
  dimensions,
  initial,
}: {
  assessmentId: string;
  companyId: string;
  editable: boolean;
  canFinalize: boolean;
  dimensions: Dim[];
  initial: Record<string, Resp>;
}) {
  const router = useRouter();
  const [responses, setResponses] = React.useState<Record<string, Resp>>(initial);
  const [saving, setSaving] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState<string | null>(null);
  const [finalizing, setFinalizing] = React.useState(false);

  const scoringDims = dimensions.map((d) => ({ id: d.id, key: d.key, weight: d.weight }));
  const scoringQs = dimensions.flatMap((d) => d.questions.map((q) => ({ id: q.id, dimensionId: d.id, weight: q.weight })));
  const scoringResponses: ScoringResponse[] = Object.entries(responses).map(([questionId, r]) => ({
    questionId, score: r.score, applicable: r.applicable, evidenceStatus: r.evidenceStatus,
  }));
  const result = computeScores(scoringDims, scoringQs, scoringResponses);
  const dimScore = (dimId: string) => result.dimensions.find((d) => d.dimensionId === dimId)?.score ?? null;

  async function persist(questionId: string, next: Resp) {
    if (!editable) return;
    setSaving(questionId);
    try {
      await saveResponse({
        assessmentId, questionId,
        score: next.score, applicable: next.applicable, evidenceStatus: next.evidenceStatus,
        confidence: next.score !== null && next.score >= 3 ? "high" : next.score !== null && next.score >= 2 ? "medium" : "low",
      });
      setSaved(questionId);
      setTimeout(() => setSaved((s) => (s === questionId ? null : s)), 1200);
    } finally {
      setSaving(null);
    }
  }

  function setScore(q: Q, score: number) {
    const prev = responses[q.id] ?? { score: null, applicable: true, evidenceStatus: "none" };
    const next = { ...prev, score };
    setResponses((r) => ({ ...r, [q.id]: next }));
    void persist(q.id, next);
  }
  function toggleApplicable(q: Q) {
    const prev = responses[q.id] ?? { score: null, applicable: true, evidenceStatus: "none" };
    const next = { ...prev, applicable: !prev.applicable };
    setResponses((r) => ({ ...r, [q.id]: next }));
    void persist(q.id, next);
  }
  function setEvidence(q: Q, evidenceStatus: string) {
    const prev = responses[q.id] ?? { score: null, applicable: true, evidenceStatus: "none" };
    const next = { ...prev, evidenceStatus };
    setResponses((r) => ({ ...r, [q.id]: next }));
    void persist(q.id, next);
  }

  async function doFinalize() {
    setFinalizing(true);
    try {
      await finalizeAssessment(assessmentId);
      router.push(`/portfolio/${companyId}/results?assessment=${assessmentId}`);
      router.refresh();
    } finally {
      setFinalizing(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        {dimensions.map((dim, di) => (
          <section key={dim.id} className="card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-navy-700">{di + 1}. {dim.name}</h2>
              <span className="text-xs text-ink-muted">Dimension score: <strong className="text-navy-700">{fmtScore(dimScore(dim.id))}</strong></span>
            </div>
            <div className="space-y-4">
              {dim.questions.map((q) => {
                const r = responses[q.id] ?? { score: null, applicable: true, evidenceStatus: "none" };
                return (
                  <div key={q.id} className={cn("rounded-lg border border-navy/10 p-3", !r.applicable && "opacity-60")}>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-ink">{q.text}</p>
                      <span className="mt-0.5 w-4 shrink-0">
                        {saving === q.id ? <Loader2 className="h-4 w-4 animate-spin text-navy-400" /> : saved === q.id ? <Check className="h-4 w-4 text-emerald-600" /> : null}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <button
                          key={s}
                          disabled={!editable || !r.applicable}
                          onClick={() => setScore(q, s)}
                          title={MATURITY_ANCHORS[s].label}
                          className={cn(
                            "h-8 w-8 rounded-md border text-sm font-medium transition-colors",
                            r.score === s ? "border-navy-700 bg-navy-700 text-white" : "border-navy/15 bg-white text-navy-600 hover:border-navy-400",
                            (!editable || !r.applicable) && "cursor-not-allowed"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                      <span className="ml-1 text-xs text-ink-muted">{r.score !== null ? MATURITY_ANCHORS[r.score].label : "Not scored"}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <select
                          value={r.evidenceStatus}
                          disabled={!editable || !r.applicable}
                          onChange={(e) => setEvidence(q, e.target.value)}
                          className="rounded-md border border-navy/15 bg-white px-2 py-1 text-xs text-navy-600"
                        >
                          <option value="none">No evidence</option>
                          <option value="claimed">Claimed</option>
                          <option value="verified">Verified</option>
                        </select>
                        <label className="flex items-center gap-1 text-xs text-ink-muted">
                          <input type="checkbox" checked={!r.applicable} disabled={!editable} onChange={() => toggleApplicable(q)} />
                          N/A
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Live score sidebar */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="card p-5">
          <div className="stat-label">Live overall maturity</div>
          <div className="mt-1 text-3xl font-semibold text-gold-700">{fmtScore(result.overall)}</div>
          <div className="mt-1 text-xs text-ink-muted">
            Completeness {Math.round(result.completeness * 100)}% · Evidence {Math.round(result.evidenceCoverage * 100)}%
          </div>
          <div className="mt-4 space-y-1.5">
            {dimensions.map((d) => (
              <div key={d.id} className="flex items-center justify-between text-xs">
                <span className="truncate text-ink-muted">{d.name}</span>
                <span className="font-medium text-navy-700">{fmtScore(dimScore(d.id))}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-surface-muted p-2 text-[11px] text-ink-muted">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Unanswered questions are never scored as zero. Completeness is reported separately from maturity.
          </div>

          {editable ? (
            canFinalize ? (
              <button onClick={doFinalize} disabled={finalizing} className="btn-primary mt-4 w-full">
                {finalizing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finalise & view results"}
              </button>
            ) : (
              <p className="mt-4 text-xs text-ink-muted">Your role can edit but not finalise this assessment.</p>
            )
          ) : (
            <p className="mt-4 rounded-lg bg-surface-muted p-2 text-xs text-ink-muted">This assessment is finalised and immutable. Start a reassessment to change scores.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
