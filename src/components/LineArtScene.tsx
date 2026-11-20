import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DESK_PROJECTS, mountDesignerDesk } from '../lineArt/mountDesignerDesk'

export function LineArtScene() {
  const hostRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    return mountDesignerDesk(host, {
      projects: DESK_PROJECTS,
      onOpenProject: (slug) => {
        navigate(`/projects/${slug}`)
      },
    })
  }, [navigate])

  return (
    <section className="line-art-scene" aria-label="Animated line-art desktop">
      <div className="line-art-scene-card">
        <div ref={hostRef} className="line-art-scene-stage" />
        <p className="line-art-scene-hint">Click a folder to open the case study</p>
      </div>
    </section>
  )
}
