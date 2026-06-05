import { useTheme } from '../theme/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const isLit = theme === 'light'
  const label = isLit ? 'Dark mode' : 'Light mode'

  return (
    <button
      type="button"
      className={`theme-toggle theme-toggle--lamp${isLit ? ' is-lit' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isLit ? 'dark' : 'light'} theme`}
      aria-pressed={isLit}
      title={label}
    >
      <span className="theme-toggle-lamp" aria-hidden="true">
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="lampGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff8dc" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff8dc" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="lampConeGrad"
              x1="38"
              y1="26"
              x2="38"
              y2="51"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ffe08a" stopOpacity="0.5" />
              <stop offset="65%" stopColor="#ffe08a" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#ffe08a" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="lampPoolGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd76a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffd76a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse className="lamp-pool" cx="37" cy="50" rx="14" ry="2" />
          <path className="lamp-cone" d="M31 27L23 50H49L41 27Z" />
          <ellipse className="lamp-glow" cx="38.5" cy="23.5" rx="11" ry="6.5" />

          <ellipse className="lamp-base" cx="13" cy="48.8" rx="11.5" ry="2.6" />
          <path className="lamp-stem" d="M13 46.2V33.5" />
          <circle className="lamp-joint" cx="13" cy="31.5" r="2.2" />
          <path className="lamp-arm" d="M13 31.5C13 25.5 19 21 27.5 18.5L35.5 16.5" />
          <circle className="lamp-joint lamp-joint--head" cx="35.5" cy="16.5" r="2" />

          <rect className="lamp-shade" x="30.5" y="13" width="17" height="12" rx="6" />
          <rect className="lamp-panel" x="34" y="21.8" width="10" height="2.2" rx="1.1" />
        </svg>
      </span>
      <span className="theme-toggle-label">{label}</span>
    </button>
  )
}
