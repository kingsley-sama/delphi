"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/ui/Motion";

const studentAvatars = [
  "31e5e75ccce0ff3b328f2dfe633a3f59b5c87078.jpg",
  "8f3d3035ed5eb0e101990460570a7eafc7bb7436.jpg",
  "b3e0541217db95984a1cece4123eeabb514b9d10.jpg",
  "83482147ef4830f561369d37e208dae0ce795c3e.jpg",
  "7f3ca6b90540dadaea9991e9ef4ad4e684584024.jpg",
];

export function BootcampHeroImage() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[470px] lg:mx-0 lg:ml-auto">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-white/5 shadow-[0_32px_90px_rgba(0,0,0,0.35)] ring-1 ring-white/15">
        <Image
          src="/employment-readiness/hero.jpeg"
          alt="Professionals representing oil and gas, consulting, and banking and finance careers"
          fill
          priority
          sizes="(max-width: 640px) 92vw, 470px"
          quality={92}
          className="object-cover"
        />

        <motion.div
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          initial={reduced ? false : { x: "0%", opacity: 0 }}
          animate={{ x: "460%", opacity: reduced ? 0 : [0, 0.75, 0] }}
          transition={{
            duration: 1.45,
            delay: 1,
            ease: EASE,
            repeat: reduced ? 0 : Infinity,
            repeatDelay: 4.25,
          }}
          aria-hidden
        />
        <div className="absolute right-3 top-3 rounded-full bg-accent px-4 py-2 text-xs text-ink shadow-lg sm:right-4 sm:top-4">
          <p className="font-semibold">
            <span className="font-bold">40</span> questions
          </p>
        </div>

        <div className="absolute bottom-3 left-3 flex w-[180px] flex-col items-start gap-2 rounded-2xl bg-white px-3 py-2.5 text-[11px] text-ink shadow-xl sm:bottom-5 sm:left-5 sm:w-[205px] sm:gap-3 sm:px-3.5 sm:py-3 sm:text-xs">
          <div className="flex gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
            ))}
          </div>
          <p className="font-normal leading-snug">
            10 questions in each of the four core areas
          </p>
          <div className="flex -space-x-2.5 sm:-space-x-3">
            {studentAvatars.map((file) => (
              <span
                key={file}
                className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white sm:h-[38px] sm:w-[38px]"
              >
                <Image
                  src={`/student_avatars/${file}`}
                  alt=""
                  fill
                  sizes="38px"
                  className="object-cover"
                />
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 right-3 rounded-2xl bg-white px-4 py-3 text-xs text-ink shadow-xl sm:bottom-5 sm:right-5">
          <p className="font-semibold">One Readiness Check</p>
          <p className="text-ink-secondary">Before the invitation arrives</p>
        </div>
      </div>
    </div>
  );
}
