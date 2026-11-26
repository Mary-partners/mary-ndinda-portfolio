"use client";

import * as React from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { signIn } from "@/app/actions/session";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
    </button>
  );
}

export function SignInForm({ message }: { message?: string | null }) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
      <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
      <div className="p-6 sm:p-8">
      <h1 className="text-xl font-semibold text-navy-700">Welcome back</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Founders and programme teams: sign in with your email and password.</p>

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

      <div className="mt-6 border-t border-navy/10 pt-5 text-sm">
        <p className="font-medium text-navy-700">New to the Management Capital Index?</p>
        <Link
          href="/signup"
          className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gold/50 bg-gold/10 font-semibold text-navy-800 transition-colors hover:bg-gold/20"
        >
          Create your founder account <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-center text-xs text-ink-muted">
          Prefer not to create an account?{" "}
          <Link href="/start" className="font-medium text-gold-700 hover:underline">
            Take the diagnostic once
          </Link>
          .
        </p>
      </div>
      </div>
    </div>
  );
}
