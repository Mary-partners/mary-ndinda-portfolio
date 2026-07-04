import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { FIELD_NOTES, getFieldNote } from "@/lib/data/field-notes";

export function generateStaticParams() {
  return FIELD_NOTES.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return { title: "Field Note" };
  return {
    title: note.title,
    description: note.excerpt,
    openGraph: { title: note.title, description: note.excerpt, type: "article" },
  };
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();

  const more = FIELD_NOTES.filter((n) => n.slug !== note.slug).slice(0, 2);

  return (
    <article className="pb-20">
      <header className="wall-backdrop border-b border-navy/10 bg-cream-50">
        <div className="container-lab py-14 sm:py-16">
          <Link
            href="/field-notes"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900"
          >
            <ArrowLeft className="h-4 w-4" /> All field notes
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="forest">{note.category}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-navy-500">
              <Clock className="h-3.5 w-3.5" /> {note.readingTime} min read
            </span>
            <span className="text-xs text-navy-500">
              {formatDate(note.publishedAt)}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-navy-900 sm:text-5xl">
            {note.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-700">
            {note.excerpt}
          </p>
        </div>
      </header>

      <div className="container-lab grid gap-12 py-14 lg:grid-cols-[1fr_16rem]">
        <div className="prose-lab max-w-2xl">
          {note.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <div className="mt-10 flex flex-wrap gap-2 border-t border-navy/10 pt-6">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cream-100 px-3 py-1 text-xs text-navy-600 ring-1 ring-inset ring-navy/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-forest/20 bg-forest/5 p-6">
            <p className="font-serif text-lg text-navy-900">
              Have a perspective on this?
            </p>
            <p className="mt-1.5 text-sm text-navy-600">
              Add your voice to the research wall.
            </p>
            <ButtonLink href="/contribute" variant="secondary" className="mt-4">
              Leave a Post-It
            </ButtonLink>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
            More field notes
          </h2>
          <ul className="mt-4 space-y-4">
            {more.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/field-notes/${m.slug}`}
                  className="group block rounded-xl border border-navy/10 bg-white p-4 shadow-soft"
                >
                  <p className="font-serif text-[15px] leading-snug text-navy-900 group-hover:text-forest">
                    {m.title}
                  </p>
                  <p className="mt-1 text-xs text-navy-500">
                    {m.readingTime} min read
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
