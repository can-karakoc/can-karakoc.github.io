'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/lib/projectsData';

/* Minimal screenshot display with subtle frame */
function DesktopMockup({
  image,
  alt,
  priority = false,
  projectId,
}: {
  image?: string;
  alt: string;
  priority?: boolean;
  projectId?: string;
}) {
  if (!image) return null;

  return (
    <div className="space-y-3">
      {/* Project identifier label */}
      {projectId && (
        <div className="flex items-center gap-2 px-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80' }} />
          <span
            className="text-[12px] font-medium"
            style={{
              fontFamily: 'var(--font-plex)',
              color: 'var(--color-ink-muted)',
            }}
          >
            {projectId}
          </span>
        </div>
      )}

      {/* Screenshot with minimal chrome */}
      <div
        className="rounded-[16px] overflow-hidden"
        style={{
          background: '#ffffff',
          boxShadow: '0 24px 64px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Minimal browser chrome bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{
            background: '#f7f7f7',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ec6a5e' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f4bf4f' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#61c554' }} />
          </div>
        </div>

        {/* Screenshot - full width, natural aspect ratio */}
        <div className="relative w-full bg-white">
          <Image
            src={image}
            alt={alt}
            width={1600}
            height={1000}
            className="w-full h-auto"
            priority={priority}
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const project = projects.find((p) => p.id === projectId);

  // Find previous and next projects
  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-ink)' }}>
            Project not found
          </h1>
          <button
            onClick={() => router.push('/#work')}
            className="px-6 py-3 rounded-full font-semibold text-sm"
            style={{
              background: 'var(--color-cobalt)',
              color: 'white',
            }}
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const isConfidential = project.link === '#' || project.mockup === 'confidential';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #F3F2E8 0%, #E8F2F7 100%)'
      }}
    >
      {/* Navigation controls */}
      <div className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between">
        {/* Back button */}
        <motion.button
          onClick={() => router.push('/#work')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(16px) saturate(1.5) brightness(1.03)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.5) brightness(1.03)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 12px 30px -16px rgba(23,70,184,0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
            color: 'var(--color-ink)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>

        {/* Project navigation arrows */}
        <div className="flex items-center gap-3">
          {/* Previous project */}
          {previousProject ? (
            <div className="relative group">
              <motion.button
                onClick={() => router.push(`/projects/${previousProject.id}`)}
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(16px) saturate(1.5) brightness(1.03)',
                  WebkitBackdropFilter: 'blur(16px) saturate(1.5) brightness(1.03)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  boxShadow: '0 12px 30px -16px rgba(23,70,184,0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
                  color: 'var(--color-ink)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Previous project: ${previousProject.title}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>
              {/* Tooltip */}
              <div
                className="absolute top-full right-0 mt-2 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                {previousProject.title}
              </div>
            </div>
          ) : (
            <div className="w-10 h-10" /> // Spacer
          )}

          {/* Next project */}
          {nextProject ? (
            <div className="relative group">
              <motion.button
                onClick={() => router.push(`/projects/${nextProject.id}`)}
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(16px) saturate(1.5) brightness(1.03)',
                  WebkitBackdropFilter: 'blur(16px) saturate(1.5) brightness(1.03)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  boxShadow: '0 12px 30px -16px rgba(23,70,184,0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
                  color: 'var(--color-ink)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Next project: ${nextProject.title}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
              {/* Tooltip */}
              <div
                className="absolute top-full right-0 mt-2 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                {nextProject.title}
              </div>
            </div>
          ) : (
            <div className="w-10 h-10" /> // Spacer
          )}
        </div>
      </div>

      {/* Header Section - Full width, above grid */}
      <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Category badge */}
          <span
            className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase mb-4"
            style={{
              fontFamily: 'var(--font-plex)',
              background: `${project.categoryColor}14`,
              color: project.categoryColor,
              border: `1px solid ${project.categoryColor}33`,
            }}
          >
            {project.category}
          </span>

          {/* Big Title */}
          <h1
            className="font-extrabold leading-[1.1] mb-3"
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.04em',
              color: 'var(--color-ink)',
              maxWidth: '1000px',
            }}
          >
            {project.title}
          </h1>

          {/* Timeline - Polished design */}
          {project.timeline && (
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full" style={{
              background: 'linear-gradient(135deg, rgba(79, 125, 255, 0.08) 0%, rgba(79, 125, 255, 0.04) 100%)',
              border: '1px solid rgba(79, 125, 255, 0.2)',
            }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4f7dff' }} />
              <span
                className="text-[13px] font-semibold tracking-tight"
                style={{
                  fontFamily: 'var(--font-plex)',
                  color: '#4f7dff',
                }}
              >
                {project.timeline}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">
          {/* Left column - Sticky text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 space-y-4"
          >
            {/* Description */}
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {project.description}
            </p>

            {/* Role */}
            {project.details?.role && (
              <div className="pt-1">
                <h3
                  className="text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5"
                  style={{ fontFamily: 'var(--font-plex)', color: 'var(--color-ink-muted)' }}
                >
                  Role
                </h3>
                <p
                  className="text-[14px] font-semibold"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {project.details.role}
                </p>
              </div>
            )}

            {/* Technologies */}
            {project.details?.tech && project.details.tech.length > 0 && (
              <div className="pt-1">
                <h3
                  className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2"
                  style={{ fontFamily: 'var(--font-plex)', color: 'var(--color-ink-muted)' }}
                >
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.details.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                      style={{
                        background: 'rgba(79, 125, 255, 0.08)',
                        color: '#4f7dff',
                        border: '1px solid rgba(79, 125, 255, 0.2)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {project.details?.highlights && project.details.highlights.length > 0 && (
              <div className="pt-1">
                <h3
                  className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2.5"
                  style={{ fontFamily: 'var(--font-plex)', color: 'var(--color-ink-muted)' }}
                >
                  Key Highlights
                </h3>
                <ul className="space-y-2">
                  {project.details.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                        style={{ background: '#4f7dff' }}
                      />
                      <span
                        className="text-[13.5px] leading-relaxed"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            {!isConfidential && project.link && (
              <div className="pt-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-[13px] transition-all hover:scale-105"
                  style={{
                    background: '#4f7dff',
                    color: 'white',
                    boxShadow: '0 8px 24px -10px rgba(79, 125, 255, 0.5)',
                  }}
                >
                  View Project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            )}
          </motion.div>

          {/* Right column - Scrollable images with desktop mockups */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {/* Main thumbnail with desktop mockup */}
            <DesktopMockup
              image={project.screenshot}
              alt={project.title}
              priority
              projectId={project.id}
            />

            {/* Additional images with desktop mockups */}
            {project.details?.images && project.details.images.length > 0 && (
              <>
                {project.details.images.map((image, i) => (
                  <DesktopMockup
                    key={i}
                    image={image}
                    alt={`${project.title} screenshot ${i + 2}`}
                    projectId={project.id}
                  />
                ))}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
