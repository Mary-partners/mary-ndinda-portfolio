import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { completeSetup } from "@/app/actions/session";
import { Gauge } from "lucide-react";

export const dynamic = "force-dynamic";

const ORG_TYPES = ["Fund / DFI", "Accelerator", "Enterprise Support Organisation", "Incubator", "Foundation", "Government programme", "Other"];

export default async function SetupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const count = await prisma.user.count();
  if (count > 0) redirect("/login");

  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-700 px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center text-white">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gold text-navy-900">
            <Gauge className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Welcome — let's set up your workspace</h1>
          <p className="text-sm text-white/70">Create your administrator account and your organisation. You can invite your team afterwards.</p>
        </div>
        <div className="card p-6">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Please check the form — a name, a valid email, a password of at least 8 characters and an organisation name are required.
            </div>
          )}
          <form action={completeSetup} className="space-y-4">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Your administrator account</h2>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <input name="name" required className="input" placeholder="Your full name" />
                <input name="email" type="email" required className="input" placeholder="Your email" />
              </div>
              <input name="password" type="password" required minLength={8} className="input mt-3" placeholder="Choose a password (min 8 characters)" />
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Your organisation</h2>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <input name="orgName" required className="input" placeholder="Organisation name (e.g. your fund)" />
                <select name="orgType" defaultValue={ORG_TYPES[0]} className="input">
                  {ORG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <input name="country" className="input mt-3" placeholder="Country / region" />
            </div>
            <button className="btn-primary w-full">Create workspace &amp; sign in</button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-white/50">This one-time setup is only available until the first account exists.</p>
      </div>
    </div>
  );
}
