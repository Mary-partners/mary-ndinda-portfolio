import type { Metadata } from "next";
import Link from "next/link";
import { baselineTargets, deliveryRisks, firstYearIntro, phases, processStandards, stabilisationScenario } from "@/content/first-year";
import { byNumber } from "@/content/workstreams";
import { Breadcrumbs, Container, PageHeader, SectionHeading } from "@/components/ui";
import { EvidenceBadge } from "@/components/evidence-badge";
import { ResponsiveTable } from "@/components/responsive-table";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "First year: 30/60/90 days and months 4–12",
  description: "A cross-workstream roadmap with deliverables, dependencies, owners, evidence and acceptance criteria.",
};

export default function FirstYear() {
  return (
    <Container>
      <Breadcrumbs items={[{ href: "/", label: "Overview" }, { label: "First year" }]} />
      <PageHeader eyebrow="First-year roadmap" title="The first 90 days, then months 4–12" lede={firstYearIntro}>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <EvidenceBadge kind="proposed" />
          <PrintButton label="Print the roadmap" />
        </div>
      </PageHeader>

      {/* Timeline overview */}
      <nav aria-label="Phases" className="no-print border-b border-rule py-8">
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {phases.map((p, i) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="group block rounded-lg border border-rule bg-white/60 p-4 hover:border-ink">
                <span className="num-tab text-xs text-gold">0{i + 1}</span>
                <span className="mt-1 block font-serif text-lg leading-tight text-ink">{p.label}</span>
                <span className="mt-0.5 block text-xs uppercase tracking-[0.12em] text-ink-3">{p.window}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {phases.map((p) => (
        <section key={p.id} aria-labelledby={p.id} className="border-b border-rule py-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <div>
              <p className="eyebrow">{p.window}</p>
              <h2 id={p.id} className="mt-2 scroll-mt-24 text-3xl text-ink">
                {p.label}
              </h2>
            </div>
            <div className="min-w-0">
              <p className="max-w-3xl text-lg leading-relaxed text-ink-2">{p.intent}</p>
              <ResponsiveTable
                caption={`${p.label}: deliverables`}
                evidence="proposed"
                columns={["Deliverable", "Dependencies", "Owner", "Evidence", "Acceptance criteria", "Workstreams"]}
                rows={p.deliverables.map((d) => [d.deliverable, d.dependencies, d.owner, d.evidence, d.acceptance, d.workstreams.map((n) => `${n} ${byNumber(n)?.shortTitle ?? ""}`).join("; ")])}
              />
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="standards" className="border-b border-rule py-12">
        <SectionHeading id="standards" eyebrow="Standards" title="Process standards and baseline-dependent targets" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ResponsiveTable caption="Process standards" evidence="proposed" columns={["Standard", "Measure"]} rows={processStandards.map((s) => [s.standard, s.measure])} />
          <ResponsiveTable
            caption="Outcome targets that need a baseline first"
            evidence="proposed"
            columns={["Area", "Baseline needed", "How the target would be set"]}
            rows={baselineTargets.map((b) => [b.area, b.baselineNeeded, b.howTargetSet])}
            note="No annual deployment, fund return, TA budget or commitment target is proposed. Those depend on data and decisions I do not have."
          />
        </div>
      </section>

      <section aria-labelledby="risks" className="border-b border-rule py-12">
        <SectionHeading id="risks" eyebrow="Delivery risk" title="What could prevent delivery" />
        <ResponsiveTable caption="Delivery risks and responses" evidence="proposed" columns={["Risk", "What I would do"]} rows={deliveryRisks.map((r) => [r.risk, r.response])} />
      </section>

      <section aria-labelledby="stabilise" className="py-12">
        <div className="rounded-xl border-l-4 border-gold bg-gold-2/40 p-6 sm:p-8">
          <p className="eyebrow">Scenario</p>
          <h2 id="stabilise" className="mt-2 text-3xl text-ink">
            {stabilisationScenario.title}
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-2">{stabilisationScenario.intro}</p>
          <ol className="mt-5 grid max-w-5xl gap-3 md:grid-cols-2">
            {stabilisationScenario.changes.map((c, i) => (
              <li key={i} className="flex gap-3 rounded-lg bg-paper/80 p-4 text-ink-2">
                <span aria-hidden="true" className="num-tab font-serif text-gold">
                  {i + 1}
                </span>
                {c}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-ink-3">
            See{" "}
            <Link className="link" href="/playbook/portfolio-management-governance">
              Workstream 07
            </Link>{" "}
            and{" "}
            <Link className="link" href="/playbook/follow-ons-recoveries-exits">
              Workstream 11
            </Link>
            .
          </p>
        </div>
      </section>
    </Container>
  );
}
