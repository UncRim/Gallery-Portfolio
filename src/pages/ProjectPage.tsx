import { Link, Navigate, useParams } from 'react-router-dom'
import { FactsCards } from '../components/project/FactsCards'
import { LivePrototypeCta } from '../components/project/LivePrototypeCta'
import { MediaBlockView, PostCover } from '../components/project/PostMedia'
import { ResultsCards } from '../components/project/ResultsCards'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import {
  getAdjacentProjects,
  getProjectBySlug,
} from '../data/projects'
import { getCategoryFromTag } from '../utils/projectMeta'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return <Navigate to="/" replace />
  }

  const { prev, next } = getAdjacentProjects(project.slug)
  const category = getCategoryFromTag(project.tag)

  return (
    <div className="project-page">
      <SiteHeader />

      <main className="project-main">
        <article className="post">
          <Link to="/" className="post-back">
            ← All projects
          </Link>

          <header className="post-header">
            <h1 className="post-title">{project.title}</h1>
            <p className="post-subtitle">{project.subtitle}</p>
            <div className="post-meta">
              <div className="post-meta-pill">
                <span className="post-tag">{category}</span>
                <span className="post-meta-sep" aria-hidden="true">
                  ·
                </span>
                <span className="post-date">{project.date}</span>
              </div>
            </div>
          </header>

          <PostCover
            title={project.title}
            coverImage={project.coverImage}
            coverVideo={project.coverVideo}
            coverLottie={project.coverLottie}
          />

          {project.liveUrl && (
            <LivePrototypeCta
              href={project.liveUrl}
              label={project.liveCtaLabel}
            />
          )}

          <div className="post-facts-wrap">
            <FactsCards role={project.role} problem={project.problem} />
          </div>

          <div className="post-content">
            <p className="post-lead">{project.intro}</p>

            <div className="post-results-wrap">
              <ResultsCards results={project.results} />
            </div>

            {project.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {section.subsections?.map((subsection) => (
                  <div className="post-subsection" key={subsection.title}>
                    <h3>{subsection.title}</h3>
                    {subsection.blocks.map((block) => (
                      <div className="post-process-block" key={block.label}>
                        <p className="post-process-label">{block.label}</p>
                        <p>{block.text}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </section>
            ))}

            {project.media && project.media.length > 0 && (
              <>
                <h2>Visuals</h2>
                {project.media.map((block) => (
                  <MediaBlockView
                    key={`${block.type}-${block.src ?? block.caption ?? block.items?.[0]?.src ?? ''}`}
                    block={block}
                    projectTitle={project.title}
                  />
                ))}
              </>
            )}

            <blockquote>
              <p>{project.subtitle}</p>
            </blockquote>

            {(project.framerUrl || project.webflowUrl) && (
              <p className="post-source-links">
                {project.framerUrl && (
                  <a href={project.framerUrl} target="_blank" rel="noreferrer">
                    View on Framer
                  </a>
                )}
                {project.framerUrl && project.webflowUrl && ' · '}
                {project.webflowUrl && (
                  <a href={project.webflowUrl} target="_blank" rel="noreferrer">
                    View on Webflow
                  </a>
                )}
              </p>
            )}
          </div>

          <nav className="post-nav">
            {prev ? (
              <Link to={`/projects/${prev.slug}`} className="post-nav-link prev">
                <span className="post-nav-label">Previous</span>
                <span className="post-nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/projects/${next.slug}`} className="post-nav-link next">
                <span className="post-nav-label">Next</span>
                <span className="post-nav-title">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
