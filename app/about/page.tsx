'use client';

import { Navigation, Footer, Capabilities, Principles } from '@/components/sections';
import { ScrollReveal } from '@/components/animations';
import { PageTransition } from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="relative z-10" style={{ background: 'var(--color-surface-white)' }}>
        <Navigation />
        <main>
          {/* Bento Grid Section */}
          <section className="relative px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
            <div className="max-w-[1160px] mx-auto w-full">
              <ScrollReveal>
                {/* Bento Grid - 6 columns for flexible sizing */}
                <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-fr gap-5 max-w-[1160px]">

                  {/* Profile Photo Card - 1.5 columns */}
                  <motion.div
                    className="md:col-span-1 p-0 rounded-3xl overflow-hidden"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.15)',
                      aspectRatio: '1',
                    }}
                  >
                    <img
                      src="/photos/profile.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Education Card - 3 columns (largest), Berkeley logo appears on hover */}
                  <motion.div
                    className="md:col-span-3 p-6 rounded-3xl group relative"
                    onMouseEnter={() => setHoveredCard('education')}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: 'linear-gradient(135deg, #003262 0%, #004A8F 100%)',
                      border: '1px solid rgba(253, 181, 21, 0.3)',
                      boxShadow: '0 20px 40px -20px rgba(0, 50, 98, 0.4)',
                      overflow: 'visible',
                      position: 'relative',
                      zIndex: hoveredCard === 'education' ? 100 : 1,
                    }}
                  >
                    {/* Berkeley Logo appears on hover */}
                    {hoveredCard === 'education' && (
                      <motion.div
                        className="absolute pointer-events-none"
                        initial={{
                          opacity: 0,
                          scale: 0.5,
                          rotate: -15,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotate: 8,
                          y: [0, -10, 0],
                        }}
                        transition={{
                          opacity: { duration: 0.3 },
                          scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          rotate: { duration: 0.3 },
                          y: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                        }}
                        style={{
                          top: '-35%',
                          right: '-15%',
                          width: '160px',
                          height: '160px',
                          zIndex: 200,
                        }}
                      >
                        <img
                          src="/berkeley-logo.svg"
                          alt="Berkeley Logo"
                          className="w-full h-full object-contain"
                          style={{
                            filter: 'drop-shadow(0 12px 30px rgba(0, 0, 0, 0.4))',
                          }}
                        />
                      </motion.div>
                    )}

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
                        className="text-xs font-bold mb-3 tracking-wider"
                        style={{
                          fontFamily: 'var(--font-plex)',
                          color: '#FDB515',
                        }}
                      >
                        EDUCATION
                      </p>
                      <h3
                        className="font-extrabold mb-2"
                        style={{
                          fontSize: 'clamp(20px, 2.5vw, 28px)',
                          letterSpacing: '-0.02em',
                          color: '#FFFFFF',
                        }}
                      >
                        University of California, Berkeley
                      </h3>
                      <p
                        className="font-semibold mb-1 text-base"
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        B.A. Computer Science & Data Science
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        Emphasis in Computational Methods in Molecular & Genomic Biology
                      </p>
                    </div>
                  </motion.div>

                  {/* Resume Download Card - 2 columns (smaller) */}
                  <motion.a
                    href="/resume.pdf"
                    download
                    className="md:col-span-2 p-6 rounded-3xl flex flex-col no-underline group"
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
                      className="text-xs font-bold mb-6 tracking-wider"
                      style={{
                        fontFamily: 'var(--font-plex)',
                        color: 'var(--color-ink-muted)',
                      }}
                    >
                      RÉSUMÉ
                    </p>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        className="flex items-center gap-3 px-5 py-2.5 rounded-full"
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
                          width="16"
                          height="16"
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

                  {/* Hobbies Card - Photos appear on hover - 2 columns */}
                  <motion.div
                    className="md:col-span-2 p-6 rounded-3xl relative"
                    onMouseEnter={() => setHoveredCard('hobbies')}
                    onMouseLeave={() => setHoveredCard(null)}
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(124, 185, 232, 0.15)',
                      boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.08)',
                      overflow: 'visible',
                      cursor: hoveredCard === 'hobbies' ? 'pointer' : 'default',
                      position: 'relative',
                      zIndex: hoveredCard === 'hobbies' ? 100 : 1,
                    }}
                  >
                    {/* Floating Photos on hover */}
                    {hoveredCard === 'hobbies' && (
                      <>
                        {[
                          { src: '/photos/london.jpg', top: '-30%', left: '-45%', rotate: -6, delay: 0 },
                          { src: '/photos/parthenon.jpg', top: '-25%', right: '-50%', rotate: 5, delay: 0.05 },
                          { src: '/photos/beach.jpg', top: '45%', left: '-50%', rotate: -7, delay: 0.1 },
                          { src: '/photos/coast2.jpg', top: '40%', right: '-55%', rotate: 7, delay: 0.15 },
                          { src: '/photos/istanbul1.jpg', bottom: '-30%', left: '-40%', rotate: 4, delay: 0.2 },
                          { src: '/photos/coast1.jpg', bottom: '-25%', right: '-45%', rotate: -5, delay: 0.25 },
                        ].map((photo, idx) => (
                          <motion.div
                            key={idx}
                            className="absolute pointer-events-none z-50"
                            initial={{
                              opacity: 0,
                              scale: 0.5,
                              rotate: 0,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              rotate: photo.rotate,
                              y: [0, -8, 0],
                            }}
                            transition={{
                              opacity: { duration: 0.3, delay: photo.delay },
                              scale: { duration: 0.3, delay: photo.delay, ease: [0.22, 1, 0.36, 1] },
                              rotate: { duration: 0.3, delay: photo.delay },
                              y: {
                                duration: 2 + idx * 0.3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: photo.delay,
                              },
                            }}
                            style={{
                              top: photo.top,
                              bottom: photo.bottom,
                              left: photo.left,
                              right: photo.right,
                              width: '180px',
                              height: '130px',
                            }}
                          >
                            <img
                              src={photo.src}
                              alt=""
                              className="w-full h-full object-cover rounded-xl"
                              style={{
                                boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.4)',
                                border: '6px solid white',
                              }}
                            />
                          </motion.div>
                        ))}
                      </>
                    )}

                    {/* Hover overlay with text */}
                    {hoveredCard === 'hobbies' && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center p-8 rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed text-center"
                          style={{
                            color: 'var(--color-ink-muted)',
                            fontFamily: 'var(--font-jakarta)',
                          }}
                        >
                          Beyond professional pursuits, I'm about design and innovation—exploring product ideas, web design, and graphic projects. I also love photography, hiking, and spending time in nature.
                        </p>
                      </motion.div>
                    )}

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
                      ].map((hobby) => (
                        <div
                          key={hobby.text}
                          className="flex flex-col items-center justify-center p-3 rounded-2xl"
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
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Focus Card - Text overlay on hover - 4 columns */}
                  <motion.div
                    className="md:col-span-4 p-6 rounded-3xl group relative"
                    onMouseEnter={() => setHoveredCard('focus')}
                    onMouseLeave={() => setHoveredCard(null)}
                    whileHover={{ scale: 1.02, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'linear-gradient(135deg, #2D5F4E 0%, #1E4D3C 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 20px 40px -20px rgba(45, 95, 78, 0.5)',
                      cursor: hoveredCard === 'focus' ? 'pointer' : 'default',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Grid overlay */}
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

                    {/* Content - title stays, description expands on hover */}
                    <div className="relative z-10">
                      <p
                        className="text-xs font-bold mb-3 tracking-wider text-right"
                        style={{
                          fontFamily: 'var(--font-plex)',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        FOCUS
                      </p>
                      <h3
                        className="font-extrabold mb-3 text-white text-right"
                        style={{
                          fontSize: 'clamp(24px, 2.5vw, 36px)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        Machine Learning &<br/>Computational Biology
                      </h3>

                      {/* Description - expands on hover */}
                      <motion.p
                        className="leading-relaxed text-right"
                        animate={{
                          fontSize: hoveredCard === 'focus' ? '16px' : '14px',
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        {hoveredCard === 'focus'
                          ? 'My interest bridges data-driven computational approaches with biological research, with a particular emphasis on leveraging machine learning and statistical modeling to explore complex biological systems and molecular data.'
                          : 'Leveraging AI and statistical modeling to explore complex biological systems and molecular data.'
                        }
                      </motion.p>
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
