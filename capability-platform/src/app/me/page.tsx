import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getCompanyDetail } from "@/lib/company";
import { signOut } from "@/app/actions/session";
import { fmtIndex, maturityBand } from "@/lib/utils";
import { BASE_PATH } from "@/lib/constants";
import { Gauge, Download, RefreshCw, LogOut, ClipboardCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FounderHome() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const company = await prisma.company.findFirst({ where: { ownerUserId: user.id }, orderBy: { createdAt: "desc" }, select: { id: true } });
  const detail = company ? await getCompanyDetail(company.id) : null;
  const band = maturityBand(detail?.latest?.overallScore);
  const token = detail ? (await prisma.company.findUnique({ where: { id: detail.company.id }, select: { inviteToken: true } }))?.inviteToken : null;

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-navy-800 text-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-navy-900"><Gauge className="h-5 w-5" /></span>
            <div className="leading-tight"><div className="text-sm font-semibold">Management Capital Lab</div><div className="text-[11px] text-white/55">{user.name}</div></div>
          </div>
          <form action={signOut}><button className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" /> Sign out</button></form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
        {!detail || !detail.latest ? (
          <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
            <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
            <div className="p-6 sm:p-8 text-center">
              <h1 className="text-xl font-semibold text-navy-700">Welcome{detail ? `, ${detail.company.tradingName}` : ""}</h1>
              <p className="mt-1.5 text-sm text-ink-muted">You haven&apos;t completed your Management Capital diagnostic yet.</p>
              {token && <a href={`${BASE_PATH}/assess/${token}`} className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 hover:bg-gold-600 hover:text-white"><ClipboardCheck className="h-4 w-4" /> Start the diagnostic</a>}
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
              <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
              <div className="p-6 sm:p-8">
                <div className="text-xs uppercase tracking-wide text-ink-muted">{detail.company.tradingName ?? detail.company.legalName}</div>
                <h1 className="mt-1 text-xl font-semibold text-navy-700">Your Management Capital Index</h1>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-gold-700">{fmtIndex(detail.latest.overallScore)}</span>
                  <span className="text-sm text-ink-muted">/ 100</span>
                  <span className="text-sm font-medium text-navy-700">{band.label}</span>
                </div>
                <div className="mt-5 space-y-2.5">
                  {detail.dimRows.map((d) => (
                    <div key={d.key} className="flex items-center gap-3">
                      <div className="w-44 shrink-0 text-sm text-navy-700">{d.name}</div>
                      <div className="h-2 flex-1 rounded-full bg-navy/10"><div className="h-2 rounded-full bg-gold" style={{ width: `${fmtIndex(d.current) === "n/a" ? 0 : fmtIndex(d.current)}%` }} /></div>
                      <div className="w-10 text-right text-sm font-medium text-navy-700">{fmtIndex(d.current)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a href={`${BASE_PATH}/api/report/company/${detail.company.id}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-navy-700 px-5 text-sm font-semibold text-white hover:bg-navy-800"><Download className="h-4 w-4" /> Download PDF report</a>
                  {token && <a href={`${BASE_PATH}/assess/${token}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-navy/20 px-5 text-sm font-semibold text-navy-700 hover:bg-surface-muted"><RefreshCw className="h-4 w-4" /> Retake the diagnostic</a>}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-muted">Your answers are self-reported. Retaking the diagnostic records a new result so you can track progress over time.</p>
          </>
        )}
      </main>
    </div>
  );
}
