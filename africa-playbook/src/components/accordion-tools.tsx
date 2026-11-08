"use client";

/** Expand / collapse every <details> inside the element with id `scope`. */
export function AccordionTools({ scope }: { scope: string }) {
  const setAll = (open: boolean) => {
    document.getElementById(scope)?.querySelectorAll("details").forEach((d) => (d.open = open));
  };
  return (
    <div className="no-print flex flex-wrap gap-2" role="group" aria-label="Section controls">
      <button type="button" onClick={() => setAll(true)} className="rounded-full border border-ink/20 px-3 py-1.5 text-sm text-ink hover:border-ink">
        Expand all
      </button>
      <button type="button" onClick={() => setAll(false)} className="rounded-full border border-ink/20 px-3 py-1.5 text-sm text-ink hover:border-ink">
        Collapse all
      </button>
    </div>
  );
}
