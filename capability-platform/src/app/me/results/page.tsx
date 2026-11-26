import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getFounderV2 } from "@/lib/founder-v2";
import { BASE_PATH, DIMENSION_META } from "@/lib/constants";
import { Download, ClipboardCheck, Target, AlertTriangle } from "lucide-react";
import { PillarCard, ActionItem } from "@/components/founder/Results";

export const dynamic = "force-dynamic";

const META = new Map(DIMENSION_META.map((d) => [d.key, d]));

export default async function FounderResultsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const company = await prisma.company.findFirst({ where: { ownerUserId: user.id }, orderBy: { createdAt: "desc" }, select: { id: true } });
  const fv = company ? await getFounderV2(company.id) : { state: "none" as const };

  if (fv.state !== "v2") {
    return (
      <div className="mx-auto w-full max-w-4xl px-5 py-7">
        <h1 className="text-2xl font-semibold text-navy-700">My results</h1>
        <div className="mt-5 rounded-xl border border-navy/10 bg-white p-6 text-center shadow-card sm:p-8">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-700"><ClipboardCheck className="h-5 w-5" /></span>
          <h2 className="mt-3 text-lg font-semibold text-navy-700">{fv.state === "legacy" ? "Take the revised diagnostic" : "No results yet"}</h2>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-muted">{fv.state === "legacy" ? "Your earlier result used a previous version. Take the revised diagnostic to see your full breakdown and action plan." : "Take the diagnostic to see your Index, how each area scores, and your action plan."}</p>
          <Link href="/me/diagnostic" className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 hover:bg-gold-600 hover:text-white">Take the diagnostic</Link>
        </div>
      </div>
    );
  }

  const { result, plan } = fv;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-navy-700">My results</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {result.mci !== null
              ? <>Your Index is {result.mci} out of 100, a {result.overallBand.label.toLowerCase()} level. {result.overallBand.blurb}</>
              : <>Not enough questions were answered to show an overall Index.</>}
            {" "}{result.totalNumeric} of {result.totalApplicable} applicable questions scored.
          </p>
        </div>
        {company && <a href={`${BASE_PATH}/api/report/company/${company.id}`} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-navy-700 px-4 text-sm font-semibold text-white hover:bg-navy-800"><Download className="h-4 w-4" /> PDF report</a>}
      </div>

      {/* Per-pillar */}
      <section className="mt-5 rounded-xl border border-navy/10 bg-white p-5 shadow-card">
        <h2 className="text-base font-semibold text-navy-700">How each area scored</h2>
        <p className="mt-1 text-sm text-ink-muted">Each area shows your level out of 100, your maturity, and the gap to a fully embedded practice (on the underlying 0 to 4 scale).</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {result.pillars.map((p) => <PillarCard key={p.key} p={p} label={META.get(p.key)?.label} description={META.get(p.key)?.description} />)}
        </div>
      </section>

      {/* Financial essentials */}
      {plan.startNow.length > 0 && (
        <section className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-5 shadow-card">
          <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100 text-amber-700"><AlertTriangle className="h-4 w-4" /></span><h2 className="text-base font-semibold text-navy-700">Financial essentials to start now</h2></div>
          <ul className="mt-3 space-y-2">
            {plan.startNow.map((c) => (
              <li key={c.code} className="rounded-lg border border-amber-200 bg-white p-3">
                <div className="text-sm font-medium text-navy-800">{c.item.question}</div>
                <div className="mt-1 text-xs text-ink-muted">{c.item.why} <span className="font-medium text-navy-700">Do this:</span> {c.item.action}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Full action plan */}
      <section className="mt-5 rounded-xl border border-navy/10 bg-white p-5 shadow-card">
        <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-gold-700"><Target className="h-4 w-4" /></span><h2 className="text-base font-semibold text-navy-700">Your 90-day action plan</h2></div>
        {plan.priorities.length === 0 ? (
          <p className="mt-2 text-sm text-ink-muted">You rated most practices at a routine level or higher. Keep these habits in place and reassess in about 90 days.</p>
        ) : (
          <>
            <p className="mt-1.5 text-sm text-ink-muted">Up to three priorities, from the practices you rated lowest, weighted toward financial essentials. Each traces back to your answer.</p>
            <ol className="mt-4 space-y-3">
              {plan.priorities.map((c, i) => <ActionItem key={c.code} c={c} index={i + 1} />)}
            </ol>
            {plan.more.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Then look at</div>
                <ul className="mt-2 space-y-1.5">
                  {plan.more.map((m) => (
                    <li key={m.code} className="flex items-start gap-2 text-sm text-navy-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{m.item.action} <span className="text-ink-muted">({m.pillarName}{m.score !== null ? `, ${m.score}/4` : ""})</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </section>

      <p className="mt-4 text-xs text-ink-muted">Maturity and verification measure different things. Your answers describe the practices you reported; independent coverage reflects what a reviewer has confirmed. Scores are self-reported and are not a credit or funding decision.</p>
    </div>
  );
}
