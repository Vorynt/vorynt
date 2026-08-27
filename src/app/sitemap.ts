import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vorynt.app.br";

  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        pt: siteUrl,
        en: `${siteUrl}/en`,
        "x-default": siteUrl,
      },
    },
  }));
}
