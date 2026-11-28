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
        <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* hero (light) */}
          <div className="relative">
            {/* soft animated glow behind the hero */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="animate-aurora absolute -left-16 -top-12 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
              <div className="animate-aurora absolute left-40 top-28 h-72 w-72 rounded-full bg-navy-400/10 blur-3xl" style={{ animationDelay: "4s" }} />
            </div>
            <span className="rise inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-700">
              <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-gold" /> Free founder diagnostic
            </span>
            <h1 className="rise mt-4 max-w-xl text-[2rem] font-semibold leading-[1.1] text-navy-700 sm:text-[2.6rem]" style={{ animationDelay: "80ms" }}>
              See what to improve in the way your <span className="text-gold-600">business runs.</span>
            </h1>
            <p className="rise mt-4 max-w-lg text-[15px] leading-relaxed text-ink-muted" style={{ animationDelay: "160ms" }}>The Management Capital Index shows which management practices are working, which need attention, and what to work on over the next 90 days.</p>
            <div className="rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ animationDelay: "240ms" }}>
              <Link href="/signup" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold-600 hover:text-white hover:shadow-md">
                Create your account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href="#signin" className="text-sm font-medium text-navy-700 underline-offset-4 hover:underline">Sign in</a>
            </div>
            <p className="rise mt-3 text-xs text-ink-muted" style={{ animationDelay: "320ms" }}>Free account. 36 questions across six areas of management, then reassess every 90 days to track progress.</p>
          </div>

          {/* sign-in */}
          <div id="signin" className="scroll-mt-6">
            <SignInForm message={message} />
          </div>
        </div>

        {/* audience cards */}
        <div className="mt-10 lg:mt-12">
          <AudienceCards />
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted">The Management Capital Index is a self-assessment of management practices and an input to decisions. It is not a credit, funding or investment decision.</p>
      </div>
    </div>
  );
}
