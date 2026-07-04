"use client";

import * as React from "react";
import { Mail, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";

export function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "done">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Please enter a valid email address.", "error");
      return;
    }
    setState("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter subscriber",
          email,
          collaborationType: "Newsletter signup",
          message: "Requested monthly research notes.",
          consentToContact: true,
        }),
      });
      setState("done");
      toast("You're on the list. Thank you!", "success");
    } catch {
      setState("idle");
      toast("Something went wrong. Please try again.", "error");
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        <Check className="h-5 w-5 text-emerald-600" />
        You&apos;re subscribed to monthly research notes.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="pl-9"
        />
      </div>
      <Button type="submit" variant="secondary" disabled={state === "loading"}>
        {state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
