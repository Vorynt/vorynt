import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ children, className, hover = false }: Props) {
  return (
    <div className={cn("glass rounded-3xl", hover && "glass-hover", className)}>
      {children}
    </div>
  );
}
