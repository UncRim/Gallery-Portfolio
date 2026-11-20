// The Docs Quarter: one ink-on-paper street where each building is a kind of writing.
// Built on JDhruv14/line-art-animation (lib/ink, gait, motion, daynight).
import { el, pen, shape, blot, paint, limb, shoe, place, inkDefs, run, f, pt, toScene, PEN, PAPER } from './lib/ink.ts';
import { gait } from './lib/gait.ts';
import { spring, pendulum, pointerWind, ease, clamp, lerp, smooth, seeded, wobble } from './lib/motion.ts';
import { palette, applyPalette, nightTint, mix, toRGB, rgb } from './lib/daynight.ts';

const W = 960, H = 440, BASE = 344, SP = 0.8, FS = 0.5, KERB = 386;
const LANES = [358, 365, 372];
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(a: T[]) => a[(Math.random() * a.length) | 0];
const sr = seeded(23);
const WARM = toRGB('#ffd08a'), DARKWARM = toRGB('#3a2a1a'), ACC = toRGB('#1a6b4a');
const oval = (cx: number, cy: number, rx: number, ry: number) => `M${f(cx - rx)} ${f(cy)} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;

const mount = document.getElementById('quarter')!;
const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'xMidYMid slice', role: 'img', 'aria-label': 'Line-art Docs Quarter: API Reference, Style Guide, Release Notes, and Microcopy.' }) as SVGSVGElement;
const { defs, filter } = inkDefs(svg, 'dq');
mount.appendChild(svg);
// Camera: on desktop the whole 960-wide street fits. On narrow screens the viewBox is
// narrower than the street and pans to follow the visitor, so all four buildings get visited.
const YOU = '#e2552d';
let camX = 0, vw = W, tagK = 1, fitted = false;
function fit() {
  const r = svg.getBoundingClientRect(); if (!r.width || !r.height) return;
  vw = Math.min(W, (H * r.width) / r.height); if (vw > W - 2) vw = W;
  camX = clamp(fitted ? camX : (W - vw) / 2, 0, W - vw); fitted = true;
  tagK = clamp(9.5 / (7.5 * (r.width / vw)), 1, 1.8);
  applyCam();
}
function applyCam() {
  svg.setAttribute('viewBox', `${f(camX)} 0 ${f(vw)} ${H}`);
  uiG.setAttribute('transform', `translate(${f(camX)} 0)`);
  hint.setAttribute('x', f(vw / 2)); tourTxt.setAttribute('x', f(vw - 18));
}

const skyGrad = el('linearGradient', { id: 'dq-sky', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
const sTop = el('stop', { offset: '0' }, skyGrad), sBot = el('stop', { offset: '1' }, skyGrad);
const glowGrad = el('radialGradient', { id: 'dq-glow' }, defs);
el('stop', { offset: '0', 'stop-color': '#ffd58a', 'stop-opacity': 0.95 }, glowGrad);
el('stop', { offset: '0.45', 'stop-color': '#ffb85c', 'stop-opacity': 0.34 }, glowGrad);
el('stop', { offset: '1', 'stop-color': '#ff9f45', 'stop-opacity': 0 }, glowGrad);

const skyG = el('g', {}, svg);
el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#dq-sky)' }, skyG);
const sceneG = el('g', { filter }, svg);
const backG = el('g', {}, sceneG), bldgG = el('g', {}, sceneG), streetG = el('g', {}, sceneG), walkG = el('g', {}, sceneG), foreG = el('g', {}, sceneG);
const partG = el('g', { 'pointer-events': 'none' }, svg);
const glowG = el('g', { style: 'mix-blend-mode:screen;pointer-events:none' }, svg);
const uiG = el('g', { 'pointer-events': 'none' }, svg);
const hitG = el('g', {}, svg);

const P0 = (p: Element, d: string, w = SP) => { const n = pen(p, w); n.setAttribute('d', d); return n; };
const S0 = (p: Element, d: string, w = SP) => { const n = shape(p, w); n.setAttribute('d', d); return n; };
const tintable = (n: SVGPathElement) => { n.classList.remove('pp'); return n; };
const txt = (p: Element, x: number, y: number, s: string, size: number, spacing = 1) => {
  const t = el('text', { x, y, 'text-anchor': 'middle', 'font-size': size, 'letter-spacing': spacing, 'font-family': "'IBM Plex Mono', ui-monospace, monospace", 'font-weight': 500, fill: 'currentColor', stroke: 'none' }, p);
  t.textContent = s; return t;
};

// ---------------------------------------------------------------- sky
const stars = Array.from({ length: 46 }, () => { const c = el('circle', { cx: sr(8, 952), cy: sr(8, 200), r: sr(0.5, 1.1), fill: 'currentColor' }, backG); return { c, k: sr(0.8, 2.4), ph: sr(0, 6) }; });
const sun = el('g', {}, backG);
S0(sun, oval(0, 0, 15, 15), SP);
P0(sun, Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return `M${f(Math.cos(a) * 20)} ${f(Math.sin(a) * 20)} L${f(Math.cos(a) * 25)} ${f(Math.sin(a) * 25)}`; }).join(' '), SP * 0.7);
const moon = el('g', {}, backG);
blot(moon).setAttribute('d', 'M-2 -14 A14 14 0 1 0 -2 14 A10.5 10.5 0 1 1 -2 -14Z');
P0(backG, 'M0 318 Q80 286 170 308 T330 298 T520 312 T700 294 T860 310 T960 298', SP * 0.6).setAttribute('stroke-opacity', '0.32');
P0(backG, 'M0 330 Q120 306 230 324 T430 318 T640 326 T820 316 T960 326', SP * 0.6).setAttribute('stroke-opacity', '0.22');
const clouds = [0, 1].map((i) => { const g = el('g', {}, backG); const c = S0(g, 'M0 8 q-6 -6 2 -10 q2 -9 13 -5 q8 -8 17 0 q11 -3 12 6 q8 2 3 9 Z', SP * 0.8); c.setAttribute('stroke-opacity', '0.5'); return { g, x: i ? 620 : 210, y: i ? 70 : 104, s: i ? 1.1 : 1.5, v: i ? 3.2 : 2.2, c }; });

// wire with birds
const WA = [15, 141], WC = [480, 176], WB = [947, 145];
const wireAt = (u: number): [number, number] => [(1 - u) ** 2 * WA[0] + 2 * u * (1 - u) * WC[0] + u * u * WB[0], (1 - u) ** 2 * WA[1] + 2 * u * (1 - u) * WC[1] + u * u * WB[1]];
P0(backG, `M${WA[0]} ${WA[1]} Q${WC[0]} ${WC[1]} ${WB[0]} ${WB[1]}`, SP * 0.5);
P0(backG, 'M14 372 L15 130 M5 139 L25 139', SP * 1.1); P0(backG, 'M948 372 L947 134 M938 143 L958 143', SP * 1.1);

// ---------------------------------------------------------------- house kit
const wall = (p: Element, x0: number, x1: number, yE: number, yB = BASE) =>
  S0(p, `M${x0} ${yB} L${x0 + 0.6} ${yE} Q${(x0 + x1) / 2} ${yE - 1.6} ${x1 - 0.6} ${yE} L${x1} ${yB} Q${(x0 + x1) / 2} ${yB + 1.4} ${x0} ${yB} Z`);
function roof(p: Element, x0: number, x1: number, yE: number, yR: number, o: number, inset: number, n: number) {
  const a = x0 - o, b = x1 + o;
  S0(p, `M${a} ${yE - 4} Q${a + 9} ${yE + 1} ${x0 + 6} ${yE + 1.5} L${x1 - 6} ${yE + 1.5} Q${b - 9} ${yE + 1} ${b} ${yE - 4} L${x1 - inset} ${yR} Q${(x0 + x1) / 2} ${yR - 2.5} ${x0 + inset} ${yR} Z`);
  let d = ''; for (let k = 0; k <= n; k++) { const u = k / n; d += `M${f(lerp(a + 5, b - 5, u))} ${yE - 1} L${f(lerp(x0 + inset + 2, x1 - inset - 2, u))} ${yR + 2}`; }
  P0(p, d, SP * 0.45);
  let e = ''; const m = Math.round((b - a) / 6); for (let k = 0; k < m; k++) e += `M${f(a + 3 + k * ((b - a - 6) / (m - 1)) - 2.6)} ${f(yE + 1.6)} a2.6 2.6 0 0 0 5.2 0`;
  P0(p, e, SP * 0.5);
  P0(p, `M${x0 + inset - 3} ${yR - 1.5} Q${(x0 + x1) / 2} ${yR - 4.5} ${x1 - inset + 3} ${yR - 1.5}`, SP * 1.1);
}
function slats(p: Element, x0: number, x1: number, y0: number, y1: number, gap = 3.4) {
  let d = '', i = 0; for (let x = x0; x <= x1; x += gap, i++) d += `M${f(x)} ${i % 4 === 0 ? y0 : y0 + 4} L${f(x)} ${y1}`;
  P0(p, d, SP * 0.45);
}
const rectP = (x: number, y: number, w: number, h: number) => `M${x} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x} ${y + h}Z`;
const archP = (x: number, y: number, w: number, h: number) => `M${x} ${y + h} L${x} ${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} L${x + w} ${y + h}Z`;

type Win = { pane: SVGPathElement; cx: number; cy: number; r: number; th: number; glow: SVGElement; b: number };
const wins: Win[] = []; const winInk: SVGElement[] = [];
function windowAt(p: Element, b: number, x: number, y: number, w: number, h: number, th: number, cols = 2, rows = 2, arch = false, r = 44) {
  const pane = tintable(S0(p, arch ? archP(x, y, w, h) : rectP(x, y, w, h)));
  let d = ''; for (let c = 1; c < cols; c++) d += `M${f(x + (w * c) / cols)} ${y + (arch ? w / 2 : 0)} L${f(x + (w * c) / cols)} ${y + h}`;
  for (let k = 1; k < rows; k++) d += `M${x} ${f(y + (h * k) / rows)} L${x + w} ${f(y + (h * k) / rows)}`;
  if (d) winInk.push(P0(p, d, SP * 0.55));
  P0(p, `M${x - 3} ${y + h + 1.5} L${x + w + 3} ${y + h + 1.5}`, SP);
  const glow = el('circle', { cx: x + w / 2, cy: y + h / 2, r, fill: 'url(#dq-glow)', opacity: 0 }, glowG);
  wins.push({ pane, cx: x + w / 2, cy: y + h / 2, r, th, glow, b });
}

// ---------------------------------------------------------------- buildings
type Bld = { id: string; x0: number; x1: number; y0: number; sign: SVGPathElement; signTxt: SVGElement; amt: number; hover: boolean; flash: number };
const blds: Record<string, Bld> = {};
function sign(id: string, p: Element, x: number, y: number, w: number, h: number, label: string, size: number, spacing: number, b: Partial<Bld>) {
  const band = tintable(S0(p, rectP(x, y, w, h), SP * 0.9));
  const t = txt(p, x + w / 2, y + h / 2 + size * 0.36, label, size, spacing);
  blds[id] = { id, x0: b.x0!, x1: b.x1!, y0: b.y0!, sign: band, signTxt: t, amt: 0, hover: false, flash: 0 };
}

// B1 API Reference
let writerUpdate: (t: number, lit: number) => void = () => {};
{
  const x0 = 44, x1 = 222, yE = 214;
  P0(bldgG, ''); // keep order stable
  S0(bldgG, rectP(176, 146, 16, 48)); P0(bldgG, 'M174 146 L194 146', SP * 1.2);
  wall(bldgG, x0, x1, yE); roof(bldgG, x0, x1, yE, 166, 16, 26, 14);
  windowAt(bldgG, 0, 74, 232, 30, 34, 0.42, 2, 2, false, 56);
  windowAt(bldgG, 0, 150, 232, 30, 34, 0.55, 2, 2, false, 50);
  sign('api', bldgG, 66, 270, 136, 14, 'API REFERENCE', 7.2, 1.3, { x0, x1, y0: 150 });
  windowAt(bldgG, 0, 58, 294, 28, 28, 0.34, 2, 2, false, 40); windowAt(bldgG, 0, 180, 294, 28, 28, 0.62, 2, 2, false, 40);
  slats(bldgG, 92, 111, 290, BASE - 1);
  S0(bldgG, rectP(116, 292, 34, 52)); winInk.push(P0(bldgG, 'M122 298 L144 298 L144 318 L122 318Z M122 324 L144 324 L144 338 L122 338Z', SP * 0.5));
  blot(bldgG).setAttribute('d', oval(145, 321, 1.2, 1.2)); P0(bldgG, `M112 ${BASE + 3} L154 ${BASE + 3} M108 ${BASE + 7} L158 ${BASE + 7}`, SP * 0.8);
  // the writer at the upper-left window
  const wr = el('g', {}, bldgG);
  const head = el('ellipse', { cx: 88, cy: 246, rx: 3.3, ry: 4.1, fill: 'none', stroke: 'currentColor', 'stroke-width': SP * 0.8 }, wr);
  const bun = el('circle', { cx: 84.4, cy: 242.6, r: 2, fill: 'none', stroke: 'currentColor', 'stroke-width': SP * 0.7 }, wr);
  const shoulders = pen(wr, SP * 0.8), arm = pen(wr, SP * 0.8), deskLine = P0(wr, 'M76 258 L104 258', SP * 0.9);
  const lampArm = P0(wr, 'M98 258 L98 250 L102 246 M99 246 L106 246', SP * 0.7);
  winInk.push(head, bun, shoulders, arm, deskLine, lampArm);
  writerUpdate = (t) => {
    const nod = wobble(t * 0.8) * 0.6, type = Math.sin(t * 9) * 0.6 + Math.sin(t * 3.7) * 0.5;
    head.setAttribute('cy', f(246 + nod)); head.setAttribute('cx', f(88 + nod * 0.3)); bun.setAttribute('cy', f(242.6 + nod)); bun.setAttribute('cx', f(84.4 + nod * 0.3));
    shoulders.setAttribute('d', `M78 264 Q80 252 ${f(88 + nod * 0.3)} 251 Q96 252 98 264`);
    arm.setAttribute('d', `M94 256 Q98 258 ${f(100 + type)} ${f(257.4)}`);
  };
}
// B2 Style Guide
{
  const x0 = 250, x1 = 476, yE = 238;
  wall(bldgG, x0, x1, yE); roof(bldgG, x0, x1, yE, 206, 18, 40, 20);
  P0(bldgG, `M262 ${yE + 2} L262 ${BASE} M464 ${yE + 2} L464 ${BASE}`, SP * 0.6);
  windowAt(bldgG, 1, 272, 254, 26, 64, 0.4, 1, 3, true, 52); windowAt(bldgG, 1, 428, 254, 26, 64, 0.62, 1, 3, true, 52);
  sign('style', bldgG, 322, 246, 82, 14, 'STYLE GUIDE', 7.2, 1.3, { x0, x1, y0: 190 });
  windowAt(bldgG, 1, 346, 270, 34, 74, 0.5, 1, 4, true, 46);
  P0(bldgG, `M338 ${BASE + 3} L388 ${BASE + 3} M334 ${BASE + 7} L392 ${BASE + 7} M330 ${BASE + 11} L396 ${BASE + 11}`, SP * 0.8);
  slats(bldgG, 306, 338, 276, BASE - 1, 3.6); slats(bldgG, 388, 420, 276, BASE - 1, 3.6);
}
// B3 Release Notes
const sheets: { g: SVGGElement; x: number; y: number; pend: any; k: number }[] = [];
{
  const x0 = 496, x1 = 588, yE = 268;
  wall(bldgG, x0, x1, yE); roof(bldgG, x0, x1, yE, 250, 10, 14, 10);
  sign('release', bldgG, 510, 272, 68, 12, 'RELEASE NOTES', 6.1, 0.8, { x0, x1, y0: 238 });
  S0(bldgG, rectP(506, 290, 76, 46), SP * 1.1); P0(bldgG, 'M510 294 L578 294 L578 332 L510 332Z', SP * 0.4);
  P0(bldgG, `M502 ${BASE - 8} L586 ${BASE - 8}`, SP * 0.5);
  const spots: [number, number][] = [[520, 297], [535, 297], [550, 297], [565, 297], [527, 316], [543, 316], [559, 316]];
  spots.forEach(([x, y], k) => {
    const g = el('g', {}, bldgG); S0(g, `M-4.5 0 L4.5 0 L4.5 11 L-4.5 11Z`, SP * 0.6); P0(g, 'M-2.6 3.4 L2.6 3.4 M-2.6 6 L2.6 6 M-2.6 8.4 L1 8.4', SP * 0.35);
    blot(g).setAttribute('d', oval(0, 0.4, 0.9, 0.9)); sheets.push({ g, x, y, pend: pendulum(9 + k * 0.4, 0.8), k });
  });
}
// B4 Microcopy
let awning: SVGGElement, awningPanels: SVGPathElement[] = [];
{
  const x0 = 626, x1 = 802, yE = 246;
  wall(bldgG, x0, x1, yE); roof(bldgG, x0, x1, yE, 218, 14, 24, 14);
  sign('micro', bldgG, 676, 251, 76, 13, 'MICROCOPY', 7.2, 1.6, { x0, x1, y0: 204 });
  windowAt(bldgG, 3, 650, 284, 76, 42, 0.5, 3, 1, false, 54);
  // little paper tags in the shop window
  P0(bldgG, 'M658 316 L670 316 M658 311 L666 311 M690 316 L704 316 M690 311 L699 311 M712 316 L720 316', SP * 0.5);
  S0(bldgG, rectP(746, 290, 34, 54)); windowAt(bldgG, 3, 752, 297, 22, 26, 0.58, 1, 2, false, 30);
  P0(bldgG, `M742 ${BASE + 3} L784 ${BASE + 3}`, SP * 0.8);
  blot(bldgG).setAttribute('d', oval(775, 322, 1.2, 1.2));
  awning = el('g', {}, bldgG);
  for (let k = 0; k < 8; k++) { const a = 642 + k * 11.5; const pn = paint(awning, k % 2 ? '#fdfcf8' : '#1a6b4a', SP * 0.7); pn.setAttribute('d', `M${f(a + 1.2)} 266 L${f(a + 10.3)} 266 L${f(a + 11.5)} 280 Q${f(a + 5.75)} 284 ${f(a)} 280Z`); pn.dataset.k = String(k); awningPanels.push(pn); }
  P0(awning, 'M642 266 L734 266', SP * 1.2);
}
// pots by the shop
[[638, 'a'], [736, 'b']].forEach(([x]) => { const px = x as number; S0(streetG, `M${px - 4.5} ${BASE - 8} L${px + 4.5} ${BASE - 8} L${px + 3.4} ${BASE} L${px - 3.4} ${BASE}Z`, SP * 0.8); P0(streetG, `M${px} ${BASE - 8} Q${px - 5} ${BASE - 16} ${px - 7} ${BASE - 20} M${px} ${BASE - 8} Q${px + 1} ${BASE - 18} ${px + 2} ${BASE - 24} M${px} ${BASE - 8} Q${px + 6} ${BASE - 14} ${px + 8} ${BASE - 19}`, SP * 0.6); });

// street + foreground
S0(streetG, `M0 ${BASE} L${W} ${BASE} L${W} ${KERB} L0 ${KERB}Z`, SP * 0.01).setAttribute('stroke', 'none');
P0(streetG, `M0 ${BASE} L${W} ${BASE}`, SP * 1.15); P0(streetG, `M0 ${KERB} L${W} ${KERB}`, SP * 1.15);
P0(streetG, Array.from({ length: 30 }, (_, i) => `M${f(i * 33 + sr(0, 14))} ${BASE} l0 5`).join(' '), SP * 0.4);
P0(streetG, Array.from({ length: 22 }, () => { const x = sr(10, 950), y = sr(BASE + 14, KERB - 6); return `M${f(x)} ${f(y)} l${f(sr(3, 9))} ${f(sr(-0.6, 0.6))}`; }).join(' '), SP * 0.35);
S0(foreG, `M0 ${KERB} L${W} ${KERB} L${W} ${H} L0 ${H}Z`, SP * 0.01).setAttribute('stroke', 'none');
{
  let d = `M0 ${H} L0 424`; for (let x = 0; x < W; x += 30) d += ` a15 15 0 0 1 30 0`; d += ` L${W} ${H}Z`;
  S0(foreG, d, SP * 1.1);
  P0(foreG, Array.from({ length: 70 }, () => { const x = sr(6, 954), y = sr(427, 438); return `M${f(x)} ${f(y)} q${f(sr(-2, 2))} -3 ${f(sr(-1, 4))} -5`; }).join(' '), SP * 0.4);
}

// lamp post
const lampX = 606;
S0(streetG, `M${lampX - 2.4} 372 L${lampX - 1} 268 L${lampX + 1} 268 L${lampX + 2.4} 372Z`, SP); P0(streetG, `M${lampX - 5} 372 L${lampX + 5} 372`, SP * 1.3);
const lampHead = tintable(S0(streetG, `M${lampX - 8} 266 L${lampX + 8} 266 L${lampX + 5.5} 252 L${lampX - 5.5} 252Z`)); P0(streetG, `M${lampX - 9} 252 L${lampX + 9} 252 M${lampX} 252 L${lampX} 246`, SP * 1.1);
const lampGlow = el('circle', { cx: lampX, cy: 259, r: 78, fill: 'url(#dq-glow)', opacity: 0 }, glowG);
const lampCone = el('path', { d: `M${lampX - 5} 266 L${lampX - 34} 372 L${lampX + 34} 372 L${lampX + 5} 266Z`, fill: '#ffd58a', opacity: 0 }, glowG);

// tree
const tree = el('g', {}, bldgG);
{
  P0(tree, `M884 ${BASE} Q885 ${BASE - 40} 888 ${BASE - 70} M894 ${BASE} Q893 ${BASE - 40} 890 ${BASE - 70}`, SP);
  let d = ''; const blobs: [number, number, number][] = [[864, 262, 24], [902, 258, 26], [886, 236, 26], [872, 282, 20], [906, 284, 18]];
  blobs.forEach(([cx, cy, r]) => { S0(tree, oval(cx, cy, r, r * 0.86), SP * 0.9); });
  blobs.forEach(([cx, cy, r]) => { for (let k = 0; k < 7; k++) { const a = sr(0, 6.28), rr = sr(0, r * 0.7); d += `M${f(cx + Math.cos(a) * rr)} ${f(cy + Math.sin(a) * rr * 0.8)} q2 -3 4 0`; } });
  P0(tree, d, SP * 0.45);
}
// bench + cat
S0(streetG, rectP(806, 352, 46, 5), SP); P0(streetG, `M810 357 L810 ${BASE + 14} M848 357 L848 ${BASE + 14}`, SP);
const cat = el('g', { style: 'cursor:pointer' }, streetG);
const catTail = pen(cat, SP * 0.9), catBody = shape(cat, SP * 0.9), catHead = shape(cat, SP * 0.9), earA = shape(cat, SP * 0.7), earB = shape(cat, SP * 0.7);
const catPatch = blot(cat), catEyes = pen(cat, SP * 0.8), catMouth = shape(cat, SP * 0.6);
let catT = -1;

// ---------------------------------------------------------------- birds
type Bird = { g: SVGGElement; head: SVGElement; wings: SVGPathElement; legs: SVGPathElement; u: number; dir: 1 | -1; x: number; y: number; vx: number; vy: number; st: 'perch' | 'fly' | 'away'; t: number; hop: number; nextHop: number; alpha: number };
const birds: Bird[] = [0.12, 0.17, 0.46, 0.52, 0.74, 0.9].map((u, i) => {
  const g = el('g', {}, backG);
  const tail = P0(g, 'M-4 -4.6 L-9.4 -2.2', SP * 0.9), body = S0(g, oval(0, -4.4, 4.6, 3.2), SP * 0.9);
  const head = S0(g, oval(4.4, -7.6, 2.1, 2.1), SP * 0.9); P0(g, 'M6.4 -7.6 L8.4 -7', SP * 0.7);
  blot(g).setAttribute('d', oval(5.1, -7.9, 0.5, 0.5));
  const legs = P0(g, 'M-0.8 -1.4 L-0.8 0 M1 -1.4 L1 0', SP * 0.6); const wings = P0(g, '', SP * 0.9);
  void tail; void body;
  return { g, head, wings, legs, u, dir: (i % 2 ? -1 : 1) as 1 | -1, x: 0, y: 0, vx: 0, vy: 0, st: 'perch', t: 0, hop: -1, nextHop: rnd(1, 4), alpha: 1 };
});
function scatter(from: number) { birds.forEach((b) => { if (b.st !== 'perch') return; b.st = 'fly'; b.t = 0; const away = b.x >= from ? 1 : -1; b.dir = away as 1 | -1; b.vx = away * rnd(46, 92); b.vy = -rnd(48, 86); }); }

// ---------------------------------------------------------------- people
const KINDS: Record<string, any> = {
  writer: { coat: '#2f7d5f', hair: 'bun', carry: 'satchel' },
  reader: { coat: '#c9a25a', hair: 'cap', carry: 'tube', scarf: '#8f3b2e' },
  keeper: { coat: '#3b4a7a', hair: 'bowler', carry: 'lantern' },
  // the visitor: brisk walk, coral coat, nothing in hand, tagged YOU
  visitor: { coat: YOU, hair: 'cap', carry: 'none', gait: { stride: 28, period: 0.88 }, you: true },
};
const wind = pointerWind(svg, 0.3);
const amt = { rain: 0, snow: 0 }; // 0..1, eased; read by people (umbrellas), windows and birds
let lastP: any = palette(0.62);
const people: any[] = [];
function makeTag() {
  const g = el('g', { opacity: 0 }, partG), hw = 13.5, top = -19, bot = -7, r = 3.4;
  el('path', { d: `M${-hw + r} ${top} H${hw - r} A${r} ${r} 0 0 1 ${hw} ${top + r} V${bot - r} A${r} ${r} 0 0 1 ${hw - r} ${bot} H3.8 L0 -1.2 L-3.8 ${bot} H${-hw + r} A${r} ${r} 0 0 1 ${-hw} ${bot - r} V${top + r} A${r} ${r} 0 0 1 ${-hw + r} ${top}Z`, fill: YOU, stroke: '#fffaf2', 'stroke-width': 0.9, 'stroke-linejoin': 'round' }, g);
  const t = el('text', { x: 0.6, y: -10.3, 'text-anchor': 'middle', 'font-size': 7.5, 'font-weight': 600, 'letter-spacing': 1.4, 'font-family': "'IBM Plex Mono', ui-monospace, monospace", fill: '#fffaf2' }, g); t.textContent = 'YOU';
  return g;
}
const STOPS = [
  { x: 133, id: 'api', name: 'THE API REFERENCE' }, { x: 363, id: 'style', name: 'THE STYLE GUIDE' },
  { x: 544, id: 'release', name: 'THE RELEASE NOTES' }, { x: 700, id: 'micro', name: 'MICROCOPY' },
];
function makePerson(kind: string, dir: 1 | -1, x: number, lane: number) {
  const cfg = KINDS[kind], walk = gait({ kind: 'walk', ...(cfg.gait ?? {}) });
  const g = el('g', { style: 'cursor:pointer' }, walkG);
  if (cfg.you) el('ellipse', { cx: 40, cy: 120.8, rx: 25, ry: 4.6, fill: cfg.coat, opacity: 0.3 }, g); // a soft coral pool under the visitor's feet
  const farArm = limb(g, 3.6), legs = [limb(g, 4.2), limb(g, 4.2)], shoes = [blot(g), blot(g)];
  const coat = paint(g, cfg.coat), seam = pen(g, PEN * 0.6);
  const scarfTail = cfg.scarf ? paint(g, cfg.scarf, PEN * 0.8) : null;
  const head = el('ellipse', { rx: 3.6, ry: 4.6, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, g);
  const hair = blot(g), scarf = cfg.scarf ? paint(g, cfg.scarf, PEN * 0.8) : null;
  const nearArm = limb(g, 3.6);
  const carryG = el('g', {}, g);
  const carryBody = cfg.carry === 'satchel' ? paint(carryG, '#8a6a4a', PEN * 0.8) : cfg.carry === 'lantern' ? paint(carryG, '#d9a441', PEN * 0.8) : shape(carryG, PEN * 0.8);
  const carryDetail = pen(carryG, PEN * 0.6), handle = pen(carryG, PEN * 0.7);
  const glow = cfg.carry === 'lantern' ? el('circle', { r: 34, fill: 'url(#dq-glow)', opacity: 0 }, glowG) : null;
  const armSwing = [spring(60, 9), spring(60, 9)], carrySwing = pendulum(14, 1.8), tail = spring(30, 4);
  const tag = cfg.you ? makeTag() : null;
  const o: any = { g, x, dir, lane, phase: rnd(0, 1), greetT: -1, dead: false, glow, age: 0, kind, tourI: 0, pauseT: -1, leaveT: 0, waved: false };
  if (cfg.you) o.tour = (dt: number) => {
    const st = STOPS[o.tourI]; if (!st) return 1;
    if (o.pauseT >= 0) {
      o.pauseT += dt; blds[st.id].flash = 1;
      if (o.pauseT > 0.25 && !o.waved) { o.waved = true; o.greetT = 0; }
      if (o.pauseT > 2.9) { o.pauseT = -1; o.tourI++; o.waved = false; o.leaveT = 0; }
      return 0;
    }
    const d = st.x - o.x;
    if (d <= 0.8) { o.pauseT = 0; return 0; }
    o.leaveT += dt;
    return Math.min(ease(clamp(o.leaveT / 0.55, 0, 1)), clamp(d / 18, 0.12, 1));
  };
  o.caption = () => { const st = STOPS[o.tourI]; return !st ? '' : o.pauseT >= 0 ? `YOU · AT ${st.name}` : o.tourI === 0 && o.x < 24 ? 'YOU · JUST ARRIVED' : `YOU · HEADING TO ${st.name}`; };
  g.addEventListener('pointerdown', (e) => { e.stopPropagation(); if (o.greetT < 0) o.greetT = 0; hintGone(); });
  o.update = (t: number, dt: number, P: any) => {
    o.age += dt;
    const tourGo: number = o.tour ? o.tour(dt) : -1;
    let greet = 0;
    if (o.greetT >= 0) { o.greetT += dt; const s = o.greetT; greet = s < 0.4 ? ease(s / 0.4) : s < 2.0 ? 1 : 1 - ease((s - 2.0) / 0.45); if (s > 2.45) o.greetT = -1; }
    const go = tourGo >= 0 ? tourGo : 1 - greet * 0.9;
    o.phase += (dt / walk.period) * go; o.x += o.dir * walk.speed * FS * dt * go;
    if ((o.dir === 1 && o.x > W + 70) || (o.dir === -1 && o.x < -70)) o.dead = true;
    place(g, o.x, o.lane, o.dir, FS);
    const p = walk.pose(o.phase, go), b = p.bob;
    p.feet.forEach((fo: any, i: number) => { legs[i].draw([p.hip, fo.knee, fo.ankle], [0.3, 0.8]); shoe(shoes[i], fo.ankle, fo.pitch); });
    g.insertBefore(legs[p.front].g, coat); g.insertBefore(shoes[p.front], coat);
    coat.setAttribute('fill', nightTint(cfg.coat, P));
    const kF = p.feet[p.front].knee, aF = p.feet[p.front].ankle, sh = [41, 41 + b], hemY = 92, fx = Math.max(kF[0] + 2.4, 46.4);
    coat.setAttribute('d', `M${f(sh[0] - 6)} ${f(sh[1] + 1)} Q${f(sh[0] - 1)} ${f(sh[1] - 2.4)} ${f(sh[0] + 5)} ${f(sh[1] + 1)} L${f(fx - 0.6)} ${f(70 + b)} Q${f(fx)} ${f(82 + b * 0.5)} ${f(Math.max(fx, aF[0] - 4))} ${hemY} L30.6 ${hemY + 1} L33.2 ${f(70 + b)}Z`);
    seam.setAttribute('d', `M${f(sh[0] + 2.6)} ${f(sh[1] + 4)} L${f(sh[0] + 3.8)} ${f(66 + b)}`);
    const hc = [42.6, 31.6 + b], wl = wind.value * o.dir;
    if (!o.umb) { const ug = el('g', { opacity: 0 }, g); o.umb = { ug, can: shape(ug, PEN), pole: pen(ug, PEN * 0.9) }; }
    {
      const ua = ease(clamp((amt.rain - 0.3) / 0.6, 0, 1)); o.umb.ug.setAttribute('opacity', f(ua));
      if (ua > 0.01) {
        const ux = hc[0] + 9, uy = hc[1] - 11;
        o.umb.can.setAttribute('d', `M${f(ux - 17)} ${f(uy)} Q${f(ux - 15)} ${f(uy - 14)} ${f(ux)} ${f(uy - 15)} Q${f(ux + 15)} ${f(uy - 14)} ${f(ux + 17)} ${f(uy)} Q${f(ux + 11)} ${f(uy - 3)} ${f(ux + 8.5)} ${f(uy)} Q${f(ux + 4)} ${f(uy - 3)} ${f(ux)} ${f(uy)} Q${f(ux - 4)} ${f(uy - 3)} ${f(ux - 8.5)} ${f(uy)} Q${f(ux - 11)} ${f(uy - 3)} ${f(ux - 17)} ${f(uy)}Z`);
        o.umb.pole.setAttribute('d', `M${f(ux)} ${f(uy)} L${f(ux)} ${f(uy + 36)} q0 3 -3 3`);
        o.umb.ug.setAttribute('transform', `rotate(${f(clamp(wl * 3 - 5, -16, 16))} ${f(ux)} ${f(uy + 36)})`);
      }
    }
    head.setAttribute('cx', f(hc[0])); head.setAttribute('cy', f(hc[1]));
    if (tag) { const tp = toScene(o.x, o.lane, o.dir, hc[0], hc[1] - 8, FS); tag.setAttribute('transform', `translate(${f(tp[0])} ${f(tp[1] + Math.sin(t * 3.2) * 0.9)}) scale(${f(tagK)})`); tag.setAttribute('opacity', f(ease(clamp((o.age - 0.15) / 0.7, 0, 1)))); }
    const lift = cfg.hair === 'bowler' ? greet * 5 : 0;
    if (cfg.hair === 'bun') hair.setAttribute('d', `M${f(hc[0] - 4)} ${f(hc[1] + 0.5)} Q${f(hc[0] - 4.2)} ${f(hc[1] - 5.6)} ${f(hc[0] + 0.6)} ${f(hc[1] - 5.4)} Q${f(hc[0] + 3.6)} ${f(hc[1] - 4.6)} ${f(hc[0] + 3.4)} ${f(hc[1] - 2.2)} Q${f(hc[0] - 0.5)} ${f(hc[1] - 3.4)} ${f(hc[0] - 4)} ${f(hc[1] + 0.5)}Z M${f(hc[0] - 7.4)} ${f(hc[1] - 3.4)} a2.6 2.6 0 1 0 5.2 0 a2.6 2.6 0 1 0 -5.2 0Z`);
    else if (cfg.hair === 'cap') hair.setAttribute('d', `M${f(hc[0] - 4.2)} ${f(hc[1] - 1.4)} Q${f(hc[0] - 4)} ${f(hc[1] - 6.6)} ${f(hc[0] + 0.8)} ${f(hc[1] - 6.6)} Q${f(hc[0] + 4.4)} ${f(hc[1] - 6.2)} ${f(hc[0] + 4.4)} ${f(hc[1] - 2)} L${f(hc[0] + 8.2)} ${f(hc[1] - 1.6)} L${f(hc[0] + 8.2)} ${f(hc[1] - 0.5)} L${f(hc[0] - 4.2)} ${f(hc[1] - 0.8)}Z`);
    else hair.setAttribute('d', `M${f(hc[0] - 6.4)} ${f(hc[1] - 3.6 - lift)} L${f(hc[0] + 6.6)} ${f(hc[1] - 3.6 - lift)} Q${f(hc[0] + 4.4)} ${f(hc[1] - 5 - lift)} ${f(hc[0] + 4)} ${f(hc[1] - 8 - lift)} Q${f(hc[0])} ${f(hc[1] - 11 - lift)} ${f(hc[0] - 3.8)} ${f(hc[1] - 8 - lift)} Q${f(hc[0] - 4.2)} ${f(hc[1] - 5 - lift)} ${f(hc[0] - 6.4)} ${f(hc[1] - 3.6 - lift)}Z`);
    if (scarf && scarfTail) {
      scarf.setAttribute('fill', nightTint(cfg.scarf, P)); scarfTail.setAttribute('fill', nightTint(cfg.scarf, P));
      scarf.setAttribute('d', `M${f(hc[0] - 4.6)} ${f(hc[1] + 4.6)} Q${f(hc[0])} ${f(hc[1] + 8.4)} ${f(hc[0] + 4)} ${f(hc[1] + 4.8)} L${f(hc[0] + 4.4)} ${f(hc[1] + 7.6)} Q${f(hc[0])} ${f(hc[1] + 11)} ${f(hc[0] - 4.8)} ${f(hc[1] + 7.4)}Z`);
      const flow = tail.step(-6 - walk.speed * 0.08 * go + wl * 5 + Math.sin(t * 9) * 0.8, dt);
      scarfTail.setAttribute('d', `M${f(hc[0] - 3.6)} ${f(hc[1] + 6)} Q${f(hc[0] - 6 + flow * 0.4)} ${f(hc[1] + 9)} ${f(hc[0] - 4 + flow)} ${f(hc[1] + 16 + flow * 0.2)} L${f(hc[0] - 1 + flow * 0.9)} ${f(hc[1] + 16.6 + flow * 0.2)} Q${f(hc[0] - 3 + flow * 0.3)} ${f(hc[1] + 10)} ${f(hc[0] - 0.8)} ${f(hc[1] + 7.4)}Z`);
    }
    const legSwing = (p.feet[0].ankle[0] - 40) / (walk.stride / 2);
    const farA = armSwing[0].step(-legSwing * 16 * go, dt) * Math.PI / 180, nearA = armSwing[1].step(legSwing * 14 * go, dt) * Math.PI / 180;
    const shF = [sh[0] - 1, sh[1] + 2], shN = [sh[0] + 1.6, sh[1] + 2.4];
    const elbF = [shF[0] + 17 * Math.sin(farA), shF[1] + 17 * Math.cos(farA)];
    farArm.draw([shF, elbF, [elbF[0] + 16 * Math.sin(farA + 0.25), elbF[1] + 16 * Math.cos(farA + 0.25)]], [0.2, 0.5]);
    let hand: number[];
    if (greet > 0.01) {
      const wave = kind === 'writer' || kind === 'visitor' ? Math.sin(o.greetT * 10) * 2.4 * greet : 0;
      const target = cfg.hair === 'bowler' ? [hc[0] + 4, hc[1] - 4 - lift] : [hc[0] + 6 + wave, hc[1] - 9];
      const restH = [shN[0] + 17 * Math.sin(nearA) + 16 * Math.sin(nearA + 0.1), shN[1] + 33];
      const mid = [(shN[0] + target[0]) / 2 + 7 * greet, (shN[1] + target[1]) / 2 + 3];
      hand = [lerp(restH[0], target[0], greet), lerp(restH[1], target[1], greet)];
      nearArm.draw([shN, [lerp(shN[0] + 17 * Math.sin(nearA), mid[0], greet), lerp(shN[1] + 17, mid[1], greet)], hand], [0.2, 0.4]);
    } else {
      const elb = [shN[0] + 17 * Math.sin(nearA), shN[1] + 17 * Math.cos(nearA)];
      hand = [elb[0] + 16 * Math.sin(nearA + 0.1), elb[1] + 16 * Math.cos(nearA + 0.1)]; nearArm.draw([shN, elb, hand], [0.2, 0.4]);
    }
    const accel = Math.cos(2 * Math.PI * o.phase * 2) * 1.6 * go;
    const ca = carrySwing.step(-accel - wl * 0.3, dt), ch = greet > 0.01 ? [shN[0] + 6, shN[1] + 34] : hand;
    carryG.setAttribute('transform', `rotate(${f(ca * 57.3)} ${pt(ch)})`);
    if (cfg.carry === 'satchel') {
      carryBody.setAttribute('fill', nightTint('#8a6a4a', P));
      handle.setAttribute('d', `M${f(ch[0] - 2.4)} ${f(ch[1] + 2.4)} Q${pt(ch)} ${f(ch[0] + 2.4)} ${f(ch[1] + 2.4)}`);
      carryBody.setAttribute('d', `M${f(ch[0] - 8)} ${f(ch[1] + 2.4)} L${f(ch[0] + 8)} ${f(ch[1] + 2.4)} L${f(ch[0] + 8)} ${f(ch[1] + 13)} L${f(ch[0] - 8)} ${f(ch[1] + 13)}Z`);
      carryDetail.setAttribute('d', `M${f(ch[0] - 8)} ${f(ch[1] + 6)} L${f(ch[0] + 8)} ${f(ch[1] + 6)}`);
    } else if (cfg.carry === 'tube') {
      carryBody.setAttribute('d', `M${f(ch[0] - 2.4)} ${f(ch[1] - 2)} L${f(ch[0] + 2.4)} ${f(ch[1] - 2)} L${f(ch[0] + 2.4)} ${f(ch[1] + 22)} L${f(ch[0] - 2.4)} ${f(ch[1] + 22)}Z`);
      carryDetail.setAttribute('d', `M${f(ch[0] - 2.4)} ${f(ch[1] + 4)} L${f(ch[0] + 2.4)} ${f(ch[1] + 4)} M${f(ch[0] - 2.4)} ${f(ch[1] + 17)} L${f(ch[0] + 2.4)} ${f(ch[1] + 17)}`);
      handle.setAttribute('d', '');
    } else if (cfg.carry === 'none') {
      /* empty hands */
    } else {
      carryBody.setAttribute('fill', nightTint('#d9a441', P, 0.1));
      handle.setAttribute('d', `M${f(ch[0])} ${f(ch[1])} L${f(ch[0])} ${f(ch[1] + 6)} M${f(ch[0] - 3)} ${f(ch[1] + 6.4)} Q${f(ch[0])} ${f(ch[1] + 3.6)} ${f(ch[0] + 3)} ${f(ch[1] + 6.4)}`);
      carryBody.setAttribute('d', `M${f(ch[0] - 3)} ${f(ch[1] + 6.4)} L${f(ch[0] + 3)} ${f(ch[1] + 6.4)} L${f(ch[0] + 3.6)} ${f(ch[1] + 14)} L${f(ch[0] - 3.6)} ${f(ch[1] + 14)}Z`);
      carryDetail.setAttribute('d', `M${f(ch[0] - 3.3)} ${f(ch[1] + 10)} L${f(ch[0] + 3.3)} ${f(ch[1] + 10)}`);
      if (glow) { const lp = toScene(o.x, o.lane, o.dir, ch[0], ch[1] + 10, FS); glow.setAttribute('cx', f(lp[0])); glow.setAttribute('cy', f(lp[1])); glow.setAttribute('opacity', f(smooth(0.3, 0.7, P.lamp) * (0.85 + Math.sin(t * 7 + o.x) * 0.08))); }
    }
  };
  o.remove = () => { g.remove(); if (glow) glow.remove(); if (tag) tag.remove(); };
  return o;
}
function spawn(initial?: number) {
  const dir = (Math.random() < 0.5 ? 1 : -1) as 1 | -1;
  const kind = lastP.lamp > 0.55 ? 'keeper' : Math.random() < 0.5 ? 'writer' : 'reader';
  people.push(makePerson(kind, dir, initial ?? (dir === 1 ? -40 : W + 40), pick(LANES)));
}
[150, 430, 790].forEach((x) => spawn(x));
// The visitor enters once the loader has gone, tours the four buildings, leaves, and comes back later.
let visitor: any = null, visitorWait = 0.6;
function visitorTick(dt: number) {
  if (visitor) { if (visitor.dead) { visitor = null; visitorWait = 14; } return; }
  if (document.documentElement.classList.contains('booting')) return;
  if ((visitorWait -= dt) <= 0) { visitor = makePerson('visitor', 1, -26, 377); people.push(visitor); }
}
let spawnT = rnd(6, 10);

// ---------------------------------------------------------------- smoke, fireflies, ui
const smoke = Array.from({ length: 6 }, (_, i) => ({ n: pen(partG, SP * 0.6), life: i / 6 }));
const flies = Array.from({ length: 10 }, (_, i) => ({ c: el('circle', { r: 5, fill: 'url(#dq-glow)', opacity: 0 }, glowG), x: sr(640, 940), y: sr(290, 380), k: sr(0.4, 1), ph: sr(0, 6) + i }));
const clock = el('text', { x: 20, y: 30, 'font-size': 10, 'letter-spacing': 1.3, 'font-family': "'IBM Plex Mono', ui-monospace, monospace", fill: 'currentColor', opacity: 0.75 }, uiG);
const hint = el('text', { x: W / 2, y: 403, 'text-anchor': 'middle', 'font-size': 8.5, 'letter-spacing': 1.1, 'font-family': "'IBM Plex Mono', ui-monospace, monospace", fill: 'currentColor', opacity: 0.6 }, uiG);
hint.textContent = 'DRAG TO CHANGE THE HOUR · CLICK A BUILDING, A WALKER, THE CAT, THE BIRDS OR A CLOUD';
const tourTxt = el('text', { x: W - 18, y: 30, 'text-anchor': 'end', 'font-size': 10, 'letter-spacing': 1.3, 'font-weight': 500, 'font-family': "'IBM Plex Mono', ui-monospace, monospace", fill: YOU, opacity: 0 }, uiG);
let hinted = true; function hintGone() { hinted = false; }

// ---------------------------------------------------------------- hits and input
el('rect', { x: 0, y: 0, width: W, height: H, fill: 'transparent', style: 'cursor:grab' }, skyG);
Object.values(blds).forEach((b) => {
  const r = el('rect', { x: b.x0 - 16, y: b.y0, width: b.x1 - b.x0 + 32, height: BASE - b.y0, fill: 'transparent', style: 'cursor:pointer' }, bldgG);
  r.dataset.bld = b.id; const t = document.createElementNS('http://www.w3.org/2000/svg', 'title'); t.textContent = { api: 'API Reference', style: 'Style Guide', release: 'Release Notes', micro: 'Microcopy' }[b.id]!; r.appendChild(t);
  r.addEventListener('pointerenter', () => { b.hover = true; }); r.addEventListener('pointerleave', () => { b.hover = false; });
});
const catHit = el('rect', { x: 800, y: 326, width: 60, height: 34, fill: 'transparent', style: 'cursor:pointer' }, hitG);
catHit.addEventListener('pointerdown', (e) => { e.stopPropagation(); if (catT < 0) catT = 0; hintGone(); });
const wireHit = el('path', { d: `M${WA[0]} ${WA[1]} Q${WC[0]} ${WC[1]} ${WB[0]} ${WB[1]}`, fill: 'none', stroke: 'transparent', 'stroke-width': 18, style: 'cursor:pointer' }, hitG);
wireHit.addEventListener('pointerdown', (e) => { e.stopPropagation(); const r = svg.getBoundingClientRect(); scatter(camX + ((e.clientX - r.left) / r.width) * vw); hintGone(); });

const q = new URLSearchParams(location.search);
let tau0 = q.has('tau') ? Number(q.get('tau')) : 0.62, tauOff = 0;
let down: any = null;
svg.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, tx: e.clientX, moved: 0, target: e.target as Element }; });
window.addEventListener('pointermove', (e) => {
  if (!down) return; const dx = e.clientX - down.tx; down.tx = e.clientX; down.moved += Math.abs(dx) + Math.abs(e.clientY - down.y) * 0.001;
  if (down.moved > 6) { tauOff += (dx / svg.getBoundingClientRect().width) * 0.35; hintGone(); svg.style.cursor = 'grabbing'; }
});
window.addEventListener('pointerup', (e) => {
  if (!down) return; const d = down; down = null; svg.style.cursor = '';
  const id = (d.target as HTMLElement)?.dataset?.bld;
  if (d.moved <= 6 && !(id && blds[id])) tapWeather(e);
  if (d.moved <= 6 && id && blds[id]) { blds[id].flash = 1; hintGone(); setTimeout(() => window.dispatchEvent(new CustomEvent('quarter:open', { detail: { id } })), 520); }
});

// ---------------------------------------------------------------- weather
// Click any cloud to cycle clear > rain > snow (or use the switch under the scene). Pointer wind slants the
// rain and drifts the snow; tapping the street makes ripples or a gust. Birds leave, windows light early,
// walkers open umbrellas. Everything eases in and out, so it never snaps.
type Wx = 'clear' | 'rain' | 'snow';
let wx: Wx = 'clear', gustT = 0;
const wxG = el('g', { 'pointer-events': 'none' }, svg); svg.insertBefore(wxG, glowG);
const dimR = el('rect', { x: 0, y: 0, width: W, height: H, fill: '#4f6068', opacity: 0, 'pointer-events': 'none' }, skyG);
const dimS = el('rect', { x: 0, y: 0, width: W, height: H, fill: '#a9b8c2', opacity: 0, 'pointer-events': 'none' }, skyG);
const CLOUD = 'M0 8 q-6 -6 2 -10 q2 -9 13 -5 q8 -8 17 0 q11 -3 12 6 q8 2 3 9 Z';
const wxClouds = [0, 1, 2].map((i) => { const g = el('g', { opacity: 0 }, backG); const c = tintable(S0(g, CLOUD, SP * 0.8)); c.setAttribute('stroke-opacity', '0.55'); return { g, c, x: i * 340 - 40, y: 34 + (i % 2) * 30, s: 1.7 + i * 0.35, v: 5 + i * 2 }; });
const cycleWx = (e: Event) => { e.stopPropagation(); hintGone(); setWx((['clear', 'rain', 'snow'] as Wx[])[(['clear', 'rain', 'snow'].indexOf(wx) + 1) % 3]); };
const addCloudHit = (g: Element) => { const r = el('rect', { x: -6, y: -18, width: 60, height: 34, fill: 'transparent', style: 'cursor:pointer' }, g); const t = document.createElementNS('http://www.w3.org/2000/svg', 'title'); t.textContent = 'Change the weather'; r.appendChild(t); r.addEventListener('pointerdown', cycleWx); };
clouds.forEach((c) => addCloudHit(c.g)); wxClouds.forEach((c) => addCloudHit(c.g));
[sun, moon].forEach((g) => { const r = el('circle', { r: 28, fill: 'transparent', style: 'cursor:pointer' }, g); r.addEventListener('pointerdown', (e) => { e.stopPropagation(); hintGone(); setWx('clear'); }); });

const NR = 120, NS = 90, GROUND0 = 350, GROUND1 = 398;
const rain = Array.from({ length: NR }, () => ({ x: rnd(-60, W + 60), y: rnd(-40, H), v: rnd(430, 640), l: rnd(0.8, 1.25), land: rnd(GROUND0, GROUND1) }));
const snow = Array.from({ length: NS }, () => ({ x: rnd(0, W), y: rnd(-20, H), v: rnd(20, 44), ph: rnd(0, 6.3), r: rnd(1.1, 2.1), kx: 0, land: rnd(GROUND0 + 6, GROUND1 + 6) }));
const rainP = pen(wxG, SP * 0.7); rainP.setAttribute('stroke-opacity', '0.5');
const snowP = shape(wxG, SP * 0.55);
const ripP = pen(wxG, SP * 0.6); ripP.setAttribute('stroke-opacity', '0.55');
const rips = Array.from({ length: 28 }, () => ({ x: 0, y: 0, a: -1 }));
const ripple = (x: number, y: number) => { const r = rips.find((q) => q.a < 0); if (r) { r.x = x; r.y = y; r.a = 0; } };
const mounds = Array.from({ length: 11 }, (_, i) => { const g = el('g', {}, wxG); const x = 30 + i * 88 + rnd(-20, 20), rx = rnd(11, 19); S0(g, `M${f(-rx)} 0 Q${f(-rx * 0.5)} ${f(-rx * 0.34)} 0 ${f(-rx * 0.4)} Q${f(rx * 0.55)} ${f(-rx * 0.3)} ${f(rx)} 0Z`, SP * 0.7); return { g, x, y: KERB + 12 + (i % 3) * 3 }; });

function setWx(k: Wx) {
  if (k === wx) return; const was = wx; wx = k;
  document.querySelectorAll<HTMLElement>('.wx button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.wx === k)));
  if (k !== 'clear' && was === 'clear') scatter(W / 2 + rnd(-120, 120)); // the birds go and find a roof
  if (k === 'rain') for (let i = 0; i < 8; i++) ripple(rnd(40, W - 40), rnd(GROUND0, GROUND1));
}
document.querySelectorAll<HTMLElement>('.wx button').forEach((b) => b.addEventListener('click', () => { hintGone(); setWx(b.dataset.wx as Wx); }));
function tapWeather(e: PointerEvent) {
  if (wx === 'clear') return;
  const r = svg.getBoundingClientRect(), x = camX + ((e.clientX - r.left) / r.width) * vw, y = clamp(((e.clientY - r.top) / r.height) * H, GROUND0, GROUND1);
  if (wx === 'rain') for (let i = 0; i < 7; i++) ripple(x + rnd(-34, 34), clamp(y + rnd(-14, 14), GROUND0, GROUND1));
  else { gustT = 1; snow.forEach((s) => { const dx = s.x - x, d = Math.abs(dx); if (d < 190) s.kx += Math.sign(dx || 1) * (1 - d / 190) * rnd(110, 230); }); }
}
const wxDay = '#c9d3d6';
function weatherTick(t: number, dt: number, P: any, wv: number): number {
  const k = 1 - Math.exp(-dt * 1.5);
  amt.rain = lerp(amt.rain, wx === 'rain' ? 1 : 0, k); amt.snow = lerp(amt.snow, wx === 'snow' ? 1 : 0, k);
  const wet = Math.max(amt.rain, amt.snow * 0.85), day = 1 - P.night * 0.8;
  dimR.setAttribute('opacity', f(0.24 * amt.rain * day)); dimS.setAttribute('opacity', f(0.2 * amt.snow * day));
  wxClouds.forEach((c) => { c.x += (c.v + wv * 5) * dt; if (c.x > W + 90) c.x = -150; c.g.setAttribute('transform', `translate(${f(c.x)} ${f(c.y)}) scale(${f(c.s)})`); c.g.setAttribute('opacity', f(wet * 0.95)); c.c.setAttribute('fill', nightTint(wxDay, P)); });
  gustT = Math.max(0, gustT - dt * 0.8);
  let d = '';
  if (amt.rain > 0.01) {
    const n = Math.round(NR * amt.rain), vx = 46 + wv * 80;
    for (let i = 0; i < n; i++) { const r = rain[i]; r.y += r.v * dt; r.x += vx * dt * (r.v / 520); if (r.y >= r.land) { if (Math.random() < 0.3) ripple(r.x, r.land); r.y = -rnd(4, 70); r.x = rnd(-60, W + 20); r.land = rnd(GROUND0, GROUND1); } d += `M${f(r.x)} ${f(r.y)}l${f(-vx * 0.022 * r.l)} ${f(-r.v * 0.022 * r.l)}`; }
  }
  rainP.setAttribute('d', d); rainP.setAttribute('opacity', f(amt.rain));
  d = '';
  if (amt.snow > 0.01) {
    const n = Math.round(NS * amt.snow);
    for (let i = 0; i < n; i++) { const s = snow[i]; s.kx *= Math.exp(-dt * 1.7); s.y += s.v * dt; s.x += (wv * 26 + Math.sin(t * 0.9 + s.ph) * 11 + s.kx) * dt; if (s.y >= s.land || s.x < -20 || s.x > W + 20) { s.y = -rnd(4, 40); s.x = rnd(0, W); s.land = rnd(GROUND0 + 6, GROUND1 + 6); s.kx = 0; } d += `M${f(s.x - s.r)} ${f(s.y)}a${s.r} ${s.r} 0 1 0 ${f(s.r * 2)} 0a${s.r} ${s.r} 0 1 0 ${f(-s.r * 2)} 0`; }
  }
  snowP.setAttribute('d', d); snowP.setAttribute('opacity', f(amt.snow));
  d = '';
  rips.forEach((r) => { if (r.a < 0) return; r.a += dt * 1.9; if (r.a >= 1) { r.a = -1; return; } const rx = 1.5 + r.a * 8; d += `M${f(r.x - rx)} ${f(r.y)}a${f(rx)} ${f(rx * 0.3)} 0 1 0 ${f(rx * 2)} 0a${f(rx)} ${f(rx * 0.3)} 0 1 0 ${f(-rx * 2)} 0`; });
  ripP.setAttribute('d', d);
  mounds.forEach((m) => { const a = ease(clamp(amt.snow * 1.15 - 0.1, 0, 1)); m.g.setAttribute('transform', `translate(${f(m.x)} ${f(m.y)}) scale(1 ${f(Math.max(0.001, a))})`); m.g.setAttribute('opacity', f(a)); });
  void gustT;
  return wet;
}
(window as any).__quarterWx = { set: setWx, get: () => wx };

// ---------------------------------------------------------------- the loop
const DAY = 300;
(window as any).__quarter = { setTau: (v: number) => { tau0 = v; tauOff = 0; }, people, blds, get visitor() { return visitor; }, get cam() { return [camX, vw]; } };
new ResizeObserver(fit).observe(svg); fit();
run((t, dt) => {
  const tau = (((tau0 + t / DAY + tauOff) % 1) + 1) % 1;
  const P = palette(tau); lastP = P; applyPalette(svg, P, mount);
  sTop.setAttribute('stop-color', rgb(P.top)); sBot.setAttribute('stop-color', rgb(P.bottom));
  wind.step(t); const wv = wind.value;
  const wet = weatherTick(t, dt, P, wv);
  // sun, moon, stars, clouds
  const us = (tau - 0.25) / 0.5, um = (((tau - 0.75) % 1) + 1) % 1 / 0.5;
  const arc = (u: number): [number, number] => [lerp(70, W - 70, u), 252 - 196 * Math.sin(Math.PI * clamp(u, 0, 1))];
  const sp = arc(us), mp = arc(um);
  sun.setAttribute('transform', `translate(${f(sp[0])} ${f(sp[1])}) rotate(${f(t * 4)})`); sun.setAttribute('opacity', f(smooth(0, 0.06, us) * smooth(1, 0.94, us) * (1 - wet * 0.85)));
  moon.setAttribute('transform', `translate(${f(mp[0])} ${f(mp[1])})`); moon.setAttribute('opacity', f(smooth(0, 0.06, um) * smooth(1, 0.94, um)));
  stars.forEach((s) => s.c.setAttribute('opacity', f(P.night * (0.5 + 0.5 * Math.sin(t * s.k + s.ph)))));
  clouds.forEach((c) => { c.x += (c.v + wv * 4) * dt; if (c.x > W + 60) c.x = -80; if (c.x < -90) c.x = W + 50; c.g.setAttribute('transform', `translate(${f(c.x)} ${c.y}) scale(${c.s})`); c.g.setAttribute('opacity', f((1 - P.night * 0.7) * (1 - wet * 0.55))); });
  // windows, signs
  const dark = rgb(mix(P.ink, DARKWARM, 0));
  for (const w of wins) {
    const bl = blds[['api', 'style', 'release', 'micro'][w.b]];
    const lit = Math.max(smooth(w.th - 0.08, w.th + 0.08, P.lamp + wet * 0.3), bl.flash * 0.9 + (bl.hover ? 0.25 : 0));
    w.pane.setAttribute('fill', rgb(mix(P.paper, WARM, lit * 0.94))); w.glow.setAttribute('opacity', f(lit * 0.85));
    (w as any).lit = lit;
  }
  const litAvg = wins.reduce((a, w: any) => a + (w.lit || 0), 0) / wins.length;
  const inkNow = rgb(mix(P.ink, DARKWARM, clamp(litAvg * 1.6, 0, 1))); void dark;
  winInk.forEach((n) => n.setAttribute('stroke', inkNow)); writerUpdate(t, litAvg);
  Object.values(blds).forEach((b) => {
    b.flash = Math.max(0, b.flash - dt * 0.9); const target = clamp(b.flash + (b.hover ? 0.7 : 0), 0, 1); b.amt = lerp(b.amt, target, 0.18);
    b.sign.setAttribute('fill', rgb(mix(P.paper, ACC, b.amt * 0.95))); b.signTxt.setAttribute('fill', rgb(mix(P.ink, P.paper, b.amt)));
  });
  // lamp
  const lampLit = smooth(0.34, 0.5, P.lamp + wet * 0.22);
  lampHead.setAttribute('fill', rgb(mix(P.paper, WARM, lampLit * 0.95))); lampGlow.setAttribute('opacity', f(lampLit * (0.9 + Math.sin(t * 3.1) * 0.03))); lampCone.setAttribute('opacity', f(lampLit * 0.13));
  // notice sheets, awning, tree
  sheets.forEach((s) => { const a = s.pend.step(wv * 0.8 + Math.sin(t * 1.7 + s.k) * 0.12, dt); s.g.setAttribute('transform', `translate(${s.x} ${s.y}) rotate(${f(clamp(a, -0.6, 0.6) * 57.3)})`); });
  awning.setAttribute('transform', `translate(0 266) skewX(${f(wv * 1.4 + Math.sin(t * 0.9) * 0.4)}) translate(0 -266)`);
  awningPanels.forEach((pn, k) => { if (k % 2 === 0) pn.setAttribute('fill', nightTint('#1a6b4a', P)); else pn.setAttribute('fill', rgb(P.paper)); });
  tree.setAttribute('transform', `rotate(${f(wv * 0.7 + wobble(t * 0.5) * 0.35)} 889 ${BASE})`);
  // smoke
  smoke.forEach((s) => { s.life += dt / 7; if (s.life > 1) s.life -= 1; const l = s.life, x = 184 + l * (10 + wv * 26) + Math.sin(l * 9) * 2, y = 144 - l * 62, r = 2.6 + l * 8;
    s.n.setAttribute('d', oval(x, y, r, r * 0.85)); s.n.setAttribute('stroke-opacity', f(Math.sin(Math.PI * l) * 0.5)); });
  // cat
  {
    if (catT >= 0) { catT += dt; if (catT > 6.4) catT = -1; }
    const a = catT < 0 ? 0 : catT < 0.9 ? ease(catT / 0.9) : catT < 5.2 ? 1 : 1 - ease((catT - 5.2) / 1.2);
    const cx = 828, by = 352, yawn = catT > 1.6 && catT < 2.6 ? Math.sin(((catT - 1.6) / 1) * Math.PI) : 0, breathe = Math.sin(t * 1.6) * 0.35 * (1 - a);
    const bcx = lerp(cx, cx - 1, a), bcy = lerp(by - 5, by - 9, a), brx = lerp(11, 6.5, a), bry = lerp(5, 9, a) + breathe;
    const hx = lerp(cx + 10, cx + 2, a), hy = lerp(by - 5.4, by - 21, a);
    catBody.setAttribute('d', oval(bcx, bcy, brx, bry)); catHead.setAttribute('d', oval(hx, hy, 4.6, 4.2));
    earA.setAttribute('d', `M${f(hx - 4)} ${f(hy - 2)} L${f(hx - 3.4)} ${f(hy - 7.4)} L${f(hx - 0.4)} ${f(hy - 3.6)}Z`); earB.setAttribute('d', `M${f(hx + 4)} ${f(hy - 2)} L${f(hx + 3.4)} ${f(hy - 7.4)} L${f(hx + 0.4)} ${f(hy - 3.6)}Z`);
    catPatch.setAttribute('d', oval(bcx - brx * 0.3, bcy - bry * 0.3, brx * 0.32, bry * 0.28));
    const flick = a > 0.9 ? Math.sin(t * 7) * 3 : 0;
    catTail.setAttribute('d', a < 0.5 ? `M${f(cx - 10)} ${by - 2} Q${f(cx - 16)} ${by + 2} ${f(cx - 6)} ${by + 1.4}` : `M${f(cx - 6)} ${by - 3} Q${f(cx - 15 + flick)} ${by - 5} ${f(cx - 12 + flick * 1.4)} ${by - 15}`);
    catEyes.setAttribute('d', a < 0.5 ? `M${f(hx - 2.6)} ${f(hy + 0.4)} q1.2 1 2.4 0 M${f(hx + 0.8)} ${f(hy + 0.4)} q1.2 1 2.4 0` : `M${f(hx - 2)} ${f(hy - 0.4)} l0.1 0.1 M${f(hx + 2)} ${f(hy - 0.4)} l0.1 0.1`);
    catMouth.setAttribute('d', yawn > 0.02 ? oval(hx + 0.2, hy + 2.6, 1.4, 0.4 + yawn * 1.5) : ''); catMouth.setAttribute('opacity', yawn > 0.02 ? '1' : '0');
  }
  // birds
  birds.forEach((b) => {
    b.t += dt;
    if (b.st === 'perch') {
      const [wx, wy] = wireAt(b.u); b.x = wx; b.y = wy;
      if (b.alpha < 1) b.alpha = Math.min(1, b.alpha + dt * 0.9);
      b.nextHop -= dt; if (b.nextHop <= 0) { b.nextHop = rnd(1, 4); if (Math.random() < 0.35) b.dir = (b.dir * -1) as 1 | -1; else b.hop = 0; }
      let hy = 0; if (b.hop >= 0) { b.hop += dt; hy = -Math.sin(Math.min(1, b.hop / 0.28) * Math.PI) * 2.4; if (b.hop > 0.3) b.hop = -1; }
      b.g.setAttribute('transform', `translate(${f(b.x)} ${f(b.y + hy)}) scale(${b.dir} 1)`); b.wings.setAttribute('d', ''); b.legs.setAttribute('opacity', '1');
      b.head.setAttribute('transform', `translate(0 ${f(Math.max(0, Math.sin(t * 0.9 + b.u * 20) - 0.75) * 7)})`);
      b.g.setAttribute('opacity', f(b.alpha));
      if (wv > 2.1 && Math.random() < dt * 0.4) scatter(b.x);
    } else if (b.st === 'fly') {
      b.x += b.vx * dt; b.y += b.vy * dt; b.vy += 22 * dt * 0.2; const fl = Math.sin(b.t * 24);
      b.g.setAttribute('transform', `translate(${f(b.x)} ${f(b.y)}) scale(${b.dir} 1) rotate(${f(-14)})`); b.legs.setAttribute('opacity', '0');
      b.wings.setAttribute('d', `M-1 -6 Q${f(-4)} ${f(-6 - 9 * fl)} ${f(-9)} ${f(-5 - 11 * fl)} M1 -6 Q${f(3)} ${f(-6 - 9 * fl)} ${f(7)} ${f(-4 - 10 * fl)}`);
      if (b.x < -30 || b.x > W + 30 || b.y < -20) { b.st = 'away'; b.t = 0; b.g.setAttribute('opacity', '0'); }
    } else if (b.t > rnd(4, 7) && wet < 0.2) { b.st = 'perch'; b.alpha = 0; b.hop = -1; b.nextHop = rnd(1, 3); }
  });
  // people
  spawnT -= dt; if (spawnT <= 0) { spawnT = rnd(9, 15) * (1 + P.night * 1.2); if (people.length < 5) spawn(); }
  for (let i = people.length - 1; i >= 0; i--) { const p = people[i]; p.update(t, dt, P); if (p.dead) { p.remove(); people.splice(i, 1); } }
  [...people].sort((a, b) => a.lane - b.lane).forEach((p) => walkG.appendChild(p.g));
  visitorTick(dt);
  {
    const cap = visitor && !visitor.dead ? visitor.caption() : '';
    if (cap) tourTxt.textContent = cap;
    tourTxt.setAttribute('opacity', f(lerp(+tourTxt.getAttribute('opacity')!, cap ? 0.95 : 0, 1 - Math.exp(-dt * 6))));
    if (vw < W) {
      const want = visitor && !visitor.dead ? clamp(visitor.x - vw * 0.42, 0, W - vw) : (W - vw) / 2;
      camX = lerp(camX, want, 1 - Math.exp(-dt * 2.2)); applyCam();
    }
  }
  // fireflies
  flies.forEach((fl) => { const x = fl.x + wobble(t * 0.3 + fl.ph) * 22, y = fl.y + wobble(t * 0.27 + fl.ph * 2) * 12; fl.c.setAttribute('cx', f(x)); fl.c.setAttribute('cy', f(y)); fl.c.setAttribute('opacity', f(smooth(0.5, 0.9, P.night) * (0.35 + 0.65 * Math.max(0, Math.sin(t * fl.k * 2 + fl.ph))))); });
  // clock
  const hh = tau * 24, h = Math.floor(hh), m = Math.floor((hh - h) * 60);
  clock.textContent = `DOCS QUARTER · ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  hint.setAttribute('opacity', f(hinted ? 0.6 : Math.max(0, +hint.getAttribute('opacity')! - dt * 0.8)));
}, { watch: svg });
