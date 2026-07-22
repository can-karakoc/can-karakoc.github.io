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
    mockup: 'paper',
  },
  {
    id: 'lentivirus-search',
    title: 'Lentivirus Gene Search Tool',
    category: 'Genomics',
    categoryColor: 'var(--color-teal)',
    description:
      'Interactive genome browser for HIV-1/2 & SIV — gene annotations, conserved regions, 3D protein models.',
    link: 'https://github.com/JORDANKLANFER/jbrowse2_project',
    gradientBg: 'linear-gradient(150deg, #5C9A92, #6BB2BC)',
    mockup: 'genome',
  },
  {
    id: 'email-classification',
    title: 'Email Classification',
    category: 'Machine Learning',
    categoryColor: 'var(--color-green)',
    description:
      'Logistic regression spam classifier — 40+ engineered features, L1/L2-regularized cross-validation.',
    link: 'https://github.com/can-karakoc/spam-ham.git',
    gradientBg: 'linear-gradient(150deg, #6FAF85, #8BC99F)',
    mockup: 'inbox',
  },
  {
    id: 'world-game-design',
    title: 'World Game Design',
    category: 'Software Engineering',
    categoryColor: 'var(--color-indigo-purple)',
    description:
      'Procedurally generated Java game world with mini-worlds and persistent save/load state.',
    link: 'https://youtu.be/xaQWofbBags',
    gradientBg: 'linear-gradient(150deg, #95B1EE, #A89FD9)',
    mockup: 'arcade',
  },
];

function getDomain(link: string): string {
  try {
    return new URL(link).hostname;
  } catch {
    return link;
  }
}

/* Stylized fallback visuals for projects without a screenshot. Each is a
   symbolic mockup (not a fake screenshot) themed to the project. */
function ProjectMockup({ type }: { type: NonNullable<Project['mockup']> }) {
  const frame = {
    aspectRatio: '1.57 / 1',
    border: '1px solid rgba(10, 37, 64, 0.08)',
    boxShadow: '0 12px 28px -18px rgba(10, 37, 64, 0.35)',
  };

  if (type === 'paper') {
    return (
      <div
        className="relative w-full overflow-hidden rounded-[10px] flex items-center justify-center"
        style={{ ...frame, background: 'linear-gradient(150deg, #eef2f8 0%, #dde5f0 100%)' }}
      >
        {/* A4 paper - title page only */}
        <div
          className="relative bg-white"
          style={{
            height: '86%',
            aspectRatio: '1 / 1.414',
            boxShadow: '0 10px 30px -10px rgba(10, 37, 64, 0.35), 0 1px 3px rgba(10, 37, 64, 0.12)',
            padding: '7% 6%',
            fontFamily: 'Georgia, serif',
          }}
        >
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="text-[8px] mb-3" style={{ color: '#555' }}>
              December 2024
            </p>
            <h3 className="font-bold leading-snug mb-3" style={{ fontSize: '11px', color: '#000' }}>
              Predictive and Inferential Models for Carbon Emissions and Renewable Energy Production
            </h3>
            <p className="text-[9px] mb-0.5" style={{ color: '#222' }}>
              University of California, Berkeley
            </p>
            <p className="text-[8px] font-bold" style={{ color: '#333' }}>
              Data 102: Data, Inference, and Decisions
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'genome') {
    const tracks = [
      { label: 'HIV-1', color: '#5C9A92', genes: [[6, 18], [26, 34], [42, 62], [70, 88]] },
      { label: 'HIV-2', color: '#7FC4CD', genes: [[10, 22], [30, 48], [58, 66], [76, 92]] },
      { label: 'SIV', color: '#9DD5DC', genes: [[4, 14], [20, 40], [50, 58], [66, 84], [88, 96]] },
    ];
    return (
      <div
        className="relative w-full overflow-hidden rounded-[10px] flex flex-col justify-center gap-3 px-6"
        style={{ ...frame, background: 'linear-gradient(150deg, #eef7f6 0%, #dcede9 100%)' }}
      >
        {/* Ruler */}
        <div className="flex items-end gap-[2px] h-3 ml-12">
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={i}
              className="flex-1"
              style={{
                height: i % 5 === 0 ? '100%' : '40%',
                background: 'rgba(10, 37, 64, 0.18)',
              }}
            />
          ))}
        </div>
        {tracks.map((track) => (
          <div key={track.label} className="flex items-center gap-2">
            <span
              className="text-[8px] font-bold w-10 text-right"
              style={{ fontFamily: 'var(--font-plex)', color: 'rgba(10, 37, 64, 0.55)' }}
            >
              {track.label}
            </span>
            <div className="relative flex-1 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.6)' }}>
              {track.genes.map(([start, end], i) => (
                <span
                  key={i}
                  className="absolute top-0 h-3 rounded-full"
                  style={{
                    left: `${start}%`,
                    width: `${end - start}%`,
                    background: track.color,
                    boxShadow: '0 2px 6px -2px rgba(10, 37, 64, 0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'inbox') {
    const rows = [
      { sender: 'jenkins-ci@build.dev', subject: 'Nightly build report — all green', tag: 'HAM' },
      { sender: 'promo@dealz-now.biz', subject: 'YOU WON!! Claim your $1000 gift card', tag: 'SPAM' },
      { sender: 'advisor@berkeley.edu', subject: 'Office hours moved to Thursday', tag: 'HAM' },
      { sender: 'no-reply@cheapmeds.ru', subject: 'Lowest prices guaranteed, act now', tag: 'SPAM' },
      { sender: 'team@github.com', subject: 'Your pull request was merged', tag: 'HAM' },
    ];
    return (
      <div
        className="relative w-full overflow-hidden rounded-[10px] flex items-center justify-center"
        style={{ ...frame, background: 'linear-gradient(150deg, #eef8f1 0%, #dcede0 100%)' }}
      >
        <div
          className="bg-white rounded-lg overflow-hidden flex flex-col"
          style={{ width: '86%', height: '82%', boxShadow: '0 10px 30px -10px rgba(10, 37, 64, 0.3)' }}
        >
          <div
            className="px-3 py-1.5 flex items-center gap-1.5"
            style={{ borderBottom: '1px solid rgba(10, 37, 64, 0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#6FAF85' }} />
            <span className="text-[8px] font-bold" style={{ fontFamily: 'var(--font-plex)', color: 'var(--color-ink)' }}>
              Inbox
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            {rows.map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 flex-1"
                style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(10, 37, 64, 0.05)' : 'none' }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[7px] font-semibold truncate" style={{ color: 'var(--color-ink)' }}>
                    {row.sender}
                  </p>
                  <p className="text-[7px] truncate" style={{ color: 'var(--color-ink-muted)' }}>
                    {row.subject}
                  </p>
                </div>
                <span
                  className="shrink-0 px-1.5 py-0.5 rounded-full text-[6px] font-bold tracking-wide"
                  style={{
                    fontFamily: 'var(--font-plex)',
                    color: row.tag === 'SPAM' ? '#dc2626' : '#16a34a',
                    background: row.tag === 'SPAM' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 163, 74, 0.1)',
                  }}
                >
                  {row.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // arcade
  return (
    <div
      className="relative w-full overflow-hidden rounded-[10px] flex items-center justify-center"
      style={{ ...frame, background: 'linear-gradient(150deg, #2a2550 0%, #3d3470 100%)' }}
    >
      {/* Pixel-world backdrop */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-7 opacity-40">
        {Array.from({ length: 84 }).map((_, i) => {
          const palette = ['#95B1EE', '#A89FD9', '#6FAF85', 'transparent', 'transparent'];
          const color = palette[(i * 7) % palette.length];
          return <span key={i} style={{ background: color }} />;
        })}
      </div>
      {/* Play button */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: '20%',
          aspectRatio: '1 / 1',
          background: 'rgba(255, 255, 255, 0.16)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderLeft: '11px solid white',
            marginLeft: '3px',
          }}
        />
      </div>
    </div>
  );
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
      {/* Mockup: browser window for web apps, A4 research paper otherwise */}
      <div className="px-5 pt-5">
        {project.screenshot ? (
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
              <Image
                src={project.screenshot}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={project.screenshot === '/protein-interaction-explorer.png'}
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          <ProjectMockup type={project.mockup ?? 'paper'} />
        )}
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
    <section id="work" className="relative pt-0 pb-24 scroll-mt-28">
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Section title — understated label row with a "see all" link,
            echoing the "Featured works / See all works" hierarchy */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2
              className="font-medium"
              style={{
                fontSize: '16px',
                letterSpacing: '-0.01em',
                color: 'var(--color-ink)',
              }}
            >
              Featured Projects
            </h2>
            <a
              href="/projects"
              className="font-medium no-underline hover:underline whitespace-nowrap"
              style={{
                fontSize: '16px',
                letterSpacing: '-0.01em',
                color: 'var(--color-ink)',
                textUnderlineOffset: '3px',
              }}
            >
              See all projects
            </a>
          </div>
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
