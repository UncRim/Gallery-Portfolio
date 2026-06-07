export type BrandfetchTheme = 'light' | 'dark'

interface BrandfetchLogoOptions {
  domain: string
  theme?: BrandfetchTheme
  width?: number
  height?: number
  type?: 'icon' | 'logo' | 'symbol'
}

const CLIENT_ID =
  (import.meta.env.VITE_BRANDFETCH_CLIENT_ID as string | undefined) ||
  '1idlGuCbFxbHpDTjfFj'

export function getBrandfetchLogoUrl({
  domain,
  theme = 'light',
  width = 22,
  height = 22,
  type = 'icon',
}: BrandfetchLogoOptions): string {
  const params = new URLSearchParams({ c: CLIENT_ID })
  return `https://cdn.brandfetch.io/domain/${domain}/w/${width}/h/${height}/theme/${theme}/fallback/lettermark/type/${type}?${params}`
}

export function hasBrandfetchClientId(): boolean {
  return true
}
