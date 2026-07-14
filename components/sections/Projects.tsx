'use client';

import { ProjectCard, Project } from './ProjectCard';
import { ScrollReveal } from '@/components/animations';
import { ArrowRightIcon } from '@/components/ui/SocialIcon';

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
  return (
    <section
      id="work"
      className="relative py-20 pb-32"
      style={{
        background: 'var(--color-surface-projects)',
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px] mb-12">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        {/* View all on GitHub button */}
        <ScrollReveal>
          <div className="flex justify-center">
            <a
              href="https://github.com/can-karakoc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] font-semibold text-sm no-underline mag"
              style={{
                background: 'var(--color-glass-55)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--color-glass-border)',
                color: 'var(--color-ink)',
                boxShadow:
                  '0 12px 30px -16px rgba(23,70,184,0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              View all on GitHub
              <ArrowRightIcon />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
