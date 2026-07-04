import type { Metadata } from "next";
import { img } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { InsightsExplorer } from "@/components/InsightsExplorer";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical thinking on audit, tax, and advisory questions facing East African businesses, from eTIMS and transfer pricing to IFRS 18 and investment readiness.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from the East African market."
        lead="Grounded, practical writing on the tax, assurance, and advisory questions our clients are facing right now. Filter by the area that matters to you."
        image={img.atWork}
      />

      <section className="container-page py-20">
        <InsightsExplorer />
      </section>

      <CTASection
        title="Want this thinking applied to your business?"
        body="Insights are a starting point. A conversation is where we turn them into a plan for your specific situation."
      />
      <div className="h-24" />
    </>
  );
}
