import { prisma } from "@/lib/prisma";
import { getCompanyDetail } from "@/lib/company";
import { buildCompanyReportPdf } from "@/lib/pdf-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public, token-gated report download for the self-assessment link holder.
export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const company = await prisma.company.findUnique({ where: { inviteToken: token }, select: { id: true, org: { select: { name: true } } } });
  if (!company) return new Response("Not found", { status: 404 });

  const detail = await getCompanyDetail(company.id);
  if (!detail) return new Response("Not found", { status: 404 });

  const bytes = await buildCompanyReportPdf(detail, company.org.name);
  const name = (detail.company.tradingName || detail.company.legalName).replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-+|-+$/g, "");

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name || "enterprise"}-capability-report.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
