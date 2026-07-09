import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <div
        className={`shell flex items-center justify-between py-5 transition-colors duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/70 text-ink"
            : "text-paper"
        }`}
      >
        <a
          href="#top"
          className="font-display text-lg font-extrabold lowercase tracking-tight"
        >
          ck<span className="text-lime">.</span>
        </a>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
          <a href="#work" className="transition-colors hover:text-lime">
            Work
          </a>
          <a href="#about" className="transition-colors hover:text-lime">
            About
          </a>
          <a href="#contact" className="transition-colors hover:text-lime">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
