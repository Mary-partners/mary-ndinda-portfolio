import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-serif text-7xl font-semibold text-teal-600">
        404
      </span>
      <h1 className="mt-6 text-2xl font-semibold text-ink-900">
        This page could not be found.
      </h1>
      <p className="mt-3 max-w-md text-ink-500">
        The page you are looking for may have moved, or the link may be out of
        date. Let us get you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-sand-50 shadow-soft transition-all hover:bg-ink-800 hover:shadow-lift"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </section>
  );
}
