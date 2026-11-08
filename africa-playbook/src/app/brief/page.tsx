import type { Metadata } from "next";
import Link from "next/link";
import { hero, priorities, thesis } from "@/content/home";
import { profile } from "@/content/profile";
import { workstreams } from "@/content/workstreams";
import { phases } from "@/content/first-year";
import { evidenceRows, statusLabels } from "@/content/evidence";
import { Breadcrumbs, Container } from "@/components/ui";
import { EvidenceBadge } from "@/components/evidence-badge";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "Executive brief",
  description: "A print-friendly summary of the proposed Africa investment and leadership playbook.",
};

export default function Brief() {
  const toEstablish = evidenceRows.filter((r) => r.status === "evidence-to-establish").map((r) => r.requirement);
  return (
    <Container className="max-w-5xl">
      <Breadcrumbs items={[{ href: "/", label: "Overview" }, { label: "Executive brief" }]} />

      <div className="no-print mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-rule bg-paper-2/60 p-4 text-sm text-ink-2">
        <PrintButton />
        <span>Uses your browser&rsquo;s print dialog. Choose &ldquo;Save as PDF&rdquo; as the destination to keep a copy. No file is downloaded from this site.</span>
      </div>

      <article className="py-10">
        <header className="border-b-2 border-ink pb-6">
          <p className="eyebrow">Executive brief · {profile.researchDate}</p>
          <h1 className="mt-3 text-4xl leading-tight text-ink">{profile.name}</h1>
          <p className="mt-2 font-serif text-2xl leading-snug text-ink-2">{hero.headline}</p>
          <p className="mt-3 text-ink-2">{hero.sub}</p>
          <p className="mt-4 text-sm font-medium text-ink">{profile.disclaimer}</p>
          <p className="text-sm text-ink-3">{profile.notOfficial}</p>
        </header>

        <section aria-labelledby="b-thesis" className="avoid-break border-b border-rule py-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="b-thesis" className="text-2xl text-ink">{thesis.title}</h2>
            <EvidenceBadge kind="proposed" />
          </div>
          <div className="mt-3 space-y-3 leading-relaxed text-ink-2">
            {thesis.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="b-priorities" className="border-b border-rule py-6">
          <h2 id="b-priorities" className="text-2xl text-ink">Three priorities</h2>
          <ol className="mt-3 space-y-3">
            {priorities.map((p) => (
              <li key={p.n} className="avoid-break grid grid-cols-[1.5rem_1fr] gap-2">
                <span className="font-serif text-gold">{p.n}</span>
                <div>
                  <p className="font-medium text-ink">{p.title}</p>
                  <p className="text-[0.95rem] leading-relaxed text-ink-2">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="b-ws" className="border-b border-rule py-6">
          <h2 id="b-ws" className="text-2xl text-ink">Twelve workstreams in brief</h2>
          <ol className="mt-3 divide-y divide-rule">
            {workstreams.map((w) => (
              <li key={w.slug} className="avoid-break grid grid-cols-[2rem_1fr] gap-2 py-3">
                <span className="num-tab font-serif text-gold">{w.number}</span>
                <div>
                  <p className="font-medium text-ink">
                    <Link href={`/playbook/${w.slug}`} className="hover:underline">
                      {w.title}
                    </Link>
                  </p>
                  <p className="text-[0.92rem] leading-relaxed text-ink-2">{w.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="b-year" className="border-b border-rule py-6">
          <h2 id="b-year" className="text-2xl text-ink">First year</h2>
          <dl className="mt-3 space-y-3">
            {phases.map((p) => (
              <div key={p.id} className="avoid-break grid gap-1 sm:grid-cols-[8rem_1fr]">
                <dt className="font-medium text-ink">{p.label}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-ink-2">
                  {p.intent} <span className="text-ink-3">Key outputs: {p.deliverables.map((d) => d.deliverable).join("; ")}.</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="b-evidence" className="avoid-break py-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="b-evidence" className="text-2xl text-ink">Experience and evidence</h2>
            <EvidenceBadge kind="candidate" />
          </div>
          <p className="mt-3 leading-relaxed text-ink-2">
            Supplied experience in finance leadership, modelling, enterprise capability, systems and climate finance is relevant and awaiting verification. These requirements are marked <strong>{statusLabels["evidence-to-establish"]}</strong>: {toEstablish.join("; ")}. The full map is at <Link className="link" href="/evidence">/evidence</Link>.
          </p>
          <p className="mt-3 text-sm text-ink-3">{profile.positioning}</p>
        </section>
      </article>
    </Container>
  );
}
