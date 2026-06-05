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
        <linearGradient id={coneId} x1="30" y1="27" x2="30" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe08a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffe08a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={poolId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd76a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffd76a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse className="lamp-pool" cx="29" cy="46" rx="10" ry="1.6" fill={`url(#${poolId})`} />
      <path className="lamp-cone" d="M20 27H40L38 44H22L20 27Z" fill={`url(#${coneId})`} />
      <circle className="lamp-glow" cx="30" cy="17" r="12" fill={`url(#${glowId})`} />

      <path
        className="lamp-shade"
        d="M19.5 21.5C19.5 11.5 40.5 11.5 40.5 21.5L38.5 23.5C30 27.5 21.5 23.5 19.5 21.5Z"
      />
      <circle className="lamp-bulb" cx="30" cy="23" r="2.75" />

      <path
        className="lamp-stand"
        d="M11 42.5C11 37 11.5 32 14.5 28C17.5 24 22.5 21 27.5 19.5"
      />
      <rect className="lamp-base" x="4" y="40" width="14" height="5.5" rx="2.75" />
    </svg>
  )
}
