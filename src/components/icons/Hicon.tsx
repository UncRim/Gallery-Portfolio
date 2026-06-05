import type { SVGAttributes } from 'react'
import { HICON_PATHS, type HiconName } from '../../icons/hiconPaths'

export type { HiconName }

interface HiconProps extends SVGAttributes<SVGSVGElement> {
  name: HiconName
  size?: number
}

export function Hicon({ name, size = 24, className, ...props }: HiconProps) {
  const markup = HICON_PATHS[name]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ? `hicon ${className}` : 'hicon'}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
