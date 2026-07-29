'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Project } from './ProjectCard';
import { ScrollReveal } from '@/components/animations';
import { projects } from '@/lib/projectsData';

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
        {/* A4 paper - title page only. Text sized in container-query units
            (cqw) so it scales with the paper and never overflows on mobile. */}
        <div
          className="relative bg-white"
          style={{
            height: '86%',
            aspectRatio: '1 / 1.414',
            boxShadow: '0 10px 30px -10px rgba(10, 37, 64, 0.35), 0 1px 3px rgba(10, 37, 64, 0.12)',
            padding: '7% 6%',
            fontFamily: 'Georgia, serif',
            containerType: 'inline-size',
          }}
        >
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p style={{ fontSize: 'clamp(8px, 3.6cqw, 14px)', marginBottom: 'clamp(6px, 4cqw, 16px)', color: '#555' }}>
              December 2024
            </p>
            <h3 className="font-bold leading-snug" style={{ fontSize: 'clamp(11px, 5cqw, 20px)', marginBottom: 'clamp(6px, 4cqw, 16px)', color: '#000' }}>
              Predictive and Inferential Models for Carbon Emissions and Renewable Energy Production
            </h3>
            <p style={{ fontSize: 'clamp(9px, 4cqw, 16px)', marginBottom: 'clamp(2px, 0.6cqw, 4px)', color: '#222' }}>
              University of California, Berkeley
            </p>
            <p className="font-bold" style={{ fontSize: 'clamp(8px, 3.6cqw, 14px)', color: '#333' }}>
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

  if (type === 'confidential') {
    return (
      <div
        className="relative w-full overflow-hidden rounded-[10px] flex items-center justify-center"
        style={{ ...frame, background: 'linear-gradient(150deg, #f5e6eb 0%, #fce8ec 100%)' }}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="confidential-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E8A5BB" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#confidential-grid)" />
          </svg>
        </div>
        {/* Lock icon */}
        <div className="relative flex flex-col items-center gap-2">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#E8A5BB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="rgba(232, 165, 187, 0.15)" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-[0.12em]" style={{ fontFamily: 'var(--font-plex)', color: '#E8A5BB' }}>
            Confidential
          </span>
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
          WebkitBackdropFilter: 'blur(6px)',
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
   Clicking navigates to project detail page. */
function ProjectGridCard({ project }: { project: Project }) {
  const router = useRouter();
  const [hovered, setHovered] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <motion.div
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col no-underline rounded-[20px] cursor-none h-full"
      style={{
        background: 'rgba(255, 255, 255, 0.94)',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 20px 44px -28px rgba(23, 70, 184, 0.3), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      {/* Text - forced onto its own compositing layer so the Explore pill's
          backdrop-filter actually samples it (backdrop-filter is unreliable
          over plain text sharing a paint layer with its ancestors, but
          works fine once the content is layer-promoted like this) */}
      <div className="p-6 flex-1 flex flex-col" style={{ transform: 'translateZ(0)' }}>
        {/* Category badge at top */}
        <span
          className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase mb-4"
          style={{
            fontFamily: 'var(--font-plex)',
            color: '#4f7dff',
          }}
        >
          {project.category}
        </span>

        {/* Screenshot/Image with browser mockup in the middle */}
        {project.screenshot ? (
          <div
            className="rounded-[10px] overflow-hidden mb-4"
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
          <div className="mb-4">
            <ProjectMockup type={project.mockup ?? 'paper'} />
          </div>
        )}

        {/* Title at bottom */}
        <h3
          className="font-extrabold text-[21px] leading-tight"
          style={{ color: 'var(--color-ink)', letterSpacing: '-0.02em' }}
        >
          {project.title}
        </h3>
      </div>

      {/* View pill following the cursor */}
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
              color: 'rgb(23, 37, 84)',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(20px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
              border: '1px solid rgba(255, 255, 255, 1)',
              boxShadow: '0 10px 32px -8px rgba(23, 70, 184, 0.5), inset 0 1px 0 rgba(255,255,255,1)',
            }}
          >
            View Details →
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative pt-0 pb-24 scroll-mt-28">
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Section title — small understated label, matching the reference's
            "Featured works" treatment and spacing */}
        <ScrollReveal>
          <h2
            className="font-extrabold mb-6"
            style={{
              fontSize: '18px',
              letterSpacing: '-0.01em',
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
