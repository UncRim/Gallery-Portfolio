// Case study content. One object per project; scripts/gen-pages.mjs turns each into projects/<slug>/index.html.
// Media: `local` is a path under public/ (filled by `npm run assets`); `remote` is the original URL,
// used as a fallback until the local copy exists.
const OLD = 'https://denelsen.slicksstudios.com/';
const WF = 'https://cdn.prod.website-files.com/678bf7b74db9aadd19501ce9/';
const m = (local, remote, alt) => ({ local, remote, alt });
const old = (path, alt) => m('media/' + path, OLD + (path.startsWith('videos/') ? path : 'projects/' + path), alt);

export const CASES = [
  {
    slug: 'tshaped-redesigned', id: 'DOC-001', title: 'From a strategy website to a conversion system',
    kind: 'Web redesign', year: '2025', tags: ['Web redesign', 'IA and content'],
    seoTitle: 'HubSpot Website Redesign Case Study | Denelsen Dandi', seoDesc: 'A content-led HubSpot CMS rebuild that cut bounce rate 19 points and lifted primary CTA clicks 22%. Website redesign, information architecture and conversion copy.', keywords: 'website redesign case study, HubSpot CMS redesign, conversion copywriting, information architecture, UX writing portfolio',
    summary: 'A HubSpot CMS rebuild of the T Shaped website: outcome-first story, early proof and one clear next step, so leaders book a Fit Call instead of bouncing.',
    role: 'Lead UX/UI Designer · HubSpot CMS · Analytics (GA4/Hotjar)', tools: ['HubSpot', 'Figma', 'ChatGPT'],
    hero: { image: m('media/tshaped/cover.png', WF + '6921683e01fc00d35b719032_Case%20Study%20Cover%20-%201.png', 'The rebuilt T Shaped home page, outcome-first, with one primary action.') },
    problem: [
      "Prospects couldn't answer: What do you do? Does it work? What's my next step? CTAs were buried and load times sluggish.",
      'T Shaped runs leadership sprints for executives, but their website buried the point. Prospects couldn’t answer three basic questions: what do you do, does it work, and what should I do next?',
      'I rebuilt the entire site in HubSpot CMS, restructuring the story around outcomes, surfacing proof early, and cutting the path from first visit to booked Fit Call.',
    ],
    results: [
      ['−19 pts bounce rate', 'Home page bounce rate dropped after the rebuild.'],
      ['+22% primary CTA clicks', 'Call-to-action engagement increased post-launch.'],
      ['+34% newsletter open rate', 'Email performance lift in the first 30 days.'],
      ['0 post-launch 404s', 'Clean migration with redirects and QA complete.'],
    ],
    sections: [
      { h: 'From static brochure to booking engine', p: ['Leaders don’t buy “strategy websites.” They buy clarity + proof. Behavioral data (Hotjar) showed visitors hovering on services and testimonials while skipping long prose. We reframed the page around the four questions prospects actually ask: What will I learn? Who’s teaching this? What can I do after? Where’s the proof? Then we rebuilt in HubSpot with modules that map to that decision path and a single, unmissable next step.'] },
      { h: 'Approach', steps: [
        ['Discovery & data', 'Audit GA4 events, Hotjar heatmaps/scroll maps, GSC; identify friction and dead zones.'],
        ['Story & IA', 'Translate outcomes into a skimmable narrative; map a shortest-path funnel to “Fit Call.”'],
        ['Wireframes → Figma components', 'Build a reusable section library (hero, tiles, proof, FAQs, capture, footer).'],
        ['Content & microcopy', 'Outcome-led headlines, plain-language FAQs, social-proof pull-quotes.'],
        ['Build in HubSpot', 'Drag-and-drop modules, schema, redirects, perf budgets, and QA.'],
        ['Instrumentation & experiments', 'Event tagging, scroll-depth, CTA variants, and module order tests.'],
      ] },
      { h: 'Solution (what I changed)', list: [
        'Outcome-first hero with one primary action (“Book 15-min Fit Call”).',
        'Service Library (6 tiles) to self-select the right sprint, with highly scannable entry points.',
        'Video-first testimonials (leaders speaking to outcomes) for instant proof.',
        'Mid-page micro-CTA for visitors convinced early; FAQ accordion to kill objections.',
        'Newsletter capture (“Performance Review Playbook”) as a low-friction nurture.',
        'Trust marquees (logos + benefit bullets) near decision points.',
        'Modular HubSpot sections so marketing can reorder/A-B test without dev.',
        'Performance passes (SVG, compressed media, CDN) to drop first contentful paint.',
      ] },
    ],
    closing: { h: 'A better beginning', p: 'This wasn’t a paint job, it was a behavior redesign. By replacing generic claims with outcomes, proof, and one decisive action, we reduced cognitive load and gave buyers control. Modular sections let marketing iterate without waiting for dev, while analytics close the loop on what actually moves people. The real win: a site that respects attention, answers fast, and converts curiosity into real conversations.' },
    gallery: [
      m('media/tshaped/screen-2.png', WF + '69216845ded6784dc34a0ef5_Case%20Study%20-%202.png', 'T Shaped site, screen 2.'),
      m('media/tshaped/screen-3.png', WF + '69216845ca9e77668b58422a_Case%20Study%20-%203.png', 'T Shaped site, screen 3.'),
      m('media/tshaped/screen-4.png', WF + '6921684506c1846d1a154e35_Case%20Study%20-%204.png', 'T Shaped site, screen 4.'),
      m('media/tshaped/walkthrough.gif', WF + '69216871dd5644a79fab6ecd_T-Shaped-LLC.gif', 'Animated walkthrough of the T Shaped site.'),
      m('media/tshaped/screen-5.png', WF + '692168789405151086b7178e_Case%20Study%20-%205.png', 'T Shaped site, screen 5.'),
      m('media/tshaped/screen-6.png', WF + '692168789d86b48fb6f37d4f_Case%20Study%20-%206.png', 'T Shaped site, screen 6.'),
      m('media/tshaped/screen-7.png', WF + '6921687896bf689ce23f2389_Case%20Study%20-%207.png', 'T Shaped site, screen 7.'),
    ],
    tagline: 'Clarity first. Proof fast. Booked calls, not brochure clicks.',
    quote: '“His kind and humble nature is commendable. If he can confidently share his talents and expertise. He has much to offer, and his skills, knowledge, attitude, and insights will make a significant impact in any setting.”',
  },
  {
    slug: 'katz-master-in-ai-program-page', id: 'DOC-002', title: 'Master in AI (Katz School) Page Redesign',
    kind: 'Web design', year: '2025', tags: ['Web redesign', 'IA and content'],
    seoTitle: 'Higher-Ed Program Page Redesign | Denelsen Dandi', seoDesc: "A decision-first redesign of the Katz School Master's in AI program page on Drupal: outcomes, proof, then action. UX writing and information architecture case study.", keywords: 'higher education web design, program page redesign, Drupal content design, UX writing, information architecture',
    summary: 'A decision-first redesign of the Katz School Master’s in AI program page on Drupal: outcomes, proof, then action.',
    role: 'Web Designer (UX/UI) · IA · Content Strategy · A11y', tools: ['Figma', 'Drupal', 'ChatGPT'],
    hero: { image: old('katz/cover.gif', 'Animated preview of the redesigned Katz Master’s in AI page.') },
    problem: [
      "Prospective students couldn't quickly understand the program's value, outcomes, or next steps. The page felt dense and brochure-like.",
      'Prospects don’t want adjectives; they want answers. I reframed the Katz Master’s in AI page to match their mental checklist: outcomes, proof, then action. Content is benefit-led, sections are modular, and every block either reduces uncertainty or advances a decision.',
      'The goal: help prospects answer what will I learn, who’s teaching this, what can I do after, where’s the proof, and how do I take the next step?',
    ],
    results: [
      ['1-scroll value + proof', 'Outcomes, credibility, and actions visible above the fold.'],
      ['1-tap admissions path', 'Simplified IA and sticky mobile CTAs reduce decision friction.'],
      ['↑ time on outcomes', 'Visitors spend more time with program results and projects.'],
      ['0-dev content updates', 'Modular sections marketing can reorder without breaking UX.'],
    ],
    sections: [
      { h: 'Reframing the decision', p: ['The original page read like a brochure: dense copy, buried proof, and no clear path from curiosity to application. I treated the redesign as a decision tool, not a content dump. Every section earns its place by answering a real prospect question or removing friction from the next step.'] },
      { h: 'Approach', steps: [
        ['Audit & goals', 'Define the 30–60s decision the page must enable.'],
        ['IA redesign', 'Linear flow: Hero → Why/Outcomes → Projects & Faculty → Admissions/FAQ.'],
        ['Content strategy', 'Rewrite headers in user language; trim copy to scannable chunks.'],
        ['Components', 'Hero with proof chips, outcome cards, project tiles (video-ready), faculty grid, news strip, sticky CTAs.'],
        ['A11y & mobile', 'One type scale, AA contrast, left-aligned paragraphs, 44pt targets.'],
        ['Handoff', 'Analytics events (syllabus/advisor/FAQ/scroll) + test ideas for hero copy and CTA labels.'],
      ] },
      { h: 'Solution (what I built)', list: [
        'Outcome-first hero with proof chips above the fold: value and credibility before the scroll.',
        'Program highlights and student outcome cards that speak in results, not features.',
        'Project tiles ready for video embeds; faculty grid for trust; news strip for freshness.',
        'Sticky mobile CTAs and a simplified admissions path so the next step is always one tap away.',
        'Modular Drupal sections marketing can reorder without breaking the decision flow.',
      ] },
    ],
    closing: { h: 'Making the decision obvious', p: 'Higher-ed pages shouldn’t make visitors decode value. This redesign treats the page as a decision instrument: state the promise, prove it fast, and make the next step obvious, so qualified prospects move forward with confidence.' },
    gallery: [
      old('katz/hero-and-proof.png', 'Hero with proof chips above the fold.'),
      old('katz/program-highlights-students.png', 'Program highlights and student outcome cards.'),
      old('katz/faculty-and-news.png', 'Faculty grid and news strip.'),
      old('katz/modular-layout-story.png', 'The modular layout, section by section.'),
    ],
    quote: '“I admire your strength and hard work to push through projects. You have never allowed a project to fail no matter the circumstances.”',
  },
  {
    slug: 'higher-ed-concept', id: 'DOC-003', title: 'The Chapman Alumni Innovation Vault',
    kind: 'Concept', year: '2025', tags: ['Concept', 'Spatial UX'],
    seoTitle: 'Spatial Web Concept for Alumni Engagement | Denelsen Dandi', seoDesc: 'A 3D, authenticated innovation vault concept that turns passive alumni readers into insiders. Spatial UX and WebGL prototype case study.', keywords: 'spatial web design, alumni engagement concept, WebGL prototype, UX concept case study, product design portfolio',
    summary: 'A spatial-web concept that locks high-value university data inside an authenticated 3D vault, turning passive alumni readers into insiders.',
    role: 'Product Designer (UX/UI & WebGL Prototype)', tools: ['Blender', 'Gemini', 'Cursor', 'Figma'],
    hero: { video: { local: 'media/videos/higher-ed-spatial-web-concept.mp4', remote: OLD + 'videos/higher-ed-spatial-web-concept.mp4' }, poster: m('media/higher-ed/poster.jpg', OLD + 'projects/higher-ed/poster.jpg', 'Still from the Alumni Innovation Vault concept video.') },
    links: [['Explore the Alumni Innovation Vault', 'https://the-chapman-alumni-vault-concept.netlify.app/']],
    problem: [
      'The Concept: If we lock high-value institutional data behind an “Authenticated Spatial Vault,” we can flip the psychology of the user from a passive reader to an exclusive insider.',
      'The “Macrodata” Aesthetic: Leveraging a minimalist, “Severance”-style void environment to focus the user’s absolute attention on the 3D data and architectural models, eliminating the visual clutter of standard university websites.',
      'Universities spend millions on campus expansion and cutting-edge research, but communicate these advancements to alumni through passive, 2D PDF newsletters and flat web portals.',
    ],
    results: [
      ['0 installs · instant access', 'Browser-based spatial environment with no download required.'],
      ['100% guided tour path', 'Automatic camera path without manual panning.'],
      ['1-click virtual tour dive', 'Cinematic camera dive into architectural models.'],
      ['1 in-flow mentor CTA', 'Conversion action embedded within the immersive experience.'],
    ],
    sections: [
      { h: 'The iterative process & UX refinements', iterations: [
        { n: 1, t: 'The Conceptual Void & Social Proof', parts: [
          ['Initial state', 'Built an infinite, pitch-black WebGL grid with floating abstract math geometries. Explored “ghost avatars” (proximity chat) to simulate the networking aspect of alumni events.'],
          ['The pivot', 'The sci-fi aesthetic was too alienating for an academic institution.'] ] },
        { n: 2, t: 'Architectural Grounding & Chiaroscuro Lighting', parts: [
          ['The problem', 'The pure white 3D objects were blowing out the camera exposure, and the global lighting washed out the contrast.'],
          ['The solution', 'Transitioned to an “Architectural Exhibition” vibe. Replaced abstract shapes with 3D building maquettes. Applied a warm, matte “Clay/Sand” material to retain detail without blinding the user. Tightened the WebGL spotlights to mimic theatrical staging, guiding the user’s eye organically.'] ] },
        { n: 3, t: 'Solving Spatial Fatigue (The UI Bridge)', parts: [
          ['The problem', 'Forcing non-gamers to manually navigate a 3D space causes drop-off. Furthermore, opening a 400px sidebar covered the 3D object, ruining the visual balance.'],
          ['The solution', 'Programmed a dynamic camera.setViewOffset() to perfectly re-center the 3D model whenever the 2D UI drawer opened. Introduced the [ NEXT PROJECT ➔ ] spatial arrow to create a guided, cinematic tour without requiring manual camera panning.'] ] },
        { n: 4, t: 'The Macro-to-Micro “Dive” (Virtual Tour)', parts: [
          ['The problem', 'How to show the interior of a building without crashing the browser with heavy 3D interior assets?'],
          ['The solution', 'Engineered a cinematic camera-dive. Clicking “View Virtual Tour” swoops the camera into the 3D clay model, triggers a seamless fade-to-black, and launches a full-screen architectural video overlay, keeping the user trapped in the immersion while pushing the primary [ BECOME A RESEARCH MENTOR ] conversion button.'] ] },
      ] },
    ],
    gallery: [
      old('higher-ed/architectural-exhibition.png', 'The architectural exhibition view of the vault.'),
      old('higher-ed/struppa-research-park-detail.png', 'Detail view of the Struppa research park model.'),
      old('higher-ed/fowler-innovation-lab-detail.png', 'Detail view of the Fowler innovation lab model.'),
      old('higher-ed/virtual-tour-interior.png', 'The virtual tour interior overlay.'),
    ],
    tagline: 'Redefining Higher Education Stakeholder Engagement through Spatial Web Design and Active Analytics.',
  },
  {
    slug: 'ticketmaster-spatial-seat-selection', id: 'DOC-004', title: 'Ticketmaster Spatial Seat Selection Concept',
    kind: 'Concept', year: '2025', tags: ['Concept', 'Spatial UX'],
    seoTitle: 'Ticketmaster Seat Selector UX Concept | Denelsen Dandi', seoDesc: 'A 3D seat-selection concept that shows the exact view, price and checkout in one path so fans stop buying blind. Spatial UX redesign case study.', keywords: 'Ticketmaster redesign, seat selection UX, spatial UX, e-commerce UX case study, product design portfolio',
    summary: 'A 3D spatial seat-selection concept that shows the exact view, price and checkout in one path, so fans stop buying blind.',
    role: 'Spatial UX Designer · 3D Interaction Design · WebGL Prototyping', tools: ['Blender', 'Figma', 'Cursor'],
    hero: { video: { local: 'media/videos/ticketmaster-spatial-seat-selection.mp4', remote: OLD + 'videos/ticketmaster-spatial-seat-selection.mp4' }, poster: m('media/ticketmaster/poster.jpg', OLD + 'projects/ticketmaster/poster.jpg', 'Still from the spatial seat selection concept video.') },
    links: [['Test the spatial seat selector', 'https://ticketmaster-concept.netlify.app/']],
    problem: [
      'Fans were forced to toggle between abstract 2D seating charts, dense price lists, and tiny, inaccurate preview images. The disjointed experience caused high cognitive load, anxiety over buying a “bad seat,” and hesitation that ultimately led to cart abandonment or buyer’s remorse.',
      'The new 3D spatial UI surfaces the exact stage view, pricing, and checkout actions in a single, immersive path, eliminating the anxiety of blind buying. Fans don’t want to decipher a map; they want to feel like they are already in the venue.',
    ],
    results: [
      ['100% sightline preview', '3D spatial previews show exact stage angle and distance before buying.'],
      ['1-window seat + checkout', 'Seat selection, detail viewing, and pricing updates in one unified flow.'],
      ['−3 disconnected UI tabs', 'Glassmorphic side panel keeps focus on the venue and the ticket.'],
      ['60fps · instant WebGL load', 'React Three Fiber canvas loads without tanking framerates.'],
    ],
    sections: [
      { h: 'From blind guessing to buying with confidence', p: ['I reframed the seating chart to match their mental checklist: view, price, action. The UI is built around a dynamic 3D environment where every click either validates their seat choice or smoothly guides them to checkout.'] },
      { h: 'Audit & spatial UX redesign', defs: [
        ['Audit & goals', 'Define the micro-moment of highest anxiety, the seat selection, and eliminate the visual disconnect.'],
        ['Spatial UX redesign', 'Fluid flow: Orbit view → Click 3D seat mesh → UI overlay instantly reveals view, price, and “Add to Cart.”'],
        ['Interaction strategy', 'Replace complex raycasting math with React Three Fiber onClick events directly on the seat meshes, lifting state to seamlessly sync the 3D model and 2D HTML.'],
      ] },
      { h: 'Components, A11y & handoff', defs: [
        ['Components', 'Interactive 3D venue model, glassmorphic dynamic side panel, sticky checkout cart updating in real-time, and smooth camera transitions.'],
        ['A11y & mobile', 'High-contrast UI overlays, touch-friendly 3D orbit controls, and clear typography legibility over the dark WebGL canvas.'],
        ['Handoff', 'Ready-to-implement React components mapping 3D nodes to UI state, complete with documented mesh hit zones and animation logic.'],
      ] },
    ],
    closing: { h: 'Making the purchase immersive', p: 'E-commerce for live events shouldn’t feel like filling out a spreadsheet. This redesign treats the ticketing page as the first step of the concert experience. By proving the value visually, building excitement, and making the checkout frictionless, fans secure their tickets with total confidence.' },
    gallery: [
      old('ticketmaster/spatial-ticket-hero.png', 'The spatial ticket hero screen.'),
      old('ticketmaster/arena-overview.png', 'Orbit view of the arena.'),
      old('ticketmaster/sightline-seat-view.png', 'Sightline preview from a chosen seat.'),
      old('ticketmaster/ticket-confirmed.png', 'Ticket confirmed screen.'),
    ],
    tagline: 'I redesigned the Ticketmaster seating experience so fans can answer the only question that matters when spending hundreds of dollars: What will my view actually look like?',
  },
  {
    slug: 'safescroll', id: 'DOC-005', title: 'Safescroll for doomscrolling',
    kind: 'Concept', year: '2025', tags: ['Concept', 'Spatial UX'],
    seoTitle: 'Doomscrolling App UX Case Study | Denelsen Dandi', seoDesc: 'Safe Scroll: a mobile concept that interrupts doomscrolling with intentional friction and a dignified exit ramp. Product design and UX writing case study.', keywords: 'doomscrolling app, digital wellbeing UX, mobile app concept, UX writing, product design case study',
    summary: 'A mobile concept that interrupts doomscrolling without lecturing: intentional friction, a dignified exit ramp, and attention given back to the user.',
    role: 'Product Designer', tools: ['Figma', 'ChatGPT'],
    hero: { video: { local: 'media/videos/safescroll.mp4', remote: OLD + 'videos/safescroll.mp4' }, poster: m('media/safescroll/poster.jpg', OLD + 'projects/safescroll/poster.jpg', 'Still from the Safe Scroll concept video.') },
    problem: [
      '53% of Gen Z and 46% of millennials admit to doomscrolling regularly. Current wellness apps focus on blocking or mindfulness, not integrated, psychologically informed solutions.',
      'Doomscrolling isn’t a willpower failure, it’s a design failure. Social platforms engineer compulsive engagement at the cost of user wellbeing, and Gen Z and millennials are bearing the consequences: disrupted sleep, rising anxiety, and hours lost to content they didn’t choose.',
      'Safe Scroll is a mobile concept that intervenes without lecturing. Instead of blocking apps or issuing warnings, it introduces intentional friction at the right moment, surfacing awareness, offering a dignified way to step away, and helping users reclaim control of their own attention.',
    ],
    results: [
      ['+40% weekly active users', 'Active user growth within 3 months of launch.'],
      ['−35% average task time', 'Faster completion across key intervention workflows.'],
      ['4.7/5 user satisfaction', 'Post-launch feedback score from early adopters.'],
      ['0 surveillance · humane guardrails', 'Attention stewardship without shame or blocking.'],
    ],
    sections: [
      { h: 'What I designed', p: ['The concept covers onboarding, a session tracker, a mood check-in flow, and an “exit ramp” screen: 8 screens total, prototyped in Figma with motion to demonstrate the intervention at the moment of peak scroll velocity.'] },
    ],
    gallery: [
      m('media/safescroll/slide-2.png', WF + '691be6593333bf67710f9157_Slide%202.png', 'Safe Scroll, slide 2.'),
      m('media/safescroll/slide-3.png', WF + '691be65969884db7c5bef72a_Slide%203.png', 'Safe Scroll, slide 3.'),
      m('media/safescroll/slide-4.png', WF + '691be65949bac4c7a9d60979_Slide%204.png', 'Safe Scroll, slide 4.'),
      m('media/safescroll/slide-5.png', WF + '691be65a94c90498d0034fc7_Slide%205.png', 'Safe Scroll, slide 5.'),
      m('media/safescroll/slide-6.png', WF + '691be65aa05f0885118144ec_Slide%206.png', 'Safe Scroll, slide 6.'),
      m('media/safescroll/slide-7.png', WF + '691be659d5a81b8cdd8ce3d7_Slide%207.png', 'Safe Scroll, slide 7.'),
      m('media/safescroll/slide-8.png', WF + '691be658bda0e680d967d324_Slide%208.png', 'Safe Scroll, slide 8.'),
      m('media/safescroll/onboarding.gif', WF + '691be61e4f170e476fab4a28_Safe-Scroll-Finalizing-Onboarding.gif', 'Animated walkthrough of the Safe Scroll onboarding.'),
    ],
    tagline: 'The core principle: meet the user where they are. Not a wall that blocks. A door that opens somewhere better.',
  },
];
