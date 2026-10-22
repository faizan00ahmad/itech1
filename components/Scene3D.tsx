"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scene3D() {
  const layerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current!;
    const track = trackRef.current!;
    const trail = trailRef.current!;
    const ship = objectRef.current!;
    const cube = cubeRef.current!;

    let pathLength = 0;
    let ys: number[] = [];
    let lens: number[] = [];

    function lengthAtY(y: number) {
      if (!ys.length) return 0;
      if (y <= ys[0]) return 0;
      if (y >= ys[ys.length - 1]) return pathLength;
      let lo = 0, hi = ys.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (ys[mid] < y) lo = mid; else hi = mid;
      }
      const t = (y - ys[lo]) / (ys[hi] - ys[lo] || 1);
      return lens[lo] + t * (lens[hi] - lens[lo]);
    }

    function build() {
      const docW = document.documentElement.clientWidth;
      const docH = document.documentElement.scrollHeight;

      const padX = Math.max(80, docW * 0.08);
      const leftX = padX;
      const rightX = docW - padX;
      const centerX = docW / 2;

      const sections = document.querySelectorAll("[data-sea]");
      const points: { x: number; y: number }[] = [];

      points.push({ x: rightX, y: 0 });

      let side: "left" | "right" = "right";
      sections.forEach((sec, i) => {
        const box = sec.getBoundingClientRect();
        const top = box.top + window.scrollY;
        const bottom = box.bottom + window.scrollY;
        const midY = (top + bottom) / 2;

        const nextSide = side === "right" ? "left" : "right";
        const toX = nextSide === "left" ? leftX : rightX;

        if (i === 0) {
          points.push({ x: rightX, y: top + 80 });
          points.push({ x: centerX, y: midY });
          points.push({ x: leftX, y: bottom - 40 });
        } else {
          points.push({ x: side === "right" ? rightX : leftX, y: top + 60 });
          points.push({ x: centerX, y: midY });
          points.push({ x: toX, y: bottom - 40 });
        }

        side = nextSide;
      });

      points.push({ x: side === "right" ? rightX : leftX, y: Math.max(docH, points[points.length - 1].y + 200) });

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const dy = Math.abs(curr.y - prev.y);
        const cpOff = Math.min(dy * 0.4, 300);
        d += ` C ${prev.x} ${prev.y + cpOff} ${curr.x} ${curr.y - cpOff} ${curr.x} ${curr.y}`;
      }

      svg.setAttribute("width", String(docW));
      svg.setAttribute("height", String(docH));
      svg.setAttribute("viewBox", `0 0 ${docW} ${docH}`);
      track.setAttribute("d", d);
      trail.setAttribute("d", d);

      pathLength = track.getTotalLength();
      trail.style.strokeDasharray = `${pathLength} ${pathLength}`;

      ys = [];
      lens = [];
      for (let l = 0; l <= pathLength; l += 6) {
        const p = track.getPointAtLength(l);
        if (!ys.length || p.y > ys[ys.length - 1]) {
          ys.push(p.y);
          lens.push(l);
        }
      }
    }

    function render() {
      if (!pathLength || !track) return;
      const sy = window.scrollY;
      const ih = window.innerHeight;
      const max = document.documentElement.scrollHeight - ih;
      const progress = max > 0 ? Math.min(Math.max(sy / max, 0), 1) : 0;
      const at = lengthAtY(sy + ih * (0.3 + 0.4 * progress));
      const pt = track.getPointAtLength(at);

      const rotSpeed = progress * 1080;
      ship.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
      cube.style.transform = `rotateX(${rotSpeed * 0.7}deg) rotateY(${rotSpeed}deg) rotateZ(${rotSpeed * 0.3}deg)`;
      trail.style.strokeDashoffset = String(pathLength - at);

      const glow = cube.querySelector(".cube__glow") as HTMLElement;
      if (glow) {
        const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.002);
        glow.style.opacity = String(0.6 + pulse * 0.4);
      }
    }

    build();
    ScrollTrigger.addEventListener("refresh", build);
    gsap.ticker.add(render);

    const onResize = () => { build(); render(); };
    window.addEventListener("resize", onResize);

    return () => {
      ScrollTrigger.removeEventListener("refresh", build);
      gsap.ticker.remove(render);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={layerRef} className="scene-layer" aria-hidden="true">
      <svg ref={svgRef}>
        <defs>
          <linearGradient id="trail-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5B700" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#C9CED6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F5B700" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path ref={trackRef} className="scene-track" />
        <path ref={trailRef} className="scene-trail" />
      </svg>
      <div
        ref={objectRef}
        className="absolute left-0 top-0 w-0 h-0"
        style={{ transformOrigin: "0 0", willChange: "transform" }}
      >
        <div className="cube-wrap absolute -translate-x-1/2 -translate-y-1/2">
          <div ref={cubeRef} className="cube">
            <div className="cube__face cube__face--front" />
            <div className="cube__face cube__face--back" />
            <div className="cube__face cube__face--right" />
            <div className="cube__face cube__face--left" />
            <div className="cube__face cube__face--top" />
            <div className="cube__face cube__face--bottom" />
            <div className="cube__glow" />
          </div>
        </div>
      </div>
    </div>
  );
}
