import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/lib/images";

/**
 * A framed photograph. Uses a plain <img> so it renders identically in any
 * hosting setup with no image-loader configuration, while the wrapper keeps
 * a fixed aspect and crops with object-cover. An optional navy overlay lets
 * text sit legibly on top for hero treatments.
 */
export function Photo({
  image,
  className,
  imgClassName,
  rounded = true,
  overlay = "none",
  priority = false,
  sizes,
}: {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
  rounded?: boolean;
  overlay?: "none" | "soft" | "navy" | "navy-strong";
  priority?: boolean;
  sizes?: string;
}) {
  const overlays: Record<string, string> = {
    none: "",
    soft: "bg-gradient-to-t from-ink-950/45 via-ink-950/10 to-transparent",
    // Left-biased so hero copy (always set on the left) stays legible over
    // any photograph, bright or dark.
    navy: "bg-gradient-to-r from-ink-950/95 via-ink-950/85 to-ink-950/40",
    "navy-strong": "bg-gradient-to-r from-ink-950/96 via-ink-950/88 to-ink-950/55",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-ink-100",
        rounded && "rounded-2xl",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        className={cn(
          "h-full w-full object-cover",
          imgClassName,
        )}
      />
      {overlay !== "none" && (
        <div className={cn("pointer-events-none absolute inset-0", overlays[overlay])} />
      )}
    </div>
  );
}
