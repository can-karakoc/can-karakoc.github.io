'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* A lightweight mobile carousel: auto-advances, and lets users flip manually
   via dots, arrows, or a swipe. Renders a horizontal track and translates it;
   all slides stretch to the tallest so the height stays stable. */
export function MobileCarousel({
  items,
  interval = 4800,
  className = '',
  ariaLabel = 'carousel',
}: {
  items: React.ReactNode[];
  interval?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const [idx, setIdx] = React.useState(0);
  const count = items.length;
  const pausedUntil = React.useRef(0);

  const go = React.useCallback(
    (n: number) => setIdx(((n % count) + count) % count),
    [count]
  );
  const pause = () => {
    pausedUntil.current = Date.now() + 9000;
  };

  React.useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => {
      if (Date.now() > pausedUntil.current) setIdx((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(t);
  }, [count, interval]);

  return (
    <div className={className} aria-label={ariaLabel} aria-roledescription="carousel">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex items-stretch"
          animate={{ x: `-${idx * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragSnapToOrigin
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragStart={pause}
          onDragEnd={(_, info) => {
            pause();
            if (info.offset.x < -50 || info.velocity.x < -350) go(idx + 1);
            else if (info.offset.x > 50 || info.velocity.x > 350) go(idx - 1);
          }}
        >
          {items.map((it, i) => (
            <div
              key={i}
              className="w-full shrink-0 px-0.5"
              aria-hidden={i !== idx}
              style={{ touchAction: 'pan-y' }}
            >
              {it}
            </div>
          ))}
        </motion.div>
      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => {
              pause();
              go(idx - 1);
            }}
            aria-label="Previous"
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ color: 'var(--color-ink-muted)', background: 'rgba(10,37,64,0.05)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  pause();
                  go(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 22 : 7,
                  height: 7,
                  background: i === idx ? 'var(--color-cobalt)' : 'rgba(10,37,64,0.18)',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              pause();
              go(idx + 1);
            }}
            aria-label="Next"
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ color: 'var(--color-ink-muted)', background: 'rgba(10,37,64,0.05)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
