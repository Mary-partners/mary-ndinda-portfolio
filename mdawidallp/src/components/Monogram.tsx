import { cn } from "@/lib/utils";

/**
 * A refined portrait stand in for leadership. It renders initials over a
 * layered brand backdrop so a real headshot can be dropped in later without
 * changing the layout.
 */
export function Monogram({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-2xl",
        className,
      )}
      role="img"
      aria-label={`Portrait of ${initials}`}
    >
      <svg
        viewBox="0 0 320 400"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="mono" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#091d36" />
            <stop offset="0.6" stopColor="#0f2a4a" />
            <stop offset="1" stopColor="#0f8a5f" />
          </linearGradient>
        </defs>
        <rect width="320" height="400" fill="url(#mono)" />
        <g fill="none" stroke="#33b985" opacity="0.45">
          <circle cx="160" cy="150" r="120" strokeWidth="1" />
          <circle cx="160" cy="150" r="90" strokeWidth="1" opacity="0.6" />
        </g>
        <g opacity="0.16" stroke="#ffffff" strokeWidth="1">
          <path d="M0 300 C 90 260, 150 340, 230 280 S 360 240, 420 300" />
          <path d="M0 330 C 90 290, 150 370, 230 310 S 360 270, 420 330" />
        </g>
        <text
          x="160"
          y="180"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="120"
          fontWeight="600"
          fill="#f7f9fb"
          letterSpacing="4"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
