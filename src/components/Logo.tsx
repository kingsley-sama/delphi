import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

// The brand asset is a full lockup (mark + wordmark), so it stands in for both
// the icon and the text the logo used to render.
const LOGO_SRC = "/education_logo.png";
const LOGO_WIDTH = 1163;
const LOGO_HEIGHT = 488;

export function Logo({
  className,
  variant = "plain",
}: {
  className?: string;
  /** `nav` = larger lockup for the header. `plain` = footer / mobile panel size. */
  variant?: "plain" | "nav";
}) {
  const isNav = variant === "nav";

  return (
    <Link
      href="/"
      aria-label="Delphi Education Hub — home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={LOGO_SRC}
        alt="Delphi Education Hub"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        // The lockup is wide; `sizes` keeps the browser from pulling a source
        // far larger than the few dozen CSS pixels it actually renders at.
        sizes={isNav ? "(min-width: 1024px) 124px, 100px" : "108px"}
        priority={isNav}
        className={cn("w-auto", isNav ? "h-[42px] lg:h-[52px]" : "h-[45px]")}
      />
    </Link>
  );
}
