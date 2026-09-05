"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const stages = [
  {
    title: "K12 Students",
    image: "/student_success_matters/k-12.webp",
    alt: "Two students studying together over a notebook",
    desc: "We support parents and guardians by providing structured tutoring and academic guidance for their kids in K12.",
    bullets: [
      "School-complementing lessons",
      "Personalized learning plans",
      "Effective exam prep for academic success",
      "Progress tracking and feedback",
      "Homework guidance and help",
    ],
  },
  {
    title: "College Students & Postgraduate Students",
    image: "/student_success_matters/college-postgraduate.webp",
    alt: "A postgraduate student working at a laptop while a mentor looks on",
    desc: "Crucial learning support designed for college students, early graduates and postgraduate students, designed to prepare for the toughest phase of the learning journey.",
    bullets: [],
  },
  {
    title: "Professionals & Adult Learners",
    image: "/student_success_matters/adult-learners.webp",
    alt: "Adult learners in a professional development class",
    desc: "Flexible learning paths designed for early-/mid-career professionals and working adults looking to upskill or pursue further education.",
    bullets: [],
  },
];

export function LearningSupport() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-primary-50 py-14 sm:py-20">
      <Container>
        <SectionHeading badge="Student Success Matters" title="Learning Support for Every Stage" />
        <div className="mt-8 grid items-start gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-4">
            {stages.map((stage, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={stage.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <span className="text-xl font-semibold text-ink">
                      {stage.title}
                    </span>
                    <span className="mt-1 shrink-0 text-brand">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all",
                      isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base text-ink-secondary">{stage.desc}</p>
                      {stage.bullets.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {stage.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-center gap-2 text-sm text-ink-secondary"
                            >
                              <Check className="h-4 w-4 text-brand" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* All three are stacked and cross-faded: switching stages never
              flashes an empty frame while the next image loads. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:sticky lg:top-24">
            {stages.map((stage, i) => (
              <Image
                key={stage.title}
                src={stage.image}
                alt={stage.alt}
                aria-hidden={i !== open}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 90vw, 600px"
                // Anchored top: the frame is wider than these photos are, so the
                // crop comes off the bottom rather than the subjects' heads.
                quality={92}
                className={cn(
                  "object-cover object-top transition-opacity duration-500 motion-reduce:transition-none",
                  i === open ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
