import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/ProjectPage'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
