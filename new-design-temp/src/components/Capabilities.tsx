import { motion } from "framer-motion";
import { capabilities } from "../data/capabilities";

export default function Capabilities() {
  return (
    <section className="border-t border-ink/10">
      <div className="shell py-24">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="eyebrow mb-12"
        >
          (What I bring end-to-end)
        </motion.p>
        <div className="divide-y divide-ink/10">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                x: 8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                delay: i * 0.1,
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
                {c.items.map((it, idx) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: i * 0.1 + idx * 0.03,
                    }}
                    className="rounded-full border border-ink/15 px-3 py-1 font-mono text-xs text-ink/70 transition-all duration-300 group-hover:border-cobalt/50 group-hover:scale-105"
                  >
                    {it}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
