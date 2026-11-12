"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createOrganisation } from "@/app/actions/admin";
import { Loader2, Plus } from "lucide-react";

const ORG_TYPES = ["Fund / DFI", "Accelerator", "Enterprise Support Organisation", "Incubator", "Foundation", "Government programme", "Other"];

export function OrgForm() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!String(fd.get("name") ?? "").trim()) return;
    setPending(true);
    try {
      await createOrganisation(fd);
      setOpen(false);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (!open) return <button onClick={() => setOpen(true)} className="btn-ghost"><Plus className="h-4 w-4" /> New organisation</button>;

  return (
    <form onSubmit={submit} className="card w-full space-y-3 p-5 text-left">
      <h3 className="text-sm font-semibold text-navy-700">New organisation</h3>
      <p className="text-xs text-ink-muted">Creates a separate, tenant-isolated workspace. Switch between organisations from the selector at the top right.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" className="input" placeholder="Organisation name" required />
        <select name="type" defaultValue={ORG_TYPES[0]} className="input">
          {ORG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <input name="country" className="input" placeholder="Country / region" />
      <textarea name="description" className="input" placeholder="Description (optional)" />
      <div className="flex gap-2">
        <button disabled={pending} className="btn-primary">{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create organisation"}</button>
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
