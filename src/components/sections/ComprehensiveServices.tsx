import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { cn } from "@/lib/cn";
import { img } from "@/lib/images";

// `bg` is the card's backdrop artwork. The fourth is a dark green field, so its
// copy flips to white; the rest sit on a light field and stay dark green.
const services = [
  {
    name: "Delphi Prep",
    href: "/prep",
    image: img("prog-prep.webp"),
    bg: "/our_service_section/our_service_section1.jpg",
    dark: false,
    desc: "Focused preparation for major exams, admissions tests, certifications, and academic assessments across American, British, Canadian, Nigerian and international curricula.",
  },
  {
    name: "Delphi Academics",
    href: "/academics",
    image: img("prog-academics.webp"),
    bg: "/our_service_section/our_service_section2.jpg",
    dark: false,
    desc: "Comprehensive academic support for students through tutoring, homework guidance, research support, enrichment, and learning coaching.",
  },
  {
    name: "Delphi UpSkill",
    href: "/upskill",
    image: img("prog-upskill.webp"),
    bg: "/our_service_section/our_service_section3.jpg",
    dark: false,
    desc: "Future-ready programs in digital skills, technology, creative disciplines, communication, and practical competencies for modern life and work.",
  },
  {
    name: "Delphi Career",
    href: "/career",
    image: img("prog-career.webp"),
    bg: "/our_service_section/our_service_section4.jpg",
    dark: true,
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
              <div
                className={cn(
                  "relative overflow-hidden rounded-[32px] shadow-[0_-12px_32px_-12px_rgba(0,0,0,0.12)]",
                  // Backs the artwork while it loads, so the copy stays legible.
                  s.dark ? "bg-active" : "bg-primary-50",
                )}
              >
                <Image
                  src={s.bg}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                />

                <div className="relative grid gap-x-10 gap-y-6 p-6 sm:p-8 md:grid-cols-2 md:grid-rows-[auto_1fr] md:p-12 lg:p-14">
                  <h3
                    className={cn(
                      "text-3xl uppercase leading-[1.05] tracking-wide md:col-start-2 md:row-start-1 md:text-center md:text-[40px] lg:text-[46px]",
                      s.dark ? "text-white" : "text-active",
                    )}
                  >
                    {/* The unlayered `h1..h6` base rule in globals.css outranks
                        layered utilities, so the face is set on an inner span. */}
                    <span className="font-marker">{s.name}</span>
                  </h3>

                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] md:col-start-2 md:row-start-2 md:aspect-[5/3]">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 768px) 90vw, 420px"
                      className="object-cover"
                    />
                  </div>

                  <div className="md:col-start-1 md:row-start-2 md:self-center md:text-center">
                    <p
                      className={cn(
                        "text-base leading-relaxed md:text-lg",
                        s.dark ? "text-white/85" : "text-brand",
                      )}
                    >
                      {s.desc}
                    </p>
                    <div className="mt-8 md:flex md:justify-center">
                      <ArrowCta href={s.href} inverted={s.dark}>
                        Explore Program
                      </ArrowCta>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
