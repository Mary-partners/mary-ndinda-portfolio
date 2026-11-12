"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createCompany } from "@/app/actions/admin";
import { Loader2, Plus } from "lucide-react";

export function CompanyForm({ programmes }: { programmes: { id: string; name: string }[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!String(fd.get("legalName") ?? "").trim()) return;
    setPending(true);
    try {
      await createCompany(fd);
      setOpen(false);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (!open) return <button onClick={() => setOpen(true)} className="btn-primary"><Plus className="h-4 w-4" /> New enterprise</button>;

  return (
    <form onSubmit={submit} className="card w-full space-y-3 p-5 text-left">
      <h3 className="text-sm font-semibold text-navy-700">New enterprise (SME)</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="legalName" className="input" placeholder="Legal name" required />
        <input name="tradingName" className="input" placeholder="Trading name (optional)" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="country" className="input" placeholder="Country" />
        <input name="region" className="input" placeholder="Region / city" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="sector" className="input" placeholder="Sector" />
        <input name="subsector" className="input" placeholder="Sub-sector" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <select name="stage" defaultValue="" className="input">
          <option value="">Stage…</option><option>Micro</option><option>Small</option><option>Medium</option>
        </select>
        <input name="employees" type="number" min="0" className="input" placeholder="Employees" />
        <input name="yearEstablished" type="number" min="1900" className="input" placeholder="Year established" />
      </div>
      <input name="businessModel" className="input" placeholder="Business model" />
      {programmes.length > 0 && (
        <select name="programmeId" defaultValue="" className="input">
          <option value="">No programme / assign later</option>
          {programmes.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="founderName" className="input" placeholder="Founder / owner name" />
        <select name="founderObjectiveType" defaultValue="" className="input">
          <option value="">Founder objective…</option>
          <option>Survival</option><option>Income</option><option>Growth</option><option>Expansion</option><option>Investment</option>
        </select>
      </div>
      <textarea name="founderVision" className="input" placeholder="Founder's three-year vision (optional)" />
      <div className="flex gap-2">
        <button disabled={pending} className="btn-primary">{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save enterprise"}</button>
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
