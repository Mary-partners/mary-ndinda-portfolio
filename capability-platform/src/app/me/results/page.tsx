import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getCompanyDetail } from "@/lib/company";
import { getActionPlan } from "@/lib/recommend";
import { fmtIndex, indexScore, maturityBand } from "@/lib/utils";
import { BASE_PATH } from "@/lib/constants";
import { Download, ClipboardCheck, Target, TrendingUp, Minus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FounderResultsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const companyRow = await prisma.company.findFirst({ where: { ownerUserId: user.id }, orderBy: { createdAt: "desc" }, select: { id: true } });
  const detail = companyRow ? await getCompanyDetail(companyRow.id) : null;

  if (!detail || !detail.latest) {
    return (
      <div className="mx-auto w-full max-w-4xl px-5 py-7">
        <h1 className="text-2xl font-semibold text-navy-700">My results</h1>
        <div className="mt-5 rounded-xl border border-navy/10 bg-white p-6 text-center shadow-card sm:p-8">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-700"><ClipboardCheck className="h-5 w-5" /></span>
          <h2 className="mt-3 text-lg font-semibold text-navy-700">No results yet</h2>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-muted">Take the diagnostic to see your Management Capital Index, how each area scores, and your action plan.</p>
          <Link href="/me/diagnostic" className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 hover:bg-gold-600 hover:text-white">Take the diagnostic</Link>
        </div>
      </div>
    );
  }

  const band = maturityBand(detail.latest.overallScore);
  const plan = await getActionPlan(detail.company.id);
  const retaken = Boolean(detail.baseline && detail.latest && detail.baseline.id !== detail.latest.id);

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-navy-700">My results</h1>
          <p className="mt-1 text-sm text-ink-muted">Your Index is {fmtIndex(detail.latest.overallScore)} out of 100, which places you in the {band.label} band. {band.description}</p>
        </div>
        <a href={`${BASE_PATH}/api/report/company/${detail.company.id}`} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-navy-700 px-4 text-sm font-semibold text-white hover:bg-navy-800"><Download className="h-4 w-4" /> PDF report</a>
      </div>

      {/* Per-pillar detail */}
      <section className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
        <div className="p-5 sm:p-6">
          <h2 className="text-base font-semibold text-navy-700">How each area scored</h2>
          <p className="mt-1 text-sm text-ink-muted">
            {retaken
              ? "Your current level is shown against your first assessment, so you can see what has changed."
              : "This is your first assessment, so it is also your baseline. The gap shows how much room there is to reach a fully embedded practice. Retake later to track change over time."}
          </p>
          <div className="mt-4 space-y-3">
            {detail.dimRows.map((d) => {
              const now = indexScore(d.current);
              const base = indexScore(d.baseline);
              const delta = now !== null && base !== null ? now - base : null;
              const roomToGrow = now !== null ? 100 - now : null;
              return (
                <div key={d.key} className="rounded-xl border border-navy/10 bg-surface-muted p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium text-navy-700">{d.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-navy-800">{fmtIndex(d.current)}<span className="text-xs font-normal text-ink-muted"> / 100</span></span>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-navy-700">{maturityBand(d.current).label}</span>
                    </div>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-navy/10"><div className="h-2 rounded-full bg-gold" style={{ width: `${now ?? 0}%` }} /></div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted">
                    <span>{roomToGrow !== null ? `${roomToGrow} points of room to grow` : "Not answered"}</span>
                    {retaken && delta !== null && (
                      <span className={`inline-flex items-center gap-1 font-medium ${delta > 0 ? "text-emerald-700" : delta < 0 ? "text-bad" : "text-ink-muted"}`}>
                        {delta > 0 ? <TrendingUp className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                        {delta > 0 ? `+${delta}` : delta} vs first
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full action plan */}
      <section className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-gold-700"><Target className="h-4 w-4" /></span>
            <h2 className="text-base font-semibold text-navy-700">Your action plan</h2>
          </div>
          {!plan || plan.priorities.length === 0 ? (
            <p className="mt-2 text-sm text-ink-muted">You rated most practices as regular or embedded. Keep these habits in place and reassess in a few months to confirm they are holding.</p>
          ) : (
            <>
              <p className="mt-1.5 text-sm text-ink-muted">Ordered from the practices you rated lowest, weighted by how much each area counts. Start at the top and work down.</p>
              <ol className="mt-4 space-y-3">
                {plan.priorities.map((p, i) => (
                  <li key={`${p.pillarKey}-${p.order}`} className="rounded-xl border border-navy/10 bg-surface-muted p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-700 text-xs font-semibold text-white">{i + 1}</span>
                        <span className="text-xs font-medium uppercase tracking-wide text-gold-700">{p.horizon}</span>
                      </span>
                      <span className="text-[11px] text-ink-muted">{p.pillarName}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-navy-800">{p.action}</p>
                  </li>
                ))}
              </ol>
              {plan.moreActions.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Then look at</div>
                  <ul className="mt-2 space-y-1.5">
                    {plan.moreActions.map((m) => (
                      <li key={`${m.pillarKey}-${m.order}`} className="flex items-start gap-2 text-sm text-navy-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span>{m.action} <span className="text-ink-muted">({m.pillarName})</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <p className="mt-4 text-xs text-ink-muted">Your answers are self-reported. Any evidence you offer is only treated as verified once an independent reviewer confirms it.</p>
    </div>
  );
}
