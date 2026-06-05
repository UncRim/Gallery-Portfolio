import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { useCoverFlow } from '../hooks/useCoverFlow'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Hicon } from './icons/Hicon'
import { MobileCarousel } from './MobileCarousel'
import { Slide } from './Slide'

interface ArrowButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
}

function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  return (
    <button
      type="button"
      className={`arrow-btn arrow-${direction}`}
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous project' : 'Next project'}
    >
      <Hicon name={direction === 'left' ? 'arrow-left' : 'arrow-right'} size={16} />
    </button>
  )
}

function DesktopCoverFlow() {
  const navigate = useNavigate()
  const {
    containerRef,
    current,
    layouts,
    goTo,
    goNext,
    goPrev,
    onPointerDown,
    onPointerUp,
  } = useCoverFlow(projects.length)

  useEffect(() => {
    const onPointerUpGlobal = (e: PointerEvent) => onPointerUp(e.clientX)
    document.addEventListener('pointerup', onPointerUpGlobal)
    return () => document.removeEventListener('pointerup', onPointerUpGlobal)
  }, [onPointerUp])

  const handleOpen = (slug: string) => {
    navigate(`/projects/${slug}`)
  }

  return (
    <div className="stage stage--desktop" id="stage">
      <div
        className="coverflow"
        ref={containerRef}
        onPointerDown={(e) => onPointerDown(e.clientX)}
      >
        {projects.map((project, index) => (
          <Slide
            key={project.id}
            project={project}
            index={index}
            layout={layouts[index]}
            onSelect={goTo}
            onOpen={handleOpen}
          />
        ))}
      </div>

      <ArrowButton direction="left" onClick={goPrev} />
      <ArrowButton direction="right" onClick={goNext} />

      <div className="dots">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`dot${index === current ? ' active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Go to ${project.title}`}
            aria-current={index === current ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export function CoverFlow() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <div className="stage stage--mobile" id="stage">
        <MobileCarousel />
      </div>
    )
  }

  return <DesktopCoverFlow />
}
