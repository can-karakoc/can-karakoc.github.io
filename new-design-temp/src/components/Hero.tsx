import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Edit freely — these cycle under the name.
const VERBS = ["researches", "designs", "builds", "ships"];

// TODO: confirm location before shipping.
const SPECS: [string, string][] = [
  ["Location", "California, USA"],
  ["Focus", "ML · Backend · Frontend · Product"],
  ["Shipped", "6 projects, end to end"],
  ["Stack", "Python · React · TypeScript · PyTorch"],
];

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
      {/* Hard-edged cobalt block, not a soft blur. Swap for the grid later. */}
      <div
        aria-hidden
        className="absolute right-0 top-0 -z-0 h-full w-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,52,255,0.18), rgba(43,52,255,0.04))",
          clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      <div className="shell relative z-10 grid gap-16 lg:grid-cols-12 lg:items-end">
        {/* Left: the claim */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/60"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-lime" />
            Product Engineer
          </motion.p>

          <h1 className="font-display font-extrabold lowercase leading-[0.82] tracking-[-0.03em]">
            {["can", "karakoc"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block text-mega"
              >
                {word}
              </motion.span>
            ))}
          </h1>

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
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              See the work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-paper/25 px-7 py-3.5 font-medium transition-colors duration-300 hover:bg-paper hover:text-ink"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Right: the receipt */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-mono text-xs lg:col-span-5 lg:pb-4"
        >
          {SPECS.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-6 border-t border-paper/12 py-3"
            >
              <dt className="uppercase tracking-[0.22em] text-paper/45">
                {label}
              </dt>
              <dd className="text-right text-paper/85">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="shell relative z-10 mt-16 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em] text-paper/45">
        <span>Scroll ↓</span>
        <span>Based in California, USA</span>
      </div>
    </section>
  );
}
