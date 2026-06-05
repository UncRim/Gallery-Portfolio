import { useEffect, useState } from 'react'

function formatLocalDateTime(date: Date) {
  const datePart = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)

  const timePart = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)

  return `${datePart} · ${timePart}`
}

interface LocalDateTimeProps {
  className?: string
}

export function LocalDateTime({ className }: LocalDateTimeProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = () => setNow(new Date())
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <time className={className} dateTime={now.toISOString()}>
      {formatLocalDateTime(now)}
    </time>
  )
}
