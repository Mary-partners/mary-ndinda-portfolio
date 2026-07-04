import { MapPin, Briefcase } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Contribution, NoteColor } from "@/lib/types";

const COLOR_MAP: Record<
  NoteColor,
  { bg: string; border: string; tab: string }
> = {
  yellow: { bg: "bg-note-yellow", border: "border-noteBorder-yellow", tab: "bg-noteBorder-yellow" },
  blue: { bg: "bg-note-blue", border: "border-noteBorder-blue", tab: "bg-noteBorder-blue" },
  green: { bg: "bg-note-green", border: "border-noteBorder-green", tab: "bg-noteBorder-green" },
  pink: { bg: "bg-note-pink", border: "border-noteBorder-pink", tab: "bg-noteBorder-pink" },
  cream: { bg: "bg-note-cream", border: "border-noteBorder-cream", tab: "bg-noteBorder-cream" },
  lavender: { bg: "bg-note-lavender", border: "border-noteBorder-lavender", tab: "bg-noteBorder-lavender" },
};

// Deterministic, subtle rotation based on id so the wall feels alive but stable.
const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.5deg]", "rotate-0"];
function rotationFor(id: string) {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return ROTATIONS[sum % ROTATIONS.length];
}

export function PostItCard({ note }: { note: Contribution }) {
  const color = COLOR_MAP[note.color] ?? COLOR_MAP.yellow;
  const displayName = note.isAnonymous ? "Anonymous" : note.name || "Anonymous";

  return (
    <article
      className={cn(
        "group relative flex break-inside-avoid flex-col rounded-md border p-5 shadow-note transition-all duration-300 hover:-translate-y-1 hover:shadow-note-hover",
        color.bg,
        color.border,
        rotationFor(note.id),
        "hover:rotate-0"
      )}
    >
      <span
        className={cn(
          "absolute -top-2 left-6 h-4 w-14 rounded-sm opacity-70",
          color.tab
        )}
        aria-hidden
      />
      {note.illustrative && (
        <span
          className="absolute right-3 top-3 rounded-full bg-navy/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-navy-500 ring-1 ring-inset ring-navy/10"
          title="A sample note added at launch to illustrate the wall."
        >
          Illustrative
        </span>
      )}
      <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-500">
        {note.prompt}
      </p>
      <p className="mt-3 font-serif text-[1.02rem] leading-snug text-navy-900">
        {note.content}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy-600">
        <span className="inline-flex items-center gap-1 font-medium text-navy-800">
          {note.role}
        </span>
        {note.country && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {note.country}
          </span>
        )}
        {note.sector && (
          <span className="inline-flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {note.sector}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-navy/10 pt-3 text-xs text-navy-500">
        <span className="font-medium text-navy-700">— {displayName}</span>
        <time dateTime={note.approvedAt ?? note.createdAt}>
          {formatDate(note.approvedAt ?? note.createdAt)}
        </time>
      </div>
    </article>
  );
}
