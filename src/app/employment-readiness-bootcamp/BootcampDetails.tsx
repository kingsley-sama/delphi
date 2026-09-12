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

const faqs = [
  {
    q: "What is the free readiness assessment?",
    a: "A 40-question check — 10 questions in each of the four core areas. It shows your current performance, your strongest areas, where you need work, and where to focus your preparation. You also get a free consultation call afterwards.",
  },
  {
    q: "Do I need to be good at Maths?",
    a: "No. Aptitude tests measure how quickly and accurately you understand information, identify patterns, work with numbers, interpret data and reach logical conclusions. Numerical reasoning is one of four areas, not the whole test.",
  },
  {
    q: "How is this different from just practising questions?",
    a: "Practising hundreds of random questions plateaus fast. The bootcamp diagnoses which skill is costing you marks, fixes that skill, then retests instead of treating all four areas the same way.",
  },
  {
    q: "Are the classes live or recorded?",
    a: "Classes are live and instructor-led, with recordings available afterwards so you can revisit anything you missed.",
  },
  {
    q: "How long do I keep access?",
    a: "You keep lifetime access to the aptitude-test preparation community until you are employed.",
  },
  {
    q: "Is there a referral benefit?",
    a: "Yes. Refer someone who registers and you receive 10% of your bootcamp payment.",
  },
];

export function BootcampDetails() {
  const [open, setOpen] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            badge="What Makes This Different + FAQs"
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

        <div className="mt-14 border-t border-neutral-200 pt-12 sm:mt-20 sm:pt-16">
          <Reveal>
            <SectionHeading
              badge="Need Help?"
              title="Frequently Asked Questions"
              subtitle="The practical details about the assessment, classes, access and support — all in one place."
            />
          </Reveal>
          <RevealGroup className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 sm:mt-12">
            {faqs.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <RevealItem
                  key={item.q}
                  className="rounded-2xl border border-neutral-200 bg-primary-50 p-4 sm:p-5"
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-base font-semibold text-ink sm:text-lg">{item.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all",
                      isOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-ink-secondary sm:text-base">{item.a}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
