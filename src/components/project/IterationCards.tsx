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

function isIterationSubsection(title: string): boolean {
  return /^Iteration\s+\d+:/i.test(title)
}

function IterationGroupCard({ subsection }: { subsection: ProjectSectionSubsection }) {
  const { badge, heading } = parseIterationTitle(subsection.title)

  return (
    <article className="post-iteration-card" role="listitem">
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
}

function ChunkGroup({ subsection }: { subsection: ProjectSectionSubsection }) {
  const { heading } = parseIterationTitle(subsection.title)

  return (
    <div className="post-iteration-group">
      <h3 className="post-iteration-group-title">{heading}</h3>
      <div className="post-iterations post-iterations--chunks" role="list">
        {subsection.blocks.map((block) => (
          <article
            className="post-iteration-card post-iteration-card--chunk"
            key={block.label}
            role="listitem"
          >
            <p className="post-iteration-label">{block.label}</p>
            <p className="post-iteration-text">{block.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function IterationCards({ subsections }: IterationCardsProps) {
  const useInlineLayout = subsections.some((subsection) => !isIterationSubsection(subsection.title))
  const iterationSubsections = subsections.filter((subsection) =>
    isIterationSubsection(subsection.title),
  )
  const chunkSubsections = subsections.filter(
    (subsection) => !isIterationSubsection(subsection.title),
  )

  return (
    <div
      className={
        useInlineLayout ? 'post-iterations-wrap post-iterations-wrap--inline' : 'post-iterations-wrap'
      }
    >
      {iterationSubsections.length > 0 && (
        <div className="post-iterations" role="list">
          {iterationSubsections.map((subsection) => (
            <IterationGroupCard key={subsection.title} subsection={subsection} />
          ))}
        </div>
      )}

      {chunkSubsections.map((subsection) => (
        <ChunkGroup key={subsection.title} subsection={subsection} />
      ))}
    </div>
  )
}
