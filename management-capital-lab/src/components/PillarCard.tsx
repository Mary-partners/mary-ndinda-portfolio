import {
  Calculator,
  ShieldCheck,
  Compass,
  Settings2,
  UserRoundCheck,
  Sprout,
} from "lucide-react";
import type { Pillar } from "@/lib/data/pillars";

const ICONS = [Calculator, ShieldCheck, Compass, Settings2, UserRoundCheck, Sprout];

export function PillarPreviewCard({ pillar }: { pillar: Pillar }) {
  const Icon = ICONS[(pillar.id - 1) % ICONS.length];
  return (
    <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft transition-shadow hover:shadow-note">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest/10 text-forest">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold text-gold-600">
          Pillar {pillar.id}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-lg text-navy-900">{pillar.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">{pillar.short}</p>
    </div>
  );
}

export function PillarDetail({ pillar }: { pillar: Pillar }) {
  const Icon = ICONS[(pillar.id - 1) % ICONS.length];
  return (
    <section
      id={pillar.slug}
      className="scroll-mt-24 rounded-3xl border border-navy/10 bg-white p-7 shadow-soft sm:p-9"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy text-cream">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
            Pillar {pillar.id}
          </span>
          <h2 className="font-serif text-2xl text-navy-900">{pillar.name}</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-navy-900">Definition</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
            {pillar.definition}
          </p>
          <h3 className="mt-5 text-sm font-semibold text-navy-900">
            Why it matters
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
            {pillar.whyItMatters}
          </p>

          <h3 className="mt-5 text-sm font-semibold text-navy-900">
            Possible indicators
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {pillar.indicators.map((ind) => (
              <span
                key={ind}
                className="rounded-full bg-cream-100 px-2.5 py-1 text-xs text-navy-700 ring-1 ring-inset ring-navy/10"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-900">
            Example diagnostic questions
          </h3>
          <ul className="mt-2 space-y-2">
            {pillar.diagnosticQuestions.map((q) => (
              <li
                key={q}
                className="flex gap-2 text-sm leading-relaxed text-navy-700"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {q}
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-red-200 bg-red-50/60 p-3.5">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-red-700">
                Weak performance
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
                {pillar.weak}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Strong performance
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
                {pillar.strong}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
