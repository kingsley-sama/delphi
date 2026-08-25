import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { img } from "@/lib/images";

const studentAvatars = [
  "31e5e75ccce0ff3b328f2dfe633a3f59b5c87078.jpg",
  "8f3d3035ed5eb0e101990460570a7eafc7bb7436.jpg",
  "b3e0541217db95984a1cece4123eeabb514b9d10.jpg",
  "83482147ef4830f561369d37e208dae0ce795c3e.jpg",
  "7f3ca6b90540dadaea9991e9ef4ad4e684584024.jpg",
];

export function Hero() {
  return (
    <section className="relative -mt-[72px] overflow-hidden bg-primary-50 pt-[72px]">
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: "url(/images/grid-bg.png)",
          backgroundSize: "1512px auto",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed",
        }}
        aria-hidden
      />
      <Container className="relative grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-0 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-150 px-4 py-2 text-[13px] font-semibold text-brand sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" aria-hidden />
            Free trial classes and free consultation calls
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
            Unlock Your Potential with Personalized{" "}
            <span className="inline-block -rotate-2 rounded-2xl bg-accent px-2 text-ink transition-transform duration-300 ease-out hover:rotate-2">
              Online
            </span>{" "}
            Tutoring
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink-secondary">
            We offer tutoring and academic support services to help learners
            improve through teaching shaped around their needs and pace.
          </p>
          <div className="mt-8">
            <ArrowCta href="/contact">Get Started Today</ArrowCta>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[32px] bg-gradient-to-b from-primary-200 to-primary-100 lg:mx-0 lg:ml-auto lg:max-w-[600px]">
            <Image
              src={img("hero-student.webp")}
              alt="Smiling student holding a notebook and backpack"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="-translate-x-6 translate-y-6 scale-110 object-contain object-[0%_100%] sm:translate-x-0 sm:translate-y-0 sm:scale-100 sm:object-[35%_100%]"
            />
            <div className="absolute right-4 top-2 rounded-2xl bg-active px-4 py-3 text-xs text-white shadow-lg sm:top-4">
              <p className="font-semibold">
                <span className="text-accent">5,000+</span> hours taught
              </p>
            </div>
            <div className="absolute right-4 top-20 flex w-[150px] flex-col items-start gap-2 rounded-2xl bg-white/90 px-2.5 py-2 text-[11px] text-ink shadow-lg backdrop-blur sm:top-28 sm:w-[205px] sm:gap-3 sm:px-3.5 sm:py-3 sm:text-xs">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
                ))}
              </div>
              <p className="font-normal leading-snug">
                Empowering Thousands of Learners Worldwide
              </p>
              <div className="flex -space-x-2.5 sm:-space-x-3">
                {studentAvatars.map((file) => (
                  <span
                    key={file}
                    className="relative h-[28px] w-[28px] overflow-hidden rounded-full border-2 border-white sm:h-[42px] sm:w-[42px]"
                  >
                    <Image
                      src={`/student_avatars/${file}`}
                      alt=""
                      fill
                      sizes="42px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 text-xs text-ink shadow-lg backdrop-blur">
              <p className="font-semibold">Empowering Thousands</p>
              <p className="text-ink-secondary">of Learners Worldwide</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
