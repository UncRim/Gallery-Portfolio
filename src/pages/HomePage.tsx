import { CoverFlow } from '../components/CoverFlow'
import { CustomCursor } from '../components/CustomCursor'
import { SiteFooter } from '../components/SiteFooter'
import { Header } from '../components/Header'

export function HomePage() {
  return (
    <div className="home-shell">
      <CustomCursor />
      <div className="card">
        <Header />
        <CoverFlow />
        <SiteFooter variant="card" />
      </div>
    </div>
  )
}
