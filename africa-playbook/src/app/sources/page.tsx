import type { Metadata } from "next";
import { assumptions, figuresNotUsed, methodology, publicFacts, sources } from "@/content/sources";
import { profile } from "@/content/profile";
import { Breadcrumbs, Container, PageHeader, SectionHeading } from "@/components/ui";
import { EvidenceBadge, EvidenceLegend } from "@/components/evidence-badge";
import { ResponsiveTable } from "@/components/responsive-table";

export const metadata: Metadata = {
  title: "Sources, assumptions and methodology",
  description: "Source register with check status, the public facts relied on, assumptions and methodology.",
};

export default function SourcesPage() {
  const anyUnchecked = sources.some((s) => s.status !== "verified");
  return (
    <Container>
      <Breadcrumbs items={[{ href: "/", label: "Overview" }, { label: "Sources" }]} />
      <PageHeader
        eyebrow="Sources and methodology"
        title="What this playbook relies on, and how far"
        lede={`Research reference date: ${profile.researchDate}. Public descriptions of the firm provide context only. The operating plan is original and does not assume the firm has any particular problem.`}
      />

      {anyUnchecked ? (
        <div role="note" className="mt-8 rounded-lg border-l-4 border-gold bg-gold-2/50 p-5 text-ink-2">
          <p className="font-medium text-ink">
            <span aria-hidden="true">◆ </span>Source check status
          </p>
          <p className="mt-1 max-w-3xl leading-relaxed">
            The public sources could not be retrieved from the build environment on the research date, so they have not been rechecked. The few public facts used come from the context supplied with the brief, and each is labelled. They should be confirmed against the live pages before this site is shared.
          </p>
        </div>
      ) : null}

      <section aria-labelledby="register" className="border-b border-rule py-12">
        <SectionHeading id="register" eyebrow="Register" title="Source register" />
        <ol className="divide-y divide-rule border-y border-rule">
          {sources.map((s) => (
            <li key={s.id} id={s.id} className="grid scroll-mt-24 gap-3 py-5 md:grid-cols-[3rem_1fr_16rem]">
              <span className="num-tab font-serif text-xl text-gold">{s.id}</span>
              <div className="min-w-0">
                <p className="font-medium text-ink">{s.title}</p>
                <p className="mt-0.5 text-sm text-ink-3">
                  {s.publisher} · Published: {s.published}
                </p>
                <a href={s.url} className="link mt-1 inline-block break-all text-sm" rel="noopener noreferrer" target="_blank">
                  {s.url}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <ul className="mt-2 list-disc pl-5 text-sm text-ink-2">
                  {s.usedFor.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm leading-snug text-ink-3">
                <span className="font-semibold text-ink-2">{s.status === "verified" ? "✓ Verified" : "◌ Not rechecked"}</span>
                <span className="mt-1 block">{s.statusNote}</span>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="facts" className="border-b border-rule py-12">
        <SectionHeading id="facts" eyebrow="Public facts" title="The public facts relied on" />
        <ul className="space-y-4">
          {publicFacts.map((f) => (
            <li key={f.id} className="rounded-lg border border-rule bg-white/60 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <EvidenceBadge kind="public" />
                <a href={`#${f.source}`} className="link text-sm">
                  Source {f.source}
                </a>
                <span className="text-sm text-ink-3">· {f.asOf}</span>
              </div>
              <p className="mt-2 max-w-4xl leading-relaxed text-ink">{f.statement}</p>
              {f.caveat ? <p className="mt-2 max-w-4xl text-sm leading-relaxed text-ink-3">Caveat: {f.caveat}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="not-used" className="border-b border-rule py-12">
        <SectionHeading id="not-used" eyebrow="Restraint" title="Figures deliberately not used" />
        <ResponsiveTable caption="Excluded figures and why" columns={["Item", "Reason"]} rows={figuresNotUsed.map((f) => [f.item, f.reason])} />
      </section>

      <section aria-labelledby="assumptions" className="border-b border-rule py-12">
        <SectionHeading id="assumptions" eyebrow="Assumptions" title="Working assumptions and how I would test them" />
        <ResponsiveTable caption="Assumptions register" evidence="proposed" columns={["Area", "Assumption", "How it would be tested"]} rows={assumptions.map((a) => [a.area, a.assumption, a.howTested])} />
      </section>

      <section aria-labelledby="method" className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="method" eyebrow="Methodology" title="How the content was prepared" />
            <ul className="space-y-3">
              {methodology.map((m, i) => (
                <li key={i} className="border-l-2 border-rule pl-4 leading-relaxed text-ink-2">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Evidence classes</p>
            <EvidenceLegend />
          </div>
        </div>
      </section>
    </Container>
  );
}
