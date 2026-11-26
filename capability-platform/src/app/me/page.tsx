import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getCompanyDetail } from "@/lib/company";
import { getActionPlan } from "@/lib/recommend";
import { signOut } from "@/app/actions/session";
import { fmtIndex, maturityBand } from "@/lib/utils";
import { BASE_PATH } from "@/lib/constants";
import { Gauge, Download, RefreshCw, LogOut, ClipboardCheck, Building2, Target, ArrowRight, Compass, ListChecks } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FounderHome() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const companyRow = await prisma.company.findFirst({ where: { ownerUserId: user.id }, orderBy: { createdAt: "desc" }, select: { id: true, inviteToken: true } });
  const detail = companyRow ? await getCompanyDetail(companyRow.id) : null;
  const token = companyRow?.inviteToken ?? null;
  const assessed = Boolean(detail?.latest);
  const band = maturityBand(detail?.latest?.overallScore);
  const plan = assessed && detail ? await getActionPlan(detail.company.id) : null;

  const businessName = detail?.company.tradingName || detail?.company.legalName || "Your business";
  const sector = detail?.company.sector || null;
  const country = detail?.company.country || null;
  const firstName = user.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-navy-800 text-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-5" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-navy-900"><Gauge className="h-5 w-5" /></span>
            <div className="leading-tight"><div className="text-sm font-semibold">Management Capital Lab</div><div className="text-[11px] text-white/55">Your dashboard</div></div>
          </div>
          <form action={signOut}><button className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" /> Sign out</button></form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
        {/* Greeting */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-navy-700">Welcome back, {firstName}</h1>
            <p className="mt-1 text-sm text-ink-muted">This is your management capability dashboard. It shows where your business stands today and the practical steps worth taking next.</p>
          </div>
        </div>

        {/* Business profile */}
        <section className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
          <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-700 text-white"><Building2 className="h-5 w-5" /></span>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-navy-700">{businessName}</h2>
                <p className="mt-0.5 text-sm text-ink-muted">Led by {user.name}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-navy/10 bg-surface-muted px-3 py-2.5">
                <dt className="text-[11px] uppercase tracking-wide text-ink-muted">Sector</dt>
                <dd className="mt-0.5 text-sm font-medium text-navy-700">{sector ?? "Not set yet"}</dd>
              </div>
              <div className="rounded-lg border border-navy/10 bg-surface-muted px-3 py-2.5">
                <dt className="text-[11px] uppercase tracking-wide text-ink-muted">Country</dt>
                <dd className="mt-0.5 text-sm font-medium text-navy-700">{country ?? "Not set yet"}</dd>
              </div>
              <div className="rounded-lg border border-navy/10 bg-surface-muted px-3 py-2.5">
                <dt className="text-[11px] uppercase tracking-wide text-ink-muted">Status</dt>
                <dd className="mt-0.5 text-sm font-medium text-navy-700">{assessed ? band.label : "Not assessed yet"}</dd>
              </div>
            </dl>
          </div>
        </section>

        {!assessed ? (
          /* First-run: clear call to start the diagnostic */
          <section className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
            <div className="p-6 sm:p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-700"><Compass className="h-5 w-5" /></span>
              <h2 className="mt-3 text-lg font-semibold text-navy-700">Start your diagnostic</h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-muted">The Management Capital diagnostic is a set of 36 short questions across six areas of how your business is run. It takes about 15 minutes. When you finish, you get your Management Capital Index, your band, and a clear set of next steps for the coming 90 days.</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  { icon: ClipboardCheck, t: "36 short questions, roughly 15 minutes" },
                  { icon: Gauge, t: "Your Index from 0 to 100 and your band" },
                  { icon: ListChecks, t: "Practical action points to work on" },
                ].map((p) => (
                  <li key={p.t} className="rounded-lg border border-navy/10 bg-surface-muted p-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-gold-700"><p.icon className="h-4 w-4" /></span>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">{p.t}</p>
                  </li>
                ))}
              </ul>
              {token && <a href={`${BASE_PATH}/assess/${token}`} className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-600 hover:text-white">Start your diagnostic <ArrowRight className="h-4 w-4" /></a>}
            </div>
          </section>
        ) : (
          <>
            {/* Result */}
            <section className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Your Management Capital Index</h2>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-4xl font-semibold text-gold-700">{fmtIndex(detail!.latest!.overallScore)}</span>
                      <span className="text-sm text-ink-muted">/ 100</span>
                      <span className="rounded-full bg-navy-700/10 px-2.5 py-0.5 text-sm font-medium text-navy-700">{band.label}</span>
                    </div>
                    <p className="mt-1.5 max-w-md text-xs leading-relaxed text-ink-muted">{band.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href={`${BASE_PATH}/api/report/company/${detail!.company.id}`} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-navy-700 px-4 text-sm font-semibold text-white hover:bg-navy-800"><Download className="h-4 w-4" /> PDF report</a>
                    {token && <a href={`${BASE_PATH}/assess/${token}`} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-navy/20 px-4 text-sm font-semibold text-navy-700 hover:bg-surface-muted"><RefreshCw className="h-4 w-4" /> Retake</a>}
                  </div>
                </div>
                <div className="mt-5 space-y-2.5">
                  {detail!.dimRows.map((d) => {
                    const v = fmtIndex(d.current);
                    return (
                      <div key={d.key} className="flex items-center gap-3">
                        <div className="w-40 shrink-0 text-sm text-navy-700 sm:w-48">{d.name}</div>
                        <div className="h-2 flex-1 rounded-full bg-navy/10"><div className="h-2 rounded-full bg-gold" style={{ width: `${v === "n/a" ? 0 : v}%` }} /></div>
                        <div className="w-10 text-right text-sm font-medium text-navy-700">{v}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Action points */}
            {plan && plan.priorities.length > 0 && (
              <section className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-gold-700"><Target className="h-4 w-4" /></span>
                    <h2 className="text-base font-semibold text-navy-700">What to work on next</h2>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-muted">These steps come from the practices you rated lowest, weighted by how much each area counts. Start at the top.</p>
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
                        {plan.moreActions.slice(0, 5).map((m) => (
                          <li key={`${m.pillarKey}-${m.order}`} className="flex items-start gap-2 text-sm text-navy-700">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            <span>{m.action} <span className="text-ink-muted">({m.pillarName})</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {plan && plan.priorities.length === 0 && (
              <section className="mt-5 rounded-xl border border-navy/10 bg-white p-5 shadow-card sm:p-6">
                <h2 className="text-base font-semibold text-navy-700">A strong baseline</h2>
                <p className="mt-1.5 text-sm text-ink-muted">You rated most practices as regular or embedded. Keep these habits in place, and retake the diagnostic in a few months to track how your business is maturing.</p>
              </section>
            )}

            <p className="mt-4 text-xs text-ink-muted">Your answers are self-reported. Retaking the diagnostic records a new result so you can track progress over time.</p>
          </>
        )}
      </main>
    </div>
  );
}
