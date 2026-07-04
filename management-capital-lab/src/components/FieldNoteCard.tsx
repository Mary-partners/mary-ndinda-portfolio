import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { FieldNote } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function FieldNoteCard({ note }: { note: FieldNote }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft transition-shadow hover:shadow-note">
      <div className="flex items-center justify-between gap-3">
        <Badge tone="forest">{note.category}</Badge>
        <span className="inline-flex items-center gap-1 text-xs text-navy-500">
          <Clock className="h-3.5 w-3.5" />
          {note.readingTime} min read
        </span>
      </div>
      <h3 className="mt-4 font-serif text-xl leading-snug text-navy-900">
        <Link
          href={`/field-notes/${note.slug}`}
          className="transition-colors hover:text-forest"
        >
          {note.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
        {note.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <time className="text-xs text-navy-500" dateTime={note.publishedAt}>
          {formatDate(note.publishedAt)}
        </time>
        <Link
          href={`/field-notes/${note.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-forest hover:text-forest-700"
        >
          Read note
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
