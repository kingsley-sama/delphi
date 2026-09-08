"use client";

import { openBookCall } from "@/components/BookCallModal";
import { cn } from "@/lib/cn";

/** Opens the site-wide "Book a call" form, framed as a bootcamp prep consultation. */
export function BookCallButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openBookCall}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10",
        className,
      )}
    >
      Book a Prep Consultation Call
    </button>
  );
}
