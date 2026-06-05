import { useCallback, useEffect, useRef, useState } from 'react'

export function useSnapCarousel(totalSlides: number, autoPlayMs = 4200) {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const [current, setCurrent] = useState(0)
  const scrollLockRef = useRef(false)

  const goTo = useCallback(
    (idx: number) => {
      const next = ((idx % totalSlides) + totalSlides) % totalSlides
      setCurrent(next)
      const slide = slideRefs.current[next]
      if (!slide) return
      scrollLockRef.current = true
      slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
      window.setTimeout(() => {
        scrollLockRef.current = false
      }, 450)
    },
    [totalSlides],
  )

  const goNext = useCallback(() => goTo(current + 1), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo])

  const syncCurrentFromScroll = useCallback(() => {
    if (scrollLockRef.current) return
    const track = trackRef.current
    if (!track) return

    const trackRect = track.getBoundingClientRect()
    let bestIndex = 0
    let bestVisible = 0

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      const rect = slide.getBoundingClientRect()
      const visible =
        Math.min(rect.right, trackRect.right) - Math.max(rect.left, trackRect.left)
      if (visible > bestVisible) {
        bestVisible = visible
        bestIndex = index
      }
    })

    setCurrent(bestIndex)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(syncCurrentFromScroll)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [syncCurrentFromScroll])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % totalSlides
        slideRefs.current[next]?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
          block: 'nearest',
        })
        return next
      })
    }, autoPlayMs)
    return () => window.clearInterval(interval)
  }, [autoPlayMs, totalSlides])

  const setSlideRef = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      slideRefs.current[index] = element
    },
    [],
  )

  return {
    trackRef,
    current,
    goTo,
    goNext,
    goPrev,
    setSlideRef,
  }
}
