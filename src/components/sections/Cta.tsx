import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Cta({
  title = "Start Your Learning Journey With Us Today",
  text = "Join a growing community of learners and gain the skills, support, and confidence needed to achieve your academic and career goals.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    // Full-bleed band: no container, gutter or corner radius, so the artwork
    // runs edge to edge. bg-brand backs it while the image loads.
    <section className="relative overflow-hidden bg-brand">
      <Image
        src="/homepage_assets/cta_enroll_now.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* The artwork keeps its middle clear, with shapes in the corners, so the
          copy is centred to stay off them. */}
      <div className="relative flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-24">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-base text-white/85">{text}</p>
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
    </section>
  );
}
