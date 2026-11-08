import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Container, PageHeader, SectionHeading } from "@/components/ui";
import { EvidenceBadge } from "@/components/evidence-badge";
import { EquityCalculator } from "@/components/equity-calculator";
import { DeclineFlags } from "@/components/decline-flags";
import { PrioritisationTool } from "@/components/prioritisation-tool";

export const metadata: Metadata = {
  title: "Decision lab",
  description: "A fictional equity case with interactive sensitivities, decision gates and an editable market-prioritisation aid.",
};

const limitations = [
  { item: "Dividends", why: "Interim dividends change the cash-flow profile. The single-inflow annualised return no longer applies, and a cash-flow IRR is needed." },
  { item: "Dilution", why: "Capital raises, employee schemes or convertibles reduce ownership at exit unless the fund follows its money." },
  { item: "Follow-on investment", why: "Additional capital at a later valuation changes both MOIC and IRR and needs its own test (Workstream 11)." },
  { item: "Taxes", why: "Withholding tax on dividends and capital-gains tax on exit depend on jurisdiction and treaty position and are not modelled." },
  { item: "Fund fees and carry", why: "The result is gross at investment level. Net returns to limited partners are lower." },
  { item: "Interim FX", why: "The path of the exchange rate matters when there are interim cash flows. Only the start and end rates are used here." },
  { item: "Regulatory capital", why: "A regulated lender may be unable to pay dividends or may need injections. The linked model in Workstream 04 captures this." },
  { item: "Exit feasibility", why: "The case assumes a buyer at the stated multiple. Workstream 11 tests whether such a route exists." },
];

export default function DecisionLab() {
  return (
    <Container>
      <Breadcrumbs items={[{ href: "/", label: "Overview" }, { label: "Decision lab" }]} />
      <PageHeader
        eyebrow="Decision lab"
        title="Illustrative FSP A: an equity case, its sensitivities and its gates"
        lede="Illustrative FSP A is a fictional regulated lender. The case is deliberately simple, so the mechanics are visible: how earnings, the exit multiple and the currency combine into a USD outcome, and why the financial result is only one input to a decision."
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <EvidenceBadge kind="illustrative" />
        </div>
        <p className="mt-4 max-w-3xl rounded-lg border border-dashed border-ink/30 bg-white/60 p-4 text-sm leading-relaxed text-ink-2">
          Fictional institution and data. Not investment guidance, not a valuation of any real company and not a view on any currency. No figure here is a forecast.
        </p>
      </PageHeader>

      <section aria-labelledby="equity-case" className="border-b border-rule py-12">
        <SectionHeading id="equity-case" eyebrow="1 · Equity case" title="From exit earnings to USD proceeds" />
        <EquityCalculator />
      </section>

      <section aria-labelledby="limits" className="border-b border-rule py-12">
        <SectionHeading id="limits" eyebrow="2 · Limits" title="What a fuller model would need" />
        <dl className="grid gap-x-10 gap-y-5 md:grid-cols-2">
          {limitations.map((l) => (
            <div key={l.item} className="border-t border-rule pt-3">
              <dt className="font-medium text-ink">{l.item}</dt>
              <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{l.why}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-ink-3">
          The full model specification is in{" "}
          <Link className="link" href="/playbook/modelling-valuation-downside#method">
            Workstream 04: modelling, valuation and downside protection
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="gates" className="border-b border-rule py-12">
        <SectionHeading id="gates" eyebrow="3 · Gates" title="What would make me defer or decline?" />
        <DeclineFlags />
      </section>

      <section aria-labelledby="markets" className="py-12">
        <SectionHeading id="markets" eyebrow="4 · Market prioritisation" title="Editable prioritisation aid" />
        <PrioritisationTool />
        <p className="mt-6 text-sm text-ink-3">
          Method and governance:{" "}
          <Link className="link" href="/playbook/strategy-and-capital-allocation#method">
            Workstream 01: Africa strategy and capital allocation
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}
