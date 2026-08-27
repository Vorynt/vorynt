import { getSiteContent } from "@/content/get-site";
import type { Locale } from "@/content/schema";
import { SectionSeam } from "@/shared/components/SectionSeam";
import {
  ContactForm,
  Footer,
  Header,
  Hero,
  JsonLd,
  Offerings,
  Process,
  Story,
  Technologies,
} from "@/features/landing";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const site = await getSiteContent(locale as Locale);

  return (
    <>
      <JsonLd description={site.jsonLd.description} locale={locale} />
      <main id="conteudo">
        <Header content={site.header} chrome={site.chrome} />
        <Hero
          content={site.hero}
          replayLabel={site.chrome.replayHeroAnimation}
        />
        <SectionSeam />
        <Offerings content={site.offerings} />
        <SectionSeam />
        <Process content={site.process} />
        <SectionSeam />
        <Technologies content={site.technologies} />
        <SectionSeam />
        <Story content={site.story} />
        <SectionSeam />
        <ContactForm content={site.contact} locale={locale} />
      </main>
      <Footer content={site.footer} />
    </>
  );
}
