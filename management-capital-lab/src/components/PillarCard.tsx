import {
  Calculator,
  ShieldCheck,
  Compass,
  Settings2,
  UserRoundCheck,
  Sprout,
  BookOpenText,
  FlaskConical,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { Pillar } from "@/lib/data/pillars";
import {
  PILLAR_STAGES,
  STAGE_BY_KEY,
  type StageKey,
} from "@/lib/data/stages";

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

export function PillarDetail({
  pillar,
  stage,
}: {
  pillar: Pillar;
  stage: StageKey;
}) {
  const Icon = ICONS[(pillar.id - 1) % ICONS.length];
  const atStage = PILLAR_STAGES[pillar.slug]?.[stage];
  const stageName = STAGE_BY_KEY[stage].name;
  return (
    <section
      id={pillar.slug}
      className="scroll-mt-40 sm:scroll-mt-36 rounded-3xl border border-navy/10 bg-white p-7 shadow-soft sm:p-9"
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

      {pillar.changeNote && (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold-50 px-4 py-3 text-sm leading-relaxed text-navy-700">
          <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          <span>{pillar.changeNote}</span>
        </p>
      )}

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

        {atStage && (
          <div className="rounded-2xl border border-navy/10 bg-cream-50 p-5">
            <p className="inline-flex items-center rounded-full bg-navy px-2.5 py-0.5 text-xs font-semibold text-cream">
              {stageName} business
            </p>

            <h3 className="mt-4 flex items-center gap-2 text-sm font-semibold text-navy-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              What good looks like at this stage
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
              {atStage.looksLike}
            </p>

            <h3 className="mt-5 text-sm font-semibold text-navy-900">
              Diagnostic questions
            </h3>
            <ol className="mt-2 space-y-2">
              {atStage.questions.map((q, i) => (
                <li
                  key={q}
                  className="flex gap-2.5 text-sm leading-relaxed text-navy-700"
                >
                  <span className="mt-0.5 text-xs font-semibold text-gold-600">
                    {i + 1}
                  </span>
                  {q}
                </li>
              ))}
            </ol>

            <div className="mt-5 flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                  Common gap at this stage
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-navy-700">
                  {atStage.watchFor}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-4 border-t border-navy/10 pt-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
            <BookOpenText className="h-4 w-4 text-forest" />
            What the literature says
            <span className="font-normal text-navy-500">(Chapter Two)</span>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
            {pillar.evidence}
          </p>
        </div>
        <div className="rounded-xl bg-cream-100 p-4 ring-1 ring-inset ring-navy/10">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
            <FlaskConical className="h-4 w-4 text-gold-600" />
            Still to be tested
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
            {pillar.openQuestion}
          </p>
        </div>
      </div>
    </section>
  );
}
