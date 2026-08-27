import { cn } from "@/shared/utils/cn";
import type { ReactNode } from "react";

interface Props {
  className?: string;
  pulse?: boolean;
  children?: ReactNode;
}

export function LedFrame({ className, pulse = false, children }: Props) {
  return (
    <div
      className={cn("glass relative overflow-hidden rounded-3xl", className)}>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-led-light to-transparent",
          pulse && "led-pulse",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-8 bottom-0 h-px bg-linear-to-r from-transparent via-led to-transparent",
          pulse && "led-pulse",
        )}
      />
      {children}
    </div>
  );
}
