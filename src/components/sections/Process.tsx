import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const defaultSteps = [
  { title: "Book a free call", desc: "Tell us your goals and we'll understand where you are today." },
  { title: "Get a learning plan", desc: "We match you with the right tutor and a plan built around your pace." },
  { title: "Start learning", desc: "Begin live, personalized sessions with ongoing support." },
  { title: "Track your progress", desc: "Regular feedback and tracking keep you moving toward your goals." },
];

export function Process({
  badge = "How We Work",
  title = "A Simple Path To Real Progress",
  subtitle,
  steps = defaultSteps,
}: {
  badge?: string;
  title?: string;
  subtitle?: string;
  steps?: { title: string; desc: string }[];
}) {
  return (
    <section className="bg-primary-50 py-14 sm:py-20">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink sm:mt-5 sm:text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
