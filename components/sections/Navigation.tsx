'use client';

import { OrbLogo } from '@/components/ui';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/#work', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/* Desktop link with the slide-up hover effect. */
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative text-[var(--color-ink)] no-underline group overflow-hidden inline-block"
    >
      <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {label}
      </span>
      <span
        className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full"
        style={{ color: 'var(--color-cobalt)' }}
      >
        {label}
      </span>
    </a>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-4 z-[9999] px-6 flex justify-center">
      <nav
        className="relative w-full max-w-[1160px] flex items-center justify-between px-6 sm:px-8 py-2.5 rounded-[var(--radius-pill)]"
        style={{
          background: 'var(--color-glass-55)',
          backdropFilter: 'blur(32px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
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

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center font-semibold text-sm">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 -mr-1 rounded-full"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{ color: 'var(--color-ink)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden absolute top-full right-0 mt-2 min-w-[168px] rounded-2xl overflow-hidden p-1.5"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--color-glass-55)',
                backdropFilter: 'blur(32px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
                border: '1px solid rgba(255,255,255,0.62)',
                boxShadow: '0 16px 34px -16px rgba(23,70,184,0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-semibold text-sm no-underline transition-colors"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
