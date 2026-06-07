import { useEffect, useRef, useState } from 'react'
import { aboutIntro } from '../../data/about'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const TYPING_INTERVAL_MS = 14
const PARAGRAPH_PAUSE_MS = 320

export function AboutIntroTyping() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' })
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!inView || hasStarted) return
    setHasStarted(true)
  }, [hasStarted, inView])

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return

    const currentParagraph = aboutIntro[paragraphIndex]
    if (!currentParagraph) {
      setIsComplete(true)
      return
    }

    if (charIndex < currentParagraph.length) {
      const timer = window.setTimeout(() => {
        setCharIndex((value) => value + 1)
      }, TYPING_INTERVAL_MS)
      return () => window.clearTimeout(timer)
    }

    if (paragraphIndex < aboutIntro.length - 1) {
      const timer = window.setTimeout(() => {
        setParagraphIndex((value) => value + 1)
        setCharIndex(0)
      }, PARAGRAPH_PAUSE_MS)
      return () => window.clearTimeout(timer)
    }

    setIsComplete(true)
  }, [charIndex, hasStarted, paragraphIndex, prefersReducedMotion])

  const isTyping = hasStarted && !isComplete

  if (prefersReducedMotion) {
    return (
      <div ref={sectionRef} className="about-intro post-content">
        {aboutIntro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={sectionRef}
      className={`about-intro post-content${isTyping ? ' is-typing' : ''}`}
      aria-live={isTyping ? 'polite' : undefined}
    >
      {isComplete
        ? aboutIntro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))
        : aboutIntro.map((paragraph, index) => {
            if (index < paragraphIndex) {
              return <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            }

            if (index === paragraphIndex && hasStarted) {
              return (
                <p key={paragraph.slice(0, 32)}>
                  {paragraph.slice(0, charIndex)}
                  {!isComplete && <span className="about-intro-cursor" aria-hidden="true" />}
                </p>
              )
            }

            return null
          })}
    </div>
  )
}
