import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignInForm } from "@/components/auth/SignInForm";
import { AudienceCards } from "@/components/auth/AudienceCards";
import { Gauge, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const existing = await getCurrentUser();
  if (existing) redirect("/overview");

  const userCount = await prisma.user.count();
  if (userCount === 0) redirect("/setup");

  const { error } = await searchParams;
  const message = error === "invalid" ? "Incorrect email or password." : error ? "Please enter your email and password." : null;

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:py-10 lg:py-12" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-700 text-gold shadow-sm"><Gauge className="h-5 w-5" /></span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-navy-700">Management Capital Lab</div>
              <div className="text-[11px] text-ink-muted">Management Capital Index</div>
            </div>
          </div>
          <a href="#signin" className="text-sm font-medium text-navy-700 hover:underline lg:hidden">Sign in</a>
        </div>

        {/* hero + sign-in */}
        <div className="mt-8 grid items-start gap-6 lg:mt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* hero */}
          <div className="relative overflow-hidden rounded-2xl bg-navy-800 p-8 text-white sm:p-10">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
              <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-navy-400/20 blur-3xl" />
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
            </div>
            <div className="relative">
              <h1 className="max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">See what to improve in the way your business runs.</h1>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">The Management Capital Index shows which management practices are working, which need attention, and what to work on over the next 90 days.</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link href="/start" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 shadow-sm transition-colors hover:bg-gold-600 hover:text-white">
                  Take the diagnostic <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#signin" className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline">Sign in</a>
              </div>
              <p className="mt-3 text-xs text-white/55">36 questions across six areas of management. Free and confidential.</p>
            </div>
          </div>

          {/* sign-in */}
          <div id="signin" className="scroll-mt-6">
            <SignInForm message={message} />
          </div>
        </div>

        {/* audience cards */}
        <AudienceCards />

        <p className="mt-10 text-center text-xs text-ink-muted">The Management Capital Index is a self-assessment of management practices and an input to decisions. It is not a credit, funding or investment decision.</p>
      </div>
    </div>
  );
}
