"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal. Uses the one shared easing curve so every animation
 * on the site feels like it came from the same hand. `prefers-reduced-motion`
 * is handled globally in globals.css, which collapses the duration to ~0.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      // Motion server-renders `initial` as an inline opacity:0, so without JS
      // every revealed section would be invisible. The `data-reveal` hook lets
      // the <noscript> rule in the root layout force these back to visible.
      data-reveal=""
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
