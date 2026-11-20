export const aboutHeadshot = '/about/denelsen-headshot.png'

export const commencementSpeechUrl =
  'https://www.youtube.com/watch?v=jqx_WQXyJdg&t=3s'

export const researchPaperUrl =
  'https://www.researchgate.net/publication/399256742_Comparative_Study_of_Cattle_Producer_Challenges_in_the_US_and_Zimbabwe_Identifying_Opportunities_for_AI-Enabled_Extension_and_Digital_Decision_Support?channel=doi&linkId=695568c67e61d05b5314facf&showFulltext=true'

export const aboutIntro = [
  'I’m Denelsen, a content designer with a foundation in IT. I started troubleshooting platforms and workflows — which taught me something I still design around: most “technical” problems are really clarity problems. Now I shape the language, structure, and information architecture that help people decide with confidence.',
  'My work sits between research, UX writing, and systems. I partner with product and marketing teams to uncover what’s actually broken, rewrite the journey in plain language, and ship modular content that holds up in Drupal, HubSpot, and design-system environments.',
  'I’ve designed across Higher Ed, startups, and NGOs — program pages, conversion systems, and enterprise narratives — always measuring whether the next step feels obvious.',
  'When I’m not writing, I’m usually behind a camera, serving on the lighting team at Hillsong, or collecting ideas from New York — always chasing clearer experiences.',
] as const

export interface WorkedWithLogo {
  id: string
  name: string
  logo: string
  variant?: 'icon' | 'wordmark'
}

export const workedWithLogos: WorkedWithLogo[] = [
  { id: 'ibm', name: 'IBM', logo: '/logos/companies/ibm.png' },
  {
    id: 'katz',
    name: 'Katz School of Science and Health',
    logo: '/logos/companies/katz.png',
  },
  { id: 't-shaped', name: 'T Shaped', logo: '/logos/companies/t-shaped.png' },
  {
    id: 'cyber-alliance',
    name: 'Cyber Alliance',
    logo: '/logos/companies/cyber-alliance.png',
  },
  { id: 'better-you', name: 'Better You', logo: '/logos/companies/better-you.png' },
  {
    id: 'zimworx',
    name: 'ZimworX',
    logo: '/logos/companies/zimworx.png',
  },
  {
    id: 'brand-guy',
    name: 'The Brand Guy and Associates',
    logo: '/logos/companies/brand-guy.png',
  },
  { id: 'adfarm', name: 'AdFarm', logo: '/logos/companies/adfarm.png' },
]

export interface ExperienceEntry {
  id: string
  role: string
  year: string
  description: string
  company: string
  location: string
  logo?: string
  logoVariant?: 'icon' | 'wordmark'
  isCurrent?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    id: 'ibm',
    role: 'Content Developer/Designer',
    year: '2026',
    description:
      'Design and develop content-led digital experiences for IBM—translating complex product narratives into clear, structured content across web and enterprise touchpoints, and collaborating with cross-functional teams on UX writing, layout, and design system–aligned delivery.',
    company: 'IBM',
    location: 'Austin, TX',
    logo: '/logos/companies/ibm.png',
    isCurrent: true,
  },
  {
    id: 'katz',
    role: 'Web Designer',
    year: '2025',
    description:
      'Owned Drupal content ops and QA for Katz School’s web ecosystem, and led a UX/content modernization of faculty and STEM program pages—restructuring IA and sharpening messaging to align institutional goals with prospective student needs.',
    company: 'Yeshiva University — KATZ School of Science and Health',
    location: 'Manhattan, NYC',
    logo: '/logos/companies/katz.png',
  },
  {
    id: 't-shaped',
    role: 'Web and Digital Experience Designer',
    year: '2025',
    description:
      'Led a data-driven website and newsletter rebuild on HubSpot CMS—boosting content comprehension 40% → 90% and re-engaging 390 dormant leads via targeted workflows (47% OR)—and rebuilt LinkedIn traction with a two-post weekly carousel strategy, growing followers +15% and sustaining 25%+ CTR.',
    company: 'T Shaped',
    location: 'Manhattan, NYC',
    logo: '/logos/companies/t-shaped.png',
  },
  {
    id: 'zimworx',
    role: 'Ui/Ux Designer',
    year: '2024',
    description:
      'Led the end-to-end redesign of two flagship sites—driven by stakeholder interviews, client feedback, and competitive research—to establish a unified, marketing-aligned UX; built and tested responsive WordPress/Elementor builds that improved usability and brand consistency and lifted awareness and engagement.',
    company: 'ZimworX',
    location: 'Remote, TX',
    logo: '/logos/companies/zimworx.png',
  },
  {
    id: 'velocity',
    role: 'Junior Ui/Ux Designer',
    year: '2023',
    description:
      'Focused on user flows and wireframes for e-commerce and marketing websites. Worked closely with developers and clients to deliver high-converting landing pages. Introduced usability testing practices.',
    company: 'Velocity Technology Inc',
    location: 'Remoted, CAN',
  },
  {
    id: 'brand-guy',
    role: 'Creative Designer',
    year: '2022',
    description:
      'Analyzed user behavior to rework layouts and flows (+25% retention, +15% engagement), built brand guidelines and original graphics aligned to campaigns (+15% sales), and iterated key touchpoints to lift traffic +10% and generate 3× more leads.',
    company: 'The Brand Guy and Associates',
    location: 'Harare, ZW',
    logo: '/logos/companies/brand-guy.png',
  },
]
