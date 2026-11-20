import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'

const BLURBS: Record<string, string> = {
  'tshaped-redesigned':
    'From brochure site to conversion system — clearer story, stronger CTAs, measurable lift.',
  'katz-master-in-ai-program-page':
    'Program page rewritten as a decision tool: outcomes first, proof next, action always visible.',
  'higher-ed-concept':
    'Spatial alumni vault concept — exclusive access framing for research storytelling.',
  'ticketmaster-spatial-seat-selection':
    'Seat selection that shows the view — killing the imagination tax before checkout.',
  safescroll: 'A humane intervention for doomscrolling — awareness without shame.',
}

export function SpecimenList() {
  return (
    <section className="doc-section" id="specimens" aria-labelledby="specimens-heading">
      <div className="doc-section-head">
        <p className="doc-kicker">( act i — specimens )</p>
        <h2 id="specimens-heading" className="doc-title">
          Selected work
        </h2>
        <p className="doc-lede">
          Case studies written like product docs: problem, structure, proof, and the next step.
        </p>
      </div>

      <ol className="specimen-list">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Link to={`/projects/${project.slug}`} className="specimen-row">
              <span className="specimen-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="specimen-body">
                <span className="specimen-title">{project.title}</span>
                <span className="specimen-blurb">
                  {BLURBS[project.slug] ?? project.tag}
                </span>
              </span>
              <span className="specimen-meta">
                <span>{project.category}</span>
                <span>{project.date}</span>
              </span>
              <span className="specimen-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
