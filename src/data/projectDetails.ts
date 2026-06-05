import type { SkillId } from './skills'
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

export interface ProjectSectionBlock {
  label: string
  text: string
}

export interface ProjectSectionSubsection {
  title: string
  blocks: ProjectSectionBlock[]
}

export interface ProjectSection {
  title: string
  paragraphs?: string[]
  subsections?: ProjectSectionSubsection[]
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
  skills: SkillId[]
  problem: string
  results: ProjectResult[]
  intro: string
  insight?: string
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
    skills: ['blender', 'gemini', 'cursor', 'figma'],
    problem:
      'The Concept: If we lock high-value institutional data behind an "Authenticated Spatial Vault," we can flip the psychology of the user from a passive reader to an exclusive insider.\n\nThe "Macrodata" Aesthetic: Leveraging a minimalist, "Severance"-style void environment to focus the user\'s absolute attention on the 3D data and architectural models, eliminating the visual clutter of standard university websites.',
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
        subsections: [
          {
            title: 'Iteration 1: The Conceptual Void & Social Proof',
            blocks: [
              {
                label: 'Initial State',
                text: 'Built an infinite, pitch-black WebGL grid with floating abstract math geometries. Explored "ghost avatars" (proximity chat) to simulate the networking aspect of alumni events.',
              },
              {
                label: 'The Pivot',
                text: 'The sci-fi aesthetic was too alienating for an academic institution.',
              },
            ],
          },
          {
            title: 'Iteration 2: Architectural Grounding & Chiaroscuro Lighting',
            blocks: [
              {
                label: 'The Problem',
                text: 'The pure white 3D objects were blowing out the camera exposure, and the global lighting washed out the contrast.',
              },
              {
                label: 'The Solution',
                text: 'Transitioned to an "Architectural Exhibition" vibe. Replaced abstract shapes with 3D building maquettes. Applied a warm, matte "Clay/Sand" material to retain detail without blinding the user. Tightened the WebGL spotlights to mimic theatrical staging, guiding the user\'s eye organically.',
              },
            ],
          },
          {
            title: 'Iteration 3: Solving Spatial Fatigue (The UI Bridge)',
            blocks: [
              {
                label: 'The Problem',
                text: 'Forcing non-gamers to manually navigate a 3D space causes drop-off. Furthermore, opening a 400px sidebar covered the 3D object, ruining the visual balance.',
              },
              {
                label: 'The Solution',
                text: 'Programmed a dynamic camera.setViewOffset() to perfectly re-center the 3D model whenever the 2D UI drawer opened. Introduced the [ NEXT PROJECT ➔ ] spatial arrow to create a guided, cinematic tour without requiring manual camera panning.',
              },
            ],
          },
          {
            title: 'Iteration 4: The Macro-to-Micro "Dive" (Virtual Tour)',
            blocks: [
              {
                label: 'The Problem',
                text: 'How to show the interior of a building without crashing the browser with heavy 3D interior assets?',
              },
              {
                label: 'The Solution',
                text: 'Engineered a cinematic camera-dive. Clicking "View Virtual Tour" swoops the camera into the 3D clay model, triggers a seamless fade-to-black, and launches a full-screen architectural video overlay—keeping the user trapped in the immersion while pushing the primary [ BECOME A RESEARCH MENTOR ] conversion button.',
              },
            ],
          },
        ],
      },
    ],
    media: [
      buildGalleryBlock(
        [
          {
            src: '/projects/higher-ed/architectural-exhibition.png',
            alt: 'Architectural exhibition hall with three building maquettes on lit pedestals',
          },
          {
            src: '/projects/higher-ed/struppa-research-park-detail.png',
            alt: 'Daniele C. Struppa Research Park detail drawer with funding stats and mentor CTA',
          },
          {
            src: '/projects/higher-ed/fowler-innovation-lab-detail.png',
            alt: 'Fowler School of Innovation Lab detail drawer with re-centered 3D model and next-project navigation',
          },
          {
            src: '/projects/higher-ed/virtual-tour-interior.png',
            alt: 'Virtual tour interior view with cinematic clay model dive and research mentor conversion CTA',
          },
        ],
        'Spatial WebGL prototype screens',
      ),
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
    skills: ['blender', 'figma', 'cursor'],
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
    title: 'Safe Scroll',
    tag: 'Concept · 2025',
    subtitle: 'Reducing Doomscrolling',
    date: '2025',
    colors: ['#0d2b1e', '#1a6b4a', '#0a4a2a'],
    patternType: 'dots',
    coverImage: '/projects/safescroll/poster.jpg',
    coverVideo: '/videos/safescroll.mp4',
    webflowGalleryKey: 'safescroll',
    role: 'Product Designer',
    skills: ['figma', 'chatgpt'],
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
      'Doomscrolling isn\'t a willpower failure — it\'s a design failure. Social platforms engineer compulsive engagement at the cost of user wellbeing, and Gen Z and millennials are bearing the consequences: disrupted sleep, rising anxiety, and hours lost to content they didn\'t choose.\n\nSafe Scroll is a mobile concept that intervenes without lecturing. Instead of blocking apps or issuing warnings, it introduces intentional friction at the right moment — surfacing awareness, offering a dignified way to step away, and helping users reclaim control of their own attention.',
    sections: [
      {
        title: 'What I designed',
        paragraphs: [
          'The concept covers onboarding, a session tracker, a mood check-in flow, and an "exit ramp" screen — 8 screens total, prototyped in Figma with motion to demonstrate the intervention at the moment of peak scroll velocity.',
        ],
      },
    ],
    insight:
      'The core principle: meet the user where they are. Not a wall that blocks. A door that opens somewhere better.',
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
    skills: ['figma', 'drupal', 'chatgpt'],
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
    skills: ['hubspot', 'figma', 'chatgpt'],
    problem:
      'Prospects couldn\'t answer: What do you do? Does it work? What\'s my next step? CTAs were buried and load times sluggish.',
    results: [
      {
        title: '−19 pts bounce rate',
        description: 'Home page bounce rate dropped after the rebuild.',
      },
      {
        title: '+22% CTA clicks',
        description: 'Primary call-to-action engagement increased post-launch.',
      },
      {
        title: '+34% open rate',
        description: 'Newsletter performance lift in the first 30 days.',
      },
      {
        title: 'Clean launch',
        description: 'Zero 404s post-launch.',
      },
    ],
    intro:
      'T Shaped runs leadership sprints for executives — but their website buried the point. Prospects couldn\'t answer three basic questions: what do you do, does it work, and what should I do next?\n\nI rebuilt the entire site in HubSpot CMS — restructuring the story around outcomes, surfacing proof early, and cutting the path from first visit to booked Fit Call.',
    sections: [
      {
        title: 'From static brochure to booking engine',
        paragraphs: [
          'Leaders don\'t buy "strategy websites." They buy clarity + proof. Behavioral data (Hotjar) showed visitors hovering on services and testimonials while skipping long prose. We reframed the page around the four questions prospects actually ask: What will I learn? Who\'s teaching this? What can I do after? Where\'s the proof? Then we rebuilt in HubSpot with modules that map to that decision path and a single, unmissable next step.',
        ],
        subsections: [
          {
            title: 'Approach',
            blocks: [
              {
                label: 'Discovery & data',
                text: 'Audit GA4 events, Hotjar heatmaps/scroll maps, GSC; identify friction and dead zones.',
              },
              {
                label: 'Story & IA',
                text: 'Translate outcomes into a skimmable narrative; map a shortest-path funnel to "Fit Call."',
              },
              {
                label: 'Wireframes → Figma components',
                text: 'Build a reusable section library (hero, tiles, proof, FAQs, capture, footer).',
              },
              {
                label: 'Content & microcopy',
                text: 'Outcome-led headlines, plain-language FAQs, social-proof pull-quotes.',
              },
              {
                label: 'Build in HubSpot',
                text: 'Drag-and-drop modules, schema, redirects, perf budgets, and QA.',
              },
              {
                label: 'Instrumentation & experiments',
                text: 'Event tagging, scroll-depth, CTA variants, and module order tests.',
              },
            ],
          },
        ],
      },
      {
        title: 'Solution (what I changed)',
        paragraphs: [
          'Outcome-first hero with one primary action ("Book 15-min Fit Call").',
          'Service Library (6 tiles) to self-select the right sprint—highly scannable entry points.',
          'Video-first testimonials (leaders speaking to outcomes) for instant proof.',
          'Mid-page micro-CTA for visitors convinced early; FAQ accordion to kill objections.',
          'Newsletter capture ("Performance Review Playbook") as a low-friction nurture.',
          'Trust marquees (logos + benefit bullets) near decision points.',
          'Modular HubSpot sections so marketing can reorder/A-B test without dev.',
          'Performance passes (SVG, compressed media, CDN) to drop first contentful paint.',
        ],
      },
      {
        title: 'A better beginning',
        paragraphs: [
          'This wasn\'t a paint job, it was a behavior redesign. By replacing generic claims with outcomes, proof, and one decisive action, we reduced cognitive load and gave buyers control. Modular sections let marketing iterate without waiting for dev, while analytics close the loop on what actually moves people. The real win: a site that respects attention, answers fast, and converts curiosity into real conversations.',
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
  prev: ProjectDetail
  next: ProjectDetail
} {
  const index = projectDetails.findIndex((p) => p.slug === slug)
  const total = projectDetails.length
  const safeIndex = index === -1 ? 0 : index
  return {
    prev: projectDetails[(safeIndex - 1 + total) % total],
    next: projectDetails[(safeIndex + 1) % total],
  }
}
