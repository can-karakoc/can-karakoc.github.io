import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroGrid from "./HeroGrid";

// Edit freely — these cycle under the name.
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

  // aria-live keeps the rotation announced once, not on every tick.
  return (
    <span className="relative inline-flex overflow-hidden align-baseline text-lime" style={{ width: 'auto', minWidth: '10ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={VERBS[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
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
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/60"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-lime" />
            Product Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-mega font-extrabold tracking-[-0.03em]"
          >
            Can Karakoc
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.01em]"
          >
            Someone who <RotatingVerb reduced={reduced} /> products.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 max-w-lg text-base text-paper/70 leading-relaxed"
          >
            Berkeley CS + Data Science. I take an idea from research to shipped code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-semibold text-ink shadow-lg shadow-lime/20"
            >
              See the work
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, borderColor: "rgba(198, 241, 53, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center rounded-full border border-paper/25 px-7 py-3.5 font-medium text-paper backdrop-blur-sm"
            >
              Get in touch
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="shell relative z-10 mt-16 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em] text-paper/45">
        <span>Scroll ↓</span>
        <span>Based in California, USA</span>
      </div>
    </section>
  );
}
