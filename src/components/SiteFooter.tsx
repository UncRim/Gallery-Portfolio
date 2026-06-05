import { Hicon } from './icons/Hicon'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/denelsen-dandi/',
    icon: 'linkedin' as const,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/de_nelsen_zw/',
    icon: 'instagram' as const,
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@de_nelsen.zw',
    icon: 'book-open' as const,
  },
] as const

interface SiteFooterProps {
  variant?: 'card' | 'page'
}

export function SiteFooter({ variant = 'page' }: SiteFooterProps) {
  return (
    <footer className={`site-footer${variant === 'card' ? ' site-footer--card' : ''}`}>
      <div className="site-footer-inner">
        <p className="site-footer-tagline">
          Designing experiences that connect, convert and include.
        </p>
        <nav className="site-footer-social" aria-label="Social links">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={link.label}
            >
              <Hicon name={link.icon} size={18} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
