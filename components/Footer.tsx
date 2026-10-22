import Image from "next/image";

export default function Footer() {
  return (
    <footer data-sea className="relative bg-ink overflow-hidden border-t border-white/5">
      <div className="container-site grid gap-14 sm:grid-cols-2 lg:grid-cols-4 py-[clamp(80px,9vw,120px)]">
        {/* Brand */}
        <div>
          <Image
            src="/logo.webp"
            alt="iTech Evolution"
            width={150}
            height={64}
            className="h-[64px] w-auto mb-7"
          />
          <p className="text-[14px] leading-relaxed text-white/50 max-w-[36ch]">
            Professional UK-based IT solutions firm providing honest, bespoke, multi-channel IT services.
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-display font-bold text-[12px] tracking-[0.24em] uppercase text-accent mb-7">Services</h2>
          <ul className="space-y-3.5">
            {["Web Development", "Digital Marketing", "Software Development", "Personal Assistance"].map((s) => (
              <li key={s}>
                <a href="#services" data-scroll-to className="text-[14px] text-white/65 hover:text-white hover:translate-x-2 inline-block transition-all duration-500">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-display font-bold text-[12px] tracking-[0.24em] uppercase text-accent mb-7">Company</h2>
          <ul className="space-y-3.5">
            {[
              { label: "About Us", href: "#about" },
              { label: "Our Process", href: "#process" },
              { label: "Products", href: "#products" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} data-scroll-to className="text-[14px] text-white/65 hover:text-white hover:translate-x-2 inline-block transition-all duration-500">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-display font-bold text-[12px] tracking-[0.24em] uppercase text-accent mb-7">Contact</h2>
          <ul className="space-y-3.5 text-[14px] text-white/65 leading-relaxed">
            <li>304 Mayfair Point, London W1K 5RG</li>
            <li><a href="mailto:Contact@iTechEvolution.co.uk" className="hover:text-white transition-colors">Contact@iTechEvolution.co.uk</a></li>
            <li><a href="tel:+447553799583" className="hover:text-white transition-colors">+44 75 5379 9583</a></li>
          </ul>
        </div>
      </div>

      {/* Large scrolling text */}
      <div className="overflow-hidden whitespace-nowrap mt-[clamp(24px,4.5vw,64px)]">
        <span className="inline-block font-display font-black text-[clamp(68px,15vw,240px)] leading-none tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_rgba(245,183,0,0.15)] animate-marquee">
          iTech Evolution &middot; iTech Evolution &middot; iTech Evolution &middot; iTech Evolution &middot;&nbsp;
          iTech Evolution &middot; iTech Evolution &middot; iTech Evolution &middot; iTech Evolution &middot;&nbsp;
        </span>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-site flex items-center justify-between gap-4 py-6">
          <p className="text-[13px] text-white/45">&copy; 2026 iTech Evolution. All Rights Reserved.</p>
          <a
            href="#home"
            data-scroll-to
            className="w-12 h-12 rounded-full border border-white/15 grid place-items-center hover:bg-accent hover:text-ink hover:-translate-y-1.5 transition-all duration-500"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5m-5 5 5-5 5 5"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
