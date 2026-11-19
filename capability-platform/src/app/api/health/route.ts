import { NextResponse } from "next/server";
import { DIMENSION_META } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Diagnostic endpoint (token-protected). Reports whether the database is
// reachable and, if not, the exact error — without ever revealing the password.
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const raw = process.env.DATABASE_URL ?? "";
  let protocol: string | null = null;
  let user: string | null = null;
  let host: string | null = null;
  let hasPgbouncerParam = false;
  try {
    if (raw) {
      const u = new URL(raw);
      protocol = u.protocol.replace(":", "");
      user = u.username || null;
      host = u.host; // host:port, no credentials
      hasPgbouncerParam = u.searchParams.has("pgbouncer");
    }
  } catch {
    host = "UNPARSEABLE_URL";
  }

  const base = {
    hasDatabaseUrl: Boolean(raw),
    protocol,
    user,
    host,
    hasPgbouncerParam,
    hasSessionSecret: Boolean(process.env.SESSION_SECRET),
    appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? null,
    frameworkPillars: DIMENSION_META.length,
    pillarKeys: DIMENSION_META.map((d) => d.key),
  };

  try {
    const { prisma } = await import("@/lib/prisma");
    const users = await prisma.user.count();
    return NextResponse.json({ ...base, dbOk: true, users });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ...base, dbOk: false, dbError: msg.slice(0, 600) });
  }
}
