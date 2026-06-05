import type { ProjectSectionSubsection } from '../../data/projectDetails'

interface IterationCardsProps {
  subsections: ProjectSectionSubsection[]
}

function parseIterationTitle(title: string): { badge?: string; heading: string } {
  const match = title.match(/^Iteration\s+(\d+):\s*(.+)$/i)
  if (match) {
    return { badge: `Iteration ${match[1]}`, heading: match[2] }
  }
  return { heading: title }
}

export function IterationCards({ subsections }: IterationCardsProps) {
  return (
    <div className="post-iterations" role="list">
      {subsections.map((subsection) => {
        const { badge, heading } = parseIterationTitle(subsection.title)

        return (
          <article className="post-iteration-card" key={subsection.title} role="listitem">
            {badge && <p className="post-iteration-badge">{badge}</p>}
            <h3 className="post-iteration-title">{heading}</h3>
            <div className="post-iteration-blocks">
              {subsection.blocks.map((block) => (
                <div className="post-iteration-block" key={block.label}>
                  <p className="post-iteration-label">{block.label}</p>
                  <p className="post-iteration-text">{block.text}</p>
                </div>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}
