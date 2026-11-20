// Writes projects/<slug>/index.html for every case study in src/data/cases.js.
// Runs automatically before `dev` and `build`. Edit the content in src/data/cases.js, not the generated files.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES } from '../src/data/cases.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const words = (c) => [c.problem.join(' '), c.results.flat().join(' '), JSON.stringify(c.sections), c.closing?.p ?? '', c.tagline ?? ''].join(' ').split(/\s+/).length;

const img = (a, extra = '') => `<img src="../../${esc(a.local)}" data-remote="${esc(a.remote)}" alt="${esc(a.alt)}" loading="lazy" decoding="async" onerror="if(this.dataset.remote&&this.src.indexOf(this.dataset.remote)<0)this.src=this.dataset.remote"${extra}>`;

function hero(c) {
  const h = c.hero;
  if (h.video) {
    return `<figure class="case-hero"><video controls muted playsinline preload="metadata" poster="../../${esc(h.poster.local)}"><source src="../../${esc(h.video.local)}" type="video/mp4"><source src="${esc(h.video.remote)}" type="video/mp4"></video></figure>`;
  }
  return `<figure class="case-hero">${img(h.image, ' fetchpriority="high" loading="eager"')}</figure>`;
}

function section(s) {
  const id = slugify(s.h);
  let body = '';
  if (s.p) body += s.p.map((t) => `<p>${esc(t)}</p>`).join('');
  if (s.steps) body += `<ol class="steps">${s.steps.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join('')}</ol>`;
  if (s.list) body += `<ul class="ticks">${s.list.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
  if (s.defs) body += `<dl class="defs">${s.defs.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>`;
  if (s.iterations) body += `<div class="iters">${s.iterations.map((it) => `<article class="card iter"><span class="where mono">Iteration ${it.n}</span><h3>${esc(it.t)}</h3><dl class="defs">${it.parts.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl></article>`).join('')}</div>`;
  return { id, h: s.h, html: `<section class="case-sec" id="${id}"><h2>${esc(s.h)}</h2>${body}</section>` };
}

function page(c, i) {
  const prev = CASES[(i + CASES.length - 1) % CASES.length], next = CASES[(i + 1) % CASES.length];
  const secs = [
    { id: 'problem', h: 'Problem', html: `<section class="case-sec" id="problem"><h2>Problem</h2>${c.problem.map((t, k) => `<p${k === 0 ? ' class="lede"' : ''}>${esc(t)}</p>`).join('')}</section>` },
    { id: 'results', h: 'Results', html: `<section class="case-sec" id="results"><h2>Results</h2><ul class="case-results">${c.results.map(([a, b]) => `<li class="card"><h3>${esc(a)}</h3><p>${esc(b)}</p></li>`).join('')}</ul></section>` },
    ...c.sections.map(section),
  ];
  if (c.closing) secs.push({ id: slugify(c.closing.h), h: c.closing.h, html: `<section class="case-sec" id="${slugify(c.closing.h)}"><h2>${esc(c.closing.h)}</h2><p>${esc(c.closing.p)}</p></section>` });
  secs.push({ id: 'visuals', h: 'Visuals', html: `<section class="case-sec" id="visuals"><h2>Visuals</h2><div class="gallery">${c.gallery.map((g) => `<figure>${img(g)}</figure>`).join('')}</div>${c.tagline ? `<p class="tagline">${esc(c.tagline)}</p>` : ''}</section>` });
  if (c.quote) secs.push({ id: 'kind-words', h: 'Kind words', html: `<section class="case-sec" id="kind-words"><h2>Kind words</h2><blockquote class="quote">${esc(c.quote)}</blockquote></section>` });

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.seoTitle)}</title>
<meta name="description" content="${esc(c.seoDesc)}">
<meta name="keywords" content="${esc(c.keywords)}">
<meta name="author" content="Denelsen Dandi">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#e9ede7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d1310" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="__SITE_URL__/projects/${c.slug}/">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Denelsen Dandi">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(c.seoTitle)}">
<meta property="og:description" content="${esc(c.seoDesc)}">
<meta property="og:url" content="__SITE_URL__/projects/${c.slug}/">
<meta property="og:image" content="__SITE_URL__/og/${c.slug}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(c.title)}: a case study by Denelsen Dandi, with a line-art illustration.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="__TWITTER__">
<meta name="twitter:creator" content="__TWITTER__">
<meta name="twitter:title" content="${esc(c.seoTitle)}">
<meta name="twitter:description" content="${esc(c.seoDesc)}">
<meta name="twitter:image" content="__SITE_URL__/og/${c.slug}.png">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/favicon.png">
<link rel="stylesheet" href="/src/style.css">
<script>try{var t=localStorage.getItem('dd-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': [
  { '@type': 'CreativeWork', '@id': `__SITE_URL__/projects/${c.slug}/#work`, name: c.title, headline: c.title, description: c.seoDesc, datePublished: c.year, keywords: c.keywords, url: `__SITE_URL__/projects/${c.slug}/`, image: `__SITE_URL__/og/${c.slug}.png`, inLanguage: 'en', author: { '@id': '__SITE_URL__/#person' }, creator: { '@id': '__SITE_URL__/#person' } },
  { '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: '__SITE_URL__/' }, { '@type': 'ListItem', position: 2, name: 'Case studies', item: '__SITE_URL__/#library' }, { '@type': 'ListItem', position: 3, name: c.title, item: `__SITE_URL__/projects/${c.slug}/` } ] },
] })}</script>
</head>
<body id="top" data-words="${words(c)}">
<div class="progress" aria-hidden="true"><i id="bar"></i></div>
<header class="top">
  <div class="shell">
    <a class="brand" href="../../" aria-label="Denelsen Dandi, home">
      <span class="logo-flip" aria-hidden="true"><span class="logo-flip-inner"><span class="logo-flip-face front"><img class="logo-mark" src="/logo.png" alt="" width="32" height="32" draggable="false"></span><span class="logo-flip-face back"><img class="logo-mark" src="/logo-portrait.webp" alt="" width="32" height="32" draggable="false"></span></span></span>
      <span>denelsen<small>/docs</small></span>
    </a>
    <nav class="main" aria-label="Sections">
      <a href="../../#practice">Practice</a><a href="../../#library" aria-current="true">Library</a><a href="../../#lab">Lab</a><a href="../../#about">About</a><a href="../../#contact">Contact</a>
    </nav>
    <span class="grow"></span>
    <button class="rope" id="theme" type="button" aria-label="Switch between light and dark. Pull the cord, or press Enter." title="Pull to switch light and dark"><span id="ropeSvg"></span></button>
  </div>
</header>

<div class="shell docs">
  <aside class="side" aria-label="Case studies">
    <h4>Library</h4>
    <a href="../../#library">← All case studies</a>
    <div class="sub">${CASES.map((o) => `<a href="../${o.slug}/"${o.slug === c.slug ? ' aria-current="true"' : ''}><span>${o.id.slice(4)}</span>${esc(o.title)}</a>`).join('')}</div>
  </aside>

  <main>
    <article class="case">
      <a class="case-back" href="../../#library">← All case studies</a>
      <div class="crumbs">docs <span aria-hidden="true">/</span> library <span aria-hidden="true">/</span> <b>${c.id.toLowerCase()}</b></div>
      <div class="case-head">
        <div class="case-head-text">
          <p class="eyebrow">${esc(c.kind)} · ${esc(c.year)}</p>
          <h1>${esc(c.title)}</h1>
          <p class="case-summary">${esc(c.summary)}</p>
        </div>
        <div class="vig big" data-vig="${c.slug}"></div>
      </div>
      <dl class="case-facts">
        <div><dt>Role</dt><dd>${esc(c.role)}</dd></div>
        <div><dt>Tools</dt><dd><ul class="chips">${c.tools.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul></dd></div>
        <div><dt>Type</dt><dd>${esc(c.kind)} · ${esc(c.year)}</dd></div>
      </dl>
      ${c.links ? `<p class="case-links">${c.links.map(([l, h]) => `<a class="btn primary" href="${esc(h)}" target="_blank" rel="noopener noreferrer">${esc(l)} ↗</a>`).join('')}</p>` : ''}
      ${hero(c)}
      ${secs.map((s) => s.html).join('\n      ')}
      <nav class="case-pager" aria-label="More case studies">
        <a href="../${prev.slug}/"><span class="mono">← Previous</span><b>${esc(prev.title)}</b></a>
        <a href="../${next.slug}/"><span class="mono">Next →</span><b>${esc(next.title)}</b></a>
      </nav>
      <p class="case-cta">Working on something similar? <a href="../../#contact">Open an issue</a>.</p>
    </article>
  </main>

  <aside class="toc" aria-label="On this page">
    <h4>On this page</h4>
    ${secs.map((s) => `<a href="#${s.id}" data-spy="${s.id}">${esc(s.h)}</a>`).join('')}
    <h4>Reading time</h4>
    <span class="mono" id="rt" style="font-size:13px;color:var(--muted)"></span>
  </aside>
</div>

<footer><div class="shell">
  <span class="f-note">Set in Fraunces, Open Sans and IBM Plex Mono. Drawn with one pen.</span>
  <span class="f-copy">© 2026 Denelsen Dandi · Austin, TX</span>
</div></footer>

<dialog class="lightbox" id="lightbox" aria-label="Image viewer"><button type="button" class="btn" id="lbClose">Close</button><img alt=""></dialog>
<script type="module" src="/src/case.ts"></script>
</body>
</html>
`;
}

CASES.forEach((c, i) => {
  const dir = join(root, 'projects', c.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(c, i));
});
console.log(`generated ${CASES.length} case study pages`);
