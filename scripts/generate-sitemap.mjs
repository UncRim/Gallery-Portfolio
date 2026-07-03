import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_PATHS } from './site-routes.mjs'

const SITE_URL = 'https://denelsen.slicksstudios.com'
const OUT_FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml')

const paths = ['/', ...SITE_PATHS]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(OUT_FILE, xml)
console.log(`Wrote sitemap with ${paths.length} URLs to ${OUT_FILE}`)
