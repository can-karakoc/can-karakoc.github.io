'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from './ProjectCard';
import { ScrollReveal } from '@/components/animations';
import { Badge } from '@/components/ui';
import { Principles } from './Principles';

const projects: Project[] = [
  {
    id: 'protein-explorer',
    title: 'Protein Interaction Explorer',
    category: 'Full-stack',
    categoryColor: 'var(--color-cobalt)',
    hoverGradient: 'linear-gradient(90deg, transparent, rgba(29, 78, 216, 0.08) 20%, rgba(29, 78, 216, 0.15) 40%, rgba(29, 78, 216, 0.25) 60%, rgba(29, 78, 216, 0.4))',
    gridColor: 'rgba(29, 78, 216, 0.06)',
    description:
      'Parse, visualize & compare protein structures — AlphaFold coloring, contact detection, exportable reports.',
    link: 'https://protein-io.vercel.app/',
    gradientBg: 'linear-gradient(150deg, #4f7dff, #38bdf8)',
    screenshot: '/protein-explorer.png',
  },
  {
    id: 'embedding-search',
    title: 'Embedding Similarity Search',
    category: 'Machine Learning',
    categoryColor: 'var(--color-aqua-teal)',
    hoverGradient: 'linear-gradient(90deg, transparent, rgba(8, 145, 178, 0.08) 20%, rgba(8, 145, 178, 0.15) 40%, rgba(8, 145, 178, 0.25) 60%, rgba(8, 145, 178, 0.4))',
    gridColor: 'rgba(8, 145, 178, 0.06)',
    description:
      'Find biologically similar proteins from a sequence via embeddings and vector search.',
    link: 'https://frontend-five-dusky-60.vercel.app/',
    gradientBg: 'linear-gradient(150deg, #38bdf8, #0891b2)',
    screenshot: '/protein-embedding-workbench.png',
  },
  {
    id: 'energy-emissions',
    title: 'Energy & Carbon Emissions',
    category: 'Data Science',
    categoryColor: 'var(--color-cobalt-deep)',
    hoverGradient: 'linear-gradient(90deg, transparent, rgba(23, 70, 184, 0.08) 20%, rgba(23, 70, 184, 0.15) 40%, rgba(23, 70, 184, 0.25) 60%, rgba(23, 70, 184, 0.4))',
    gridColor: 'rgba(23, 70, 184, 0.06)',
    description:
      'Predicting renewable output and estimating price→emissions causal impact.',
    link: 'https://github.com/can-karakoc/data102-final-proj',
    gradientBg: 'linear-gradient(150deg, #4f7dff, #6d5ef0)',
  },
];

export function Projects() {
  return (
    <section
      id="work"
      className="relative py-20 pb-20"
      style={{
        background: '#ffffff',
      }}
    >
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Principles Section */}
        <div className="mb-20">
          <Principles />
        </div>

        {/* Section eyebrow */}
        <ScrollReveal>
          <div
            className="font-semibold text-xs tracking-[0.2em] uppercase mb-12"
            style={{
              fontFamily: 'var(--font-plex)',
              color: 'var(--color-cobalt)',
            }}
          >
            PLAYGROUND
          </div>
        </ScrollReveal>

        {/* Horizontal Split Cards */}
        <div className="space-y-6 mb-20">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block no-underline rounded-[28px] overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(24px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 30px 60px -20px rgba(23, 70, 184, 0.3), inset 0 2px 0 rgba(255,255,255,1)',
                }}
              >
                {/* Glossy highlight */}
                <div
                  className="absolute top-0 left-0 right-0 h-[50%] opacity-40 pointer-events-none z-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent)',
                  }}
                />

                {/* Horizontal Split Layout */}
                <div className="relative flex flex-col md:flex-row min-h-[380px]">
                  {/* Hover gradient overlay - spans entire card from right to left */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-[5]"
                    style={{
                      background: project.hoverGradient,
                      transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />

                  {/* Grid pattern that appears on hover - matches gradient color, centered with gradient mask */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-[6]"
                    style={{
                      transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundImage:
                        `linear-gradient(${project.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${project.gridColor} 1px, transparent 1px)`,
                      backgroundSize: '30px 30px',
                      backgroundPosition: 'center center',
                      maskImage: 'linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 1) 85%)',
                      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 1) 85%)',
                    }}
                  />

                  {/* Left: Text Content (40%) */}
                  <div
                    className="flex-[0.4] p-10 flex flex-col justify-center relative transition-all duration-500"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {/* Category badge */}
                    <div
                      className="inline-block self-start px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase mb-6"
                      style={{
                        fontFamily: 'var(--font-plex)',
                        background: `${project.categoryColor}12`,
                        color: project.categoryColor,
                        border: `1px solid ${project.categoryColor}30`,
                      }}
                    >
                      {project.category}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-extrabold text-[28px] leading-tight mb-4"
                      style={{
                        color: 'var(--color-ink)',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[15px] leading-relaxed mb-6"
                      style={{
                        color: 'var(--color-ink-muted)',
                      }}
                    >
                      {project.description}
                    </p>

                    {/* View arrow */}
                    <div
                      className="flex items-center gap-2 text-[13px] font-bold group-hover:gap-3 transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-plex)',
                        color: project.categoryColor,
                      }}
                    >
                      <span>VIEW PROJECT</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>

                  {/* Right: Screenshot (60%) */}
                  {project.screenshot && (
                    <div className="flex-[0.6] relative overflow-hidden">
                      {/* Colored hue from right side */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at 120% 50%, ${project.categoryColor}25, ${project.categoryColor}08 50%, transparent 70%)`,
                          filter: 'blur(60px)',
                        }}
                      />

                      {/* Screenshot with rounded corners - higher z-index to be in front */}
                      <div className="absolute inset-0 flex items-center justify-center p-8 z-[7]">
                        <div className="relative w-full h-full rounded-[12px] overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-lg">
                          <Image
                            src={project.screenshot}
                            alt={project.title}
                            fill
                            className="object-cover"
                            style={{
                              objectPosition: 'center',
                            }}
                          />
                        </div>
                      </div>

                      {/* Subtle fade towards left */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent 40%)',
                        }}
                      />
                    </div>
                  )}
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
