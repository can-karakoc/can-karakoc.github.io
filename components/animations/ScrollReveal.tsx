'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-10% 0px -10% 0px', // Trigger when element is 90% into viewport
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.55, y: 26, scale: 0.995 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0.55, y: 26, scale: 0.995 }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 0.8, 0.3, 1], // var(--ease-reveal)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
