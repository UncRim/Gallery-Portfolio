/* Header logo: flips between the mark and the portrait every 3 to 5 seconds.
   Paused while the tab is hidden; static (mark only) for reduced motion. */
const inner = document.querySelector<HTMLElement>('.logo-flip-inner');

if (inner) {
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let timer = 0;
  let flipped = false;

  const stop = () => window.clearTimeout(timer);
  const wait = () => 3000 + Math.random() * 2000;
  const tick = () => {
    stop();
    timer = window.setTimeout(() => {
      flipped = !flipped;
      inner.classList.toggle('is-flipped', flipped);
      tick();
    }, wait());
  };
  const sync = () => {
    stop();
    if (still.matches) {
      flipped = false;
      inner.classList.remove('is-flipped');
    } else if (!document.hidden) {
      tick();
    }
  };

  still.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
}
