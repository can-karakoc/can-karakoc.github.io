'use client';

import React from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion';

/* Distortion bubbles in front of the content. Verified via live headless-
   Chrome screenshots (not guessed) that backdrop-filter: url(#svgFilter)
   with feDisplacementMap does NOT actually warp content in real Chromium,
   even though the browser accepts it as valid CSS (computed style showed
   the filter applied, grid lines behind it stayed perfectly straight at
   high zoom). That's a genuine engine gap specific to backdrop-filter's
   SVG-filter pipeline - the plain `filter` property (used for the page's
   water-distortion effect below) does support this correctly. So: plain
   backdrop blur is the distortion technique here, since it's the one that
   reliably renders and genuinely affects the real content behind it. */
const frontBubbles = [
  { size: 128, top: '20%', left: '82%', backdrop: 14, delay: 0, duration: 12, factor: 0.32 },
  { size: 96, top: '45%', left: '8%', backdrop: 12, delay: 2, duration: 11, factor: 0.38 },
  { size: 80, top: '15%', left: '48%', backdrop: 10, delay: 1.5, duration: 10, factor: 0.42 },
  { size: 160, top: '35%', left: '72%', backdrop: 16, delay: 3, duration: 14, factor: 0.28 },
  { size: 64, top: '60%', left: '80%', backdrop: 9, delay: 4, duration: 9, factor: 0.46 },
  { size: 112, top: '70%', left: '20%', backdrop: 13, delay: 1, duration: 12.5, factor: 0.35 },
  { size: 56, top: '30%', left: '30%', backdrop: 8, delay: 2.6, duration: 9.5, factor: 0.48 },
];

/* Bubbles behind the content */
const backBubbles = [
  { size: 80, left: '15%', blur: 10, delay: 0, duration: 10, tint: 'rgba(56,189,248,0.4)', factor: 0.22 },
  { size: 56, left: '70%', blur: 8, delay: 1, duration: 8, tint: 'rgba(14,165,233,0.35)', factor: 0.3 },
  { size: 40, left: '45%', blur: 6, delay: 2, duration: 7, tint: 'rgba(56,189,248,0.3)', factor: 0.38 },
  { size: 28, left: '80%', blur: 5, delay: 0.5, duration: 9, tint: 'rgba(56,189,248,0.25)', factor: 0.45 },
  { size: 64, left: '30%', blur: 9, delay: 1.5, duration: 9.5, tint: 'rgba(56,189,248,0.38)', factor: 0.26 },
  { size: 36, left: '62%', blur: 7, delay: 2.5, duration: 8.5, tint: 'rgba(14,165,233,0.32)', factor: 0.4 },
  { size: 48, left: '55%', blur: 7.5, delay: 3, duration: 7.8, tint: 'rgba(56,189,248,0.36)', factor: 0.34 },
  { size: 32, left: '8%', blur: 6.5, delay: 0.8, duration: 8.2, tint: 'rgba(14,165,233,0.28)', factor: 0.42 },
  { size: 72, left: '88%', blur: 9.5, delay: 1.2, duration: 10.5, tint: 'rgba(56,189,248,0.35)', factor: 0.24 },
  { size: 24, left: '25%', blur: 4.5, delay: 3.5, duration: 7.2, tint: 'rgba(56,189,248,0.28)', factor: 0.5 },
  { size: 52, left: '38%', blur: 8, delay: 2.2, duration: 9.8, tint: 'rgba(14,165,233,0.34)', factor: 0.28 },
  { size: 44, left: '92%', blur: 7, delay: 0.3, duration: 8.8, tint: 'rgba(56,189,248,0.32)', factor: 0.36 },
  { size: 30, left: '50%', blur: 5.5, delay: 4, duration: 7.5, tint: 'rgba(14,165,233,0.3)', factor: 0.44 },
  { size: 60, left: '5%', blur: 8.5, delay: 2.8, duration: 10.2, tint: 'rgba(56,189,248,0.37)', factor: 0.25 },
];

/* A bubble that lags behind scroll (parallax) and settles back when scrolling stops */
function ParallaxBubble({
  lag,
  factor,
  className,
  style,
  children,
}: {
  lag: MotionValue<number>;
  factor: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const y = useTransform(lag, (v) => v * factor);
  return (
    <motion.div className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

export function AuroraBackground() {
  const { scrollY } = useScroll();

  // Smoothed copy of scroll position; the difference to the real position is
  // the parallax lag. It is non-zero while scrolling and springs back to 0 at rest.
  const smoothY = useSpring(scrollY, { stiffness: 60, damping: 20, mass: 0.8 });
  // 0.45 dampens the overall parallax strength; raise/lower to taste
  const lag = useTransform<number, number>(
    [scrollY, smoothY],
    ([current, smooth]) => ((smooth as number) - (current as number)) * 0.45
  );

  // Water distortion strength follows scroll velocity
  const velocity = useVelocity(scrollY);
  const distortion = useSpring(
    useTransform(velocity, (v) => Math.min(Math.abs(v) / 60, 22)),
    { stiffness: 80, damping: 25 }
  );
  const displacementRef = React.useRef<SVGFEDisplacementMapElement>(null);
  useMotionValueEvent(distortion, 'change', (v) => {
    displacementRef.current?.setAttribute('scale', String(3 + v));
  });

  return (
    <>
      {/* SVG distortion filters */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <filter id="water-distortion" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.014"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.008 0.014;0.011 0.018;0.008 0.014"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* ===== Back layer - behind all content ===== */}
      <div
        aria-hidden="true"
        className="fixed inset-0 overflow-clip pointer-events-none z-0"
        style={{ filter: 'url(#water-distortion)' }}
      >
        {/* Base surface gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #ffffff, #eef5ff 60%, #e6f0fb)',
          }}
        />

        {/* Cyan aurora - top left */}
        <div
          className="absolute w-[560px] h-[560px] rounded-full opacity-50"
          style={{
            top: '-10%',
            left: '-140px',
            background:
              'radial-gradient(circle at 40% 38%, rgba(56,189,248,0.5), transparent 66%)',
            filter: 'blur(90px)',
            animation: 'drift1 22s ease-in-out infinite',
          }}
        />

        {/* Green aurora - mid right */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            top: '25%',
            right: '-160px',
            background:
              'radial-gradient(circle at 40% 38%, rgba(22,163,74,0.4), transparent 66%)',
            filter: 'blur(96px)',
            animation: 'drift2 26s ease-in-out infinite',
          }}
        />

        {/* Cobalt aurora - lower left */}
        <div
          className="absolute w-[520px] h-[520px] rounded-full opacity-[0.42]"
          style={{
            bottom: '5%',
            left: '-120px',
            background:
              'radial-gradient(circle at 40% 38%, rgba(29,78,216,0.42), transparent 66%)',
            filter: 'blur(92px)',
            animation: 'drift3 24s ease-in-out infinite',
          }}
        />

        {/* Teal aurora - bottom right */}
        <div
          className="absolute w-[520px] h-[520px] rounded-full opacity-40"
          style={{
            bottom: '-15%',
            right: '-120px',
            background:
              'radial-gradient(circle at 40% 38%, rgba(8,145,178,0.4), transparent 66%)',
            filter: 'blur(92px)',
            animation: 'drift1 28s ease-in-out infinite',
          }}
        />

        {/* White glow - center top, keeps content area bright */}
        <div
          className="absolute opacity-70"
          style={{
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '700px',
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.4) 40%, transparent 65%)',
          }}
        />

        {/* Blue gradient at bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-[250px] opacity-45"
          style={{
            background:
              'linear-gradient(to top, rgba(29, 78, 216, 0.2), rgba(56, 189, 248, 0.1) 60%, transparent)',
          }}
        />

        {/* Aero grid overlay - full coverage */}
        <div className="absolute inset-0 aero-grid" />

        {/* Animated grain overlay with blue tint */}
        <div
          className="grain"
          style={{
            opacity: 0.35,
            animation: 'grain 8s steps(10) infinite',
            mixBlendMode: 'overlay',
            backgroundColor: 'rgba(29, 78, 216, 0.08)',
          }}
        />

        {/* Rising bubbles with scroll parallax */}
        {backBubbles.map((b, i) => (
          <ParallaxBubble
            key={i}
            lag={lag}
            factor={b.factor}
            className="absolute"
            style={{ bottom: 80, left: b.left }}
          >
            <div
              className="rounded-full opacity-0"
              style={{
                width: b.size,
                height: b.size,
                background: `radial-gradient(circle at 33% 33%, rgba(255,255,255,0.78), ${b.tint})`,
                filter: `blur(${b.blur}px)`,
                animation: `rise ${b.duration}s ease-in-out infinite ${b.delay}s`,
              }}
            />
          </ParallaxBubble>
        ))}
      </div>

      {/* ===== Front layer - distortion bubbles above the content ===== */}
      <div
        aria-hidden="true"
        className="fixed inset-0 overflow-clip pointer-events-none z-30"
      >
        {frontBubbles.map((b, i) => (
          <ParallaxBubble
            key={i}
            lag={lag}
            factor={b.factor}
            className="absolute"
            style={{ top: b.top, left: b.left }}
          >
            {/* Outer: rise lifecycle (position/scale/opacity/pop). Split
                from the inner wobble below since both animations touch
                `transform` and can't share one element without fighting. */}
            <div
              className="rounded-full opacity-0"
              style={{
                width: b.size,
                height: b.size,
                animation: `rise ${b.duration}s ease-in-out infinite ${b.delay}s`,
              }}
            >
              {/* Inner: the glass fill + backdrop blur, which genuinely
                  softens/distorts whatever real content is behind it, plus
                  an organic wobble so the edge isn't a static perfect circle. */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background:
                    'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), rgba(56,189,248,0.12) 68%, transparent)',
                  backdropFilter: `blur(${b.backdrop}px)`,
                  WebkitBackdropFilter: `blur(${b.backdrop}px)`,
                  animation: `blob-wobble ${4 + (i % 3)}s ease-in-out infinite ${b.delay * 0.5}s`,
                }}
              />
            </div>
          </ParallaxBubble>
        ))}
      </div>
    </>
  );
}
