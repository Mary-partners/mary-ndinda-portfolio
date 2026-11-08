"use client";

/** Opens the browser's print dialog, from which the reader can also save as PDF. */
export function PrintButton({ label = "Print or save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      className="no-print inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 text-sm text-ink hover:border-ink"
      onClick={() => window.print()}
    >
      <span aria-hidden="true">⎙</span>
      {label}
    </button>
  );
}
