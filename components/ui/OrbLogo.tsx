'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface OrbLogoProps {
  size?: number;
  className?: string;
}

export function OrbLogo({ size = 34, className = '' }: OrbLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
    >
      {/* Main orb */}
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            'radial-gradient(circle at 34% 26%, #eaf6ff, #7fd0f5 20%, #2b8fe0 52%, #1746b8 100%)',
          boxShadow:
            'inset 0 2px 3px rgba(255,255,255,0.9), 0 6px 14px -4px rgba(23,70,184,0.7)',
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: '5px',
            left: '8px',
            width: '9px',
            height: '6px',
            background: 'rgba(255,255,255,0.85)',
            filter: 'blur(0.5px)',
          }}
        />
      </div>

      {/* Splash ring animation */}
      {isHovered && (
        <motion.div
          className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 pointer-events-none"
          style={{
            borderColor: 'var(--color-aqua)',
          }}
          initial={{ scale: 0.78, opacity: 0.6, x: '-50%', y: '-50%' }}
          animate={{ scale: 1.9, opacity: 0, x: '-50%', y: '-50%' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  );
}
