'use client';

import { Navigation, Footer, Capabilities, Principles } from '@/components/sections';
import { ScrollReveal } from '@/components/animations';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function About() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const hobbiesRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridCenter, setGridCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      setGridCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, []);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const getCardPosition = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current || !gridRef.current) return { x: 0, y: 0 };
    const cardRect = ref.current.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    return {
      x: cardRect.left - gridRect.left,
      y: cardRect.top - gridRect.top,
    };
  };

  return (
    <PageTransition>
      <div className="relative z-10" style={{ background: 'var(--color-surface-white)' }}>
            {/* Floating Photos */}
            {[
              { src: '/photos/london.jpg', top: '-15%', left: '-12%', rotate: -8, delay: 0.3 },
              { src: '/photos/parthenon.jpg', top: '10%', right: '-15%', rotate: 6, delay: 0.4 },
              { src: '/photos/istanbul1.jpg', bottom: '-10%', left: '-10%', rotate: 5, delay: 0.5 },
              { src: '/photos/coast1.jpg', bottom: '15%', right: '-12%', rotate: -7, delay: 0.6 },
              { src: '/photos/beach.jpg', top: '45%', left: '-18%', rotate: -5, delay: 0.35 },
              { src: '/photos/coast2.jpg', top: '50%', right: '-16%', rotate: 8, delay: 0.45 },
            ].map((photo, idx) => (
              <motion.div
                key={idx}
                className="absolute"
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: photo.rotate,
                  y: [0, -10, 0],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  opacity: { duration: 0.4, delay: photo.delay },
                  scale: { duration: 0.4, delay: photo.delay },
                  rotate: { duration: 0.4, delay: photo.delay },
                  y: {
                    duration: 3 + idx * 0.5,
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
                  zIndex: -1,
                }}
              >
                <img
                  src={photo.src}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                  style={{
                    boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.3)',
                    border: '4px solid white',
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

            <p
              className="text-xs font-bold mb-8 tracking-wider"
              style={{
                fontFamily: 'var(--font-plex)',
                color: 'var(--color-cobalt)',
              }}
            >
              HOBBIES
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
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
              className="text-lg leading-relaxed"
              style={{
                color: 'var(--color-ink-muted)',
                fontFamily: 'var(--font-jakarta)',
              }}
            >
              Beyond professional pursuits, I'm about design and innovation—exploring product ideas, web design, and graphic projects. I also love photography, hiking, and spending time in nature, where I find inspiration in both creativity and the outdoors.
            </p>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      {/* Expanded Focus Card Overlay */}
      <AnimatePresence>
        {expandedCard === 'focus' && createPortal(
          <motion.div
            className="p-12 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '900px',
              background: 'linear-gradient(135deg, #2D5F4E 0%, #1E4D3C 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 40px 100px -20px rgba(45, 95, 78, 0.6)',
              zIndex: 99999,
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
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  ) : null;

  return (
    <PageTransition>
      {expandedCardPortal}

      <div className="relative z-10" style={{ background: 'var(--color-surface-white)' }}>
        <Navigation />
        <main>
          {/* Bento Grid Section - Centered */}
          <section className="relative px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
            <div className="max-w-[1160px] mx-auto w-full">

              <ScrollReveal>
                  {/* Dimming overlay */}
                  <AnimatePresence>
                    {expandedCard && (
                      <motion.div
                        className="fixed inset-0 bg-black pointer-events-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setExpandedCard(null)}
                        style={{ zIndex: 40, cursor: 'pointer' }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Asymmetric Bento Grid */}
                  <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1160px] relative">
                    {/* Education Card - Berkeley colors with animated hue */}
                    <motion.div
                      className="md:col-span-2 p-8 rounded-3xl group cursor-default relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #003262 0%, #004A8F 100%)',
                        border: '1px solid rgba(253, 181, 21, 0.3)',
                        boxShadow: '0 20px 40px -20px rgba(0, 50, 98, 0.4)',
                        opacity: expandedCard && expandedCard !== 'education' ? 0.3 : 1,
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
                        opacity: expandedCard && expandedCard !== 'resume' ? 0.3 : 1,
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

                    {/* Hobbies Card - Expandable */}
                    <motion.div
                      ref={hobbiesRef}
                      className="p-8 rounded-3xl cursor-pointer md:col-span-1"
                      onClick={() => toggleCard('hobbies')}
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(124, 185, 232, 0.15)',
                        boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.08)',
                        opacity: expandedCard && expandedCard !== 'hobbies' ? 0.3 : 1,
                      }}
                    >

                      {/* Close Button */}
                      {expandedCard === 'hobbies' && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(null);
                          }}
                          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                          style={{
                            background: 'rgba(124, 185, 232, 0.1)',
                            border: '1px solid rgba(124, 185, 232, 0.3)',
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-cobalt)" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </motion.button>
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
                      <div className="grid grid-cols-2 gap-4 mb-6">
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
                            <span className={expandedCard === 'hobbies' ? 'text-3xl mb-2' : 'text-2xl mb-2'}>{hobby.emoji}</span>
                            <span
                              className={expandedCard === 'hobbies' ? 'font-medium text-sm' : 'font-medium text-xs'}
                              style={{
                                color: 'var(--color-ink)',
                              }}
                            >
                              {hobby.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      <AnimatePresence>
                        {expandedCard === 'hobbies' && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-lg leading-relaxed"
                            style={{
                              color: 'var(--color-ink-muted)',
                              fontFamily: 'var(--font-jakarta)',
                              overflow: 'hidden',
                            }}
                          >
                            Beyond professional pursuits, I'm about design and innovation—exploring product ideas, web design, and graphic projects. I also love photography, hiking, and spending time in nature, where I find inspiration in both creativity and the outdoors.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Focus Card - Expandable */}
                    <motion.div
                      ref={focusRef}
                      className="p-8 rounded-3xl group relative overflow-hidden cursor-pointer md:col-span-2"
                      onClick={() => toggleCard('focus')}
                      whileHover={{ scale: 1.02, y: -6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: 'linear-gradient(135deg, #2D5F4E 0%, #1E4D3C 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 20px 40px -20px rgba(45, 95, 78, 0.5)',
                        opacity: expandedCard && expandedCard !== 'focus' ? 0.3 : 1,
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

                      {/* Close Button */}
                      {expandedCard === 'focus' && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
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
                        </motion.button>
                      )}

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
                            fontSize: expandedCard === 'focus' ? 'clamp(32px, 4vw, 48px)' : 'clamp(28px, 3vw, 42px)',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          Machine Learning &<br/>Computational Biology
                        </h3>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: expandedCard === 'focus' ? '18px' : '16px',
                          }}
                        >
                          Leveraging AI and statistical modeling to explore complex biological systems and molecular data.
                        </p>

                        <AnimatePresence>
                          {expandedCard === 'focus' && (
                            <motion.p
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="text-base leading-relaxed"
                              style={{
                                color: 'rgba(255, 255, 255, 0.85)',
                                fontFamily: 'var(--font-jakarta)',
                                overflow: 'hidden',
                              }}
                            >
                              My interest bridges data-driven computational approaches with biological research, with a particular emphasis on leveraging machine learning and statistical modeling to explore complex biological systems.
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>

                  {/* Duplicate Hobbies Card - Animates to center */}
                  <AnimatePresence>
                    {expandedCard === 'hobbies' && hobbiesRef.current && gridRef.current && (
                      <motion.div
                        className="absolute p-12 rounded-3xl pointer-events-auto"
                        initial={{
                          ...getCardPosition(hobbiesRef),
                          width: hobbiesRef.current.offsetWidth,
                          height: hobbiesRef.current.offsetHeight,
                          opacity: 0,
                        }}
                        animate={{
                          x: '50%',
                          y: '50%',
                          width: '90%',
                          maxWidth: 900,
                          opacity: 1,
                        }}
                        exit={{
                          ...getCardPosition(hobbiesRef),
                          width: hobbiesRef.current.offsetWidth,
                          height: hobbiesRef.current.offsetHeight,
                          opacity: 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          left: '-45%',
                          top: '-50%',
                          background: '#FFFFFF',
                          border: '1px solid rgba(124, 185, 232, 0.2)',
                          boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4)',
                          zIndex: 50,
                        }}
                      >
                        {/* Floating Photos */}
                        {[
                          { src: '/photos/london.jpg', top: '-15%', left: '-12%', rotate: -8, delay: 0.3 },
                          { src: '/photos/parthenon.jpg', top: '10%', right: '-15%', rotate: 6, delay: 0.4 },
                          { src: '/photos/istanbul1.jpg', bottom: '-10%', left: '-10%', rotate: 5, delay: 0.5 },
                          { src: '/photos/coast1.jpg', bottom: '15%', right: '-12%', rotate: -7, delay: 0.6 },
                          { src: '/photos/beach.jpg', top: '45%', left: '-18%', rotate: -5, delay: 0.35 },
                          { src: '/photos/coast2.jpg', top: '50%', right: '-16%', rotate: 8, delay: 0.45 },
                        ].map((photo, idx) => (
                          <motion.div
                            key={idx}
                            className="absolute"
                            initial={{ opacity: 0, scale: 0, rotate: 0 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              rotate: photo.rotate,
                              y: [0, -10, 0],
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              opacity: { duration: 0.4, delay: photo.delay },
                              scale: { duration: 0.4, delay: photo.delay },
                              rotate: { duration: 0.4, delay: photo.delay },
                              y: {
                                duration: 3 + idx * 0.5,
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
                              zIndex: -1,
                            }}
                          >
                            <img
                              src={photo.src}
                              alt=""
                              className="w-full h-full object-cover rounded-xl"
                              style={{
                                boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.3)',
                                border: '4px solid white',
                              }}
                            />
                          </motion.div>
                        ))}

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

                        <p className="text-xs font-bold mb-8 tracking-wider" style={{ fontFamily: 'var(--font-plex)', color: 'var(--color-cobalt)' }}>
                          HOBBIES
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          {[
                            { emoji: '🎨', text: 'Design' },
                            { emoji: '📸', text: 'Photography' },
                            { emoji: '🥾', text: 'Hiking' },
                            { emoji: '☕', text: 'Coffee' },
                          ].map((hobby) => (
                            <div key={hobby.text} className="flex flex-col items-center justify-center p-4 rounded-2xl" style={{ background: 'rgba(124, 185, 232, 0.05)' }}>
                              <span className="text-3xl mb-2">{hobby.emoji}</span>
                              <span className="font-medium text-sm" style={{ color: 'var(--color-ink)' }}>{hobby.text}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-lg leading-relaxed" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-jakarta)' }}>
                          Beyond professional pursuits, I'm about design and innovation—exploring product ideas, web design, and graphic projects. I also love photography, hiking, and spending time in nature, where I find inspiration in both creativity and the outdoors.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Duplicate Focus Card - Animates to center */}
                  <AnimatePresence>
                    {expandedCard === 'focus' && focusRef.current && gridRef.current && (
                      <motion.div
                        className="absolute p-12 rounded-3xl overflow-hidden pointer-events-auto"
                        initial={{
                          ...getCardPosition(focusRef),
                          width: focusRef.current.offsetWidth,
                          height: focusRef.current.offsetHeight,
                          opacity: 0,
                        }}
                        animate={{
                          x: '50%',
                          y: '50%',
                          width: '90%',
                          maxWidth: 900,
                          opacity: 1,
                        }}
                        exit={{
                          ...getCardPosition(focusRef),
                          width: focusRef.current.offsetWidth,
                          height: focusRef.current.offsetHeight,
                          opacity: 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          left: '-45%',
                          top: '-50%',
                          background: 'linear-gradient(135deg, #2D5F4E 0%, #1E4D3C 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 40px 100px -20px rgba(45, 95, 78, 0.6)',
                          zIndex: 50,
                        }}
                      >
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                          backgroundSize: '40px 40px',
                          maskImage: 'radial-gradient(ellipse at center, black 0%, black 30%, transparent 75%)',
                          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 30%, transparent 75%)',
                        }} />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(null);
                          }}
                          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-10"
                          style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>

                        <div className="relative z-10">
                          <p className="text-xs font-bold mb-4 tracking-wider" style={{ fontFamily: 'var(--font-plex)', color: 'rgba(255, 255, 255, 0.8)' }}>FOCUS</p>
                          <h3 className="font-extrabold mb-6 text-white" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
                            Machine Learning &<br/>Computational Biology
                          </h3>
                          <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Leveraging AI and statistical modeling to explore complex biological systems and molecular data.
                          </p>
                          <p className="text-base leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'var(--font-jakarta)' }}>
                            My interest bridges data-driven computational approaches with biological research, with a particular emphasis on leveraging machine learning and statistical modeling to explore complex biological systems.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
