import { workedWithLogos } from '../../data/about'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function WorkedWithLogos() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const marqueeItems = prefersReducedMotion
    ? workedWithLogos
    : [...workedWithLogos, ...workedWithLogos]

  return (
    <section className="about-worked-with" aria-labelledby="about-worked-with-heading">
      <h2 id="about-worked-with-heading">Companies I&apos;ve worked with</h2>
      <div className="about-worked-with-marquee" aria-label="Companies marquee">
        <ul
          className={`about-worked-with-track${prefersReducedMotion ? ' is-static' : ''}`}
        >
          {marqueeItems.map((company, index) => (
            <li className="about-worked-with-item" key={`${company.id}-${index}`}>
              <img
                src={company.logo}
                alt={company.name}
                className="about-worked-with-logo"
                width={72}
                height={72}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
