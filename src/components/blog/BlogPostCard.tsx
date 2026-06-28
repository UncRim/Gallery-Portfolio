import type { BlogPost } from '../../data/blog'
import { Hicon } from '../icons/Hicon'

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="blog-card">
      <a
        href={post.url}
        target="_blank"
        rel="noreferrer noopener"
        className="blog-card-link"
      >
        <div className="blog-card-media">
          {post.image ? (
            <img
              src={post.image}
              alt=""
              className="blog-card-image"
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="blog-card-image blog-card-image--placeholder" aria-hidden="true" />
          )}
        </div>

        <div className="blog-card-body">
          <div className="blog-card-meta">
            <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
            {post.categories.length > 0 && (
              <>
                <span className="blog-card-meta-sep" aria-hidden="true">
                  ·
                </span>
                <span className="blog-card-categories">{post.categories.join(', ')}</span>
              </>
            )}
          </div>

          <h2 className="blog-card-title">{post.title}</h2>

          {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}

          <span className="blog-card-cta">
            Read on Medium
            <Hicon name="external-link" size={14} aria-hidden />
          </span>
        </div>
      </a>
    </article>
  )
}
