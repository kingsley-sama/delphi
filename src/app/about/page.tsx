import type { Metadata } from "next";
import { Target, Heart, Lightbulb, Users, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ImageText } from "@/components/sections/ImageText";
import { ValueGrid } from "@/components/sections/ValueGrid";
import { Stats } from "@/components/sections/Stats";
import { Cta } from "@/components/sections/Cta";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us — Delphi Education Hub",
  description:
    "Learn about Delphi Education Hub's mission to make personalized, high-quality learning accessible to every student.",
};

const values = [
  { icon: Heart, title: "Student-First", desc: "Every decision starts with what helps the learner grow with confidence." },
  { icon: Lightbulb, title: "Personalized Learning", desc: "Teaching shaped around each student's pace, goals, and strengths." },
  { icon: ShieldCheck, title: "Quality & Trust", desc: "Experienced educators and consistent standards you can rely on." },
  { icon: Users, title: "Community", desc: "A supportive learning community for students, parents, and tutors." },
  { icon: Target, title: "Outcomes That Matter", desc: "We measure success by real academic and career progress." },
  { icon: Sparkles, title: "Future-Readiness", desc: "Skills and perspective that prepare learners for what's next." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Delphi"
        title="We Make Personalized Learning Accessible To Everyone"
        subtitle="Delphi Education Hub supports learning that shapes understanding, confidence, and a more meaningful life — through teaching built around each student."
        cta={{ label: "Book a Free Call", href: "/contact" }}
      />

      <ImageText
        badge="Our Story"
        title="Learning shaped around the student, not the other way around"
        body="We started Delphi to close the gap between how students actually learn and how they're often taught. By combining expert instruction, modern learning tools, and genuine student-focused support, we help learners of every stage make real, lasting progress."
        bullets={[
          "Founded by educators who care about outcomes",
          "Trusted by 1,200+ students worldwide",
          "Programs across K-12, university, and professional learning",
        ]}
        image={img("student-1.webp")}
        imageAlt="A confident student"
      />

      <Stats />

      <ImageText
        badge="Our Mission"
        title="To help every learner reach their full potential"
        body="Our mission is to deliver personalized, high-quality education that adapts to each learner's needs and pace. We believe that with the right support, every student can thrive academically and beyond."
        image={img("learning-support.webp")}
        imageAlt="A tutor supporting a learner"
        reverse
        tinted
      />

      <ValueGrid
        badge="What We Stand For"
        title="The Values Behind Everything We Do"
        subtitle="Our values guide how we teach, support, and grow alongside every learner."
        values={values}
      />

      <Cta />
    </>
  );
}
