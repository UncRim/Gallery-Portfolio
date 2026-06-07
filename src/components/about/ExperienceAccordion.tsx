import { useState } from 'react'
import { experience } from '../../data/about'
import { Hicon } from '../icons/Hicon'

export function ExperienceAccordion() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set())

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <ol className="about-experience-list">
      {experience.map((entry) => {
        const isOpen = openIds.has(entry.id)

        return (
          <li
            className={`about-experience-item${entry.isCurrent ? ' about-experience-item--current' : ''}${isOpen ? ' is-open' : ''}`}
            key={entry.id}
          >
            <button
              type="button"
              className="about-experience-trigger"
              aria-expanded={isOpen}
              aria-controls={`experience-panel-${entry.id}`}
              onClick={() => toggle(entry.id)}
            >
              <span className="about-experience-summary">
                <span className="about-experience-title-group">
                  <span className="about-experience-role-row">
                    <span className="about-experience-role">{entry.role}</span>
                    {entry.isCurrent && (
                      <span className="about-experience-present">Present</span>
                    )}
                  </span>
                  <span className="about-experience-location">
                    <Hicon
                      name="map-pin"
                      size={12}
                      className="about-experience-location-icon"
                      aria-hidden
                    />
                    {entry.location}
                  </span>
                </span>
                {!entry.isCurrent && (
                  <span className="about-experience-year">{entry.year}</span>
                )}
              </span>

              <span className="about-experience-toggle" aria-hidden="true">
                <Hicon name={isOpen ? 'minus' : 'plus'} size={18} />
              </span>
            </button>

            <div
              id={`experience-panel-${entry.id}`}
              className="about-experience-panel"
              aria-hidden={!isOpen}
            >
              <div className="about-experience-panel-inner">
                <p className="about-experience-company">
                  <Hicon
                    name="building"
                    size={12}
                    className="about-experience-company-icon"
                    aria-hidden
                  />
                  {entry.company}
                </p>
                <p className="about-experience-description">{entry.description}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
