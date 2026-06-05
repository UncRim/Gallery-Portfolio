import { useId } from 'react'

interface LampSvgProps {
  className?: string
}

export function LampSvg({ className }: LampSvgProps) {
  const id = useId().replace(/:/g, '')
  const glowId = `lampGlowGrad-${id}`
  const coneId = `lampConeGrad-${id}`
  const poolId = `lampPoolGrad-${id}`

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8dc" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff8dc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={coneId} x1="34" y1="22" x2="34" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe08a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffe08a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={poolId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd76a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffd76a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse className="lamp-pool" cx="34" cy="45" rx="11" ry="1.8" fill={`url(#${poolId})`} />
      <path className="lamp-cone" d="M24 22H44L41.5 43H26.5L24 22Z" fill={`url(#${coneId})`} />
      <circle className="lamp-glow" cx="34" cy="16" r="13" fill={`url(#${glowId})`} />

      <path
        className="lamp-base"
        d="M3 46V42.2C3 38.4 6.2 35.5 10 35.5H16.2C19.4 35.5 21.8 37.6 21.8 40.5V46H3Z"
      />
      <rect className="lamp-base" x="21.8" y="39.2" width="3.2" height="4.8" rx="0.6" />

      <path className="lamp-arm" d="M11.5 39.5C7.5 37.2 6 32.5 6.8 29" />
      <path className="lamp-arm" d="M6.8 26.8C6.2 23.8 7.2 20.2 9.5 17.2" />
      <path className="lamp-arm" d="M11.2 15.2C15.2 11.5 20 9.8 25.5 10.2" />

      <path className="lamp-shade" d="M24 11.5A10 10 0 0 0 44 11.5Z" />
      <path className="lamp-shade-tier" d="M27.5 15.2H40.5" />
      <path className="lamp-bulb" d="M30.5 18.8A3.6 3.6 0 0 0 37.5 18.8Z" />
    </svg>
  )
}
