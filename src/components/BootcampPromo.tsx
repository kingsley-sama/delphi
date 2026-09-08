"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

const DISMISS_KEY = "delphi-bootcamp-promo-dismissed";

/**
 * Bottom-left promo pointing at the bootcamp page. Sits opposite the
 * "Book a call" popover (bottom-right) so the two can never collide, and stays
 * dismissed for the rest of the browsing session once closed.
 */
export function BootcampPromo() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* storage may be unavailable; showing the promo is the safe fallback */
    }
    // Held back briefly so it arrives after the page has settled rather than
    // competing with the hero on load.
    const show = setTimeout(() => {
      setMounted(true);
      setTimeout(() => setVisible(true), 30);
    }, 2500);
    return () => clearTimeout(show);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* non-blocking */
    }
    setTimeout(() => setMounted(false), 400);
  };

  if (!mounted) return null;

  return (
    <div
      role="complementary"
      aria-label="Employment Aptitude Test Bootcamp"
      className={cn(
        "fixed bottom-6 left-6 z-[90] w-[calc(100vw_-_3rem)] max-w-[360px] overflow-hidden rounded-[24px] bg-brand p-6 shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-8 scale-95 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-4 top-4 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>

      <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
        50 slots only
      </span>

      <p className="mt-4 pr-6 text-xl font-bold leading-tight text-white">
        Employment Aptitude Test{" "}
        <span className="text-accent">Bootcamp</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        Three months of live training across numerical, verbal, logical and data
        reasoning — for oil &amp; gas, consulting, and banking &amp; finance roles.
      </p>

      <Link
        href="/employment-readiness-bootcamp"
        onClick={dismiss}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-brand"
      >
        See the bootcamp
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
