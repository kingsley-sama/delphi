"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Apple-ish easing: a long decelerating curve with no overshoot. Matches the
 * `cubic-bezier(0.16, 1, 0.3, 1)` already used by the nav panel and modals, so
 * scroll reveals and UI transitions share one feel.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Triggers slightly before the element is fully in view, and only once. */
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** A single block that rises and fades in as it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled, in px. Larger for hero-scale blocks, smaller for rows. */
  y?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent for a set of items that should arrive one after another. Pair with
 * `RevealItem` — the stagger is driven by variants so the children stay in
 * document order regardless of how they are laid out.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: reduced
        ? {}
        : { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** A child of `RevealGroup`. Rises, fades and settles from a slight scale. */
export function RevealItem({
  children,
  className,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  const item: Variants = {
    hidden: reduced ? {} : { opacity: 0, y, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: EASE },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked drift for imagery. Deliberately small — Apple's parallax reads
 * as depth rather than movement, and a large offset just looks like a glitch.
 */
export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      initial={{ y: distance * 0.5 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
