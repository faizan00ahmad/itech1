const steps = [
  { num: "01", title: "Discovery Call", desc: "We understand your business needs, current architecture, challenges, and performance targets." },
  { num: "02", title: "Consultation & Strategy", desc: "Deep technical discussion addressing deployment mechanisms and custom solution paths." },
  { num: "03", title: "Proof of Value", desc: "Detailed verification mapping how our integrations address security protocols and operational gains." },
  { num: "04", title: "Proposal & Agreement", desc: "A granular roadmap itemizing resources, milestone intervals, deliverables, SLAs, and timelines." },
  { num: "05", title: "Build & Communicate", desc: "Continuous progress updates, environment testing, and structured integration sprints coordination." },
  { num: "06", title: "Delivery & Support", desc: "Comprehensive audits, handoff validation, client sign-off, and long-term priority support." },
];

export default function Process() {
  return (
    <section id="process" data-sea className="relative section-pad bg-paper overflow-clip">
      <div className="container-site">
        <header className="max-w-[860px] mb-[clamp(60px,8vw,100px)]">
          <p className="flex items-center gap-3 mb-6 font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-accent">
            <span className="eyebrow-dot" />
            Our Process
          </p>
          <h2 data-reveal className="font-display font-black text-[clamp(40px,6.8vw,96px)] leading-[0.92] tracking-[-0.03em] uppercase text-ink-2">
            How It Works
          </h2>
        </header>

        <div className="grid gap-7">
          {steps.map((s, i) => (
            <article
              key={s.num}
              data-stack-card
              className="stack-card-sticky relative grid md:grid-cols-[auto_1fr] gap-7 p-[clamp(30px,4.5vw,56px)] rounded-3xl bg-gradient-to-br from-[#1B1E24] to-[#0E1014] border border-white/8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] text-white/70"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="absolute right-[clamp(22px,3.5vw,44px)] top-[clamp(16px,2.5vw,32px)] font-display font-black text-[clamp(54px,8vw,110px)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(245,183,0,0.15)]">
                {s.num}
              </span>
              <div className="w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-accent to-[#C99400] flex items-center justify-center text-ink shadow-[0_16px_34px_-12px_rgba(245,183,0,0.55)]">
                <span className="font-display font-bold text-lg">{s.num}</span>
              </div>
              <div>
                <h3 className="font-display font-black text-[clamp(23px,2.8vw,38px)] uppercase tracking-tight text-white mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="max-w-[52ch] text-[clamp(15px,1.2vw,17px)] leading-relaxed">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
