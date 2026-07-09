import { motion } from "framer-motion";
import { capabilities } from "../data/capabilities";

export default function Capabilities() {
  return (
    <section className="border-t border-ink/10">
      <div className="shell py-24">
        <p className="eyebrow mb-12">(What I bring end-to-end)</p>
        <div className="divide-y divide-ink/10">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group grid grid-cols-1 gap-4 py-8 sm:grid-cols-12 sm:items-baseline"
            >
              <span className="font-mono text-sm text-cobalt sm:col-span-1">
                {c.n}
              </span>
              <h3 className="font-display text-2xl font-bold sm:col-span-3">
                {c.title}
              </h3>
              <p className="font-display text-xl text-ink/70 sm:col-span-4">
                {c.line}
              </p>
              <ul className="flex flex-wrap gap-2 sm:col-span-4 sm:justify-end">
                {c.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-ink/15 px-3 py-1 font-mono text-xs text-ink/70 transition-colors group-hover:border-cobalt/50"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
