'use client';

import { GlassCard } from '@/components/ui';
import { ScrollReveal } from '@/components/animations';

export function Resume() {
  return (
    <section id="resume" className="relative z-10 px-6 py-5 pb-16">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px] items-stretch">
          {/* Education Card */}
          <ScrollReveal>
            <GlassCard opacity="60" className="p-8 h-full">
              <div
                className="font-semibold text-xs tracking-[0.2em] uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-plex)',
                  color: 'var(--color-cobalt)',
                }}
              >
                EDUCATION
              </div>

              <h3
                className="font-extrabold text-[23px] leading-tight mb-3"
                style={{
                  color: 'var(--color-ink)',
                }}
              >
                University of California, Berkeley
              </h3>

              <p
                className="text-base font-semibold mb-2"
                style={{
                  color: 'var(--color-ink)',
                }}
              >
                B.A. Computer Science & Data Science
              </p>

              <p
                className="text-[14.5px] leading-relaxed"
                style={{
                  color: 'var(--color-ink-muted)',
                }}
              >
                Emphasis in Computational Methods in Molecular & Genomic
                Biology.
              </p>
            </GlassCard>
          </ScrollReveal>

          {/* Resume Download Card */}
          <ScrollReveal delay={0.1}>
            <div
              className="relative overflow-hidden rounded-[var(--radius-card)] p-8 h-full flex flex-col justify-between"
              style={{
                background:
                  'linear-gradient(160deg, var(--color-cobalt), var(--color-cobalt-darker))',
                boxShadow:
                  '0 34px 70px -46px rgba(23,70,184,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              {/* Cyan glow top-right */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30"
                style={{
                  background:
                    'radial-gradient(circle, var(--color-aqua), transparent 60%)',
                  filter: 'blur(60px)',
                }}
              />

              <div className="relative z-10">
                <div
                  className="font-semibold text-xs tracking-[0.2em] uppercase mb-4"
                  style={{
                    fontFamily: 'var(--font-plex)',
                    color: 'var(--color-lime)',
                  }}
                >
                  RÉSUMÉ
                </div>

                <h3 className="font-extrabold text-[23px] leading-tight mb-6 text-white">
                  Download my full resume
                </h3>

                <a
                  href="/resume.pdf"
                  download
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-pill)] font-semibold text-sm text-white no-underline mag"
                  style={{
                    background: 'rgba(255,255,255,0.16)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  Download my resume
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
