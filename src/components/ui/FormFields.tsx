"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/** Pill control, used by the compact "Book a call" popover. */
export const inputClass =
  "h-[46px] w-full rounded-full border border-neutral-200 bg-transparent px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-secondary/60 focus:border-brand focus:ring-1 focus:ring-brand/30";

/** Squared control for full-width forms that carry their own field labels. */
export const inputClassBox =
  "h-[48px] w-full rounded-lg border border-neutral-300 bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-secondary/50 focus:border-brand focus:ring-1 focus:ring-brand/30";

export function SelectField({
  name,
  defaultValue,
  placeholder,
  options,
  required,
  className,
  inputClassName = inputClass,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  options: string[];
  required?: boolean;
  className?: string;
  /** Swap in `inputClassBox` for squared, label-above forms. */
  inputClassName?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={cn(
          inputClassName,
          "appearance-none pr-10",
          !defaultValue && "text-ink-secondary/60",
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary" />
    </div>
  );
}
