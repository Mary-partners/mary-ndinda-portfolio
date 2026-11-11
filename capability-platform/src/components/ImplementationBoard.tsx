"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MILESTONE_STATUSES } from "@/lib/constants";
import { updateMilestoneStatus } from "@/app/actions/implementation";
import { fmtDate, cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface BoardItem {
  id: string;
  title: string;
  status: string;
  planTitle: string;
  companyName: string;
  companyId: string;
  dueDate: string | null;
  overdue: boolean;
}

const COLUMN_TONE: Record<string, string> = {
  "Not started": "border-navy/15",
  "In progress": "border-sky-300",
  "Evidence submitted": "border-amber-300",
  Verified: "border-emerald-300",
  Rejected: "border-red-300",
};

export function ImplementationBoard({ items, canEdit }: { items: BoardItem[]; canEdit: boolean }) {
  const router = useRouter();
  const [pending, setPending] = React.useState<string | null>(null);
  const [local, setLocal] = React.useState(items);

  React.useEffect(() => setLocal(items), [items]);

  async function change(id: string, status: string) {
    setPending(id);
    setLocal((arr) => arr.map((it) => (it.id === id ? { ...it, status } : it)));
    try {
      await updateMilestoneStatus(id, status);
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="grid gap-3 overflow-x-auto md:grid-cols-5">
      {MILESTONE_STATUSES.map((col) => {
        const colItems = local.filter((i) => i.status === col);
        return (
          <div key={col} className="min-w-[220px]">
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{col}</h3>
              <span className="rounded-full bg-navy/5 px-2 text-xs text-ink-muted">{colItems.length}</span>
            </div>
            <div className="space-y-2">
              {colItems.map((it) => (
                <div key={it.id} className={cn("rounded-lg border bg-white p-3 shadow-sm", COLUMN_TONE[col])}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-navy-700">{it.title}</p>
                    {pending === it.id && <Loader2 className="h-3.5 w-3.5 animate-spin text-navy-400" />}
                  </div>
                  <Link href={`/portfolio/${it.companyId}`} className="mt-1 block text-xs text-gold-700 hover:underline">{it.companyName}</Link>
                  <p className="text-[11px] text-ink-muted">{it.planTitle}</p>
                  {it.dueDate && (
                    <p className={cn("mt-1 text-[11px]", it.overdue && !["Verified", "Rejected"].includes(it.status) ? "text-red-600" : "text-ink-muted")}>
                      Due {fmtDate(it.dueDate)}{it.overdue && !["Verified", "Rejected"].includes(it.status) ? " · overdue" : ""}
                    </p>
                  )}
                  {canEdit && (
                    <select
                      value={it.status}
                      onChange={(e) => change(it.id, e.target.value)}
                      className="mt-2 w-full rounded-md border border-navy/15 bg-white px-2 py-1 text-xs text-navy-600"
                    >
                      {MILESTONE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  )}
                </div>
              ))}
              {colItems.length === 0 && <div className="rounded-lg border border-dashed border-navy/15 py-6 text-center text-xs text-ink-muted/60">—</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
