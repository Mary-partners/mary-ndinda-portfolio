import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signIn } from "@/app/actions/session";
import { Gauge } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const existing = await getCurrentUser();
  if (existing) redirect("/overview");

  const userCount = await prisma.user.count();
  if (userCount === 0) redirect("/setup");

  const { error } = await searchParams;
  const message = error === "invalid" ? "Incorrect email or password." : error ? "Please enter your email and password." : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-700 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center text-white">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gold text-navy-900">
            <Gauge className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Management Capital Lab</h1>
          <p className="text-sm text-white/70">Enterprise Capability Intelligence</p>
        </div>
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-navy-700">Sign in</h2>
          <p className="mt-1 mb-4 text-sm text-ink-muted">Use the email and password provided by your administrator.</p>
          {message && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{message}</div>
          )}
          <form action={signIn} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-navy-700" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="input" placeholder="you@organisation.org" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-navy-700" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="input" placeholder="••••••••" />
            </div>
            <button className="btn-primary w-full">Sign in</button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-white/50">Capability intelligence for African SME support programmes</p>
      </div>
    </div>
  );
}
