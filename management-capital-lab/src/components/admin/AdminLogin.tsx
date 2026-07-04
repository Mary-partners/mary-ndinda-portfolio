"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label, Input, FieldError } from "@/components/ui/field";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password. Please try again.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="container-lab flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-2xl border border-navy/10 bg-white p-8 shadow-note">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-navy text-cream">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-center font-serif text-2xl text-navy-900">
          Moderation Dashboard
        </h1>
        <p className="mt-1.5 text-center text-sm text-navy-500">
          Enter the admin password to continue.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="mt-1.5"
              aria-invalid={!!error}
            />
            <FieldError>{error}</FieldError>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
