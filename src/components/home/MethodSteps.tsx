const STEPS = [
  {
    n: '01',
    title: 'Listen',
    text: 'Stakeholder interviews, content audits, and the questions users already ask — before a single headline.',
  },
  {
    n: '02',
    title: 'Frame',
    text: 'Map the decision path. Name what the page must unlock in 30–60 seconds.',
  },
  {
    n: '03',
    title: 'Write',
    text: 'Outcome-led copy, modular sections, and microcopy that removes friction at the edge.',
  },
  {
    n: '04',
    title: 'Systemize',
    text: 'Patterns, voice rules, and CMS modules so marketing can ship without breaking the story.',
  },
  {
    n: '05',
    title: 'Prove',
    text: 'Instrument the journey. Iterate on what moves comprehension, clicks, and booked conversations.',
  },
] as const

export function MethodSteps() {
  return (
    <section className="doc-section" id="method" aria-labelledby="method-heading">
      <div className="doc-section-head">
        <p className="doc-kicker">( act ii — method )</p>
        <h2 id="method-heading" className="doc-title">
          How the work gets clear
        </h2>
        <p className="doc-lede">
          Whether for a program page or a full site rebuild, the process stays steady.
        </p>
      </div>

      <ol className="method-list">
        {STEPS.map((step) => (
          <li className="method-item" key={step.n}>
            <span className="method-n">{step.n}</span>
            <div>
              <h3 className="method-title">{step.title}</h3>
              <p className="method-text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
