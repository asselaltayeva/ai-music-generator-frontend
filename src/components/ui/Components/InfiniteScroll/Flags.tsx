import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const flags = [
  "🇺🇸", "🇬🇧", "🇯🇵", "🇰🇷", "🇫🇷",
  "🇩🇪", "🇨🇦", "🇮🇳", "🇧🇷", "🇦🇺",
];

export default function HorizontalFlagScroller() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = gsap.utils.toArray<HTMLDivElement>(container.children);
    const itemWidth = items[0]?.offsetWidth || 0;
    const totalWidth = itemWidth * items.length;

    const wrapX = gsap.utils.wrap(-totalWidth / 2, 0);

    let rafId: number;
    const speed = -0.5;

    const tick = () => {
      items.forEach((item) => {
        gsap.set(item, {
          x: `+=${speed}`,
          modifiers: { x: gsap.utils.unitize(wrapX) },
        });
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 rounded-lg bg-transparent blur-2xl z-20" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 rounded-lg bg-transparent blur-2xl  z-20" />
      <div ref={containerRef} className="flex whitespace-nowrap">
        {[...flags, ...flags].map((flag, i) => (
          <div
            key={i}
            className="text-4xl px-4 flex items-center justify-center"
          >
            {flag}
          </div>
        ))}
      </div>
    </div>
  );
}
