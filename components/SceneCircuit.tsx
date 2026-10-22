"use client";

import { useEffect, useRef } from "react";
import { makeSampler, makeVelocity, runScene, scrollTarget, sizeSvg, zigzagPoints, type Pt } from "@/lib/scrollPath";

const SVG_NS = "http://www.w3.org/2000/svg";

/** Vertical runs joined by straight angled traces, like copper on a circuit board. */
function circuitRoute(points: Pt[]) {
  const corners: Pt[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1];
    const q = points[i];
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    if (Math.abs(dx) < 1 || dy < 24) {
      corners.push(q);
      continue;
    }
    const run = Math.min(dy - 16, Math.max(Math.abs(dx), dy * 0.45));
    const y0 = p.y + (dy - run) / 2;
    corners.push({ x: p.x, y: y0 }, { x: q.x, y: y0 + run }, q);
  }
  const d = corners.map((c, i) => `${i ? "L" : "M"} ${c.x} ${c.y}`).join(" ");
  return { d, corners };
}

export default function SceneCircuit() {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const busRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const objRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current!;
    const track = trackRef.current!;
    const bus = busRef.current!;
    const trail = trailRef.current!;
    const nodesG = nodesRef.current!;
    const obj = objRef.current!;
    const chip = chipRef.current!;
    const sampler = makeSampler(track);
    const velocity = makeVelocity();
    let nodes: { el: SVGGElement; at: number; on: boolean }[] = [];

    function build() {
      sizeSvg(svg);
      const w = document.documentElement.clientWidth;
      const { d, corners } = circuitRoute(zigzagPoints());
      track.setAttribute("d", d);
      bus.setAttribute("d", d);
      trail.setAttribute("d", d);
      sampler.rebuild();
      const total = sampler.total();
      trail.style.strokeDasharray = `${total} ${total}`;

      nodesG.replaceChildren();
      nodes = corners.slice(1, -1).map((c, i) => {
        const g = document.createElementNS(SVG_NS, "g");
        g.setAttribute("class", "fx-node");
        const out = c.x < w / 2 ? -1 : 1;
        const len = 34 + (i % 3) * 22;
        const up = i % 2 ? -1 : 1;
        const sx = c.x + out * len;
        g.innerHTML =
          `<path class="fx-node__stub" d="M ${c.x} ${c.y} L ${sx} ${c.y} L ${sx + out * 16} ${c.y + up * 16}"/>` +
          `<circle class="fx-node__pad" cx="${sx + out * 16}" cy="${c.y + up * 16}" r="3.5"/>` +
          `<circle class="fx-node__pulse" cx="${c.x}" cy="${c.y}" r="7"/>` +
          `<circle class="fx-node__ring" cx="${c.x}" cy="${c.y}" r="7"/>` +
          `<circle class="fx-node__core" cx="${c.x}" cy="${c.y}" r="3"/>`;
        nodesG.appendChild(g);
        return { el: g, at: sampler.lengthAtY(c.y), on: false };
      });
    }

    function render() {
      const total = sampler.total();
      if (!total) return;
      const { progress, y } = scrollTarget();
      const at = sampler.lengthAtY(y);
      const pt = track.getPointAtLength(at);
      const v = velocity();

      obj.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
      const tilt = Math.max(-35, Math.min(35, v * 1.2));
      chip.style.transform = `rotateX(${22 + tilt * 0.4}deg) rotateY(${progress * 720 + tilt}deg)`;
      trail.style.strokeDashoffset = String(total - at);

      for (const n of nodes) {
        const on = at >= n.at - 2;
        if (on !== n.on) {
          n.on = on;
          n.el.classList.toggle("is-on", on);
        }
      }
    }

    return runScene(build, render);
  }, []);

  return (
    <div className="scene-layer" aria-hidden="true">
      <svg ref={svgRef}>
        <path ref={busRef} className="fx-circuit-bus" />
        <path ref={trackRef} className="fx-circuit-track" />
        <path ref={trailRef} className="fx-circuit-trail" />
        <g ref={nodesRef} />
      </svg>
      <div ref={objRef} className="absolute left-0 top-0 w-0 h-0" style={{ willChange: "transform" }}>
        <div className="fx-chip-wrap">
          <div className="fx-chip-glow" />
          <div ref={chipRef} className="fx-chip">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                style={{
                  transform: `translateZ(${-i * 1.5}px)`,
                  filter: i ? `brightness(${0.62 - i * 0.05}) sepia(0.6) saturate(1.4)` : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
