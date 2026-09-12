"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/ui/Motion";

export function HeroImageReveal({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none"
      initial={
        reduced
          ? false
          : { opacity: 0, y: 36, scale: 0.96, clipPath: "inset(12% 0 12% 0 round 28px)" }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0% 0 0% 0 round 28px)",
      }}
      transition={{ duration: 1.05, delay: 0.25, ease: EASE }}
    >
      <div
        className="absolute -inset-3 translate-x-3 translate-y-3 rounded-[28px] bg-primary-200 sm:-inset-4 sm:translate-x-4 sm:translate-y-4"
        aria-hidden
      />
      <div className="relative aspect-[1280/833] overflow-hidden rounded-[24px] bg-primary-100 shadow-[0_24px_70px_rgba(1,61,33,0.18)] ring-1 ring-brand/10">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 48vw, (min-width: 640px) 80vw, 92vw"
          className="object-cover"
        />
        <motion.div
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          initial={reduced ? false : { x: "0%", opacity: 0 }}
          animate={{ x: "450%", opacity: reduced ? 0 : [0, 0.8, 0] }}
          transition={{ duration: 1.35, delay: 0.8, ease: EASE }}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
