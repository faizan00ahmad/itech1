const pillars = [
  { icon: "◎", title: "User Experience", desc: "Digital experiences that resonate profoundly with your targeted core audience." },
  { icon: "⚡", title: "Quick Support", desc: "Dedicated technical response teams ready around the clock to assist you." },
  { icon: "☕", title: "Transparency", desc: "Full visibility keeping you aligned on critical paths and project progress." },
  { icon: "✦", title: "Full Stack Team", desc: "End-to-end front-end and back-end design engineering mastery." },
];

export default function About() {
  return (
    <section id="about" data-sea className="relative section-pad bg-paper overflow-clip">
      <div className="container-site">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-8 mb-[clamp(60px,8vw,100px)]">
          <div>
            <p className="flex items-center gap-3 mb-6 font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-accent-deep">
              <span className="eyebrow-dot" />
              About Us
            </p>
            <h2 data-reveal className="font-display font-black text-[clamp(40px,6.8vw,96px)] leading-[0.92] tracking-[-0.03em] uppercase text-ink-2">
              We Build &amp; Grow Business
            </h2>
          </div>
          <p data-reveal className="max-w-[30ch] font-display font-bold text-[clamp(15px,1.35vw,19px)] leading-snug tracking-wide uppercase text-ink-2/80">
            Empowering businesses with cutting-edge technology solutions.
          </p>
        </header>

        {/* Body */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-[clamp(40px,5vw,72px)] items-start">
          <div data-slide-left className="space-y-6">
            <p className="font-display font-bold text-[clamp(22px,2.4vw,34px)] leading-[1.15] tracking-tight text-ink-2">
              At iTech Evolution, we aim to empower your business with cutting-edge technology solutions that drive growth and efficiency.
            </p>
            <p className="text-[#4A5565] text-[16px] leading-relaxed">
              We offer comprehensive services designed to address your unique challenges and unlock new opportunities. We embrace a fully client-centric approach in every project, integrating feedback and ensuring active involvement throughout the cycle.
            </p>
          </div>

          {/* Pillars */}
          <div data-stagger className="grid sm:grid-cols-2 gap-5">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="glow-card glass relative p-[clamp(28px,3.5vw,40px)] rounded-3xl bg-gradient-to-br from-[#1B1E24] to-[#0E1014] text-white/70 shadow-[0_40px_70px_-40px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-transform duration-500"
              >
                <span className="block text-3xl mb-5 text-accent">{p.icon}</span>
                <h3 className="font-display font-black text-[18px] uppercase tracking-tight text-white mb-3 leading-tight">
                  {p.title}
                </h3>
                <p className="text-[14px] leading-relaxed">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
