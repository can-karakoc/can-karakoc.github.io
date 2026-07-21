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
            className="relative text-[var(--color-ink)] no-underline group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--color-cobalt)]">
              Projects
            </span>
            <span
              className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-cobalt)] transition-all duration-300 ease-out group-hover:w-full"
              style={{ borderRadius: '2px' }}
            />
          </a>
          <a
            href="/about"
            className="relative text-[var(--color-ink)] no-underline group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--color-cobalt)]">
              About
            </span>
            <span
              className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-cobalt)] transition-all duration-300 ease-out group-hover:w-full"
              style={{ borderRadius: '2px' }}
            />
          </a>
          <a
            href="/contact"
            className="relative text-[var(--color-ink)] no-underline group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--color-cobalt)]">
              Contact
            </span>
            <span
              className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-cobalt)] transition-all duration-300 ease-out group-hover:w-full"
              style={{ borderRadius: '2px' }}
            />
          </a>
        </div>
      </nav>
    </div>
  );
}
