"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { regions } from "@/lib/site";

// One shared backdrop so every card reads identically. The artwork is a dark
// green field, so the copy stays white throughout.
const CARD_BG = "/student_experience_section/student_experience_section1.png";

const testimonials = [
  {
    quote:
      "Joining this platform completely changed the way I learn. The support system, flexible classes, and practical teaching style helped me improve both academically and professionally.",
    name: "Daniel Adebayo",
    country: "Nigeria",
  },
  {
    quote:
      "I've used several online learning platforms before, but this experience felt far more personalized and engaging. The tutors genuinely care about student growth.",
    name: "Sophia Williams",
    country: "Canada",
  },
  {
    quote:
      "The learning structure is excellent and very easy to follow. I was able to balance my studies alongside work without feeling overwhelmed.",
    name: "Ethan Eseigbe",
    country: "United Kingdom",
  },
  {
    quote:
      "The courses are practical, modern, and very interactive. I gained valuable skills that immediately improved my confidence and productivity.",
    name: "Olivia Carter",
    country: "United States",
  },
  {
    quote:
      "What stood out for me was the level of guidance and support available throughout the program. It truly feels like a learning community.",
    name: "Chidera Okafor",
    country: "Nigeria",
  },
  {
    quote:
      "The platform combines quality education with flexibility in a way that makes learning enjoyable. I would absolutely recommend it to others.",
    name: "Liam Margaret",
    country: "United Kingdom",
  },
];

/** The navbar's region list is the source of truth for flags. */
function flagFor(country: string) {
  return regions.find((r) => r.name === country)?.flag;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  // The reel advances by driving `scrollLeft` rather than animating a
  // transform, so the auto-motion and a user's swipe act on the same axis
  // instead of fighting each other. Touch keeps its native momentum.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 40; // px per second
    let raf = 0;
    let last = 0;
    let paused = false;
    let resumeTimer = 0;
    // Sub-pixel accumulator. `scrollLeft` rounds on every write, so advancing
    // it directly by less than a pixel per frame rounds up each time and makes
    // the speed a function of the display's refresh rate instead of SPEED.
    let pos = el.scrollLeft;

    const tick = (now: number) => {
      if (!last) last = now;
      // Clamp so a backgrounded tab does not resume with one huge jump.
      const dt = Math.min(now - last, 100);
      last = now;

      if (paused) {
        // Follow the user rather than fighting native momentum.
        pos = el.scrollLeft;
      } else {
        // A swipe may have moved the scroller since the last frame.
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        pos += (SPEED * dt) / 1000;

        // The list renders twice, so half the scroll width is one full loop.
        // Wrapping at either end lands on the identical duplicate, which makes
        // the seam invisible and lets a backwards swipe keep going too.
        const half = el.scrollWidth / 2;
        if (half > 0) {
          if (pos >= half) pos -= half;
          else if (pos < 0) pos += half;
        }
        el.scrollLeft = pos;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resumeSoon = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, 1200);
    };
    const onWheel = () => {
      pause();
      resumeSoon();
    };

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resumeSoon);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resumeSoon, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resumeSoon);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resumeSoon);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section id="testimonials" className="bg-neutral-100 py-14 sm:py-20">
      <Container>
        <SectionHeading
          badge="Student Experiences"
          title="What Our Students Are Saying"
          subtitle="Hear from learners who have transformed their skills, confidence, and future opportunities through our programs."
        />
      </Container>
      {/* Continuous right-to-left reel, outside the Container so the track
          spans the full viewport width on every breakpoint. The list renders
          twice so the wrap lands on an identical duplicate. Spacing uses a
          right margin rather than flex `gap` so each half is exactly 50%.
          The scroller stays native, so a swipe drives it directly; the effect
          above only nudges the same `scrollLeft`. */}
      <div
        ref={trackRef}
        className="relative mt-8 overflow-x-auto overscroll-x-contain sm:mt-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              // The second pass is decorative padding for the loop, so it is
              // hidden from assistive tech to avoid duplicate quotes.
              aria-hidden={i >= testimonials.length}
              className="relative mr-3 flex w-[248px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-brand p-4 text-white sm:mr-5 sm:w-[380px] sm:rounded-3xl sm:p-7"
            >
              <Image
                src={CARD_BG}
                alt=""
                fill
                sizes="(max-width: 640px) 248px, 380px"
                className="object-cover"
              />
              <blockquote className="relative text-[13px] leading-snug text-white/90 sm:text-base sm:leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="relative mt-4 flex items-center gap-2.5 border-t border-white/15 pt-3.5 sm:mt-8 sm:gap-3 sm:pt-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-active sm:h-10 sm:w-10 sm:text-sm">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-[13px] font-semibold sm:text-sm">{t.name}</span>
                  {/* The flag stands in for the country name; the name is kept
                      for screen readers, which read flag emoji inconsistently. */}
                  <span className="block text-base leading-none sm:text-lg">
                    <span aria-hidden>{flagFor(t.country) ?? t.country}</span>
                    <span className="sr-only">{t.country}</span>
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
