"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  REGION_EVENT,
  REGION_STORAGE_KEY,
} from "@/components/CountrySelector";
import { curriculum, regions } from "@/lib/site";
import { cn } from "@/lib/cn";

function CurriculumCard({
  title,
  items,
  active,
}: {
  title: string;
  items: string[];
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] p-3",
        active
          ? "bg-brand lg:-mt-5 lg:mb-[-1.25rem]"
          : "border border-neutral-200 bg-primary-50",
      )}
    >
      <h3
        className={cn(
          "px-4 pb-5 pt-4 text-2xl font-bold tracking-tight sm:text-3xl",
          active ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h3>
      <div className="rounded-3xl bg-white p-6">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-base">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </span>
              <span className="text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Curriculum() {
  const [active, setActive] = useState(0);

  // Activate the region chosen from the navbar's country selector and bring
  // the section into view. Handles both same-page picks (event) and arrivals
  // from another page (stored value read on mount).
  useEffect(() => {
    const activate = (name: string | null) => {
      if (!name) return;
      const idx = regions.findIndex((r) => r.name === name);
      if (idx < 0) return;
      setActive(idx);
      document
        .getElementById("curriculum")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  }, []);

  const data = curriculum[regions[active].name];

  return (
    <section id="curriculum" className="py-20">
      <Container>
        <SectionHeading badge="Explore Programs" title="Choose Your Curriculum" />

        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 p-1.5">
            {regions.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === i
                    ? "bg-white text-ink shadow-sm"
                    : "text-ink-secondary hover:text-ink",
                )}
              >
                <span>{r.flag}</span>
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
          <CurriculumCard title="Levels We Cover" items={data.levels} />
          <CurriculumCard title="Exams We Coach" items={data.exams} active />
          <CurriculumCard title="Subjects We Teach" items={data.subjects} />
        </div>
      </Container>
    </section>
  );
}
