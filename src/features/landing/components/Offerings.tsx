import type { SiteContent } from "@/content/schema";
import { ButtonLink } from "@/shared/components/Button";
import { Container } from "@/shared/components/Container";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { FadeIn } from "@/shared/motion/FadeIn";
import { cn } from "@/shared/utils/cn";

interface Props {
  content: SiteContent["offerings"];
}

export function Offerings({ content }: Props) {
  return (
    <section id={content.id} className="scroll-mt-28 pt-24 pb-20 sm:pt-32 sm:pb-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            titleAccent={content.titleAccent}
            description={content.description}
          />
        </FadeIn>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {content.items.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={index * 0.08}
              className={cn(
                item.id === "custom" ? "lg:col-span-7" : "lg:col-span-5",
                item.id === "quality" &&
                  "lg:border-l lg:border-led-light/25 lg:pl-12",
              )}
            >
              <article>
                <p className="font-display text-[0.65rem] tracking-[0.24em] text-led-light uppercase">
                  {item.kicker}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  {item.title}
                </h3>
                {item.productName ? (
                  <p className="mt-2 text-sm text-muted">{item.productName}</p>
                ) : null}
                <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">
                  {item.description}
                </p>
                <ul className="mt-7 space-y-3.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-4 text-sm leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-px w-6 shrink-0 bg-led-light"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                {item.cta ? (
                  <ButtonLink
                    href={item.cta.href}
                    variant="secondary"
                    className="mt-8"
                  >
                    {item.cta.label}
                  </ButtonLink>
                ) : null}
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
