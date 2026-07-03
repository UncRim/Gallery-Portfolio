import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_PATHS } from './site-routes.mjs'

const distDir = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')
const indexPath = resolve(distDir, 'index.html')
const indexHtml = readFileSync(indexPath, 'utf8')

for (const path of SITE_PATHS) {
  const routeDir = resolve(distDir, `.${path}`)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(resolve(routeDir, 'index.html'), indexHtml)
}

console.log(`Prerendered ${SITE_PATHS.length} SPA routes for GitHub Pages`)
