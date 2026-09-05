"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { ArrowRight, BookOpen, Check, Layers, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openBookCall } from "@/components/BookCallModal";
import {
  REGION_EVENT,
  REGION_STORAGE_KEY,
} from "@/components/CountrySelector";
import { curriculum, regions } from "@/lib/site";
import { cn } from "@/lib/cn";

function CurriculumCard({
  title,
  items,
  icon: Icon,
  active,
}: {
  title: string;
  items: string[];
  icon: LucideIcon;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-[24px]",
        active ? "bg-brand" : "border border-neutral-200 bg-white",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-5 py-4",
          active ? "border-white/10" : "border-neutral-200",
        )}
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            active ? "bg-white/10 text-accent" : "bg-primary-200 text-brand",
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <h3
          className={cn(
            "flex-1 text-xl font-bold tracking-tight",
            active ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h3>
        {/* Count comes from the list itself so the two can never disagree. */}
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            active ? "bg-accent text-brand" : "bg-neutral-100 text-ink-secondary",
          )}
        >
          {items.length}
        </span>
      </div>

      {/* Rows share the leftover height so cards of differing length still
          line up top and bottom across the row. */}
      <ul className="flex flex-1 flex-col">
        {items.map((item, i) => (
          <li
            key={item}
            className={cn(
              "flex flex-1 items-center gap-3 px-5 py-4",
              i > 0 && "border-t",
              i > 0 && (active ? "border-white/10" : "border-neutral-200"),
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                active ? "bg-accent" : "bg-brand",
              )}
            >
              <Check
                className={cn("h-3.5 w-3.5", active ? "text-brand" : "text-white")}
                strokeWidth={3}
              />
            </span>
            <span className={cn("text-base", active ? "text-white" : "text-ink")}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Curriculum() {
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  // Activate the region chosen from the navbar's country selector and bring
  // the section into view. Handles both same-page picks (event) and arrivals
  // from another page (stored value read on mount).
  useEffect(() => {
    const activate = (name: string | null) => {
      if (!name) return;
      const idx = regions.findIndex((r) => r.name === name);
      if (idx < 0) return;
      setActive(idx);
      const target = document.getElementById("curriculum");
      if (!target) return;
      // Route through Lenis so the trip is interpolated like every other
      // scroll; fall back to native if it has not mounted yet.
      if (lenis) lenis.scrollTo(target);
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    try {
      const stored = sessionStorage.getItem(REGION_STORAGE_KEY);
      if (stored) {
        sessionStorage.removeItem(REGION_STORAGE_KEY);
        activate(stored);
      }
    } catch {
      /* sessionStorage may be unavailable */
    }

    const onPick = (e: Event) => activate((e as CustomEvent<string>).detail);
    window.addEventListener(REGION_EVENT, onPick);
    return () => window.removeEventListener(REGION_EVENT, onPick);
  }, [lenis]);

  const data = curriculum[regions[active].name];

  return (
    <section id="curriculum" className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          badge="Explore Programs"
          title="Choose Your Curriculum"
          subtitle="Pick a curriculum and see exactly what we cover."
        />

        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Curriculum region"
            className="flex flex-wrap justify-center gap-1 rounded-2xl border border-neutral-200 bg-white p-2"
          >
            {regions.map((r, i) => (
              <button
                key={r.name}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                  active === i
                    ? "bg-brand text-white"
                    : "text-ink hover:bg-neutral-100",
                )}
              >
                <span aria-hidden>{r.flag}</span>
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3">
          <CurriculumCard title="Levels We Cover" items={data.levels} icon={Layers} />
          <CurriculumCard title="Exams We Coach" items={data.exams} icon={Target} active />
          <CurriculumCard title="Subjects We Teach" items={data.subjects} icon={BookOpen} />
        </div>

        <div className="mt-10 flex justify-center lg:mt-14">
          <button
            type="button"
            onClick={openBookCall}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-medium text-white"
          >
            Book a Free Call
            <ArrowRight className="h-4 w-4 text-accent" />
          </button>
        </div>
      </Container>
    </section>
  );
}
