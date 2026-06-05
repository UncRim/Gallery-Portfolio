import { useEffect, useState, type ComponentType } from 'react'
import type { LottieComponentProps } from 'lottie-react'

type LottieComp = ComponentType<LottieComponentProps>

const lottieComponentCache = new Map<string, LottieComp>()
const animationDataCache = new Map<string, object>()

interface LottieMediaProps {
  src: string
  className?: string
  ariaLabel?: string
  poster?: string
  /** When false, shows poster only — avoids loading heavy animation off-screen. */
  enabled?: boolean
  /** cover fills the frame (carousel); contain letterboxes (project hero). */
  fit?: 'cover' | 'contain'
}

function resolveLottieComponent(mod: unknown): LottieComp {
  if (typeof mod === 'function') return mod as LottieComp

  if (mod && typeof mod === 'object' && 'default' in mod) {
    const inner = (mod as { default: unknown }).default
    if (typeof inner === 'function') return inner as LottieComp
  }

  throw new Error('Invalid lottie-react export')
}

function PosterImage({
  className,
  poster,
  ariaLabel,
}: {
  className?: string
  poster?: string
  ariaLabel?: string
}) {
  if (!poster) return null

  return (
    <img
      className={className}
      src={poster}
      alt=""
      aria-hidden={!ariaLabel}
      draggable={false}
      decoding="async"
    />
  )
}

export function LottieMedia({
  src,
  className,
  ariaLabel,
  poster,
  enabled = true,
  fit = 'contain',
}: LottieMediaProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)
  const [LottieComponent, setLottieComponent] = useState<LottieComp | null>(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) return

    let cancelled = false
    setFailed(false)
    setReady(false)

    const loadAnimation = async () => {
      try {
        let Lottie = lottieComponentCache.get('component')
        if (!Lottie) {
          const resolved = await import('lottie-react').then(resolveLottieComponent)
          lottieComponentCache.set('component', resolved)
          Lottie = resolved
        }

        let data = animationDataCache.get(src)
        if (!data) {
          const response = await fetch(src)
          if (!response.ok) throw new Error('Failed to load animation')
          const parsed = await response.json()
          animationDataCache.set(src, parsed)
          data = parsed
        }

        if (!cancelled && data) {
          setLottieComponent(() => Lottie)
          setAnimationData(data)
        }
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    void loadAnimation()

    return () => {
      cancelled = true
    }
  }, [src, enabled])

  return (
    <div className="lottie-media-stack">
      <PosterImage className={className} poster={poster} ariaLabel={ariaLabel} />
      {enabled && !failed && LottieComponent && animationData ? (
        <LottieComponent
          animationData={animationData}
          loop
          autoplay
          className={`${className ?? ''} lottie-media-layer${ready ? ' is-ready' : ''}`.trim()}
          aria-label={ariaLabel}
          aria-hidden={ariaLabel ? undefined : true}
          rendererSettings={{
            preserveAspectRatio: fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet',
          }}
          onDOMLoaded={() => setReady(true)}
          onDataFailed={() => setFailed(true)}
        />
      ) : null}
    </div>
  )
}
