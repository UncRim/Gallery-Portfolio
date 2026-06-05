/**
 * Fetches project metadata from the Framer portfolio search index.
 * Run: node scripts/fetch-framer-projects.mjs
 */
const INDEX_URL =
  'https://framerusercontent.com/sites/2FyDQUn4Q7ZPGLjXYKTEUC/searchIndex-ZnYD3aXY8ils.json'
const BASE_URL = 'https://denelsenuix.framer.website'

const skipParagraphs = new Set([
  'Home',
  'Projects',
  'About',
  'Blog Posts',
  'Get in touch',
  'all rights reserved - made in 🇿🇼',
  'Create a free website with Framer, the website builder loved by startups, designers and agencies.',
])

async function fetchOgImage(slug) {
  const res = await fetch(`${BASE_URL}/projects/${slug}`)
  const html = await res.text()
  const match = html.match(/property="og:image" content="([^"]+)"/)
  return match ? match[1].replace(/&amp;/g, '&') : null
}

function parseProject(url, entry) {
  const slug = url.split('/').pop()
  const paragraphs = entry.p.filter((p) => !skipParagraphs.has(p))
  const h2 = entry.h2.filter((h) => h !== "Let's build something great.")

  let role = ''
  let problem = ''
  const results = []

  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i] === 'ROLE') role = paragraphs[i + 1] ?? ''
    if (paragraphs[i] === 'PROBLEM') problem = paragraphs[i + 1] ?? ''
    if (paragraphs[i] === 'RESULTS') {
      for (let j = i + 1; j < paragraphs.length; j++) {
        if (['ROLE', 'PROBLEM', 'RESULTS', 'LINK TO PROJECT'].includes(paragraphs[j])) break
        if (paragraphs[j].length > 140 && results.length >= 4) break
        results.push(paragraphs[j])
      }
    }
  }

  return {
    slug,
    title: h2[0] ?? entry.title.replace('Case Study - ', ''),
    subtitle: entry.description,
    intro: paragraphs[0] ?? '',
    role,
    problem,
    results,
    sections: h2.slice(1).filter((h) => h !== "Let's build something great."),
    framerUrl: `${BASE_URL}${url}`,
  }
}

const index = await fetch(INDEX_URL).then((r) => r.json())
const projects = []

for (const [url, entry] of Object.entries(index)) {
  if (!url.startsWith('/projects/')) continue
  const parsed = parseProject(url, entry)
  parsed.coverImage = await fetchOgImage(parsed.slug)
  projects.push(parsed)
}

console.log(JSON.stringify(projects, null, 2))
