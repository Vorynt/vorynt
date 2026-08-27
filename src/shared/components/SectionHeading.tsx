import { cn } from "@/shared/utils/cn";

interface Props {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  size?: "sm" | "default" | "lg";
}

const titleSize = {
  sm: "mt-3 font-display text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl",
  default:
    "mt-3 font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
  lg: "mt-3 font-display text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl",
};

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  className,
  align = "left",
  size = "default",
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="font-display text-[0.7rem] font-semibold tracking-[0.28em] text-led-light uppercase">
        {eyebrow}
      </p>
      <h2 className={titleSize[size]}>
        {title}
        {titleAccent ? (
          <>
            {" "}
            <span className="text-led-light">{titleAccent}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
