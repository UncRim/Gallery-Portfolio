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
}

export const SKILLS: Record<SkillId, Skill> = {
  figma: { id: 'figma', name: 'Figma' },
  blender: { id: 'blender', name: 'Blender' },
  cursor: { id: 'cursor', name: 'Cursor' },
  gemini: { id: 'gemini', name: 'Gemini' },
  chatgpt: { id: 'chatgpt', name: 'ChatGPT' },
  drupal: { id: 'drupal', name: 'Drupal' },
  hubspot: { id: 'hubspot', name: 'HubSpot' },
}
