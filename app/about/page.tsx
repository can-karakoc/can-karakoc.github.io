import { Navigation, Footer, Capabilities, Principles } from '@/components/sections';
import { ScrollReveal } from '@/components/animations';

export default function About() {
  return (
    <div className="relative z-10" style={{ background: 'var(--color-surface-white)' }}>
      <Navigation />
      <main>
        {/* Header + bio */}
        <section className="relative py-20 px-6">
          <div className="max-w-[1160px] mx-auto">
            <ScrollReveal>
              <div className="max-w-[760px] mb-14">
                <h1
                  className="font-extrabold leading-none mb-4"
                  style={{
                    fontSize: 'clamp(42px, 6vw, 64px)',
                    letterSpacing: '-0.04em',
                    color: 'var(--color-ink)',
                  }}
                >
                  About Me
                </h1>
                <p
                  className="text-lg"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  Computational biology, machine learning, and a design habit
                  I can't quite shake.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1160px]">
                {/* Education Card */}
                <div
                  className="p-8 rounded-3xl transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(10, 37, 64, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <p
                    className="text-xs font-bold mb-4 tracking-wider"
                    style={{
                      fontFamily: 'var(--font-plex)',
                      color: 'var(--color-cobalt)',
                    }}
                  >
                    EDUCATION
                  </p>
                  <h3
                    className="font-extrabold mb-3"
                    style={{
                      fontSize: 'clamp(24px, 2.2vw, 32px)',
                      letterSpacing: '-0.02em',
                      color: 'var(--color-ink)',
                    }}
                  >
                    University of California, Berkeley
                  </h3>
                  <p
                    className="font-semibold mb-2"
                    style={{
                      fontSize: '18px',
                      color: 'var(--color-ink)',
                    }}
                  >
                    B.A. Computer Science & Data Science
                  </p>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    Emphasis in Computational Methods in Molecular & Genomic Biology
                  </p>
                </div>

                {/* Resume Download Card */}
                <div
                  className="relative overflow-hidden p-8 rounded-3xl transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                  style={{
                    background: 'linear-gradient(160deg, var(--color-cobalt), var(--color-cobalt-darker))',
                    boxShadow: '0 34px 70px -46px rgba(23,70,184,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  {/* Cyan glow top-right */}
                  <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30"
                    style={{
                      background: 'radial-gradient(circle, var(--color-aqua), transparent 60%)',
                      filter: 'blur(60px)',
                    }}
                  />

                  <div className="relative z-10">
                    <p
                      className="text-xs font-bold mb-4 tracking-wider"
                      style={{
                        fontFamily: 'var(--font-plex)',
                        color: 'var(--color-lime)',
                      }}
                    >
                      RÉSUMÉ
                    </p>
                    <h3
                      className="font-extrabold mb-6 text-white"
                      style={{
                        fontSize: 'clamp(24px, 2.2vw, 32px)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Download my full resume
                    </h3>
                    <a
                      href="/resume.pdf"
                      download
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm text-white no-underline transition-all duration-200 hover:scale-105"
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

                {/* Skills/Research Card */}
                <div
                  className="p-8 rounded-3xl transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-cobalt) 0%, rgba(59, 130, 246, 0.9) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <p
                    className="text-xs font-bold mb-4 tracking-wider"
                    style={{
                      fontFamily: 'var(--font-plex)',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    FOCUS
                  </p>
                  <h3
                    className="font-extrabold mb-4 text-white"
                    style={{
                      fontSize: 'clamp(24px, 2.2vw, 32px)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Machine Learning & Computational Biology
                  </h3>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Leveraging AI and statistical modeling to explore complex biological systems and molecular data.
                  </p>
                </div>

                {/* Interests Card */}
                <div
                  className="p-8 rounded-3xl transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(124, 185, 232, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <p
                    className="text-xs font-bold mb-4 tracking-wider"
                    style={{
                      fontFamily: 'var(--font-plex)',
                      color: 'var(--color-lime)',
                    }}
                  >
                    BEYOND CODE
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Design', 'Photography', 'Hiking', 'Product Ideas', 'Web Design'].map((interest) => (
                      <span
                        key={interest}
                        className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                        style={{
                          fontFamily: 'var(--font-plex)',
                          color: 'var(--color-ink)',
                          background: 'rgba(10, 37, 64, 0.06)',
                          border: '1px solid rgba(10, 37, 64, 0.12)',
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Engineering principles */}
        <div className="px-6">
          <div className="max-w-[1160px] mx-auto">
            <Principles />
          </div>
        </div>

        {/* Skills breakdown */}
        <div className="px-6 pb-24">
          <div className="max-w-[1160px] mx-auto">
            <Capabilities />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
