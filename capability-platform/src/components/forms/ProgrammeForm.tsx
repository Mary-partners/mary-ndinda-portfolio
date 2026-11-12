"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createProgramme } from "@/app/actions/admin";
import { Loader2, Plus } from "lucide-react";

export function ProgrammeForm() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!String(fd.get("name") ?? "").trim()) return;
    setPending(true);
    try {
      await createProgramme(fd);
      setOpen(false);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (!open) return <button onClick={() => setOpen(true)} className="btn-primary"><Plus className="h-4 w-4" /> New programme</button>;

  return (
    <form onSubmit={submit} className="card w-full space-y-3 p-5">
      <h3 className="text-sm font-semibold text-navy-700">New programme</h3>
      <input name="name" className="input" placeholder="Programme name" required />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="fundingPartner" className="input" placeholder="Funding partner" />
        <select name="status" defaultValue="Active" className="input">
          <option>Active</option><option>Planned</option><option>Closed</option>
        </select>
      </div>
      <textarea name="objectives" className="input" placeholder="Objectives" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="sectorCoverage" className="input" placeholder="Sector coverage" />
        <input name="geography" className="input" placeholder="Geography" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <input name="targetEnterprises" type="number" min="0" className="input" placeholder="Target enterprises" />
        <input name="budget" type="number" min="0" className="input" placeholder="Budget" />
        <input name="reportingCadence" className="input" placeholder="Cadence (e.g. Quarterly)" />
      </div>
      <div className="flex gap-2">
        <button disabled={pending} className="btn-primary">{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save programme"}</button>
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
