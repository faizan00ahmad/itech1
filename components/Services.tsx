import Image from "next/image";

const svgProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-7 h-7",
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const services = [
  {
    title: "Web Design & Development",
    desc: "High-performing web ecosystems built with modern frameworks. Responsive, fast, and SEO-optimised websites that convert visitors into customers.",
    tags: ["React", "Next.js", "WordPress", "UI/UX"],
    img: unsplash("1498050108023-c5249f4df085"),
    alt: "Laptop showing code on a developer's desk",
    icon: (
      <svg {...svgProps}>
        <rect x="4" y="6" width="40" height="28" rx="3" /><path d="M16 40h16M24 34v6" /><path d="M14 18l4 4-4 4M22 26h8" />
      </svg>
    ),
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven strategies to amplify your brand. SEO, social media, PPC, content marketing, and analytics that deliver measurable ROI.",
    tags: ["SEO", "PPC", "Social Media", "Analytics"],
    img: unsplash("1460925895917-afdab827c52f"),
    alt: "Laptop displaying marketing analytics charts",
    icon: (
      <svg {...svgProps}>
        <path d="M6 40V8M6 40h36" /><path d="M12 32l9-10 7 6 12-14" /><path d="M32 14h8v8" />
      </svg>
    ),
  },
  {
    title: "Software Development",
    desc: "Custom software from enterprise platforms to SaaS products. Agile delivery with scalable architecture and clean, maintainable code.",
    tags: ["Python", "Node.js", ".NET", "APIs"],
    img: unsplash("1461749280684-dccba630e2f6"),
    alt: "Monitor showing application source code",
    icon: (
      <svg {...svgProps}>
        <path d="M8 14l16-8 16 8v20l-16 8-16-8z" /><path d="M8 14l16 8 16-8M24 22v20" />
      </svg>
    ),
  },
  {
    title: "Personal Assistance",
    desc: "Dedicated virtual assistants and tech support specialists. Calendar management, email handling, research, and admin automation.",
    tags: ["VA", "Admin", "Scheduling", "Support"],
    img: unsplash("1758598306663-4874b2aff114"),
    alt: "Assistant working on a laptop at a desk",
    icon: (
      <svg {...svgProps}>
        <circle cx="24" cy="16" r="8" /><path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" /><path d="M32 36l4 4 6-8" />
      </svg>
    ),
  },
  {
    title: "Cloud Services",
    desc: "Seamless migration to Office 365, AWS, and Azure with security compliance, backup strategies, and ongoing cost optimisation.",
    tags: ["AWS", "Azure", "Office 365", "Security"],
    img: unsplash("1667984390538-3dea7a3fe33d"),
    alt: "3D render of a cloud computing concept",
    icon: (
      <svg {...svgProps}>
        <path d="M14 36h22a8 8 0 0 0 1-15.9A12 12 0 0 0 13.6 18 9 9 0 0 0 14 36z" /><path d="M24 24v10M20 28l4-4 4 4" />
      </svg>
    ),
  },
  {
    title: "IT Management",
    desc: "Proactive hardware provisioning, network optimisation, and systems maintenance that keep your business running without interruption.",
    tags: ["Networking", "Hardware", "Maintenance", "Helpdesk"],
    img: unsplash("1558494949-ef010cbdcc31"),
    alt: "Network cables connected to a server rack",
    icon: (
      <svg {...svgProps}>
        <rect x="8" y="6" width="32" height="12" rx="2" /><rect x="8" y="22" width="32" height="12" rx="2" /><path d="M14 12h.01M14 28h.01M24 34v8M16 42h16" />
      </svg>
    ),
  },
  {
    title: "App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android, designed for performance and a polished user experience.",
    tags: ["iOS", "Android", "Flutter", "React Native"],
    img: unsplash("1512941937669-90a1b58e7e9c"),
    alt: "Smartphone showing a mobile app home screen",
    icon: (
      <svg {...svgProps}>
        <rect x="14" y="4" width="20" height="40" rx="4" /><path d="M21 9h6M22 38h4" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" data-sea className="relative section-pad bg-ink overflow-clip">
      <div data-float className="absolute -left-[20vw] top-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(245,183,0,0.18),transparent_65%)] blur-[100px] opacity-40" />
      <div data-float className="absolute right-[-15vw] bottom-[15%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(201,206,214,0.14),transparent_65%)] blur-[80px] opacity-40" />

      <div className="container-site relative z-10">
        <header className="max-w-[860px] mb-[clamp(60px,8vw,100px)]">
          <p className="flex items-center gap-3 mb-6 font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-accent">
            <span className="eyebrow-dot" />
            What We Do
          </p>
          <h2 data-reveal className="font-display font-black text-[clamp(40px,6.8vw,96px)] leading-[0.92] tracking-[-0.03em] uppercase text-white">
            The Best IT Solutions
          </h2>
          <p data-reveal className="mt-7 max-w-[58ch] text-[clamp(16px,1.2vw,18px)] leading-relaxed text-white/60">
            We pride ourselves on delivering unparalleled IT solutions tailored to meet the unique needs of your business.
          </p>
        </header>

        <div data-stagger className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`glow-card glass group flex flex-col rounded-3xl overflow-hidden hover:-translate-y-2.5 transition-all duration-500 hover:border-accent/30 ${
                i === services.length - 1
                  ? "md:col-span-2 md:justify-self-center md:w-[calc(50%-12px)] xl:col-span-1 xl:col-start-2 xl:w-full"
                  : ""
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-[1.07] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="absolute right-5 top-4 font-display font-black text-[44px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.55)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative flex flex-col flex-1 px-[clamp(24px,3vw,34px)] pb-[clamp(26px,3vw,36px)]">
                <div className="-mt-9 mb-6 w-[64px] h-[64px] rounded-2xl bg-ink-2 border border-accent/40 flex items-center justify-center text-accent shadow-[0_14px_30px_-10px_rgba(0,0,0,0.8)] group-hover:bg-accent group-hover:text-ink transition-colors duration-500">
                  {s.icon}
                </div>
                <h3 className="font-display font-black text-[clamp(20px,1.8vw,24px)] uppercase tracking-tight text-white mb-3.5 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-white/60 mb-6">{s.desc}</p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="tag-pill font-display">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
