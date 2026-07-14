'use client';

import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@/components/ui/SocialIcon';
import Image from 'next/image';

export interface Project {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  link: string;
  gradientBg: string;
  screenshot?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col rounded-[var(--radius-card)] overflow-hidden no-underline"
      style={{
        background: 'var(--color-glass-70)',
        backdropFilter: 'blur(16px) saturate(1.3)',
        border: '1px solid var(--color-glass-border)',
        boxShadow:
          '0 34px 70px -46px rgba(23,70,184,0.5), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
      whileHover={{
        y: -9,
        boxShadow: '0 62px 116px -52px rgba(23,70,184,0.68)',
      }}
      transition={{
        duration: 0.55,
        ease: [0.16, 0.8, 0.3, 1],
      }}
    >
      {/* Thumbnail with floating browser window */}
      <div className="relative h-64 overflow-hidden flex items-end justify-center px-[42px]">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: project.gradientBg,
          }}
        />

        {/* Soft white radial highlight */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(circle at 30% 22%, rgba(255,255,255,0.45), transparent 46%)',
          }}
        />

        {/* Floating browser window */}
        <motion.div
          className="relative w-full max-w-[430px] rounded-t-[11px] overflow-hidden mb-0"
          style={{
            background: 'var(--color-frame-dark)',
            boxShadow: 'var(--shadow-browser)',
            transform: 'translateY(22px)',
          }}
          whileHover={{
            y: 8,
            scale: 1.035,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 0.8, 0.3, 1],
          }}
        >
          {/* Chrome bar */}
          <div
            className="flex items-center gap-1.5 px-3 py-2.5"
            style={{
              background:
                'linear-gradient(180deg, var(--color-frame-chrome), var(--color-frame-chrome-dark))',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: '#ff5f57' }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: '#febc2e' }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: '#28c840' }}
            />
          </div>

          {/* Screenshot */}
          <div
            className="w-full h-[186px] bg-[var(--color-frame-darker)]"
            style={{ borderRadius: '0' }}
          >
            {project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={project.title}
                width={430}
                height={186}
                className="w-full h-full object-cover"
                style={{ borderRadius: '0' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
                Screenshot placeholder
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Card body */}
      <div className="px-6 py-5 pb-6">
        {/* Category label */}
        <div
          className="font-semibold text-[11px] tracking-[0.16em] uppercase mb-2"
          style={{
            fontFamily: 'var(--font-plex)',
            color: project.categoryColor,
          }}
        >
          {project.category}
        </div>

        {/* Title */}
        <h3
          className="font-extrabold text-[22px] leading-tight mb-2"
          style={{
            color: 'var(--color-ink)',
            letterSpacing: '-0.025em',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-[14.5px] leading-relaxed mb-4"
          style={{
            color: 'var(--color-ink-muted)',
            maxWidth: '400px',
          }}
        >
          {project.description}
        </p>

        {/* View project link */}
        <motion.div
          className="inline-flex items-center gap-2 font-bold text-[13px]"
          style={{
            color: 'var(--color-cobalt)',
          }}
          whileHover={{ gap: '14px' }}
          transition={{ duration: 0.3 }}
        >
          View project
          <ExternalLinkIcon />
        </motion.div>
      </div>
    </motion.a>
  );
}
