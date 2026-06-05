const TAG_SEPARATOR = ' · '

/** Category label without the trailing year segment from tags like "Web Design · 2025". */
export function getCategoryFromTag(tag: string): string {
  const index = tag.lastIndexOf(TAG_SEPARATOR)
  if (index === -1) return tag
  return tag.slice(0, index).trim()
}
