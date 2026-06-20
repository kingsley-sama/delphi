import {
  BookOpen,
  GraduationCap,
  Trophy,
  Target,
  Laptop,
  Palette,
  MessagesSquare,
  Rocket,
  Briefcase,
  LineChart,
  Award,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { FaqItem } from "@/components/sections/Faq";
import { img } from "@/lib/images";

export type Program = {
  slug: string;
  name: string;
  badge: string;
  hero: string;
  heroSub: string;
  image: string;
  overviewTitle: string;
  overviewBody: string;
  overviewBullets: string[];
  featuresTitle: string;
  featuresSub: string;
  features: { icon: LucideIcon; title: string; desc: string }[];
  faqs: FaqItem[];
};

export const programData: Record<string, Program> = {
  prep: {
    slug: "prep",
    name: "Delphi Prep",
    badge: "Delphi Prep",
    hero: "Exam Preparation That Builds Real Confidence",
    heroSub:
      "Focused preparation for major exams, admissions tests, certifications, and academic assessments across American, British, Canadian, Nigerian and international curricula.",
    image: img("prog-prep.webp"),
    overviewTitle: "Strategic, structured coaching for every exam",
    overviewBody:
      "We help students prepare for national, international, professional, and university entrance examinations with proven strategies, targeted practice, and personalized feedback.",
    overviewBullets: [
      "Diagnostic assessment and personalized study plan",
      "Targeted practice with real exam conditions",
      "Strategy coaching and progress tracking",
    ],
    featuresTitle: "What's Included",
    featuresSub: "Everything a student needs to walk into the exam prepared.",
    features: [
      { icon: Target, title: "Personalized Plan", desc: "A study roadmap built around the target exam and timeline." },
      { icon: BookOpen, title: "Practice & Review", desc: "Mock tests, past questions, and detailed performance reviews." },
      { icon: Trophy, title: "Exam Strategy", desc: "Time management, question approach, and confidence building." },
      { icon: GraduationCap, title: "Expert Coaches", desc: "Tutors experienced with each curriculum and exam board." },
    ],
    faqs: [
      { q: "Which exams do you prepare students for?", a: "SAT, AP, IB, SSAT, ISEE, EQAO, provincial and ministerial exams, university entrance, and professional certifications." },
      { q: "How long does preparation take?", a: "It depends on the exam and starting point — we build a timeline during your free consultation." },
      { q: "Are sessions one-on-one?", a: "Yes, we offer both one-on-one and small-group preparation depending on your preference." },
    ],
  },
  academics: {
    slug: "academics",
    name: "Delphi Academics",
    badge: "Delphi Academics",
    hero: "Academic Support For Stronger, More Confident Students",
    heroSub:
      "Comprehensive academic support through tutoring, homework guidance, research support, enrichment, and learning coaching.",
    image: img("prog-academics.webp"),
    overviewTitle: "Support that keeps students academically strong",
    overviewBody:
      "From day-to-day homework to deeper subject mastery, we provide the structured support students need to stay strong and keep improving across every subject.",
    overviewBullets: [
      "School-complementing lessons across subjects",
      "Homework guidance and assignment support",
      "Enrichment and learning coaching",
    ],
    featuresTitle: "What's Included",
    featuresSub: "Well-rounded academic support tailored to each learner.",
    features: [
      { icon: BookOpen, title: "Subject Tutoring", desc: "Math, English, Sciences, and more with experienced tutors." },
      { icon: GraduationCap, title: "Homework Help", desc: "Guidance that builds understanding, not just answers." },
      { icon: LineChart, title: "Progress Tracking", desc: "Regular feedback so students and parents see real growth." },
      { icon: Users, title: "Learning Coaching", desc: "Study skills, organization, and motivation support." },
    ],
    faqs: [
      { q: "Which subjects do you cover?", a: "Mathematics, English, Sciences, Computer Science & Coding, History, Foreign Languages, and more." },
      { q: "Do you support school curricula?", a: "Yes — our lessons complement American, British, Canadian, Nigerian, and international curricula." },
      { q: "Can parents track progress?", a: "Yes, we provide regular feedback and progress reports throughout the program." },
    ],
  },
  upskill: {
    slug: "upskill",
    name: "Delphi UpSkill",
    badge: "Delphi UpSkill",
    hero: "Future-Ready Skills For Modern Life And Work",
    heroSub:
      "Future-ready programs in digital skills, technology, creative disciplines, communication, and practical competencies for modern life and work.",
    image: img("prog-upskill.webp"),
    overviewTitle: "Practical skills that matter in today's world",
    overviewBody:
      "We help learners build high-value, future-focused competencies — from technology and digital skills to creative and communication abilities that open real opportunities.",
    overviewBullets: [
      "Hands-on, project-based learning",
      "Digital, creative, and communication skills",
      "Flexible paths for students and adults",
    ],
    featuresTitle: "What You'll Build",
    featuresSub: "Skills designed to prepare you for future opportunities.",
    features: [
      { icon: Laptop, title: "Digital & Tech Skills", desc: "Coding, tools, and technology fundamentals for the modern world." },
      { icon: Palette, title: "Creative Disciplines", desc: "Design, media, and creative problem-solving." },
      { icon: MessagesSquare, title: "Communication", desc: "Confident writing, speaking, and collaboration." },
      { icon: Rocket, title: "Practical Projects", desc: "Apply skills to real-world projects that build a portfolio." },
    ],
    faqs: [
      { q: "Who is UpSkill for?", a: "Students, graduates, and working adults looking to build practical, future-ready skills." },
      { q: "Are the programs project-based?", a: "Yes — you'll apply what you learn to real projects throughout the program." },
      { q: "Do I need prior experience?", a: "No. We offer paths for beginners through to more advanced learners." },
    ],
  },
  career: {
    slug: "career",
    name: "Delphi Career",
    badge: "Delphi Career",
    hero: "Guidance And Coaching For The Next Chapter",
    heroSub:
      "Professional learning, certification, workplace skills, and career development programs designed for long-term growth and advancement.",
    image: img("prog-career.webp"),
    overviewTitle: "Prepare for certifications and career growth",
    overviewBody:
      "We help students, graduates, and professionals prepare for certifications and advance their careers with practical coaching, workplace skills, and clear guidance.",
    overviewBullets: [
      "Certification and professional exam prep",
      "Workplace and employability skills",
      "Career guidance and coaching",
    ],
    featuresTitle: "What's Included",
    featuresSub: "Support designed for long-term professional growth.",
    features: [
      { icon: Briefcase, title: "Workplace Skills", desc: "Practical competencies that employers value." },
      { icon: Award, title: "Certifications", desc: "Preparation for recognized professional certifications." },
      { icon: Target, title: "Career Coaching", desc: "Guidance on direction, applications, and interviews." },
      { icon: LineChart, title: "Growth Planning", desc: "A clear plan for long-term advancement." },
    ],
    faqs: [
      { q: "Who is Delphi Career for?", a: "Students, graduates, and professionals preparing for certifications or career advancement." },
      { q: "Do you help with certifications?", a: "Yes — we offer preparation for a range of professional certifications." },
      { q: "Is career coaching included?", a: "Yes, coaching and guidance are a core part of the program." },
    ],
  },
};

export const programSlugs = Object.keys(programData);
