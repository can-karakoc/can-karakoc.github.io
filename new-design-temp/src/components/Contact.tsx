import { motion } from "framer-motion";

const EMAIL = "cankarakoc@berkeley.edu";
const LINKS = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "GitHub", href: "https://github.com/can-karakoc" },
  { label: "LinkedIn", href: "https://linkedin.com/in/can-karakoc" },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-ink/10 bg-ink text-paper">
      <div className="shell py-28 sm:py-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-8 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-paper/55"
        >
          (Let&apos;s make something)
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.1 }}
          className="max-w-4xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-7xl"
        >
          Got something worth <span className="text-lime">building</span>?
        </motion.h2>

        <div className="mt-12 flex flex-wrap gap-4">
          {LINKS.map((l, idx) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.3 + idx * 0.1
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 font-medium transition-all duration-500 ease-out hover:scale-105 hover:bg-lime hover:text-ink hover:border-lime"
            >
              {l.label}
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
