"use client";

import type { SiteContent } from "@/content/schema";
import { Button, ButtonLink } from "@/shared/components/Button";
import { Container } from "@/shared/components/Container";
import { LedHorizon } from "@/shared/components/LedHorizon";
import { MotionConfig, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const copyContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.48,
    },
  },
};

const copyItem = {
  hidden: { opacity: 1, y: 18, filter: "blur(100px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

interface Props {
  content: SiteContent["hero"];
  replayLabel: string;
}

export function Hero({ content, replayLabel }: Props) {
  const [playId, setPlayId] = useState(0);
  const [horizonOffset, setHorizonOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const seam = seamRef.current;
    if (!section || !seam) return;

    const update = () => {
      const sectionRect = section.getBoundingClientRect();
      const seamRect = seam.getBoundingClientRect();
      const sectionCenter = sectionRect.top + sectionRect.height / 2;
      const seamCenter = seamRect.top + seamRect.height / 2;
      setHorizonOffset(seamCenter - sectionCenter);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(section);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [playId]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14">
        <LedHorizon replayKey={playId} offsetY={horizonOffset} />

        <motion.div
          key={`veil-${playId}`}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-background motion-reduce:hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.08, ease: easeOutExpo }}
        />

        <Container className="relative z-20 flex h-full flex-col items-center justify-center">
          <motion.div
            key={`copy-${playId}`}
            className="mx-auto mb-24 max-w-4xl text-center"
            variants={copyContainer}
            initial="hidden"
            animate="visible">
            <motion.div variants={copyItem}>
              <p className="font-display text-[0.7rem] font-semibold tracking-[0.32em] text-led-light uppercase">
                {content.eyebrow}
              </p>
            </motion.div>
            <motion.div variants={copyItem}>
              <h1 className="mt-6 mb-0 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                {content.title} <span>{content.titleAccent}</span>
              </h1>
            </motion.div>
            <div ref={seamRef} className="my-5 h-0 sm:my-6" aria-hidden />
            <motion.div variants={copyItem}>
              <p className="mx-auto mt-10 max-w-[65ch] text-base leading-relaxed text-muted">
                {content.description}
              </p>
            </motion.div>
            <motion.div variants={copyItem}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={content.primaryCta.href} size="lg">
                  {content.primaryCta.label}
                </ButtonLink>
                <ButtonLink
                  href={content.secondaryCta.href}
                  variant="secondary"
                  size="lg">
                  {content.secondaryCta.label}
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        </Container>

        <Button
          variant="secondary"
          size="md"
          aria-label={replayLabel}
          className="absolute! right-4 bottom-4 z-20 size-10 px-0 motion-reduce:hidden"
          onClick={() => setPlayId((id) => id + 1)}>
          <ReplayIcon />
        </Button>
      </section>
    </MotionConfig>
  );
}

function ReplayIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12a7.5 7.5 0 1 1 2.1 5.2M4.5 12V6.75M4.5 12H9.75"
      />
    </svg>
  );
}
