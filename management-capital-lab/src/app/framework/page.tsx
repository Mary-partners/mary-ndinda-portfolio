import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, Clock, ArrowRight, RefreshCw, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { PillarDetail } from "@/components/PillarCard";
import { ConceptualModel } from "@/components/ConceptualModel";
import { ButtonLink } from "@/components/ui/button";
import { PILLARS, SCORE_BANDS, ARCHETYPES } from "@/lib/data/pillars";

export const metadata: Metadata = {
  title: "The Management Capital Index",
  description:
    "A proposed diagnostic framework for assessing whether SMEs are ready to access, absorb, and deploy capital for sustainable growth — across six pillars of management capital.",
};

const BAND_COLORS = [
  "bg-red-100 text-red-800 border-red-200",
  "bg-orange-100 text-orange-800 border-orange-200",
  "bg-amber-100 text-amber-800 border-amber-200",
  "bg-lime-100 text-lime-800 border-lime-200",
  "bg-emerald-100 text-emerald-800 border-emerald-200",
];

export default function IndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Framework"
        title="The Management Capital Index"
        intro="A proposed diagnostic framework for assessing whether SMEs are ready to access, absorb, and deploy capital for sustainable growth."
      >
        <nav
          aria-label="Pillars"
          className="mt-8 flex flex-wrap gap-2"
        >
          {PILLARS.map((p) => (
            <Link
              key={p.id}
              href={`#${p.slug}`}
              className="rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-xs font-medium text-navy-700 transition-colors hover:border-navy/35"
            >
              {p.id}. {p.name}
            </Link>
          ))}
        </nav>
      </PageHeader>

      {/* What changed after Chapter Two */}
      <section className="container-lab pt-14 sm:pt-16">
        <div className="flex gap-3 rounded-2xl border border-gold/30 bg-gold-50 p-5 text-sm leading-relaxed text-navy-700">
          <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
          <div>
            <p className="font-semibold text-navy-900">
              Updated after the Chapter Two literature review (November 2026)
            </p>
            <p className="mt-1">
              The six pillars hold, with three refinements. Strategy now
              explicitly includes market orientation. Operations and the founder
              pillar are broadened to process discipline and the whole management
              team. And Pillar 6 now measures{" "}
              <strong>capital-deployment readiness before funding</strong>, while
              realised absorption after funding is tested separately as an
              outcome. Each pillar below shows what the literature says and what
              the fieldwork still has to test.{" "}
              <Link href="/findings" className="font-medium text-forest underline underline-offset-2 hover:text-forest-700">
                Read the findings
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="container-lab space-y-8 py-16 sm:py-20">
        {PILLARS.map((p) => (
          <PillarDetail key={p.id} pillar={p} />
        ))}
      </div>

      {/* Conceptual model */}
      <section className="border-t border-navy/10 py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="How the pillars connect to outcomes"
            title="The conceptual model"
            description="The six pillars make up management capital. The study will test how it relates to investment readiness, access to finance, realised capital absorption and sustainable growth."
          />
          <ConceptualModel className="mt-10" />
        </div>
      </section>

      {/* Scoring concept */}
      <section className="border-y border-navy/10 bg-white py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="Scoring concept"
            title="From fragile to finance-ready"
            description="An indicative scoring band turns the six-pillar profile into a shared language for readiness. This is a working concept, not a final scale."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SCORE_BANDS.map((band, i) => (
              <div
                key={band.label}
                className={`rounded-2xl border p-5 ${BAND_COLORS[i]}`}
              >
                <p className="font-mono text-sm font-semibold">{band.range}</p>
                <p className="mt-1 font-serif text-lg">{band.label}</p>
                <p className="mt-2 text-sm leading-relaxed opacity-90">
                  {band.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3 rounded-2xl border border-navy/10 bg-cream-50 p-5 text-sm leading-relaxed text-navy-700">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-navy-500" />
            <p>
              <strong className="text-navy-900">Profiles before scores.</strong>{" "}
              The literature does not yet justify weights between pillars, and a
              single number can hide a serious weakness behind a strong pillar.
              The first version of the index will report pillar-level profiles;
              any overall score stays provisional until validated. It is designed
              to support diagnosis and advisory sequencing, not to act as an
              automatic lending threshold.
            </p>
          </div>
        </div>
      </section>

      {/* Archetypes */}
      <section className="py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="SME archetypes"
            title="Six readiness archetypes"
            description="A profile, not a pass-or-fail gate. Each archetype points to the most valuable next step — whether that is advisory support, systems, governance, or capital itself."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARCHETYPES.map((a, i) => (
              <div
                key={a.name}
                className="flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/15 text-sm font-semibold text-gold-700">
                    {i + 1}
                  </span>
                  <h3 className="font-serif text-lg text-navy-900">{a.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {a.description}
                </p>
                <div className="mt-4 rounded-xl bg-cream-100 p-3.5 ring-1 ring-inset ring-navy/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
                    Most useful next step
                  </p>
                  <p className="mt-1 text-sm text-navy-700">{a.need}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon diagnostic */}
      <section className="pb-20">
        <div className="container-lab">
          <div className="overflow-hidden rounded-3xl border border-navy/15 bg-gradient-to-br from-navy-800 to-navy-900 p-8 text-cream sm:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/20 text-gold-200">
                <Gauge className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1 text-xs font-medium text-cream/80">
                <Clock className="h-3.5 w-3.5" /> Coming soon
              </span>
            </div>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl text-cream sm:text-4xl">
              Take the Management Capital diagnostic
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/85">
              A founder-centred self-assessment across the six pillars is in
              development. It will return your readiness profile, your closest
              archetype, and the most valuable next step for your business.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-gold/30 px-6 py-3 text-sm font-medium text-cream/70">
                Diagnostic in development
              </span>
              <ButtonLink
                href="/collaborate?type=Partner+on+diagnostics+or+pilots+(ESO)"
                variant="outline"
                size="lg"
                className="border-cream/40 text-cream hover:bg-cream/10"
              >
                Partner on the pilot
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
