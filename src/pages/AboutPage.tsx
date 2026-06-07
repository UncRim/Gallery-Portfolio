import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { TestimonialsStrip } from '../components/TestimonialsStrip'
import { ExperienceAccordion } from '../components/about/ExperienceAccordion'
import { AboutIntroTyping } from '../components/about/AboutIntroTyping'
import { Hicon } from '../components/icons/Hicon'
import { aboutHeadshot, commencementSpeechUrl, researchPaperUrl } from '../data/about'

export function AboutPage() {
  return (
    <div className="about-page project-page">
      <SiteHeader />

      <main className="about-main">
        <header className="about-header">
          <h1 className="about-title">About</h1>
        </header>

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
                <Hicon name="external-link" size={16} aria-hidden />
              </a>
              <a
                href={researchPaperUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="about-hero-link"
              >
                Read my research paper
                <Hicon name="external-link" size={16} aria-hidden />
              </a>
            </div>
          </div>
        </section>

        <AboutIntroTyping />

        <section className="about-experience" aria-labelledby="about-experience-heading">
          <h2 id="about-experience-heading">Experience</h2>
          <ExperienceAccordion />
        </section>
      </main>

      <TestimonialsStrip visibility="desktop" variant="marquee" />
      <SiteFooter />
    </div>
  )
}
