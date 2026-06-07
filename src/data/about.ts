export const aboutHeadshot = '/about/denelsen-headshot.png'

export const commencementSpeechUrl =
  'https://www.youtube.com/watch?v=jqx_WQXyJdg&t=3s'

export const aboutIntro = [
  'I’m Denelsen, a product designer with a foundation in IT and a focus on turning complex systems into clear, human-centered experiences. I started my career troubleshooting platforms and workflows, which taught me something I still design around today: most “technical” problems are really clarity problems. Now I build interfaces that make the next step obvious, whether the user is a student, a customer, or a team inside a fast-moving organization.',
  'My approach blends empathy with structure. I work closely with cross-functional teams to uncover what’s actually broken, map the user journey, and move from research to wireframes to high-fidelity prototypes in Figma. I care about design systems, accessibility, and the details that make products feel reliable: thoughtful hierarchy, consistent components, and states that handle real-world edge cases.',
  'I have designed across web, mobile, and content-heavy enterprise environments, shipping everything from Drupal-based ecosystems to HubSpot/WordPress builds and conversion-focused flows. I’m comfortable using data to guide iteration, but I’m equally serious about craft: typography, layout, and simplicity that holds up at scale.',
  'When I’m not designing, I’m usually behind a camera (street and event photography), serving in the lighting team at Hillsong, or collecting ideas from the city, always learning, always building, and always chasing clearer experiences.',
] as const

export interface ExperienceEntry {
  id: string
  role: string
  year: string
  description: string
  company: string
  location: string
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
  },
  {
    id: 't-shaped',
    role: 'Web and Digital Experience Designer',
    year: '2025',
    description:
      'Led a data-driven website and newsletter rebuild on HubSpot CMS—boosting content comprehension 40% → 90% and re-engaging 390 dormant leads via targeted workflows (47% OR)—and rebuilt LinkedIn traction with a two-post weekly carousel strategy, growing followers +15% and sustaining 25%+ CTR.',
    company: 'T Shaped',
    location: 'Manhattan, NYC',
  },
  {
    id: 'zimworx',
    role: 'Ui/Ux Designer',
    year: '2024',
    description:
      'Led the end-to-end redesign of two flagship sites—driven by stakeholder interviews, client feedback, and competitive research—to establish a unified, marketing-aligned UX; built and tested responsive WordPress/Elementor builds that improved usability and brand consistency and lifted awareness and engagement.',
    company: 'ZimworX',
    location: 'Remote, TX',
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
  },
]
