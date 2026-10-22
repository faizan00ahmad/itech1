"use client";

import { useState, FormEvent, useEffect, useRef } from "react";

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
        rows={textarea ? 3 : undefined}
        className={`field-input font-body ${textarea ? "resize-y min-h-[100px]" : ""}`}
      />
      <span className="field-label font-body">
        {label}
        {required && <i className="not-italic text-red-400 ml-0.5">*</i>}
      </span>
    </label>
  );
}

export default function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handler = () => onClose();
    el.addEventListener("close", handler);
    return () => el.removeEventListener("close", handler);
  }, [onClose]);

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
      setMsg("Thank you! We'll be in touch shortly.");
      form.reset();
      setTimeout(() => { onClose(); setStatus("idle"); setMsg(""); }, 2400);
    } catch {
      setStatus("error");
      setMsg("Sorry, something went wrong. Please try again.");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[9999] m-0 w-full h-full max-w-none max-h-none bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-[fade-in_0.3s_ease]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex items-end sm:items-center justify-center min-h-full p-4">
        <div className="relative w-full max-w-lg glass rounded-3xl p-[clamp(24px,4vw,40px)] animate-[sheet-up_0.4s_ease] text-white">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          <h2 className="font-display font-black text-[clamp(22px,3vw,30px)] uppercase tracking-tight text-white mb-2">
            Get a Quote
          </h2>
          <p className="text-sm text-white/60 mb-6">
            Fill in the details and we&apos;ll get back to you within 24 hours.
          </p>

          <form onSubmit={onSubmit} noValidate className="grid gap-3.5">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" name="first_name" autoComplete="given-name" required />
              <Field label="Last name" name="last_name" autoComplete="family-name" />
            </div>
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="Your message" name="message" textarea />
            <input type="checkbox" name="botcheck" className="absolute -left-[9999px] w-px h-px opacity-0" tabIndex={-1} aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-glow inline-flex items-center gap-3 h-13 px-7 rounded-full font-display font-bold text-xs tracking-[0.14em] uppercase cursor-pointer disabled:opacity-70 disabled:cursor-wait"
              >
                <span>Send</span>
                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
              </button>
              {msg && (
                <p className={`text-sm ${status === "success" ? "text-emerald-400" : status === "error" ? "text-red-400" : "text-white/60"}`}>
                  {msg}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
