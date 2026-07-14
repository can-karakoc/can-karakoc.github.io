'use client';

import { Badge } from '@/components/ui';
import { ScrollReveal } from '@/components/animations';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/SocialIcon';

export function Contact() {
  return (
    <section id="contact" className="relative z-10 px-6 py-20">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-[32px] px-10 py-[74px] text-center"
            style={{
              background:
                'linear-gradient(180deg, var(--color-surface-white), var(--color-surface-blue))',
            }}
          >
            {/* Animated aurora blobs */}
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-clip pointer-events-none"
            >
              {/* Cyan blob */}
              <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-40"
                style={{
                  top: '-100px',
                  left: '-100px',
                  background:
                    'radial-gradient(circle, var(--color-aqua), transparent 60%)',
                  filter: 'blur(80px)',
                  animation: 'drift1 22s ease-in-out infinite',
                }}
              />

              {/* Cobalt blob */}
              <div
                className="absolute w-[450px] h-[450px] rounded-full opacity-35"
                style={{
                  top: '50%',
                  right: '-150px',
                  background:
                    'radial-gradient(circle, var(--color-cobalt), transparent 60%)',
                  filter: 'blur(90px)',
                  animation: 'drift2 26s ease-in-out infinite',
                }}
              />

              {/* Green blob */}
              <div
                className="absolute w-[380px] h-[380px] rounded-full opacity-30"
                style={{
                  bottom: '-80px',
                  left: '30%',
                  background:
                    'radial-gradient(circle, var(--color-green), transparent 60%)',
                  filter: 'blur(85px)',
                  animation: 'drift3 24s ease-in-out infinite',
                }}
              />

              {/* Aero grid overlay */}
              <div className="absolute inset-0 aero-grid" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Available badge */}
              <div className="flex justify-center mb-6">
                <Badge
                  variant="glass"
                  withDot
                  dotColor="var(--color-green)"
                  className="text-sm"
                >
                  available for work
                </Badge>
              </div>

              {/* Headline */}
              <h2
                className="font-extrabold leading-tight mb-4"
                style={{
                  fontSize: 'clamp(36px, 5vw, 54px)',
                  letterSpacing: '-0.035em',
                  color: 'var(--color-ink)',
                }}
              >
                Let's build something people love.
              </h2>

              {/* Sub text */}
              <p
                className="text-base leading-relaxed mb-8 max-w-2xl mx-auto"
                style={{
                  color: 'var(--color-ink-muted)',
                }}
              >
                Have a product, a research idea, or a role in mind? I'd love to
                hear about it.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {/* Primary CTA with flowing gradient */}
                <a
                  href="mailto:cankarakoc@berkeley.edu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] font-semibold text-sm text-white no-underline mag"
                  style={{
                    background:
                      'linear-gradient(135deg, #1D4ED8, #2249B8, #0891B2, #16A34A)',
                    backgroundSize: '220% 220%',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px rgba(15,40,120,0.85)',
                    animation: 'ctaflow 6s ease-in-out infinite',
                  }}
                >
                  Get in touch →
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/can-karakoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-pill)] font-semibold text-sm no-underline mag"
                  style={{
                    background: 'var(--color-glass-55)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--color-glass-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/can-karakoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-pill)] font-semibold text-sm no-underline mag"
                  style={{
                    background: 'var(--color-glass-55)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--color-glass-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  <GitHubIcon />
                  GitHub
                </a>
              </div>

              {/* Email display */}
              <p
                className="text-sm"
                style={{
                  fontFamily: 'var(--font-plex)',
                  color: 'var(--color-ink-muted)',
                }}
              >
                cankarakoc@berkeley.edu
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
