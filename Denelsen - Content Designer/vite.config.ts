import { defineConfig, type Plugin } from 'vite';
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Preload the fonts used above the fold so text does not wait for the stylesheet to be parsed first.
const preloadFonts = (): Plugin => ({
  name: 'preload-fonts',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!ctx.bundle) return html;
      const want = [/open-sans-latin-wght-normal/, /fraunces-latin-full-normal/, /fraunces-latin-wght-italic/];
      const tags = Object.keys(ctx.bundle)
        .filter((f) => f.endsWith('.woff2') && want.some((r) => r.test(f)))
        .map((f) => ({ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: './' + f }, injectTo: 'head' as const }));
      return { html, tags };
    },
  },
});


// Share previews and search need absolute URLs. Set SITE_URL (env) or "url" in site.config.json.
// Fills __SITE_URL__ / __TWITTER__ / __SAMEAS__ in every page and writes robots.txt + sitemap.xml.
const site = JSON.parse(readFileSync('site.config.json', 'utf8'));
const SITE_URL = (process.env.SITE_URL || site.url || '').replace(/\/+$/, '');
const seo = (): Plugin => ({
  name: 'seo',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      // Without an absolute URL these tags would be wrong (and Vite would try to resolve them as local files), so leave them out.
      if (!SITE_URL) html = html.replace(/<link rel="canonical"[^>]*>\n?/g, '').replace(/<meta (?:property="og:(?:image|url)"|name="twitter:image")[^>]*>\n?/g, '');
      return html.replaceAll('__SITE_URL__', SITE_URL).replaceAll('"__SAMEAS__"', JSON.stringify(site.sameAs)).replaceAll('__SAMEAS__', JSON.stringify(site.sameAs)).replaceAll('__TWITTER__', site.twitter);
    },
  },
  generateBundle() {
    if (!SITE_URL) { this.warn('SITE_URL is empty: share previews (Open Graph / Twitter) need absolute URLs. Set SITE_URL or "url" in site.config.json, then rebuild. robots.txt and sitemap.xml were skipped.'); return; }
    const paths = ['', ...Object.keys(pages).filter((k) => k !== 'main').map((k) => `projects/${k}/`)];
    const today = new Date().toISOString().slice(0, 10);
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${SITE_URL}/${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n` });
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n` });
  },
});

// base './' keeps asset URLs relative, so the built dist/ works from the site root,
// a sub-folder (GitHub Pages project sites) or any static host without changes.
// One HTML entry for the home page plus one per generated case study (projects/<slug>/index.html).
const pages = Object.fromEntries([
  ['main', resolve(__dirname, 'index.html')],
  ...(existsSync('projects') ? readdirSync('projects').filter((d) => existsSync(`projects/${d}/index.html`)).map((d) => [d, resolve(__dirname, `projects/${d}/index.html`)]) : []),
]);

export default defineConfig({
  base: './',
  plugins: [seo(), preloadFonts()],
  build: { target: 'es2020', rollupOptions: { input: process.env.ONLY_MAIN ? { main: pages.main } : pages } },
});
