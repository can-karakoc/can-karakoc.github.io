import { motion } from "framer-motion";
import type { Project } from "../data/projects";

const ACCENT: Record<Project["accent"], string> = {
  cobalt: "43,52,255",
  lime: "198,241,53",
  periwinkle: "148,173,255",
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const rgb = ACCENT[project.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 25,
        delay: index * 0.1
      }}
    >
      <motion.div
        className="group relative block overflow-hidden rounded-[28px] border border-ink/12 bg-paper p-8 shadow-lg hover:border-ink/25 hover:shadow-2xl sm:p-12"
      >
        {/* Accent wash on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(90% 120% at 85% 0%, rgba(${rgb},0.16), transparent 60%)`,
          }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <span className="font-mono text-xs text-ink/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs text-ink/40">{project.year}</span>
        </div>

        <h3 className="relative mt-8 max-w-3xl font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
          {project.tagline}
        </h3>

        <p className="relative mt-5 max-w-2xl text-ink/70">{project.blurb}</p>

        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
            {project.title}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/50">
            {project.roles.join(" / ")}
          </span>
        </div>

        <ul className="relative mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full bg-ink/[0.04] px-3 py-1 font-mono text-[0.7rem] text-ink/60"
            >
              {s}
            </li>
          ))}
        </ul>

        {/* Project Links */}
        {(project.href || project.sourceHref) && (
          <div className="relative mt-6 flex flex-wrap gap-3">
            {project.href && (
              <motion.a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 rounded-full bg-cobalt px-5 py-2.5 text-sm font-semibold text-paper shadow-md shadow-cobalt/20"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </motion.svg>
                Web App
              </motion.a>
            )}
            {project.sourceHref && (
              <motion.a
                href={project.sourceHref}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink backdrop-blur-sm hover:bg-ink hover:text-paper"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </motion.svg>
                Source Code
              </motion.a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
