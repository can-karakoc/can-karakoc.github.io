'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from './ProjectCard';
import { ScrollReveal } from '@/components/animations';

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
    screenshot: '/protein-interaction-explorer.png',
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
    screenshot: '/protein-embedding-workbench.png',
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

function getDomain(link: string): string {
  try {
    return new URL(link).hostname;
  } catch {
    return link;
  }
}

/* Minimal card: screenshot, category, title, description.
   The cursor becomes an "Explore" pill while hovering. */
function ProjectGridCard({ project }: { project: Project }) {
  const [hovered, setHovered] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative block no-underline rounded-[20px]"
      style={{
        // No backdrop-filter here on purpose: a nested backdrop-filter
        // inside the Explore pill below is what should visibly blur this
        // card's own content on hover, and nesting two backdrop-filters
        // is a known source of browsers only letting the outer one apply.
        background: 'rgba(255, 255, 255, 0.94)',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 20px 44px -28px rgba(23, 70, 184, 0.3), inset 0 1px 0 rgba(255,255,255,0.9)',
        cursor: 'none',
      }}
    >
      {/* Browser mockup with screenshot */}
      <div className="px-5 pt-5">
        <div
          className="rounded-[10px] overflow-hidden"
          style={{
            border: '1px solid rgba(10, 37, 64, 0.08)',
            boxShadow: '0 12px 28px -18px rgba(10, 37, 64, 0.35)',
          }}
        >
          {/* Chrome bar */}
          <div
            className="flex items-center gap-1.5 px-3 h-8"
            style={{
              background: 'rgba(240, 245, 252, 0.95)',
              borderBottom: '1px solid rgba(10, 37, 64, 0.06)',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#f87171' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fbbf24' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#34d399' }} />
            <span
              className="ml-3 px-2.5 py-0.5 rounded-full text-[10px] truncate"
              style={{
                fontFamily: 'var(--font-plex)',
                color: 'var(--color-ink-muted)',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(10, 37, 64, 0.05)',
              }}
            >
              {getDomain(project.link)}
            </span>
          </div>

          {/* Viewport */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '1.84 / 1' }}
          >
            {project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{ background: project.gradientBg }}
              >
                {/* Grid texture - subtle, fading from visible at the bottom to transparent at the top */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    maskImage: 'linear-gradient(to top, black 0%, black 25%, transparent 75%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 25%, transparent 75%)',
                    opacity: 0.6,
                  }}
                />
                {/* Soft depth blobs */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 180,
                    height: 180,
                    top: '-15%',
                    left: '-8%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)',
                    filter: 'blur(12px)',
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 220,
                    height: 220,
                    bottom: '-20%',
                    right: '-10%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.22), transparent 70%)',
                    filter: 'blur(16px)',
                  }}
                />

                {/* Icon row: renewable generation, solar, emissions trend */}
                <div className="relative flex items-center gap-5">
                  {/* Wind turbine - renewable energy generation */}
                  <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M18 33 L16.6 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    <g transform="translate(16.6 12)">
                      <path
                        d="M0 0 C -1.6 -3 -2.2 -7.2 0 -11 C 2.2 -7.2 1.6 -3 0 0 Z"
                        fill="white"
                        fillOpacity="0.95"
                      />
                      <path
                        d="M0 0 C -1.6 -3 -2.2 -7.2 0 -11 C 2.2 -7.2 1.6 -3 0 0 Z"
                        fill="white"
                        fillOpacity="0.75"
                        transform="rotate(120)"
                      />
                      <path
                        d="M0 0 C -1.6 -3 -2.2 -7.2 0 -11 C 2.2 -7.2 1.6 -3 0 0 Z"
                        fill="white"
                        fillOpacity="0.6"
                        transform="rotate(240)"
                      />
                      <circle cx="0" cy="0" r="1.6" fill="white" />
                    </g>
                  </svg>

                  {/* Sun - solar generation */}
                  <svg width="38" height="38" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="7" fill="white" fillOpacity="0.95" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <path
                        key={deg}
                        d="M18 3.5 V8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.75"
                        transform={`rotate(${deg} 18 18)`}
                      />
                    ))}
                  </svg>

                  {/* Emissions cloud with a falling trend - price -> emissions impact */}
                  <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M11 22c-2.5 0-4.5-2-4.5-4.4 0-2.15 1.55-3.95 3.6-4.35.5-2.5 2.75-4.35 5.4-4.35 2.7 0 4.95 1.9 5.4 4.45h.2c2.5 0 4.4 1.95 4.4 4.35S23.6 22 21.1 22H11z"
                      fill="white"
                      fillOpacity="0.92"
                    />
                    <path
                      d="M13 26 L18 30 L23 24"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      opacity="0.8"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text - forced onto its own compositing layer so the Explore pill's
          backdrop-filter actually samples it (backdrop-filter is unreliable
          over plain text sharing a paint layer with its ancestors, but
          works fine once the content is layer-promoted like this) */}
      <div className="p-6" style={{ transform: 'translateZ(0)' }}>
        <span
          className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase mb-3"
          style={{
            fontFamily: 'var(--font-plex)',
            background: `color-mix(in srgb, ${project.categoryColor} 8%, transparent)`,
            color: project.categoryColor,
            border: `1px solid color-mix(in srgb, ${project.categoryColor} 20%, transparent)`,
          }}
        >
          {project.category}
        </span>
        <h3
          className="font-extrabold text-[21px] leading-tight mb-2"
          style={{ color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
        >
          {project.title}
        </h3>
        <p
          className="text-[14.5px] leading-relaxed"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          {project.description}
        </p>
      </div>

      {/* Explore pill following the cursor */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute z-20 pointer-events-none flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[13px] whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            style={{
              left: pos.x,
              top: pos.y,
              translateX: '-50%',
              translateY: '-50%',
              color: 'var(--color-ink)',
              background: 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(28px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 24px -10px rgba(23, 70, 184, 0.45), inset 0 1px 0 rgba(255,255,255,0.95)',
            }}
          >
            Explore →
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative pt-0 pb-24">
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Section title */}
        <ScrollReveal>
          <h2
            className="font-extrabold mb-8"
            style={{
              fontSize: 'clamp(24px, 3vw, 32px)',
              letterSpacing: '-0.025em',
              color: 'var(--color-ink)',
            }}
          >
            Featured Projects
          </h2>
        </ScrollReveal>

        {/* Minimal project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <ProjectGridCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
