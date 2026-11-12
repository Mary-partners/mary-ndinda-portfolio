"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { completeSetup } from "@/app/actions/session";
import { User, Mail, Lock, Eye, EyeOff, Loader2, Check, ArrowRight, AlertCircle } from "lucide-react";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-navy-700 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create account &amp; continue <ArrowRight className="h-4 w-4" /></>}
    </button>
  );
}

export function SetupForm({ error }: { error?: boolean }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwValid = password.length >= 8;
  const nameValid = name.trim().length > 1;
  const valid = nameValid && emailValid && pwValid;

  return (
    <div className="card p-6 sm:p-8">
      <h1 className="text-xl font-semibold text-navy-700">Create your administrator account</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        This is your personal login. You&apos;ll add your organisations — the funds, accelerators and programmes you
        support — once you&apos;re inside.
      </p>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-bad/20 bg-bad/5 px-3 py-2.5 text-sm text-bad">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Please check the form — a name, a valid email and a password of at least 8 characters are required.</span>
        </div>
      )}

      <form action={completeSetup} className="mt-5 space-y-4">
        <Field label="Full name">
          <User className="field-icon" />
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} className="auth-input" placeholder="e.g. Mary Ndinda" autoComplete="name" required />
          {nameValid && <Check className="field-ok" />}
        </Field>

        <Field label="Email">
          <Mail className="field-icon" />
          <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" placeholder="you@organisation.org" autoComplete="email" required />
          {emailValid && <Check className="field-ok" />}
        </Field>

        <Field label="Password">
          <Lock className="field-icon" />
          <input name="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" placeholder="At least 8 characters" autoComplete="new-password" minLength={8} required />
          <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-navy-700" aria-label={show ? "Hide password" : "Show password"}>
            {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
          </button>
        </Field>
        <PasswordMeter value={password} />

        <SubmitButton disabled={!valid} />
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-navy-700">{label}</span>
      <span className="relative block [&_.field-icon]:pointer-events-none [&_.field-icon]:absolute [&_.field-icon]:left-3 [&_.field-icon]:top-1/2 [&_.field-icon]:h-[18px] [&_.field-icon]:w-[18px] [&_.field-icon]:-translate-y-1/2 [&_.field-icon]:text-ink-muted [&_.field-ok]:absolute [&_.field-ok]:right-3 [&_.field-ok]:top-1/2 [&_.field-ok]:h-[18px] [&_.field-ok]:w-[18px] [&_.field-ok]:-translate-y-1/2 [&_.field-ok]:text-ok">
        {children}
      </span>
    </label>
  );
}

function PasswordMeter({ value }: { value: string }) {
  const score = Math.min(4, [value.length >= 8, /[A-Z]/.test(value), /[0-9]/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean).length);
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-bad", "bg-warn", "bg-gold-500", "bg-ok", "bg-ok"];
  const idx = value.length < 8 ? 0 : score;
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-1.5 flex-1 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-full flex-1 rounded-full transition-colors ${i < idx ? colors[idx] : "bg-navy/10"}`} />
        ))}
      </div>
      <span className="w-16 text-right text-[11px] text-ink-muted">{value ? labels[idx] : ""}</span>
    </div>
  );
}
