interface Props {
  description: string;
  locale: string;
}

export function JsonLd({ description, locale }: Props) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vorynt.com";
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vorynt",
    url: siteUrl,
    description,
    inLanguage: locale === "pt" ? "pt-BR" : "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
