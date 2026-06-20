import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-3xl bg-brand p-6 text-white sm:p-7"
            >
              <blockquote className="text-base leading-relaxed text-white/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5 sm:mt-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-active">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-white/70">{t.country}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
