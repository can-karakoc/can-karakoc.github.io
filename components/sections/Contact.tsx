'use client';

import { Badge } from '@/components/ui';
import { ScrollReveal } from '@/components/animations';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/SocialIcon';

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 pt-20 pb-40"
      style={{
        background: 'linear-gradient(180deg, #ffffff, #eef5ff 40%, #e6f0fb)',
      }}
    >
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-[32px] px-10 py-[90px] text-center"
            style={{
              background: 'linear-gradient(180deg, #ffffff, #eef5ff 60%, #e6f0fb)',
              boxShadow: '0 40px 80px -30px rgba(23,70,184,0.3), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            {/* Background layers matching hero */}
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
            <div className="relative z-10">
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

              {/* Headline */}
              <h2
                className="font-extrabold leading-tight mb-5"
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
                className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
                style={{
                  color: 'var(--color-ink-muted)',
                }}
              >
                Have a product, a research idea, or a role in mind? I'd love to
                hear about it.
              </p>

              {/* Buttons - matching hero style */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-6">
                {/* Primary CTA */}
                <a
                  href="mailto:cankarakoc@berkeley.edu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] font-bold text-sm text-white no-underline mag"
                  style={{
                    background: 'linear-gradient(180deg, #2249B8, #122E8C)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px rgba(15,40,120,0.85)',
                  }}
                >
                  Get in touch →
                </a>

                {/* LinkedIn */}
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

                {/* GitHub */}
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
