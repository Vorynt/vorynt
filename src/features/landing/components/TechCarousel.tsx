"use client";

import type { SiteContent } from "@/content/schema";
import { cn } from "@/shared/utils/cn";
import {
  type CSSProperties,
  type Ref,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { TechMark } from "./TechMark";

type Track = SiteContent["technologies"]["tracks"][number];
type Item = Track["items"][number];

const MIN_SETS = 4;

interface Props {
  track: Track;
}

export function TechCarousel({ track }: Props) {
  const reverse = track.direction === "rtl";
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const [sets, setSets] = useState(MIN_SETS);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const itemSet = setRef.current;
    if (!viewport || !itemSet) {
      return;
    }

    const update = () => {
      const setWidth = itemSet.scrollWidth;
      const viewWidth = viewport.clientWidth;
      if (setWidth === 0 || viewWidth === 0) {
        return;
      }

      setSets(Math.max(MIN_SETS, Math.ceil(viewWidth / setWidth) + 1));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    observer.observe(itemSet);
    return () => observer.disconnect();
  }, [track.items]);

  return (
    <div>
      <p className="mb-3 px-5 font-display text-[0.65rem] tracking-[0.24em] text-muted uppercase sm:px-8 lg:px-10">
        {track.label}
      </p>
      <div ref={viewportRef} className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent"
        />
        <div
          className={cn(
            "flex w-max",
            reverse ? "marquee-track-reverse" : "marquee-track",
          )}
          style={{ "--marquee-sets": sets } as CSSProperties}
        >
          {Array.from({ length: sets }, (_, copyIndex) => (
            <ItemSet
              key={copyIndex}
              ref={copyIndex === 0 ? setRef : undefined}
              items={track.items}
              hidden={copyIndex > 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ItemSetProps {
  items: Item[];
  hidden: boolean;
  ref?: Ref<HTMLUListElement>;
}

function ItemSet({ items, hidden, ref }: ItemSetProps) {
  return (
    <ul
      ref={ref}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 gap-3 py-5 pr-3"
    >
      {items.map((item) => (
        <li
          key={item.name}
          className="flex items-center gap-3 rounded-full border border-white/10 px-4 py-2.5 transition-colors duration-200 hover:border-led-light/40"
        >
          <TechMark icon={item.icon} variant={item.variant} />
          <span className="font-display text-sm tracking-wide whitespace-nowrap">
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
