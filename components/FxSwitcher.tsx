"use client";

export const EFFECTS = [
  { id: "cube", label: "Cube" },
  { id: "circuit", label: "Circuit" },
  { id: "comet", label: "Sun Comet" },
  { id: "universe", label: "Universe" },
] as const;

export type Effect = (typeof EFFECTS)[number]["id"];

export const isEffect = (v: string | null): v is Effect => EFFECTS.some((e) => e.id === v);

export default function FxSwitcher({ value, onChange }: { value: Effect; onChange: (e: Effect) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="Scroll effect"
      className="fixed left-1/2 -translate-x-1/2 bottom-4 z-[95] flex items-center gap-1 p-1.5 rounded-full bg-ink-2/90 border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]"
    >
      <span className="hidden md:block pl-3 pr-2 font-display font-semibold text-[10px] tracking-[0.2em] uppercase text-white/45">
        Scroll effect
      </span>
      {EFFECTS.map((e) => (
        <button
          key={e.id}
          role="radio"
          aria-checked={value === e.id}
          onClick={() => onChange(e.id)}
          className={`h-9 px-3 sm:px-4 rounded-full font-display font-semibold text-[12px] whitespace-nowrap transition-colors cursor-pointer ${
            value === e.id ? "bg-accent text-ink" : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          {e.label}
        </button>
      ))}
    </div>
  );
}
