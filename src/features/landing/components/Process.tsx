import type { SiteContent } from "@/content/schema";
import { Container } from "@/shared/components/Container";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { FadeIn } from "@/shared/motion/FadeIn";
import { cn } from "@/shared/utils/cn";

interface Props {
  content: SiteContent["process"];
}

export function Process({ content }: Props) {
  return (
    <section id={content.id} className="scroll-mt-28 py-24 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            titleAccent={content.titleAccent}
            description={content.description}
          />
        </FadeIn>

        <ol className="relative mt-16">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-0 w-px bg-linear-to-b from-led-light via-led to-led/20"
          />
          {content.steps.map((step, index) => {
            const previous = content.steps[index - 1];
            const showPhase = step.phase !== previous?.phase;

            return (
              <li
                key={step.number}
                className={cn("relative", showPhase && index > 0 && "mt-10")}
              >
                {showPhase ? (
                  <p className="mb-2 pl-10 font-display text-[0.65rem] tracking-[0.28em] text-led-light uppercase sm:pl-14">
                    {step.phase}
                  </p>
                ) : null}
                <div className="relative pl-10 sm:pl-14">
                  <span
                    aria-hidden
                    className="absolute top-8 left-0 size-1.5 -translate-x-1/2 rounded-full bg-led-light shadow-[0_0_12px_var(--led-soft)]"
                  />
                  <FadeIn delay={Math.min(index * 0.04, 0.28)}>
                    <div className="grid gap-3 py-5 sm:grid-cols-[7.5rem_1fr] sm:items-start sm:gap-8">
                      <p
                        aria-hidden
                        className="font-display text-5xl leading-none font-semibold tracking-tight text-led-light/25 sm:text-6xl"
                      >
                        {step.number}
                      </p>
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                          <span className="sr-only">{step.number}. </span>
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">
                          {step.description}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed">
                          <span className="font-display text-[0.65rem] tracking-[0.2em] text-led-light uppercase">
                            {content.deliverableLabel}
                          </span>
                          <span className="text-muted">
                            {" "}
                            · {step.deliverable}
                          </span>
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
