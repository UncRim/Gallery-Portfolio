import type { ReactNode } from 'react'
import type { MediaBlock } from '../../types/media'
import { isGifUrl, isVideoUrl } from '../../types/media'
import { LottieMedia } from '../LottieMedia'
import { useMediaLightbox } from './MediaLightbox'

interface MediaBlockViewProps {
  block: MediaBlock
  projectTitle: string
}

function MediaOpenButton({
  src,
  alt,
  children,
  className,
}: {
  src: string
  alt: string
  children: ReactNode
  className?: string
}) {
  const { open } = useMediaLightbox()

  return (
    <button
      type="button"
      className={className ? `post-media-open ${className}` : 'post-media-open'}
      aria-label={`View ${alt}`}
      onClick={() => open(src)}
    >
      {children}
    </button>
  )
}

export function MediaBlockView({ block, projectTitle }: MediaBlockViewProps) {
  if (block.type === 'gallery' && block.items?.length) {
    return (
      <figure className={`post-media post-media-gallery layout-${block.layout ?? 'wide'}`}>
        <div className="post-gallery-grid">
          {block.items.map((item, index) => (
            <div className="post-gallery-cell" key={item.src}>
              <MediaOpenButton
                src={item.src}
                alt={item.alt ?? `${projectTitle} ${index + 1}`}
              >
                {isVideoUrl(item.src) ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    tabIndex={-1}
                    aria-hidden
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt ?? `${projectTitle} ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </MediaOpenButton>
            </div>
          ))}
        </div>
        {block.caption && <figcaption className="post-media-caption">{block.caption}</figcaption>}
      </figure>
    )
  }

  if (block.type === 'video' && block.src) {
    return (
      <figure className={`post-media layout-${block.layout ?? 'wide'}`}>
        <MediaOpenButton src={block.src} alt={block.caption ?? projectTitle}>
          <video
            className="post-media-video"
            src={block.src}
            poster={block.poster}
            muted
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden
          />
        </MediaOpenButton>
        {block.caption && <figcaption className="post-media-caption">{block.caption}</figcaption>}
      </figure>
    )
  }

  if (block.src) {
    return (
      <figure className={`post-media layout-${block.layout ?? 'wide'}`}>
        <MediaOpenButton src={block.src} alt={block.caption ?? projectTitle}>
          {isGifUrl(block.src) ? (
            <img
              className="post-media-image"
              src={block.src}
              alt={block.caption ?? projectTitle}
              loading="lazy"
            />
          ) : (
            <img
              className="post-media-image"
              src={block.src}
              alt={block.caption ?? projectTitle}
              loading="lazy"
            />
          )}
        </MediaOpenButton>
        {block.caption && <figcaption className="post-media-caption">{block.caption}</figcaption>}
      </figure>
    )
  }

  return null
}

interface PostCoverProps {
  title: string
  coverImage: string
  coverVideo?: string
  coverLottie?: string
}

export function PostCover({ title, coverImage, coverVideo, coverLottie }: PostCoverProps) {
  const showLottie = Boolean(coverLottie)
  const showVideo = !showLottie && coverVideo && isVideoUrl(coverVideo)

  return (
    <div className="post-cover-wrap">
      {showLottie ? (
        <LottieMedia
          src={coverLottie!}
          className="post-cover post-cover-lottie"
          ariaLabel={title}
          poster={coverImage}
        />
      ) : showVideo ? (
        <video
          className="post-cover post-cover-video"
          src={coverVideo}
          poster={coverImage}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={title}
        />
      ) : isGifUrl(coverImage) ? (
        <img className="post-cover" src={coverImage} alt={title} />
      ) : (
        <img className="post-cover" src={coverImage} alt={title} />
      )}
    </div>
  )
}
