"use client";

import { useEffect, useRef } from "react";
import { docSize, makeSampler, makeVelocity, runScene, scrollTarget, sizeSvg } from "@/lib/scrollPath";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hot: boolean };

const MAX_SPARKS = 420;

function sprite(inner: string, outer: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.35, outer);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

const RAYS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const w = 0.1;
  const r0 = 25;
  const r1 = i % 2 ? 40 : 50;
  const p = (ang: number, r: number) => `${(Math.cos(ang) * r).toFixed(2)},${(Math.sin(ang) * r).toFixed(2)}`;
  return `${p(a - w, r0)} ${p(a, r1)} ${p(a + w, r0)}`;
});

export default function SceneComet() {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const objRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<SVGGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const svg = svgRef.current!;
    const track = trackRef.current!;
    const trail = trailRef.current!;
    const obj = objRef.current!;
    const rays = raysRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const sampler = makeSampler(track);
    const velocity = makeVelocity();
    const gold = sprite("rgba(255,214,90,1)", "rgba(245,183,0,0.55)");
    const white = sprite("rgba(255,255,255,1)", "rgba(255,236,170,0.6)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sparks: Spark[] = [];
    let prev: { x: number; y: number } | null = null;
    let spin = 0;
    let dpr = 1;

    function build() {
      sizeSvg(svg);
      const { w, h } = docSize();
      const pad = Math.max(70, w * 0.09);
      const amp = w / 2 - pad;
      const wave = Math.max(1100, window.innerHeight * 1.5);
      let d = "";
      for (let y = 0; y <= h; y += 12) {
        const x = w / 2 + amp * Math.sin((y / wave) * Math.PI * 2 + Math.PI / 2);
        d += `${y ? "L" : "M"} ${x.toFixed(1)} ${y} `;
      }
      track.setAttribute("d", d);
      trail.setAttribute("d", d);
      sampler.rebuild();
      const total = sampler.total();
      trail.style.strokeDasharray = `${total} ${total}`;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      prev = null;
    }

    function emit(x: number, y: number, dx: number, dy: number) {
      if (sparks.length >= MAX_SPARKS) sparks.splice(0, sparks.length - MAX_SPARKS + 1);
      const max = 40 + Math.random() * 50;
      sparks.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        vx: -dx * 0.12 + (Math.random() - 0.5) * 1.1,
        vy: -dy * 0.12 + (Math.random() - 0.5) * 1.1,
        life: max,
        max,
        size: 8 + Math.random() * 22,
        hot: Math.random() < 0.3,
      });
    }

    function render() {
      const total = sampler.total();
      if (!total) return;
      const { y } = scrollTarget();
      const at = sampler.lengthAtY(y);
      const pt = track.getPointAtLength(at);
      const v = velocity();

      obj.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
      spin += 0.35 + Math.abs(v) * 0.35;
      rays.setAttribute("transform", `rotate(${spin.toFixed(1)})`);
      trail.style.strokeDashoffset = String(total - at);

      if (!calm) {
        const from = prev ?? pt;
        const dx = pt.x - from.x;
        const dy = pt.y - from.y;
        const n = Math.min(14, 1 + Math.round(Math.hypot(dx, dy) * 0.5));
        for (let k = 1; k <= n; k++) emit(from.x + (dx * k) / n, from.y + (dy * k) / n, dx, dy);
      }
      prev = { x: pt.x, y: pt.y };

      const sy = window.scrollY;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.97;
        s.vy *= 0.97;
        s.life -= 1;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        const t = s.life / s.max;
        const size = s.size * (0.35 + t * 0.65);
        ctx.globalAlpha = t * 0.8;
        ctx.drawImage(s.hot ? white : gold, s.x - size / 2, s.y - sy - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    }

    return runScene(build, render);
  }, []);

  return (
    <div className="scene-layer" aria-hidden="true">
      <svg ref={svgRef}>
        <path ref={trackRef} className="fx-comet-track" />
        <path ref={trailRef} className="fx-comet-trail" />
      </svg>
      <canvas ref={canvasRef} className="fixed inset-0 w-screen h-screen pointer-events-none" />
      <div ref={objRef} className="absolute left-0 top-0 w-0 h-0" style={{ willChange: "transform" }}>
        <div className="fx-sun">
          <div className="fx-sun__halo" />
          <svg viewBox="-60 -60 120 120" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <radialGradient id="fx-ray" cx="0" cy="0" r="50" gradientUnits="userSpaceOnUse">
                <stop offset="0.45" stopColor="#FFE58A" />
                <stop offset="1" stopColor="#F5B700" />
              </radialGradient>
            </defs>
            <g ref={raysRef}>
              {RAYS.map((pts, i) => (
                <polygon key={i} points={pts} fill="url(#fx-ray)" />
              ))}
            </g>
          </svg>
          <div className="fx-sun__core" />
        </div>
      </div>
    </div>
  );
}
