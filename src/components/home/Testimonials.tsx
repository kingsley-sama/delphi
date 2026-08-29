import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-neutral-100 py-14 sm:py-20">
      <Container>
        <SectionHeading
          badge="Student Experiences"
          title="What Our Students Are Saying"
          subtitle="Hear from learners who have transformed their skills, confidence, and future opportunities through our programs."
        />
      </Container>
      {/* Continuous right-to-left marquee, outside the Container so the track
          spans the full viewport width on every breakpoint. The list renders
          twice and the track shifts by half its width, so the loop is seamless.
          Spacing uses a right margin rather than flex `gap` so each half is
          exactly 50%. */}
      <div className="relative mt-8 overflow-hidden sm:mt-12 motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              // The second pass is decorative padding for the loop, so it is
              // hidden from assistive tech to avoid duplicate quotes.
              aria-hidden={i >= testimonials.length}
              className="relative mr-4 flex w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-brand p-6 text-white sm:mr-5 sm:w-[380px] sm:p-7"
            >
              <Image
                src={CARD_BG}
                alt=""
                fill
                sizes="380px"
                className="object-cover"
              />
              <blockquote className="relative text-base leading-relaxed text-white/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-3 border-t border-white/15 pt-5 sm:mt-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-active">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-white/70">
                    {t.country}
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
