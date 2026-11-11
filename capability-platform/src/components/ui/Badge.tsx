import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "navy" | "gold" | "ok" | "warn" | "bad" | "info";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-navy/5 text-navy-600 ring-navy/10",
    navy: "bg-navy-700 text-white ring-navy-700",
    gold: "bg-gold/15 text-gold-700 ring-gold/25",
    ok: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    warn: "bg-amber-50 text-amber-700 ring-amber-200",
    bad: "bg-red-50 text-red-700 ring-red-200",
    info: "bg-sky-50 text-sky-700 ring-sky-200",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", tones[tone], className)}>
      {children}
    </span>
  );
}

const STATUS_TONE: Record<string, "neutral" | "ok" | "warn" | "bad" | "info"> = {
  "Not started": "neutral",
  "In progress": "info",
  "Awaiting company action": "warn",
  "Awaiting advisor review": "warn",
  "Evidence submitted": "info",
  "Changes requested": "warn",
  "More info required": "warn",
  "Under review": "info",
  Submitted: "info",
  Verified: "ok",
  Rejected: "bad",
  Blocked: "bad",
  Superseded: "neutral",
  Active: "ok",
  Closed: "neutral",
  Planned: "info",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={STATUS_TONE[status] ?? "neutral"}>{status}</Badge>;
}
