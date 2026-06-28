import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { FloatingProjectMenu } from '../components/FloatingProjectMenu'
import { BlogPostCard } from '../components/blog/BlogPostCard'
import { Hicon } from '../components/icons/Hicon'
import { blogPosts, MEDIUM_PROFILE_URL } from '../data/blog'

export function BlogPage() {
  return (
    <div className="blog-page project-page">
      <SiteHeader compact />

      <main className="blog-main">
        <header className="blog-header">
          <p className="blog-eyebrow">Process breakdowns</p>
          <h1 className="blog-title">How the work gets built</h1>
          <p className="blog-intro">
            Deep dives on real projects — the problems I solved, the decisions I made, and the
            outcomes behind the case studies in this portfolio.
          </p>
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="blog-medium-link"
          >
            Read the full breakdowns on Medium
            <Hicon name="external-link" size={16} aria-hidden />
          </a>
        </header>

        <section className="blog-list" aria-label="Process breakdowns">
          {blogPosts.map((post) => (
            <BlogPostCard post={post} key={post.id} />
          ))}
        </section>
      </main>

      <SiteFooter />
      <FloatingProjectMenu variant="blog" />
    </div>
  )
}
