"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createAdvisorySession } from "@/app/actions/implementation";
import { Loader2 } from "lucide-react";

export function SessionForm({ companies }: { companies: { id: string; name: string }[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [form, setForm] = React.useState({ companyId: companies[0]?.id ?? "", priorityProblem: "", observations: "", decisions: "", actions: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.companyId || !form.priorityProblem.trim()) return;
    setPending(true);
    try {
      await createAdvisorySession(form);
      setForm({ ...form, priorityProblem: "", observations: "", decisions: "", actions: "" });
      setOpen(false);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (!open) return <button onClick={() => setOpen(true)} className="btn-primary">Log advisory session</button>;

  return (
    <form onSubmit={submit} className="card w-full max-w-xl space-y-3 p-5">
      <h3 className="text-sm font-semibold text-navy-700">Log advisory session</h3>
      <select value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })} className="input">
        {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input className="input" placeholder="Priority management problem" value={form.priorityProblem} onChange={(e) => setForm({ ...form, priorityProblem: e.target.value })} />
      <textarea className="input" placeholder="Observations" value={form.observations} onChange={(e) => setForm({ ...form, observations: e.target.value })} />
      <textarea className="input" placeholder="Decisions taken" value={form.decisions} onChange={(e) => setForm({ ...form, decisions: e.target.value })} />
      <textarea className="input" placeholder="Actions agreed" value={form.actions} onChange={(e) => setForm({ ...form, actions: e.target.value })} />
      <div className="flex gap-2">
        <button disabled={pending} className="btn-primary">{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save session"}</button>
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
