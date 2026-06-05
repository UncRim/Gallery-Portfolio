interface LivePrototypeCtaProps {
  href: string
  label?: string
}

export function LivePrototypeCta({
  href,
  label = 'Explore live prototype',
}: LivePrototypeCtaProps) {
  return (
    <div className="post-live-cta-wrap">
      <a
        className="post-live-cta"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>{label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  )
}
