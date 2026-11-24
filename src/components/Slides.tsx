"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./motion";

export type Slide = { src: string; alt: string; caption: string };

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const AUTOPLAY_MS = 5000;

/** Screenshot slideshow: autoplay (paused on hover/focus), arrows, dots, swipe and arrow keys. */
export default function Slides({ slides, color, priority = false }: { slides: Slide[]; color: string; priority?: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const startX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const id = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduced, count, go]);

  return (
    <div
      className="group relative h-full select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        startX.current = null;
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[26rem]">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <figure
              key={s.src}
              className="relative h-full w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${s.caption}`}
              aria-hidden={i !== index}
            >
              <Image
                src={`${BASE}${s.src}`}
                alt={s.alt}
                width={1440}
                height={900}
                draggable={false}
                className="h-full w-full object-cover object-left-top"
                priority={priority && i === 0}
              />
            </figure>
          ))}
        </div>

        {/* caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent px-5 pb-4 pt-14">
          <p key={index} className="word-in text-sm font-medium text-white">
            <span className="mr-2 font-mono text-xs" style={{ color }}>
              {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
            </span>
            {slides[index].caption}
          </p>
        </div>

        {count > 1 && (
          <>
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={dir === "prev" ? "Previous screenshot" : "Next screenshot"}
                onClick={() => go(index + (dir === "prev" ? -1 : 1))}
                className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/70 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100 ${
                  dir === "prev" ? "left-3" : "right-3"
                }`}
              >
                <svg viewBox="0 0 24 24" className={`h-4 w-4 ${dir === "prev" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </>
        )}
      </div>

      {count > 1 && (
        <div className="absolute right-4 top-4 flex gap-1.5 rounded-full bg-ink/60 px-2.5 py-2 backdrop-blur">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className="relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-500"
              style={{ width: i === index ? 28 : 8 }}
            >
              {i === index && (
                <span
                  key={`${index}-${paused}`}
                  className={`absolute inset-0 rounded-full ${paused || reduced ? "" : "progress-fill"}`}
                  style={{ background: color, animationDuration: `${AUTOPLAY_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
