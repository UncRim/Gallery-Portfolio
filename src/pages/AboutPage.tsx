import { Link } from 'react-router-dom'
import { ExperienceAccordion } from '../components/about/ExperienceAccordion'
import { WorkedWithLogos } from '../components/about/WorkedWithLogos'
import { ShellNav } from '../components/shell/ShellNav'
import { Hicon } from '../components/icons/Hicon'
import {
  aboutHeadshot,
  aboutIntro,
  commencementSpeechUrl,
  researchPaperUrl,
} from '../data/about'

export function AboutPage() {
  return (
    <div className="page-wrap about-page">
      <ShellNav />
      <main className="page-main">
        <Link to="/" className="page-back">
          ← Home
        </Link>

        <p className="doc-kicker">( biography )</p>
        <h1 className="about-title">About Me</h1>

        <section className="about-hero" aria-label="Profile">
          <div className="about-hero-media">
            <img
              src={aboutHeadshot}
              alt="Denelsen Dandi portrait"
              className="about-hero-photo"
              width={640}
              height={640}
              loading="eager"
            />
          </div>
          <div className="about-hero-copy">
            <p className="about-hero-label">Graduation · 2026</p>
            <div className="about-hero-links">
              <a
                href={commencementSpeechUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="about-hero-link"
              >
                Watch my commencement speech
                <Hicon name="external-link" size={14} aria-hidden />
              </a>
              <a
                href={researchPaperUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="about-hero-link"
              >
                Read my research paper
                <Hicon name="external-link" size={14} aria-hidden />
              </a>
            </div>
          </div>
        </section>

        <div className="about-intro-block">
          {aboutIntro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <WorkedWithLogos />

        <section className="doc-section" aria-labelledby="experience-heading">
          <p className="doc-kicker">( experience )</p>
          <h2 id="experience-heading" className="doc-title">
            Roles
          </h2>
          <ExperienceAccordion />
        </section>
      </main>
      <footer className="site-colophon">
        <span>© {new Date().getFullYear()} Denelsen Dandi</span>
        <span>New York</span>
      </footer>
    </div>
  )
}
