import { getSiteContent } from "@/content/get-site";
import type { Locale } from "@/content/schema";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Source_Sans_3, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const site = await getSiteContent(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vorynt.app.br";
  const canonical =
    locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: site.seo.title,
    description: site.seo.description,
    keywords: site.seo.keywords,
    openGraph: {
      title: site.seo.ogTitle,
      description: site.seo.ogDescription,
      siteName: site.seo.siteName,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.ogTitle,
      description: site.seo.ogDescription,
    },
    alternates: {
      canonical,
      languages: {
        pt: siteUrl,
        en: `${siteUrl}/en`,
        "x-default": siteUrl,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const site = await getSiteContent(locale as Locale);

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-foreground">
        <a href="#conteudo" className="skip-link">
          {site.chrome.skipToContent}
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
