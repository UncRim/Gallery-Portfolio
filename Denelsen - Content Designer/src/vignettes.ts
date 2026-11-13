// Small single-pen illustrations, one per case study. Same pen as the Docs Quarter: ink line, paper fill,
// one flat accent. Each draws itself in once when it scrolls into view; one part moves on hover.
// Usage: any element with data-vig="<slug>" gets its drawing. Call window.__mountVig(root) after rendering new ones.

type A = Record<string, string | number>;
const at = (a: A) => Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ');
// pen strokes draw in (pathLength 1); `f` = paper fill, `a` = accent fill, `ds` = dashed guide (fades in)
const D = (shape: string, a: A, i: number, cls = '') => `<${shape} class="d ${cls}" pathLength="1" style="--i:${i}" ${at(a)}/>`;
const F = (shape: string, a: A, cls = 'f') => `<${shape} class="${cls}" ${at(a)}/>`;
const P = (d: string, i: number, cls = '') => D('path', { d }, i, cls);
const R = (x: number, y: number, w: number, h: number, rx: number, i: number, cls = '') => D('rect', { x, y, width: w, height: h, rx }, i, cls);
const C = (cx: number, cy: number, r: number, i: number, cls = '') => D('circle', { cx, cy, r }, i, cls);
const S = (d: string, cls = 'ds') => `<path class="${cls}" d="${d}"/>`;
const HV = (dx: number, dy: number, inner: string) => `<g class="hv" style="--hx:${dx}px;--hy:${dy}px">${inner}</g>`;

const ART: Record<string, string> = {
  // a site that converts: browser, one clear button, proof card, a cursor that clicks it
  'tshaped-redesigned':
    F('rect', { x: 10, y: 10, width: 100, height: 66, rx: 5 }) + R(10, 10, 100, 66, 5, 0) + P('M10 22H110', 1) +
    C(17, 16, 1.2, 1) + C(23, 16, 1.2, 1) + C(29, 16, 1.2, 1) +
    P('M20 34H62', 2, 'm') + P('M20 41H50', 2, 'm') +
    F('rect', { x: 20, y: 52, width: 38, height: 12, rx: 6 }, 'a') + P('M31 58H47', 4, 'w') +
    R(74, 32, 28, 30, 3, 3) + P('M85 41L93 47L85 53Z', 4) + P('M79 58H97', 4, 'm') +
    HV(-24, -10, F('path', { d: 'M66 68v14l4-4 3 7 3-1.5-3-7h5.5Z' }) + P('M66 68v14l4-4 3 7 3-1.5-3-7h5.5Z', 6)),
  // a program page that answers first: page, proof chips, cap, a few connected nodes
  'katz-master-in-ai-program-page':
    F('rect', { x: 12, y: 10, width: 62, height: 68, rx: 4 }) + R(12, 10, 62, 68, 4, 0) + P('M12 24H74', 1) +
    P('M20 34H58', 2, 'm') + P('M20 41H46', 2, 'm') + R(20, 50, 18, 7, 3.5, 3) + R(42, 50, 18, 7, 3.5, 3) + P('M20 66H64', 3, 'm') +
    HV(0, -3, F('path', { d: 'M80 38L98 31L116 38L98 45Z' }) + P('M80 38L98 31L116 38L98 45Z', 4) + P('M88 41.5V50Q98 55 108 50V41.5', 5) + P('M116 38V49', 5, 'ac') + F('circle', { cx: 116, cy: 51.5, r: 1.9 }, 'a')) +
    P('M82 70L96 62L110 72', 6, 'm') + C(82, 70, 2.4, 7) + F('circle', { cx: 96, cy: 62, r: 2.9 }, 'a') + C(110, 72, 2.4, 7),
  // a locked clay model in a void: isometric building, window, flag, a beam of light
  'higher-ed-concept':
    S('M6 82H114', 'ds m') + S('M22 87H98', 'ds m') + S('M10 4L28 42M10 4L62 28', 'ds ac') +
    F('path', { d: 'M28 42L58 54V80L28 68Z' }) + F('path', { d: 'M58 54L92 40V66L58 80Z' }) + F('path', { d: 'M28 42L62 28L92 40L58 54Z' }) +
    P('M28 42L58 54V80L28 68Z', 0) + P('M58 54L92 40V66L58 80Z', 1) + P('M28 42L62 28L92 40L58 54Z', 2) +
    P('M33 52L45 57V65L33 60Z', 3) + P('M66 62L78 57V65L66 70Z', 3) + F('circle', { cx: 51, cy: 70.5, r: 2.4 }, 'a') +
    HV(0, -3, P('M62 28V15', 5) + F('path', { d: 'M62 15L73 18.5L62 22Z' }, 'a')),
  // pick a seat, see the view: stage, curved rows, one chosen seat with its sightline, a ticket
  'ticketmaster-spatial-seat-selection':
    F('rect', { x: 38, y: 10, width: 44, height: 7, rx: 2 }) + R(38, 10, 44, 7, 2, 0) +
    S('M60 55L41 18M60 55L79 18', 'ds ac') +
    P('M14 64Q60 30 106 64', 1) + P('M8 74Q60 34 112 74', 2) +
    C(28.8, 61.2, 1.7, 3, 'm') + C(44.4, 55.8, 1.7, 3, 'm') + C(75.6, 55.8, 1.7, 3, 'm') + C(91.2, 61.2, 1.7, 3, 'm') + F('circle', { cx: 60, cy: 55, r: 3.2 }, 'a') +
    HV(0, -4, F('rect', { x: 84, y: 77, width: 28, height: 11, rx: 2 }) + R(84, 77, 28, 11, 2, 5) + S('M98 79V86', 'ds')),
  // an exit ramp for doomscrolling: phone feed, a pause pill, and a door the arrow leads to
  'safescroll':
    F('rect', { x: 30, y: 8, width: 38, height: 72, rx: 7 }) + R(30, 8, 38, 72, 7, 0) + P('M44 13H54', 1, 'm') +
    R(36, 20, 26, 12, 2, 2) + R(36, 36, 26, 12, 2, 2) + R(36, 52, 26, 12, 2, 3) + C(41, 26, 2, 3, 'm') +
    F('rect', { x: 42, y: 68, width: 14, height: 6, rx: 3 }, 'a') +
    S('M22 22V48') + P('M19 45L22 49L25 45', 4) +
    F('rect', { x: 84, y: 28, width: 22, height: 44 }) + R(84, 28, 22, 44, 2, 4) + P('M80 72H112', 5) + F('circle', { cx: 100, cy: 51, r: 1.7 }, 'a') +
    HV(4, 0, P('M72 50Q79 42 88 50', 6, 'ac') + P('M84 46L88.5 50L83.5 53', 6, 'ac')),
};

function inkFilter() {
  if (document.getElementById('vig-defs')) return;
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.id = 'vig-defs'; s.setAttribute('width', '0'); s.setAttribute('height', '0'); s.setAttribute('aria-hidden', 'true'); s.style.cssText = 'position:absolute;pointer-events:none';
  s.innerHTML = '<filter id="vig-ink" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="1" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="0.7" xChannelSelector="R" yChannelSelector="G"/></filter>';
  document.body.appendChild(s);
}

let io: IntersectionObserver | null = null;
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function mountVignettes(root: ParentNode = document) {
  inkFilter();
  if (!io && 'IntersectionObserver' in window && !calm()) {
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.s = 'in'; io!.unobserve(e.target); } }), { threshold: 0.35 });
  }
  root.querySelectorAll<HTMLElement>('[data-vig]').forEach((el) => {
    const art = ART[el.dataset.vig || ''];
    if (!art || el.dataset.mounted) return;
    el.dataset.mounted = '1';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" focusable="false">${art}</svg>`;
    if (io) { el.dataset.s = 'pre'; io.observe(el); }
  });
}
(window as unknown as { __mountVig: typeof mountVignettes }).__mountVig = mountVignettes;
