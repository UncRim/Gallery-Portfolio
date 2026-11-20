import { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from '../theme/ThemeProvider'

const PULL_MS = 420

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [pulling, setPulling] = useState(false)
  const busyRef = useRef(false)
  const timerRef = useRef(0)

  const isLight = theme === 'light'
  const nextLabel = isLight ? 'dark' : 'light'

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const onPull = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true
    setPulling(true)

    timerRef.current = window.setTimeout(() => {
      toggleTheme()
      setPulling(false)
      // brief settle so the swing can restart cleanly
      timerRef.current = window.setTimeout(() => {
        busyRef.current = false
      }, 180)
    }, PULL_MS)
  }, [toggleTheme])

  return (
    <button
      type="button"
      className={`theme-pull${pulling ? ' is-pulling' : ''}${isLight ? ' is-light' : ' is-dark'}`}
      onClick={onPull}
      aria-label={`Pull cord to switch to ${nextLabel} theme`}
      aria-pressed={isLight}
      title={`Pull for ${nextLabel} mode`}
    >
      <span className="theme-pull-pivot" aria-hidden="true">
        <span className="theme-pull-swing">
          <svg
            className="theme-pull-svg"
            viewBox="0 0 24 72"
            width="24"
            height="72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ceiling mount */}
            <path
              d="M8 2.5 H16"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* cord */}
            <path
              className="theme-pull-cord"
              d="M12 2.5 V46"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
            />
            {/* knot */}
            <circle cx="12" cy="48.5" r="2.2" fill="currentColor" />
            {/* pull bead / bulb */}
            <ellipse
              className="theme-pull-bead"
              cx="12"
              cy="58"
              rx="5.2"
              ry="6.4"
              fill="var(--theme-pull-bead)"
              stroke="currentColor"
              strokeWidth="1.35"
            />
            {/* tiny highlight */}
            <path
              d="M9.6 54.2 Q12 52.6 14.2 54.4"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.35"
            />
          </svg>
        </span>
      </span>
      <span className="visually-hidden">Theme pull cord</span>
    </button>
  )
}
