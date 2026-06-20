"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { img } from "@/lib/images";

const stages = [
  {
    title: "K12 Students",
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
    desc: "Crucial learning support designed for college students, early graduates and postgraduate students, designed to prepare for the toughest phase of the learning journey.",
    bullets: [],
  },
  {
    title: "Professionals & Adult Learners",
    desc: "Flexible learning paths designed for early-/mid-career professionals and working adults looking to upskill or pursue further education.",
    bullets: [],
  },
];

export function LearningSupport() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-primary-50 py-20">
      <Container>
        <SectionHeading badge="Student Success Matters" title="Learning Support for Every Stage" />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
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
                    onClick={() => setOpen(isOpen ? -1 : i)}
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={img("learning-support.webp")}
              alt="A tutor supporting a young learner"
              fill
              sizes="(max-width: 1024px) 90vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
