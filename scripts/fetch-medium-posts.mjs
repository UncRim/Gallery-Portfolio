import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const MEDIUM_FEED = 'https://medium.com/feed/@de_nelsen.zw'
const OUT_FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/blogPosts.generated.json')

function readTag(block, tag) {
  const cdata = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`))
  if (cdata) return cdata[1].trim()

  const plain = block.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))
  return plain?.[1]?.trim() ?? ''
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function extractExcerpt(content) {
  const h4 = content.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i)
  if (h4) return stripHtml(h4[1])

  const strongParagraph = content.match(/<p[^>]*>\s*<strong>([\s\S]*?)<\/strong>/i)
  if (strongParagraph) return stripHtml(strongParagraph[1])

  const paragraph = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i)
  if (paragraph) return stripHtml(paragraph[1])

  return ''
}

function extractImage(content) {
  const match = content.match(/<img[^>]+src="([^"]+)"/i)
  return match?.[1] ?? null
}

function formatDate(pubDate) {
  const date = new Date(pubDate)
  if (Number.isNaN(date.getTime())) return pubDate

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function parseItems(xml) {
  const items = []

  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const block = match[1]
    const title = readTag(block, 'title')
    const url = readTag(block, 'link')
    const guid = readTag(block, 'guid')
    const pubDate = readTag(block, 'pubDate')
    const content = readTag(block, 'content:encoded')

    if (!title || !url) continue

    const categories = [...block.matchAll(/<category><!\[CDATA\[([^\]]+)\]\]><\/category>/g)].map(
      (category) => category[1].trim(),
    )

    const excerpt = extractExcerpt(content)
    const image = extractImage(content)

    items.push({
      id: guid || url,
      title,
      url,
      publishedAt: pubDate,
      publishedLabel: formatDate(pubDate),
      excerpt: excerpt.length > 220 ? `${excerpt.slice(0, 217)}…` : excerpt,
      image,
      categories: categories.slice(0, 3),
    })
  }

  return items
}

async function main() {
  const response = await fetch(MEDIUM_FEED)

  if (!response.ok) {
    throw new Error(`Failed to fetch Medium feed (${response.status})`)
  }

  const xml = await response.text()
  const posts = parseItems(xml)

  const payload = {
    source: MEDIUM_FEED,
    fetchedAt: new Date().toISOString(),
    posts,
  }

  writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`Wrote ${posts.length} Medium posts to ${OUT_FILE}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
