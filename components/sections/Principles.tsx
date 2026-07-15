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
    color: '#C6F135',
    bgColor: '#011722',
    icon: '/RESEARCH.svg',
  },
  {
    id: 'product-focused',
    title: 'Product-Focused',
    description:
      'My designs aim to solve real problems, creating interfaces that streamline complexity while aligning with business goals.',
    color: '#E879F9',
    bgColor: '#4F003B',
    icon: '/PRODUCT.svg',
  },
  {
    id: 'user-centric',
    title: 'User-Centric',
    description:
      'I focus on outcomes, ensuring that each design decision leads to actionable, effective solutions that enhance usability and satisfaction.',
    color: '#FCD34D',
    bgColor: '#2C2B05',
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
                className="cursor-pointer relative overflow-hidden rounded-[16px] flex-shrink-0"
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
                  background: principle.bgColor,
                  border: 'none',
                  boxShadow: isExpanded
                    ? `0 40px 80px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px ${principle.color}20`
                    : `0 20px 40px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px ${principle.color}15`,
                  height: '320px',
                }}
              >
                {/* Center glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${principle.color}15, transparent 60%)`,
                  }}
                />

                {/* Grid pattern at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      `linear-gradient(${principle.color}25 1px, transparent 1px), linear-gradient(90deg, ${principle.color}25 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 60%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 60%)',
                    opacity: 0.2,
                  }}
                />

                <div className="relative h-full flex items-center justify-center px-6 py-8">
                  <div className="flex items-center gap-6 w-full">
                    {/* Icon - always visible */}
                    <motion.div
                      className="relative flex-shrink-0"
                      initial={false}
                      animate={{
                        width: isExpanded ? 96 : 80,
                        height: isExpanded ? 96 : 80,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image
                        src={principle.icon}
                        alt={principle.title}
                        fill
                        className="object-contain"
                        style={{
                          filter: `drop-shadow(0 0 20px ${principle.color}60)`,
                        }}
                      />
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
                          color: '#ffffff',
                          letterSpacing: '-0.03em',
                          fontSize: '32px',
                        }}
                      >
                        {principle.title}
                      </h3>
                      <p
                        className="text-[17px] leading-relaxed"
                        style={{
                          color: 'rgba(255, 255, 255, 0.85)',
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
