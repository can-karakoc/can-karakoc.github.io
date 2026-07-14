'use client';

import { motion } from 'framer-motion';
import { GradientText } from '@/components/ui';
import { LinkedInIcon, GitHubIcon, EmailIcon } from '@/components/ui/SocialIcon';

export function Hero() {
  const headline = [
    'Product',
    'engineer',
    'building',
    'human-centered',
    'software.',
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-[80px] pb-[120px] mb-12"
      style={{
        background: 'linear-gradient(180deg, #ffffff, #eef5ff 60%, #e6f0fb)',
        boxShadow: '0 20px 40px -20px rgba(23, 70, 184, 0.15)',
      }}
    >
      {/* Decorative Background Layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        {/* Blue wash gradient at top */}
        <div
          className="absolute inset-x-0 top-0 bottom-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(29,78,216,0.14), rgba(56,189,248,0.05) 40%, transparent 62%)',
          }}
        />

        {/* Large bubble sheen */}
        <div
          className="absolute opacity-50"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '800px',
            background:
              'radial-gradient(circle at 30% 22%, rgba(255,255,255,0.45), transparent 46%)',
          }}
        />

        {/* Green-tinted glow near bottom */}
        <div
          className="absolute opacity-30"
          style={{
            bottom: '0',
            left: '20%',
            width: '600px',
            height: '400px',
            background:
              'radial-gradient(circle at 50% 80%, rgba(22,163,74,0.3), transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Aero grid overlay - FULL COVERAGE */}
        <div className="absolute inset-0 aero-grid" />

        {/* Grain overlay */}
        <div className="grain" />

        {/* Diagonal shimmer animation */}
        <div
          className="absolute w-32 opacity-0"
          style={{
            top: '0',
            bottom: '0',
            left: '30%',
            background:
              'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
            transform: 'skewX(-20deg)',
            animation: 'shimmer 4s ease-in-out infinite',
          }}
        />

        {/* Rising bubble */}
        <div
          className="absolute w-12 h-12 rounded-full opacity-0"
          style={{
            bottom: '100px',
            left: '70%',
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(56,189,248,0.3))',
            filter: 'blur(8px)',
            animation: 'rise 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1160px] mx-auto">
        {/* Animated Headline */}
        <h1
          className="font-extrabold leading-[1.02] mb-6"
          style={{
            fontSize: 'clamp(38px, 6.2vw, 68px)',
            letterSpacing: '-0.035em',
            color: 'var(--color-ink)',
            maxWidth: '960px',
          }}
        >
          {headline.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 24, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.75,
                delay: i * 0.08,
                ease: [0.2, 0.8, 0.3, 1],
              }}
            >
              {word === 'human-centered' ? (
                <GradientText>{word}</GradientText>
              ) : (
                word
              )}{' '}
            </motion.span>
          ))}
        </h1>

        {/* Sub paragraph */}
        <motion.p
          className="text-lg leading-relaxed mb-8"
          style={{
            color: 'var(--color-ink-muted)',
            maxWidth: '700px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          I research, design, and ship products end-to-end — frontend, backend,
          and ML. UC Berkeley, CS & Data Science.
        </motion.p>

        {/* Social Buttons */}
        <motion.div
          className="flex flex-wrap gap-2.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
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
            <LinkedInIcon />
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
            <GitHubIcon />
            GitHub
          </a>

          <a
            href="mailto:cankarakoc@berkeley.edu"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-pill)] font-bold text-[13.5px] text-white no-underline mag"
            style={{
              background:
                'linear-gradient(160deg, rgba(43,90,210,0.92), rgba(18,46,140,0.96))',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px rgba(15,40,120,0.85)',
            }}
          >
            <EmailIcon />
            Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
