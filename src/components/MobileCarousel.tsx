import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { useSnapCarousel } from '../hooks/useSnapCarousel'
import { SlideMedia } from './Slide'

export function MobileCarousel() {
  const navigate = useNavigate()
  const { trackRef, current, goTo, setSlideRef } = useSnapCarousel(projects.length)

  return (
    <div className="mobile-carousel" aria-roledescription="carousel">
      <div className="mobile-carousel-track" ref={trackRef}>
        {projects.map((project, index) => {
          const isActive = index === current

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
                </div>
              </button>
              <div className="mobile-carousel-label">
                <h2 className="mobile-carousel-title">{project.title}</h2>
                <div className="slide-meta">
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
