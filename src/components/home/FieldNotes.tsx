import { Link } from 'react-router-dom'
import { blogPosts, MEDIUM_PROFILE_URL } from '../../data/blog'

export function FieldNotes() {
  const notes = blogPosts.slice(0, 4)

  return (
    <section className="doc-section" id="notes" aria-labelledby="notes-heading">
      <div className="doc-section-head">
        <p className="doc-kicker">( field notes )</p>
        <h2 id="notes-heading" className="doc-title">
          Process, unpacked
        </h2>
        <p className="doc-lede">
          Breakdowns on Medium — how the projects were framed, written, and shipped.
        </p>
      </div>

      <ul className="notes-list">
        {notes.map((post) => (
          <li key={post.id}>
            <a
              href={post.url}
              className="notes-row"
              target="_blank"
              rel="noreferrer noopener"
            >
              <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
              <span className="notes-title">{post.title}</span>
              <span className="notes-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="notes-actions">
        <Link to="/blog" className="btn-ghost">
          All field notes
        </Link>
        <a
          href={MEDIUM_PROFILE_URL}
          className="btn-ghost"
          target="_blank"
          rel="noreferrer noopener"
        >
          Medium profile
        </a>
      </div>
    </section>
  )
}
