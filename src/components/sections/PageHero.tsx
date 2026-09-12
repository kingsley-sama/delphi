import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import { HeroImageReveal } from "@/components/sections/HeroImageReveal";

export function PageHero({
  badge,
  title,
  subtitle,
  cta,
  image,
  imageAlt,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative -mt-[var(--header-h)] overflow-hidden bg-primary-50 pt-[var(--header-h)]">
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: "url(/images/grid-bg.png)", backgroundSize: "cover" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white"
        aria-hidden
      />
      <Container
        className={`relative py-12 sm:py-16 lg:py-24 ${
          image
            ? "grid items-center gap-12 text-center lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:text-left"
            : "flex flex-col items-center text-center"
        }`}
      >
        <div className={image ? "flex flex-col items-center lg:items-start" : "contents"}>
          {badge && <Badge>{badge}</Badge>}
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[56px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-ink-secondary">{subtitle}</p>
          )}
          {cta && (
            <Button href={cta.href} variant="primary" className="mt-8 gap-2">
              {cta.label}
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          )}
        </div>
        {image && <HeroImageReveal src={image} alt={imageAlt ?? ""} />}
      </Container>
    </section>
  );
}
