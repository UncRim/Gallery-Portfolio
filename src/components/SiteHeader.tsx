import { Link } from 'react-router-dom'
import { LocalDateTime } from './LocalDateTime'
import { LogoIcon } from './LogoIcon'
import { ThemeToggle } from './ThemeToggle'

interface SiteHeaderProps {
  compact?: boolean
}

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link to="/" className="site-header-logo">
        <LogoIcon />
        <div className="logo-text">
          <span className="logo-name">Denelsen D</span>
          <LocalDateTime className="logo-role" />
        </div>
      </Link>
      <nav className={`site-header-nav${compact ? ' site-header-nav--compact' : ''}`}>
        {!compact && (
          <>
            <Link to="/">Projects</Link>
            <Link to="/about">About Me</Link>
            <a href="mailto:hello@denelsendandi.com">Contact</a>
          </>
        )}
        <ThemeToggle />
      </nav>
    </header>
  )
}
