import Link from "next/link";
import { Check, Loader2, DoorOpen, Circle, Send, ArrowRight } from "lucide-react";
import type { ResearchPhase } from "@/lib/types";
import { PhaseStatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

function Marker({ status }: { status: ResearchPhase["status"] }) {
  const styles = {
    Completed: "bg-emerald-500 text-white border-emerald-500",
    Submitted: "bg-white text-emerald-600 border-emerald-500",
    "In Progress": "bg-gold text-navy-900 border-gold",
    Open: "bg-forest text-cream border-forest",
    Upcoming: "bg-white text-navy-300 border-navy/20",
  }[status];
  const Icon = {
    Completed: Check,
    Submitted: Send,
    "In Progress": Loader2,
    Open: DoorOpen,
    Upcoming: Circle,
  }[status];
  return (
    <span
      className={cn(
        "relative z-10 grid h-9 w-9 place-items-center rounded-full border-2 shadow-sm",
        styles
      )}
    >
      <Icon
        className={cn("h-4 w-4", status === "In Progress" && "animate-spin")}
      />
    </span>
  );
}

export function ResearchPhaseTimeline({
  phases,
}: {
  phases: ResearchPhase[];
}) {
  const ordered = [...phases].sort((a, b) => a.order - b.order);
  return (
    <ol className="relative">
      <span
        className="absolute left-[17px] top-2 bottom-2 w-px bg-navy/15"
        aria-hidden
      />
      {ordered.map((phase) => (
        <li key={phase.id} className="relative flex gap-5 pb-8 last:pb-0">
          <Marker status={phase.status} />
          <div className="flex-1 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-lg text-navy-900">
                <span className="text-gold-600">Phase {phase.phase}.</span>{" "}
                {phase.title}
              </h3>
              <PhaseStatusBadge status={phase.status} />
            </div>
            {phase.milestone && (
              <p className="mt-1 text-xs font-medium text-navy-500">
                {phase.milestone}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              {phase.description}
            </p>
            {phase.href && (
              <Link
                href={phase.href}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-700"
              >
                Read what it found
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
