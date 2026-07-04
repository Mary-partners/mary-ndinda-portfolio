import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-cream hover:bg-navy-700",
  secondary: "bg-forest text-cream hover:bg-forest-700",
  gold: "bg-gold text-navy-900 hover:bg-gold-400",
  outline:
    "border border-navy/25 bg-transparent text-navy hover:bg-navy/5",
  ghost: "bg-transparent text-navy hover:bg-navy/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: CommonProps = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CommonProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  )
);
Button.displayName = "Button";

interface ButtonLinkProps
  extends React.ComponentProps<typeof Link>,
    CommonProps {}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props} />
  );
}
