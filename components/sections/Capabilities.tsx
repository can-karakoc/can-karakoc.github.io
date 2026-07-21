'use client';

import { ScrollReveal } from '@/components/animations';

interface Capability {
  n: string;
  title: string;
  line: string;
  items: string[];
}

const capabilities: Capability[] = [
  {
    n: '01',
    title: 'Programming',
    line: 'Building with clean, efficient code.',
    items: ['Python', 'SQL', 'Java', 'JavaScript', 'HTML', 'CSS', 'C'],
  },
  {
    n: '02',
    title: 'AI & Machine Learning',
    line: 'Models that learn and predict.',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'Bambi'],
  },
  {
    n: '03',
    title: 'Computational Biology',
    line: 'Where code meets molecular data.',
    items: [
      'BioPython',
      'Clustal Omega',
      'AlphaFold',
      'JBrowse',
      'Single-Cell Analysis',
      'Gene Annotations',
    ],
  },
  {
    n: '04',
    title: 'Data Analysis & Visualization',
    line: 'Turning data into insights.',
    items: ['Plotly', 'Seaborn', 'Matplotlib', 'Clustering', 'Decision Trees', 'Tableau'],
  },
];

export function Capabilities() {
  return (
    <section className="relative py-8">
      <ScrollReveal>
        <h2
          className="font-extrabold leading-tight mb-8"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
          }}
        >
          Skills
        </h2>
      </ScrollReveal>

      <div
        style={{
          borderTop: '1px solid rgba(10, 37, 64, 0.1)',
        }}
      >
        {capabilities.map((c, i) => (
          <ScrollReveal key={c.n} delay={i * 0.06}>
            <div
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 py-7 px-6 -mx-6 sm:items-baseline transition-all duration-500 ease-out hover:bg-[rgba(10,37,64,0.03)] hover:rounded-2xl group"
              style={{
                borderBottom: '1px solid rgba(10, 37, 64, 0.1)',
              }}
            >
              <span
                className="sm:col-span-1 text-sm font-bold"
                style={{
                  fontFamily: 'var(--font-plex)',
                  color: 'var(--color-cobalt)',
                }}
              >
                {c.n}
              </span>
              <h3
                className="sm:col-span-3 font-extrabold text-[21px] leading-tight"
                style={{
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {c.title}
              </h3>
              <p
                className="sm:col-span-4 text-[17px]"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                {c.line}
              </p>
              <ul className="sm:col-span-4 flex flex-wrap gap-2 sm:justify-end list-none p-0 m-0">
                {c.items.map((item, idx) => (
                  <li
                    key={item}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-400 ease-out cursor-default group-hover:scale-105 group-hover:-translate-y-1"
                    style={{
                      fontFamily: 'var(--font-plex)',
                      color: 'var(--color-ink-muted)',
                      border: '1px solid rgba(10, 37, 64, 0.14)',
                      transitionDelay: `${idx * 30}ms`,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
