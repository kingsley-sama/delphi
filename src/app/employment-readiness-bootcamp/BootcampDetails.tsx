"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";

// Mirrors the home page's Learning Support block: an accordion on the left,
// a cross-faded image pinned alongside it.
const groups = [
  {
    title: "What the bootcamp includes",
    image: "/personalized_learning/academic-support.webp",
    alt: "A student in a live online class with a tutor",
    desc: "Foundation-focused training that builds the skill behind the question, not just the answer to it.",
    bullets: [
      "Live instructor-led classes",
      "Practical individual & group practice",
      "Rich, organised practice resources",
      "Timed mock assessments",
      "Recorded classes",
    ],
  },
  {
    title: "How you're supported",
    image: "/personalized_learning/personalized-tutoring.webp",
    alt: "A student working through practice questions on a laptop",
    desc: "Progress is tracked, and nobody is left behind at the pace of the group.",
    bullets: [
      "Progress tracking",
      "Support for struggling learners",
      "Group study & practice",
      "Lifetime access to the preparation community until employment",
    ],
  },
  {
    title: "Who it's for",
    image: "/personalized_learning/career-development.webp",
    alt: "A recent graduate preparing for an employment assessment",
    desc: "Anyone who expects an aptitude test between them and their next role.",
    bullets: [
      "Final-year students",
      "Fresh graduates",
      "NYSC corps members",
      "Young career seekers",
    ],
  },
];

export function BootcampDetails() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            badge="What makes this different"
            title="Build the skills behind the questions"
            subtitle="Don't just practise hundreds of questions. The bootcamp teaches the method first, then drills it."
          />
        </Reveal>
        <div className="mt-8 grid items-start gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-8">
          <RevealGroup className="flex flex-col gap-4">
            {groups.map((group, i) => {
              const isOpen = open === i;
              return (
                <RevealItem
                  key={group.title}
                  className="rounded-2xl border border-neutral-200 bg-primary-50 p-6"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <span className="text-xl font-semibold text-ink">{group.title}</span>
                    <span className="mt-1 shrink-0 text-brand">
                      {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all",
                      isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base text-ink-secondary">{group.desc}</p>
                      <ul className="mt-4 space-y-2">
                        {group.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-center gap-2 text-sm text-ink-secondary"
                          >
                            <Check className="h-4 w-4 shrink-0 text-brand" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* Stacked and cross-faded, so switching never flashes an empty frame. */}
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:sticky lg:top-24" delay={0.1}>
            {groups.map((group, i) => (
              <Image
                key={group.title}
                src={group.image}
                alt={group.alt}
                aria-hidden={i !== open}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 90vw, 600px"
                quality={92}
                className={cn(
                  "object-cover transition-opacity duration-500 motion-reduce:transition-none",
                  i === open ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
