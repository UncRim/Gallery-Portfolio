import { Hicon } from '../icons/Hicon'

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
        <Hicon name="external-link" size={16} />
      </a>
    </div>
  )
}
