import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label
      className={cn("block text-sm font-medium text-navy-800", className)}
      {...props}
    >
      {children}
      {required && <span className="ml-0.5 text-gold-600">*</span>}
    </label>
  );
}

const controlBase =
  "w-full rounded-lg border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy-900 shadow-sm placeholder:text-navy-300 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(controlBase, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(controlBase, "min-h-[120px] resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(controlBase, "appearance-none bg-white pr-9", className)}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-1 text-sm text-red-600">{children}</p>;
}

export function Checkbox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        "mt-0.5 h-4 w-4 shrink-0 rounded border-navy/30 text-forest focus:ring-forest/30",
        className
      )}
      {...props}
    />
  );
}
