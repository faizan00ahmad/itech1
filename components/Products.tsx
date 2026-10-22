const products = [
  {
    title: "Security & Surveillance",
    desc: "Advanced CCTV arrays, smart security walls, analytics integration, and unified monitoring.",
    wide: true,
  },
  {
    title: "Networks",
    desc: "Enterprise switching, routing, firewall policies, and secure multi-VLAN operations.",
  },
  {
    title: "PABX / IP Phones",
    desc: "VoIP solutions, SIP trunk implementations, and scalable telecom endpoints.",
  },
  {
    title: "Time & Attendance",
    desc: "Biometric tracking, employee scheduling, and automated attendance logs.",
  },
  {
    title: "Smart Lock Systems",
    desc: "Cryptographic locks, commercial access control, and secure environment permissions.",
  },
];

export default function Products() {
  return (
    <section id="products" data-sea className="relative section-pad bg-ink overflow-clip">
      <div data-float className="absolute -right-[18vw] top-[20%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(245,183,0,0.2),transparent_65%)] blur-[100px] opacity-40" />

      <div className="container-site relative z-10">
        <header className="max-w-[860px] mb-[clamp(60px,8vw,100px)]">
          <p className="flex items-center gap-3 mb-6 font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-accent">
            <span className="eyebrow-dot" />
            Featured Products
          </p>
          <h2 data-reveal className="font-display font-black text-[clamp(40px,6.8vw,96px)] leading-[0.92] tracking-[-0.03em] uppercase text-white">
            Products &amp; Systems
          </h2>
        </header>

        <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <article
              key={p.title}
              className={`glow-card glass relative min-h-[260px] p-[clamp(28px,3.5vw,40px)] pt-[calc(clamp(28px,3.5vw,40px)+80px)] rounded-3xl flex flex-col justify-end hover:-translate-y-2 transition-all duration-500 hover:border-accent/30 ${p.wide ? "lg:col-span-2 bg-gradient-to-br from-accent/15 to-ink-3/40" : ""}`}
            >
              <span className="absolute left-[clamp(28px,3.5vw,40px)] top-[clamp(28px,3.5vw,40px)] w-[60px] h-[60px] rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent font-display font-bold text-xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-[clamp(22px,3vw,36px)] top-[clamp(20px,3vw,32px)] font-display font-extrabold text-[13px] tracking-widest text-white/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display font-extrabold text-[clamp(19px,1.8vw,26px)] uppercase tracking-tight text-white mb-3 max-w-[18ch] leading-tight">
                {p.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-white/55 max-w-[34ch]">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
