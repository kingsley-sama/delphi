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
    // runs edge to edge. The min-heights let the 16:9 artwork breathe instead of
    // being cropped to a strip by the copy's own height. bg-brand backs it while
    // the image loads.
    <section className="relative flex min-h-[440px] items-center overflow-hidden bg-brand sm:min-h-[560px] lg:min-h-[680px] xl:min-h-[760px]">
      <Image
        src="/homepage_assets/cta_enroll_now.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* The artwork keeps its middle clear, with shapes in the corners, so the
          copy is centred to stay off them. */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-20 text-center sm:px-12 lg:py-28">
        <h2 className="max-w-4xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-[68px]">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl lg:text-[22px]">
          {text}
        </p>
        <a
          href="/contact"
          className="mt-10 inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-8 py-4 text-lg font-medium text-brand transition-colors hover:bg-primary-100"
        >
          Get Started Today
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
            <ArrowUpRight className="h-4.5 w-4.5" />
          </span>
        </a>
      </div>
    </section>
  );
}
