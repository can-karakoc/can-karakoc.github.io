'use client';

import React from 'react';
import Link from 'next/link';
import { OrbLogo } from '@/components/ui';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [ctaHovered, setCtaHovered] = React.useState(false);

  return (
    <footer
      className="relative px-6 py-6 pb-4"
      style={{
        background: 'linear-gradient(180deg, #ffffff, #eef0f4 100%)',
        borderTop: '1px solid rgba(10, 37, 64, 0.08)',
      }}
    >
      {/* Footer-specific accents (global background provides grid/bubbles/grain) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-clip pointer-events-none"
      >
        {/* Soft gray glow - center, kept subtle so it doesn't wash the
            background back out to white and hide the glass pills */}
        <div
          className="absolute opacity-40"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '500px',
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.2) 40%, transparent 65%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1160px] mx-auto">
        {/* "Let's connect" label */}
        <p
          className="text-center mb-1.5 font-semibold uppercase"
          style={{
            fontFamily: 'var(--font-plex)',
            fontSize: '13px',
            letterSpacing: '0.14em',
            color: 'var(--color-ink-muted)',
          }}
        >
          Let&apos;s connect
        </p>

        {/* Title, solid ink fill by default - shifts to cobalt, lifts, and
            blooms a soft gradient glow behind it on hover. Driven by plain
            React state + inline styles (no CSS pseudo-classes or Tailwind
            arbitrary values) so the effect is unambiguous and doesn't
            depend on class-parsing edge cases. Links to the contact page. */}
        <div className="relative mb-4 text-center">
          <Link
            href="/contact"
            className="relative inline-block no-underline cursor-pointer"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            {/* Glow bloom behind the text */}
            <span
              className="absolute pointer-events-none"
              style={{
                inset: '-30px',
                borderRadius: '999px',
                background:
                  'radial-gradient(ellipse at center, rgba(124,185,232,0.2), rgba(157,213,220,0.1) 55%, transparent 75%)',
                filter: 'blur(30px)',
                opacity: ctaHovered ? 1 : 0,
                transform: ctaHovered ? 'scale(1.1)' : 'scale(0.85)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
              }}
            />
            <span
              className="relative font-extrabold leading-tight"
              style={{
                fontSize: 'clamp(40px, 6.5vw, 80px)',
                letterSpacing: '-0.03em',
                display: 'inline-block',
                color: ctaHovered ? 'var(--color-cobalt)' : 'var(--color-ink)',
                transform: ctaHovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'color 0.25s ease-out, transform 0.25s ease-out',
              }}
            >
              GET IN TOUCH
            </span>
          </Link>
        </div>

        {/* Social buttons - email styled to match GitHub/LinkedIn.
            flex-wrap (not overflow-x-auto) on purpose: any overflow value
            other than visible also clips overflow-y per the CSS spec,
            which was cutting the pills' drop shadows off top and bottom. */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 mb-5">
          <a
            href="mailto:cankarakoc@berkeley.edu"
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-[var(--radius-pill)] font-bold text-xs sm:text-sm no-underline mag whitespace-nowrap"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(10, 37, 64, 0.1)',
              boxShadow: '0 6px 16px -8px rgba(10, 37, 64, 0.25)',
              color: 'var(--color-ink)',
            }}
          >
            cankarakoc@berkeley.edu
          </a>
          <a
            href="https://github.com/can-karakoc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-[var(--radius-pill)] font-bold text-xs sm:text-sm no-underline mag whitespace-nowrap"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(10, 37, 64, 0.1)',
              boxShadow: '0 6px 16px -8px rgba(10, 37, 64, 0.25)',
              color: 'var(--color-ink)',
            }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/can-karakoc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-[var(--radius-pill)] font-bold text-xs sm:text-sm no-underline mag whitespace-nowrap"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(10, 37, 64, 0.1)',
              boxShadow: '0 6px 16px -8px rgba(10, 37, 64, 0.25)',
              color: 'var(--color-ink)',
            }}
          >
            LinkedIn
          </a>
        </div>

        {/* Footer bar - logo left, copyright right */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200/50">
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
