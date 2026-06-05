interface FactsCardsProps {
  role: string
  problem: string
}

export function FactsCards({ role, problem }: FactsCardsProps) {
  return (
    <section className="post-facts" aria-label="Role and problem">
      <article className="post-fact-card">
        <h2 className="post-fact-label">Role</h2>
        <p className="post-fact-text">{role}</p>
      </article>
      <article className="post-fact-card">
        <h2 className="post-fact-label">Problem</h2>
        <p className="post-fact-text">{problem}</p>
      </article>
    </section>
  )
}
