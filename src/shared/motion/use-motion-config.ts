"use client";

import { useReducedMotion } from "motion/react";

export function useMotionConfig() {
  const reduce = useReducedMotion();

  return {
    reduce: Boolean(reduce),
    duration: reduce ? 0.2 : 0.5,
    ease: [0.16, 1, 0.3, 1] as const,
  };
}
