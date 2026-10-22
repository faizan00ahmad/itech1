"use client";

const row1 = [
  "Web Development",
  "Digital Marketing",
  "Software Development",
  "Personal Assistance",
  "Cloud Services",
  "IT Management",
  "App Development",
  "Cyber Security",
];

const row2 = [
  "React",
  "Node.js",
  "Python",
  "AWS",
  "Azure",
  "WordPress",
  "Flutter",
  "AI / ML",
  "SEO",
  "DevOps",
];

function Track({ items, outline, reverse }: { items: string[]; outline?: boolean; reverse?: boolean }) {
  const content = items.map((t, i) => (
    <span key={i} className="inline-flex items-center">
      <span
        className={`font-display font-black text-[clamp(36px,6.5vw,88px)] uppercase tracking-tight whitespace-nowrap ${
          outline
            ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]"
            : "text-white"
        }`}
      >
        {t}
      </span>
      <i className="not-italic text-[clamp(16px,2vw,28px)] text-accent mx-[clamp(12px,1.8vw,26px)] animate-shimmer">
        &#10022;
      </i>
    </span>
  ));

  return (
    <div className={`flex w-max ${reverse ? "animate-marquee direction-reverse" : "animate-marquee"}`}
         style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      <div className="flex">{content}</div>
      <div className="flex" aria-hidden="true">{content}</div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      className="relative py-[clamp(40px,5.5vw,72px)] overflow-hidden border-y border-white/5 bg-ink"
      aria-label="Capabilities"
    >
      <Track items={row1} />
      <div className="mt-3">
        <Track items={row2} outline reverse />
      </div>
    </section>
  );
}
