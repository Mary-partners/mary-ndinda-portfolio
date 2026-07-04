import * as React from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="wall-backdrop border-b border-navy/10 bg-cream-50">
      <div className="container-lab py-14 sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-[1.12] text-navy-900 sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-700">
            {intro}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
