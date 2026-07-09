export default function Footer() {
  return (
    <footer className="bg-ink text-paper/55">
      <div className="shell flex flex-col items-start justify-between gap-4 border-t border-paper/10 py-8 font-mono text-xs sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Can Karakoc</span>
        <span>Product Engineer · London</span>
        <span>Built with React, Framer Motion &amp; too much coffee.</span>
      </div>
    </footer>
  );
}
