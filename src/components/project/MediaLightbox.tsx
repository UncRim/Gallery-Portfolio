import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { MediaBlock } from '../../types/media'
import { isVideoUrl } from '../../types/media'
import { Hicon } from '../icons/Hicon'

export interface LightboxItem {
  src: string
  alt: string
  kind: 'image' | 'video'
  poster?: string
}

interface MediaLightboxContextValue {
  open: (src: string) => void
}

const MediaLightboxContext = createContext<MediaLightboxContextValue | null>(null)

export function flattenMediaBlocks(blocks: MediaBlock[], projectTitle: string): LightboxItem[] {
  const items: LightboxItem[] = []

  for (const block of blocks) {
    if (block.type === 'gallery' && block.items?.length) {
      block.items.forEach((item, index) => {
        items.push({
          src: item.src,
          alt: item.alt ?? `${projectTitle} ${index + 1}`,
          kind: isVideoUrl(item.src) ? 'video' : 'image',
        })
      })
      continue
    }

    if (block.type === 'video' && block.src) {
      items.push({
        src: block.src,
        alt: block.caption ?? projectTitle,
        kind: 'video',
        poster: block.poster,
      })
      continue
    }

    if (block.src) {
      items.push({
        src: block.src,
        alt: block.caption ?? projectTitle,
        kind: isVideoUrl(block.src) ? 'video' : 'image',
        poster: block.poster,
      })
    }
  }

  return items
}

function useMediaLightboxContext() {
  const context = useContext(MediaLightboxContext)
  if (!context) {
    throw new Error('useMediaLightboxContext must be used within MediaLightboxProvider')
  }
  return context
}

export function useMediaLightbox() {
  return useMediaLightboxContext()
}

interface MediaLightboxProviderProps {
  media: MediaBlock[]
  projectTitle: string
  children: ReactNode
}

export function MediaLightboxProvider({
  media,
  projectTitle,
  children,
}: MediaLightboxProviderProps) {
  const items = useMemo(() => flattenMediaBlocks(media, projectTitle), [media, projectTitle])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])

  const open = useCallback(
    (src: string) => {
      const index = items.findIndex((item) => item.src === src)
      if (index >= 0) setActiveIndex(index)
    },
    [items],
  )

  const goTo = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => {
        if (current === null || items.length === 0) return current
        return (current + direction + items.length) % items.length
      })
    },
    [items.length],
  )

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') goTo(-1)
      if (event.key === 'ArrowRight') goTo(1)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, close, goTo])

  const activeItem = activeIndex !== null ? items[activeIndex] : null
  const hasMultiple = items.length > 1

  return (
    <MediaLightboxContext.Provider value={{ open }}>
      {children}

      {activeItem && activeIndex !== null && (
        <div className="media-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button
            type="button"
            className="media-lightbox-backdrop"
            aria-label="Close image viewer"
            onClick={close}
          />

          <div className="media-lightbox-shell">
            <div className="media-lightbox-toolbar">
              {hasMultiple && (
                <p className="media-lightbox-counter" aria-live="polite">
                  {activeIndex + 1} / {items.length}
                </p>
              )}
              <button type="button" className="media-lightbox-close" aria-label="Close" onClick={close}>
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="media-lightbox-stage">
              {hasMultiple && (
                <button
                  type="button"
                  className="media-lightbox-nav media-lightbox-nav--prev"
                  aria-label="Previous image"
                  onClick={() => goTo(-1)}
                >
                  <Hicon name="arrow-left" size={18} />
                </button>
              )}

              <div className="media-lightbox-media">
                {activeItem.kind === 'video' ? (
                  <video
                    key={activeItem.src}
                    src={activeItem.src}
                    poster={activeItem.poster}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={activeItem.alt}
                  />
                ) : (
                  <img key={activeItem.src} src={activeItem.src} alt={activeItem.alt} />
                )}
              </div>

              {hasMultiple && (
                <button
                  type="button"
                  className="media-lightbox-nav media-lightbox-nav--next"
                  aria-label="Next image"
                  onClick={() => goTo(1)}
                >
                  <Hicon name="arrow-right" size={18} />
                </button>
              )}
            </div>

            {hasMultiple && (
              <div className="media-lightbox-mobile-nav">
                <button
                  type="button"
                  className="media-lightbox-nav media-lightbox-nav--prev"
                  aria-label="Previous image"
                  onClick={() => goTo(-1)}
                >
                  <Hicon name="arrow-left" size={18} />
                </button>
                <button
                  type="button"
                  className="media-lightbox-nav media-lightbox-nav--next"
                  aria-label="Next image"
                  onClick={() => goTo(1)}
                >
                  <Hicon name="arrow-right" size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </MediaLightboxContext.Provider>
  )
}
