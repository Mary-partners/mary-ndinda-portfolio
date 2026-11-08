import Link from "next/link";
import { hero, leadershipNote, lifecycle, priorities, thesis, twoMinuteRoute } from "@/content/home";
import { byNumber, categoryLabels, workstreams } from "@/content/workstreams";
import { profile } from "@/content/profile";
import type { Category } from "@/content/types";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { EvidenceBadge } from "@/components/evidence-badge";

const groups: Category[] = ["investment", "portfolio", "capital", "leadership"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="border-b border-rule">
        <Container className="grid gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:pb-24">
          <div>
            <h1 id="hero-title">
              <span className="block font-serif text-3xl text-ink sm:text-4xl">{hero.name}</span>
              <span className="sr-only">: </span>
              <span className="mt-5 block text-[2.4rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.2rem]">{hero.headline}</span>
            </h1>
            <p className="eyebrow mt-4">{profile.location}</p>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-2">{hero.sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/playbook">Explore how I would lead</ButtonLink>
              <ButtonLink href="/first-year" variant="secondary">
                Read the first 90 days
              </ButtonLink>
            </div>
            <p className="mt-8 max-w-xl border-l-2 border-gold pl-4 font-serif text-lg italic leading-relaxed text-ink-2">{profile.positioning}</p>
          </div>

          <aside aria-labelledby="route-title" className="self-end rounded-xl border border-rule bg-white/70 p-6">
            <p id="route-title" className="eyebrow">
              If you have two minutes
            </p>
            <ol className="mt-4 divide-y divide-rule">
              {twoMinuteRoute.map((r, i) => (
                <li key={r.href}>
                  <Link href={r.href} className="group flex items-baseline justify-between gap-4 py-3">
                    <span className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="num-tab font-serif text-sm text-gold">
                        {i + 1}
                      </span>
                      <span className="text-ink group-hover:underline">{r.label}</span>
                    </span>
                    <span className="shrink-0 text-xs text-ink-3">{r.time}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">
              For a deeper review, each workstream opens into a full operating plan. The Decision Lab has a worked investment case.
            </p>
            <div className="mt-4">
              <Link href="/brief" className="link text-sm">
                Printable executive brief
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      {/* Thesis */}
      <section aria-labelledby="thesis" className="border-b border-rule bg-paper-2/50">
        <Container className="grid gap-10 py-16 lg:grid-cols-[18rem_1fr] lg:py-20">
          <div>
            <SectionHeading id="thesis" eyebrow="01 · The view" title={thesis.title} />
            <EvidenceBadge kind="proposed" />
          </div>
          <div className="max-w-3xl space-y-5 text-[1.12rem] leading-[1.75] text-ink-2">
            {thesis.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "font-serif text-[1.35rem] leading-relaxed text-ink" : ""}>
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Priorities */}
      <section aria-labelledby="priorities" className="border-b border-rule">
        <Container className="py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="priorities" eyebrow="02 · Where I would start" title="Three priorities" />
            <EvidenceBadge kind="proposed" className="mb-6" />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-xl border border-rule bg-rule lg:grid-cols-3">
            {priorities.map((p) => (
              <li key={p.n} className="flex flex-col bg-paper p-7">
                <span aria-hidden="true" className="font-serif text-5xl text-gold/80">
                  {p.n}
                </span>
                <h3 className="mt-4 text-2xl leading-snug text-ink">{p.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-2">{p.text}</p>
                <ul className="mt-5 space-y-1.5 border-t border-rule pt-4 text-sm">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Lifecycle */}
      <section aria-labelledby="lifecycle" className="border-b border-rule bg-ink text-paper">
        <Container className="py-16 lg:py-20">
          <p className="eyebrow !text-paper/60">03 · How the work connects</p>
          <h2 id="lifecycle" className="mt-2 max-w-3xl text-3xl leading-tight text-paper sm:text-[2.1rem]">
            One investment lifecycle, owned end to end
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-paper/75">
            Each stage hands evidence to the next. The diligence thesis becomes the monitoring plan, monitoring shapes value creation, and the exit route is considered at entry. Fundraising and team leadership support every stage.
          </p>
          <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-5 xl:grid-cols-10">
            {lifecycle.map((s, i) => {
              const w = byNumber(s.ws)!;
              return (
                <li key={s.label} className="relative">
                  <div aria-hidden="true" className="mb-3 flex items-center">
                    <span className="h-3 w-3 shrink-0 rounded-full border-2 border-gold bg-ink" />
                    {i < lifecycle.length - 1 ? <span className="h-px flex-1 bg-paper/25" /> : null}
                  </div>
                  <Link href={`/playbook/${w.slug}`} className="group block">
                    <span className="num-tab text-xs text-gold">WS {s.ws}</span>
                    <span className="mt-0.5 block font-serif text-lg leading-snug text-paper group-hover:underline">{s.label}</span>
                    <span className="mt-1 block text-[0.8rem] leading-snug text-paper/65">{s.detail}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 grid gap-3 border-t border-paper/15 pt-6 sm:grid-cols-2">
            {["10", "12"].map((n) => {
              const w = byNumber(n)!;
              return (
                <Link key={n} href={`/playbook/${w.slug}`} className="group flex items-baseline gap-3 rounded-lg border border-paper/15 px-4 py-3 hover:border-paper/50">
                  <span className="num-tab text-xs text-gold">WS {n}</span>
                  <span className="text-paper group-hover:underline">{w.title}</span>
                  <span className="ml-auto hidden text-xs text-paper/55 sm:inline">supports every stage</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Workstream navigation */}
      <section aria-labelledby="workstreams" className="border-b border-rule">
        <Container className="py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="workstreams" eyebrow="04 · The playbook" title="Twelve workstreams" />
            <Link href="/playbook" className="link mb-6 text-sm">
              Search all workstreams
            </Link>
          </div>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            {groups.map((g) => {
              const items = workstreams.filter((w) => w.category === g);
              return (
                <div key={g}>
                  <h3 className="eyebrow border-b border-ink pb-2 !text-ink">{categoryLabels[g]}</h3>
                  <ul className="divide-y divide-rule">
                    {items.map((w) => (
                      <li key={w.slug}>
                        <Link href={`/playbook/${w.slug}`} className="group grid grid-cols-[2.5rem_1fr] gap-3 py-3.5">
                          <span className="num-tab pt-0.5 font-serif text-gold">{w.number}</span>
                          <span>
                            <span className="block font-serif text-lg leading-snug text-ink group-hover:underline">{w.title}</span>
                            <span className="mt-0.5 block text-sm leading-snug text-ink-3">{w.tagline}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Leadership note + evidence */}
      <section aria-labelledby="candour">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow">05 · How to read this</p>
            <h2 id="candour" className="mt-2 text-3xl leading-tight text-ink">A plan to be held to, and its limits</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink-2">{leadershipNote}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/evidence" variant="secondary">
                Experience and evidence
              </ButtonLink>
              <ButtonLink href="/decision-lab" variant="secondary">
                Decision lab
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
