import { Link, Navigate, useParams } from 'react-router-dom'
import { FactsCards } from '../components/project/FactsCards'
import { IterationCards } from '../components/project/IterationCards'
import { LivePrototypeCta } from '../components/project/LivePrototypeCta'
import { MediaBlockView, PostCover } from '../components/project/PostMedia'
import { ResultsCards } from '../components/project/ResultsCards'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { CalendarIcon, CategoryIcon } from '../components/project/MetaIcons'
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
                <span className="post-meta-item">
                  <CategoryIcon className="post-meta-icon post-meta-icon--category" />
                  <span className="post-tag">{category}</span>
                </span>
                <span className="post-meta-sep" aria-hidden="true">
                  ·
                </span>
                <span className="post-meta-item">
                  <CalendarIcon className="post-meta-icon post-meta-icon--date" />
                  <span className="post-date">{project.date}</span>
                </span>
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
            <FactsCards
              role={project.role}
              skills={project.skills}
              problem={project.problem}
            />
          </div>

          <div className="post-content">
            {project.intro.split('\n\n').map((paragraph) => (
              <p className="post-lead" key={paragraph.slice(0, 48)}>
                {paragraph}
              </p>
            ))}

            <div className="post-results-wrap">
              <ResultsCards results={project.results} />
            </div>

            {project.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {section.subsections && section.subsections.length > 0 && (
                  <IterationCards subsections={section.subsections} />
                )}
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

            {project.sectionsAfterMedia?.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </section>
            ))}

            {!(project.sectionsAfterMedia && project.sectionsAfterMedia.length > 0) && (
              <blockquote>
                <p>{project.insight ?? project.subtitle}</p>
              </blockquote>
            )}

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

          <nav className="post-nav-wrap" aria-label="Project navigation">
            <Link to="/" className="post-nav-all">
              ← All projects
            </Link>
            <div className="post-nav">
              <Link to={`/projects/${prev.slug}`} className="post-nav-link prev">
                <span className="post-nav-label">Previous project</span>
                <span className="post-nav-title">{prev.title}</span>
              </Link>
              <Link to={`/projects/${next.slug}`} className="post-nav-link next">
                <span className="post-nav-label">Next project</span>
                <span className="post-nav-title">{next.title}</span>
              </Link>
            </div>
          </nav>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
