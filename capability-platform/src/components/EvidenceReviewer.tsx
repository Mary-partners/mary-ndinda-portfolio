"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { reviewEvidence } from "@/app/actions/evidence";
import { StatusBadge } from "@/components/ui/Badge";
import { fmtDate } from "@/lib/utils";
import { Loader2, Check, X, HelpCircle } from "lucide-react";

export interface EvidenceItem {
  id: string;
  name: string;
  type: string;
  period: string | null;
  status: string;
  submittedBy: string | null;
  createdAt: string;
  companyName: string;
  companyId: string;
  planTitle: string | null;
  reviews: { decision: string; comment: string | null; createdAt: string }[];
}

export function EvidenceReviewer({ items, canVerify }: { items: EvidenceItem[]; canVerify: boolean }) {
  const router = useRouter();
  const [active, setActive] = React.useState<string | null>(items[0]?.id ?? null);
  const [comment, setComment] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const current = items.find((i) => i.id === active) ?? null;

  async function act(decision: "verified" | "rejected" | "more_info") {
    if (!current) return;
    if (!comment.trim()) { alert("A reviewer comment is required."); return; }
    setPending(true);
    try {
      await reviewEvidence({ evidenceId: current.id, decision, comment });
      setComment("");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <div className="card max-h-[70vh] overflow-y-auto p-2">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => { setActive(it.id); setComment(""); }}
            className={`mb-1 block w-full rounded-lg p-3 text-left text-sm transition-colors ${active === it.id ? "bg-navy-700 text-white" : "hover:bg-surface-muted"}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-medium">{it.name}</span>
            </div>
            <div className={`mt-0.5 text-xs ${active === it.id ? "text-white/70" : "text-ink-muted"}`}>{it.companyName}</div>
            <div className="mt-1"><StatusBadge status={it.status} /></div>
          </button>
        ))}
        {items.length === 0 && <p className="p-4 text-sm text-ink-muted">No evidence submitted yet.</p>}
      </div>

      <div className="card p-5">
        {current ? (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-navy-700">{current.name}</h2>
                <p className="text-sm text-ink-muted">
                  {current.type} · {current.period ?? "—"} · submitted by {current.submittedBy ?? "—"} on {fmtDate(current.createdAt)}
                </p>
                <Link href={`/portfolio/${current.companyId}`} className="text-sm text-gold-700 hover:underline">{current.companyName}</Link>
                {current.planTitle && <span className="text-sm text-ink-muted"> · {current.planTitle}</span>}
              </div>
              <StatusBadge status={current.status} />
            </div>

            <div className="mt-4 rounded-lg border border-dashed border-navy/20 bg-surface-muted p-6 text-center text-sm text-ink-muted">
              Evidence document preview (metadata-only in this demo build). In production this pane shows the
              uploaded file via a signed, expiring URL alongside the assessment requirement.
            </div>

            {current.reviews.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase text-ink-muted">Review history</h3>
                <ul className="mt-2 space-y-1.5">
                  {current.reviews.map((r, i) => (
                    <li key={i} className="rounded-lg bg-surface-muted p-2 text-sm">
                      <span className="font-medium capitalize text-navy-700">{r.decision.replace("_", " ")}</span>
                      <span className="text-ink-muted"> · {fmtDate(r.createdAt)}</span>
                      {r.comment && <p className="text-xs text-ink-muted">{r.comment}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {canVerify ? (
              <div className="mt-5">
                <label className="text-xs font-semibold uppercase text-ink-muted">Reviewer comment (required)</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="input mt-1 min-h-[80px]" placeholder="Explain your decision; verified implementation requires evidence across operating cycles…" />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button disabled={pending} onClick={() => act("verified")} className="btn bg-emerald-600 text-white hover:bg-emerald-700">
                    {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Verify
                  </button>
                  <button disabled={pending} onClick={() => act("more_info")} className="btn bg-amber-500 text-white hover:bg-amber-600">
                    <HelpCircle className="h-4 w-4" /> Request more info
                  </button>
                  <button disabled={pending} onClick={() => act("rejected")} className="btn bg-red-600 text-white hover:bg-red-700">
                    <X className="h-4 w-4" /> Reject
                  </button>
                </div>
                <p className="mt-2 text-xs text-ink-muted">Rejecting evidence does not count the linked practice as verified.</p>
              </div>
            ) : (
              <p className="mt-5 rounded-lg bg-surface-muted p-3 text-sm text-ink-muted">Your role can view evidence but not verify it. Sign in as the Independent Reviewer or Programme Manager to verify.</p>
            )}
          </>
        ) : (
          <p className="text-sm text-ink-muted">Select an evidence item to review.</p>
        )}
      </div>
    </div>
  );
}
