"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/admin";
import { ROLE_LABELS } from "@/lib/constants";
import { Loader2, UserPlus } from "lucide-react";

const ROLE_ORDER = ["PROGRAM_MANAGER", "ADVISOR", "REVIEWER", "FOUNDER", "ADMIN"];

export function UserForm() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!String(fd.get("email") ?? "").trim() || String(fd.get("password") ?? "").length < 8) return;
    setPending(true);
    try {
      await createUser(fd);
      setOpen(false);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (!open) return <button onClick={() => setOpen(true)} className="btn-ghost"><UserPlus className="h-4 w-4" /> Add team member</button>;

  return (
    <form onSubmit={submit} className="card w-full space-y-3 p-5 text-left">
      <h3 className="text-sm font-semibold text-navy-700">Add team member</h3>
      <p className="text-xs text-ink-muted">They are added to your current organisation. Share the password with them securely; they can use it to sign in.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" className="input" placeholder="Full name" required />
        <input name="email" type="email" className="input" placeholder="Email" required />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="title" className="input" placeholder="Title (optional)" />
        <select name="role" defaultValue="ADVISOR" className="input">
          {ROLE_ORDER.map((r) => <option key={r} value={r}>{ROLE_LABELS[r] ?? r}</option>)}
        </select>
      </div>
      <input name="password" type="password" minLength={8} className="input" placeholder="Temporary password (min 8 characters)" required />
      <div className="flex gap-2">
        <button disabled={pending} className="btn-primary">{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add member"}</button>
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
