"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/ui/Motion";

export function BootcampHeroImage() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[470px] lg:mx-0 lg:ml-auto"
      initial={reduced ? false : { opacity: 0, x: 52, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
    >
      <motion.div
        className="absolute -inset-3 translate-x-3 translate-y-3 rounded-[34px] border border-accent/25 bg-accent/10 sm:-inset-4 sm:translate-x-4 sm:translate-y-4"
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: EASE }}
        aria-hidden
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-white/5 shadow-[0_32px_90px_rgba(0,0,0,0.35)] ring-1 ring-white/15">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.055 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
        >
          <Image
            src="/employment-readiness/three-key-sectors-portrait.webp"
            alt="Professionals representing oil and gas, consulting, and banking and finance careers"
            fill
            priority
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 470px, 42vw"
            quality={92}
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          initial={reduced ? false : { x: "0%", opacity: 0 }}
          animate={{ x: "460%", opacity: reduced ? 0 : [0, 0.75, 0] }}
          transition={{ duration: 1.45, delay: 1, ease: EASE }}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
