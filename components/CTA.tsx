export default function CTA() {
  return (
    <section data-sea className="relative isolate overflow-hidden min-h-[80svh] flex items-center section-pad bg-ink">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div data-float className="absolute left-[20vw] top-[20%] w-[60vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(245,183,0,0.3),transparent_65%)] blur-[100px] opacity-40" />
      <div data-float className="absolute right-[8%] bottom-[8%] w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle,rgba(201,206,214,0.2),transparent_65%)] blur-[80px] opacity-40" />

      <div className="container-site relative z-10 text-center grid justify-items-center">
        <p className="flex items-center gap-3 mb-6 font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-accent">
          <span className="eyebrow-dot" />
          Let&apos;s Talk
        </p>
        <h2 data-scale className="max-w-[13ch] font-display font-black text-[clamp(48px,8.5vw,140px)] leading-[0.88] tracking-[-0.04em] uppercase text-white">
          Ready To Evolve Your{" "}
          <em className="not-italic text-accent">Business?</em>
        </h2>
        <p data-reveal className="max-w-[56ch] mt-9 mb-12 text-[clamp(16px,1.3vw,19px)] leading-relaxed text-white/65">
          Reach out to interface with an enterprise systems technician today. We
          are glad to help clarify any system engineering questions.
        </p>
        <a
          href="#contact"
          data-scroll-to
          data-reveal
          className="btn-glow inline-flex items-center gap-3.5 h-[64px] px-11 rounded-full font-display font-bold text-[14px] tracking-[0.16em] uppercase cursor-pointer"
        >
          <span>Get Free Quote</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
        </a>
      </div>
    </section>
  );
}
