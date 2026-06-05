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
        <span className="logo-name">Denelsen D</span>
      </Link>
      <div className="header-actions">
        <div className="tagline">Convert, Convert and Include.</div>
        <ThemeToggle />
      </div>
    </header>
  )
}
