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
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0", className)}>
      <Link
        href={href}
        className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-hover"
      >
        {children}
      </Link>
      <Link
        href={href}
        aria-hidden
        tabIndex={-1}
        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-hover"
      >
        <ArrowUpRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
