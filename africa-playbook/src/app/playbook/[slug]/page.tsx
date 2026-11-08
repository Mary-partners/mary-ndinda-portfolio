import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels, getWorkstream, sectionsFor, workstreams } from "@/content/workstreams";
import { Breadcrumbs, Container } from "@/components/ui";
import { EvidenceBadge } from "@/components/evidence-badge";
import { WorkstreamSections } from "@/components/workstream-sections";
import { AccordionTools } from "@/components/accordion-tools";
import { PrintButton } from "@/components/print-button";

export const dynamicParams = false;

export function generateStaticParams() {
  return workstreams.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = getWorkstream(slug);
  if (!w) return {};
  return { title: `${w.number}. ${w.title}`, description: w.tagline };
}

export default async function WorkstreamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWorkstream(slug);
  if (!w) notFound();
  const idx = workstreams.indexOf(w);
  const prev = workstreams[idx - 1];
  const next = workstreams[idx + 1];
  const sections = sectionsFor(w);

  return (
    <Container>
      <Breadcrumbs items={[{ href: "/", label: "Overview" }, { href: "/playbook", label: "Playbook" }, { label: `${w.number}. ${w.shortTitle}` }]} />

      <header className="grid gap-8 border-b border-rule pb-10 pt-6 lg:grid-cols-[1fr_18rem]">
        <div>
          <p className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Workstream {w.number}</span>
            <span className="text-xs text-ink-3">
              {[w.category, ...(w.alsoIn ?? [])].map((c) => categoryLabels[c]).join(" · ")}
            </span>
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-[1.08] text-ink sm:text-5xl">{w.title}</h1>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex flex-wrap gap-2">
              <EvidenceBadge kind="proposed" />
            </div>
            <p className="text-lg leading-relaxed text-ink-2">{w.summary}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 self-end">
          <AccordionTools scope="ws-sections" />
          <PrintButton label="Print this workstream" />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10 pt-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="no-print hidden lg:block">
          <nav aria-label="Sections in this workstream" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="eyebrow mb-3">On this page</p>
            <ol className="space-y-1 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={`block rounded px-2 py-1 leading-snug hover:bg-paper-2 hover:text-ink ${s.extra ? "pl-5 text-ink-3" : "text-ink-2"}`}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div id="ws-sections" className="min-w-0">
          <details className="no-print mb-6 rounded-lg border border-rule bg-paper-2/60 lg:hidden">
            <summary className="px-4 py-3 text-sm font-medium text-ink">Jump to a section</summary>
            <ol className="space-y-1 px-4 pb-4 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={`block py-1 ${s.extra ? "pl-3 text-ink-3" : "text-ink-2"}`}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <WorkstreamSections w={w} />

          <nav aria-label="Other workstreams" className="no-print mt-12 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link href={`/playbook/${prev.slug}`} className="rounded-lg border border-rule p-4 hover:border-ink">
                <span className="eyebrow">Previous · {prev.number}</span>
                <span className="mt-1 block font-serif text-lg text-ink">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/playbook/${next.slug}`} className="rounded-lg border border-rule p-4 text-right hover:border-ink">
                <span className="eyebrow">Next · {next.number}</span>
                <span className="mt-1 block font-serif text-lg text-ink">{next.title}</span>
              </Link>
            ) : (
              <Link href="/first-year" className="rounded-lg border border-rule p-4 text-right hover:border-ink">
                <span className="eyebrow">Next</span>
                <span className="mt-1 block font-serif text-lg text-ink">The first-year roadmap</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </Container>
  );
}
