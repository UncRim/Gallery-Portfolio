import type { SkillId } from '../../data/skills'
import { SkillIcon } from './SkillIcon'

interface FactsCardsProps {
  role: string
  skills: SkillId[]
  problem: string
}

export function FactsCards({ role, skills, problem }: FactsCardsProps) {
  return (
    <section className="post-facts" aria-label="Role and problem">
      <article className="post-fact-card">
        <h2 className="post-fact-label">Role</h2>
        <p className="post-fact-text">{role}</p>
        {skills.length > 0 && (
          <div className="post-fact-skills">
            <h3 className="post-fact-skills-label">Tools</h3>
            <ul className="post-fact-skills-list">
              {skills.map((skill) => (
                <li key={skill}>
                  <SkillIcon id={skill} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
      <article className="post-fact-card">
        <h2 className="post-fact-label">Problem</h2>
        {problem.split('\n\n').map((paragraph) => (
          <p className="post-fact-text" key={paragraph.slice(0, 48)}>
            {paragraph}
          </p>
        ))}
      </article>
    </section>
  )
}
