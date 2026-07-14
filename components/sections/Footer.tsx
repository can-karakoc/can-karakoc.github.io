'use client';

import { OrbLogo } from '@/components/ui';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 px-6 py-8 pb-12"
      style={{
        borderTop: '1px solid rgba(29,78,216,0.1)',
      }}
    >
      <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <OrbLogo size={28} />
          <span
            className="font-bold text-base"
            style={{
              color: 'var(--color-ink)',
            }}
          >
            Can Karakoç
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
    </footer>
  );
}
