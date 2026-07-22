'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@/components/ui/SocialIcon';
import Image from 'next/image';

export interface Project {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  hoverGradient?: string;
  gridColor?: string;
  description: string;
  link: string;
  gradientBg: string;
  screenshot?: string;
  size?: 'large' | 'medium' | 'tall';
  /** Stylized fallback mockup shown when there's no screenshot. */
  mockup?: 'paper' | 'genome' | 'inbox' | 'arcade';
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = React.useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const cardWidth = 320;
    const cardHeight = 280;
    const padding = 20;
    const offset = 20;

    let posX = e.clientX + offset;
    let posY = e.clientY + offset;

    // Check if card would go off right edge
    if (posX + cardWidth > window.innerWidth - padding) {
      posX = e.clientX - cardWidth - offset;
    }

    // Check if card would go off bottom edge
    if (posY + cardHeight > window.innerHeight - padding) {
      posY = e.clientY - cardHeight - offset;
    }

    // Check if card would go off left edge
    if (posX < padding) {
      posX = padding;
    }

    // Check if card would go off top edge
    if (posY < padding) {
      posY = padding;
    }

    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });

    setCardPosition({
      x: posX,
      y: posY,
    });
  };

  const hoverCard = isMounted ? (
    <motion.div
      className="fixed pointer-events-none rounded-[20px] p-6"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: isHovered ? 1 : 0,
        scale: isHovered ? 1 : 0.85,
      }}
      transition={{
        opacity: {
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        },
        scale: {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      style={{
        left: cardPosition.x,
        top: cardPosition.y,
        width: '320px',
        zIndex: 10000,
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(40px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.5)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 30px 60px -15px rgba(23, 70, 184, 0.4), 0 0 0 1px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9)',
        pointerEvents: isHovered ? 'auto' : 'none',
        display: isHovered || mousePosition.x > 0 ? 'block' : 'none',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    >
      {/* Category */}
      <motion.div
        className="font-semibold text-[10px] tracking-[0.2em] uppercase mb-2"
        style={{
          fontFamily: 'var(--font-plex)',
          color: project.categoryColor,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 8,
        }}
        transition={{
          duration: 0.3,
          delay: 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {project.category}
      </motion.div>

      {/* Title */}
      <motion.h3
        className="font-extrabold text-[18px] leading-tight mb-2"
        style={{
          color: 'var(--color-ink)',
          letterSpacing: '-0.025em',
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 8,
        }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {project.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-[13px] leading-relaxed mb-3"
        style={{
          color: 'var(--color-ink-muted)',
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 8,
        }}
        transition={{
          duration: 0.3,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {project.description}
      </motion.p>

      {/* View link */}
      <motion.div
        className="inline-flex items-center gap-2 font-bold text-[12px]"
        style={{
          color: 'var(--color-cobalt)',
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 8,
        }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        View project →
      </motion.div>
    </motion.div>
  ) : null;

  return (
    <>
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative no-underline group block"
      style={{
        aspectRatio: '16 / 10',
        willChange: 'transform',
        borderRadius: '26px',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 30,
        mass: 0.4,
      }}
    >
      {/* Background with stronger separation */}
      <div
        className="absolute inset-0 rounded-[var(--radius-card)]"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(29, 78, 216, 0.08)',
          boxShadow: '0 20px 50px -15px rgba(23, 70, 184, 0.25)',
        }}
      />

      {/* Aero grid background pattern */}
      <div
        className="absolute inset-0 rounded-[var(--radius-card)] opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(29, 78, 216, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(29, 78, 216, 0.3) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(circle at 50% 50%, transparent 10%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.9) 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 10%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.9) 75%)',
        }}
      />

      {/* Browser mockup container */}
      <div className="absolute inset-0 p-6 flex items-start justify-center pt-8">
        <div
          className="w-full h-full rounded-[14px] overflow-hidden"
          style={{
            background: '#ffffff',
            boxShadow: '0 20px 40px -18px rgba(23, 70, 184, 0.3), 0 0 0 1px rgba(29, 78, 216, 0.08)',
            border: '1px solid rgba(255,255,255,0.8)',
          }}
        >
          {/* Browser chrome bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: 'linear-gradient(180deg, #f8fafc, #f1f5f9)',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
          </div>

          {/* Screenshot content */}
          <div className="relative w-full" style={{ height: 'calc(100% - 44px)' }}>
            {project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-gray-400 text-sm"
                style={{ background: '#ffffff' }}
              >
                Screenshot placeholder
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative accent - bottom right */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(29, 78, 216, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(29, 78, 216, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(circle at 100% 100%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 100% 100%, black 0%, transparent 70%)',
        }}
      />

    </motion.a>

    {/* Render hover card using portal to body - always on top */}
    {isMounted && typeof document !== 'undefined' && hoverCard && createPortal(hoverCard, document.body)}
    </>
  );
}
