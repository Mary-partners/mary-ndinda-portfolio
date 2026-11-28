import Link from "next/link";
import { DIMENSION_META } from "@/lib/constants";
import { UserPlus, ClipboardCheck, LineChart, Wallet, ShieldCheck, Compass, Settings2, Users, TrendingUp, ArrowRight, type LucideIcon } from "lucide-react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{children}</h2>
    </div>
  );
}

const STEPS = [
  { icon: UserPlus, n: "01", title: "Create your account", body: "Register your business in about a minute. Free and confidential, and your results are saved so you can track progress." },
  { icon: ClipboardCheck, n: "02", title: "Answer 36 questions", body: "Across six areas of how your business runs, roughly 15 minutes. For each one you pick the statement that best fits." },
  { icon: LineChart, n: "03", title: "Get your Index and plan", body: "Your Management Capital Index, your maturity level, and a clear 90-day action plan. Reassess every 90 days to see change." },
];

export function HowItWorks() {
  return (
    <section>
      <SectionLabel>How it works</SectionLabel>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <article key={s.n} className="rise lift relative flex flex-col rounded-2xl border border-navy/10 bg-white p-5 shadow-card hover:shadow-lg" style={{ animationDelay: `${60 + i * 90}ms` }}>
            <span className="absolute right-4 top-3 text-2xl font-semibold text-navy/10">{s.n}</span>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-700"><s.icon className="h-5 w-5" /></span>
            <h3 className="mt-3 text-base font-semibold text-navy-700">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
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
      <SectionLabel>What the diagnostic measures</SectionLabel>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">Six areas of management capability. Each is scored on its own, so you see exactly where your business is strong and where to focus next.</p>
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
