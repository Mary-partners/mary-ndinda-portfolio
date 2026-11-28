import Link from "next/link";
import { DIMENSION_META } from "@/lib/constants";
import { EVIDENCE_REFS } from "@/lib/practice-guide";
import { Wallet, ShieldCheck, Compass, Settings2, Users, TrendingUp, ArrowRight, BookOpen, ExternalLink, type LucideIcon } from "lucide-react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{children}</h2>
    </div>
  );
}

const PILLAR_ICON: Record<string, LucideIcon> = {
  financial: Wallet,
  governance: ShieldCheck,
  strategic: Compass,
  operational: Settings2,
  founder: Users,
  absorption: TrendingUp,
};

export function Capabilities() {
  return (
    <section>
      <SectionLabel>The six management practices we measure</SectionLabel>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">Each area is scored on its own, so you see exactly where your business is strong and where to focus next.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DIMENSION_META.map((d, i) => {
          const Icon = PILLAR_ICON[d.key] ?? Compass;
          return (
            <article key={d.key} className="rise lift flex items-start gap-3.5 rounded-2xl border border-navy/10 bg-white p-5 shadow-card hover:shadow-lg" style={{ animationDelay: `${60 + i * 70}ms` }}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-700/5 text-navy-700"><Icon className="h-5 w-5" /></span>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-gold-700">{d.name}</div>
                <h3 className="mt-0.5 text-base font-semibold text-navy-700">{d.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{d.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const RESEARCH = [
  {
    source: "IFC SME Governance Guidebook (2020)",
    title: "The routines that matter",
    body: "Recommends a core set of management routines: managing cash flow, separating business and owner funds, and making clear who has authority to decide.",
    href: EVIDENCE_REFS.ifc.url,
  },
  {
    source: "World Bank study, McKenzie & Woodruff (2017)",
    title: "Practices track with survival and growth",
    body: "Across firms in Kenya, Nigeria and Sri Lanka, those using more of these practices at the start showed higher survival rates and faster sales growth.",
    href: EVIDENCE_REFS.mw.url,
  },
  {
    source: "How to read this",
    title: "An input, not a prediction",
    body: "These are associations found across many firms, not a forecast for any single business. Your answers are self-reported until a reviewer verifies them.",
    href: null,
  },
];

export function Research() {
  return (
    <section>
      <SectionLabel>Why these practices matter</SectionLabel>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">Studies of small and growing businesses link stronger management practices with better outcomes. The Index measures your practices; it does not predict your results.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {RESEARCH.map((r, i) => (
          <article key={r.title} className="rise lift flex flex-col rounded-2xl border border-navy/10 bg-white p-5 shadow-card hover:shadow-lg" style={{ animationDelay: `${60 + i * 80}ms` }}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-700"><BookOpen className="h-5 w-5" /></span>
            <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-gold-700">{r.source}</div>
            <h3 className="mt-0.5 text-base font-semibold text-navy-700">{r.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{r.body}</p>
            <div className="mt-3 flex-1" />
            {r.href ? (
              <a href={r.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-700 hover:underline">
                Read the source <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="text-xs font-medium text-ink-muted">Research is context, not a guarantee.</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="rise overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-navy-800 to-navy-900 p-7 shadow-card lg:p-9">
      <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">See where your business stands today.</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">Create your free account, take the 36-question diagnostic, and get a 90-day plan you can act on. Reassess every 90 days to track your progress.</p>
        </div>
        <Link href="/signup" className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold-600 hover:text-white hover:shadow-md">
          Create your account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
