import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isBig, setIsBig] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', onMouseMove)
    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    const interactiveSelector = '.arrow-btn, .dot, .slide'
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest(interactiveSelector)) {
        setIsBig(true)
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related?.closest(interactiveSelector)) {
        setIsBig(false)
      }
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    return () => {
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <div
      className={`cursor${isBig ? ' big' : ''}`}
      style={{ left: position.x, top: position.y }}
      aria-hidden="true"
    />
  )
}
