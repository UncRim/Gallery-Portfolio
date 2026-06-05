import { useTheme } from '../theme/ThemeProvider'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Hicon } from './icons/Hicon'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const isLight = theme === 'light'
  const label = isLight ? 'Dark mode' : 'Light mode'
  const icon = isLight ? 'moon' : 'sun'

  return (
    <button
      type="button"
      className={`theme-toggle${isMobile ? ' theme-toggle--compact' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      aria-pressed={isLight}
      title={label}
    >
      <Hicon name={icon} size={isMobile ? 18 : 20} className="theme-toggle-icon" />
      {!isMobile && <span className="theme-toggle-label">{label}</span>}
    </button>
  )
}
