'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations';
import { Badge } from '@/components/ui';

const principles = [
  {
    id: 'research-driven',
    title: 'Research-Driven',
    description:
      'I prioritize understanding users and their needs, using research and data to inform design decisions that simplify complex processes.',
    color: '#0891B2', // Aqua teal
    accentColor: '#38BDF8', // Bright aqua
    bgGradient: 'linear-gradient(135deg, rgba(8, 145, 178, 0.12), rgba(56, 189, 248, 0.08))',
    icon: '/RESEARCH.svg',
  },
  {
    id: 'product-focused',
    title: 'Product-Focused',
    description:
      'My designs aim to solve real problems, creating interfaces that streamline complexity while aligning with business goals.',
    color: '#EC4899', // Pink
    accentColor: '#F472B6', // Light pink
    bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(244, 114, 182, 0.08))',
    icon: '/PRODUCT.svg',
  },
  {
    id: 'user-centric',
    title: 'User-Centric',
    description:
      'I focus on outcomes, ensuring that each design decision leads to actionable, effective solutions that enhance usability and satisfaction.',
    color: '#C6F135', // Lime spark
    accentColor: '#16A34A', // Green
    bgGradient: 'linear-gradient(135deg, rgba(198, 241, 53, 0.12), rgba(22, 163, 74, 0.08))',
    icon: '/USER.svg',
  },
];

export function Principles() {
  const [expandedId, setExpandedId] = React.useState<string>('product-focused');
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleClick = (id: string) => {
    if (id === expandedId || isTransitioning) return;
    setIsTransitioning(true);
    setExpandedId(id);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="pt-32 pb-32 min-h-screen flex flex-col justify-center">
      {/* Header */}
      <ScrollReveal>
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full font-semibold text-xs tracking-[0.15em] uppercase"
            style={{
              fontFamily: 'var(--font-plex)',
              color: '#ffffff',
              background: 'var(--color-cobalt)',
              boxShadow: '0 4px 12px -4px rgba(23, 70, 184, 0.4)',
            }}
          >
            MY ENGINEERING PRINCIPLES
          </div>
        </div>
      </ScrollReveal>

      {/* Horizontal Expandable Cards - Always fills width */}
      <ScrollReveal delay={0.1}>
        <div className="flex gap-4 items-stretch">
          {principles.map((principle, index) => {
            const isExpanded = expandedId === principle.id;
            // Calculate widths: 2 collapsed (140px each) + 2 gaps (16px each) = 312px
            // Expanded gets remaining space
            const collapsedWidth = 140;
            const expandedWidth = `calc(100% - 312px)`;

            return (
              <motion.div
                key={principle.id}
                onClick={() => handleClick(principle.id)}
                className="cursor-pointer relative overflow-hidden rounded-[24px] flex-shrink-0"
                initial={false}
                animate={{
                  width: isExpanded ? expandedWidth : collapsedWidth,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(20px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                  border: `2px solid rgba(255, 255, 255, 0.9)`,
                  boxShadow: isExpanded
                    ? `0 40px 80px -20px rgba(23, 70, 184, 0.35), inset 0 2px 0 rgba(255,255,255,0.95), 0 0 0 1px ${principle.color}25`
                    : `0 20px 40px -15px rgba(23, 70, 184, 0.25), inset 0 2px 0 rgba(255,255,255,0.9), 0 0 0 1px ${principle.color}15`,
                  height: '260px',
                }}
              >
                {/* Gradient background overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: principle.bgGradient,
                  }}
                />

                {/* Center glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${principle.accentColor}20, transparent 65%)`,
                  }}
                />

                {/* Grid pattern at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      `linear-gradient(${principle.color}25 1px, transparent 1px), linear-gradient(90deg, ${principle.color}25 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    maskImage: 'linear-gradient(to top, black 0%, black 25%, transparent 55%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 25%, transparent 55%)',
                    opacity: 0.2,
                  }}
                />

                <div className="relative h-full flex items-center px-6 py-8" style={{ justifyContent: isExpanded ? 'flex-start' : 'center' }}>
                  <div className="flex items-center gap-6" style={{ width: isExpanded ? '100%' : 'auto' }}>
                    {/* Icon - always visible */}
                    <motion.div
                      className="relative flex-shrink-0"
                      initial={false}
                      animate={{
                        width: isExpanded ? 130 : 110,
                        height: isExpanded ? 130 : 110,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Blur backdrop behind icon */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${principle.color}08, transparent 70%)`,
                          filter: 'blur(20px)',
                          transform: 'scale(1.2)',
                        }}
                      />
                      {/* Icon */}
                      <div className="relative w-full h-full">
                        <Image
                          src={principle.icon}
                          alt={principle.title}
                          fill
                          className="object-contain"
                          style={{
                            filter: `drop-shadow(0 4px 16px ${principle.color}50)`,
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Text Content - fades in when expanded */}
                    <motion.div
                      className="flex-1 overflow-hidden"
                      initial={false}
                      animate={{
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                        delay: isExpanded ? 0.2 : 0,
                      }}
                      style={{
                        display: isExpanded ? 'block' : 'none',
                      }}
                    >
                      <h3
                        className="font-extrabold leading-tight mb-4"
                        style={{
                          color: 'var(--color-ink)',
                          letterSpacing: '-0.03em',
                          fontSize: '32px',
                        }}
                      >
                        {principle.title}
                      </h3>
                      <p
                        className="text-[17px] leading-relaxed"
                        style={{
                          color: 'var(--color-ink-muted)',
                        }}
                      >
                        {principle.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>
    </div>
  );
}
