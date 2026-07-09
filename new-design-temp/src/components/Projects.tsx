import { useMemo, useState, memo } from "react";
import ProjectCard from "./ProjectCard";
import { visibleProjects, SHOW_DESIGN_TRACK, type Track } from "../data/projects";

type Filter = "all" | Track;

function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () =>
      filter === "all"
        ? visibleProjects
        : visibleProjects.filter((p) => p.track === filter),
    [filter]
  );

  return (
    <section id="work" className="border-t border-ink/10">
      <div className="shell py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">(Selected work)</p>
            <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] sm:text-6xl">
              Things I&apos;ve built.
            </h2>
          </div>

          {/* Filter only meaningful once the design track is live. */}
          {SHOW_DESIGN_TRACK && (
            <div className="flex gap-2 font-mono text-xs uppercase tracking-widest">
              {(["all", "build", "design"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2 transition-colors ${
                    filter === f
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 hover:border-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {shown.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(Projects);
