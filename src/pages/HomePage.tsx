import { CoverFlow } from '../components/CoverFlow'
import { CustomCursor } from '../components/CustomCursor'
import { IdentityStrip } from '../components/IdentityStrip'
import { SiteFooter } from '../components/SiteFooter'
import { Header } from '../components/Header'

export function HomePage() {
  return (
    <div className="home-shell">
      <CustomCursor />
      <div className="card">
        <Header />
        <IdentityStrip />
        <CoverFlow />
        <SiteFooter variant="card" />
      </div>
    </div>
  )
}
