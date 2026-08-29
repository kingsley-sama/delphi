import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Split call-to-action: a pill button paired with a separate circular
 * arrow button. Both share the same destination.
 */
export function ArrowCta({
  href,
  children,
  className,
  inverted = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Swap the pill to white-on-brand for use over dark backgrounds. */
  inverted?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-1 sm:gap-3", className)}>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center rounded-full px-5 py-2.5 text-base font-medium sm:px-7 sm:py-3.5",
          inverted ? "bg-white text-brand" : "bg-brand text-white",
        )}
      >
        {children}
      </Link>
      <Link
        href={href}
        aria-hidden
        tabIndex={-1}
        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-accent text-ink sm:h-[52px] sm:w-[52px]"
      >
        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Link>
    </div>
  );
}
