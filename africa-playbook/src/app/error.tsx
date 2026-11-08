"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-3 text-4xl text-ink">This section could not be displayed</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-ink-2">Try again, or return to the overview. Your inputs in interactive tools are not stored, so nothing has been lost.</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <button type="button" onClick={reset} className="rounded-full bg-ink px-5 py-2.5 text-paper">Try again</button>
        <Link href="/" className="link self-center">Back to overview</Link>
      </div>
    </div>
  );
}
