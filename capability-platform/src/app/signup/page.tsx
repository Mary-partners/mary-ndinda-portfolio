import { AuthShell } from "@/components/auth/AuthShell";
import { founderSignup } from "@/app/actions/self-assess";
import { ArrowRight, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const msg = error === "exists" ? "An account with that email already exists. Please sign in instead." : error ? "Please complete all fields, with a password of at least 8 characters." : null;

  return (
    <AuthShell footnote="Your answers are self-reported and confidential.">
      <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
        <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
        <div className="p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-navy-700">Create your founder account</h1>
          <p className="mt-1.5 text-sm text-ink-muted">Register your business and you will land on your own dashboard. From there you start the Management Capital diagnostic, view your results, and return any time to reassess.</p>
          {msg && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-bad/20 bg-bad/5 px-3 py-2.5 text-sm text-bad">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><span>{msg}</span>
            </div>
          )}
          <form action={founderSignup} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="name">Your name</label>
                <input id="name" name="name" required className="input" placeholder="e.g. Mary Ndinda" autoComplete="name" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required className="input" placeholder="you@business.com" autoComplete="email" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required minLength={8} className="input" placeholder="At least 8 characters" autoComplete="new-password" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="business">Business name</label>
              <input id="business" name="business" required className="input" placeholder="Your business name" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="country">Country</label>
                <input id="country" name="country" className="input" placeholder="e.g. Kenya" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy-700" htmlFor="sector">Sector</label>
                <input id="sector" name="sector" className="input" placeholder="e.g. Agri-processing" />
              </div>
            </div>
            <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold text-sm font-semibold text-navy-900 shadow-sm transition-colors hover:bg-gold-600 hover:text-white">
              Create my account <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-ink-muted">Already have an account? <a href="/platform/login" className="font-medium text-gold-700 hover:underline">Sign in</a></p>
        </div>
      </div>
    </AuthShell>
  );
}
