import { cn } from "@/lib/utils";

/**
 * A deterministic, brand aware SVG cover. It gives every card and header a
 * distinct piece of editorial artwork without depending on external images.
 * The look draws on ledgers, contours, and financial motion, rendered in the
 * firm palette.
 */

type Palette = { a: string; b: string; c: string; ink: string };

const palettes: Palette[] = [
  { a: "#0a1929", b: "#1d3a5a", c: "#b8912f", ink: "#0a1929" }, // ink + gold
  { a: "#113635", b: "#1c6b64", c: "#dfbe56", ink: "#0a1929" }, // teal + gold
  { a: "#132c47", b: "#2f4f72", c: "#e6ddca", ink: "#0a1929" }, // navy + sand
  { a: "#0d2038", b: "#175450", c: "#d0a739", ink: "#0a1929" }, // deep + gold
];

function seedFrom(variant: number) {
  const p = palettes[variant % palettes.length];
  const motif = variant % 4;
  return { p, motif };
}

export function CoverArt({
  variant,
  className,
  rounded = true,
  label,
}: {
  variant: number;
  className?: string;
  rounded?: boolean;
  label?: string;
}) {
  const { p, motif } = seedFrom(variant);
  const gid = `cg${variant}`;
  const dots = `cd${variant}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        rounded && "rounded-2xl",
        className,
      )}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <svg
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.a} />
            <stop offset="1" stopColor={p.b} />
          </linearGradient>
          <pattern
            id={dots}
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.14" />
          </pattern>
        </defs>

        <rect width="400" height="260" fill={`url(#${gid})`} />
        <rect width="400" height="260" fill={`url(#${dots})`} />

        {motif === 0 && (
          <g fill="none" stroke={p.c} strokeWidth="1.5" opacity="0.85">
            <path d="M-20 210 C 80 150, 140 250, 220 170 S 360 120, 440 190" />
            <path
              d="M-20 230 C 80 170, 140 270, 220 190 S 360 140, 440 210"
              opacity="0.5"
            />
            <path
              d="M-20 190 C 80 130, 140 230, 220 150 S 360 100, 440 170"
              opacity="0.35"
            />
            <circle cx="220" cy="170" r="4" fill={p.c} stroke="none" />
          </g>
        )}

        {motif === 1 && (
          <g opacity="0.9">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                x={40 + i * 46}
                y={200 - (10 + ((i * 37) % 120))}
                width="22"
                height={10 + ((i * 37) % 120)}
                rx="3"
                fill={i % 3 === 0 ? p.c : "#ffffff"}
                opacity={i % 3 === 0 ? 0.9 : 0.16}
              />
            ))}
            <line
              x1="30"
              y1="200"
              x2="380"
              y2="200"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.25"
            />
          </g>
        )}

        {motif === 2 && (
          <g fill="none" opacity="0.85">
            {[0, 1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx="300"
                cy="70"
                r={30 + i * 34}
                stroke={i % 2 === 0 ? p.c : "#ffffff"}
                strokeWidth="1.4"
                opacity={0.5 - i * 0.06}
              />
            ))}
            <circle cx="300" cy="70" r="6" fill={p.c} />
          </g>
        )}

        {motif === 3 && (
          <g opacity="0.9">
            <path
              d="M0 260 L0 150 L70 175 L140 120 L210 160 L280 95 L350 140 L400 90 L400 260 Z"
              fill="#ffffff"
              opacity="0.1"
            />
            <path
              d="M0 260 L0 190 L70 205 L140 165 L210 195 L280 150 L350 180 L400 145 L400 260 Z"
              fill={p.c}
              opacity="0.55"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
