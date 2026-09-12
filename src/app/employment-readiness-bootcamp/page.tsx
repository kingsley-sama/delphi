import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import {
  BarChart3,
  BookOpen,
  Brain,
  Calculator,
  CalendarDays,
  Check,
  ClipboardCheck,
  Handshake,
  Library,
  LineChart,
  Search,
  Users,
  Video,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";
import { BootcampDetails } from "./BootcampDetails";
import { Facilitators } from "./Facilitators";
import { BootcampHeroImage } from "./BootcampHeroImage";

// Points at contact until the real assessment form exists. Change this one
// constant and every CTA on the page follows.
const ASSESSMENT_HREF = "/contact";
const REGISTER_HREF =
  "https://wa.me/2349167542539?text=Hello%20Delphi%20Education%20Hub%2C%0A%0AI%20would%20like%20to%20register%20for%20the%20Employment%20Prep%20Bootcamp.%0A%0AFull%20name%3A%0AEmail%20address%3A%0ACurrent%20occupation%2Fstatus%3A%0A%0AMy%20preferred%20payment%20option%20is%3A%0A%5B%20%5D%20%E2%82%A612%2C000%20per%20month%0A%5B%20%5D%20%E2%82%A630%2C000%20once%20for%20the%20full%20three%20months%0A%0APlease%20send%20me%20the%20payment%20and%20onboarding%20details.%20Thank%20you";

export const metadata: Metadata = {
  title: "Employment Aptitude Test Bootcamp — Delphi Education Hub",
  description:
    "Build the four core skills behind graduate aptitude tests — numerical, verbal, logical and data interpretation. Live classes, timed mocks and a free readiness assessment.",
};

// Split per word so each slides up from behind its own mask, as on the home page.
const headingParts = [
  { text: "How" },
  { text: "Ready" },
  { text: "Are" },
  { text: "You" },
  { text: "For" },
  { text: "Your" },
  { text: "Next", badge: true },
  { text: "Aptitude" },
  { text: "Test?" },
];

const coreSkills = [
  {
    icon: Calculator,
    title: "Numerical / Quantitative Reasoning",
    desc: "Percentages, ratios, averages, profit & loss, sequences, basic arithmetic and quantitative problems.",
  },
  {
    icon: BookOpen,
    title: "Verbal Reasoning",
    desc: "Reading comprehension, conclusions, assumptions, vocabulary and interpreting written information.",
  },
  {
    icon: Brain,
    title: "Logical / Abstract Reasoning",
    desc: "Patterns, sequences, relationships and identifying what comes next.",
  },
  {
    icon: BarChart3,
    title: "Data Interpretation & Analysis",
    desc: "Tables, graphs, charts and extracting information quickly.",
  },
];

const sectors = [
  {
    name: "Oil & Gas",
    image: "/employment-readiness/sectors/oil-gas.webp",
    imageAlt: "Oil and gas engineer inspecting refinery equipment",
  },
  {
    name: "Consulting",
    image: "/employment-readiness/sectors/consulting.webp",
    imageAlt: "Consultants collaborating on a strategy and data analysis project",
  },
  {
    name: "Banking & Finance",
    image: "/employment-readiness/sectors/banking-finance.webp",
    imageAlt: "Finance professionals reviewing market and financial data",
  },
];

const coreFeatures = [
  {
    icon: Video,
    title: "Expert teaching",
    desc: "Live instructor-led classes, with every session recorded so you can go back over anything.",
  },
  {
    icon: Library,
    title: "Quality practice bank",
    desc: "Rich, organised practice material across all four core areas — not a pile of random questions.",
  },
  {
    icon: LineChart,
    title: "Mock tests & progress tracking",
    desc: "Timed mock assessments, so you can compare your results rather than just your effort.",
  },
  {
    icon: Users,
    title: "Long-term job preparation community",
    desc: "Lifetime access to the preparation community — it stays with you until you are employed.",
  },
  {
    icon: Handshake,
    title: "Recruitment professionals interaction",
    desc: "Sessions with recruitment professionals who see these assessments from the hiring side.",
  },
  {
    icon: Search,
    title: "Speed under timing",
    desc: "Timed practice builds the pace and decision-making rhythm you need without sacrificing accuracy.",
  },
  {
    icon: ClipboardCheck,
    title: "Mistake diagnosis",
    desc: "Understand why an answer was wrong, correct the underlying skill and turn practice into score improvement.",
  },
];

const pricing = [
  { price: "₦12,000", unit: "per month", note: "Pay as you go, month by month." },
  {
    price: "₦30,000",
    unit: "for 3 months",
    note: "The full bootcamp up front.",
    featured: true,
  },
];

export default function BootcampPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative -mt-[var(--header-h)] overflow-hidden bg-[#012a17] pt-[var(--header-h)]">
        {/* Hero — the home page hero, colour-inverted onto the deep green. */}
        <section className="relative">
          {/* The shared grid-bg.png is baked in pale green, so the lines are
              drawn in CSS instead — same 60px on-screen pitch as the home page
              (the PNG is 120px at 2x), but in the lemon accent. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(156,247,71,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(156,247,71,0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
            }}
            aria-hidden
          />
          {/* Dissolves the lines into the deep green before the hero ends. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#012a17] sm:h-56"
            aria-hidden
          />
        <Container className="relative grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="text-center lg:text-left">
            <span className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] font-semibold text-accent sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              Employment Aptitude Test Bootcamp
            </span>
            <h1 className="mt-6 text-[42px] font-bold leading-[1.06] tracking-tight text-white min-[400px]:text-[46px] sm:text-5xl lg:text-[56px]">
              {headingParts.map((part, i) => (
                <Fragment key={part.text}>
                  <span className="inline-block -my-[0.25em] overflow-hidden py-[0.25em] align-bottom">
                    <span
                      className="inline-block animate-reveal-up"
                      style={{ animationDelay: `${120 + i * 70}ms` }}
                    >
                      {part.badge ? (
                        <span className="inline-block -rotate-2 rounded-2xl bg-accent px-2 text-ink transition-transform duration-300 ease-out hover:rotate-2">
                          {part.text}
                        </span>
                      ) : (
                        part.text
                      )}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
            </h1>
            <p
              className="mx-auto mt-5 max-w-lg animate-fade-up text-[19px] text-white/75 sm:text-lg lg:mx-0"
              style={{ animationDelay: "700ms" }}
            >
              Don&apos;t wait until you receive a test invitation to find out. Take the
              free readiness assessment across all four core areas.
            </p>
            <div
              className="mt-8 flex animate-fade-up flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={{ animationDelay: "800ms" }}
            >
              <ArrowCta href={ASSESSMENT_HREF} inverted>
                Take Free Readiness Test
              </ArrowCta>
              <a
                href={REGISTER_HREF}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-white/10 sm:px-7 sm:py-3.5"
              >
                Register for Bootcamp
              </a>
            </div>
          </div>

          <BootcampHeroImage />
        </Container>
        </section>
      </div>

      {/* Sectors we prepare for, plus the headline duration. */}
      <section className="py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              badge="Where This Takes You"
              title="Let's Get You Closer To Your Dream Career In:"
            />
          </Reveal>
          <RevealGroup className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            {sectors.map((sector) => (
              <RevealItem
                key={sector.name}
                className="group overflow-hidden rounded-3xl border border-neutral-200 bg-primary-50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={sector.image}
                    alt={sector.imageAlt}
                    fill
                    sizes="(max-width: 640px) 92vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-brand/25 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="px-5 py-4 text-center sm:px-5 sm:py-5">
                  <p className="text-lg font-bold leading-tight text-ink sm:text-xl lg:text-2xl">
                    {sector.name}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-6 flex flex-col items-center gap-3 rounded-[24px] bg-brand px-6 py-6 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent">
              <CalendarDays className="h-6 w-6" />
            </span>
            <p className="text-lg font-semibold text-white sm:text-xl">
              The bootcamp runs for <span className="text-accent">3 months</span> — foundation
              training, practice and timed mocks, end to end.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The four assessment areas use the page's original destination-card treatment. */}
      <section className="py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              badge="What You Should Prepare For"
              title="Master The 4 Core Skills"
              subtitle="Think aptitude tests are just about being good at Maths? They're not. Four areas, four different skill sets — preparing for all of them the same way doesn't work."
            />
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
            {coreSkills.map((f) => (
              <RevealItem
                key={f.title}
                className="flex flex-col items-center rounded-3xl border border-neutral-200 bg-primary-50 px-3 py-6 text-center sm:px-6 sm:py-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-accent sm:h-14 sm:w-14">
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink sm:mt-5 sm:text-lg">
                  {f.title}
                </h3>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Core features of the programme. */}
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              badge="Core Features"
              title="What You Get On The Bootcamp"
              subtitle="Don't just practise hundreds of questions — build the skills behind them, with the support to keep going."
            />
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {coreFeatures.map((f) => (
              <RevealItem
                key={f.title}
                className="rounded-3xl border border-neutral-200 bg-primary-50 p-5 sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-accent sm:h-14 sm:w-14">
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink sm:mt-5 sm:text-xl">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-ink-secondary sm:text-base">{f.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10 flex justify-center sm:mt-12">
            <ArrowCta href={ASSESSMENT_HREF}>Take Free Readiness Test</ArrowCta>
          </Reveal>
        </Container>
      </section>

      <div className="bg-[#012a17]">
        <Facilitators />
      </div>

      {/* Pricing — the home page's curriculum card grid. */}
      <section className="py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              badge="Pricing"
              title="Choose How You Want To Pay"
              subtitle="Every option includes the full bootcamp and lifetime access to the preparation community."
            />
          </Reveal>
          <RevealGroup className="mx-auto mt-8 grid max-w-[760px] gap-5 sm:mt-12 sm:grid-cols-2">
            {pricing.map((plan) => (
              <RevealItem
                key={plan.unit}
                className={cn(
                  "flex flex-col overflow-hidden rounded-[24px] p-7 sm:p-8",
                  plan.featured ? "bg-brand" : "border border-neutral-200 bg-white",
                )}
              >
                {plan.featured && (
                  <span className="mb-4 self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                    Best value
                  </span>
                )}
                <p
                  className={cn(
                    "text-4xl font-bold tracking-tight sm:text-5xl",
                    plan.featured ? "text-accent" : "text-ink",
                  )}
                >
                  {plan.price}
                </p>
                <p
                  className={cn(
                    "mt-2 text-base font-semibold",
                    plan.featured ? "text-white" : "text-ink",
                  )}
                >
                  {plan.unit}
                </p>
                <p
                  className={cn(
                    "mt-3 flex-1 text-[15px]",
                    plan.featured ? "text-white/70" : "text-ink-secondary",
                  )}
                >
                  {plan.note}
                </p>
                <div className="mt-7 flex justify-center">
                  <ArrowCta href={REGISTER_HREF} inverted={plan.featured}>
                    Register
                  </ArrowCta>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-6 flex items-start gap-3 rounded-[24px] border border-accent bg-accent/10 px-6 py-5">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={3} />
            <p className="text-base font-semibold text-ink">
              Referral package —{" "}
              <span className="font-normal text-ink-secondary">
                refer someone who registers and receive 10% of your bootcamp payment.
              </span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Registration now opens a pre-filled WhatsApp conversation; there is no form. */}
      <section id="register" className="scroll-mt-24 bg-brand py-16 sm:py-24">
        <RevealGroup className="mx-auto flex w-full max-w-[1312px] flex-col items-center px-6 text-center min-[400px]:px-7 sm:px-8">
          <RevealItem>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-brand">
            <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
            Limited slots — 50 available
          </span>
          </RevealItem>
          <RevealItem>
          <h2 className="mt-6 max-w-3xl text-[32px] font-bold leading-tight text-white min-[400px]:text-[36px] sm:text-4xl lg:text-[52px]">
            Register Now And Start Preparing Before The Invitation Arrives
          </h2>
          </RevealItem>
          <RevealItem>
          <p className="mt-5 max-w-2xl text-[17px] text-white/70 sm:text-lg">
            Three months of foundation training, practice and timed mocks — built around
            the four core areas every graduate aptitude test measures.
          </p>
          </RevealItem>
          <RevealItem className="mt-9">
            <a
              href={REGISTER_HREF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-base font-medium text-brand"
            >
              Register On WhatsApp
            </a>
          </RevealItem>
        </RevealGroup>
      </section>

      <BootcampDetails />
    </>
  );
}
