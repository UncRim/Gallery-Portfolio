import { Link } from 'react-router-dom'
import { LocalDateTime } from './LocalDateTime'
import { LogoIcon } from './LogoIcon'
import { ThemeToggle } from './ThemeToggle'

const CONTACT_URL = 'https://www.linkedin.com/in/denelsen-dandi/'

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <div className="logo-icon">
          <LogoIcon />
        </div>
        <div className="logo-text">
          <span className="logo-name">Denelsen D</span>
          <LocalDateTime className="logo-role" />
        </div>
      </Link>
      <div className="header-actions">
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="header-cta"
        >
          Let&apos;s talk
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
