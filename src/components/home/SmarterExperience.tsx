import {
  GraduationCap,
  Clock,
  HelpCircle,
  Laptop,
  Briefcase,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    desc: "Learn from experienced educators dedicated to helping students succeed.",
  },
  {
    icon: Clock,
    title: "Quality Standards",
    desc: "Access learning programs anytime with flexible and convenient study options.",
  },
  {
    icon: HelpCircle,
    title: "Personalized Support",
    desc: "Receive guidance and support tailored to your unique learning journey.",
  },
  {
    icon: Laptop,
    title: "Modern Learning Tools",
    desc: "Experience interactive learning powered by modern digital tools and resources.",
  },
  {
    icon: Briefcase,
    title: "Future-Readiness Perspective",
    desc: "Develop practical skills designed to prepare you for future opportunities.",
  },
  {
    icon: Users,
    title: "Care & Dedication",
    desc: "Enjoy interactive sessions designed to make learning more effective.",
  },
];

export function SmarterExperience() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          badge="Why Students Trust Us"
          title="A Smarter And More Personalized Learning Experience"
          subtitle="We combine expert instruction, modern learning tools, and student-focused support to deliver meaningful educational outcomes."
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-neutral-200 bg-primary-50 p-5 sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-200 text-brand sm:h-12 sm:w-12">
                <f.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink sm:mt-5 sm:text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-secondary sm:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
