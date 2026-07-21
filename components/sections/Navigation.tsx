'use client';

import { OrbLogo } from '@/components/ui';

export function Navigation() {
  return (
    <div className="sticky top-4 z-50 px-6 flex justify-center">
      <nav
        className="w-full max-w-[1160px] flex items-center justify-between px-6 py-2.5 rounded-[var(--radius-pill)]"
        style={{
          background: 'var(--color-glass-55)',
          backdropFilter: 'blur(18px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
          border: '1px solid rgba(255,255,255,0.62)',
          boxShadow:
            '0 12px 30px -16px rgba(23,70,184,0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 no-underline">
          <OrbLogo size={34} />
          <span
            className="font-extrabold text-[21px] leading-none"
            style={{
              fontFamily: 'var(--font-jakarta)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.03em',
            }}
          >
            can
          </span>
        </a>

        {/* Nav Links */}
        <div className="flex gap-6 items-center font-semibold text-sm">
          <a
            href="#work"
            className="relative text-[var(--color-ink)] no-underline group overflow-hidden inline-block"
          >
            <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-full">
              Projects
            </span>
            <span
              className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full"
              style={{ color: 'var(--color-cobalt)' }}
            >
              Projects
            </span>
          </a>
          <a
            href="/about"
            className="relative text-[var(--color-ink)] no-underline group overflow-hidden inline-block"
          >
            <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-full">
              About
            </span>
            <span
              className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full"
              style={{ color: 'var(--color-cobalt)' }}
            >
              About
            </span>
          </a>
          <a
            href="/contact"
            className="relative text-[var(--color-ink)] no-underline group overflow-hidden inline-block"
          >
            <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-full">
              Contact
            </span>
            <span
              className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full"
              style={{ color: 'var(--color-cobalt)' }}
            >
              Contact
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
}
