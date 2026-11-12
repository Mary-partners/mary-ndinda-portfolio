import { PageHeader, Panel } from "@/components/ui/Page";
import { DIMENSION_META } from "@/lib/constants";
import {
  Gauge, ClipboardCheck, ListChecks, KanbanSquare, ShieldCheck, PieChart, LineChart,
  Crown, Briefcase, UserCog, BadgeCheck, Store, ArrowRight,
  Compass, Banknote, Cog, Users, TrendingUp, Scale, Lightbulb, BarChart3,
} from "lucide-react";

export const metadata = { title: "How it works" };

const LOOP = [
  { icon: ClipboardCheck, title: "Diagnose", desc: "Score management maturity across 8 dimensions, with the founder." },
  { icon: ListChecks, title: "Plan", desc: "Turn the weakest areas into prioritised improvement plans." },
  { icon: KanbanSquare, title: "Implement", desc: "Work the plan — milestones, owners and advisory sessions." },
  { icon: ShieldCheck, title: "Verify", desc: "An independent reviewer confirms what was actually adopted." },
  { icon: PieChart, title: "See the portfolio", desc: "Roll it all up into portfolio intelligence and reports." },
];

const ROLES = [
  { icon: Crown, name: "Platform Administrator", who: "You", does: "Oversees every organisation, owns the framework, sees everything." },
  { icon: Briefcase, name: "Programme Manager", who: "Fund · DFI · accelerator", does: "Enrols enterprises, assigns advisors, finalises assessments, signs off evidence, watches portfolio progress." },
  { icon: UserCog, name: "Enterprise Advisor", who: "Coach · consultant", does: "Runs diagnostics, builds plans, logs advisory sessions, tracks delivery." },
  { icon: BadgeCheck, name: "Independent Reviewer", who: "Neutral verifier", does: "Confirms or rejects evidence that a practice was really adopted." },
  { icon: Store, name: "Founder / Company Manager", who: "The SME", does: "Answers the diagnostic, implements changes, submits evidence." },
];

const PRACTICES: Record<string, string> = {
  strategic: "Clear priorities, deliberate resource allocation, responsibilities cascaded to the team.",
  financial: "Monthly management accounts, a 13-week cash-flow forecast, pricing based on real margins.",
  operational: "Documented core processes, quality control, root-cause problem solving.",
  performance: "A defined KPI set, a monthly review cadence, corrective actions followed up.",
  people: "Role clarity, accountable owners, performance reviews and succession.",
  commercial: "Segmentation, margin analysis, pipeline and retention discipline.",
  governance: "Approval limits, recorded management meetings, less founder-dependency.",
  learning: "Capturing lessons and acting on them — retrospectives and an improvement log.",
};

const DIM_ICON: Record<string, typeof Compass> = {
  strategic: Compass, financial: Banknote, operational: Cog, performance: BarChart3,
  people: Users, commercial: TrendingUp, governance: Scale, learning: Lightbulb,
};

const LADDER = [
  { n: 0, label: "Absent", tone: "bg-bad" },
  { n: 1, label: "Informal", tone: "bg-bad/70" },
  { n: 2, label: "Introduced", tone: "bg-warn" },
  { n: 3, label: "Consistent", tone: "bg-ok/80" },
  { n: 4, label: "Embedded", tone: "bg-ok" },
];

const WINDOWS = [
  { icon: Gauge, title: "Capability Scores", sub: "how mature the management IS" },
  { icon: KanbanSquare, title: "Implementation", sub: "what they've actually DONE about it" },
  { icon: LineChart, title: "Business Performance", sub: "the real KPIs — revenue, margin, cash" },
];

const OUTCOMES = [
  { who: "The SME / founder", get: "A prioritised list of practices to build — and proof of progress to show a lender or investor." },
  { who: "The advisor", get: "Structure and evidence for coaching; a defensible record of impact." },
  { who: "The fund / programme manager", get: "Portfolio-wide visibility: who is improving, where the real constraint is capital vs. management, and verified outcomes for reporting." },
  { who: "The independent reviewer", get: "A clean, simple way to keep the data honest." },
  { who: "You", get: "Structured, verifiable research data — and a product for funders who currently fly blind on management capability." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader title="How the platform works" subtitle="The model behind Management Capital Lab — for everyone who uses it." />

      {/* Pitch */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-navy/10 bg-navy-700 p-6 text-white sm:p-8">
        <div className="h-1 w-16 rounded-full bg-gold" />
        <p className="mt-4 max-w-3xl text-lg leading-relaxed">
          For decades the answer to a struggling SME was <span className="text-white/60">“more money.”</span>{" "}
          This platform measures whether the real constraint is <span className="font-semibold text-gold-300">management capability</span> —
          then helps build it, and proves it moved.
        </p>
      </div>

      {/* The loop */}
      <Panel title="The core loop" className="mb-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {LOOP.map((s, i) => (
            <div key={s.title} className="contents">
              <div className="flex-1 rounded-xl border border-navy/10 bg-surface-muted p-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-700 text-gold"><s.icon className="h-5 w-5" /></span>
                <div className="mt-3 text-sm font-semibold text-navy-700">{s.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-ink-muted">{s.desc}</div>
              </div>
              {i < LOOP.length - 1 && (
                <div className="hidden shrink-0 items-center justify-center lg:flex"><ArrowRight className="h-4 w-4 text-navy-300" /></div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-muted">Nobody marks their own homework: the founder claims it, the advisor supports it, an independent reviewer verifies it. That is what makes the scores credible to funders.</p>
      </Panel>

      {/* Roles */}
      <Panel title="The five people" className="mb-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((r) => (
            <div key={r.name} className="rounded-xl border border-navy/10 bg-white p-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-700"><r.icon className="h-[18px] w-[18px]" /></span>
                <div>
                  <div className="text-sm font-semibold text-navy-700">{r.name}</div>
                  <div className="text-[11px] uppercase tracking-wide text-ink-muted">{r.who}</div>
                </div>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-ink-muted">{r.does}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Dimensions = practices */}
      <Panel title="The 8 capability dimensions — and the practices they build" className="mb-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {DIMENSION_META.map((d) => {
            const Icon = DIM_ICON[d.key] ?? Compass;
            return (
              <div key={d.key} className="flex gap-3 rounded-xl border border-navy/10 bg-white p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-700/5 text-navy-700"><Icon className="h-[18px] w-[18px]" /></span>
                <div>
                  <div className="text-sm font-semibold text-navy-700">{d.name}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{PRACTICES[d.key]}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Maturity ladder */}
        <div className="mt-5 rounded-xl border border-navy/10 bg-surface-muted p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">Every practice is scored 0–4</div>
          <div className="grid grid-cols-5 gap-2">
            {LADDER.map((l) => (
              <div key={l.n} className="text-center">
                <div className={`h-1.5 rounded-full ${l.tone}`} />
                <div className="mt-2 text-sm font-semibold text-navy-700">{l.n}</div>
                <div className="text-[11px] text-ink-muted">{l.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Three separate windows */}
      <Panel title="Three things we keep separate — on purpose" className="mb-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {WINDOWS.map((w) => (
            <div key={w.title} className="rounded-xl border border-navy/10 bg-white p-4">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/15 text-gold-700"><w.icon className="h-[18px] w-[18px]" /></span>
              <div className="mt-3 text-sm font-semibold text-navy-700">{w.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-ink-muted">{w.sub}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          <strong className="text-navy-700">Maturity ≠ implementation ≠ performance.</strong> Keeping these distinct is what lets us ask honestly
          whether better management actually drives better results — instead of assuming it.
        </p>
      </Panel>

      {/* Outcomes */}
      <Panel title="What each person achieves">
        <div className="divide-y divide-navy/5">
          {OUTCOMES.map((o) => (
            <div key={o.who} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
              <div className="w-full shrink-0 text-sm font-semibold text-navy-700 sm:w-56">{o.who}</div>
              <div className="text-sm text-ink-muted">{o.get}</div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
