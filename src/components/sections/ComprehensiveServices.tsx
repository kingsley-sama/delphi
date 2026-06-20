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
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          badge="Our Programs"
          title="Comprehensive Services Built For Every Learner"
          subtitle="From personalized learning programs to practical skill development, our services are designed to support success at every stage."
        />
        <div className="mt-12 flex flex-col gap-5">
          {services.map((s) => (
            <div
              key={s.name}
              className="grid gap-5 md:grid-cols-[1.4fr_1fr]"
            >
              <div className="flex flex-col justify-center rounded-[28px] bg-primary-150 p-8 md:p-12">
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
              <div className="relative min-h-[280px] overflow-hidden rounded-[28px]">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
