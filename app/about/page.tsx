'use client';

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
          {/* Bento Grid Section - Centered */}
          <section className="relative px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
            <div className="max-w-[1160px] mx-auto w-full">
              <ScrollReveal>
                {/* Asymmetric Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1160px]">
                  {/* Education Card - Berkeley colors with animated hue */}
                  <motion.div
                    className="md:col-span-2 p-8 rounded-3xl group cursor-default relative overflow-hidden"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'linear-gradient(135deg, #003262 0%, #004A8F 100%)',
                      border: '1px solid rgba(253, 181, 21, 0.3)',
                      boxShadow: '0 20px 40px -20px rgba(0, 50, 98, 0.4)',
                    }}
                  >
                    {/* Animated gold hue overlay */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'radial-gradient(circle at 70% 30%, rgba(253, 181, 21, 0.4), transparent 70%)',
                        animation: 'drift1 20s ease-in-out infinite',
                      }}
                    />

                    <div className="relative z-10">
                      <p
                        className="text-xs font-bold mb-4 tracking-wider"
                        style={{
                          fontFamily: 'var(--font-plex)',
                          color: '#FDB515',
                        }}
                      >
                        EDUCATION
                      </p>
                      <h3
                        className="font-extrabold mb-3"
                        style={{
                          fontSize: 'clamp(28px, 3vw, 40px)',
                          letterSpacing: '-0.02em',
                          color: '#FFFFFF',
                        }}
                      >
                        University of California, Berkeley
                      </h3>
                      <p
                        className="font-semibold mb-2 text-lg"
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        B.A. Computer Science & Data Science
                      </p>
                      <p
                        className="text-[15px] leading-relaxed"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        Emphasis in Computational Methods in Molecular & Genomic Biology
                      </p>
                    </div>
                  </motion.div>

                  {/* Resume Download Card - Minimal */}
                  <motion.a
                    href="/resume.pdf"
                    download
                    className="p-8 rounded-3xl flex flex-col no-underline group"
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 4px 20px -8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <p
                      className="text-xs font-bold mb-8 tracking-wider"
                      style={{
                        fontFamily: 'var(--font-plex)',
                        color: 'var(--color-ink-muted)',
                      }}
                    >
                      RÉSUMÉ
                    </p>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        className="flex items-center gap-3 px-6 py-3 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: 'rgba(124, 185, 232, 0.15)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(124, 185, 232, 0.3)',
                          boxShadow: '0 4px 12px rgba(124, 185, 232, 0.2)',
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--color-cobalt)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span className="font-semibold text-sm" style={{ color: 'var(--color-cobalt)' }}>
                          Download Resume
                        </span>
                      </motion.div>
                    </div>
                  </motion.a>

                  {/* Hobbies Card - Grid layout with emojis */}
                  <motion.div
                    className="p-8 rounded-3xl"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(124, 185, 232, 0.15)',
                      boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <p
                      className="text-xs font-bold mb-6 tracking-wider"
                      style={{
                        fontFamily: 'var(--font-plex)',
                        color: 'var(--color-cobalt)',
                      }}
                    >
                      HOBBIES
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { emoji: '🎨', text: 'Design' },
                        { emoji: '📸', text: 'Photography' },
                        { emoji: '🥾', text: 'Hiking' },
                        { emoji: '☕', text: 'Coffee' },
                      ].map((hobby, idx) => (
                        <motion.div
                          key={hobby.text}
                          className="flex flex-col items-center justify-center p-3 rounded-2xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          style={{
                            background: 'rgba(124, 185, 232, 0.05)',
                          }}
                        >
                          <span className="text-2xl mb-2">{hobby.emoji}</span>
                          <span
                            className="font-medium text-xs"
                            style={{
                              color: 'var(--color-ink)',
                            }}
                          >
                            {hobby.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Focus Card - Deep green comp bio gradient with grid */}
                  <motion.div
                    className="md:col-span-2 p-8 rounded-3xl group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'linear-gradient(135deg, #2D5F4E 0%, #1E4D3C 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 20px 40px -20px rgba(45, 95, 78, 0.5)',
                    }}
                  >
                    {/* Aero grid overlay with opacity mask - more subtle */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(ellipse at center, black 0%, black 30%, transparent 75%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 30%, transparent 75%)',
                      }}
                    />
                    <div className="relative z-10">
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
                        fontSize: 'clamp(28px, 3vw, 42px)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Machine Learning &<br/>Computational Biology
                    </h3>
                      <p
                        className="text-[16px] leading-relaxed"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        Leveraging AI and statistical modeling to explore complex biological systems and molecular data.
                      </p>
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
