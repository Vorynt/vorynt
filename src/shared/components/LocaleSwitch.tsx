"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/utils/cn";

interface Props {
  labels: { pt: string; en: string };
  ariaLabel: string;
}

export function LocaleSwitch({ labels, ariaLabel }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex items-center rounded-full border border-white/12 bg-white/5 p-0.5"
    >
      {routing.locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-current={active ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale: code })}
            className={cn(
              "rounded-full px-2.5 py-1 font-display text-[0.7rem] tracking-[0.16em] uppercase transition-colors duration-200",
              active
                ? "bg-white/16 text-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {code === "pt" ? labels.pt : labels.en}
          </button>
        );
      })}
    </div>
  );
}
