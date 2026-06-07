import type { SkillId } from '../../data/skills'
import { SKILLS } from '../../data/skills'
import { useTheme } from '../../theme/ThemeProvider'
import { getBrandfetchLogoUrl } from '../../utils/brandfetchLogo'

interface SkillIconProps {
  id: SkillId
}

export function SkillIcon({ id }: SkillIconProps) {
  const { theme } = useTheme()
  const { name, domain } = SKILLS[id]
  const logoUrl = getBrandfetchLogoUrl({ domain, theme })

  return (
    <span className="post-fact-skill" title={name} aria-label={name}>
      <img src={logoUrl} alt="" width={22} height={22} loading="lazy" decoding="async" />
    </span>
  )
}
