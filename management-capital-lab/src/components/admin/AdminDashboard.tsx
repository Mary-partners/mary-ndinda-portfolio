"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  Trash2,
  Pencil,
  Download,
  LogOut,
  Save,
  MessageSquare,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/field";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";
import { useToast } from "@/components/ui/toast";
import { formatDate, cn } from "@/lib/utils";
import type { Contribution, CollaborationLead, ContributionStatus } from "@/lib/types";

type Tab = "contributions" | "leads";
type StatusFilter = "all" | ContributionStatus;

export function AdminDashboard({
  initialContributions,
  initialLeads,
}: {
  initialContributions: Contribution[];
  initialLeads: CollaborationLead[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [tab, setTab] = React.useState<Tab>("contributions");
  const [items, setItems] = React.useState<Contribution[]>(initialContributions);
  const [filter, setFilter] = React.useState<StatusFilter>("all");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState("");

  const counts = React.useMemo(
    () => ({
      all: items.length,
      pending: items.filter((c) => c.status === "pending").length,
      approved: items.filter((c) => c.status === "approved").length,
      rejected: items.filter((c) => c.status === "rejected").length,
    }),
    [items]
  );

  const visible = React.useMemo(
    () => (filter === "all" ? items : items.filter((c) => c.status === filter)),
    [items, filter]
  );

  async function setStatus(id: string, status: ContributionStatus) {
    const res = await fetch("/api/admin/contributions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      toast("Update failed.", "error");
      return;
    }
    const { contribution } = await res.json();
    setItems((prev) => prev.map((c) => (c.id === id ? contribution : c)));
    toast(`Contribution ${status}.`, "success");
  }

  async function saveEdit(id: string) {
    const res = await fetch("/api/admin/contributions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, content: draft }),
    });
    if (!res.ok) {
      toast("Update failed.", "error");
      return;
    }
    const { contribution } = await res.json();
    setItems((prev) => prev.map((c) => (c.id === id ? contribution : c)));
    setEditingId(null);
    toast("Contribution updated.", "success");
  }

  async function remove(id: string) {
    if (!confirm("Delete this contribution permanently?")) return;
    const res = await fetch(`/api/admin/contributions?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast("Delete failed.", "error");
      return;
    }
    setItems((prev) => prev.filter((c) => c.id !== id));
    toast("Contribution deleted.", "success");
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="container-lab py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-navy-900">
            Moderation Dashboard
          </h1>
          <p className="mt-1 text-sm text-navy-500">
            Review contributions and manage collaboration leads.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-navy/10">
        {[
          { id: "contributions" as Tab, label: "Post-It Contributions", icon: StickyNote, count: items.length },
          { id: "leads" as Tab, label: "Collaboration Leads", icon: MessageSquare, count: initialLeads.length },
        ].map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              tab === id
                ? "border-navy text-navy-900"
                : "border-transparent text-navy-500 hover:text-navy-800"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
            <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>

      {tab === "contributions" ? (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs font-medium capitalize transition-colors",
                      filter === f
                        ? "border-navy bg-navy text-cream"
                        : "border-navy/15 bg-white text-navy-600 hover:border-navy/30"
                    )}
                  >
                    {f} ({counts[f]})
                  </button>
                )
              )}
            </div>
            <a
              href="/api/admin/export?type=contributions"
              className="inline-flex items-center gap-1.5 rounded-full border border-navy/20 px-4 py-2 text-xs font-medium text-navy-700 hover:bg-navy/5"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </a>
          </div>

          {visible.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="Nothing here"
                description="No contributions match this filter."
              />
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {visible.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-navy/10 bg-white p-5 shadow-soft"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                      {c.prompt}
                    </p>
                    <StatusBadge status={c.status} />
                  </div>

                  {editingId === c.id ? (
                    <div className="mt-3">
                      <Textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className="text-sm"
                      />
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" onClick={() => saveEdit(c.id)}>
                          <Save className="h-3.5 w-3.5" /> Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 font-serif text-[15px] leading-snug text-navy-900">
                      {c.content}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy-500">
                    <span className="font-medium text-navy-700">
                      {c.isAnonymous ? "Anonymous" : c.name}
                    </span>
                    <span>· {c.role}</span>
                    {c.country && <span>· {c.country}</span>}
                    {c.sector && <span>· {c.sector}</span>}
                    <span>· {formatDate(c.createdAt)}</span>
                    {c.email && <span>· {c.email}</span>}
                  </div>

                  {c.themes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.themes.map((t) => (
                        <Badge key={t} tone="neutral">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-navy/10 pt-4">
                    {c.status !== "approved" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setStatus(c.id, "approved")}
                      >
                        <Check className="h-3.5 w-3.5" /> Approve
                      </Button>
                    )}
                    {c.status !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setStatus(c.id, "rejected")}
                      >
                        <X className="h-3.5 w-3.5" /> Reject
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(c.id);
                        setDraft(c.content);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => remove(c.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <div className="flex justify-end">
            <a
              href="/api/admin/export?type=leads"
              className="inline-flex items-center gap-1.5 rounded-full border border-navy/20 px-4 py-2 text-xs font-medium text-navy-700 hover:bg-navy/5"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </a>
          </div>
          {initialLeads.length === 0 ? (
            <div className="mt-5">
              <EmptyState
                title="No collaboration leads yet"
                description="Interest submitted via the Collaborate page will appear here."
              />
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {initialLeads.map((l) => (
                <div
                  key={l.id}
                  className="rounded-2xl border border-navy/10 bg-white p-5 shadow-soft"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-lg text-navy-900">{l.name}</h3>
                    <Badge tone="gold">{l.collaborationType}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy-500">
                    <a
                      href={`mailto:${l.email}`}
                      className="font-medium text-forest hover:underline"
                    >
                      {l.email}
                    </a>
                    {l.organisation && <span>· {l.organisation}</span>}
                    {l.role && <span>· {l.role}</span>}
                    {l.country && <span>· {l.country}</span>}
                    <span>· {formatDate(l.createdAt)}</span>
                  </div>
                  {l.message && (
                    <p className="mt-3 text-sm leading-relaxed text-navy-700">
                      {l.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
