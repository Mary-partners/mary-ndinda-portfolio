import { requireUser, assertCompanyAccess } from "@/lib/auth";
import { getCompanyDetail } from "@/lib/company";
import { buildCompanyReportPdf } from "@/lib/pdf-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let user;
  try {
    user = await requireUser();
    await assertCompanyAccess(id, user);
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const detail = await getCompanyDetail(id);
  if (!detail) return new Response("Not found", { status: 404 });

  const orgName = user.memberships.find((m) => m.orgId === user.activeOrgId)?.orgName ?? "Management Capital Lab";
  const bytes = await buildCompanyReportPdf(detail, orgName);
  const name = (detail.company.tradingName || detail.company.legalName).replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-+|-+$/g, "");

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name || "enterprise"}-diagnostic-report.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
