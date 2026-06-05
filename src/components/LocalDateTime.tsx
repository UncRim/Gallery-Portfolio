import { useEffect, useMemo, useState } from 'react'

function getLocationLabel() {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const city = timeZone.includes('/') ? timeZone.split('/').pop()! : timeZone
    return city.replace(/_/g, ' ')
  } catch {
    return 'Local'
  }
}

function formatLocationTime(date: Date, location: string) {
  const timePart = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)

  return `${location} · ${timePart}`
}

interface LocalDateTimeProps {
  className?: string
}

export function LocalDateTime({ className }: LocalDateTimeProps) {
  const location = useMemo(() => getLocationLabel(), [])
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = () => setNow(new Date())
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <time className={className} dateTime={now.toISOString()}>
      {formatLocationTime(now, location)}
    </time>
  )
}
