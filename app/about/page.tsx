import { Navigation, Footer, Capabilities, Principles } from '@/components/sections';
import { ScrollReveal } from '@/components/animations';
import { PageTransition } from '@/components/PageTransition';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <PageTransition>
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
                {/* Asymmetric Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1160px]">
                  {/* Education Card - Spans 2 columns, interactive tilt */}
                  <motion.div
                    className="md:col-span-2 p-8 rounded-3xl group cursor-default"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(124, 185, 232, 0.2)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 20px -8px rgba(124, 185, 232, 0.15)',
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
                    <motion.h3
                      className="font-extrabold mb-3"
                      style={{
                        fontSize: 'clamp(28px, 3vw, 40px)',
                        letterSpacing: '-0.02em',
                        color: 'var(--color-ink)',
                      }}
                      whileHover={{ x: 4 }}
                    >
                      University of California, Berkeley
                    </motion.h3>
                    <p
                      className="font-semibold mb-2 text-lg"
                      style={{
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
                  </motion.div>

                  {/* Resume Download Card - Compact CTA */}
                  <motion.a
                    href="/resume.pdf"
                    download
                    className="relative overflow-hidden p-8 rounded-3xl flex flex-col justify-center items-center no-underline group"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'linear-gradient(160deg, var(--color-cobalt), var(--color-cobalt-darker))',
                      boxShadow: '0 34px 70px -46px rgba(124, 185, 232, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                  >
                    {/* Cyan glow */}
                    <div
                      className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30 transition-transform duration-500 group-hover:scale-150"
                      style={{
                        background: 'radial-gradient(circle, var(--color-aqua), transparent 60%)',
                        filter: 'blur(60px)',
                      }}
                    />

                    <div className="relative z-10 text-center">
                      <p
                        className="text-xs font-bold mb-3 tracking-wider"
                        style={{
                          fontFamily: 'var(--font-plex)',
                          color: 'var(--color-lime)',
                        }}
                      >
                        RÉSUMÉ
                      </p>
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          border: '2px solid rgba(255,255,255,0.4)',
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </motion.div>
                      <p className="font-bold text-white text-sm">Download Resume</p>
                    </div>
                  </motion.a>

                  {/* Focus Card - Larger, spans 2 columns */}
                  <motion.div
                    className="md:col-span-2 p-8 rounded-3xl group"
                    whileHover={{ scale: 1.02, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'linear-gradient(135deg, var(--color-cobalt) 0%, rgba(107, 165, 216, 0.9) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 20px 40px -20px rgba(124, 185, 232, 0.4)',
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
                    <motion.h3
                      className="font-extrabold mb-4 text-white"
                      style={{
                        fontSize: 'clamp(28px, 3vw, 42px)',
                        letterSpacing: '-0.02em',
                      }}
                      whileHover={{ x: 6 }}
                    >
                      Machine Learning &<br/>Computational Biology
                    </motion.h3>
                    <p
                      className="text-[16px] leading-relaxed"
                      style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    >
                      Leveraging AI and statistical modeling to explore complex biological systems and molecular data.
                    </p>
                  </motion.div>

                  {/* Interests Card - Smaller, interactive pills */}
                  <motion.div
                    className="p-8 rounded-3xl"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(124, 185, 232, 0.2)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 20px -8px rgba(124, 185, 232, 0.15)',
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
                    <div className="flex flex-wrap gap-2">
                      {['Design', 'Photography', 'Hiking', 'Product Ideas', 'Web Design'].map((interest, idx) => (
                        <motion.span
                          key={interest}
                          className="px-4 py-2 rounded-full text-xs font-medium cursor-default"
                          whileHover={{ scale: 1.15, rotate: 2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          style={{
                            fontFamily: 'var(--font-plex)',
                            color: 'var(--color-ink)',
                            background: 'rgba(124, 185, 232, 0.1)',
                            border: '1px solid rgba(124, 185, 232, 0.2)',
                          }}
                        >
                          {interest}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
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
    </PageTransition>
  );
}
