import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCompanyDetail } from "@/lib/company";
import { fmtScore, maturityBand } from "@/lib/utils";
import { Gauge, Download, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AssessDonePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const company = await prisma.company.findUnique({ where: { inviteToken: token }, select: { id: true, legalName: true, tradingName: true, org: { select: { name: true } } } });
  if (!company) notFound();
  const detail = await getCompanyDetail(company.id);
  const latest = detail?.latest ?? null;
  const band = maturityBand(latest?.overallScore);
  const name = company.tradingName || company.legalName;

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-800 px-5 py-10" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-2.5 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-navy-900"><Gauge className="h-5 w-5" /></span>
          <div className="leading-tight"><div className="text-sm font-semibold">Management Capital Lab</div><div className="text-[11px] text-white/55">Invited by {company.org.name}</div></div>
        </div>
        <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
          <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold to-gold-600" />
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-5 w-5" /><span className="text-sm font-semibold">Assessment submitted</span></div>
            <h1 className="mt-3 text-xl font-semibold text-navy-700">Thank you — your report is ready</h1>
            <p className="mt-1.5 text-sm text-ink-muted">You&apos;ve completed the management capability check for {name}. Here&apos;s your result, and a full PDF report to download.</p>

            <div className="mt-5 rounded-xl border border-navy/10 bg-surface-muted p-4">
              <div className="text-xs text-ink-muted">Overall management maturity</div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-gold-700">{fmtScore(latest?.overallScore)}</span>
                <span className="text-sm font-medium text-navy-700">{band.label}</span>
                <span className="text-xs text-ink-muted">of 4.0</span>
              </div>
            </div>

            <a href={`/api/report/assess/${token}`} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-navy-700 text-sm font-semibold text-white transition-colors hover:bg-navy-800">
              <Download className="h-4 w-4" /> Download my PDF report
            </a>
            <p className="mt-4 text-xs text-ink-muted">Your answers are self-reported. {company.org.name} may follow up to verify evidence and support your improvement plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
