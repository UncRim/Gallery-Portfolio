// The theme switch: a pull cord hanging from the top of the page, in the same ink as the scene.
// A short verlet chain (coupled pendulums) with wind from the pointer; pull it to flip light and dark.
import { el, pen, shape, blot, inkDefs, f } from './lib/ink.ts';
import { spring, pointerWind, clamp } from './lib/motion.ts';

const host = document.getElementById('ropeSvg'), btn = document.getElementById('theme');
if (host && btn) {
  const VW = 34, VH = 124, AX = 17, N = 9, L = 8.2, REST = N * L, SP = 0.9;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const svg = el('svg', { viewBox: `0 0 ${VW} ${VH}`, width: VW, height: VH, 'aria-hidden': 'true' }) as SVGSVGElement;
  const { filter } = inkDefs(svg, 'rp'); svg.style.color = ''; host.appendChild(svg);
  const g = el('g', { filter }, svg);
  // ceiling mount
  pen(g, SP * 1.6).setAttribute('d', `M${AX - 7} 0.8 L${AX + 7} 0.8`);
  el('circle', { cx: AX, cy: 3.4, r: 1.9, fill: 'none', stroke: 'currentColor', 'stroke-width': SP }, g);
  const ropeA = pen(g, SP), ropeB = pen(g, SP), twist = pen(g, SP * 0.55);
  const ropeHit = pen(g, 16); ropeHit.setAttribute('stroke', 'transparent'); ropeHit.setAttribute('pointer-events', 'stroke'); ropeHit.style.cursor = 'grab';
  // handle: collar, bead with a sun/moon, tassel
  const hg = el('g', {}, g);
  const tassel = pen(hg, SP * 0.8);
  shape(hg, SP * 0.9).setAttribute('d', 'M-2 0.4 L2 0.4 L2.4 3.4 L-2.4 3.4Z');
  const bead = shape(hg, SP); bead.setAttribute('d', 'M0 3 a5.4 5.4 0 1 0 0.01 0Z');
  const moon = blot(hg); moon.setAttribute('d', 'M2 5.4 A3 3 0 1 0 2 11 A3.4 3.4 0 0 1 2 5.4Z');
  const sun = pen(hg, SP * 0.7); sun.setAttribute('d', 'M0 6.6 a1.6 1.6 0 1 0 0.01 0Z M0 4.4 L0 5 M0 11 L0 11.6 M-3.2 8 L-2.6 8 M2.6 8 L3.2 8 M-2.2 5.8 L-1.8 6.2 M1.8 9.8 L2.2 10.2 M2.2 5.8 L1.8 6.2 M-1.8 9.8 L-2.2 10.2');
  const hit = el('circle', { cx: 0, cy: 9, r: 13, fill: 'transparent', 'pointer-events': 'all', style: 'cursor:grab' }, hg);
  const setGlyph = (dark: boolean) => { sun.style.display = dark ? '' : 'none'; moon.style.display = dark ? 'none' : ''; };
  const root = document.documentElement;
  setGlyph(root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  window.addEventListener('rope:theme', (e: any) => setGlyph(!!e.detail?.dark));

  type P = { x: number; y: number; px: number; py: number };
  const pts: P[] = Array.from({ length: N + 1 }, (_, i) => ({ x: AX, y: i * L, px: AX, py: i * L }));
  const wind = pointerWind(document, 0.3), sway = spring(25, 4);
  let dragging = false, moved = 0, lastPull = 0; const target = { x: AX, y: REST };

  function pull() {
    const now = performance.now(); if (now - lastPull < 400) return; lastPull = now;
    window.dispatchEvent(new CustomEvent('rope:pull'));
  }
  function tug() { const e = pts[N]; e.py -= 1.4; e.px += 0.6; for (let i = 3; i < N; i++) pts[i].px += 0.15; }
  window.addEventListener('rope:tug', () => { if (!still) tug(); pull(); });
  btn.addEventListener('click', (e) => { if ((e as MouseEvent).detail === 0) { if (!still) tug(); pull(); } });

  const local = (e: PointerEvent) => { const r = svg.getBoundingClientRect(); return { x: ((e.clientX - r.left) / r.width) * VW, y: ((e.clientY - r.top) / r.height) * VH }; };
  const down = (e: PointerEvent) => { e.preventDefault(); e.stopPropagation(); dragging = true; moved = 0; (e.target as Element).setPointerCapture?.(e.pointerId); const l = local(e); target.x = clamp(l.x, AX - 9, AX + 9); target.y = clamp(l.y - 9, REST, REST + 26); btn.style.cursor = 'grabbing'; };
  const move = (e: PointerEvent) => { if (!dragging) return; const l = local(e); moved += Math.abs(l.x - target.x) + Math.abs(l.y - 9 - target.y); target.x = clamp(l.x, AX - 9, AX + 9); target.y = clamp(l.y - 9, REST, REST + 26); };
  const up = () => { if (!dragging) return; dragging = false; btn.style.cursor = ''; const pulled = pts[N].y - REST; if (moved < 3) { if (!still) tug(); pull(); } else if (pulled > 8) pull(); };
  [hit, ropeHit].forEach((n) => { n.addEventListener('pointerdown', down as any); n.addEventListener('pointermove', move as any); n.addEventListener('pointerup', up); n.addEventListener('pointercancel', up); });

  function sim(dt: number, t: number) {
    wind.step(t); const sub = 3, h = dt / sub;
    for (let s = 0; s < sub; s++) {
      for (let i = 1; i <= N; i++) {
        const p = pts[i], vx = (p.x - p.px) * 0.985, vy = (p.y - p.py) * 0.985; p.px = p.x; p.py = p.y;
        p.x += vx + wind.value * 240 * (0.35 + 0.65 * i / N) * h * h; p.y += vy + 1400 * h * h;
      }
      for (let k = 0; k < 8; k++) {
        pts[0].x = AX; pts[0].y = 0;
        if (dragging) { pts[N].x = target.x; pts[N].y = target.y; }
        for (let i = 0; i < N; i++) {
          const a = pts[i], b = pts[i + 1], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.0001, diff = (d - L) / d;
          const fixedA = i === 0, fixedB = dragging && i + 1 === N;
          if (fixedA && fixedB) continue;
          if (fixedA || (!fixedB && false)) { b.x -= dx * diff; b.y -= dy * diff; }
          else if (fixedB) { a.x += dx * diff; a.y += dy * diff; }
          else { a.x += dx * diff * 0.5; a.y += dy * diff * 0.5; b.x -= dx * diff * 0.5; b.y -= dy * diff * 0.5; }
        }
      }
      if (dragging) { pts[N].px = pts[N].x; pts[N].py = pts[N].y; }
    }
  }
  function draw() {
    const A: string[] = [], B: string[] = [], tw: string[] = [], C: string[] = [];
    const nx: [number, number][] = [];
    for (let i = 0; i <= N; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(N, i + 1)], tx = b.x - a.x, ty = b.y - a.y, l = Math.hypot(tx, ty) || 1;
      nx.push([-ty / l, tx / l]);
    }
    const off = 1.25;
    for (let i = 0; i <= N; i++) { const p = pts[i], n = nx[i]; A.push(`${f(p.x + n[0] * off)} ${f(p.y + n[1] * off)}`); B.push(`${f(p.x - n[0] * off)} ${f(p.y - n[1] * off)}`); C.push(`${f(p.x)} ${f(p.y)}`); }
    for (let i = 0; i < N; i++) tw.push(`M${A[i]} L${B[i + 1]}`);
    ropeA.setAttribute('d', 'M' + A.join('L')); ropeB.setAttribute('d', 'M' + B.join('L')); twist.setAttribute('d', tw.join(' ')); ropeHit.setAttribute('d', 'M' + C.join('L'));
    const e = pts[N], q = pts[N - 1], ang = Math.atan2(e.x - q.x, e.y - q.y);
    hg.setAttribute('transform', `translate(${f(e.x)} ${f(e.y)}) rotate(${f((-ang * 180) / Math.PI)})`);
    const s = sway.step(clamp(-(e.x - e.px) * 5, -3.2, 3.2), 1 / 60);
    tassel.setAttribute('d', `M-1.6 13 Q${f(-1.8 + s)} 18 ${f(-2.4 + s * 1.6)} 23 M0 13 Q${f(s * 0.8)} 18 ${f(s * 1.4)} 24.4 M1.6 13 Q${f(1.8 + s)} 18 ${f(2.4 + s * 1.6)} 23`);
  }
  draw();
  if (!still) {
    let prev = performance.now();
    const tick = (now: number) => { const dt = Math.min(0.033, (now - prev) / 1000); prev = now; if (!document.hidden) { sim(dt, now / 1000); draw(); } requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }
  (window as any).__rope = { pts, pull, tug };
}
