import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroGrid from "./HeroGrid";

// Edit these anytime — they cycle under your name.
const VERBS = ["researches", "designs", "builds", "ships"];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function RotatingVerb({ reduced }: { reduced: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % VERBS.length), 1900);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <span className="relative inline-flex overflow-hidden align-baseline text-lime">
      <AnimatePresence mode="wait">
        <motion.span
          key={VERBS[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {VERBS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink pt-24 text-paper"
    >
      <HeroGrid />

      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(17,16,22,0.94), rgba(17,16,22,0.55) 42%, transparent 78%), linear-gradient(0deg, rgba(17,16,22,0.9), transparent 42%)",
        }}
      />

      <div className="shell relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-paper/60"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-lime" />
          Recent Graduate in Data Science & Computer Science
        </motion.p>

        <h1 className="font-display font-extrabold lowercase leading-[0.82] tracking-[-0.03em]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block text-mega"
          >
            can
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="block text-mega"
          >
            karakoc
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 max-w-xl font-display text-2xl font-semibold sm:text-3xl"
        >
          Interested in data-driven research in computational biology and product innovation through human-centered design.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 max-w-md text-paper/65"
        >
          Bridging data-driven computational approaches with biological research, with emphasis on machine learning and statistical modeling to explore complex biological systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-semibold text-ink transition-transform duration-300 ease-spring hover:-translate-y-0.5"
          >
            See the work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-paper/25 px-7 py-3.5 font-medium text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <div className="shell relative z-10 mt-16 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em] text-paper/45">
        <span className="animate-pulse">Scroll ↓</span>
        <span>Based in London, UK</span>
      </div>
    </section>
  );
}
