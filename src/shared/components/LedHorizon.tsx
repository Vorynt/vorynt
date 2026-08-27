"use client";

import { motion } from "motion/react";

interface Props {
  replayKey?: number;
  offsetY?: number;
}

export function LedHorizon({ replayKey = 0, offsetY = 0 }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 grid grid-cols-2"
        style={{ transform: `translateY(${offsetY}px) scale(1.5)` }}>
        <motion.div
          key={`first-${replayKey}`}
          className="h-full w-full"
          initial={{
            background:
              "conic-gradient(from 90deg, black 100%, var(--color-led) 95%, var(--color-accent) 100%)",
          }}
          animate={{
            background: [
              "conic-gradient(from 90deg, black 100%, var(--color-led) 95%, var(--color-accent) 100%)",
              "conic-gradient(from 90deg, black 75%, var(--color-led) 95%, var(--color-accent) 100%)",
              "conic-gradient(from 90deg, black 50%, var(--color-led) 95%, var(--color-accent) 100%)",
              "conic-gradient(from 90deg, black 25%, var(--color-led) 95%, var(--color-accent) 100%)",
              "conic-gradient(from 90deg, black 0%, var(--color-led) 95%, var(--color-accent) 100%)",
            ],
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
          }}
        />
        <motion.div
          key={`second-${replayKey}`}
          className="h-full w-full"
          initial={{
            background:
              "conic-gradient(from 270deg, var(--color-accent) 0%, var(--color-led) 5%, black 5%)",
          }}
          animate={{
            background: [
              "conic-gradient(from 270deg, var(--color-accent) 0%, var(--color-led) 5%, black 0%)",
              "conic-gradient(from 270deg, var(--color-accent) 0%, var(--color-led) 5%, black 25%)",
              "conic-gradient(from 270deg, var(--color-accent) 0%, var(--color-led) 5%, black 50%)",
              "conic-gradient(from 270deg, var(--color-accent) 0%, var(--color-led) 5%, black 75%)",
              "conic-gradient(from 270deg, var(--color-accent) 0%, var(--color-led) 5%, black 100%)",
            ],
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
