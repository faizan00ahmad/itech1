/** Particle target shapes. Each returns n points as [x,y,z,...] roughly within a unit box. */

export type Shape = { pts: Float32Array; spin: number; tilt: number; scale: number };

const rnd = (a = -1, b = 1) => a + Math.random() * (b - a);

function shape(pts: Float32Array, opts: Partial<Omit<Shape, "pts">> = {}): Shape {
  return { pts, spin: 0, tilt: 0, scale: 1, ...opts };
}

/**
 * Rasterises a drawing and scatters n points over its opaque pixels.
 * With `edges`, outlines are kept and only a fraction of the solid interior, so filled shapes read as line art.
 */
function fromCanvas(
  n: number,
  draw: (ctx: CanvasRenderingContext2D, s: number) => void,
  { depth = 0.14, edges = false } = {},
) {
  const s = 240;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = ctx.strokeStyle = "#fff";
  ctx.lineCap = ctx.lineJoin = "round";
  draw(ctx, s);
  const data = ctx.getImageData(0, 0, s, s).data;
  const solid = (x: number, y: number) => x >= 0 && y >= 0 && x < s && y < s && data[(y * s + x) * 4 + 3] > 110;
  const pool: number[] = [];
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      if (!solid(x, y)) continue;
      const edge = !solid(x - 2, y) || !solid(x + 2, y) || !solid(x, y - 2) || !solid(x, y + 2);
      if (!edges || edge || Math.random() < 0.12) pool.push(x, y);
    }
  }
  const out = new Float32Array(n * 3);
  const count = pool.length / 2;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * count) * 2;
    out[i * 3] = ((pool[k] + Math.random()) / s) * 2 - 1;
    out[i * 3 + 1] = -(((pool[k + 1] + Math.random()) / s) * 2 - 1);
    out[i * 3 + 2] = rnd() * depth;
  }
  return out;
}

export function galaxy(n: number) {
  const out = new Float32Array(n * 3);
  const arms = 3;
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 0.7) * 1.15;
    const arm = (i % arms) * ((Math.PI * 2) / arms);
    const a = arm + r * 4.2 + rnd(-0.35, 0.35) * (1.2 - r);
    const spread = 0.12 * (1.25 - r);
    out[i * 3] = Math.cos(a) * r + rnd() * spread;
    out[i * 3 + 1] = rnd() * spread * 0.6;
    out[i * 3 + 2] = Math.sin(a) * r + rnd() * spread;
  }
  return shape(out, { spin: 0.12, tilt: 1.15, scale: 1.45 });
}

export function globe(n: number) {
  const out = new Float32Array(n * 3);
  const sphere = Math.floor(n * 0.72);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < sphere; i++) {
    const y = 1 - (i / (sphere - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = i * golden;
    out[i * 3] = Math.cos(a) * r * 0.78;
    out[i * 3 + 1] = y * 0.78;
    out[i * 3 + 2] = Math.sin(a) * r * 0.78;
  }
  for (let i = sphere; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = rnd(1.08, 1.32);
    out[i * 3] = Math.cos(a) * r;
    out[i * 3 + 1] = rnd() * 0.02;
    out[i * 3 + 2] = Math.sin(a) * r;
  }
  return shape(out, { spin: 0.35, tilt: 0.42, scale: 1.15 });
}

export function fromImage(n: number, img: HTMLImageElement) {
  return shape(
    fromCanvas(n, (ctx, s) => {
      const k = Math.min(s / img.width, s / img.height) * 0.92;
      const w = img.width * k;
      const h = img.height * k;
      ctx.drawImage(img, (s - w) / 2, (s - h) / 2, w, h);
    }, { edges: true }),
    { scale: 1.2 },
  );
}

export function codeBrackets(n: number) {
  return shape(
    fromCanvas(n, (ctx, s) => {
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.moveTo(78, 62); ctx.lineTo(24, 120); ctx.lineTo(78, 178);
      ctx.moveTo(162, 62); ctx.lineTo(216, 120); ctx.lineTo(162, 178);
      ctx.moveTo(138, 48); ctx.lineTo(102, 192);
      ctx.stroke();
      ctx.lineWidth = 2;
      for (let y = 36; y < s - 30; y += 22) {
        ctx.globalAlpha = 0.6;
        ctx.beginPath(); ctx.moveTo(4, y); ctx.lineTo(4 + 10 + ((y * 7) % 18), y); ctx.stroke();
      }
    }),
    { scale: 1.25 },
  );
}

export function gear(n: number) {
  return shape(
    fromCanvas(n, (ctx, s) => {
      const c = s / 2;
      const teeth = 10;
      ctx.beginPath();
      for (let i = 0; i < teeth * 2; i++) {
        const r = i % 2 ? 84 : 106;
        const a0 = (i / (teeth * 2)) * Math.PI * 2;
        const a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2;
        ctx.lineTo(c + Math.cos(a0 + 0.05) * r, c + Math.sin(a0 + 0.05) * r);
        ctx.lineTo(c + Math.cos(a1 - 0.05) * r, c + Math.sin(a1 - 0.05) * r);
      }
      ctx.closePath();
      ctx.moveTo(c + 40, c);
      ctx.arc(c, c, 40, 0, Math.PI * 2, true);
      ctx.fill("evenodd");
    }, { edges: true }),
    { scale: 1.1 },
  );
}

export function rocket(n: number) {
  return shape(
    fromCanvas(n, (ctx, s) => {
      ctx.translate(s / 2, s / 2);
      ctx.rotate(Math.PI / 4);
      ctx.translate(-s / 2, -s / 2);
      ctx.beginPath();
      ctx.moveTo(120, 16);
      ctx.bezierCurveTo(168, 52, 170, 120, 156, 168);
      ctx.lineTo(84, 168);
      ctx.bezierCurveTo(70, 120, 72, 52, 120, 16);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(86, 120); ctx.lineTo(52, 186); ctx.lineTo(90, 166); ctx.closePath();
      ctx.moveTo(154, 120); ctx.lineTo(188, 186); ctx.lineTo(150, 166); ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      ctx.moveTo(96, 176); ctx.quadraticCurveTo(120, 250, 144, 176); ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath(); ctx.arc(120, 88, 17, 0, Math.PI * 2); ctx.fill();
    }, { edges: true }),
    { scale: 1.2 },
  );
}

export function envelope(n: number) {
  return shape(
    fromCanvas(n, (ctx) => {
      ctx.lineWidth = 13;
      ctx.strokeRect(26, 58, 188, 128);
      ctx.beginPath();
      ctx.moveTo(30, 64); ctx.lineTo(120, 136); ctx.lineTo(210, 64);
      ctx.moveTo(30, 180); ctx.lineTo(96, 118);
      ctx.moveTo(210, 180); ctx.lineTo(144, 118);
      ctx.stroke();
    }),
    { scale: 1.15 },
  );
}

export function bigBang(n: number) {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const b = Math.acos(rnd());
    const r = rnd(4, 9);
    out[i * 3] = Math.sin(b) * Math.cos(a) * r;
    out[i * 3 + 1] = Math.sin(b) * Math.sin(a) * r;
    out[i * 3 + 2] = Math.cos(b) * r;
  }
  return out;
}
