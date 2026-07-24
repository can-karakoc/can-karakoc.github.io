'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['purposeful.', 'engaging.', 'human-centered.'];

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const word = WORDS[currentWordIndex];

  React.useEffect(() => {
    const timer = setInterval(
      () => setCurrentWordIndex((prev) => (prev + 1) % WORDS.length),
      3200
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative -mt-[80px] overflow-hidden"
    >
      {/* Content */}
      <div className="max-w-[1160px] mx-auto px-6 pt-[200px]">
        <div>
          {/* Greeting - primary headline (larger size, generous spacing) */}
          <motion.h1
            className="font-extrabold mb-5"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              letterSpacing: '-0.035em',
              color: 'var(--color-ink)',
              lineHeight: 1.05,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Hello! I'm Can
          </motion.h1>

          {/* Sentence with typing animation - larger secondary subtitle */}
          <motion.p
            className="font-bold leading-[1.3] mb-10 relative"
            style={{
              fontSize: 'clamp(22px, 3vw, 34px)',
              letterSpacing: '-0.02em',
              color: 'var(--color-ink-muted)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            I craft interactive digital experiences
            {' '}
            <span className="inline-block">
              that are{' '}
              <span
                className="relative inline-block align-bottom overflow-hidden"
                style={{
                  minWidth: '7.5em',
                  textAlign: 'left',
                  // Breathing room so descenders (p, g) aren't clipped
                  paddingBottom: '0.12em',
                  marginBottom: '-0.12em',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={word}
                    className="inline-block whitespace-nowrap"
                    style={{ color: '#7fd0f5' }}
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-105%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
