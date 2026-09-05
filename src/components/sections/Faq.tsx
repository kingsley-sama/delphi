"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "Who can enroll in your programs?",
    a: "Our programs are designed for K-12 students, college students, and professionals or adult learners.",
  },
  {
    q: "Are the classes online or physical?",
    a: "Classes are primarily online and delivered live, with flexible scheduling. Selected locations also offer in-person sessions.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Yes. We build personalized learning plans around your goals, schedule, and preferred pace.",
  },
  {
    q: "Will I receive support during the program?",
    a: "Absolutely. Every learner gets dedicated tutor support, progress tracking, and regular feedback throughout the program.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation call and we'll match you with the right program and tutor for your needs.",
  },
];

export function Faq({
  items = defaultFaqs,
  showImage = true,
}: {
  items?: FaqItem[];
  showImage?: boolean;
}) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faqs" className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          badge="Need Help?"
          title="Frequently Asked Questions"
          subtitle="Find quick answers to common questions about our programs, learning process, student support, and enrollment."
        />
        <div
          className={cn(
            "mt-8 grid items-start gap-6 sm:mt-12 sm:gap-8",
            showImage && "lg:grid-cols-[0.9fr_1.1fr]",
          )}
        >
          {showImage && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand">
              <Image
                src="/FAQ_section/faq.webp"
                // Decorative: the section heading already says what this is.
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-contain"
              />
            </div>
          )}
          <div className="flex flex-col gap-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-neutral-200 bg-neutral-100 p-4 sm:p-5"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-base font-normal text-ink sm:font-semibold sm:text-lg">{item.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
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
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
