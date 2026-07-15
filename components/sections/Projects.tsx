'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from './ProjectCard';
import { ScrollReveal } from '@/components/animations';
import { Badge } from '@/components/ui';

const projects: Project[] = [
  {
    id: 'protein-explorer',
    title: 'Protein Interaction Explorer',
    category: 'Full-stack',
    categoryColor: 'var(--color-cobalt)',
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
    description:
      'Find biologically similar proteins from a sequence via embeddings and vector search.',
    link: 'https://frontend-five-dusky-60.vercel.app/',
    gradientBg: 'linear-gradient(150deg, #38bdf8, #0891b2)',
  },
  {
    id: 'lentivirus-search',
    title: 'Lentivirus Gene Search',
    category: 'Genomics',
    categoryColor: 'var(--color-teal)',
    description:
      'An interactive genome browser for HIV-1/2 & SIV with 3D protein models.',
    link: 'https://jordanklanfer.github.io/static_jbrowse/',
    gradientBg: 'linear-gradient(150deg, #22b573, #0d9488)',
  },
  {
    id: 'energy-emissions',
    title: 'Energy & Carbon Emissions',
    category: 'Data Science',
    categoryColor: 'var(--color-cobalt-deep)',
    description:
      'Predicting renewable output and estimating price→emissions causal impact.',
    link: 'https://github.com/can-karakoc/data102-final-proj',
    gradientBg: 'linear-gradient(150deg, #4f7dff, #6d5ef0)',
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = React.useState(projects[0]);

  return (
    <section
      id="work"
      className="relative py-20 pb-20"
      style={{
        background: 'linear-gradient(180deg, #ffffff, #eef5ff 40%, #e6f0fb)',
      }}
    >
      <div className="max-w-[1160px] mx-auto px-6">
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

        {/* Frutiger Aero Two Column Layout */}
        <div className="flex gap-6 mb-48">
          {/* Left Sidebar - Glossy Project Bubbles */}
          <div className="w-[280px] flex flex-col gap-4">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.05}>
                <motion.button
                  onClick={() => setSelectedProject(project)}
                  className="relative w-full text-left p-6 rounded-[24px] transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: selectedProject.id === project.id
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4))',
                    backdropFilter: 'blur(20px) saturate(1.4)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                    border: '1px solid rgba(255, 255, 255, 0.7)',
                    boxShadow: selectedProject.id === project.id
                      ? '0 20px 40px -15px rgba(23, 70, 184, 0.35), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(29, 78, 216, 0.1)'
                      : '0 10px 20px -10px rgba(23, 70, 184, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                    cursor: 'pointer',
                  }}
                >
                  {/* Glossy highlight */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[50%] opacity-50 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6), transparent)',
                      borderRadius: '24px 24px 0 0',
                    }}
                  />

                  {/* Active glow */}
                  {selectedProject.id === project.id && (
                    <div
                      className="absolute -inset-1 rounded-[24px] pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${project.categoryColor}40, transparent 70%)`,
                        filter: 'blur(8px)',
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Category */}
                    <div
                      className="font-semibold text-[10px] tracking-[0.16em] uppercase mb-2"
                      style={{
                        fontFamily: 'var(--font-plex)',
                        color: project.categoryColor,
                      }}
                    >
                      {project.category}
                    </div>

                    {/* Title */}
                    <div
                      className="font-extrabold text-[15px] leading-tight"
                      style={{
                        color: 'var(--color-ink)',
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {project.title}
                    </div>
                  </div>
                </motion.button>
              </ScrollReveal>
            ))}
          </div>

          {/* Right Content - Large Display */}
          <div className="flex-1">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[28px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 40px 80px -25px rgba(23, 70, 184, 0.35), inset 0 2px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(29, 78, 216, 0.08)',
              }}
            >
              {/* Glossy top highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent)',
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
                  maskImage: 'radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.95) 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.95) 80%)',
                }}
              />

              {/* Content */}
              <div className="relative p-8">
                {/* Mockup */}
                <div
                  className="w-full rounded-[16px] overflow-hidden mb-6"
                  style={{
                    background: '#ffffff',
                    boxShadow: '0 25px 50px -20px rgba(23, 70, 184, 0.35), 0 0 0 1px rgba(29, 78, 216, 0.06), inset 0 1px 0 rgba(255,255,255,1)',
                    border: '1px solid rgba(255,255,255,0.9)',
                    aspectRatio: '16 / 9',
                  }}
                >
                  {/* Browser chrome */}
                  <div
                    className="flex items-center gap-2 px-4 py-3.5"
                    style={{
                      background: 'linear-gradient(180deg, #f8fafc, #f1f5f9)',
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-sm" />
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div className="relative bg-white" style={{ height: 'calc(100% - 50px)' }}>
                    {selectedProject.screenshot ? (
                      <Image
                        src={selectedProject.screenshot}
                        alt={selectedProject.title}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-white">
                        Screenshot placeholder
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-[15.5px] leading-relaxed mb-6"
                  style={{
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {selectedProject.description}
                </p>

                {/* View Project Link */}
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[100px] font-bold text-sm no-underline mag"
                  style={{
                    background: 'linear-gradient(180deg, #2249B8, #122E8C)',
                    color: '#ffffff',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px -8px rgba(15,40,120,0.9)',
                  }}
                >
                  View project →
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Card - Integrated */}
        <ScrollReveal>
          <div
            id="contact"
            className="relative overflow-hidden rounded-[32px] px-10 py-[90px] text-center"
            style={{
              background: 'linear-gradient(180deg, #ffffff, #eef5ff 60%, #e6f0fb)',
              boxShadow: '0 40px 80px -30px rgba(23,70,184,0.3), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            {/* Background layers matching hero */}
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-clip pointer-events-none"
            >
              {/* Animated moving hue blobs */}
              <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20"
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
                className="absolute w-[450px] h-[450px] rounded-full opacity-15"
                style={{
                  top: '30%',
                  right: '15%',
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.35), transparent 70%)',
                  filter: 'blur(90px)',
                  animation: 'drift2 35s ease-in-out infinite',
                }}
              />

              {/* White glow - center */}
              <div
                className="absolute opacity-70"
                style={{
                  top: '20%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '700px',
                  height: '500px',
                  background:
                    'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.4) 40%, transparent 65%)',
                }}
              />

              {/* Blue gradient at bottom edge */}
              <div
                className="absolute inset-x-0 bottom-0 h-[200px] opacity-45"
                style={{
                  background:
                    'linear-gradient(to top, rgba(29, 78, 216, 0.22), rgba(56, 189, 248, 0.12) 60%, transparent)',
                }}
              />

              {/* Aero grid overlay - centered */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(29, 78, 216, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(29, 78, 216, 0.09) 1px, transparent 1px)',
                  backgroundSize: '46px 46px',
                  backgroundPosition: 'center center',
                  maskImage: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.4) 55%, rgba(0, 0, 0, 0.9) 80%)',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.4) 55%, rgba(0, 0, 0, 0.9) 80%)',
                }}
              />

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

              {/* Floating bubbles */}
              <div
                className="absolute w-16 h-16 rounded-full opacity-0"
                style={{
                  bottom: '80px',
                  left: '20%',
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(56,189,248,0.4) 60%, transparent)',
                  filter: 'blur(10px)',
                  animation: 'rise 10s ease-in-out infinite',
                }}
              />
              <div
                className="absolute w-12 h-12 rounded-full opacity-0"
                style={{
                  bottom: '60px',
                  right: '25%',
                  background:
                    'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75), rgba(14,165,233,0.35))',
                  filter: 'blur(8px)',
                  animation: 'rise 8s ease-in-out infinite 1s',
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Available badge */}
              <div className="flex justify-center mb-6">
                <Badge
                  variant="glass"
                  withDot
                  dotColor="var(--color-lime)"
                  className="text-sm"
                >
                  available for work
                </Badge>
              </div>

              {/* Headline */}
              <h2
                className="font-extrabold leading-tight mb-5"
                style={{
                  fontSize: 'clamp(36px, 5vw, 54px)',
                  letterSpacing: '-0.035em',
                  color: 'var(--color-ink)',
                }}
              >
                Let's build something people love.
              </h2>

              {/* Sub text */}
              <p
                className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
                style={{
                  color: 'var(--color-ink-muted)',
                }}
              >
                Have a product, a research idea, or a role in mind? I'd love to
                hear about it.
              </p>

              {/* Buttons - matching hero style */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-6">
                {/* Primary CTA */}
                <a
                  href="mailto:cankarakoc@berkeley.edu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] font-bold text-sm text-white no-underline mag"
                  style={{
                    background: 'linear-gradient(180deg, #2249B8, #122E8C)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px rgba(15,40,120,0.85)',
                  }}
                >
                  Get in touch →
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/can-karakoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-pill)] font-bold text-sm no-underline mag"
                  style={{
                    background: 'var(--color-glass-55)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--color-glass-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  LinkedIn
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/can-karakoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-pill)] font-bold text-sm no-underline mag"
                  style={{
                    background: 'var(--color-glass-55)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--color-glass-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  GitHub
                </a>
              </div>

              {/* Email display */}
              <p
                className="text-sm"
                style={{
                  fontFamily: 'var(--font-plex)',
                  color: 'var(--color-ink-muted)',
                }}
              >
                cankarakoc@berkeley.edu
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
