import { useCallback, useEffect, useRef, useState } from 'react'

export interface SlideLayout {
  width: number
  height: number
  left: number
  top: number
  transform: string
  opacity: number
  zIndex: number
  isActive: boolean
}

interface LayoutDimensions {
  w: number
  h: number
  cW: number
  cH: number
}

/** Reference frame — cards render at 1640×900. */
const CARD_MAX_W = 1640
const CARD_MAX_H = 900
const CARD_ASPECT = CARD_MAX_W / CARD_MAX_H

function isMobileLayout() {
  return window.matchMedia('(max-width: 768px)').matches
}

function getLabelReserve() {
  return isMobileLayout() ? 104 : 64
}

function getLayout(container: HTMLElement): LayoutDimensions {
  const w = container.offsetWidth
  const h = container.offsetHeight - getLabelReserve()
  const mobile = isMobileLayout()

  let cW = Math.min(w * (mobile ? 0.94 : 0.84), CARD_MAX_W)
  let cH = cW / CARD_ASPECT

  if (cH > Math.min(h * (mobile ? 0.92 : 0.88), CARD_MAX_H)) {
    cH = Math.min(h * (mobile ? 0.92 : 0.88), CARD_MAX_H)
    cW = cH * CARD_ASPECT
  }

  return { w, h, cW, cH }
}

function computeSlideLayout(
  index: number,
  current: number,
  total: number,
  dims: LayoutDimensions,
): SlideLayout {
  const { w, h, cW, cH } = dims
  const cx = w / 2
  const cy = h / 2
  const stepX = cW * (w < 520 ? 0.4 : 0.55)
  const angleY = 18

  const delta = ((index - current) % total + total) % total
  let d = delta
  if (d > total / 2) d = d - total

  const absd = Math.abs(d)

  let scale: number
  let tx: number
  let tz: number
  let ry: number
  let opacity: number
  let zIndex: number

  if (d === 0) {
    scale = 1
    tx = 0
    tz = 0
    ry = 0
    opacity = 1
    zIndex = 20
  } else if (absd === 1) {
    scale = 0.82
    tx = Math.sign(d) * stepX * 1.02
    tz = -50
    ry = Math.sign(d) * -angleY
    opacity = 0.88
    zIndex = 15
  } else if (absd === 2) {
    scale = 0.66
    tx = Math.sign(d) * stepX * 1.85
    tz = -110
    ry = Math.sign(d) * -(angleY * 1.25)
    opacity = 0.58
    zIndex = 10
  } else if (absd === 3) {
    scale = 0.52
    tx = Math.sign(d) * stepX * 2.55
    tz = -170
    ry = Math.sign(d) * -(angleY * 1.45)
    opacity = 0.3
    zIndex = 5
  } else {
    scale = 0.4
    tx = Math.sign(d) * stepX * 3.15
    tz = -220
    ry = Math.sign(d) * -(angleY * 1.6)
    opacity = 0.1
    zIndex = 2
  }

  const w_ = cW * scale
  const h_ = cH * scale
  const top = cy - h_ / 2

  return {
    width: cW,
    height: cH,
    left: cx - w_ / 2 + tx,
    top,
    transform: `perspective(1000px) rotateY(${ry}deg) scale(${scale}) translateZ(${tz}px)`,
    opacity,
    zIndex,
    isActive: d === 0,
  }
}

export function useCoverFlow(totalSlides: number, autoPlayMs = 4200) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [layouts, setLayouts] = useState<SlideLayout[]>([])
  const wheelLockRef = useRef(false)
  const dragStartXRef = useRef<number | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(((idx % totalSlides) + totalSlides) % totalSlides)
    },
    [totalSlides],
  )

  const goNext = useCallback(() => goTo(current + 1), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo])

  const updateLayouts = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const dims = getLayout(container)
    setLayouts(
      Array.from({ length: totalSlides }, (_, i) =>
        computeSlideLayout(i, current, totalSlides, dims),
      ),
    )
  }, [current, totalSlides])

  useEffect(() => {
    updateLayouts()
    window.addEventListener('resize', updateLayouts)
    return () => window.removeEventListener('resize', updateLayouts)
  }, [updateLayouts])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (wheelLockRef.current) return
      wheelLockRef.current = true
      goTo(current + (e.deltaY > 0 ? 1 : -1))
      window.setTimeout(() => {
        wheelLockRef.current = false
      }, 400)
    }
    document.addEventListener('wheel', onWheel, { passive: true })
    return () => document.removeEventListener('wheel', onWheel)
  }, [current, goTo])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides)
    }, autoPlayMs)
    return () => window.clearInterval(interval)
  }, [autoPlayMs, totalSlides])

  const onPointerDown = useCallback((clientX: number) => {
    dragStartXRef.current = clientX
  }, [])

  const onPointerUp = useCallback(
    (clientX: number) => {
      if (dragStartXRef.current === null) return
      const dx = clientX - dragStartXRef.current
      if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1))
      dragStartXRef.current = null
    },
    [current, goTo],
  )

  return {
    containerRef,
    current,
    layouts,
    goTo,
    goNext,
    goPrev,
    onPointerDown,
    onPointerUp,
  }
}
