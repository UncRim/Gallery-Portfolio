import { Link } from 'react-router-dom'
import { LocalDateTime } from './LocalDateTime'
import { LogoIcon } from './LogoIcon'
import { ThemeToggle } from './ThemeToggle'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header-logo">
        <LogoIcon />
        <div className="logo-text">
          <span className="logo-name">Denelsen D</span>
          <LocalDateTime className="logo-role" />
        </div>
      </Link>
      <nav className="site-header-nav">
        <Link to="/">Projects</Link>
        <Link to="/about">About</Link>
        <a href="mailto:hello@denelsendandi.com">Contact</a>
        <ThemeToggle />
      </nav>
    </header>
  )
}
