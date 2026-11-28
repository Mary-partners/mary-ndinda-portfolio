import * as React from "react";
import { Gauge, ClipboardCheck, ListChecks, Users } from "lucide-react";

const FEATURES = [
  { icon: ClipboardCheck, title: "Know your score", desc: "Score your management practices across six areas of the Management Capital Index. Transparent, and never guesses an unanswered question." },
  { icon: ListChecks, title: "Get a 90-day plan", desc: "Turn your answers into a short, practical set of next steps for the coming three months." },
  { icon: Users, title: "For everyone backing SMEs", desc: "Founders, the programmes that support them, and the investors and lenders deploying capital." },
];

export function AuthShell({ children, footnote }: { children: React.ReactNode; footnote?: string }) {
  return (
    <div className="min-h-screen bg-surface-muted lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-navy-800 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        {/* decorative aurora */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-aurora absolute -left-24 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="animate-aurora absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-navy-400/25 blur-3xl" style={{ animationDelay: "3s" }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-navy-900 shadow-lg">
            <Gauge className="h-6 w-6" />
          </span>
          <div className="leading-tight">
            <div className="font-semibold text-white">Management Capital Lab</div>
            <div className="text-[12px] tracking-wide text-white/55">Enterprise Capability Intelligence</div>
          </div>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-3xl font-semibold leading-tight text-white xl:text-4xl">
            See what to improve in the way your <span className="text-gold-300">business runs.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            The Management Capital Index shows which management practices are working, which need attention, and what to work on over the next 90 days.
          </p>
          <ul className="mt-8 space-y-5">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-200 ring-1 ring-gold/25">
                  <f.icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <div className="text-sm font-medium text-white">{f.title}</div>
                  <div className="text-[13px] leading-relaxed text-white/60">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/40">For founders and the organisations that back them.</p>
      </aside>

      {/* Content panel */}
      <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:min-h-0">
        <div className="w-full max-w-md animate-fade-up">
          {/* compact brand header on mobile */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-700 text-gold shadow-sm">
              <Gauge className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-navy-700">Management Capital Lab</div>
              <div className="text-[11px] text-ink-muted">Enterprise Capability Intelligence</div>
            </div>
          </div>
          {children}
          {footnote && <p className="mt-6 text-center text-xs text-ink-muted">{footnote}</p>}
        </div>
      </main>
    </div>
  );
}
