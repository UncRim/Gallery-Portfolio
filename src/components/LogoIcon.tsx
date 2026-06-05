import { useEffect, useState } from 'react'

const FLIP_MIN_MS = 3000
const FLIP_MAX_MS = 5000

function nextFlipDelay() {
  return FLIP_MIN_MS + Math.random() * (FLIP_MAX_MS - FLIP_MIN_MS)
}

export function LogoIcon() {
  const [flipped, setFlipped] = useState(false)
  const [motionOk, setMotionOk] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotionOk(!media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!motionOk) return

    let timeoutId = 0

    const scheduleFlip = () => {
      timeoutId = window.setTimeout(() => {
        setFlipped((prev) => !prev)
        scheduleFlip()
      }, nextFlipDelay())
    }

    scheduleFlip()
    return () => window.clearTimeout(timeoutId)
  }, [motionOk])

  return (
    <div className="logo-flip" aria-hidden="true">
      <div className={`logo-flip-inner${flipped && motionOk ? ' is-flipped' : ''}`}>
        <div className="logo-flip-face front">
          <img
            className="logo-mark"
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            draggable={false}
          />
        </div>
        <div className="logo-flip-face back">
          <img
            className="logo-mark"
            src="/logo-portrait.png"
            alt=""
            width={32}
            height={32}
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
