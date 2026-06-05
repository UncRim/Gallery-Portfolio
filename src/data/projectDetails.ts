import type { MediaBlock } from '../types/media'
import { buildGalleryBlock } from '../types/media'
import { getWebflowMedia } from './webflowAssets'

export type PatternType =
  | 'dots'
  | 'grid'
  | 'diagonal'
  | 'circles'
  | 'triangles'
  | 'lines'
  | 'radial'

export interface ProjectSection {
  title: string
  paragraphs: string[]
}

export interface ProjectResult {
  title: string
  description: string
}

export interface ProjectDetail {
  id: string
  slug: string
  title: string
  tag: string
  subtitle: string
  date: string
  colors: [string, string, string]
  patternType: PatternType
  coverImage: string
  coverVideo?: string
  coverLottie?: string
  role: string
  problem: string
  results: ProjectResult[]
  intro: string
  sections: ProjectSection[]
  media?: MediaBlock[]
  framerUrl?: string
  webflowUrl?: string
  liveUrl?: string
  liveCtaLabel?: string
  /** Key used to pull gallery assets from Webflow CDN */
  webflowGalleryKey?: string
}

type RawProject = ProjectDetail

function withWebflowMedia(project: RawProject): ProjectDetail {
  const key = project.webflowGalleryKey ?? project.slug
  const wf = getWebflowMedia(key)

  const useLocalCover = Boolean(
    project.coverLottie || project.coverImage?.startsWith('/'),
  )

  return {
    ...project,
    coverImage: useLocalCover ? project.coverImage : wf.coverImage || project.coverImage,
    coverVideo: useLocalCover ? project.coverVideo : wf.coverVideo ?? project.coverVideo,
    coverLottie: project.coverLottie,
    webflowUrl: wf.webflowUrl ?? project.webflowUrl,
    media: [...(project.media ?? []), ...wf.media],
  }
}

const rawProjectDetails: RawProject[] = [
  {
    id: 'higher-ed-concept',
    slug: 'higher-ed-concept',
    title: 'The Chapman Alumni Innovation Vault',
    tag: 'Concept · 2025',
    subtitle:
      'Redefining Higher Education Stakeholder Engagement through Spatial Web Design and Active Analytics.',
    date: '2025',
    colors: ['#1a1400', '#3d3000', '#0f0c00'],
    patternType: 'radial',
    coverImage: '/projects/higher-ed/poster.jpg',
    coverVideo: '/videos/higher-ed-spatial-web-concept.mp4',
    role: 'Product Designer (UX/UI & WebGL Prototype)',
    problem:
      'Elite alumni suffer from scroll fatigue. A standard 2D webpage fails to convey the scale of architectural projects or the prestige of institutional research, resulting in low engagement and missed funding opportunities.',
    results: [
      {
        title: 'Zero-download access',
        description: 'Browser-based spatial environment with no installation required.',
      },
      {
        title: 'Guided cinematic tour',
        description: 'Automatic camera path without manual panning.',
      },
      {
        title: 'Macro-to-micro dive',
        description: 'Cinematic camera dive into architectural models.',
      },
      {
        title: 'Conversion-focused flow',
        description: 'Mentor CTA embedded within the immersive experience.',
      },
    ],
    intro:
      'Universities spend millions on campus expansion and cutting-edge research, but communicate these advancements to alumni through passive, 2D PDF newsletters and flat web portals.',
    sections: [
      {
        title: 'The Iterative Process & UX Refinements',
        paragraphs: [
          'The Concept: If we lock high-value institutional data behind an "Authenticated Spatial Vault," we can flip the psychology of the user from a passive reader to an exclusive insider.',
          'The "Macrodata" Aesthetic: Leveraging a minimalist, "Severance"-style void environment to focus the user\'s absolute attention on the 3D data and architectural models.',
        ],
      },
      {
        title: 'Iteration 1 — The Conceptual Void',
        paragraphs: [
          'Built an infinite, pitch-black WebGL grid with floating abstract math geometries. The sci-fi aesthetic was too alienating for an academic institution — we pivoted.',
        ],
      },
      {
        title: 'Iteration 4 — The Macro-to-Micro Dive',
        paragraphs: [
          'Engineered a cinematic camera-dive: clicking "View Virtual Tour" swoops into the 3D clay model, fades to black, and launches a full-screen architectural video overlay.',
        ],
      },
    ],
    framerUrl: 'https://denelsenuix.framer.website/projects/higher-ed-concept',
    liveUrl: 'https://the-chapman-alumni-vault-concept.netlify.app/',
    liveCtaLabel: 'Explore the Alumni Innovation Vault',
  },
  {
    id: 'ticketmaster-spatial-seat-selection',
    slug: 'ticketmaster-spatial-seat-selection',
    title: 'Ticketmaster Spatial Seat Selection Concept',
    tag: 'Concept · 2025',
    subtitle:
      'I redesigned the Ticketmaster seating experience so fans can answer the only question that matters when spending hundreds of dollars: What will my view actually look like?',
    date: '2025',
    colors: ['#0a1628', '#0147ff', '#001a3d'],
    patternType: 'grid',
    coverImage: '/projects/ticketmaster/poster.jpg',
    coverVideo: '/videos/ticketmaster-spatial-seat-selection.mp4',
    role: 'Spatial UX Designer · 3D Interaction Design · WebGL Prototyping',
    problem:
      'Fans were forced to toggle between abstract 2D seating charts, dense price lists, and tiny, inaccurate preview images. The disjointed experience caused high cognitive load, anxiety over buying a "bad seat," and hesitation that ultimately led to cart abandonment or buyer\'s remorse.',
    results: [
      {
        title: 'Eliminated guesswork',
        description: '3D spatial previews show exact stage angle and distance before buying.',
      },
      {
        title: 'Frictionless selection',
        description:
          'Seat clicking, detail viewing, and pricing updates happen in one unified window.',
      },
      {
        title: 'Reduced decision fatigue',
        description:
          'Glassmorphic side panel keeps focus entirely on the venue and the ticket.',
      },
      {
        title: 'Performance optimized',
        description: 'React Three Fiber canvas loads instantly without tanking framerates.',
      },
    ],
    intro:
      'The new 3D spatial UI surfaces the exact stage view, pricing, and checkout actions in a single, immersive path, eliminating the anxiety of blind buying. Fans don\'t want to decipher a map; they want to feel like they are already in the venue.',
    sections: [
      {
        title: 'From Blind Guessing to Buying with Confidence',
        paragraphs: [
          'I reframed the seating chart to match their mental checklist — view, price, action. The UI is built around a dynamic 3D environment where every click either validates their seat choice or smoothly guides them to checkout.',
        ],
      },
      {
        title: 'Audit & Spatial UX Redesign',
        paragraphs: [
          'Audit & goals: Define the micro-moment of highest anxiety — the seat selection — and eliminate the visual disconnect.',
          'Spatial UX redesign: Fluid flow — Orbit view → Click 3D seat mesh → UI overlay instantly reveals view, price, and "Add to Cart."',
          'Interaction strategy: Replace complex raycasting math with React Three Fiber onClick events directly on the seat meshes, lifting state to seamlessly sync the 3D model and 2D HTML.',
        ],
      },
      {
        title: 'Components, A11y & Handoff',
        paragraphs: [
          'Components: Interactive 3D venue model, glassmorphic dynamic side panel, sticky checkout cart updating in real-time, and smooth camera transitions.',
          'A11y & mobile: High-contrast UI overlays, touch-friendly 3D orbit controls, and clear typography legibility over the dark WebGL canvas.',
          'Handoff: Ready-to-implement React components mapping 3D nodes to UI state, complete with documented mesh hit zones and animation logic.',
        ],
      },
      {
        title: 'Making the Purchase Immersive',
        paragraphs: [
          'E-commerce for live events shouldn\'t feel like filling out a spreadsheet. This redesign treats the ticketing page as the first step of the concert experience. By proving the value visually, building excitement, and making the checkout frictionless, fans secure their tickets with total confidence.',
        ],
      },
    ],
    media: [
      buildGalleryBlock(
        [
          {
            src: '/projects/ticketmaster/spatial-ticket-hero.png',
            alt: 'Spatial ticket hero with event search and buy flow',
          },
          {
            src: '/projects/ticketmaster/arena-overview.png',
            alt: '3D arena overview with price guide and section selection',
          },
          {
            src: '/projects/ticketmaster/sightline-seat-view.png',
            alt: 'Sightline preview with seat details and secure seats CTA',
          },
          {
            src: '/projects/ticketmaster/ticket-confirmed.png',
            alt: 'Ticket confirmed state with seat mesh selection',
          },
        ],
        'Spatial seat selection screens',
      ),
    ],
    liveUrl: 'https://ticketmaster-concept.netlify.app/',
    liveCtaLabel: 'Test the spatial seat selector',
  },
  {
    id: 'safescroll',
    slug: 'safescroll',
    title: 'SafeScroll',
    tag: 'Concept · 2025',
    subtitle: 'Breaking Doomscroll Loops with Intent + Friends',
    date: '2025',
    colors: ['#0d2b1e', '#1a6b4a', '#0a4a2a'],
    patternType: 'dots',
    coverImage: '/projects/safescroll/poster.jpg',
    coverVideo: '/videos/safescroll.mp4',
    webflowGalleryKey: 'safescroll',
    role: 'Product Designer',
    problem:
      '53% of Gen Z and 46% of millennials admit to doomscrolling regularly. Current wellness apps focus on blocking or mindfulness — not integrated, psychologically informed solutions.',
    results: [
      {
        title: 'User growth',
        description: '40% increase in active weekly users within 3 months.',
      },
      {
        title: 'Faster workflows',
        description: '35% reduction in average task time for key workflows.',
      },
      {
        title: 'High satisfaction',
        description: '4.7/5 user satisfaction in post-launch feedback.',
      },
      {
        title: 'Humane guardrails',
        description: 'Attention stewardship without surveillance or shame.',
      },
    ],
    intro:
      'SafeScroll emerges to address doomscrolling — a compulsive behavior where users endlessly scroll through negative or anxiety-inducing content on social media and news platforms.',
    sections: [
      {
        title: 'Understanding the Pain Points',
        paragraphs: [
          'SafeScroll isn\'t a timer app. The core loop — start with intent, keep exits easy, reflect without shame — treats attention as something to steward, not police.',
          'We meet the user before (Ask bar), during (limit overlay), and after (Recap), where behavior actually changes.',
        ],
      },
    ],
    framerUrl: 'https://denelsenuix.framer.website/projects/safescroll',
  },
  {
    id: 'katz-master-in-ai-program-page',
    slug: 'katz-master-in-ai-program-page',
    title: 'Master in AI (KATZ School) Page Redesign',
    tag: 'Web Design · 2025',
    subtitle: 'From brochure page to decision tool.',
    date: '2025',
    colors: ['#1a1a2e', '#2a2a5e', '#111130'],
    patternType: 'grid',
    coverImage: '/projects/katz/hero-and-proof.png',
    coverVideo: '/videos/katz-master-in-ai.mp4',
    role: 'Web Designer (UX/UI) · IA · Content Strategy · A11y',
    problem:
      'Prospective students couldn\'t quickly understand the program\'s value, outcomes, or next steps. The page felt dense and brochure-like.',
    results: [
      {
        title: 'Improved scanability',
        description: 'Value, proof, and actions visible in one scroll.',
      },
      {
        title: 'Clearer pathways',
        description:
          'Simplified IA to admissions and sticky mobile CTAs reduce decision friction.',
      },
      {
        title: 'Deeper engagement',
        description: 'Visitors spend more time with outcomes and projects.',
      },
      {
        title: 'Editor-friendly',
        description: 'Modular sections that marketing can update without breaking UX.',
      },
    ],
    intro:
      'I redesigned the Katz Master\'s in AI page so prospects can answer: What will I learn? Who\'s teaching this? What can I do after? Where\'s the proof — and how do I take the next step?',
    sections: [
      {
        title: 'Making the Decision Obvious',
        paragraphs: [
          'Linear IA: Hero → Why/Outcomes → Projects & Faculty → Admissions/FAQ. Every block either reduces uncertainty or advances a decision.',
        ],
      },
    ],
    media: [
      buildGalleryBlock(
        [
          {
            src: '/projects/katz/hero-and-proof.png',
            alt: 'Hero section with proof above the fold and primary CTAs',
          },
          {
            src: '/projects/katz/program-highlights-students.png',
            alt: 'Program highlights and student outcome story cards',
          },
          {
            src: '/projects/katz/faculty-and-news.png',
            alt: 'Faculty spotlight grid and program news carousel',
          },
          {
            src: '/projects/katz/modular-layout-story.png',
            alt: 'Modular layout system and mobile decision journey',
          },
        ],
        'Page redesign screens',
      ),
    ],
    framerUrl: 'https://denelsenuix.framer.website/projects/katz-master-in-ai-program-page',
  },
  {
    id: 'tshaped-redesigned',
    slug: 'tshaped-redesigned',
    title: 'Website Rebuild — From strategy site to a conversion system',
    tag: 'Web Redesign · 2025',
    subtitle: 'Clarity first. Proof fast. Booked calls, not brochure clicks.',
    date: '2025',
    colors: ['#2a1a08', '#5a3810', '#1c1208'],
    patternType: 'diagonal',
    coverImage:
      'https://cdn.prod.website-files.com/678bf7b74db9aadd19501ce9/6921683e01fc00d35b719032_Case%20Study%20Cover%20-%201.png',
    webflowGalleryKey: 't-shaped-reshaped',
    role: 'Lead UX/UI Designer · HubSpot CMS · Analytics (GA4/Hotjar)',
    problem:
      'Prospects couldn\'t answer: What do you do? Does it work? What\'s my next step? CTAs were buried and load times sluggish.',
    results: [
      {
        title: 'Lower bounce rate',
        description: 'Bounce rate down 19 pts on the home page.',
      },
      {
        title: 'More CTA clicks',
        description: 'Primary CTA clicks up 22%.',
      },
      {
        title: 'Newsletter lift',
        description: 'Open rate up 34% in the first 30 days.',
      },
      {
        title: 'Clean launch',
        description: 'Zero 404s post-launch.',
      },
    ],
    intro:
      'T Shaped runs evidence-based leadership sprints. I rebuilt their site in HubSpot CMS — reframing the story around outcomes and proof, engineering a faster path from curiosity to "Book Fit Call."',
    sections: [
      {
        title: 'From static brochure to booking engine',
        paragraphs: [
          'Behavioral data showed visitors hovering on services and testimonials while skipping long prose. We rebuilt around four questions prospects actually ask.',
        ],
      },
    ],
    framerUrl: 'https://denelsenuix.framer.website/projects/tshaped-redesigned',
  },
]

export const projectDetails: ProjectDetail[] = rawProjectDetails.map(withWebflowMedia)

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug)
}

export function getProjectById(id: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.id === id)
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectDetail | null
  next: ProjectDetail | null
} {
  const index = projectDetails.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? projectDetails[index - 1] : null,
    next: index < projectDetails.length - 1 ? projectDetails[index + 1] : null,
  }
}
