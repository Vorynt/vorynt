import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "shimmer-mask relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-[transform,background-color,border-color,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:-translate-y-0.5 hover:shadow-[0_8px_28px_oklch(0.97_0.01_280/0.18)]",
        secondary:
          "glass text-foreground hover:-translate-y-0.5 hover:border-white/30",
        ghost: "text-muted hover:text-foreground hover:bg-white/6",
      },
      size: {
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
