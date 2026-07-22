'use client';

import { Navigation, Footer, Capabilities, Principles } from '@/components/sections';
import { ScrollReveal } from '@/components/animations';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="relative z-10" style={{ background: 'var(--color-surface-white)' }}>
        <Navigation />
        <main>
          {/* Bento Grid Section */}
          <section className="relative px-6 min-h-[calc(100vh-80px)] flex items-center justify-center" style={{ overflow: 'visible' }}>
            <div className="max-w-[1160px] mx-auto w-full" style={{ overflow: 'visible' }}>
              <div style={{ overflow: 'visible', padding: '100px 0' }}>
                <ScrollReveal>
                  {/* Bento Grid - 6 columns for flexible sizing */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-5 max-w-[1160px]" style={{ overflow: 'visible' }}>

                  {/* Profile Photo Card - fills full row height */}
                  <motion.div
                    className="md:col-span-1 md:row-span-1 p-0 rounded-3xl overflow-hidden group"
                    style={{
                      boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <img
                      src="/photos/profile.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                    />
                  </motion.div>

                  {/* Education Card - 4 columns (larger), Berkeley logo appears on hover */}
                  <motion.div
                    className="md:col-span-4 p-6 rounded-3xl group relative"
                    onMouseEnter={() => setHoveredCard('education')}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: 'linear-gradient(135deg, #003262 0%, #004A8F 100%)',
                      border: '1px solid rgba(253, 181, 21, 0.3)',
                      boxShadow: '0 20px 40px -20px rgba(0, 50, 98, 0.4)',
                      overflow: 'hidden',
                      position: 'relative',
                      zIndex: hoveredCard === 'education' ? 100 : 1,
                      cursor: 'pointer',
                    }}
                  >
                    {/* Berkeley banner - springs in fully visible on the right,
                        sized to fit inside the card */}
                    <div
                      className="absolute inset-0 flex items-center justify-end pointer-events-none"
                      style={{ paddingRight: '36px', zIndex: 20 }}
                    >
                      <motion.div
                        initial={false}
                        animate={
                          hoveredCard === 'education'
                            ? {
                                opacity: 1,
                                scale: 1,
                                rotate: 8,
                                y: [0, -6, 0],
                              }
                            : { opacity: 0, scale: 0.6, rotate: -12, y: 0 }
                        }
                        transition={
                          hoveredCard === 'education'
                            ? {
                                opacity: { duration: 0.3 },
                                scale: { type: 'spring', stiffness: 300, damping: 18 },
                                rotate: { type: 'spring', stiffness: 300, damping: 18 },
                                y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                              }
                            : { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
                        }
                        style={{
                          height: '88%',
                          aspectRatio: '1 / 1',
                        }}
                      >
                        <img
                          src="/berkeley-logo.svg"
                          alt="Berkeley banner"
                          className="w-full h-full object-contain"
                          style={{
                            filter: 'drop-shadow(0 10px 24px rgba(0, 0, 0, 0.35))',
                          }}
                        />
                      </motion.div>
                    </div>

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

                  {/* Resume Download Card - 1 column (smallest) */}
                  <motion.a
                    href="/resume.pdf"
                    download="Can-Karakoc-Resume.pdf"
                    className="md:col-span-1 p-6 rounded-3xl flex flex-col no-underline group"
                    onMouseEnter={() => setHoveredCard('resume')}
                    onMouseLeave={() => setHoveredCard(null)}
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
                        animate={{
                          scale: hoveredCard === 'resume' ? 1.06 : 1,
                          boxShadow:
                            hoveredCard === 'resume'
                              ? '0 8px 20px rgba(124, 185, 232, 0.4)'
                              : '0 4px 12px rgba(124, 185, 232, 0.2)',
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          background: 'rgba(124, 185, 232, 0.15)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(124, 185, 232, 0.3)',
                        }}
                      >
                        <motion.svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--color-cobalt)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          animate={
                            hoveredCard === 'resume'
                              ? { y: [0, 3, 0] }
                              : { y: 0 }
                          }
                          transition={
                            hoveredCard === 'resume'
                              ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
                              : { duration: 0.2 }
                          }
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </motion.svg>
                        <span className="font-semibold text-sm" style={{ color: 'var(--color-cobalt)' }}>
                          Download
                        </span>
                      </motion.div>
                    </div>
                  </motion.a>

                  {/* Hobbies Card - Photos appear on hover - 2 columns */}
                  <motion.div
                    className="md:col-span-2 p-6 rounded-3xl relative"
                    onMouseEnter={() => setHoveredCard('hobbies')}
                    onMouseLeave={() => setHoveredCard(null)}
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
                    <AnimatePresence>
                    {hoveredCard === 'hobbies' &&
                        [
                          { src: '/photos/london.jpg', top: '-20%', left: '-25%', rotate: -6, delay: 0 },
                          { src: '/photos/parthenon.jpg', top: '-15%', right: '-30%', rotate: 5, delay: 0.05 },
                          { src: '/photos/beach.jpg', top: '35%', left: '-30%', rotate: -7, delay: 0.1 },
                          { src: '/photos/coast2.jpg', top: '30%', right: '-35%', rotate: 7, delay: 0.15 },
                          { src: '/photos/istanbul1.jpg', bottom: '-20%', left: '-20%', rotate: 4, delay: 0.2 },
                          { src: '/photos/coast1.jpg', bottom: '-15%', right: '-25%', rotate: -5, delay: 0.25 },
                        ].map((photo, idx) => (
                          <motion.div
                            key={photo.src}
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
                            exit={{
                              opacity: 0,
                              scale: 0.7,
                              rotate: 0,
                              y: 10,
                              transition: {
                                duration: 0.45,
                                delay: photo.delay * 0.5,
                                ease: [0.32, 0.72, 0, 1],
                              },
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
                              width: '140px',
                              height: '100px',
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

                    {/* Hover overlay with text */}
                    {hoveredCard === 'hobbies' && (
                      <motion.div
                        key="hobbies-overlay"
                        className="absolute inset-0 flex items-center justify-center p-8 rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
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
                    </AnimatePresence>

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

                    {/* Default content - label pinned top-right, title + text
                        vertically centered in the remaining space */}
                    <motion.div
                      className="relative z-10 h-full flex flex-col items-center justify-center text-center"
                      initial={false}
                      animate={{
                        opacity: hoveredCard === 'focus' ? 0 : 1,
                        y: hoveredCard === 'focus' ? -8 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p
                        className="text-xs font-bold tracking-wider absolute top-0 right-0"
                        style={{
                          fontFamily: 'var(--font-plex)',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        FOCUS
                      </p>
                      <h3
                        className="font-extrabold mb-3 text-white whitespace-nowrap"
                        style={{
                          fontSize: 'clamp(18px, 2vw, 28px)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        Machine Learning & Computational Biology
                      </h3>
                      <p
                        className="leading-relaxed text-sm max-w-[52ch]"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        Leveraging AI and statistical modeling to explore complex biological systems and molecular data.
                      </p>
                    </motion.div>

                    {/* Hover state - DNA helix on the left, full description on
                        the right; replaces the default content entirely */}
                    <motion.div
                      className="absolute inset-0 flex items-center gap-8 p-8 pointer-events-none"
                      style={{ zIndex: 15 }}
                      initial={false}
                      animate={{ opacity: hoveredCard === 'focus' ? 1 : 0 }}
                      transition={{
                        duration: hoveredCard === 'focus' ? 0.3 : 0.5,
                        delay: hoveredCard === 'focus' ? 0 : 0.15,
                      }}
                    >
                      <motion.svg
                        viewBox="0 0 120 300"
                        fill="none"
                        preserveAspectRatio="xMidYMid meet"
                        className="flex-shrink-0"
                        style={{ height: '100%', width: 'auto' }}
                        animate={
                          hoveredCard === 'focus'
                            ? { y: [0, -5, 0] }
                            : { y: 0 }
                        }
                        transition={
                          hoveredCard === 'focus'
                            ? { y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }
                            : { duration: 0.3 }
                        }
                      >
                        {/* Strands */}
                        {[
                          'M 90 0 C 90 25, 30 25, 30 50 C 30 75, 90 75, 90 100 C 90 125, 30 125, 30 150 C 30 175, 90 175, 90 200 C 90 225, 30 225, 30 250 C 30 275, 90 275, 90 300',
                          'M 30 0 C 30 25, 90 25, 90 50 C 90 75, 30 75, 30 100 C 30 125, 90 125, 90 150 C 90 175, 30 175, 30 200 C 30 225, 90 225, 90 250 C 90 275, 30 275, 30 300',
                        ].map((d, i) => (
                          <motion.path
                            key={i}
                            d={d}
                            stroke="rgba(167, 243, 208, 0.9)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={false}
                            animate={{
                              pathLength: hoveredCard === 'focus' ? 1 : 0,
                            }}
                            transition={{
                              duration: hoveredCard === 'focus' ? 1.1 : 0.5,
                              ease: 'easeInOut',
                              delay: hoveredCard === 'focus' ? i * 0.1 : 0,
                            }}
                          />
                        ))}
                        {/* Rungs - light up sequentially */}
                        {[10, 40, 60, 90, 110, 140, 160, 190, 210, 240, 260, 290].map(
                          (y, i) => (
                            <motion.line
                              key={y}
                              x1="37"
                              y1={y}
                              x2="83"
                              y2={y}
                              stroke="rgba(255, 255, 255, 0.55)"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              initial={false}
                              animate={{
                                opacity: hoveredCard === 'focus' ? 1 : 0,
                              }}
                              transition={{
                                duration: hoveredCard === 'focus' ? 0.25 : 0.15,
                                delay:
                                  hoveredCard === 'focus'
                                    ? 0.35 + i * 0.06
                                    : (11 - i) * 0.025,
                              }}
                            />
                          )
                        )}
                      </motion.svg>

                      <motion.p
                        className="flex-1 leading-relaxed text-left"
                        style={{
                          color: 'rgba(255, 255, 255, 0.95)',
                          fontSize: 'clamp(14px, 1.3vw, 17px)',
                        }}
                        initial={false}
                        animate={{
                          opacity: hoveredCard === 'focus' ? 1 : 0,
                          x: hoveredCard === 'focus' ? 0 : 24,
                        }}
                        transition={{
                          duration: hoveredCard === 'focus' ? 0.4 : 0.35,
                          delay: hoveredCard === 'focus' ? 0.15 : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        My interest bridges data-driven computational approaches with biological research, with a particular emphasis on leveraging machine learning and statistical modeling to explore complex biological systems and molecular data.
                      </motion.p>
                    </motion.div>
                  </motion.div>

                </div>
                </ScrollReveal>
              </div>
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
