// Behaviour shared by every case study page: fonts, theme cord, flipping logo, progress bar,
// on-this-page highlighting, reading time and a simple image viewer.
import '@fontsource-variable/open-sans/index.css';
import '@fontsource-variable/fraunces/full.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './rope.ts';
import './logo.ts';
import { mountVignettes } from './vignettes.ts';
mountVignettes();

const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
const root = document.documentElement;

// theme: same storage key as the home page
try { const t = localStorage.getItem('dd-theme'); if (t) root.dataset.theme = t; } catch { /* storage blocked */ }
window.addEventListener('rope:pull', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('dd-theme', root.dataset.theme); } catch { /* storage blocked */ }
  window.dispatchEvent(new CustomEvent('rope:theme', { detail: { dark: root.dataset.theme === 'dark' } }));
});

// reading time
const rt = $('#rt');
if (rt) rt.textContent = `${Math.max(1, Math.round(Number(document.body.dataset.words || 400) / 200))} min`;

// progress bar + on-this-page highlight
const bar = $('#bar');
const secs = $$('.case-sec');
let ticking = false;
function onScroll() {
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
  const y = scrollY + 140;
  let cur = '';
  for (const s of secs) if (s.offsetTop <= y) cur = s.id;
  $$('[data-spy]').forEach((a) => a.setAttribute('aria-current', String(a.dataset.spy === cur)));
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

// image viewer
const lb = $<HTMLDialogElement>('#lightbox');
if (lb && typeof lb.showModal === 'function') {
  const big = lb.querySelector('img')!;
  document.addEventListener('click', (e) => {
    const img = (e.target as Element).closest<HTMLImageElement>('.gallery img, .case-hero img');
    if (!img) return;
    big.src = img.currentSrc || img.src; big.alt = img.alt; lb.showModal();
  });
  lb.addEventListener('click', (e) => { if (e.target === lb || (e.target as Element).id === 'lbClose') lb.close(); });
}
