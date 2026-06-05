import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { useSnapCarousel } from '../hooks/useSnapCarousel'
import { SlideMedia } from './Slide'

function getCarouselLabel(title: string) {
  if (title === 'Safe Scroll') return 'SafeScroll'
  if (title.length <= 24) return title
  return title.replace(/^The\s+/i, '').split(/[—·:]/)[0]?.trim() || title
}

export function MobileCarousel() {
  const navigate = useNavigate()
  const { trackRef, current, goTo, setSlideRef } = useSnapCarousel(projects.length)

  return (
    <div className="mobile-carousel" aria-roledescription="carousel">
      <p className="mobile-carousel-heading">Selected work</p>

      <div className="mobile-carousel-track" ref={trackRef}>
        {projects.map((project, index) => {
          const isActive = index === current
          const label = getCarouselLabel(project.title)

          return (
            <article
              key={project.id}
              ref={setSlideRef(index)}
              className={`mobile-carousel-slide${isActive ? ' is-active' : ''}`}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${projects.length}`}
            >
              <button
                type="button"
                className="mobile-carousel-card"
                onClick={() => navigate(`/projects/${project.slug}`)}
                aria-label={`Open ${project.title}`}
              >
                <div className="slide-inner">
                  <SlideMedia project={project} isActive={isActive} />
                  <div className="mobile-carousel-overlay" aria-hidden="true">
                    <p className="mobile-carousel-overlay-meta">
                      {project.category} · {project.date}
                    </p>
                    <p className="mobile-carousel-overlay-title">{label}</p>
                  </div>
                </div>
              </button>

              <div className="mobile-carousel-footer">
                <h2 className="mobile-carousel-title">{label}</h2>
                <div className="slide-meta mobile-carousel-meta-pill">
                  <span className="slide-category">{project.category}</span>
                  <span className="slide-meta-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="slide-year">{project.date}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mobile-carousel-dots dots">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`dot${index === current ? ' active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Go to ${project.title}`}
            aria-current={index === current ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
