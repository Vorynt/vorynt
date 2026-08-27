"use client";

import { cn } from "@/shared/utils/cn";
import { useState } from "react";

const DEVICON_CDN =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const INVERT_ICONS = new Set(["nextjs", "vercel", "github"]);

interface Props {
  icon?: string;
  variant?: string;
}

export function TechMark({ icon, variant = "original" }: Props) {
  const [failed, setFailed] = useState(false);

  if (!icon || failed) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote SVG; next/image does not optimize it
    <img
      src={`${DEVICON_CDN}/${icon}/${icon}-${variant}.svg`}
      alt=""
      width={20}
      height={20}
      aria-hidden
      className={cn("size-5", INVERT_ICONS.has(icon) && "invert")}
      onError={() => setFailed(true)}
    />
  );
}
