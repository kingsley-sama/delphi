import { Container } from "@/components/ui/Container";

const defaultStats = [
  { value: "1,200+", label: "Students worldwide" },
  { value: "50+", label: "Expert tutors" },
  { value: "15+", label: "Curricula covered" },
  { value: "98%", label: "Satisfaction rate" },
];

export function Stats({ stats = defaultStats }: { stats?: { value: string; label: string }[] }) {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-6 rounded-3xl bg-brand px-6 py-8 text-center text-white sm:py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold lg:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
