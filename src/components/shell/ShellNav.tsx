import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../ThemeToggle'

const CONTACT_MAIL = 'mailto:ddandi@mail.yu.edu'

export function ShellNav() {
  return (
    <header className="shell-nav">
      <Link to="/" className="shell-nav-brand">
        Denelsen Dandi
      </Link>

      <nav className="shell-nav-links" aria-label="Primary">
        <a href="/#specimens">Work</a>
        <a href="/#method">Method</a>
        <NavLink to="/blog">Field notes</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <div className="shell-nav-actions">
        <a className="shell-nav-mail" href={CONTACT_MAIL}>
          Reach out
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
