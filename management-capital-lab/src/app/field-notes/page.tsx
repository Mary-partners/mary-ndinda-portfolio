import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FieldNoteCard } from "@/components/FieldNoteCard";
import { FIELD_NOTES } from "@/lib/data/field-notes";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Research reflections from the Management Capital Lab on SME finance, investment readiness, capital absorption, and sustainable growth.",
};

export default function FieldNotesPage() {
  const notes = [...FIELD_NOTES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <PageHeader
        eyebrow="Field Notes"
        title="Reflections from the research"
        intro="Short, evolving notes on what the evidence and the ecosystem keep pointing to: that management capital, not capital alone, may decide whether African SMEs grow."
      />
      <div className="container-lab py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <FieldNoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </>
  );
}
