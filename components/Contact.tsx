"use client";

import { useState, FormEvent } from "react";

function Field({ label, name, type = "text", required, autoComplete, textarea }: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string; textarea?: boolean;
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="relative block">
      <Tag
        name={name}
        type={textarea ? undefined : type}
        autoComplete={autoComplete}
        required={required}
        placeholder=" "
        rows={textarea ? 4 : undefined}
        className={`field-input font-body ${textarea ? "resize-y min-h-[140px]" : ""}`}
      />
      <span className="field-label font-body">
        {label}
        {required && <i className="not-italic text-red-400 ml-0.5">*</i>}
      </span>
    </label>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    if (!payload.first_name || !payload.email) {
      setStatus("error");
      setMsg("Please provide your first name and email.");
      return;
    }

    setStatus("sending");
    setMsg("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed");
      setStatus("success");
      setMsg("Thank you! Your message has been sent. We'll be in touch shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMsg("Sorry, something went wrong. Please email us at Contact@iTechEvolution.co.uk");
    }
  }

  return (
    <section id="contact" data-sea className="relative section-pad bg-ink overflow-clip">
      <div className="container-site">
        <header className="max-w-[860px] mb-[clamp(60px,8vw,100px)]">
          <p className="flex items-center gap-3 mb-6 font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-accent">
            <span className="eyebrow-dot" />
            Get In Touch
          </p>
          <h2 data-reveal className="font-display font-black text-[clamp(40px,6.8vw,96px)] leading-[0.92] tracking-[-0.03em] uppercase text-white">
            Contact Us
          </h2>
        </header>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0 items-center max-w-[1100px]">
          {/* Info sidebar */}
          <aside data-slide-left className="relative p-[clamp(36px,5.5vw,56px)] lg:pr-32 rounded-3xl bg-gradient-to-br from-[#F7F8FA] via-[#DDE1E6] to-[#B9BFC8] text-ink overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
            <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full border border-ink/10 shadow-[0_0_0_40px_rgba(8,9,12,0.03),0_0_0_80px_rgba(8,9,12,0.02)]" />
            <h3 className="relative z-10 font-display font-black text-[clamp(23px,2.4vw,32px)] uppercase mb-9 leading-tight">
              Get In Touch With iTech Evolution
            </h3>
            <ul className="relative z-10 space-y-7">
              <li className="grid grid-cols-[52px_1fr] gap-4">
                <span className="w-[52px] h-[52px] rounded-xl bg-ink text-accent flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" strokeLinejoin="round"/><circle cx="12" cy="9.5" r="2.6"/></svg>
                </span>
                <div>
                  <strong className="block text-[12px] font-display font-bold tracking-[0.18em] uppercase mb-1.5">Main Office</strong>
                  <span className="text-[14px] text-ink/75 leading-relaxed">304 Mayfair Point, 34 South Molton Street, London, W1K 5RG</span>
                </div>
              </li>
              <li className="grid grid-cols-[52px_1fr] gap-4">
                <span className="w-[52px] h-[52px] rounded-xl bg-ink text-accent flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5" strokeLinejoin="round"/></svg>
                </span>
                <div>
                  <strong className="block text-[12px] font-display font-bold tracking-[0.18em] uppercase mb-1.5">Email</strong>
                  <a href="mailto:Contact@iTechEvolution.co.uk" className="text-[14px] text-ink/75 hover:text-ink underline-offset-2 hover:underline transition-colors">Contact@iTechEvolution.co.uk</a>
                </div>
              </li>
              <li className="grid grid-cols-[52px_1fr] gap-4">
                <span className="w-[52px] h-[52px] rounded-xl bg-ink text-accent flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M5 4h3.2l1.6 4-2.1 1.3a11 11 0 0 0 5 5l1.3-2.1 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>
                </span>
                <div>
                  <strong className="block text-[12px] font-display font-bold tracking-[0.18em] uppercase mb-1.5">Call / WhatsApp</strong>
                  <a href="tel:+447553799583" className="text-[14px] text-ink/75 hover:text-ink underline-offset-2 hover:underline transition-colors">+44 75 5379 9583</a>
                </div>
              </li>
            </ul>
            <a
              href="https://wa.me/447553799583"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2.5 mt-9 px-7 h-[52px] rounded-full bg-ink text-white font-display font-bold text-[12px] tracking-[0.18em] uppercase hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.78a9.69 9.69 0 0 1-4.95-1.35l-.35-.21-3.68.96.98-3.58-.23-.37A9.71 9.71 0 0 1 18.8 4.96a9.71 9.71 0 0 1-6.75 16.82M20.52 3.48A11.77 11.77 0 0 0 12.05 0C5.46 0 .11 5.34.11 11.91a11.85 11.85 0 0 0 1.59 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.74 1.47c6.58 0 11.94-5.34 11.96-11.91a11.84 11.84 0 0 0-3.48-8.43"/></svg>
              <span>WhatsApp Us</span>
            </a>
          </aside>

          {/* Form */}
          <div data-slide-right className="glass bg-ink-2/95 p-[clamp(28px,4.5vw,48px)] rounded-3xl lg:-ml-20 relative z-10">
            <form onSubmit={onSubmit} noValidate className="grid gap-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" name="first_name" autoComplete="given-name" required />
                <Field label="Last name" name="last_name" autoComplete="family-name" />
              </div>
              <Field label="Email" name="email" type="email" autoComplete="email" required />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              <Field label="Your message" name="message" textarea />
              <input type="checkbox" name="botcheck" className="absolute -left-[9999px] w-px h-px opacity-0" tabIndex={-1} aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-5 mt-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-glow inline-flex items-center gap-3 h-[56px] px-9 rounded-full font-display font-bold text-[13px] tracking-[0.16em] uppercase cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                >
                  <span>Send Message</span>
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
                </button>
                {msg && (
                  <p className={`text-[14px] ${status === "success" ? "text-emerald-400" : status === "error" ? "text-red-400" : "text-white/60"}`}>
                    {msg}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
