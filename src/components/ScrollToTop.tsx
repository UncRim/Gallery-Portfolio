import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_MEASUREMENT_ID = 'G-SR1FF5QWJV'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    window.gtag?.('config', GA_MEASUREMENT_ID, { page_path: pathname })
  }, [pathname])

  return null
}
