'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations';

const projects = [
  {
    id: 'protein-explorer',
    title: 'Protein Interaction Explorer',
    category: 'Full-stack',
    categoryColor: 'var(--color-cobalt)',
    description:
      'Parse, visualize & compare protein structures — AlphaFold coloring, contact detection, exportable reports.',
    link: 'https://protein-io.vercel.app/',
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
    screenshot: '/protein-embedding-workbench.png',
  },
  {
    id: 'lentivirus-search',
    title: 'Lentivirus Gene Search',
    category: 'Genomics',
    categoryColor: 'var(--color-teal)',
    description:
      'An interactive genome browser for HIV-1/2 & SIV with 3D protein models.',
    link: 'https://jordanklanfer.github.io/static_jbrowse/',
  },
  {
    id: 'energy-emissions',
    title: 'Energy & Carbon Emissions',
    category: 'Data Science',
    categoryColor: 'var(--color-cobalt-deep)',
    description:
      'Predicting renewable output and estimating price→emissions causal impact.',
    link: 'https://github.com/can-karakoc/data102-final-proj',
  },
];

export function ProjectsPage() {
  return (
    <section
      className="relative py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #ffffff, #eef5ff 40%, #e6f0fb)',
      }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Page Header */}
        <ScrollReveal>
          <div className="mb-16">
            <h1
              className="font-extrabold leading-none mb-4"
              style={{
                fontSize: 'clamp(42px, 6vw, 64px)',
                letterSpacing: '-0.04em',
                color: 'var(--color-ink)',
              }}
            >
              Projects
            </h1>
            <p
              className="text-lg"
              style={{
                color: 'var(--color-ink-muted)',
              }}
            >
              Selected work in computational biology, machine learning, and data science.
            </p>
          </div>
        </ScrollReveal>

        {/* Stacked Magazine Layout */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <article>
                {/* Project Number */}
                <div
                  className="text-[13px] font-bold tracking-[0.16em] uppercase mb-4"
                  style={{
                    fontFamily: 'var(--font-plex)',
                    color: project.categoryColor,
                  }}
                >
                  {String(index + 1).padStart(2, '0')} / {project.category}
                </div>

                {/* Title */}
                <h2
                  className="font-extrabold text-[36px] leading-tight mb-4"
                  style={{
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {project.title}
                </h2>

                {/* Description */}
                <p
                  className="text-[17px] leading-relaxed mb-8"
                  style={{
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {project.description}
                </p>

                {/* Screenshot */}
                {project.screenshot && (
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="relative mb-6 rounded-[20px] overflow-hidden"
                    style={{
                      aspectRatio: '16 / 9',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                      backdropFilter: 'blur(24px) saturate(1.4)',
                      WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
                      border: '2px solid rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 30px 60px -20px rgba(23, 70, 184, 0.3), inset 0 2px 0 rgba(255,255,255,1)',
                    }}
                  >
                    <Image
                      src={project.screenshot}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}

                {/* CTA */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[100px] font-bold text-sm no-underline mag transition-transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(180deg, #2249B8, #122E8C)',
                    color: '#ffffff',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 20px -8px rgba(15,40,120,0.9)',
                  }}
                >
                  View project →
                </a>

                {/* Divider */}
                {index < projects.length - 1 && (
                  <div
                    className="mt-20 h-[1px]"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(29, 78, 216, 0.15) 20%, rgba(29, 78, 216, 0.15) 80%, transparent)',
                    }}
                  />
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
