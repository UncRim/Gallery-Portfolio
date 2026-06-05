import type { ReactNode } from 'react'
import type { Project } from '../data/projects'
import type { SlideLayout } from '../hooks/useCoverFlow'
import { LottieMedia } from './LottieMedia'
import { getSlideBackground } from '../utils/buildBackground'

interface SlideProps {
  project: Project
  index: number
  layout: SlideLayout | undefined
  onSelect: (index: number) => void
  onOpen: (slug: string) => void
}

function isVideoSrc(src?: string): boolean {
  if (!src) return false
  return /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

function SlideMediaFrame({ children }: { children: ReactNode }) {
  return <div className="slide-media-frame">{children}</div>
}

export function SlideMedia({ project, isActive }: { project: Project; isActive: boolean }) {
  const videoSrc = project.coverVideo
  const lottieSrc = project.coverLottie
  const imageSrc = project.coverImage ?? project.image

  if (lottieSrc) {
    if (!isActive && imageSrc) {
      return (
        <SlideMediaFrame>
          <img
            className="slide-media"
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </SlideMediaFrame>
      )
    }

    return (
      <SlideMediaFrame>
        <LottieMedia
          src={lottieSrc}
          className="slide-media slide-lottie"
          poster={imageSrc}
          enabled={isActive}
          fit="cover"
        />
      </SlideMediaFrame>
    )
  }

  if (videoSrc) {
    if (!isActive && imageSrc) {
      return (
        <SlideMediaFrame>
          <img
            className="slide-media"
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </SlideMediaFrame>
      )
    }

    return (
      <SlideMediaFrame>
        <video
          className="slide-media"
          src={videoSrc}
          poster={imageSrc}
          autoPlay={isActive}
          muted
          loop
          playsInline
          preload={isActive ? 'auto' : 'none'}
          aria-hidden="true"
        />
      </SlideMediaFrame>
    )
  }

  if (imageSrc && isVideoSrc(imageSrc)) {
    return (
      <SlideMediaFrame>
        <video
          className="slide-media"
          src={imageSrc}
          autoPlay={isActive}
          muted
          loop
          playsInline
          preload={isActive ? 'auto' : 'metadata'}
          aria-hidden="true"
        />
      </SlideMediaFrame>
    )
  }

  if (imageSrc) {
    return (
      <SlideMediaFrame>
        <img
          className="slide-media"
          src={imageSrc}
          alt=""
          loading={isActive ? 'eager' : 'lazy'}
          decoding={isActive ? 'sync' : 'async'}
          fetchPriority={isActive ? 'high' : 'auto'}
          draggable={false}
        />
      </SlideMediaFrame>
    )
  }

  const bg = getSlideBackground(project)
  return (
    <div
      className="slide-bg"
      style={{
        backgroundImage: bg.backgroundImage,
        backgroundPosition: bg.backgroundPosition,
      }}
    />
  )
}

export function Slide({ project, index, layout, onSelect, onOpen }: SlideProps) {
  const handleClick = () => {
    if (layout?.isActive) {
      onOpen(project.slug)
    } else {
      onSelect(index)
    }
  }

  if (!layout) return null

  return (
    <div
      className={`slide${layout.isActive ? ' active' : ''}`}
      style={{
        width: layout.width,
        left: layout.left,
        top: layout.top,
        transform: layout.transform,
        opacity: layout.opacity,
        zIndex: layout.zIndex,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={`${project.title} — ${project.tag}`}
    >
      <div className="slide-inner">
        <SlideMedia project={project} isActive={layout.isActive} />
      </div>
      <div className="slide-label">
        <span className="slide-title">{project.title}</span>
        <div className="slide-meta">
          <span className="slide-category">{project.category}</span>
          <span className="slide-meta-sep" aria-hidden="true">
            ·
          </span>
          <span className="slide-year">{project.date}</span>
        </div>
      </div>
    </div>
  )
}
