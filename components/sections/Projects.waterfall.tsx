'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from './ProjectCard';

const projects: Project[] = [
  {
    id: 'protein-explorer',
    title: 'Protein Interaction Explorer',
    category: 'Bioinformatics',
    categoryColor: '#4f7dff',
    description:
      'Interactive visualization of protein-protein interaction networks with dynamic graph layouts.',
    link: '#',
    gradientBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    screenshot: '/protein-explorer.png',
  },
  {
    id: 'climate-viz',
    title: 'Climate Data Visualization',
    category: 'Data Science',
    categoryColor: '#0891B2',
    description:
      'Real-time climate data analysis and visualization platform with predictive modeling.',
    link: '#',
    gradientBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'ml-pipeline',
    title: 'ML Training Pipeline',
    category: 'Machine Learning',
    categoryColor: '#16A34A',
    description:
      'Automated machine learning pipeline for model training and deployment.',
    link: '#',
    gradientBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'code-review',
    title: 'AI Code Review Assistant',
    category: 'Developer Tools',
    categoryColor: '#C6F135',
    description:
      'AI-powered code review tool that provides suggestions and catches bugs.',
    link: '#',
    gradientBg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
];

export function ProjectsWaterfall() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="relative py-20 px-6 flex justify-center"
      style={{
        background: '#f5f7fa',
      }}
    >
      <div className="w-full max-w-[1160px]">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            className="font-extrabold text-[42px] leading-tight mb-3"
            style={{
              color: 'var(--color-ink)',
              letterSpacing: '-0.03em',
            }}
          >
            Selected work
          </h2>
          <p
            className="text-[17px] leading-relaxed"
            style={{
              color: 'var(--color-ink-muted)',
            }}
          >
            Projects across data science, bioinformatics, and full-stack development
          </p>
        </div>

        {/* Cascading cards container */}
        <div className="relative" style={{ minHeight: '800px' }}>
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            const stagger = index * 180; // Diagonal offset
            const verticalOffset = index * 180;

            return (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute no-underline block"
                style={{
                  top: `${verticalOffset}px`,
                  left: `${stagger}px`,
                  width: '620px',
                  zIndex: isHovered ? 50 : 10 - index,
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -12,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 28,
                  },
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="relative rounded-[28px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                    backdropFilter: 'blur(30px) saturate(1.4)',
                    WebkitBackdropFilter: 'blur(30px) saturate(1.4)',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: isHovered
                      ? '0 50px 100px -30px rgba(23, 70, 184, 0.5), 0 0 0 1px rgba(255,255,255,1), inset 0 2px 0 rgba(255,255,255,1)'
                      : '0 30px 60px -25px rgba(23, 70, 184, 0.35), 0 0 0 1px rgba(255,255,255,0.8), inset 0 2px 0 rgba(255,255,255,0.95)',
                    transition: 'box-shadow 0.4s ease',
                  }}
                >
                  {/* Glossy highlight */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent)',
                      borderRadius: '28px 28px 0 0',
                    }}
                  />

                  {/* Aero grid */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(29, 78, 216, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(29, 78, 216, 0.4) 1px, transparent 1px)',
                      backgroundSize: '46px 46px',
                      maskImage: 'radial-gradient(ellipse at 60% 40%, transparent 15%, rgba(0, 0, 0, 0.7) 55%, rgba(0, 0, 0, 0.95) 80%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at 60% 40%, transparent 15%, rgba(0, 0, 0, 0.7) 55%, rgba(0, 0, 0, 0.95) 80%)',
                    }}
                  />

                  {/* Color glow accent */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-[28px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.15 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${project.categoryColor}, transparent 60%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-8 flex gap-6">
                    {/* Left: Browser mockup */}
                    <div className="flex-[3]">
                      <div
                        className="w-full rounded-[16px] overflow-hidden"
                        style={{
                          background: '#ffffff',
                          boxShadow: '0 20px 40px -20px rgba(23, 70, 184, 0.3), 0 0 0 1px rgba(29, 78, 216, 0.06)',
                          border: '1px solid rgba(255,255,255,0.9)',
                          aspectRatio: '16 / 10',
                        }}
                      >
                        {/* Browser chrome */}
                        <div
                          className="flex items-center gap-2 px-4 py-3"
                          style={{
                            background: 'linear-gradient(180deg, #f8fafc, #f1f5f9)',
                            borderBottom: '1px solid rgba(0,0,0,0.06)',
                          }}
                        >
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                          </div>
                        </div>

                        {/* Screenshot */}
                        <div className="relative bg-white" style={{ height: 'calc(100% - 44px)' }}>
                          {project.screenshot ? (
                            <Image
                              src={project.screenshot}
                              alt={project.title}
                              fill
                              className="object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-white">
                              Screenshot
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex-[2] flex flex-col justify-center">
                      {/* Category */}
                      <motion.div
                        className="font-semibold text-[11px] tracking-[0.15em] uppercase mb-3"
                        style={{
                          fontFamily: 'var(--font-plex)',
                          color: project.categoryColor,
                        }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{
                          opacity: isHovered ? 1 : 0.7,
                          y: 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.category}
                      </motion.div>

                      {/* Title */}
                      <h3
                        className="font-extrabold text-[24px] leading-tight mb-3"
                        style={{
                          color: 'var(--color-ink)',
                          letterSpacing: '-0.025em',
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <motion.p
                        className="text-[14.5px] leading-relaxed mb-4"
                        style={{
                          color: 'var(--color-ink-muted)',
                        }}
                        initial={{ opacity: 0.6 }}
                        animate={{
                          opacity: isHovered ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.description}
                      </motion.p>

                      {/* View link */}
                      <motion.div
                        className="inline-flex items-center gap-2 font-bold text-[13px]"
                        style={{
                          color: 'var(--color-cobalt)',
                        }}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -8,
                        }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      >
                        View project →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Spacer to account for cascading height */}
        <div style={{ height: '240px' }} />
      </div>
    </section>
  );
}
