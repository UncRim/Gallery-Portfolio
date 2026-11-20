import { workedWithLogos } from '../../data/about'

export function HomeContact() {
  return (
    <>
      <section className="doc-section" id="collaborators" aria-labelledby="collab-heading">
        <div className="doc-section-head">
          <p className="doc-kicker">( collaborators )</p>
          <h2 id="collab-heading" className="doc-title">
            Teams I’ve written with
          </h2>
        </div>
        <ul className="collab-grid">
          {workedWithLogos.map((company) => (
            <li key={company.id} className="collab-item">
              <img src={company.logo} alt={company.name} width={56} height={56} loading="lazy" />
            </li>
          ))}
        </ul>
      </section>

      <section className="doc-section home-contact" id="contact" aria-labelledby="contact-heading">
        <p className="doc-kicker">( curtain call )</p>
        <h2 id="contact-heading" className="doc-title home-contact-title">
          Let’s make the next step obvious.
        </h2>
        <p className="doc-lede">
          Briefs, content systems, program pages, and product narratives — based in New York,
          open for collaboration.
        </p>
        <div className="home-hero-ctas">
          <a className="btn-ink" href="mailto:ddandi@mail.yu.edu">
            Email Denelsen
            <span aria-hidden="true">→</span>
          </a>
          <a
            className="btn-ghost"
            href="https://www.linkedin.com/in/denelsen-dandi/"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </>
  )
}
