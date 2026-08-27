import type { SiteContent } from "@/content/schema";
import { Container } from "@/shared/components/Container";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { FadeIn } from "@/shared/motion/FadeIn";

interface Props {
  content: SiteContent["story"];
}

export function Story({ content }: Props) {
  return (
    <section id={content.id} className="scroll-mt-28 py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-5">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            titleAccent={content.titleAccent}
            size="lg"
          />
          <blockquote className="relative mt-10 border-l-2 border-led-light pl-6 sm:pl-8">
            <p className="font-display text-xl leading-snug text-balance sm:text-2xl">
              {content.quote.text}
            </p>
            <footer className="mt-4 text-sm tracking-wide text-muted">
              {content.quote.attribution}
            </footer>
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-5 lg:col-span-7 lg:pt-14">
          {content.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="max-w-[62ch] text-base leading-relaxed text-muted sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </FadeIn>
      </Container>
    </section>
  );
}
