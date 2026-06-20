import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { img } from "@/lib/images";

export function Cta({
  title = "Start Your Learning Journey With Us Today",
  text = "Join a growing community of learners and gain the skills, support, and confidence needed to achieve your academic and career goals.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid overflow-hidden rounded-[32px] bg-brand md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-base text-white/80">{text}</p>
            <a
              href="/contact"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-brand transition-colors hover:bg-primary-100"
            >
              Get Started Today
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
          <div className="relative min-h-[200px] sm:min-h-[260px]">
            <Image
              src={img("cta-family.webp")}
              alt="Father and son learning together"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
