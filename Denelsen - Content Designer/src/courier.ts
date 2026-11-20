// Marketplace courier. Lives in the "What I'm writing now" card: a child courier runs a parcel of docs
// past the IBM.com, AWS and Azure marketplace stops. Each stop ticks green as he passes, and when all
// three are done a LISTED stamp lands. Then it holds a moment, fades, and the courier sets off again.
// The loop only runs while the card is on screen. With reduced motion it shows the finished stamp.
import { el, pen, shape, blot, paint, limb, shoe, place, inkDefs, f, PEN, PAPER } from './lib/ink.ts';
import { gait } from './lib/gait.ts';
import { spring, ease, clamp, lerp, seeded } from './lib/motion.ts';

const host = document.getElementById('routeSvg'), label = document.getElementById('routeLabel'), count = document.getElementById('routeCount'),
  bar = document.getElementById('routeBar'), stageEl = document.getElementById('stage');

if (host && label && count && bar && stageEl) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GREEN = '#1a6b4a', PAPERC = '#fdfcf8', INKC = '#1c1c1c', MONO = "'IBM Plex Mono', ui-monospace, monospace";
  const MSG = ['IBM.com marketplace: listed', 'AWS Marketplace: listed', 'Azure Marketplace: listed'];
  const IDLE = 'Parcel packed and ready to send.', RUNNING = 'Delivering the docs to three marketplaces.', FINAL = 'Listed on IBM.com, AWS and Azure.';
  const mixHex = (a: string, b: string, t: number) => { const h = (s: string, i: number) => parseInt(s.slice(i, i + 2), 16); return `rgb(${[1, 3, 5].map((i) => Math.round(h(a, i) + (h(b, i) - h(a, i)) * t)).join(',')})`; };

  type Ctl = { start(): void; resume(): void; stop(): void; final(): void; destroy(): void };
  let ctl = null as Ctl | null, wideNow = true, visible = false;

  function build(wide: boolean) {
    host!.innerHTML = '';
    const VW = wide ? 640 : 400, VH = 210, GROUND = 170, SC = 1.6, SP = 0.9, START = 46;
    const svg = el('svg', { viewBox: `0 0 ${VW} ${VH}`, role: 'img', 'aria-label': 'Courier delivering docs to IBM.com, AWS, and Azure marketplaces.' }) as SVGSVGElement;
    const { filter } = inkDefs(svg, 'cr'); host!.appendChild(svg);
    const scene = el('g', { filter }, svg), backG = el('g', {}, scene), figG = el('g', {}, scene), stampG = el('g', { opacity: 0 }, scene);
    const sr = seeded(5);
    const P0 = (p: Element, d: string, w = SP) => { const n = pen(p, w); n.setAttribute('d', d); return n; };

    // ground, grass, the parcel pile
    P0(backG, `M0 ${GROUND} L${VW} ${GROUND}`, SP * 1.2);
    P0(backG, Array.from({ length: Math.round(VW / 21) }, (_, i) => `M${f(i * 21 + sr(0, 8))} ${GROUND} l0 5`).join(' '), SP * 0.4);
    P0(backG, Array.from({ length: Math.round(VW / 38) }, () => { const x = sr(60, VW - 8); return `M${f(x)} ${GROUND} q-1 -4 -3 -5 M${f(x)} ${GROUND} q1 -5 2 -7`; }).join(' '), SP * 0.45);
    shape(backG, SP).setAttribute('d', `M10 ${GROUND} L10 ${GROUND - 10} L34 ${GROUND - 10} L34 ${GROUND}Z`);
    shape(backG, SP).setAttribute('d', `M14 ${GROUND - 10} L14 ${GROUND - 19} L32 ${GROUND - 19} L32 ${GROUND - 10}Z`);
    P0(backG, `M22 ${GROUND - 10} L22 ${GROUND} M19 ${GROUND - 15} L27 ${GROUND - 15}`, SP * 0.5);

    // three stops
    const STOPS = [{ x: VW * 0.22, a: 'IBM.COM' }, { x: VW * 0.42, a: 'AWS' }, { x: VW * 0.62, a: 'AZURE' }].map((s) => {
      P0(backG, `M${f(s.x)} ${GROUND} L${f(s.x)} 38`, SP * 1.1);
      const board = shape(backG, SP); board.classList.remove('pp'); board.setAttribute('fill', PAPERC);
      board.setAttribute('d', `M${f(s.x - 33)} 38 L${f(s.x + 33)} 38 L${f(s.x + 33)} 62 L${f(s.x - 33)} 62Z`);
      const t1 = el('text', { x: f(s.x), y: 51, 'text-anchor': 'middle', 'font-size': 10, 'letter-spacing': 1.2, 'font-weight': 500, 'font-family': MONO, fill: INKC }, backG); t1.textContent = s.a;
      const t2 = el('text', { x: f(s.x), y: 58.4, 'text-anchor': 'middle', 'font-size': 4.6, 'letter-spacing': 1.1, 'font-family': MONO, fill: '#4b5a52' }, backG); t2.textContent = 'MARKETPLACE';
      const box = shape(backG, SP); box.setAttribute('d', `M${f(s.x - 7)} 86 L${f(s.x + 7)} 86 L${f(s.x + 7)} 100 L${f(s.x - 7)} 100Z`);
      const tick = pen(backG, SP * 1.8); tick.setAttribute('d', `M${f(s.x - 3.6)} 93.4 L${f(s.x - 0.8)} 96.8 L${f(s.x + 4.2)} 89.6`); tick.setAttribute('stroke', GREEN);
      const len = 14; tick.setAttribute('stroke-dasharray', String(len)); tick.setAttribute('stroke-dashoffset', String(len));
      return { ...s, board, t1, t2, tick, len, done: -1 };
    });

    // the LISTED stamp (lands after the third stop)
    const SX = VW * (wide ? 0.85 : 0.84), SY = 100, SWd = wide ? 122 : 104, SH = 52;
    const stamp = el('g', {}, stampG);
    const sOuter = pen(stamp, SP * 2.4), sInner = pen(stamp, SP);
    sOuter.setAttribute('stroke', GREEN); sInner.setAttribute('stroke', GREEN);
    sOuter.setAttribute('d', `M${-SWd / 2} -${SH / 2 - 5} Q${-SWd / 2} -${SH / 2} ${-SWd / 2 + 5} -${SH / 2} L${SWd / 2 - 5} -${SH / 2} Q${SWd / 2} -${SH / 2} ${SWd / 2} -${SH / 2 - 5} L${SWd / 2} ${SH / 2 - 5} Q${SWd / 2} ${SH / 2} ${SWd / 2 - 5} ${SH / 2} L${-SWd / 2 + 5} ${SH / 2} Q${-SWd / 2} ${SH / 2} ${-SWd / 2} ${SH / 2 - 5}Z`);
    sInner.setAttribute('d', `M${-SWd / 2 + 5} ${-SH / 2 + 5} L${SWd / 2 - 5} ${-SH / 2 + 5} L${SWd / 2 - 5} ${SH / 2 - 5} L${-SWd / 2 + 5} ${SH / 2 - 5}Z`);
    const sT1 = el('text', { x: 0, y: 3.5, 'text-anchor': 'middle', 'font-size': 21, 'font-weight': 600, 'letter-spacing': 3, 'font-family': MONO, fill: GREEN }, stamp); sT1.textContent = 'LISTED';
    const sT2 = el('text', { x: 0, y: 16.5, 'text-anchor': 'middle', 'font-size': wide ? 6.2 : 5.4, 'letter-spacing': wide ? 1.3 : 0.9, 'font-family': MONO, fill: GREEN }, stamp); sT2.textContent = '3 OF 3 MARKETPLACES';
    const ring = el('circle', { cx: f(SX), cy: SY, r: 10, fill: 'none', stroke: GREEN, 'stroke-width': SP * 1.4, opacity: 0 }, scene);

    // courier (child proportions): parts, back to front
    const g = el('g', {}, figG);
    const farArm = limb(g, 3.0), legs = [limb(g, 3.5), limb(g, 3.5)], shoes = [blot(g), blot(g)];
    const coat = paint(g, GREEN), seam = pen(g, PEN * 0.6);
    const head = el('ellipse', { rx: 4.7, ry: 5.5, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, g);
    const cap = blot(g);
    const parcel = paint(g, '#c9a25a', PEN * 0.8), tape = pen(g, PEN * 0.6), doc = pen(g, PEN * 0.45);
    const nearArm = limb(g, 3.0);
    const lines = pen(backG, SP * 0.8);
    const kid = gait({ kind: 'run' }), armSpring = spring(70, 9), stampSpring = spring(190, 12, 1.9);
    let phase = 0, x = START, t = 0, runT = 0, stampT = -1, shown = 0, raf = 0, prev = 0, holdT = 0, fadeT = 0, loop = false;

    function paintStops() {
      STOPS.forEach((s) => {
        const k = s.done < 0 ? 0 : ease(clamp((t - s.done) / 0.4, 0, 1));
        s.tick.setAttribute('stroke-dashoffset', f(s.len * (1 - k)));
        s.board.setAttribute('fill', mixHex(PAPERC, GREEN, k)); s.t1.setAttribute('fill', mixHex(INKC, PAPERC, k)); s.t2.setAttribute('fill', mixHex(INKC, PAPERC, k));
      });
    }
    function drawCourier(dt: number, go: number) {
      place(g, x, GROUND, 1, SC);
      const p = kid.pose(phase, go), hy = p.hip[1], b = p.bob;
      p.feet.forEach((fo, i) => { legs[i].draw([p.hip, fo.knee, fo.ankle], [0.3, 0.8]); shoe(shoes[i], fo.ankle, fo.pitch); });
      g.insertBefore(legs[p.front].g, coat); g.insertBefore(shoes[p.front], coat);
      const sy = hy - 22, sx = 44;
      coat.setAttribute('d', `M${f(sx - 6)} ${f(sy + 1)} Q${f(sx - 1)} ${f(sy - 2.4)} ${f(sx + 5)} ${f(sy + 1)} L${f(sx + 5.6)} ${f(hy - 4)} Q${f(sx + 6.6)} ${f(hy + 3)} ${f(sx + 5)} ${f(hy + 7)} L${f(sx - 8)} ${f(hy + 7.5)} L${f(sx - 6.4)} ${f(hy - 4)}Z`);
      seam.setAttribute('d', `M${f(sx + 2.4)} ${f(sy + 4)} L${f(sx + 3.2)} ${f(hy + 4)}`);
      const hx = sx + 1.4, hyc = sy - 8.4;
      head.setAttribute('cx', f(hx)); head.setAttribute('cy', f(hyc));
      cap.setAttribute('d', `M${f(hx - 5)} ${f(hyc - 1.8)} Q${f(hx - 4.8)} ${f(hyc - 7.4)} ${f(hx + 0.8)} ${f(hyc - 7.4)} Q${f(hx + 5)} ${f(hyc - 7)} ${f(hx + 5)} ${f(hyc - 2.4)} L${f(hx + 9.2)} ${f(hyc - 2)} L${f(hx + 9.2)} ${f(hyc - 0.8)} L${f(hx - 5)} ${f(hyc - 1)}Z`);
      const legSwing = (p.feet[0].ankle[0] - 40) / 8;
      const ang = armSpring.step(-clamp(legSwing, -1.4, 1.4) * 38 * go, dt);
      const shF: [number, number] = [sx - 1.6, sy + 2], rad = (d: number) => (d * Math.PI) / 180;
      const el1: [number, number] = [shF[0] + 9 * Math.sin(rad(ang)), shF[1] + 9 * Math.cos(rad(ang))];
      farArm.draw([shF, el1, [el1[0] + 9 * Math.sin(rad(ang + 85)), el1[1] + 9 * Math.cos(rad(ang + 85))]], [0.2, 0.5]);
      const shN: [number, number] = [sx + 1.8, sy + 2.4], hand: [number, number] = [shN[0] + 9.4, shN[1] + 9.2 + b * 0.25];
      const px = hand[0] + 1.4, py = hand[1] - 5.6;
      parcel.setAttribute('d', `M${f(px - 8)} ${f(py - 6)} L${f(px + 8)} ${f(py - 6)} L${f(px + 8)} ${f(py + 6)} L${f(px - 8)} ${f(py + 6)}Z`);
      tape.setAttribute('d', `M${f(px)} ${f(py - 6)} L${f(px)} ${f(py + 6)}`);
      doc.setAttribute('d', `M${f(px + 2.6)} ${f(py - 2.4)} L${f(px + 6.2)} ${f(py - 2.4)} M${f(px + 2.6)} ${f(py + 0.6)} L${f(px + 6.2)} ${f(py + 0.6)} M${f(px + 2.6)} ${f(py + 3.4)} L${f(px + 5)} ${f(py + 3.4)}`);
      nearArm.draw([shN, [shN[0] - 0.4, shN[1] + 9], hand], [0.2, 0.4]);
      let d = ''; if (go > 0.5) [70, 84, 98].forEach((yy, i) => { const o = ((t * 90 + i * 17) % 20); d += `M${f(x - 30 - o)} ${GROUND - yy * 0.8} L${f(x - 46 - o)} ${GROUND - yy * 0.8}`; });
      lines.setAttribute('d', d); lines.setAttribute('stroke-opacity', f(0.45 + Math.sin(t * 14) * 0.15));
    }
    function drawStamp(dt: number) {
      if (stampT < 0) { stampG.setAttribute('opacity', '0'); ring.setAttribute('opacity', '0'); return; }
      const u = t - stampT, sc = stampSpring.step(1, dt);
      stampG.setAttribute('opacity', f(clamp(u / 0.07, 0, 1)));
      stamp.setAttribute('transform', `translate(${f(SX)} ${SY}) rotate(-6) scale(${f(sc)})`);
      const r = clamp((u - 0.1) / 0.55, 0, 1); ring.setAttribute('r', f(18 + r * 60)); ring.setAttribute('opacity', f(r > 0 && r < 1 ? 0.5 * (1 - r) : 0));
    }
    function setProgress(p: number) { (bar as HTMLElement).style.transform = `scaleX(${clamp(p, 0, 1)})`; }
    function frame(dt: number) {
      t += dt;
      if (state === 'run') {
        runT += dt; const go = ease(clamp(runT / 0.45, 0, 1));
        phase += (dt / kid.period) * go; x += kid.speed * SC * dt * go;
        STOPS.forEach((s, i) => { if (s.done < 0 && x > s.x + 6) { s.done = t; shown = i + 1; label!.textContent = MSG[i]; count!.textContent = `${shown} / 3`; } });
        if (stampT < 0 && x > SX + SWd / 2 + 8 && shown === 3) { stampT = t; stampSpring.x = 1.9; stampSpring.v = 0; label!.textContent = FINAL; }
        setProgress(stampT >= 0 ? 1 : (x - START) / (SX - START));
        drawCourier(dt, go);
        if (x > VW + 50) g.setAttribute('display', 'none');
        scene.setAttribute('opacity', f(ease(clamp(runT / 0.35, 0, 1))));
        if (stampT >= 0 && t - stampT > 1.1 && x > VW + 50) { state = 'hold'; holdT = 0; }
      } else if (state === 'hold') {
        holdT += dt; if (holdT > 1.8) { state = 'fade'; fadeT = 0; }
      } else if (state === 'fade') {
        fadeT += dt; scene.setAttribute('opacity', f(1 - ease(clamp(fadeT / 0.35, 0, 1))));
        if (fadeT >= 0.35) start();
      }
      paintStops(); drawStamp(dt);
    }
    let state: 'idle' | 'run' | 'hold' | 'fade' | 'static' = 'idle';
    const tick = (now: number) => { if (!loop) return; const dt = Math.min(0.05, (now - prev) / 1000); prev = now; frame(dt); raf = requestAnimationFrame(tick); };
    function ensureLoop() { if (loop) return; loop = true; prev = performance.now(); raf = requestAnimationFrame(tick); }
    function stop() { loop = false; cancelAnimationFrame(raf); }

    function reset() {
      t = 0; runT = 0; x = START; phase = 0; stampT = -1; shown = 0; state = 'idle';
      STOPS.forEach((s) => { s.done = -1; }); g.removeAttribute('display'); scene.setAttribute('opacity', '1');
      label!.textContent = IDLE; count!.textContent = '0 / 3'; setProgress(0);
      drawCourier(0.016, 0); paintStops(); drawStamp(0.016);
    }
    function start() { reset(); state = 'run'; label!.textContent = RUNNING; scene.setAttribute('opacity', '0'); ensureLoop(); }
    function resume() { if (state === 'idle') start(); else if (state !== 'static') ensureLoop(); }
    function final() {
      stop(); state = 'static';
      STOPS.forEach((s) => { s.done = 0; }); t = 10; stampT = 0; stampSpring.x = 1; stampSpring.v = 0;
      g.setAttribute('display', 'none'); lines.setAttribute('d', ''); scene.setAttribute('opacity', '1'); paintStops(); drawStamp(0.016);
      stampG.setAttribute('opacity', '1'); stamp.setAttribute('transform', `translate(${f(SX)} ${SY}) rotate(-6)`); ring.setAttribute('opacity', '0');
      label!.textContent = FINAL; count!.textContent = '3 / 3'; setProgress(1);
    }
    reset();
    return { start, resume, stop, final, destroy() { stop(); host!.innerHTML = ''; } };
  }

  const mount = () => { wideNow = host.clientWidth >= 520 || host.clientWidth === 0; ctl = build(wideNow); if (still) ctl.final(); else if (visible) ctl.resume(); };
  mount();
  if (!still) {
    new IntersectionObserver((en) => {
      visible = en.some((e) => e.isIntersecting);
      if (visible) ctl?.resume(); else ctl?.stop();
    }, { threshold: 0.25 }).observe(stageEl);
  }
  new ResizeObserver(() => { const w = host.clientWidth >= 520; if (host.clientWidth && w !== wideNow) { ctl?.destroy(); mount(); } }).observe(host);
  (window as any).__courier = { start: () => ctl?.start(), final: () => ctl?.final() };
}
