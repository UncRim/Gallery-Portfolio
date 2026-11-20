// Page loader: "holding the bridge". Denelsen braces a plank between two blocks, IT infrastructure on the left
// and design on the right. Packets of infrastructure slide across his hands, turn into documents, and land as
// finished sections of a layout. Runs once per browser session; skip with the button, Esc or Enter.
import { el, pen, shape, blot, paint, limb, solid, joint, shoe, place, inkDefs, f, PEN, PAPER } from './lib/ink.ts';
import type { Vec } from './lib/ink.ts';
import { pendulum, ease, clamp, lerp, smooth, seeded } from './lib/motion.ts';

const boot = document.getElementById('boot'), host = document.getElementById('bootSvg');
if (boot && host) {
  const VW = 560, VH = 300, PT = 150, FY = 265, FX = 280, CL = 150, CR = 410, SP = 0.9, FS = 1.12;
  const GREEN = '#1a6b4a', PAPERC = '#fdfcf8', INKC = '#1c1c1c', MONO = "'IBM Plex Mono', ui-monospace, monospace";
  const MSG = ['Infrastructure, decoded.', 'Plain-language steps.', 'Laid out for the people using it.', 'Connected. Opening the docs.'];
  const mixHex = (a: string, b: string, t: number) => { const h = (s: string, i: number) => parseInt(s.slice(i, i + 2), 16); return `rgb(${[1, 3, 5].map((i) => Math.round(h(a, i) + (h(b, i) - h(a, i)) * t)).join(',')})`; };
  const svg = el('svg', { viewBox: `0 0 ${VW} ${VH}`, role: 'img', 'aria-label': 'A designer holds up a plank bridging two blocks, IT infrastructure and design. Packets from the infrastructure side cross his hands, turn into documents and land as finished sections of a layout.' }) as SVGSVGElement;
  const { filter } = inkDefs(svg, 'bt'); host.appendChild(svg);
  const scene = el('g', { filter }, svg), back = el('g', {}, scene), figG = el('g', {}, scene), plankG = el('g', {}, scene), pktG = el('g', {}, scene), fx = el('g', {}, scene);
  const sr = seeded(7);
  const P0 = (p: Element, d: string, w = SP) => { const n = pen(p, w); n.setAttribute('d', d); return n; };
  const S0 = (p: Element, d: string, w = SP) => { const n = shape(p, w); n.setAttribute('d', d); return n; };
  const T0 = (p: Element, x: number, y: number, s: string, size: number, o: Record<string, string | number> = {}) => { const n = el('text', { x, y, 'font-size': size, 'font-family': MONO, fill: INKC, ...o }, p); n.textContent = s; return n; };
  const rr = (x: number, y: number, w: number, h: number) => `M${f(x)} ${f(y)} h${f(w)} v${f(h)} h${f(-w)}Z`;

  // ---- the two blocks and the chasm between them
  const lb = paint(back, '#e6ecec', SP); lb.setAttribute('d', `M-4 ${PT} L${CL} ${PT} L${CL} ${FY} L-4 ${FY}Z`);
  const rb = paint(back, '#f1ecdf', SP); rb.setAttribute('d', `M${CR} ${PT} L${VW + 4} ${PT} L${VW + 4} ${FY} L${CR} ${FY}Z`);
  P0(back, `M0 ${FY} L${VW} ${FY}`, SP * 1.2);
  P0(back, Array.from({ length: 27 }, (_, i) => `M${f(i * 21 + sr(0, 8))} ${FY} l0 5`).join(' '), SP * 0.4);
  P0(back, Array.from({ length: 10 }, () => { const x = sr(160, 400); return `M${f(x)} ${FY} q-1 -3 -3 -4 M${f(x)} ${FY} q1 -4 2 -6`; }).join(' '), SP * 0.45);
  P0(back, `M8 ${FY - 14} q34 -3 70 0 M70 ${FY - 8} q30 -2 60 0`, SP * 0.4); P0(back, `M${CR + 14} ${FY - 12} q38 -3 76 0`, SP * 0.4);
  T0(back, 75, 190, 'IT INFRASTRUCTURE', 9.5, { 'text-anchor': 'middle', 'letter-spacing': 1, 'font-weight': 500 });
  T0(back, 75, 200, 'servers · networks · cloud', 6.4, { 'text-anchor': 'middle', opacity: 0.7 });
  T0(back, 485, 190, 'DESIGN', 9.5, { 'text-anchor': 'middle', 'letter-spacing': 1.4, 'font-weight': 500 });
  T0(back, 485, 200, 'type · layout · people', 6.4, { 'text-anchor': 'middle', opacity: 0.7 });
  T0(back, 16, 226, '> ping docs', 8, { opacity: 0.8 });
  const cursor = el('rect', { x: 16 + 11 * 4.9, y: 219.5, width: 4.4, height: 8, fill: INKC }, back);
  T0(back, 424, 238, 'Aa', 26, { 'font-family': "'Fraunces Variable', Georgia, serif", 'font-weight': 600 });
  [GREEN, '#9a5a1e', INKC].forEach((c, i) => { const n = shape(back, SP * 0.8); n.classList.remove('pp'); n.setAttribute('fill', c); n.setAttribute('d', rr(472 + i * 15, 216, 11, 11)); });

  // ---- infrastructure: a server rack and a cloud
  S0(back, `M30 52 L92 52 L92 ${PT} L30 ${PT}Z`, SP * 1.1);
  const leds: SVGElement[] = [];
  for (let i = 0; i < 6; i++) {
    const y = 58 + i * 15.2; S0(back, rr(34, y, 54, 11), SP * 0.7); P0(back, `M40 ${f(y + 4)} L62 ${f(y + 4)} M40 ${f(y + 7)} L56 ${f(y + 7)}`, SP * 0.4);
    [75, 82].forEach((lx) => leds.push(el('circle', { cx: lx, cy: f(y + 5.5), r: 1.7, fill: '#c3cbc4', stroke: INKC, 'stroke-width': SP * 0.4 }, back)));
  }
  S0(back, 'M42 38 q-9 0 -9 -8 q0 -8 9 -8 q3 -8 12 -4 q5 -6 12 0 q9 -1 9 8 q0 8 -8 8Z', SP);
  P0(back, 'M62 40 L62 51', SP * 0.7).setAttribute('stroke-dasharray', '2 2.5');

  // ---- design: a layout that fills in as documents arrive
  const AX = 470, AY = 54, AW = 78, AH = 96;
  const abFrame = S0(back, `M${AX} ${AY + 4} Q${AX} ${AY} ${AX + 4} ${AY} L${AX + AW - 4} ${AY} Q${AX + AW} ${AY} ${AX + AW} ${AY + 4} L${AX + AW} ${AY + AH} L${AX} ${AY + AH}Z`, SP * 1.1);
  P0(back, [6, 11, 16].map((o) => `M${AX + o - 1} ${AY + 5} a1 1 0 1 0 2 0 a1 1 0 1 0 -2 0`).join(' '), SP * 0.5);
  const R = (x: number, y: number, w: number, h: number) => [AX + x, AY + y, w, h] as const;
  const REG = [
    { rects: [R(6, 12, 66, 8)], detail: 'M10 16 L22 16 M28 16 L38 16 M44 16 L52 16', c: [AX + 39, AY + 16] },
    { rects: [R(6, 26, 46, 14)], detail: 'M10 31 L46 31 M10 36 L34 36', c: [AX + 29, AY + 33] },
    { rects: [R(6, 46, 66, 24)], detail: 'M10 66 L26 54 L36 62 L44 56 L68 66 M61 52 a2.2 2.2 0 1 0 0.01 0', c: [AX + 39, AY + 58] },
    { rects: [R(6, 76, 31, 16), R(41, 76, 31, 16)], detail: 'M10 82 L32 82 M10 86.5 L26 86.5 M45 82 L67 82 M45 86.5 L61 86.5', c: [AX + 39, AY + 84] },
  ].map((r) => {
    const ghost = P0(back, r.rects.map((q) => rr(q[0], q[1], q[2], q[3])).join(' '), SP * 0.6); ghost.setAttribute('stroke-dasharray', '2 2.4'); ghost.setAttribute('opacity', '0.55');
    const fill = paint(back, '#cfe3d8', SP * 0.8); fill.setAttribute('d', r.rects.map((q) => rr(q[0], q[1], q[2], q[3])).join(' ')); fill.setAttribute('opacity', '0');
    const d = P0(back, r.detail.replace(/([ML]) ?(-?[\d.]+) (-?[\d.]+)/g, (_m, c, a, b) => `${c}${AX + parseFloat(a)} ${AY + parseFloat(b)}`).replace(/a2\.2 2\.2/, 'a2.2 2.2'), SP * 0.5); d.setAttribute('opacity', '0');
    return { ...r, ghost, fill, d, done: -1 };
  });
  const badge = el('g', { opacity: 0 }, back);
  el('circle', { cx: 0, cy: 0, r: 7.5, fill: GREEN, stroke: INKC, 'stroke-width': SP * 0.8 }, badge);
  const bt = pen(badge, SP * 1.5); bt.setAttribute('stroke', PAPERC); bt.setAttribute('d', 'M-3.4 0.2 L-1 2.8 L3.6 -2.6');

  // ---- the plank (wood), with sag under load but none at his hands
  const PX0 = 112, PX1 = 448;
  const plank = paint(plankG, '#d8c69b', SP), grain = pen(plankG, SP * 0.45);
  type Pk = { rel: number; x: number; state: 'wait' | 'plank' | 'fly' | 'done'; fly0: number; fy: number; crossed: number; g: SVGGElement; body: SVGPathElement; bits: SVGPathElement; lines: SVGPathElement; dot: SVGElement };
  const pk: Pk[] = [0, 1, 2, 3].map((i) => {
    const g = el('g', { opacity: 0 }, pktG), body = shape(g, SP), bits = blot(g), lines = pen(g, SP * 0.5), dot = el('circle', { r: 1.7, fill: GREEN }, g);
    return { rel: 0.35 + i * 0.5, x: 100, state: 'wait', fly0: 0, fy: 0, crossed: -1, g, body, bits, lines, dot };
  });
  const sag = (x: number) => {
    let s = 0; for (const k of pk) if (k.state === 'plank') { const d = x - k.x; s += 2.8 * Math.exp(-(d * d) / (26 * 26)); }
    return s * (1 - Math.exp(-(((x - FX) / 14) ** 2))) * smooth(CL, CL + 26, x) * smooth(CR, CR - 26, x);
  };
  const ytop = (x: number) => lerp(PT, PT - 8 + sag(x), smooth(PX0 - 8, PX0 + 2, x));
  const spark = pen(fx, SP * 0.9); spark.setAttribute('stroke', GREEN);

  // ---- Denelsen (adult proportions): arms up, holding the plank over his head
  const g = el('g', {}, figG);
  const farArm = solid(limb(g, 3.6), '#3b4b5a'), legs = [solid(limb(g, 4.2), '#2a3540'), solid(limb(g, 4.2), '#2a3540')], shoes = [blot(g), blot(g)];
  const coat = paint(g, '#3b4b5a'), seam = pen(g, PEN * 0.6);
  const head = el('ellipse', { rx: 3.6, ry: 4.6, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN }, g), hair = blot(g);
  const lan = el('g', {}, g), lanyard = pen(lan, PEN * 0.6), tag = paint(lan, GREEN, PEN * 0.7), tagLine = pen(lan, PEN * 0.45); tagLine.setAttribute('stroke', PAPERC);
  const nearArm = solid(limb(g, 3.6), '#3b4b5a');
  const tagSwing = pendulum(14, 1.6);
  const label = document.getElementById('bootLabel')!, count = document.getElementById('bootCount')!, bar = document.getElementById('bootBar')! as HTMLElement;
  let t = 0, landed = 0, tAll = -1, raf = 0, prev = 0, lastFlex = 0, gone = false;
  const V = 420, FLY = 0.32;

  function frame(dt: number) {
    t += dt;
    // packets: slide along the plank, change into documents over his hands, hop to their slot in the layout
    pk.forEach((k, i) => {
      if (k.state === 'wait' && t >= k.rel) k.state = 'plank';
      if (k.state === 'plank') {
        k.x = 100 + V * (t - k.rel);
        if (k.crossed < 0 && k.x > FX) k.crossed = t;
        if (k.x > 452) { k.state = 'fly'; k.fly0 = t; k.fy = ytop(452) - 7; }
      }
      if (k.state === 'fly') {
        const u = clamp((t - k.fly0) / FLY, 0, 1), c = REG[i].c;
        k.g.setAttribute('transform', `translate(${f(lerp(452, c[0], u))} ${f(lerp(k.fy, c[1], ease(u)) - 20 * Math.sin(Math.PI * u))}) scale(${f(lerp(1, 0.8, u))})`);
        if (u >= 1) { k.state = 'done'; k.g.setAttribute('opacity', '0'); REG[i].done = t; landed++; label.textContent = MSG[landed - 1]; count.textContent = `${landed} / 4`; if (landed === 4) tAll = t; }
      } else if (k.state === 'plank') {
        const m = smooth(250, 312, k.x), h = lerp(11, 15, m), y = ytop(k.x) - h / 2;
        k.g.setAttribute('opacity', '1'); k.g.setAttribute('transform', `translate(${f(k.x)} ${f(y)})`);
        k.body.setAttribute('d', rr(-5.5, -h / 2, 11, h));
        k.bits.setAttribute('d', [[-3.4, -3.4], [0.6, -3.4], [-3.4, 0.6], [0.6, 0.6]].map(([a, b]) => rr(a, b, 2.8, 2.8)).join(' ')); k.bits.setAttribute('opacity', f(1 - m));
        k.lines.setAttribute('d', `M-3 -1.4 L3 -1.4 M-3 1.6 L3 1.6 M-3 4.6 L1 4.6`); k.lines.setAttribute('opacity', f(m));
        k.dot.setAttribute('cx', '-3'); k.dot.setAttribute('cy', f(-h / 2 + 3.2)); k.dot.setAttribute('opacity', f(m));
      }
    });
    // plank with sag
    const N = 28, top: string[] = [], bot: string[] = [], gr: string[] = [];
    for (let i = 0; i <= N; i++) { const x = PX0 + ((PX1 - PX0) * i) / N, s = sag(x); top.push(`${f(x)} ${f(PT - 8 + s)}`); bot.unshift(`${f(x)} ${f(PT + s)}`); gr.push(`${f(x)} ${f(PT - 4.6 + s)}`); }
    plank.setAttribute('d', 'M' + top.join('L') + 'L' + bot.join('L') + 'Z'); grain.setAttribute('d', 'M' + gr.join('L'));
    // his effort: the packets weigh on him, so he flexes and his arms straighten
    let load = 0; pk.forEach((k) => { if (k.state === 'plank') load += Math.exp(-(((k.x - FX) / 70) ** 2)); });
    const flex = 0.8 + 3.2 * clamp(load, 0, 1) + Math.sin(t * 2.2) * 0.35 - (tAll >= 0 ? 0.8 * ease(clamp((t - tAll) / 0.5, 0, 1)) : 0);
    place(g, FX, FY, 1, FS);
    const hip: Vec = [41, 73.2 + flex], ankles: Vec[] = [[35, 118.4], [47, 118.4]];
    ankles.forEach((a, i) => { legs[i].draw([hip, joint(hip, a, 23, 23, 1), a], [0.3, 0.8]); shoe(shoes[i], a, 0); });
    g.insertBefore(legs[1].g, coat); g.insertBefore(shoes[1], coat);
    const sh: Vec = [41, 43 + flex], hy = 92 + flex * 0.7;
    coat.setAttribute('d', `M${f(sh[0] - 6)} ${f(sh[1] + 1)} Q${f(sh[0] - 1)} ${f(sh[1] - 2.4)} ${f(sh[0] + 5)} ${f(sh[1] + 1)} L${f(sh[0] + 5.4)} ${f(70 + flex)} Q${f(sh[0] + 6.6)} ${f(82 + flex)} ${f(sh[0] + 5)} ${f(hy)} L${f(sh[0] - 8)} ${f(hy + 0.5)} L${f(sh[0] - 6.4)} ${f(70 + flex)}Z`);
    seam.setAttribute('d', `M${f(sh[0] + 2.6)} ${f(sh[1] + 4)} L${f(sh[0] + 3.8)} ${f(66 + flex)}`);
    const hc: Vec = [42.6, 31.6 + flex];
    head.setAttribute('cx', f(hc[0])); head.setAttribute('cy', f(hc[1]));
    hair.setAttribute('d', `M${f(hc[0] - 4)} ${f(hc[1] - 0.6)} Q${f(hc[0] - 4.4)} ${f(hc[1] - 6)} ${f(hc[0] + 0.6)} ${f(hc[1] - 5.8)} Q${f(hc[0] + 4.4)} ${f(hc[1] - 5.2)} ${f(hc[0] + 4.1)} ${f(hc[1] - 0.8)} Q${f(hc[0] + 2)} ${f(hc[1] - 3.6)} ${f(hc[0] - 4)} ${f(hc[1] - 0.6)}Z`);
    const shF: Vec = [sh[0] - 1, sh[1] + 2], shN: Vec = [sh[0] + 1.6, sh[1] + 2.4], hF: Vec = [30.5, 17], hN: Vec = [51.5, 17];
    farArm.draw([shF, joint(shF, hF, 17, 16, -1), hF], [0.2, 0.5]); nearArm.draw([shN, joint(shN, hN, 17, 16, 1), hN], [0.2, 0.4]);
    // ID badge on a lanyard swings with the effort
    const ang = tagSwing.step(-(flex - lastFlex) / Math.max(dt, 0.008) * 0.8, dt); lastFlex = flex;
    const nx = hc[0] + 0.4, ny = hc[1] + 4.8;
    lan.setAttribute('transform', `rotate(${f(ang * 57.3)} ${f(nx)} ${f(ny)})`);
    lanyard.setAttribute('d', `M${f(nx - 2.6)} ${f(ny - 0.4)} L${f(nx + 0.4)} ${f(ny + 10.6)} L${f(nx + 3)} ${f(ny - 0.2)}`);
    tag.setAttribute('d', rr(nx - 2.2, ny + 10.6, 5.2, 7)); tagLine.setAttribute('d', `M${f(nx - 1)} ${f(ny + 13)} L${f(nx + 1.8)} ${f(ny + 13)} M${f(nx - 1)} ${f(ny + 15)} L${f(nx + 1)} ${f(ny + 15)}`);

    // sparkle where documents are born, over his hands
    let sp = ''; pk.forEach((k) => { if (k.crossed >= 0) { const u = (t - k.crossed) / 0.5; if (u < 1) for (let j = 0; j < 6; j++) { const a = -Math.PI * (0.12 + 0.76 * j / 5), r0 = 8 + u * 12; sp += `M${f(FX + Math.cos(a) * r0)} ${f(PT - 14 + Math.sin(a) * r0)} L${f(FX + Math.cos(a) * (r0 + 5 * (1 - u)))} ${f(PT - 14 + Math.sin(a) * (r0 + 5 * (1 - u)))}`; } } });
    spark.setAttribute('d', sp);
    // rack LEDs and cursor
    leds.forEach((l, i) => l.setAttribute('fill', Math.sin(t * (2.2 + i * 0.55) + i * 1.9) > 0.15 ? GREEN : '#c3cbc4'));
    cursor.setAttribute('opacity', Math.sin(t * 5) > 0 ? '1' : '0');
    // the layout fills in
    REG.forEach((r) => { const k = r.done < 0 ? 0 : ease(clamp((t - r.done) / 0.35, 0, 1)); r.fill.setAttribute('opacity', f(k)); r.d.setAttribute('opacity', f(k)); r.ghost.setAttribute('opacity', f(0.55 * (1 - k))); });
    if (tAll >= 0) {
      const k = ease(clamp((t - tAll - 0.1) / 0.3, 0, 1)); badge.setAttribute('opacity', f(k)); badge.setAttribute('transform', `translate(${AX + AW - 2} ${AY - 2}) scale(${f(0.4 + 0.6 * k)})`);
      abFrame.classList.remove('pp'); abFrame.setAttribute('fill', mixHex(PAPERC, '#e3f0e8', k)); abFrame.setAttribute('stroke', mixHex(INKC, GREEN, k));
    }
    // progress
    const prog = pk.reduce((a, k) => a + (k.state === 'done' ? 1 : k.state === 'fly' ? 0.94 : k.state === 'plank' ? clamp((k.x - 100) / 352, 0, 1) * 0.92 : 0), 0) / 4;
    bar.style.transform = `scaleX(${f(prog)})`;
    if (tAll >= 0 && t - tAll > 0.6) done();
  }

  function done() {
    if (gone) return; gone = true; cancelAnimationFrame(raf);
    boot!.classList.add('done'); document.documentElement.classList.remove('booting');
    (window as unknown as { __bootRelease?: () => void }).__bootRelease?.();
    try { sessionStorage.setItem('dd-boot', '1'); } catch (e) {}
    setTimeout(() => boot!.remove(), 520);
  }
  const tick = (now: number) => { const dt = Math.min(0.05, (now - prev) / 1000); prev = now; frame(dt); raf = requestAnimationFrame(tick); };
  label.textContent = 'Holding the bridge between infrastructure and design.';
  frame(0.001); prev = performance.now(); raf = requestAnimationFrame(tick);
  document.getElementById('bootSkip')?.addEventListener('click', done);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'Enter') done(); });
  setTimeout(done, 8000); // safety net
  (window as any).__boot = { skip: done };
}
