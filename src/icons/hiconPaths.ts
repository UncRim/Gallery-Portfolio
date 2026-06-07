// Hicon icon paths — MIT © Cosimo Scarpa (https://github.com/coswise/hicon)

export const HICON_ICONS = [
  'calendar',
  'tag-full',
  'arrow-left',
  'arrow-right',
  'external-link',
  'linkedin',
  'instagram',
  'book-open',
  'moon',
  'sun',
  'chevron-left',
  'plus',
  'minus',
  'map-pin',
  'building',
] as const

export type HiconName = (typeof HICON_ICONS)[number]

export const HICON_PATHS: Record<HiconName, string> = {
  'calendar': `<path d="M4 10H20V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10Z"/><path d="M5.77778 5H4V10H20V5H18.2222M11.1111 5H12.8889"/><line x1="8" y1="4" x2="8" y2="6"/><line x1="16" y1="4" x2="16" y2="6"/>`,
  'tag-full': `<path d="M11.5808 5.10265L21.3421 14.8639L13.8639 22.3421L4.10263 12.5808L3.739 4.73901L11.5808 5.10265Z"/><path d="M7 8L7 8.01"/><path d="M12 11L16.2427 15.2426M10 13L14.2427 17.2426"/>`,
  'arrow-left': `<path d="M6.5 12.5L17.5 12.5"/><path d="M6.5 12.5L9 15.5"/><path d="M6.5 12.5L9 9.5"/>`,
  'arrow-right': `<path d="M18 12L7 12"/><path d="M18 12L15.5 15"/><path d="M18 12L15.5 9"/>`,
  'external-link': `<line x1="10.8492" y1="13.0606" x2="19.435" y2="4.47485"/><path d="M19.7886 4.12134L20.1421 8.01042"/><path d="M19.7886 4.12134L15.8995 3.76778"/><path d="M18 13.1465V17.6465C18 19.3033 16.6569 20.6465 15 20.6465H6C4.34315 20.6465 3 19.3033 3 17.6465V8.64648C3 6.98963 4.34315 5.64648 6 5.64648H10.5"/>`,
  'linkedin': `<path d="M18 22V15C18 13.8954 17.1046 13 16 13C14.8954 13 14 13.8954 14 15V22H10"/><path d="M10 22V15C10 11.6863 12.6863 9 16 9C19.3137 9 22 11.6863 22 15V22H18"/><rect x="3" y="9" width="4" height="13"/><circle cx="5" cy="4" r="2"/>`,
  'instagram': `<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M18 6L18 6.01"/>`,
  'book-open': `<path d="M12 21V10C12 7.23858 9.76142 5 7 5H3V18.7143"/><path d="M3 19H7.5C10.5 19 11 20 12 21"/><path d="M12 21V10C12 7.23858 14.2386 5 17 5H21V18.7143"/><path d="M21 19H16.5C13.5 19 13 20 12 21"/>`,
  'moon': `<path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.171 19 18.1395 17.1814 19 14.2899"/><path d="M19 14C18.8319 14 18.6652 13.9941 18.5 13.9824C12.5 15 9.50001 11.5 12 5"/>`,
  'sun': `<rect x="8" y="8" width="8" height="8" rx="4"/><line x1="12" y1="5" x2="12" y2="3"/><line x1="12" y1="5" x2="12" y2="3"/><line x1="5" y1="12" x2="3" y2="12"/><line x1="7.75739" y1="16.6569" x2="6.34317" y2="18.0711"/><line x1="16.728" y1="17.3137" x2="18.1422" y2="18.7279"/><line x1="12" y1="21" x2="12" y2="19"/><line x1="21" y1="12" x2="19" y2="12"/><line x1="19.071" y1="5.34317" x2="17.6568" y2="6.75738"/><line x1="5.41421" y1="6" x2="6.82843" y2="7.41421"/>`,
  'chevron-left': `<path d="M10 12.4L14.5 17.8"/><path d="M10 12.4L14.5 7.00006"/>`,
  'plus': `<line x1="12" y1="6" x2="12" y2="18"/><line x1="6" y1="12" x2="18" y2="12"/>`,
  'minus': `<line x1="6" y1="12" x2="18" y2="12"/>`,
  'map-pin': `<path d="M12 21s6-4.686 6-10a6 6 0 1 0-12 0c0 5.314 6 10 6 10z"/><circle cx="12" cy="11" r="2"/>`,
  'building': `<path d="M5 21V8l7-4 7 4v13"/><path d="M9 21v-5h6v5"/><line x1="10" y1="12" x2="10" y2="12.01"/><line x1="14" y1="12" x2="14" y2="12.01"/><line x1="10" y1="16" x2="10" y2="16.01"/><line x1="14" y1="16" x2="14" y2="16.01"/>`,
}
