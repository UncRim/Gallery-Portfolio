import { FieldNotes } from '../components/home/FieldNotes'
import { HomeContact } from '../components/home/HomeContact'
import { HomeHero } from '../components/home/HomeHero'
import { MethodSteps } from '../components/home/MethodSteps'
import { SpecimenList } from '../components/home/SpecimenList'
import { LineArtScene } from '../components/LineArtScene'
import { ShellNav } from '../components/shell/ShellNav'

export function HomePage() {
  return (
    <div className="site-shell">
      <ShellNav />
      <main className="site-main">
        <HomeHero />
        <LineArtScene />
        <SpecimenList />
        <MethodSteps />
        <FieldNotes />
        <HomeContact />
      </main>
      <footer className="site-colophon">
        <span>© {new Date().getFullYear()} Denelsen Dandi</span>
        <span>New York</span>
        <span>Content · UX writing · Systems</span>
      </footer>
    </div>
  )
}
