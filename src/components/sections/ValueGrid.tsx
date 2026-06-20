import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type Value = { icon: LucideIcon; title: string; desc: string };

export function ValueGrid({
  badge,
  title,
  subtitle,
  values,
  columns = 3,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  values: Value[];
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 4
      ? "lg:grid-cols-4"
      : columns === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading badge={badge} title={title} subtitle={subtitle} />
        <div className={`mt-8 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5 ${cols}`}>
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-neutral-200 bg-primary-50 p-5 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-200 text-brand sm:h-12 sm:w-12">
                <v.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink sm:mt-5 sm:text-xl">{v.title}</h3>
              <p className="mt-2 text-sm text-ink-secondary sm:text-base">{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
