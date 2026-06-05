import { useTheme } from '../theme/ThemeProvider'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { LampSvg } from './LampSvg'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const isLit = theme === 'light'
  const label = isLit ? 'Dark mode' : 'Light mode'

  return (
    <button
      type="button"
      className={`theme-toggle theme-toggle--lamp${isLit ? ' is-lit' : ''}${isMobile ? ' theme-toggle--compact' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isLit ? 'dark' : 'light'} theme`}
      aria-pressed={isLit}
      title={label}
    >
      <span className="theme-toggle-lamp">
        <LampSvg />
      </span>
      {!isMobile && <span className="theme-toggle-label">{label}</span>}
    </button>
  )
}
