"use client";

import * as React from "react";
import { createInviteLink } from "@/app/actions/admin";
import { Link2, Copy, Check, Loader2, ExternalLink } from "lucide-react";

export function InviteLink({ companyId, existingToken }: { companyId: string; existingToken: string | null }) {
  const [token, setToken] = React.useState<string | null>(existingToken);
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const url = token ? `${typeof window !== "undefined" ? window.location.origin : ""}/assess/${token}` : "";

  async function create() {
    setPending(true);
    try {
      const t = await createInviteLink(companyId);
      setToken(t);
      setOpen(true);
    } finally {
      setPending(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the field is selectable as a fallback */
    }
  }

  if (!token) {
    return (
      <button onClick={create} disabled={pending} className="btn-outline">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />} Invite to self-assess
      </button>
    );
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-outline"><Link2 className="h-4 w-4" /> Self-assessment link</button>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <input readOnly value={url} onFocus={(e) => e.currentTarget.select()} className="input flex-1 font-mono text-xs" />
        <button onClick={copy} className="btn-primary shrink-0">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}</button>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0" title="Open link"><ExternalLink className="h-4 w-4" /></a>
      </div>
      <p className="mt-1.5 text-xs text-ink-muted">Send this link to the business owner. Anyone with it can complete the self-assessment and download their report — no account needed.</p>
    </div>
  );
}
