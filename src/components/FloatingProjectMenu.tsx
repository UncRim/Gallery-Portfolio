import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Hicon, type HiconName } from './icons/Hicon'

const LINKEDIN_URL = 'https://www.linkedin.com/in/denelsen-dandi/'

type FloatingMenuVariant = 'project' | 'about'

interface FloatingMenuItem {
  type: 'link' | 'external'
  to?: string
  href?: string
  icon: HiconName
  label: string
}

const MENU_ITEMS: Record<FloatingMenuVariant, FloatingMenuItem[]> = {
  project: [
    { type: 'link', to: '/about', icon: 'user', label: 'About Me' },
    { type: 'external', href: LINKEDIN_URL, icon: 'linkedin', label: "Let's talk" },
  ],
  about: [
    { type: 'link', to: '/', icon: 'building', label: 'Projects' },
    { type: 'external', href: LINKEDIN_URL, icon: 'linkedin', label: "Let's talk" },
  ],
}

interface FloatingProjectMenuProps {
  variant?: FloatingMenuVariant
}

export function FloatingProjectMenu({ variant = 'project' }: FloatingProjectMenuProps) {
  const [open, setOpen] = useState(false)
  const items = MENU_ITEMS[variant]

  return (
    <div className={`floating-project-menu${open ? ' is-open' : ''}`}>
      <div className="floating-project-menu-panel" aria-hidden={!open}>
        {items.map((item) =>
          item.type === 'link' ? (
            <Link
              key={item.label}
              to={item.to!}
              className="floating-project-menu-link"
              onClick={() => setOpen(false)}
            >
              <Hicon name={item.icon} size={16} className="floating-project-menu-icon" />
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="floating-project-menu-link"
              onClick={() => setOpen(false)}
            >
              <Hicon name={item.icon} size={16} className="floating-project-menu-icon" />
              {item.label}
            </a>
          ),
        )}
      </div>

      <button
        type="button"
        className="floating-project-menu-fab"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Hicon name={open ? 'minus' : 'plus'} size={18} />
      </button>
    </div>
  )
}
