import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring" as const, stiffness: 100, damping: 25 },
};

const revealStagger = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring" as const, stiffness: 100, damping: 25, delay: 0.15 },
};

export default function About() {
  return (
    <section id="about" className="shell py-28 sm:py-40">
      <motion.p {...reveal} className="eyebrow mb-10">
        (About)
      </motion.p>
      <motion.h2
        {...reveal}
        className="max-w-4xl font-display text-3xl font-bold leading-[1.12] tracking-[-0.01em] sm:text-5xl"
      >
        I&apos;m a recent graduate from{" "}
        <span className="text-cobalt">UC Berkeley</span>, with a dual degree in{" "}
        <span className="text-cobalt">Computer Science</span> and{" "}
        <span className="underline decoration-lime decoration-[6px] underline-offset-4">
          Data Science
        </span>, specializing in Computational Methods in Molecular and Genomic Biology.
      </motion.h2>

      <motion.p
        {...revealStagger}
        className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70"
      >
        Interested in data-driven research in computational biology and product innovation through human-centered design.
        Bridging data-driven computational approaches with biological research, with emphasis on{" "}
        <span className="font-semibold">machine learning</span> and{" "}
        <span className="font-semibold">statistical modeling</span> to explore complex biological systems.
      </motion.p>

      <motion.p
        {...revealStagger}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70"
      >
        Beyond professional pursuits, I&apos;m passionate about design and innovation—exploring product ideas, web design, and graphic projects.
        I also love photography, hiking, and spending time in nature, where I find inspiration in both creativity and the outdoors.
      </motion.p>
    </section>
  );
}
