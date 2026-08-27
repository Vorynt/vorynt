import { z } from "zod";

export const localeSchema = z.enum(["pt", "en"]);
export type Locale = z.infer<typeof localeSchema>;

const navItemSchema = z.object({
  href: z.string(),
  label: z.string(),
});

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const siteContentSchema = z.object({
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogTitle: z.string(),
    ogDescription: z.string(),
    siteName: z.string(),
    keywords: z.array(z.string()),
  }),
  chrome: z.object({
    skipToContent: z.string(),
    openMenu: z.string(),
    closeMenu: z.string(),
    localePt: z.string(),
    localeEn: z.string(),
    localeSwitchAria: z.string(),
    mainNavAria: z.string(),
    replayHeroAnimation: z.string(),
  }),
  header: z.object({
    logo: z.string(),
    nav: z.array(navItemSchema),
    cta: ctaSchema,
  }),
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    titleAccent: z.string(),
    description: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
  }),
  offerings: z.object({
    id: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    description: z.string(),
    items: z.array(
      z.object({
        id: z.enum(["custom", "quality"]),
        kicker: z.string(),
        title: z.string(),
        productName: z.string().optional(),
        productUrl: z.string().optional(),
        description: z.string(),
        points: z.array(z.string()),
        cta: ctaSchema.optional(),
      }),
    ),
  }),
  process: z.object({
    id: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    description: z.string(),
    deliverableLabel: z.string(),
    steps: z.array(
      z.object({
        number: z.string(),
        phase: z.string(),
        title: z.string(),
        description: z.string(),
        deliverable: z.string(),
      }),
    ),
  }),
  technologies: z.object({
    id: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    description: z.string(),
    tracks: z.array(
      z.object({
        label: z.string(),
        direction: z.enum(["ltr", "rtl"]),
        items: z.array(
          z.object({
            name: z.string(),
            icon: z.string().optional(),
            variant: z.string().optional(),
          }),
        ),
      }),
    ),
  }),
  story: z.object({
    id: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    paragraphs: z.array(z.string()),
    quote: z.object({
      text: z.string(),
      attribution: z.string(),
    }),
  }),
  contact: z.object({
    id: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    description: z.string(),
    fields: z.object({
      name: z.object({ label: z.string(), placeholder: z.string() }),
      email: z.object({ label: z.string(), placeholder: z.string() }),
      company: z.object({ label: z.string(), placeholder: z.string() }),
      projectType: z.object({
        label: z.string(),
        options: z.array(z.object({ value: z.string(), label: z.string() })),
      }),
      message: z.object({ label: z.string(), placeholder: z.string() }),
    }),
    submit: z.string(),
    submitting: z.string(),
    success: z.string(),
    error: z.string(),
    honeypotAria: z.string(),
    errors: z.object({
      name: z.string(),
      email: z.string(),
      message: z.string(),
    }),
  }),
  footer: z.object({
    tagline: z.string(),
    copyright: z.string(),
    nav: z.array(navItemSchema),
  }),
  jsonLd: z.object({
    description: z.string(),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type Cta = z.infer<typeof ctaSchema>;

export interface ContentRepository {
  getSite(locale: Locale): Promise<SiteContent>;
}
