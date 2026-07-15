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
            className="text-[var(--color-ink)] hover:text-[var(--color-cobalt)] transition-colors duration-200 no-underline"
          >
            Projects
          </a>
          <a
            href="/about"
            className="text-[var(--color-ink)] hover:text-[var(--color-cobalt)] transition-colors duration-200 no-underline"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-[var(--color-ink)] hover:text-[var(--color-cobalt)] transition-colors duration-200 no-underline"
          >
            Contact
          </a>
        </div>
      </nav>
    </div>
  );
}
