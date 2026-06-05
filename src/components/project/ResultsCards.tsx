export interface ProjectResult {
  title: string
  description: string
}

interface ResultsCardsProps {
  results: ProjectResult[]
}

export function ResultsCards({ results }: ResultsCardsProps) {
  if (results.length === 0) return null

  return (
    <section className="post-results" aria-labelledby="post-results-heading">
      <h2 id="post-results-heading" className="post-results-heading">
        Results
      </h2>
      <div className="post-results-grid">
        {results.map((result) => (
          <article key={result.title} className="post-result-card">
            <h3 className="post-result-title">{result.title}</h3>
            <p className="post-result-description">{result.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
