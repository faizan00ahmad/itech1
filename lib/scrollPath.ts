import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Pt = { x: number; y: number };

export function docSize() {
  return {
    w: document.documentElement.clientWidth,
    h: document.documentElement.scrollHeight,
  };
}

export function sizeSvg(svg: SVGSVGElement) {
  const { w, h } = docSize();
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
}

/** Left → centre → right zigzag through every [data-sea] section. */
export function zigzagPoints(): Pt[] {
  const { w, h } = docSize();
  const pad = Math.max(80, w * 0.08);
  const left = pad;
  const right = w - pad;
  const points: Pt[] = [{ x: right, y: 0 }];
  let side: "left" | "right" = "right";

  document.querySelectorAll("[data-sea]").forEach((sec) => {
    const box = sec.getBoundingClientRect();
    const top = box.top + window.scrollY;
    const bottom = box.bottom + window.scrollY;
    const from = side === "right" ? right : left;
    side = side === "right" ? "left" : "right";
    const to = side === "right" ? right : left;
    points.push({ x: from, y: top + 70 }, { x: w / 2, y: (top + bottom) / 2 }, { x: to, y: bottom - 40 });
  });

  points.push({ x: side === "right" ? right : left, y: Math.max(h, points[points.length - 1].y + 200) });
  return points;
}

export function curveD(points: Pt[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1];
    const q = points[i];
    const c = Math.min(Math.abs(q.y - p.y) * 0.4, 300);
    d += ` C ${p.x} ${p.y + c} ${q.x} ${q.y - c} ${q.x} ${q.y}`;
  }
  return d;
}

/** Maps a document Y position to a length along a path whose y only increases. */
export function makeSampler(path: SVGPathElement) {
  let total = 0;
  let ys: number[] = [];
  let lens: number[] = [];

  return {
    total: () => total,
    rebuild() {
      total = path.getTotalLength();
      ys = [];
      lens = [];
      for (let l = 0; l <= total; l += 6) {
        const p = path.getPointAtLength(l);
        if (!ys.length || p.y > ys[ys.length - 1]) {
          ys.push(p.y);
          lens.push(l);
        }
      }
    },
    lengthAtY(y: number) {
      if (!ys.length || y <= ys[0]) return 0;
      if (y >= ys[ys.length - 1]) return total;
      let lo = 0;
      let hi = ys.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (ys[mid] < y) lo = mid;
        else hi = mid;
      }
      const t = (y - ys[lo]) / (ys[hi] - ys[lo] || 1);
      return lens[lo] + t * (lens[hi] - lens[lo]);
    },
  };
}

/** The document Y the travelling object should sit at: drifts from 30% to 70% of the viewport. */
export function scrollTarget() {
  const sy = window.scrollY;
  const ih = window.innerHeight;
  const max = document.documentElement.scrollHeight - ih;
  const progress = max > 0 ? Math.min(Math.max(sy / max, 0), 1) : 0;
  return { progress, y: sy + ih * (0.3 + 0.4 * progress) };
}

export function makeVelocity() {
  let last = window.scrollY;
  let v = 0;
  return () => {
    const y = window.scrollY;
    v += (y - last - v) * 0.15;
    last = y;
    return v;
  };
}

export function runScene(build: () => void, render: () => void) {
  build();
  ScrollTrigger.addEventListener("refresh", build);
  gsap.ticker.add(render);
  const onResize = () => build();
  window.addEventListener("resize", onResize);
  return () => {
    ScrollTrigger.removeEventListener("refresh", build);
    gsap.ticker.remove(render);
    window.removeEventListener("resize", onResize);
  };
}
