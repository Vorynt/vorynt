import type { SiteContent } from "@/content/schema";
import { Container } from "@/shared/components/Container";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { FadeIn } from "@/shared/motion/FadeIn";
import { TechCarousel } from "./TechCarousel";

interface Props {
  content: SiteContent["technologies"];
}

export function Technologies({ content }: Props) {
  return (
    <section id={content.id} className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            titleAccent={content.titleAccent}
            description={content.description}
            size="sm"
          />
        </FadeIn>
      </Container>

      <div className="mt-12 space-y-8">
        {content.tracks.map((track, index) => (
          <FadeIn key={track.label} delay={index * 0.06}>
            <TechCarousel track={track} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
