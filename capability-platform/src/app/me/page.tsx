import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getCompanyDetail } from "@/lib/company";
import { getActionPlan } from "@/lib/recommend";
import { fmtIndex, indexScore, maturityBand } from "@/lib/utils";
import { BASE_PATH, DIMENSION_META, READINESS_BANDS } from "@/lib/constants";
import { Download, RefreshCw, ClipboardCheck, Building2, Target, ArrowRight, Compass, ListChecks, Gauge, BarChart3, TrendingUp, AlertCircle, Landmark } from "lucide-react";

export const dynamic = "force-dynamic";

const META = new Map(DIMENSION_META.map((d) => [d.key, d]));

// Plain-language read of what each band means for raising and using capital.
const CAPITAL_READ: Record<string, string> = {
  Fragile: "The core routines a funder expects are not yet in place. Build the basics before seeking outside capital.",
  Emerging: "A few practices exist but they are not consistent. You are early on the path to being fundable, so strengthen the fundamentals first.",
  Developing: "You have real foundations. A funder would see promise, and also clear gaps to close before you are ready for investment.",
  Established: "Most core practices are consistent. You are preparing for finance and would stand up to early funder scrutiny.",
  Strong: "Your practices are well embedded. You are well positioned to raise capital and put it to work.",
  "Not assessed": "Complete the diagnostic to see what your capability means for raising capital.",
};

// The three capabilities a funder weighs most, with the question each answers.
const FUNDER_LENS: { key: string; q: string }[] = [
  { key: "financial", q: "Can you show the numbers?" },
  { key: "governance", q: "Who is accountable, and are there checks?" },
  { key: "absorption", q: "Can you put capital to work and repay it?" },
];

function toneBg(tone: string) {
  return tone === "ok" ? "bg-emerald-50 text-emerald-700" : tone === "warn" ? "bg-amber-50 text-amber-700" : tone === "bad" ? "bg-rose-50 text-rose-700" : "bg-navy-700/10 text-navy-700";
}

function BandScale({ idx }: { idx: number }) {
  // Finance-ready zone begins at the Established band (61).
  return (
    <div>
      <div className="relative pt-6">
        {/* marker */}
        <div className="absolute top-0 -translate-x-1/2" style={{ left: `${idx}%` }}>
          <div className="rounded-md bg-navy-800 px-1.5 py-0.5 text-[11px] font-semibold text-white">You: {idx}</div>
          <div className="mx-auto h-2 w-0.5 bg-navy-800" />
        </div>
        {/* segmented track */}
        <div className="flex h-3 overflow-hidden rounded-full">
          {READINESS_BANDS.map((b, i) => {
            const here = idx >= b.min && idx <= b.max;
            const shade = ["bg-navy/10", "bg-navy/20", "bg-navy/30", "bg-navy/45", "bg-navy/60"][i];
            return <div key={b.label} className={`flex-1 ${here ? "bg-gold" : shade} ${i > 0 ? "border-l-2 border-white" : ""}`} />;
          })}
        </div>
        {/* labels */}
        <div className="mt-1.5 flex text-[10px] text-ink-muted">
          {READINESS_BANDS.map((b) => {
            const here = idx >= b.min && idx <= b.max;
            return <div key={b.label} className={`flex-1 text-center ${here ? "font-semibold text-navy-700" : ""}`}>{b.label}</div>;
          })}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-ink-muted">
        <Landmark className="h-3.5 w-3.5 text-gold-700" />
        <span>Finance-ready territory starts at the Established band (61+). Measured against the Management Capital Index standard.</span>
      </div>
    </div>
  );
}

export default async function FounderHome() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const companyRow = await prisma.company.findFirst({ where: { ownerUserId: user.id }, orderBy: { createdAt: "desc" }, select: { id: true } });
  const detail = companyRow ? await getCompanyDetail(companyRow.id) : null;
  const assessed = Boolean(detail?.latest);
  const band = maturityBand(detail?.latest?.overallScore);
  const plan = assessed && detail ? await getActionPlan(detail.company.id) : null;

  const businessName = detail?.company.tradingName || detail?.company.legalName || "Your business";
  const sector = detail?.company.sector || null;
  const country = detail?.company.country || null;
  const firstName = user.name?.split(" ")[0] || "there";

  const idx = assessed ? indexScore(detail!.latest!.overallScore) ?? 0 : 0;
  const scored = assessed ? detail!.dimRows.filter((d) => d.current !== null) : [];
  const strongest = scored.length ? scored.reduce((a, b) => ((indexScore(b.current) ?? 0) > (indexScore(a.current) ?? 0) ? b : a)) : null;
  const focus = scored.length ? scored.reduce((a, b) => ((indexScore(b.current) ?? 0) < (indexScore(a.current) ?? 0) ? b : a)) : null;
  const nextThreshold = idx < 41 ? 41 : idx < 61 ? 61 : idx < 81 ? 81 : null;
  const nextBand = nextThreshold ? READINESS_BANDS.find((b) => b.min === nextThreshold)?.label : null;
  const pointsToNext = nextThreshold ? nextThreshold - idx : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-navy-700">Welcome back, {firstName}</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">This dashboard reads your management practices, shows where they put you on the capital-readiness scale, and points to the steps that move you up.</p>
        </div>
        {assessed && (
          <div className="flex gap-2">
            <Link href="/me/diagnostic" className="inline-flex h-10 items-center gap-2 rounded-xl border border-navy/20 px-3.5 text-sm font-semibold text-navy-700 hover:bg-surface-muted"><RefreshCw className="h-4 w-4" /> Retake</Link>
            <a href={`${BASE_PATH}/api/report/company/${detail!.company.id}`} className="inline-flex h-10 items-center gap-2 rounded-xl bg-navy-700 px-3.5 text-sm font-semibold text-white hover:bg-navy-800"><Download className="h-4 w-4" /> PDF report</a>
          </div>
        )}
      </div>

      {/* Business profile strip */}
      <section className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-navy/10 bg-white px-5 py-3.5 shadow-card">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-700 text-white"><Building2 className="h-4 w-4" /></span>
          <div><div className="text-sm font-semibold text-navy-700">{businessName}</div><div className="text-[11px] text-ink-muted">Led by {user.name}</div></div>
        </div>
        <div className="h-8 w-px bg-navy/10" />
        <div className="text-xs"><span className="text-ink-muted">Sector</span> <span className="font-medium text-navy-700">{sector ?? "Not set"}</span></div>
        <div className="text-xs"><span className="text-ink-muted">Country</span> <span className="font-medium text-navy-700">{country ?? "Not set"}</span></div>
      </section>

      {!assessed ? (
        <section className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
          <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
          <div className="p-6 sm:p-8">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-700"><Compass className="h-5 w-5" /></span>
            <h2 className="mt-3 text-lg font-semibold text-navy-700">Start your diagnostic</h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-muted">36 short questions across six areas of how your business is run, about 15 minutes. When you finish you get your capability score, where it places you on the capital-readiness scale, and a clear set of next steps.</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {[{ icon: ClipboardCheck, t: "36 short questions, roughly 15 minutes" }, { icon: Gauge, t: "Your score and capital-readiness band" }, { icon: ListChecks, t: "Practical steps to work on next" }].map((p) => (
                <li key={p.t} className="rounded-lg border border-navy/10 bg-surface-muted p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-gold-700"><p.icon className="h-4 w-4" /></span><p className="mt-2 text-xs leading-relaxed text-ink-muted">{p.t}</p></li>
              ))}
            </ul>
            <Link href="/me/diagnostic" className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 hover:bg-gold-600 hover:text-white">Start your diagnostic <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      ) : (
        <>
          {/* Stat tiles */}
          <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
              <div className="text-[11px] uppercase tracking-wide text-ink-muted">Capital Index</div>
              <div className="mt-1 flex items-baseline gap-1"><span className="text-3xl font-semibold text-gold-700">{idx}</span><span className="text-xs text-ink-muted">/ 100</span></div>
            </div>
            <div className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
              <div className="text-[11px] uppercase tracking-wide text-ink-muted">Readiness band</div>
              <div className="mt-1 text-lg font-semibold text-navy-700">{band.label}</div>
              {pointsToNext !== null && nextBand && <div className="text-[11px] text-ink-muted">{pointsToNext} to {nextBand}</div>}
            </div>
            <div className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
              <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-emerald-700"><TrendingUp className="h-3 w-3" /> Strength</div>
              <div className="mt-1 truncate text-sm font-semibold text-navy-700">{strongest ? META.get(strongest.key)?.label : "—"}</div>
              <div className="text-[11px] text-ink-muted">{strongest ? `${fmtIndex(strongest.current)} / 100` : ""}</div>
            </div>
            <div className="rounded-xl border border-navy/10 bg-white p-4 shadow-card">
              <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-amber-700"><AlertCircle className="h-3 w-3" /> Focus area</div>
              <div className="mt-1 truncate text-sm font-semibold text-navy-700">{focus ? META.get(focus.key)?.label : "—"}</div>
              <div className="text-[11px] text-ink-muted">{focus ? `${fmtIndex(focus.current)} / 100` : ""}</div>
            </div>
          </section>

          {/* Where you stand + capital read */}
          <section className="mt-3 grid gap-3 lg:grid-cols-5">
            <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-card lg:col-span-3">
              <h2 className="text-base font-semibold text-navy-700">Where you stand</h2>
              <p className="mt-0.5 text-xs text-ink-muted">Your score of {idx} on the standard Fragile to Strong scale.</p>
              <BandScale idx={idx} />
            </div>
            <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-card lg:col-span-2">
              <h2 className="text-base font-semibold text-navy-700">What this means for capital</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{CAPITAL_READ[band.label] ?? CAPITAL_READ["Not assessed"]}</p>
            </div>
          </section>

          {/* What a funder looks at */}
          <section className="mt-3 rounded-xl border border-navy/10 bg-white p-5 shadow-card">
            <h2 className="text-base font-semibold text-navy-700">What a funder looks at first</h2>
            <p className="mt-0.5 text-xs text-ink-muted">The three capabilities that weigh most when someone considers backing your business.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {FUNDER_LENS.map((f) => {
                const row = detail!.dimRows.find((d) => d.key === f.key);
                const b = maturityBand(row?.current);
                return (
                  <div key={f.key} className="rounded-lg border border-navy/10 bg-surface-muted p-3.5">
                    <div className="text-sm font-medium text-navy-700">{META.get(f.key)?.label}</div>
                    <div className="mt-0.5 text-xs text-ink-muted">{f.q}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-semibold text-navy-800">{fmtIndex(row?.current)}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${toneBg(b.tone)}`}>{b.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-ink-muted">This reflects the management practices you reported. It is not a credit decision or a promise of funding.</p>
          </section>

          {/* Six capabilities */}
          <section className="mt-3 rounded-xl border border-navy/10 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-navy-700">Your six capabilities</h2>
              <Link href="/me/results" className="inline-flex items-center gap-1 text-sm font-medium text-gold-700 hover:underline">Full results <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {detail!.dimRows.map((d) => {
                const meta = META.get(d.key);
                const v = fmtIndex(d.current);
                const b = maturityBand(d.current);
                return (
                  <div key={d.key} className="rounded-lg border border-navy/10 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-navy-700">{meta?.label}</div>
                        <div className="text-[11px] text-ink-muted">{meta?.name}</div>
                      </div>
                      <div className="text-right"><span className="text-lg font-semibold text-navy-800">{v}</span><div className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${toneBg(b.tone)}`}>{b.label}</div></div>
                    </div>
                    <div className="mt-2.5 h-2 rounded-full bg-navy/10"><div className="h-2 rounded-full bg-gold" style={{ width: `${v === "n/a" ? 0 : v}%` }} /></div>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">{meta?.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Action points */}
          {plan && plan.priorities.length > 0 && (
            <section className="mt-3 rounded-xl border border-navy/10 bg-white p-5 shadow-card">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-gold-700"><Target className="h-4 w-4" /></span>
                <h2 className="text-base font-semibold text-navy-700">What to work on next</h2>
              </div>
              <p className="mt-1.5 text-sm text-ink-muted">Each step closes a gap that improves both your capability and how ready you look to a funder. Start at the top.</p>
              <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                {plan.priorities.map((p, i) => (
                  <li key={`${p.pillarKey}-${p.order}`} className="rounded-xl border border-navy/10 bg-surface-muted p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-700 text-xs font-semibold text-white">{i + 1}</span>
                      <span className="text-[11px] font-medium uppercase tracking-wide text-gold-700">{p.horizon}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-navy-800">{p.action}</p>
                    <p className="mt-1 text-[11px] text-ink-muted">{p.pillarName}</p>
                  </li>
                ))}
              </ol>
              <Link href="/me/results" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-700 hover:underline">See your full action plan <ArrowRight className="h-4 w-4" /></Link>
            </section>
          )}

          <p className="mt-4 text-xs text-ink-muted">Measured against the Management Capital Index standard. As more founders complete the diagnostic, you will also see how you compare with similar businesses. Your answers are self-reported.</p>
        </>
      )}
    </div>
  );
}
