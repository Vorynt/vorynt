import type { SiteContent } from "@/content/schema";
import { Container } from "@/shared/components/Container";

interface Props {
  content: SiteContent["footer"];
}

export function Footer({ content }: Props) {
  const year = new Date().getFullYear().toString();
  const copyright = content.copyright.replace("{year}", year);

  return (
    <footer className="relative py-12 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-led-light to-transparent"
      />
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-[0.18em] uppercase">
            Vorynt
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {content.tagline}
          </p>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-muted transition-colors duration-200 hover:bg-white/8 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
      <Container>
        <p className="mt-8 text-xs tracking-wide text-muted">{copyright}</p>
      </Container>
    </footer>
  );
}
