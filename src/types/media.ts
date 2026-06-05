export type MediaLayout = 'full' | 'wide' | 'inline'

export interface GalleryItem {
  src: string
  alt?: string
}

export interface MediaBlock {
  type: 'image' | 'video' | 'gallery'
  src?: string
  poster?: string
  caption?: string
  layout?: MediaLayout
  items?: GalleryItem[]
}

export function isVideoUrl(src: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

export function isGifUrl(src: string): boolean {
  return /\.gif(\?|$)/i.test(src)
}

export function mediaFromUrls(
  urls: string[],
  options?: { caption?: string; layout?: MediaLayout },
): MediaBlock[] {
  return urls.map((src) => ({
    type: isVideoUrl(src) ? 'video' : 'image',
    src,
    layout: options?.layout ?? 'wide',
    caption: options?.caption,
  }))
}

export function buildGalleryBlock(
  items: GalleryItem[],
  caption?: string,
): MediaBlock {
  return { type: 'gallery', items, caption, layout: 'wide' }
}

/** Drop cross-project assets that appear in Webflow related-project embeds. */
export function filterWebflowImages(slug: string, images: string[]): string[] {
  const unrelated: Record<string, RegExp[]> = {
    safescroll: [/T-Shaped/i],
    'safe-events': [/Safe-Scroll/i, /T-Shaped/i],
    'smart-laundry-app': [/Safe-Scroll/i, /T-Shaped/i],
    'better-you': [/Safe-Scroll/i, /T-Shaped/i],
    'job-board': [/Safe-Scroll/i, /T-Shaped/i],
    'medical-digital-twin': [/Safe-Scroll/i, /T-Shaped/i],
    't-shaped-reshaped': [/Safe-Scroll/i],
    'tshaped-redesigned': [/Safe-Scroll/i],
  }

  const blocklist = unrelated[slug] ?? [/Safe-Scroll/i, /T-Shaped/i]

  return images.filter((url) => {
    const name = decodeURIComponent(url.split('/').pop() ?? '')
    return !blocklist.some((pattern) => pattern.test(name))
  })
}

export function pickCoverFromGallery(
  slug: string,
  images: string[],
): { coverImage: string; coverVideo?: string } {
  const filtered = filterWebflowImages(slug, images)
  const gif = filtered.find(isGifUrl)
  const still = filtered.find((u) => !isGifUrl(u) && !isVideoUrl(u))
  const video = filtered.find(isVideoUrl)

  if (video) {
    return { coverImage: still ?? gif ?? video, coverVideo: video }
  }
  if (gif) {
    return { coverImage: still ?? gif, coverVideo: undefined }
  }
  return { coverImage: still ?? filtered[0] ?? '' }
}
