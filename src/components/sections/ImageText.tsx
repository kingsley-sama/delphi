import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export function ImageText({
  badge,
  title,
  body,
  bullets,
  image,
  imageAlt,
  reverse = false,
  tinted = false,
}: {
  badge?: string;
  title: string;
  body: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  tinted?: boolean;
}) {
  return (
    <section className={cn("py-12 sm:py-16", tinted && "bg-primary-50")}>
      <Container>
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2">
          <div className={cn("relative aspect-[4/3] overflow-hidden rounded-3xl", reverse && "lg:order-2")}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
            />
          </div>
          <div className={cn(reverse && "lg:order-1")}>
            {badge && <Badge>{badge}</Badge>}
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base text-ink-secondary sm:text-lg">{body}</p>
            {bullets && (
              <ul className="mt-6 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-base text-ink-secondary">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 text-brand">
                      <Check className="h-4 w-4" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
