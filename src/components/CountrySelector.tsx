"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { regions } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Broadcast a region pick to the Curriculum section living on the home page. */
export const REGION_EVENT = "delphi-region-change";
export const REGION_STORAGE_KEY = "delphi-region";

function FlagChip({ flag, className }: { flag: string; className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full bg-neutral-100 leading-none",
        className,
      )}
      aria-hidden
    >
      {flag}
    </span>
  );
}

export function CountrySelector({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (i: number) => {
    setSelected(i);
    setOpen(false);
    const name = regions[i].name;
    try {
      sessionStorage.setItem(REGION_STORAGE_KEY, name);
    } catch {
      /* storage may be unavailable; the event below still covers the home page */
    }
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent(REGION_EVENT, { detail: name }));
    } else {
      // Curriculum reads the stored region on mount; the hash scrolls it in.
      router.push("/#curriculum");
    }
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Desktop: "Country" pill — each flag is its own button with a tooltip */}
      <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 lg:flex">
        <span className="text-sm font-medium text-ink">Country</span>
        <span className="flex gap-1.5">
          {regions.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => pick(i)}
              aria-label={`View our ${r.adjective} syllabus`}
              className="group/flag relative flex"
            >
              <FlagChip
                flag={r.flag}
                className="h-6 w-6 text-[15px] transition-transform group-hover/flag:scale-110"
              />
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-50 mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-lg bg-brand px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg shadow-brand/20 transition-opacity duration-150 group-hover/flag:opacity-100"
              >
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-brand" />
                View our {r.adjective} syllabus
              </span>
            </button>
          ))}
        </span>
      </div>

      {/* Mobile: circular badge that opens a dropdown of countries */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Choose a country curriculum"
          className="flex h-11 items-center gap-0.5 rounded-full pl-1 pr-1.5 transition-colors hover:bg-neutral-100"
        >
          <FlagChip flag={regions[selected].flag} className="h-7 w-7 text-lg" />
          {/* Marks the flag as a menu rather than a static badge. */}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-ink-secondary transition-transform",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        {/* Kept mounted so it can animate both ways; `invisible` takes it out of
            the a11y tree and holds through the fade before hiding. */}
        <div
          role="listbox"
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-black/5",
            "transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none",
            open
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-1 scale-95 opacity-0",
          )}
        >
          {regions.map((r, i) => (
            <button
              key={r.name}
              type="button"
              role="option"
              aria-selected={i === selected}
              tabIndex={open ? 0 : -1}
              onClick={() => pick(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left",
                "transition-all duration-200 ease-out hover:bg-primary-100 motion-reduce:transition-none",
                open ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0",
              )}
              // Options trail the panel so the list reads as unfolding.
              style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
            >
              <FlagChip flag={r.flag} className="h-7 w-7 text-lg" />
              <span className="flex-1 text-sm font-medium text-ink">{r.name}</span>
              {i === selected && <Check className="h-4 w-4 text-brand" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
