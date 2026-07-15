'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollTransitionProps {
  variant?: 'waves' | 'fade';
}

export function ScrollTransition({ variant = 'waves' }: ScrollTransitionProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  if (variant === 'waves') {
    return (
      <div ref={ref} className="relative h-32 overflow-hidden bg-white">
        {/* Multiple wave layers */}
        {[0, 1, 2].map((i) => {
          const yOffset = useTransform(
            scrollYProgress,
            [0, 1],
            [100 + i * 20, -100 - i * 20]
          );
          const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{
                y: yOffset,
                opacity,
              }}
            >
              <svg
                className="absolute bottom-0 w-full"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                style={{
                  height: '100%',
                }}
              >
                <path
                  d={`M0,${60 + i * 10} C240,${40 + i * 10} 480,${80 + i * 10} 720,${60 + i * 10} C960,${40 + i * 10} 1200,${80 + i * 10} 1440,${60 + i * 10} L1440,120 L0,120 Z`}
                  fill={`rgba(29, 78, 216, ${0.08 - i * 0.02})`}
                />
              </svg>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Fade variant
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={ref} className="relative h-24 overflow-hidden bg-white">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity,
          scale,
        }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 blur-3xl" />
      </motion.div>
    </div>
  );
}
