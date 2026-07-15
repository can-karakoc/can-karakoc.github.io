'use client';

import React from 'react';
import { OrbLogo } from '@/components/ui';
import { Badge } from '@/components/ui';
import { useScroll, useTransform, motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start center", "end end"]
  });

  const fillProgress = useTransform(scrollYProgress, [0.15, 1], [0, 100]);

  return (
    <footer
      ref={footerRef}
      className="relative px-6 py-12 pb-8"
      style={{
        background: 'linear-gradient(180deg, #ffffff, #eef5ff 60%, #e6f0fb)',
        borderTop: '1px solid rgba(29,78,216,0.15)',
      }}
    >
      {/* Background layers matching contact card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-clip pointer-events-none"
      >
        {/* Animated moving hue blobs */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            top: '10%',
            left: '10%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(29,78,216,0.4), transparent 70%)',
            filter: 'blur(100px)',
            animation: 'drift1 30s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full opacity-15"
          style={{
            top: '30%',
            right: '15%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.35), transparent 70%)',
            filter: 'blur(90px)',
            animation: 'drift2 35s ease-in-out infinite',
          }}
        />

        {/* White glow - center */}
        <div
          className="absolute opacity-70"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '500px',
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.4) 40%, transparent 65%)',
          }}
        />

        {/* Blue gradient at bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-[200px] opacity-45"
          style={{
            background:
              'linear-gradient(to top, rgba(29, 78, 216, 0.22), rgba(56, 189, 248, 0.12) 60%, transparent)',
          }}
        />

        {/* Aero grid overlay */}
        <div className="absolute inset-0 aero-grid" />

        {/* Animated Grain overlay with blue tint */}
        <div
          className="grain"
          style={{
            opacity: 0.35,
            animation: 'grain 8s steps(10) infinite',
            mixBlendMode: 'overlay',
            backgroundColor: 'rgba(29, 78, 216, 0.08)',
          }}
        />

        {/* Floating bubbles */}
        <div
          className="absolute w-16 h-16 rounded-full opacity-0"
          style={{
            bottom: '80px',
            left: '20%',
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(56,189,248,0.4) 60%, transparent)',
            filter: 'blur(10px)',
            animation: 'rise 10s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-12 h-12 rounded-full opacity-0"
          style={{
            bottom: '60px',
            right: '25%',
            background:
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75), rgba(14,165,233,0.35))',
            filter: 'blur(8px)',
            animation: 'rise 8s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1160px] mx-auto">
        {/* Available badge */}
        <div className="flex justify-center mb-6">
          <Badge
            variant="glass"
            withDot
            dotColor="var(--color-lime)"
            className="text-sm"
          >
            available for work
          </Badge>
        </div>

        {/* Contact title with scroll-triggered fill */}
        <div className="relative mb-5 text-center">
          <motion.h2
            className="font-extrabold leading-tight"
            style={{
              fontSize: 'clamp(80px, 12vw, 140px)',
              letterSpacing: '-0.035em',
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--color-ink)',
              textStroke: '1.5px var(--color-ink)',
              position: 'relative',
              paintOrder: 'stroke fill',
            }}
          >
            CONTACT
            {/* Filled version that clips based on scroll */}
            <motion.span
              className="absolute inset-0"
              style={{
                color: 'var(--color-ink)',
                WebkitTextStroke: '0px',
                textStroke: '0px',
                clipPath: useTransform(fillProgress, (v) => `inset(0 ${100 - v}% 0 0)`),
                paintOrder: 'stroke fill',
              }}
            >
              CONTACT
            </motion.span>
          </motion.h2>
        </div>

        {/* Email */}
        <p
          className="text-center mb-6"
          style={{
            fontSize: '18px',
            fontFamily: 'var(--font-plex)',
            color: 'var(--color-cobalt)',
            fontWeight: 600,
          }}
        >
          cankarakoc@berkeley.edu
        </p>

        {/* Social buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          <a
            href="https://github.com/can-karakoc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-pill)] font-bold text-sm no-underline mag"
            style={{
              background: 'var(--color-glass-55)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--color-glass-border)',
              color: 'var(--color-ink)',
            }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/can-karakoc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-pill)] font-bold text-sm no-underline mag"
            style={{
              background: 'var(--color-glass-55)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--color-glass-border)',
              color: 'var(--color-ink)',
            }}
          >
            LinkedIn
          </a>
        </div>

        {/* Footer bar - three columns with line separator */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200/50">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-3">
            <OrbLogo size={28} />
            <span
              className="font-bold text-base"
              style={{
                color: 'var(--color-ink)',
              }}
            >
              Can
            </span>
          </div>

          {/* Center: Tagline */}
          <p
            className="text-sm text-center"
            style={{
              fontFamily: 'var(--font-plex)',
              color: 'var(--color-ink-muted)',
            }}
          >
            Product engineer · building human-centered software
          </p>

          {/* Right: Copyright */}
          <p
            className="text-sm"
            style={{
              color: 'var(--color-ink-muted)',
            }}
          >
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
