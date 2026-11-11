import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROLE_LABELS } from "@/lib/constants";
import { loginAs } from "@/app/actions/session";
import { Gauge } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const existing = await getCurrentUser();
  if (existing) redirect("/overview");

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-700 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center text-white">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gold text-navy-900">
            <Gauge className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Management Capital Lab</h1>
          <p className="text-sm text-white/70">Enterprise Capability Intelligence · Demo access</p>
        </div>
        <div className="card p-6">
          <p className="mb-4 text-sm text-ink-muted">
            Choose a demo user to sign in. Each role sees a different, permission-aware view of the same
            seeded African SME portfolio. All data is fictional (demo).
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {users.map((u) => (
              <form key={u.id} action={loginAs.bind(null, u.id)}>
                <button className="w-full rounded-lg border border-navy/15 bg-white p-4 text-left transition-colors hover:border-navy-500 hover:bg-surface-muted">
                  <div className="font-medium text-navy-700">{u.name}</div>
                  <div className="text-xs text-ink-muted">{ROLE_LABELS[u.role] ?? u.role}</div>
                  <div className="mt-1 text-xs text-gold-700">{u.email}</div>
                </button>
              </form>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-white/50">
          Demo build · SQLite · no real company data
        </p>
      </div>
    </div>
  );
}
