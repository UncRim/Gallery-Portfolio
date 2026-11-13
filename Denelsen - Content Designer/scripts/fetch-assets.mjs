// Downloads every case study image and video into public/media so the site no longer depends on the old one.
// Run once on a machine with internet access:  npm run assets
// Files that already exist are skipped. Until a file exists locally, the page falls back to the original URL.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES } from '../src/data/cases.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const jobs = new Map();
const add = (a) => a && jobs.set(a.local, a.remote);
for (const c of CASES) {
  add(c.hero.image); add(c.hero.video); add(c.hero.poster);
  c.gallery.forEach(add);
}
let ok = 0, skipped = 0, failed = [];
const queue = [...jobs.entries()];
async function worker() {
  for (let job = queue.shift(); job; job = queue.shift()) {
    const [local, remote] = job, file = join(root, local);
    if (existsSync(file)) { skipped++; continue; }
    try {
      const res = await fetch(remote);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      ok++; console.log('saved  ', local);
    } catch (e) { failed.push(`${local} (${e.message})`); console.log('FAILED ', local, e.message); }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
console.log(`\n${ok} downloaded, ${skipped} already there, ${failed.length} failed`);
if (failed.length) { console.log(failed.join('\n')); process.exitCode = 1; }
