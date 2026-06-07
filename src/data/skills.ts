export type SkillId =
  | 'figma'
  | 'blender'
  | 'cursor'
  | 'gemini'
  | 'chatgpt'
  | 'drupal'
  | 'hubspot'

export interface Skill {
  id: SkillId
  name: string
  domain: string
}

export const SKILLS: Record<SkillId, Skill> = {
  figma: { id: 'figma', name: 'Figma', domain: 'figma.com' },
  blender: { id: 'blender', name: 'Blender', domain: 'blender.org' },
  cursor: { id: 'cursor', name: 'Cursor', domain: 'cursor.com' },
  gemini: { id: 'gemini', name: 'Gemini', domain: 'gemini.google.com' },
  chatgpt: { id: 'chatgpt', name: 'ChatGPT', domain: 'openai.com' },
  drupal: { id: 'drupal', name: 'Drupal', domain: 'drupal.org' },
  hubspot: { id: 'hubspot', name: 'HubSpot', domain: 'hubspot.com' },
}
