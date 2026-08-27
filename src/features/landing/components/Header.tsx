"use client";

import type { SiteContent } from "@/content/schema";
import { ButtonLink } from "@/shared/components/Button";
import { LocaleSwitch } from "@/shared/components/LocaleSwitch";
import { cn } from "@/shared/utils/cn";
import { useState } from "react";

interface Props {
  content: SiteContent["header"];
  chrome: SiteContent["chrome"];
}

export function Header({ content, chrome }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 sm:px-6">
      <div
        className={cn(
          "glass mx-auto flex max-w-5xl items-center justify-between gap-3 px-3 py-2",
          open ? "rounded-3xl" : "rounded-full",
        )}>
        <a
          href="#conteudo"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-sm font-semibold tracking-[0.18em] uppercase transition-colors hover:bg-white/8">
          {content.logo}
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={chrome.mainNavAria}>
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors duration-200 hover:bg-white/10 hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitch
            ariaLabel={chrome.localeSwitchAria}
            labels={{ pt: chrome.localePt, en: chrome.localeEn }}
          />
          <ButtonLink href={content.cta.href} size="md">
            {content.cta.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}>
          <span className="sr-only">
            {open ? chrome.closeMenu : chrome.openMenu}
          </span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-px w-4 bg-foreground transition-transform duration-200",
                open && "translate-y-1.25 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-4 bg-foreground transition-transform duration-200",
                open && "-translate-y-0.75 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="glass mx-auto mt-2 max-w-5xl rounded-3xl px-5 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-base text-foreground hover:bg-white/8"
                onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between gap-3 pt-2">
              <LocaleSwitch
                ariaLabel={chrome.localeSwitchAria}
                labels={{ pt: chrome.localePt, en: chrome.localeEn }}
              />
              <ButtonLink
                href={content.cta.href}
                onClick={() => setOpen(false)}>
                {content.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
