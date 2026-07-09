import { marquee } from "../data/capabilities";

export default function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <section className="marquee overflow-hidden border-y border-ink/10 bg-lime py-5 text-ink">
      <div className="marquee-track items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-xl font-bold">{item}</span>
            <span className="text-cobalt">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
