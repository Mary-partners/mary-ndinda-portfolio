import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getFounderV2 } from "@/lib/founder-v2";
import { reassessFrom } from "@/lib/reassess";
import { fmtDate } from "@/lib/utils";
import { BASE_PATH, DIMENSION_META } from "@/lib/constants";
import { Download, RefreshCw, ClipboardCheck, Building2, Target, ArrowRight, Compass, ListChecks, Gauge, AlertTriangle, Lock } from "lucide-react";
import { BandScale, PillarCard, ActionItem } from "@/components/founder/Results";

export const dynamic = "force-dynamic";

const META = new Map(DIMENSION_META.map((d) => [d.key, d]));

export default async function FounderHome() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const company = await prisma.company.findFirst({ where: { ownerUserId: user.id }, orderBy: { createdAt: "desc" }, select: { id: true, tradingName: true, legalName: true, sector: true, country: true } });
  const fv = company ? await getFounderV2(company.id) : { state: "none" as const };
  const gate = reassessFrom("finalizedAt" in fv ? fv.finalizedAt : null);

  const businessName = company?.tradingName || company?.legalName || "Your business";
  const sector = company?.sector || null;
  const country = company?.country || null;
  const firstName = user.name?.split(" ")[0] || "there";

  const Shell = (children: React.ReactNode) => (
    <div className="mx-auto w-full max-w-5xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-navy-700">Welcome back, {firstName}</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">This dashboard reads the management practices you reported and shows where your business stands and what to work on next.</p>
        </div>
        {fv.state === "v2" && company && (
          <div className="flex gap-2">
            {gate.canStart ? (
              <Link href="/me/diagnostic" className="inline-flex h-10 items-center gap-2 rounded-xl border border-navy/20 px-3.5 text-sm font-semibold text-navy-700 hover:bg-surface-muted"><RefreshCw className="h-4 w-4" /> Reassess</Link>
            ) : (
              <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-navy/15 bg-surface-muted px-3.5 text-sm font-medium text-ink-muted" title={gate.nextEligibleAt ? `Reassessment opens ${fmtDate(gate.nextEligibleAt)}` : undefined}><Lock className="h-4 w-4" /> Reassess {gate.nextEligibleAt ? fmtDate(gate.nextEligibleAt) : ""}</span>
            )}
            <a href={`${BASE_PATH}/api/report/company/${company.id}`} className="inline-flex h-10 items-center gap-2 rounded-xl bg-navy-700 px-3.5 text-sm font-semibold text-white hover:bg-navy-800"><Download className="h-4 w-4" /> PDF report</a>
          </div>
        )}
      </div>
      <section className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-navy/10 bg-white px-5 py-3.5 shadow-card">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-700 text-white"><Building2 className="h-4 w-4" /></span>
          <div><div className="text-sm font-semibold text-navy-700">{businessName}</div><div className="text-[11px] text-ink-muted">Led by {user.name}</div></div>
        </div>
        <div className="h-8 w-px bg-navy/10" />
        <div className="text-xs"><span className="text-ink-muted">Sector</span> <span className="font-medium text-navy-700">{sector ?? "Not set"}</span></div>
        <div className="text-xs"><span className="text-ink-muted">Country</span> <span className="font-medium text-navy-700">{country ?? "Not set"}</span></div>
      </section>
      {children}
    </div>
  );

  if (fv.state === "none") {
    return Shell(
      <section className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
        <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
        <div className="p-6 sm:p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-700"><Compass className="h-5 w-5" /></span>
          <h2 className="mt-3 text-lg font-semibold text-navy-700">Start your diagnostic</h2>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-muted">36 short questions across six areas of how your business is run, about 15 minutes. For each one you pick the statement that best fits. When you finish you get your Management Capital Index, your maturity level, and a clear 90-day plan.</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {[{ icon: ClipboardCheck, t: "36 short questions, roughly 15 minutes" }, { icon: Gauge, t: "Your Index and maturity level" }, { icon: ListChecks, t: "A traceable 90-day action plan" }].map((p) => (
              <li key={p.t} className="rounded-lg border border-navy/10 bg-surface-muted p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-gold-700"><p.icon className="h-4 w-4" /></span><p className="mt-2 text-xs leading-relaxed text-ink-muted">{p.t}</p></li>
            ))}
          </ul>
          <Link href="/me/diagnostic" className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 hover:bg-gold-600 hover:text-white">Start your diagnostic <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    );
  }

  if (fv.state === "legacy") {
    return Shell(
      <section className="mt-5 rounded-xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-lg font-semibold text-navy-700">Your earlier result</h2>
        <p className="mt-1.5 text-sm text-ink-muted">You completed an earlier version of the diagnostic. Your previous Index was <span className="font-semibold text-navy-700">{fv.index ?? "n/a"}/100</span>. The diagnostic has since been revised with clearer questions and scoring.</p>
        {gate.canStart ? (
          <Link href="/me/diagnostic" className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 hover:bg-gold-600 hover:text-white"><RefreshCw className="h-4 w-4" /> Take the revised diagnostic</Link>
        ) : (
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-navy/15 bg-surface-muted px-4 py-2.5 text-sm font-medium text-ink-muted"><Lock className="h-4 w-4" /> You can reassess on {gate.nextEligibleAt ? fmtDate(gate.nextEligibleAt) : ""}, 90 days after your last.</p>
        )}
      </section>
    );
  }

  // v2
  const { result, plan } = fv;
  const ranked = result.pillars.filter((p) => p.display !== null);
  const strongest = ranked.length ? ranked.reduce((a, b) => (b.display! > a.display! ? b : a)) : null;
  const focus = ranked.length ? ranked.reduce((a, b) => (b.display! < a.display! ? b : a)) : null;

  return Shell(
    <>
      {/* Reassessment window: you have a result; the next one opens after 90 days. */}
      {!gate.canStart && gate.nextEligibleAt && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-navy/10 bg-white px-4 py-3 shadow-card">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy-700/5 text-navy-700"><Lock className="h-4 w-4" /></span>
          <p className="text-sm text-ink-muted">You already have an assessment. To track progress over time, you can reassess on <span className="font-medium text-navy-700">{fmtDate(gate.nextEligibleAt)}</span>, 90 days after your last. Your current result stays here until then.</p>
        </div>
      )}

      {/* Stat tiles */}
      <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
          <div className="text-[11px] uppercase tracking-wide text-ink-muted">Management Capital Index</div>
          <div className="mt-1 flex items-baseline gap-1"><span className="text-3xl font-semibold text-gold-700">{result.mci ?? "n/a"}</span><span className="text-xs text-ink-muted">/ 100</span></div>
        </div>
        <div className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
          <div className="text-[11px] uppercase tracking-wide text-ink-muted">Maturity level</div>
          <div className="mt-1 text-lg font-semibold text-navy-700">{result.overallBand.label}</div>
        </div>
        <div className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
          <div className="text-[11px] uppercase tracking-wide text-emerald-700">Strongest</div>
          <div className="mt-1 truncate text-sm font-semibold text-navy-700">{strongest ? META.get(strongest.key)?.label : "n/a"}</div>
          <div className="text-[11px] text-ink-muted">{strongest ? `${strongest.display} / 100` : ""}</div>
        </div>
        <div className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
          <div className="text-[11px] uppercase tracking-wide text-amber-700">Focus area</div>
          <div className="mt-1 truncate text-sm font-semibold text-navy-700">{focus ? META.get(focus.key)?.label : "n/a"}</div>
          <div className="text-[11px] text-ink-muted">{focus ? `${focus.display} / 100` : ""}</div>
        </div>
      </section>

      {/* Executive summary + band scale */}
      <section className="mt-3 rounded-xl border border-navy/10 bg-white p-5 shadow-card sm:p-6">
        <h2 className="text-base font-semibold text-navy-700">Where you stand</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          {result.mci !== null
            ? <>Your Index is {result.mci} out of 100, a {result.overallBand.label.toLowerCase()} level. {result.overallBand.blurb} {result.totalNumeric} of {result.totalApplicable} applicable questions were scored.</>
            : <>Not enough questions were answered to show an overall Index. {result.totalNumeric} of {result.totalApplicable} applicable questions were scored; at least 80% are needed.</>}
        </p>
        {result.mci !== null && <BandScale mci={result.mci} />}
      </section>

      {/* Financial essentials alerts */}
      {plan.startNow.length > 0 && (
        <section className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-5 shadow-card">
          <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100 text-amber-700"><AlertTriangle className="h-4 w-4" /></span><h2 className="text-base font-semibold text-navy-700">Financial essentials to start now</h2></div>
          <p className="mt-1.5 text-sm text-ink-muted">These basic money practices need attention before they create risk. This is descriptive, not a credit or funding decision.</p>
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

      {/* Six capabilities */}
      <section className="mt-3 rounded-xl border border-navy/10 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-navy-700">Your six capabilities</h2>
          <Link href="/me/results" className="inline-flex items-center gap-1 text-sm font-medium text-gold-700 hover:underline">Full results <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {result.pillars.map((p) => <PillarCard key={p.key} p={p} label={META.get(p.key)?.label} description={META.get(p.key)?.description} />)}
        </div>
      </section>

      {/* 90-day plan */}
      {plan.priorities.length > 0 && (
        <section className="mt-3 rounded-xl border border-navy/10 bg-white p-5 shadow-card">
          <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-gold-700"><Target className="h-4 w-4" /></span><h2 className="text-base font-semibold text-navy-700">Your 90-day action plan</h2></div>
          <p className="mt-1.5 text-sm text-ink-muted">Up to three priorities, chosen from the practices you rated lowest. Each traces back to your answer.</p>
          <ol className="mt-4 space-y-3">
            {plan.priorities.map((c, i) => <ActionItem key={c.code} c={c} index={i + 1} />)}
          </ol>
          <Link href="/me/results" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-700 hover:underline">See the full plan and all your scores <ArrowRight className="h-4 w-4" /></Link>
        </section>
      )}

      <p className="mt-4 text-xs text-ink-muted">Maturity reflects the practices you reported and is self-reported. Independent verification is separate and happens only when a reviewer confirms your evidence.</p>
    </>
  );
}
