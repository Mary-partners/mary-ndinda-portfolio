import type { Metadata } from "next";
import { Breadcrumbs, Container, PageHeader } from "@/components/ui";
import { PlaybookSearch } from "@/components/playbook-search";
import { EvidenceBadge } from "@/components/evidence-badge";
import { buildSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Playbook: twelve workstreams",
  description: "Searchable index of the twelve proposed operating workstreams.",
};

export default function PlaybookIndex() {
  const docs = buildSearchIndex();
  return (
    <Container>
      <Breadcrumbs items={[{ href: "/", label: "Overview" }, { label: "Playbook" }]} />
      <PageHeader
        eyebrow="The playbook"
        title="Twelve workstreams, each written as an operating plan"
        lede="Each workstream sets out the outcome, what I would establish before acting, the method, a populated template, ownership, decision gates, KPIs, risks, and the 90-day and 12-month results. Search covers every section, including tables, and each result links directly to the section."
      >
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-ink-3">
          <EvidenceBadge kind="proposed" />
          <span>Templates and worked examples are marked</span>
          <EvidenceBadge kind="illustrative" />
        </div>
      </PageHeader>
      <PlaybookSearch docs={docs} />
    </Container>
  );
}
