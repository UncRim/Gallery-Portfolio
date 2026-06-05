interface MetaIconProps {
  className?: string
}

export function CategoryIcon({ className }: MetaIconProps) {
  return (
    <svg
      className={className}
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.25 2.25h3.75l3.75 3.75v3.75H6L2.25 6.75V2.25z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CalendarIcon({ className }: MetaIconProps) {
  return (
    <svg
      className={className}
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.75"
        y="2.75"
        width="8.5"
        height="7.5"
        rx="1.1"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <path
        d="M1.75 5.25h8.5M4 1.75v2M8 1.75v2"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  )
}
