import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
}

export function Container({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
