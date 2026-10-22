"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  bigBang, codeBrackets, envelope, fromImage, galaxy, gear, globe, rocket, type Shape,
} from "@/lib/particleShapes";

const VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uScale / -mv.z;
    vColor = aColor;
    vAlpha = clamp(1.8 / aSize, 0.12, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform float uOpacity;
  uniform float uTint;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.5);
    gl_FragColor = vec4(vColor * uTint, a * vAlpha * uOpacity);
  }
`;

const PALETTE = ["#F5B700", "#FFD34D", "#FFE9A6", "#C9CED6", "#FFFFFF", "#E8A400"].map((c) => new THREE.Color(c));

function material(blending: THREE.Blending, tint: number) {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: { uScale: { value: 1 }, uOpacity: { value: 1 }, uTint: { value: tint } },
    transparent: true,
    depthWrite: false,
    blending,
  });
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function SceneUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let disposed = false;
    let cleanup = () => {};

    loadImage("/logo-mark.webp").then((logo) => {
      if (disposed) return;
      cleanup = start(canvas, logo);
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="scene-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="fixed inset-0 w-screen h-screen pointer-events-none" />
    </div>
  );
}

function start(canvas: HTMLCanvasElement, logo: HTMLImageElement) {
  const mobile = window.innerWidth < 768;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = mobile ? 3200 : 6500;
  const BOKEH = Math.floor(N * 0.022);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 6;

  /* Section order: hero, about, services, process, products, cta, contact, footer */
  const shapes: Shape[] = [
    galaxy(N), fromImage(N, logo), codeBrackets(N), gear(N), globe(N), rocket(N), envelope(N), galaxy(N),
  ];
  const origin = bigBang(N);

  const positions = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);
  const sizes = new Float32Array(N);
  const scatter = new Float32Array(N * 3);
  const seeds = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const c = PALETTE[Math.random() < 0.55 ? Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 3)];
    colors.set([c.r, c.g, c.b], i * 3);
    const bokeh = i < BOKEH;
    sizes[i] = bokeh ? 2.5 + Math.random() * 3 : 0.55 + Math.random() * Math.random() * 1.6;
    const a = Math.random() * Math.PI * 2;
    const b = Math.acos(Math.random() * 2 - 1);
    scatter.set([Math.sin(b) * Math.cos(a), Math.sin(b) * Math.sin(a), Math.cos(b)], i * 3);
    seeds[i] = Math.random() * 100;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const glowMat = material(THREE.AdditiveBlending, 1);
  const inkMat = material(THREE.NormalBlending, 0.62);
  const swarm = new THREE.Group();
  swarm.add(new THREE.Points(geo, glowMat), new THREE.Points(geo, inkMat));
  scene.add(swarm);

  const STARS = mobile ? 500 : 1100;
  const starPos = new Float32Array(STARS * 3);
  const starCol = new Float32Array(STARS * 3);
  const starSize = new Float32Array(STARS);
  const starGeo = new THREE.BufferGeometry();
  const starMat = material(THREE.AdditiveBlending, 1);
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  let centers: number[] = [];
  let light: boolean[] = [];
  let pixel = 1;
  let viewW = 1;

  function build() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    pixel = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixel);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const viewH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    viewW = viewH * camera.aspect;
    const scale = (h / viewH) * pixel;
    glowMat.uniforms.uScale.value = scale * 0.32;
    inkMat.uniforms.uScale.value = scale * 0.32;
    starMat.uniforms.uScale.value = scale * 0.32;

    const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-sea]"));
    centers = secs.map((s) => {
      const r = s.getBoundingClientRect();
      return r.top + window.scrollY + r.height / 2;
    });
    centers[0] = Math.min(centers[0], h / 2);
    light = secs.map((s) => {
      const m = getComputedStyle(s).backgroundColor.match(/\d+/g);
      if (!m) return false;
      const [r, g, b] = m.map(Number);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
    });

    const span = (document.documentElement.scrollHeight / h) * viewH * 0.35 + 8;
    for (let i = 0; i < STARS; i++) {
      starPos.set([(Math.random() - 0.5) * viewW * 2.4, 4 - Math.random() * span, -2 - Math.random() * 12], i * 3);
      const c = PALETTE[3 + Math.floor(Math.random() * 3)];
      starCol.set([c.r, c.g, c.b], i * 3);
      starSize[i] = 0.4 + Math.random() * 0.9;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("aColor", new THREE.BufferAttribute(starCol, 3));
    starGeo.setAttribute("aSize", new THREE.BufferAttribute(starSize, 1));
  }

  const anchor = (k: number) => {
    if (mobile) return { x: 0, y: 0.35 };
    const side = k % 2 === 0 ? 1 : -1;
    return { x: side * viewW * 0.3, y: 0 };
  };

  const mouse = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const born = performance.now();
  let lastY = window.scrollY;
  let energy = 0;
  let lightMix = 0;
  const rot = new Float32Array(4);

  function place(s: Shape, i: number, t: number, out: number[]) {
    const p = s.pts;
    let x = p[i * 3];
    let y = p[i * 3 + 1];
    let z = p[i * 3 + 2];
    if (s.spin) {
      const a = t * s.spin;
      const c = Math.cos(a), sn = Math.sin(a);
      const nx = x * c - z * sn;
      z = x * sn + z * c;
      x = nx;
    }
    if (s.tilt) {
      const c = Math.cos(s.tilt), sn = Math.sin(s.tilt);
      const ny = y * c - z * sn;
      z = y * sn + z * c;
      y = ny;
    }
    out[0] = x * s.scale;
    out[1] = y * s.scale;
    out[2] = z * s.scale;
  }

  const A = [0, 0, 0];
  const B = [0, 0, 0];

  function render() {
    if (!centers.length) return;
    const now = performance.now();
    const t = (now - born) / 1000;
    const sy = window.scrollY;
    const vc = sy + window.innerHeight / 2;

    let k = 0;
    while (k < centers.length - 1 && centers[k + 1] <= vc) k++;
    const next = Math.min(k + 1, centers.length - 1);
    const f = next === k ? 0 : clamp01((vc - centers[k]) / (centers[next] - centers[k]));
    const e = smooth(clamp01((f - 0.28) / 0.44));

    energy += (Math.min(Math.abs(sy - lastY), 80) - energy) * 0.08;
    lastY = sy;

    const intro = calm ? 1 : smooth(clamp01((t - 0.15) / 2.4));
    const burst = Math.sin(Math.PI * e) * (1.6 + energy * 0.02) + energy * 0.004;
    const sA = shapes[k];
    const sB = shapes[next];
    const size = mobile ? 0.62 : 1;

    for (let i = 0; i < N; i++) {
      const j = i * 3;
      const sd = seeds[i];
      if (i < BOKEH) {
        positions[j] = Math.sin(t * 0.05 + sd) * viewW * 0.45 - swarm.position.x;
        positions[j + 1] = Math.cos(t * 0.04 + sd * 1.7) * 2.6;
        positions[j + 2] = 1.5 + Math.sin(sd) * 2;
        continue;
      }
      place(sA, i, t, A);
      place(sB, i, t, B);
      const wob = 0.018 + energy * 0.0004;
      let x = (A[0] + (B[0] - A[0]) * e) * size + scatter[j] * burst + Math.sin(t * 1.3 + sd) * wob;
      let y = (A[1] + (B[1] - A[1]) * e) * size + scatter[j + 1] * burst + Math.cos(t * 1.1 + sd * 1.3) * wob;
      let z = (A[2] + (B[2] - A[2]) * e) * size + scatter[j + 2] * burst;
      if (intro < 1) {
        x = origin[j] + (x - origin[j]) * intro;
        y = origin[j + 1] + (y - origin[j + 1]) * intro;
        z = origin[j + 2] + (z - origin[j + 2]) * intro;
      }
      positions[j] = x;
      positions[j + 1] = y;
      positions[j + 2] = z;
    }
    geo.attributes.position.needsUpdate = true;

    const a0 = anchor(k);
    const a1 = anchor(next);
    swarm.position.x += (a0.x + (a1.x - a0.x) * e - swarm.position.x) * 0.12;
    swarm.position.y += (a0.y + (a1.y - a0.y) * e - swarm.position.y) * 0.12;
    rot[0] += (mouse.x * 0.5 + Math.sin(t * 0.3) * 0.12 - rot[0]) * 0.05;
    rot[1] += (mouse.y * 0.3 - rot[1]) * 0.05;
    swarm.rotation.y = rot[0];
    swarm.rotation.x = rot[1];

    const isLight = e < 0.5 ? light[k] : light[next];
    lightMix += ((isLight ? 1 : 0) - lightMix) * 0.08;
    glowMat.uniforms.uOpacity.value = (1 - lightMix) * 0.85;
    inkMat.uniforms.uOpacity.value = lightMix * 0.95;
    starMat.uniforms.uOpacity.value = (1 - lightMix) * 0.75;
    stars.position.y = (sy / window.innerHeight) * 1.6;
    stars.rotation.z = t * 0.004;

    renderer.render(scene, camera);
  }

  build();
  ScrollTrigger.addEventListener("refresh", build);
  window.addEventListener("resize", build);
  gsap.ticker.add(render);

  return () => {
    gsap.ticker.remove(render);
    ScrollTrigger.removeEventListener("refresh", build);
    window.removeEventListener("resize", build);
    window.removeEventListener("pointermove", onMove);
    geo.dispose();
    starGeo.dispose();
    glowMat.dispose();
    inkMat.dispose();
    starMat.dispose();
    renderer.dispose();
  };
}
