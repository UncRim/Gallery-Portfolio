import { Link } from 'react-router-dom'
import { LogoIcon } from './LogoIcon'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <div className="logo-icon">
          <LogoIcon />
        </div>
        <div className="logo-text">
          <span className="logo-name">Denelsen D</span>
          <span className="logo-role">Product Designer</span>
        </div>
      </Link>
      <div className="header-actions">
        <ThemeToggle />
      </div>
    </header>
  )
}
