'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollTransitionProps {
  variant?: 'scale-fade' | 'parallax-blur';
}

export function ScrollTransition({ variant = 'scale-fade' }: ScrollTransitionProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  if (variant === 'scale-fade') {
    // Simple gradient orb transition that extends behind content
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

    return (
      <div ref={ref} className="relative h-24 pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            opacity,
            scale,
            y,
            background: 'radial-gradient(circle, rgba(29, 78, 216, 0.15), rgba(56, 189, 248, 0.08), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>
    );
  }

  // Parallax lines variant - smooth gradient that fades naturally
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.6, 0.8, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <div ref={ref} className="relative h-0 pointer-events-none">
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 flex items-center justify-center w-full h-[400px]"
        style={{
          opacity,
          scale,
        }}
      >
        {/* Large gradient orbs that fade smoothly */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full"
          style={{
            y: y1,
            background: 'radial-gradient(ellipse, rgba(29, 78, 216, 0.15), rgba(29, 78, 216, 0.08) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[700px] h-[250px] rounded-full"
          style={{
            y: y2,
            background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.12), rgba(56, 189, 248, 0.06) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full"
          style={{
            y: y3,
            background: 'radial-gradient(ellipse, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.05) 40%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </motion.div>
    </div>
  );
}
