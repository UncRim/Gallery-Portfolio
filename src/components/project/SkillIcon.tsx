import type { ReactNode } from 'react'
import type { SkillId } from '../../data/skills'
import { SKILLS } from '../../data/skills'

interface SkillIconProps {
  id: SkillId
}

export function SkillIcon({ id }: SkillIconProps) {
  const { name } = SKILLS[id]

  return (
    <span className="post-fact-skill" title={name} aria-label={name}>
      {skillSvgs[id]}
    </span>
  )
}

const skillSvgs: Record<SkillId, ReactNode> = {
  figma: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1ABCFE"
        d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8Z"
      />
      <path
        fill="#0ACF83"
        d="M4 16a4 4 0 0 0 4 4h4v-4a4 4 0 0 0-4-4H4Z"
      />
      <path fill="#FF7262" d="M4 8a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" />
      <path fill="#F24E1E" d="M12 0h4a4 4 0 1 1 0 8h-4V0Z" />
      <path fill="#A259FF" d="M20 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </svg>
  ),
  blender: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#E87D0D" />
      <path
        fill="#fff"
        d="M10.2 6.8h3.6l.9 2.2h2.4l-3.2 7.5c-.3.7-.9 1.1-1.7 1.1h-2.4l1.1-2.6H9.1l-1.4 3.3H5.3l3.2-7.5h2.4l-.7-1.7Zm1.5 4.4 1.2 2.8h2.1l-1.2-2.8h-2.1Z"
      />
    </svg>
  ),
  cursor: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0B0B0B" />
      <path
        fill="#F5F5F5"
        d="M7 7.5 16 6l-1.5 9.5-2.8-3.4-3.4 3.8L7 7.5Z"
      />
      <path fill="#555" d="m11.7 12.1 2.8 3.4.5-3.1-3.3-.3Z" />
    </svg>
  ),
  gemini: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="geminiGrad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#4E80EE" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <path
        fill="url(#geminiGrad)"
        d="M12 2 13.8 10.2 22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-1.8L12 2Z"
      />
    </svg>
  ),
  chatgpt: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#10A37F" />
      <path
        fill="#fff"
        d="M12 5.5c-2.2 0-3.9 1.2-4.8 3-.5-.2-1-.3-1.5-.3-1.8 0-3.2 1.5-3.2 3.3 0 1.1.5 2 1.3 2.6-.2.5-.3 1-.3 1.6 0 2.2 1.7 4 3.9 4.1.7 1.6 2.3 2.7 4.1 2.7 1 0 1.9-.3 2.7-.8.8.5 1.7.8 2.7.8 1.8 0 3.4-1.1 4.1-2.7 2.2-.1 3.9-1.9 3.9-4.1 0-.6-.1-1.1-.3-1.6.8-.6 1.3-1.5 1.3-2.6 0-1.8-1.4-3.3-3.2-3.3-.5 0-1 .1-1.5.3-.9-1.8-2.6-3-4.8-3Zm0 1.4c1.5 0 2.7.8 3.3 2.1l-1.2.7c-.4-.8-1.2-1.3-2.1-1.3-1 0-1.8.6-2.2 1.5l-1.2-.7c.6-1.3 1.8-2.1 3.4-2.1Zm-5.5 2.4c.9 0 1.7.4 2.2 1.1l-1.2.7c-.3-.4-.7-.6-1-.6-.6 0-1 .5-1 1.1s.4 1.1 1 1.1c.3 0 .7-.2 1-.6l1.2.7c-.5.7-1.3 1.1-2.2 1.1-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5Zm11 0c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5c-.9 0-1.7-.4-2.2-1.1l1.2-.7c.3.4.7.6 1 .6.6 0 1-.5 1-1.1s-.4-1.1-1-1.1c-.3 0-.7.2-1 .6l-1.2-.7c.5-.7 1.3-1.1 2.2-1.1ZM12 14.2c.6 0 1.1.2 1.5.5l-1.5 2.6-1.5-2.6c.4-.3.9-.5 1.5-.5Z"
      />
    </svg>
  ),
  drupal: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0678BE" />
      <path
        fill="#fff"
        d="M12 4.5c-2.8 3.2-4.5 6.2-4.5 9a4.5 4.5 0 0 0 9 0c0-2.8-1.7-5.8-4.5-9Zm0 13.5a3 3 0 0 1-3-3c0-1.8 1-3.8 3-6.2 2 2.4 3 4.4 3 6.2a3 3 0 0 1-3 3Z"
      />
    </svg>
  ),
  hubspot: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#FF7A59" />
      <circle cx="15.8" cy="8.6" r="2.2" fill="#fff" />
      <path
        fill="#fff"
        d="M10.2 8.8a3.4 3.4 0 0 0 0 6.4 3.4 3.4 0 0 0 0-6.4Zm-4.1 1.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm8.3 5.2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Z"
      />
      <path
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
        d="M12.4 11.2 14 9.8M8.1 12.3 10.2 11.2M12.4 14 14.8 15.2"
      />
    </svg>
  ),
}
