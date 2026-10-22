export default function Hero() {
  return (
    <section
      id="home"
      data-sea
      className="relative isolate overflow-hidden min-h-[max(100svh,720px)] flex flex-col justify-end pb-[clamp(48px,7vh,80px)] pt-[calc(84px+72px)] bg-ink"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Ambient glows */}
      <div data-float className="absolute -right-[20vw] -bottom-[30vw] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(245,183,0,0.35),transparent_65%)] blur-[100px] opacity-50" />
      <div data-float className="absolute -left-[10vw] top-[20%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(201,206,214,0.2),transparent_65%)] blur-[100px] opacity-40" />

      <div className="container-site relative z-10">
        {/* Eyebrow */}
        <p data-reveal className="flex items-center gap-3 mb-7 font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-accent">
          <span className="eyebrow-dot" />
          UK-Based IT Solutions Firm
        </p>

        {/* Title */}
        <h1
          data-reveal
          className="max-w-[15ch] font-display font-extrabold text-[clamp(44px,7.2vw,120px)] leading-[0.9] tracking-[-0.04em] uppercase text-white"
        >
          Innovative IT Solutions For Growth &amp;&nbsp;
          <em className="not-italic text-accent">Success</em>
        </h1>

        {/* Lead + CTA */}
        <div className="grid gap-8 mt-[clamp(32px,4.5vw,56px)] items-end md:grid-cols-[1.25fr_auto]">
          <p data-reveal className="max-w-[56ch] text-[clamp(16px,1.2vw,18px)] leading-relaxed text-white/70">
            iTech Evolution provides honest, bespoke, multi-channel IT services.
            Our expertise spans diverse private and public companies, ensuring
            tailored solutions that drive growth and success.
          </p>
          <div data-reveal className="flex flex-wrap gap-4">
            <a
              href="#contact"
              data-scroll-to
              className="btn-glow inline-flex items-center gap-3 h-[56px] px-9 rounded-full font-display font-bold text-[13px] tracking-[0.16em] uppercase cursor-pointer"
            >
              <span>Contact Us</span>
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
            </a>
            <a
              href="#services"
              data-scroll-to
              className="btn-ghost inline-flex items-center h-[56px] px-9 rounded-full font-display font-bold text-[13px] tracking-[0.16em] uppercase cursor-pointer"
            >
              <span>Our Services</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <ul className="grid gap-4 mt-[clamp(40px,5.5vw,72px)] sm:grid-cols-3">
          {[
            { value: "200", suffix: "+", label: "Projects delivered globally" },
            { value: "50", suffix: "+", label: "Happy clients worldwide" },
            { value: "8", suffix: "", label: "Core IT service areas" },
          ].map((s) => (
            <li
              key={s.label}
              data-reveal
              className="glass flex items-center gap-5 px-7 py-6 rounded-2xl"
            >
              <strong className="font-display font-black text-[clamp(34px,3.6vw,52px)] leading-none tracking-tight text-white tabular-nums">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
              </strong>
              <span className="text-[14px] leading-snug text-white/60 max-w-[16ch]">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll cue */}
      <a href="#about" data-scroll-to className="scroll-cue hidden sm:block" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}
