'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const words = ['purposeful.', 'engaging.', 'human-centered.'];
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseBeforeDelete = 2000;
    const pauseBeforeNextWord = 500;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <section
      id="top"
      className="relative -mt-[80px] min-h-[68vh] flex items-center overflow-hidden"
    >
      {/* Content - full width */}
      <div className="relative z-10 w-full max-w-[1160px] mx-auto px-6 pt-[80px]">
        <div>
          {/* Greeting - primary headline */}
          <motion.h1
            className="font-extrabold mb-4"
            style={{
              fontSize: 'clamp(40px, 6.5vw, 76px)',
              letterSpacing: '-0.035em',
              color: 'var(--color-ink)',
              lineHeight: 1.05,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Hello! I'm Can
          </motion.h1>

          {/* Sentence with typing animation - secondary */}
          <motion.p
            className="font-bold leading-[1.25] mb-8 relative"
            style={{
              fontSize: 'clamp(22px, 3vw, 34px)',
              letterSpacing: '-0.02em',
              color: 'var(--color-ink-muted)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            I craft interactive digital experiences
            {' '}
            <span className="inline-block">
              that are{' '}
              <span
                className="relative inline-block"
                style={{
                  color: 'var(--color-cobalt)',
                  minWidth: '7.5em',
                  textAlign: 'left',
                }}
              >
                {displayedText}
                {/* Blinking cursor */}
                <motion.span
                  className="inline-block w-[2px] h-[0.9em] ml-1 align-middle"
                  style={{
                    background: 'var(--color-cobalt)',
                    verticalAlign: 'baseline',
                  }}
                  animate={{
                    opacity: [1, 1, 0, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.5, 0.5, 1],
                  }}
                />
              </span>
            </span>
          </motion.p>

          {/* Social Buttons */}
          <motion.div
            className="flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <a
              href="https://www.linkedin.com/in/can-karakoc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-pill)] font-bold text-[13.5px] no-underline mag"
              style={{
                background: 'var(--color-glass-55)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--color-glass-border)',
                color: 'var(--color-ink)',
              }}
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/can-karakoc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-pill)] font-bold text-[13.5px] no-underline mag"
              style={{
                background: 'var(--color-glass-55)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--color-glass-border)',
                color: 'var(--color-ink)',
              }}
            >
              GitHub
            </a>

            <a
              href="mailto:cankarakoc@berkeley.edu"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-pill)] font-bold text-[13.5px] no-underline mag"
              style={{
                background: 'var(--color-glass-55)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--color-glass-border)',
                color: 'var(--color-ink)',
              }}
            >
              Email
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
