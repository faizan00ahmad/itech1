"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header({ onOpenContact }: { onOpenContact: () => void }) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const close = () => { if (mq.matches) setNavOpen(false); };
    mq.addEventListener("change", close);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setNavOpen(false); };
    document.addEventListener("keydown", esc);
    return () => { mq.removeEventListener("change", close); document.removeEventListener("keydown", esc); };
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#products", label: "Products" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      data-header
      className="fixed inset-x-0 top-0 z-50 h-[84px] transition-all duration-500 [&.is-scrolled]:h-[72px] [&.is-scrolled]:bg-ink/85 [&.is-scrolled]:backdrop-blur-xl [&.is-scrolled]:border-b [&.is-scrolled]:border-white/5 [&.is-hidden]:-translate-y-full"
    >
      <div className="h-full w-[min(1400px,100%-48px)] mx-auto flex items-center gap-6">
        {/* Brand */}
        <a
          href="#home"
          data-scroll-to
          aria-label="iTech Evolution home"
          className="flex items-center shrink-0 hover:scale-[1.04] transition-transform duration-500"
        >
          <Image
            src="/logo.webp"
            alt="iTech Evolution"
            width={150}
            height={64}
            priority
            className="h-[46px] w-auto drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)]"
          />
        </a>

        {/* Desktop nav */}
        <nav className="ml-auto hidden lg:flex items-center gap-[clamp(20px,2.4vw,40px)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-scroll-to
              className="relative py-2 text-[14px] font-medium text-white/75 hover:text-white transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-accent after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-500"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onOpenContact}
            className="btn-glow ml-5 px-7 h-[46px] rounded-full font-display font-bold text-[12px] tracking-[0.2em] uppercase cursor-pointer"
          >
            <span>Get a Quote</span>
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-auto w-12 h-12 grid place-content-center gap-[7px] rounded-full border border-white/20 bg-ink/50 backdrop-blur-lg cursor-pointer"
          aria-expanded={navOpen}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          onClick={() => setNavOpen(!navOpen)}
        >
          <span
            className={`w-5 h-[1.5px] bg-white transition-transform duration-500 ${navOpen ? "translate-y-[4.25px] rotate-45" : ""}`}
          />
          <span
            className={`w-5 h-[1.5px] bg-white transition-transform duration-500 ${navOpen ? "-translate-y-[4.25px] -rotate-45" : ""}`}
          />
        </button>

        {/* Mobile overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-[-1] flex flex-col justify-center px-8 pb-10 pt-24 bg-ink transition-[clip-path] duration-700 ${navOpen ? "[clip-path:circle(150%_at_calc(100%-44px)_42px)]" : "[clip-path:circle(0%_at_calc(100%-44px)_42px)]"}`}
        >
          <nav className="flex flex-col gap-1.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-scroll-to
                onClick={() => setNavOpen(false)}
                className="py-2 font-display font-extrabold text-[clamp(32px,9vw,48px)] uppercase text-white hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => { setNavOpen(false); onOpenContact(); }}
            className="btn-glow self-start mt-10 px-9 h-[56px] rounded-full font-display font-bold text-[13px] tracking-[0.2em] uppercase cursor-pointer"
          >
            <span>Get a Quote</span>
          </button>
        </div>
      </div>
    </header>
  );
}
