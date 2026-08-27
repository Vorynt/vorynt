"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface Props extends HTMLMotionProps<"div"> {
  delay?: number;
  children: ReactNode;
}

export function FadeIn({ delay = 0, children, className, ...props }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.2 : 0.55,
        delay: reduce ? 0 : delay,
        ease: easeOutExpo,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
