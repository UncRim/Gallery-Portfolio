import { useLayoutEffect, useRef } from 'react'
import { ResultFolderShape } from './ResultFolderShape'

export interface ProjectResult {
  title: string
  description: string
}

interface ResultsCardsProps {
  results: ProjectResult[]
}

const FOLDER_TONES = 4

function syncResultCardHeights(bodies: HTMLDivElement[]) {
  bodies.forEach((body) => {
    body.style.minHeight = ''
  })

  const tallest = Math.max(...bodies.map((body) => body.getBoundingClientRect().height), 0)
  if (tallest === 0) return

  bodies.forEach((body) => {
    body.style.minHeight = `${tallest}px`
  })
}

export function ResultsCards({ results }: ResultsCardsProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const measure = () => {
      const bodies = bodyRefs.current.filter((body): body is HTMLDivElement => body !== null)
      if (bodies.length === 0) return
      syncResultCardHeights(bodies)
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [results])

  if (results.length === 0) return null

  return (
    <section className="post-results" aria-labelledby="post-results-heading">
      <h2 id="post-results-heading" className="post-results-heading">
        Results
      </h2>
      <div ref={gridRef} className="post-results-grid">
        {results.map((result, index) => (
          <article
            key={result.title}
            className={`post-result-card post-result-card--tone-${(index % FOLDER_TONES) + 1}`}
          >
            <div className="post-result-folder">
              <ResultFolderShape className="post-result-folder-shape" />
              <div
                ref={(element) => {
                  bodyRefs.current[index] = element
                }}
                className="post-result-folder-content"
              >
                <h3 className="post-result-title">{result.title}</h3>
                <p className="post-result-description">{result.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
