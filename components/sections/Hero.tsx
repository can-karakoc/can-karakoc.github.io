'use client';

import { motion } from 'framer-motion';
import { GradientText } from '@/components/ui';
import { LinkedInIcon, GitHubIcon, EmailIcon } from '@/components/ui/SocialIcon';

export function Hero() {
  const headline = [
    'Full-stack',
    'engineer',
    'building',
    'delightful',
    'experiences.',
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden -mt-[80px]"
    >
      {/* Full Background Container - stretches edge to edge and extends to top of viewport */}
      <div
        className="absolute -top-[80px] left-0 right-0 bottom-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #ffffff, #eef5ff 60%, #e6f0fb)',
        }}
      />

      {/* Decorative Background Layers - extend to cover negative margin */}
      <div
        aria-hidden="true"
        className="absolute -top-[80px] left-0 right-0 bottom-0 pointer-events-none -z-10"
      >
        {/* Animated moving hue blobs - very faint */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            top: '10%',
            left: '10%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(29,78,216,0.4), transparent 70%)',
            filter: 'blur(100px)',
            animation: 'drift1 30s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[550px] h-[550px] rounded-full opacity-15"
          style={{
            top: '30%',
            right: '15%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.35), transparent 70%)',
            filter: 'blur(90px)',
            animation: 'drift2 35s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-18"
          style={{
            bottom: '20%',
            left: '40%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.3), transparent 70%)',
            filter: 'blur(95px)',
            animation: 'drift3 32s ease-in-out infinite',
          }}
        />

        {/* Large bright white glow - middle-top */}
        <div
          className="absolute opacity-70"
          style={{
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '700px',
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.4) 40%, transparent 65%)',
          }}
        />

        {/* Large bubble sheen */}
        <div
          className="absolute opacity-60"
          style={{
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1000px',
            height: '900px',
            background:
              'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.2) 45%, transparent 60%)',
          }}
        />

        {/* Enhanced blue gradient at bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-[350px] opacity-50"
          style={{
            background:
              'linear-gradient(to top, rgba(56, 189, 248, 0.24), rgba(29, 78, 216, 0.15) 40%, rgba(14, 165, 233, 0.08) 60%, transparent)',
          }}
        />

        {/* Bottom edge concentrated blue bands */}
        <div
          className="absolute inset-x-0 bottom-0 h-[120px] opacity-45"
          style={{
            background:
              'linear-gradient(to top, rgba(29, 78, 216, 0.22), rgba(56, 189, 248, 0.12) 60%, transparent)',
          }}
        />

        {/* Light blue blob bottom-left */}
        <div
          className="absolute w-[550px] h-[550px] rounded-full opacity-28"
          style={{
            bottom: '-12%',
            left: '3%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.4), rgba(56, 189, 248, 0.25) 40%, rgba(14, 165, 233, 0.15) 60%, transparent 75%)',
            filter: 'blur(85px)',
          }}
        />

        {/* Light blue blob bottom-center-left */}
        <div
          className="absolute w-[480px] h-[480px] rounded-full opacity-25"
          style={{
            bottom: '-8%',
            left: '25%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.35), rgba(14, 165, 233, 0.22) 50%, transparent 70%)',
            filter: 'blur(75px)',
          }}
        />

        {/* Light blue blob bottom-center-right */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-26"
          style={{
            bottom: '-10%',
            right: '28%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.38), rgba(29, 78, 216, 0.2) 45%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Light blue blob bottom-right */}
        <div
          className="absolute w-[520px] h-[520px] rounded-full opacity-27"
          style={{
            bottom: '-7%',
            right: '5%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.36), rgba(14, 165, 233, 0.24) 48%, transparent 72%)',
            filter: 'blur(88px)',
          }}
        />

        {/* Aero grid overlay - FULL COVERAGE */}
        <div className="absolute inset-0 aero-grid" />

        {/* Animated Grain overlay with blue tint */}
        <div
          className="grain"
          style={{
            opacity: 0.35,
            animation: 'grain 8s steps(10) infinite',
            mixBlendMode: 'overlay',
            backgroundColor: 'rgba(29, 78, 216, 0.08)',
          }}
        />

        {/* Floating bubbles - behind content */}
        <div
          className="absolute w-20 h-20 rounded-full opacity-0"
          style={{
            bottom: '120px',
            left: '15%',
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(56,189,248,0.4) 60%, transparent)',
            filter: 'blur(10px)',
            animation: 'rise 10s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-14 h-14 rounded-full opacity-0"
          style={{
            bottom: '80px',
            left: '70%',
            background:
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75), rgba(14,165,233,0.35))',
            filter: 'blur(8px)',
            animation: 'rise 8s ease-in-out infinite 1s',
          }}
        />
        <div
          className="absolute w-10 h-10 rounded-full opacity-0"
          style={{
            bottom: '100px',
            left: '45%',
            background:
              'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8), rgba(56,189,248,0.3))',
            filter: 'blur(6px)',
            animation: 'rise 7s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute w-7 h-7 rounded-full opacity-0"
          style={{
            bottom: '140px',
            right: '20%',
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(56,189,248,0.25))',
            filter: 'blur(5px)',
            animation: 'rise 9s ease-in-out infinite 0.5s',
          }}
        />
        <div
          className="absolute w-16 h-16 rounded-full opacity-0"
          style={{
            bottom: '90px',
            left: '30%',
            background:
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.72), rgba(56,189,248,0.38))',
            filter: 'blur(9px)',
            animation: 'rise 9.5s ease-in-out infinite 1.5s',
          }}
        />
        <div
          className="absolute w-9 h-9 rounded-full opacity-0"
          style={{
            bottom: '110px',
            right: '35%',
            background:
              'radial-gradient(circle at 32% 32%, rgba(255,255,255,0.78), rgba(14,165,233,0.32))',
            filter: 'blur(7px)',
            animation: 'rise 8.5s ease-in-out infinite 2.5s',
          }}
        />
        <div
          className="absolute w-12 h-12 rounded-full opacity-0"
          style={{
            bottom: '75px',
            left: '55%',
            background:
              'radial-gradient(circle at 38% 38%, rgba(255,255,255,0.76), rgba(56,189,248,0.36))',
            filter: 'blur(7.5px)',
            animation: 'rise 7.8s ease-in-out infinite 3s',
          }}
        />
        <div
          className="absolute w-8 h-8 rounded-full opacity-0"
          style={{
            bottom: '130px',
            left: '8%',
            background:
              'radial-gradient(circle at 33% 33%, rgba(255,255,255,0.82), rgba(14,165,233,0.28))',
            filter: 'blur(6.5px)',
            animation: 'rise 8.2s ease-in-out infinite 0.8s',
          }}
        />

      </div>

      {/* Bubbles in front of content - with distortion effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-20"
      >
        {/* Large distortion bubble - top right */}
        <div
          className="absolute w-32 h-32 rounded-full opacity-0"
          style={{
            top: '20%',
            right: '15%',
            background:
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4), rgba(56,189,248,0.15) 70%, transparent)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            filter: 'blur(4px)',
            animation: 'rise 12s ease-in-out infinite',
          }}
        />
        {/* Medium distortion bubble - middle left */}
        <div
          className="absolute w-24 h-24 rounded-full opacity-0"
          style={{
            top: '45%',
            left: '10%',
            background:
              'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.35), rgba(14,165,233,0.12) 65%, transparent)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            filter: 'blur(3px)',
            animation: 'rise 11s ease-in-out infinite 2s',
          }}
        />
        {/* Small distortion bubble - top center */}
        <div
          className="absolute w-20 h-20 rounded-full opacity-0"
          style={{
            top: '15%',
            left: '50%',
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.38), rgba(56,189,248,0.13) 68%, transparent)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            filter: 'blur(2.5px)',
            animation: 'rise 10s ease-in-out infinite 1.5s',
          }}
        />
        {/* Extra large subtle bubble - center */}
        <div
          className="absolute w-40 h-40 rounded-full opacity-0"
          style={{
            top: '35%',
            right: '25%',
            background:
              'radial-gradient(circle at 38% 38%, rgba(255,255,255,0.25), rgba(56,189,248,0.08) 75%, transparent)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            filter: 'blur(5px)',
            animation: 'rise 14s ease-in-out infinite 3s',
          }}
        />
        {/* Tiny distortion bubble - lower right */}
        <div
          className="absolute w-16 h-16 rounded-full opacity-0"
          style={{
            top: '60%',
            right: '18%',
            background:
              'radial-gradient(circle at 32% 32%, rgba(255,255,255,0.42), rgba(14,165,233,0.16) 62%, transparent)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            filter: 'blur(2px)',
            animation: 'rise 9s ease-in-out infinite 4s',
          }}
        />
      </div>

      {/* Content with proper padding - add back the 80px we pulled up */}
      <div className="relative z-10 max-w-[1160px] mx-auto px-6 pt-[200px] pb-[200px]">
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
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word === 'delightful' ? (
                <GradientText>{word}</GradientText>
              ) : (
                word
              )}
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          I design and build scalable systems, craft intuitive interfaces, and leverage ML to solve real-world problems.
          UC Berkeley, Computer Science & Data Science.
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
    </section>
  );
}
