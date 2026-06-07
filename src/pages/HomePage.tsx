import { CoverFlow } from '../components/CoverFlow'
import { CustomCursor } from '../components/CustomCursor'
import { IdentityStrip } from '../components/IdentityStrip'
import { SiteFooter } from '../components/SiteFooter'
import { Header } from '../components/Header'
import { TestimonialsStrip } from '../components/TestimonialsStrip'

export function HomePage() {
  return (
    <div className="home-shell">
      <CustomCursor />
      <div className="card">
        <Header />
        <IdentityStrip />
        <CoverFlow />
        <TestimonialsStrip visibility="mobile" variant="marquee" />
        <SiteFooter variant="card" />
      </div>
    </div>
  )
}
