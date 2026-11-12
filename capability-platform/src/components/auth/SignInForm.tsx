"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "@/app/actions/session";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-navy-700 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
    </button>
  );
}

export function SignInForm({ message }: { message?: string | null }) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="card p-6 sm:p-8">
      <h1 className="text-xl font-semibold text-navy-700">Welcome back</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Sign in with the email and password from your administrator.</p>

      {message && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-bad/20 bg-bad/5 px-3 py-2.5 text-sm text-bad">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form action={signIn} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-navy-700">Email</span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-muted" />
            <input name="email" type="email" className="auth-input" placeholder="you@organisation.org" autoComplete="email" required />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-navy-700">Password</span>
          <span className="relative block">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-muted" />
            <input name="password" type={show ? "text" : "password"} className="auth-input" placeholder="Your password" autoComplete="current-password" required />
            <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-navy-700" aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </span>
        </label>

        <SubmitButton />
      </form>
    </div>
  );
}
