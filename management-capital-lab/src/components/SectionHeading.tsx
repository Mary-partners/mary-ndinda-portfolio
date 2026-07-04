import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 font-serif text-3xl leading-tight text-navy-900 sm:text-[2rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[1.05rem] leading-relaxed text-navy-600">
          {description}
        </p>
      )}
    </div>
  );
}
