import { Link } from 'react-router-dom'
import { LogoIcon } from './LogoIcon'
import { ThemeToggle } from './ThemeToggle'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header-logo">
        <LogoIcon />
        <div className="logo-text">
          <span className="logo-name">Denelsen D</span>
          <span className="logo-role">Product Designer</span>
        </div>
      </Link>
      <nav className="site-header-nav">
        <Link to="/">Projects</Link>
        <a href="mailto:hello@denelsendandi.com">Contact</a>
        <ThemeToggle />
      </nav>
    </header>
  )
}
