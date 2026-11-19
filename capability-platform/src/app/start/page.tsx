import { startPublicAssessment } from "@/app/actions/self-assess";
import { Gauge, ArrowRight, ClipboardCheck, Compass, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

const POINTS = [
  { icon: ClipboardCheck, text: "About 24 short questions across the six pillars — roughly 15 minutes." },
  { icon: Compass, text: "Your Management Capital Index (0–100), your readiness band and closest archetype." },
  { icon: ShieldCheck, text: "A downloadable PDF report with your most valuable next step." },
];

export default async function StartPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-navy-800 text-white">
        <div className="mx-auto w-full max-w-3xl px-5 py-8" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-navy-900"><Gauge className="h-5 w-5" /></span>
            <div className="leading-tight"><div className="text-sm font-semibold">Management Capital Lab</div><div className="text-[11px] text-white/55">Management Capital Index · self-assessment</div></div>
          </div>
          <h1 className="mt-6 text-3xl font-semibold">Take the Management Capital diagnostic</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">A founder-centred self-assessment of your business&apos;s management capability and finance-readiness. Free, confidential, and yours to keep.</p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
        <ul className="grid gap-3 sm:grid-cols-3">
          {POINTS.map((p) => (
            <li key={p.text} className="rounded-xl border border-navy/10 bg-white p-4">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/15 text-gold-700"><p.icon className="h-[18px] w-[18px]" /></span>
              <p className="mt-2.5 text-xs leading-relaxed text-ink-muted">{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-5 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
          <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-navy-700">Tell us about your business</h2>
            <p className="mt-1 text-sm text-ink-muted">Just a few details, then you&apos;ll go straight into the questions.</p>
            {error && <div className="mt-4 rounded-lg border border-bad/20 bg-bad/5 px-3 py-2.5 text-sm text-bad">Please enter your business name to continue.</div>}
            <form action={startPublicAssessment} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="business">Business name</label>
                <input id="business" name="business" required className="input" placeholder="Your business name" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="country">Country</label>
                  <input id="country" name="country" className="input" placeholder="e.g. Kenya" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="sector">Sector</label>
                  <input id="sector" name="sector" className="input" placeholder="e.g. Agri-processing" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="founderName">Your name <span className="font-normal text-ink-muted">(optional)</span></label>
                  <input id="founderName" name="founderName" className="input" placeholder="Who is completing this?" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="email">Email <span className="font-normal text-ink-muted">(optional)</span></label>
                  <input id="email" name="email" type="email" className="input" placeholder="So we can send your results" />
                </div>
              </div>
              <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold text-sm font-semibold text-navy-900 shadow-sm transition-colors hover:bg-gold-600 hover:text-white">
                Start the diagnostic <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-ink-muted">Your answers are self-reported and confidential. Scores use the <a href="https://www.managementcapitallab.com/framework" className="text-gold-700 hover:underline">Management Capital Index</a>.</p>
      </div>
    </div>
  );
}
