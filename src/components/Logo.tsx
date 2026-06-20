import Link from "next/link";
import { Rss } from "lucide-react";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  variant = "plain",
}: {
  className?: string;
  /** `nav` = green pill on desktop, bare green icon on mobile. `plain` = green icon + green text. */
  variant?: "plain" | "nav";
}) {
  if (variant === "nav") {
    return (
      <Link
        href="/"
        aria-label="Delphi Education Hub — home"
        className={cn(
          "flex items-center gap-2.5 rounded-full lg:bg-brand lg:px-5 lg:py-2.5",
          className,
        )}
      >
        <Rss
          className="h-6 w-6 shrink-0 text-brand lg:text-white"
          strokeWidth={2.5}
          aria-hidden
        />
        <span className="hidden text-lg font-bold tracking-tight text-white lg:inline">
          Delphi Education Hub
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <Rss className="h-6 w-6 shrink-0 text-brand" strokeWidth={2.5} aria-hidden />
      <span className="text-lg font-bold tracking-tight text-brand">
        Delphi Education Hub
      </span>
    </Link>
  );
}
