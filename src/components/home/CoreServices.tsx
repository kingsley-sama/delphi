import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { img } from "@/lib/images";

const items = [
  {
    title: "Personalized Tutoring",
    desc: "One-on-one and small-group learning designed around each student's pace, goals, strengths, and challenges.",
    image: img("core-tutoring.webp"),
  },
  {
    title: "Exam Preparation",
    desc: "Structured coaching and strategic preparation for national, international, professional, and university entrance examinations.",
    image: img("core-exam.webp"),
  },
  {
    title: "Academic Support",
    desc: "Comprehensive support systems that help students stay academically strong through study coaching, revision, instruction, and assignment support.",
    image: img("core-academic.webp"),
  },
  {
    title: "Skill Development",
    desc: "Future-focused learning experiences in technology, digital skills, creative disciplines, communication, and other high-value competencies.",
    image: img("core-skill.webp"),
  },
  {
    title: "Career Development",
    desc: "Practical learning and coaching programs that help students, graduates, and professionals prepare for certifications and career growth.",
    image: img("core-career.webp"),
  },
  {
    title: "Research Support",
    desc: "Guided support for academic research, essays, projects, reports, and data analysis.",
    image: img("core-research.webp"),
  },
  {
    title: "Academic Consulting",
    desc: "Advisor services for parents, educators, and institutions seeking stronger learning systems, academic planning, and student development.",
    image: img("core-consulting.webp"),
  },
];

export function CoreServices() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading badge="Our Core Services" title="Personalized Learning For Every Student" />
        <div className="mt-8 border-t border-neutral-200 sm:mt-12">
          {items.map((item) => (
            <div
              key={item.title}
              className="group grid items-center gap-1.5 rounded-[28px] border-b border-neutral-200 px-5 py-5 transition-colors duration-300 hover:border-transparent hover:bg-brand sm:gap-2 sm:px-6 sm:py-7 md:grid-cols-[1fr_auto_1.4fr] md:gap-x-6 md:px-10"
            >
              <h3 className="text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-white">
                {item.title}
              </h3>

              {/* Reserved column: collapsed by default, expands on hover so the
                  image slots between title and description without overlapping. */}
              <div className="relative hidden h-px w-0 self-center transition-[width] duration-300 ease-out group-hover:w-[240px] md:block">
                <Image
                  src={item.image}
                  alt=""
                  width={240}
                  height={160}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[160px] w-[240px] -translate-x-1/2 -translate-y-1/2 scale-90 rounded-2xl object-cover opacity-0 shadow-xl shadow-black/20 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                />
              </div>

              <p className="text-base text-ink-secondary transition-colors duration-300 group-hover:text-white/85">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
