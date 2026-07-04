import type { Metadata } from "next";
import { industries } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CoverArt } from "@/components/CoverArt";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sector fluency across financial services, SMEs, agribusiness, manufacturing, real estate, development, technology, and energy in East Africa.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="We speak the language of your sector."
        lead="The numbers mean different things in a SACCO, an agribusiness, and a donor funded programme. We bring the context that makes our audit, tax, and advisory work land."
      />

      <section className="container-page py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal
              key={industry.slug}
              delay={(i % 3) * 80}
              as="article"
              className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative h-36">
                <CoverArt variant={i} rounded={false} className="h-full" />
                <span className="absolute left-4 top-4 font-serif text-sm font-semibold text-white">
                  0{i + 1}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-ink-900">
                  {industry.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {industry.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Working in a sector we have not listed?"
        body="Our approach travels well. If your business sits outside these categories, we will still bring the same rigour and the right specialists to the work."
      />
      <div className="h-24" />
    </>
  );
}
