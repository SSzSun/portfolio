"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Position in a staggered list; adds 100ms per step. */
  index?: number;
};

/** Fade + translate-Y entry (16px to 0, 480ms ease-out) when scrolled into view. */
export function Reveal({ children, className, index = 0 }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.48, ease: "easeOut", delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
}
