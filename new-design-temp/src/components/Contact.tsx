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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-paper/55"
        >
          (Let&apos;s make something)
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-7xl"
        >
          Got something worth <span className="text-lime">building</span>?
        </motion.h2>

        <div className="mt-12 flex flex-wrap gap-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 font-medium transition-colors duration-300 hover:bg-lime hover:text-ink hover:border-lime"
            >
              {l.label}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
