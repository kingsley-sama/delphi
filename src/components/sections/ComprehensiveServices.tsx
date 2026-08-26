import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { img } from "@/lib/images";

const services = [
  {
    name: "Delphi Prep",
    href: "/prep",
    image: img("prog-prep.webp"),
    desc: "Focused preparation for major exams, admissions tests, certifications, and academic assessments across American, British, Canadian, Nigerian and international curricula.",
  },
  {
    name: "Delphi Academics",
    href: "/academics",
    image: img("prog-academics.webp"),
    desc: "Comprehensive academic support for students through tutoring, homework guidance, research support, enrichment, and learning coaching.",
  },
  {
    name: "Delphi UpSkill",
    href: "/upskill",
    image: img("prog-upskill.webp"),
    desc: "Future-ready programs in digital skills, technology, creative disciplines, communication, and practical competencies for modern life and work.",
  },
  {
    name: "Delphi Career",
    href: "/career",
    image: img("prog-career.webp"),
    desc: "Professional learning, certification, workplace skills, and career development programs designed for long-term growth and advancement.",
  },
];

export function ComprehensiveServices() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <SectionHeading
          badge="Our Programs"
          title="Comprehensive Services Built For Every Learner"
          subtitle="From personalized learning programs to practical skill development, our services are designed to support success at every stage."
        />
        {/* Sticky stack: each row pins a little lower than the one before it, so
            scrolling slides the next card up over the previous one. The wrapper
            is opaque (and shadowed) so the covered card reads as underneath. */}
        <div className="mt-8 flex flex-col gap-5 sm:mt-12">
          {services.map((s, i) => (
            <div
              key={s.name}
              className="sticky"
              style={{ top: `${88 + i * 18}px` }}
            >
              <div className="grid gap-5 rounded-[32px] bg-white shadow-[0_-12px_32px_-12px_rgba(0,0,0,0.12)] md:grid-cols-[1.4fr_1fr]">
                <div className="flex flex-col justify-center rounded-[28px] bg-primary-150 p-6 sm:p-8 md:p-12">
                  <h3 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-md text-base text-ink-secondary md:text-lg">
                    {s.desc}
                  </p>
                  <div className="mt-8">
                    <ArrowCta href={s.href}>Explore Program</ArrowCta>
                  </div>
                </div>
                <div className="relative min-h-[200px] overflow-hidden rounded-[28px] sm:min-h-[280px]">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
