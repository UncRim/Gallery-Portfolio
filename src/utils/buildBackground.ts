import type { PatternType, Project } from '../data/projects'

const svgTemplates: Record<
  PatternType,
  (c0: string, c1: string, c2: string) => string
> = {
  dots: (c0, c1) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='560'>
      <defs>
        <radialGradient id='rg' cx='50%' cy='50%' r='70%'>
          <stop offset='0%' stop-color='${c1}'/>
          <stop offset='100%' stop-color='${c0}'/>
        </radialGradient>
        <pattern id='pt' x='0' y='0' width='28' height='28' patternUnits='userSpaceOnUse'>
          <circle cx='14' cy='14' r='1.5' fill='rgba(255,255,255,0.12)'/>
        </pattern>
      </defs>
      <rect width='400' height='560' fill='url(#rg)'/>
      <rect width='400' height='560' fill='url(#pt)'/>
      <circle cx='200' cy='240' r='100' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/>
      <circle cx='200' cy='240' r='60' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/>
      <circle cx='200' cy='240' r='22' fill='rgba(255,255,255,0.07)'/>
    </svg>`,

  grid: (_c0, c1, c2) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='560'>
      <defs>
        <linearGradient id='lg' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${c2}'/>
          <stop offset='100%' stop-color='${c1}'/>
        </linearGradient>
        <pattern id='pt' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
          <path d='M40 0H0V40' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='0.5'/>
        </pattern>
      </defs>
      <rect width='400' height='560' fill='url(#lg)'/>
      <rect width='400' height='560' fill='url(#pt)'/>
      <polygon points='200,120 320,340 80,340' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/>
    </svg>`,

  diagonal: (c0, c1) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='560'>
      <defs>
        <linearGradient id='lg' x1='0' y1='1' x2='1' y2='0'>
          <stop offset='0%' stop-color='${c0}'/>
          <stop offset='100%' stop-color='${c1}'/>
        </linearGradient>
        <pattern id='pt' x='0' y='0' width='30' height='30' patternUnits='userSpaceOnUse'>
          <line x1='0' y1='30' x2='30' y2='0' stroke='rgba(255,255,255,0.07)' stroke-width='0.5'/>
        </pattern>
      </defs>
      <rect width='400' height='560' fill='url(#lg)'/>
      <rect width='400' height='560' fill='url(#pt)'/>
      <rect x='60' y='100' width='280' height='360' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1' rx='8'/>
      <rect x='100' y='140' width='200' height='280' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1' rx='4'/>
    </svg>`,

  circles: (c0, c1) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='560'>
      <defs>
        <radialGradient id='rg' cx='60%' cy='40%' r='70%'>
          <stop offset='0%' stop-color='${c1}'/>
          <stop offset='100%' stop-color='${c0}'/>
        </radialGradient>
      </defs>
      <rect width='400' height='560' fill='url(#rg)'/>
      <circle cx='100' cy='160' r='60' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/>
      <circle cx='300' cy='360' r='90' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/>
      <circle cx='280' cy='140' r='40' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/>
      <circle cx='200' cy='280' r='6' fill='rgba(255,255,255,0.2)'/>
    </svg>`,

  triangles: (c0, c1) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='560'>
      <defs>
        <linearGradient id='lg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='${c1}'/>
          <stop offset='100%' stop-color='${c0}'/>
        </linearGradient>
      </defs>
      <rect width='400' height='560' fill='url(#lg)'/>
      <polygon points='200,60 380,400 20,400' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/>
      <polygon points='200,140 320,360 80,360' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'/>
      <polygon points='200,200 270,330 130,330' fill='rgba(255,255,255,0.04)'/>
    </svg>`,

  lines: (c0, c1) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='560'>
      <defs>
        <linearGradient id='lg' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stop-color='${c0}'/>
          <stop offset='100%' stop-color='${c1}'/>
        </linearGradient>
        <pattern id='pt' x='0' y='0' width='1' height='20' patternUnits='userSpaceOnUse'>
          <line x1='0' y1='0' x2='0' y2='18' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/>
        </pattern>
      </defs>
      <rect width='400' height='560' fill='url(#lg)'/>
      <rect width='400' height='560' fill='url(#pt)'/>
      <rect x='40' y='80' width='320' height='220' rx='4' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'/>
      <rect x='60' y='120' width='100' height='8' rx='4' fill='rgba(255,255,255,0.2)'/>
      <rect x='60' y='142' width='220' height='5' rx='2.5' fill='rgba(255,255,255,0.08)'/>
      <rect x='60' y='162' width='170' height='5' rx='2.5' fill='rgba(255,255,255,0.06)'/>
    </svg>`,

  radial: (c0, c1) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='560'>
      <defs>
        <radialGradient id='rg' cx='50%' cy='50%' r='60%'>
          <stop offset='0%' stop-color='${c1}'/>
          <stop offset='100%' stop-color='${c0}'/>
        </radialGradient>
      </defs>
      <rect width='400' height='560' fill='url(#rg)'/>
      <line x1='200' y1='0' x2='200' y2='560' stroke='rgba(255,255,255,0.06)' stroke-width='0.5'/>
      <line x1='0' y1='280' x2='400' y2='280' stroke='rgba(255,255,255,0.06)' stroke-width='0.5'/>
      <circle cx='200' cy='280' r='140' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='0.5'/>
      <circle cx='200' cy='280' r='90' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='0.5'/>
      <circle cx='200' cy='280' r='50' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/>
      <circle cx='200' cy='280' r='5' fill='rgba(255,255,255,0.3)'/>
    </svg>`,
}

export function buildBackground(project: Project): string {
  const [c0, c1, c2] = project.colors
  const template = svgTemplates[project.patternType] ?? svgTemplates.dots
  const svg = template(c0, c1, c2).trim()
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export function getSlideBackground(project: Project): {
  backgroundImage: string
  backgroundPosition?: string
} {
  if (project.image) {
    return {
      backgroundImage: `url("${project.image}")`,
      backgroundPosition: project.imagePosition ?? 'center',
    }
  }
  return { backgroundImage: buildBackground(project) }
}
