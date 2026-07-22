'use client';

import { Navigation, Footer, Capabilities, Principles } from '@/components/sections';
import { ScrollReveal } from '@/components/animations';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function About() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (cardId: string) => {
    // Clear any existing timeout
    if (hoverTimeout) clearTimeout(hoverTimeout);

    // Set a slight delay before showing to prevent accidental triggers
    const timeout = setTimeout(() => {
      setExpandedCard(cardId);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    // Clear the pending timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setExpandedCard(null);
  };

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedCard) {
        setExpandedCard(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedCard]);

  return (
    <>
      {/* Overlay Modals - Outside PageTransition */}
      <AnimatePresence>
        {expandedCard && (
          <>
            {/* Backdrop - transparent, closes on hover exit */}
            <motion.div
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={handleMouseLeave}
              style={{ zIndex: 9998 }}
            />

            {/* Hobbies Expanded Modal */}
            {expandedCard === 'hobbies' && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => handleMouseEnter('hobbies')}
                onMouseLeave={handleMouseLeave}
                style={{ zIndex: 9999, pointerEvents: 'none' }}
              >
                {/* Glow/blur halo - darker shadow layer */}
                <motion.div
                  className="absolute rounded-[60px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    maxWidth: '950px',
                    height: '600px',
                    background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.08) 55%, transparent 75%)',
                    filter: 'blur(80px)',
                    zIndex: -2,
                  }}
                />
                {/* Light glow layer for depth */}
                <motion.div
                  className="absolute rounded-[60px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{
                    width: '100%',
                    maxWidth: '850px',
                    height: '520px',
                    background: 'radial-gradient(ellipse at center, rgba(124, 185, 232, 0.2) 0%, rgba(124, 185, 232, 0.1) 40%, transparent 65%)',
                    filter: 'blur(50px)',
                    zIndex: -1,
                  }}
                />

                <motion.div
                  className="relative p-10 rounded-3xl overflow-visible"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: '100%',
                    maxWidth: '700px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(124, 185, 232, 0.2)',
                    boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4)',
                    pointerEvents: 'auto',
                  }}
                >
                {/* Floating Photos - Better positioned and balanced */}
                {[
                  { src: '/photos/london.jpg', top: '-30%', left: '-16%', rotate: -6, delay: 0.2 },
                  { src: '/photos/parthenon.jpg', top: '-8%', right: '-16%', rotate: 5, delay: 0.3 },
                  { src: '/photos/beach.jpg', top: '42%', left: '-18%', rotate: -7, delay: 0.25 },
                  { src: '/photos/coast2.jpg', top: '38%', right: '-22%', rotate: 7, delay: 0.35 },
                  { src: '/photos/istanbul1.jpg', bottom: '-32%', left: '-12%', rotate: 4, delay: 0.4 },
                  { src: '/photos/coast1.jpg', bottom: '-28%', right: '-16%', rotate: -5, delay: 0.5 },
                ].map((photo, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute pointer-events-none"
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                      rotate: 0,
                      z: -100,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: photo.rotate,
                      z: 0,
                      y: [0, -10, 0],
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.7,
                      rotate: 0,
                      z: -100,
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: photo.delay },
                      scale: { duration: 0.5, delay: photo.delay, ease: [0.22, 1, 0.36, 1] },
                      rotate: { duration: 0.5, delay: photo.delay, ease: [0.22, 1, 0.36, 1] },
                      z: { duration: 0.5, delay: photo.delay, ease: [0.22, 1, 0.36, 1] },
                      y: {
                        duration: 3 + idx * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: photo.delay + 0.5,
                      },
                    }}
                    style={{
                      top: photo.top,
                      bottom: photo.bottom,
                      left: photo.left,
                      right: photo.right,
                      width: '220px',
                      height: '160px',
                      zIndex: 100,
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

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(null);
                  }}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-10"
                  style={{
                    background: 'rgba(124, 185, 232, 0.1)',
                    border: '1px solid rgba(124, 185, 232, 0.3)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-cobalt)" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="relative z-10">
                  <p
                    className="text-xs font-bold mb-6 tracking-wider"
                    style={{
                      fontFamily: 'var(--font-plex)',
                      color: 'var(--color-cobalt)',
                    }}
                  >
                    HOBBIES
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { emoji: '🎨', text: 'Design' },
                      { emoji: '📸', text: 'Photography' },
                      { emoji: '🥾', text: 'Hiking' },
                      { emoji: '☕', text: 'Coffee' },
                    ].map((hobby) => (
                      <div
                        key={hobby.text}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl"
                        style={{
                          background: 'rgba(124, 185, 232, 0.05)',
                        }}
                      >
                        <span className="text-3xl mb-2">{hobby.emoji}</span>
                        <span
                          className="font-medium text-sm"
                          style={{
                            color: 'var(--color-ink)',
                          }}
                        >
                          {hobby.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: 'var(--color-ink-muted)',
                      fontFamily: 'var(--font-jakarta)',
                    }}
                  >
                    Beyond professional pursuits, I'm about design and innovation—exploring product ideas, web design, and graphic projects. I also love photography, hiking, and spending time in nature, where I find inspiration in both creativity and the outdoors.
                  </p>
                </div>
                </motion.div>
              </motion.div>
            )}

            {/* Focus Expanded Modal */}
            {expandedCard === 'focus' && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => handleMouseEnter('focus')}
                onMouseLeave={handleMouseLeave}
                style={{ zIndex: 9999, pointerEvents: 'none' }}
              >
                {/* Glow/blur halo - darker shadow layer */}
                <motion.div
                  className="absolute rounded-[60px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    maxWidth: '950px',
                    height: '600px',
                    background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.08) 55%, transparent 75%)',
                    filter: 'blur(80px)',
                    zIndex: -2,
                  }}
                />
                {/* Green glow layer */}
                <motion.div
                  className="absolute rounded-[60px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{
                    width: '100%',
                    maxWidth: '850px',
                    height: '520px',
                    background: 'radial-gradient(ellipse at center, rgba(45, 95, 78, 0.3) 0%, rgba(45, 95, 78, 0.15) 40%, transparent 65%)',
                    filter: 'blur(50px)',
                    zIndex: -1,
                  }}
                />

                <motion.div
                  className="relative p-10 rounded-3xl overflow-hidden"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: '100%',
                    maxWidth: '700px',
                    background: 'linear-gradient(135deg, #2D5F4E 0%, #1E4D3C 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 40px 100px -20px rgba(45, 95, 78, 0.6)',
                    pointerEvents: 'auto',
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

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(null);
                  }}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

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
                    className="font-extrabold mb-6 text-white"
                    style={{
                      fontSize: 'clamp(32px, 4vw, 48px)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Machine Learning &<br/>Computational Biology
                  </h3>
                  <p
                    className="text-lg leading-relaxed mb-6"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Leveraging AI and statistical modeling to explore complex biological systems and molecular data.
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontFamily: 'var(--font-jakarta)',
                    }}
                  >
                    My interest bridges data-driven computational approaches with biological research, with a particular emphasis on leveraging machine learning and statistical modeling to explore complex biological systems.
                  </p>
                </div>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      <PageTransition>
        <div className="relative z-10" style={{ background: 'var(--color-surface-white)' }}>
        <Navigation />
        <main>
          {/* Bento Grid Section */}
          <section className="relative px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
            <div className="max-w-[1160px] mx-auto w-full">
              <ScrollReveal>
                {/* Asymmetric Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1160px]">
                  {/* Education Card - Berkeley colors with bear cursor */}
                  <motion.div
                    className="md:col-span-2 p-8 rounded-3xl group relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #003262 0%, #004A8F 100%)',
                      border: '1px solid rgba(253, 181, 21, 0.3)',
                      boxShadow: '0 20px 40px -20px rgba(0, 50, 98, 0.4)',
                      cursor: 'url(/bear-cursor.svg) 16 16, auto',
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

                    {/* Berkeley Logo */}
                    <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                      <img src="/berkeley-logo.svg" alt="Berkeley Logo" className="w-16 h-16" />
                    </div>

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

                  {/* Resume Download Card */}
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

                  {/* Hobbies Card - Hover to expand */}
                  <motion.div
                    className="p-8 rounded-3xl cursor-pointer md:col-span-1"
                    onMouseEnter={() => handleMouseEnter('hobbies')}
                    onMouseLeave={handleMouseLeave}
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

                  {/* Focus Card - Hover to expand */}
                  <motion.div
                    className="p-8 rounded-3xl group relative overflow-hidden cursor-pointer md:col-span-2"
                    onMouseEnter={() => handleMouseEnter('focus')}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ scale: 1.02, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'linear-gradient(135deg, #2D5F4E 0%, #1E4D3C 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 20px 40px -20px rgba(45, 95, 78, 0.5)',
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

                    <div className="relative z-10">
                      <p
                        className="text-xs font-bold mb-4 tracking-wider text-right"
                        style={{
                          fontFamily: 'var(--font-plex)',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        FOCUS
                      </p>
                      <h3
                        className="font-extrabold mb-4 text-white text-right"
                        style={{
                          fontSize: 'clamp(28px, 3vw, 42px)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        Machine Learning &<br/>Computational Biology
                      </h3>
                      <p
                        className="leading-relaxed"
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: '16px',
                        }}
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
    </>
  );
}
