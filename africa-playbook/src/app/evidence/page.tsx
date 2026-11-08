import type { Metadata } from "next";
import { evidenceIntro, evidenceRows, howIWouldCloseGaps, statusLabels } from "@/content/evidence";
import { profile } from "@/content/profile";
import { Breadcrumbs, Container, PageHeader, SectionHeading } from "@/components/ui";
import { EvidenceBadge } from "@/components/evidence-badge";
import { ResponsiveTable } from "@/components/responsive-table";

export const metadata: Metadata = {
  title: "Experience and evidence",
  description: "A candid map of role requirements to transferable experience and the evidence still needed.",
};

const statusGlyph = {
  "supplied-awaiting-verification": "◐",
  "partly-transferable": "◑",
  "evidence-to-establish": "○",
} as const;

export default function EvidencePage() {
  const counts = evidenceRows.reduce<Record<string, number>>((acc, r) => ((acc[r.status] = (acc[r.status] ?? 0) + 1), acc), {});
  return (
    <Container>
      <Breadcrumbs items={[{ href: "/", label: "Overview" }, { label: "Evidence" }]} />
      <PageHeader eyebrow="Experience and evidence" title="What transfers, what needs evidence, and what this playbook cannot show" lede={evidenceIntro}>
        <div className="mt-5 flex flex-wrap gap-2">
          <EvidenceBadge kind="candidate" />
        </div>
      </PageHeader>

      <section aria-labelledby="profile" className="grid gap-8 border-b border-rule py-12 lg:grid-cols-[16rem_1fr]">
        <div>
          <p className="eyebrow">Public profile</p>
          <h2 id="profile" className="mt-2 text-3xl text-ink">
            {profile.name}
          </h2>
          <p className="mt-1 text-ink-3">{profile.location}</p>
        </div>
        <div>
          <p className="max-w-3xl font-serif text-2xl leading-snug text-ink">{profile.positioning}</p>
          {profile.approvedCareerDetails.length ? (
            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              {profile.approvedCareerDetails.map((d) => (
                <div key={d.heading} className="border-t border-rule pt-3">
                  <dt className="font-medium text-ink">{d.heading}</dt>
                  <dd className="mt-1 text-ink-2">{d.text}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-3">
              Employer names, dates, team sizes and financial scopes are not published here until Mary has verified them for external circulation. The map below describes supplied experience in general terms only.
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="map" className="border-b border-rule py-12">
        <SectionHeading id="map" eyebrow="Capability map" title="Requirement by requirement">
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2" aria-label="Status summary">
            {(Object.keys(statusLabels) as (keyof typeof statusLabels)[]).map((s) => (
              <li key={s}>
                <span aria-hidden="true" className="mr-1.5 text-gold">
                  {statusGlyph[s]}
                </span>
                {statusLabels[s]}: <span className="num-tab font-medium text-ink">{counts[s] ?? 0}</span>
              </li>
            ))}
          </ul>
        </SectionHeading>
        <ResponsiveTable
          caption="Role requirements mapped to supplied experience"
          evidence="candidate"
          columns={["Requirement", "Supplied experience", "Relevance", "Evidence needed", "Status"]}
          rows={evidenceRows.map((r) => [r.requirement, r.supplied, r.relevance, r.evidenceNeeded, `${statusGlyph[r.status]} ${statusLabels[r.status]}`])}
          note="'Supplied' means the experience was described by the candidate and is awaiting verification. It is not a verified credential. CFO-level finance leadership is relevant to the role but is not equivalent to fund investment experience."
        />
      </section>

      <section aria-labelledby="gaps" className="py-12">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow">Working with the gaps</p>
            <h2 id="gaps" className="mt-2 text-3xl text-ink">
              How I would build direct investment evidence
            </h2>
            <div className="mt-3">
              <EvidenceBadge kind="proposed" />
            </div>
          </div>
          <div>
            <ol className="max-w-3xl space-y-4">
              {howIWouldCloseGaps.map((g, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 leading-relaxed text-ink-2">
                  <span aria-hidden="true" className="num-tab font-serif text-gold">
                    {i + 1}
                  </span>
                  {g}
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-3xl rounded-lg border border-rule bg-paper-2/60 p-4 text-sm leading-relaxed text-ink-2">
              A playbook does not substitute for a required track record. It shows method and judgement. Whether that is enough for this role is for the firm to decide.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
