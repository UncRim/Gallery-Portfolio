export function HomeHero() {
  return (
    <section className="home-hero" aria-label="Introduction">
      <p className="doc-kicker">( now showing )</p>
      <h1 className="home-hero-name">Denelsen Dandi</h1>
      <p className="home-hero-lede">
        Content designer in New York — I turn dense product systems into language people can
        trust, scan, and act on.
      </p>
      <div className="home-hero-meta">
        <span>IBM · Content Developer/Designer</span>
        <span aria-hidden="true">·</span>
        <span>Higher Ed · Startups · NGOs</span>
        <span aria-hidden="true">·</span>
        <span>Available for collaboration</span>
      </div>
      <div className="home-hero-ctas">
        <a className="btn-ink" href="#specimens">
          Read the work
          <span aria-hidden="true">→</span>
        </a>
        <a className="btn-ghost" href="mailto:ddandi@mail.yu.edu">
          Start a brief
        </a>
      </div>
    </section>
  )
}
