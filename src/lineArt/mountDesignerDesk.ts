// Seated product designer at a Mac desktop. Folders on the screen are projects —
// clicking one opens the case study. Soft typing motion; pointer adds desk wind.
import {
  blot,
  el,
  f,
  inkDefs,
  limb,
  paint,
  PAPER,
  pen,
  PEN,
  place,
  run,
  shape,
  type Vec,
} from './ink.ts'
import { ease, pointerWind, spring, wobble } from './motion.ts'

const W = 640
const H = 260
const DESK_Y = 198
const SCALE = 1.05
const ACCENT = '#1a6b4a'

export interface DeskProject {
  slug: string
  label: string
}

export interface MountDesignerDeskOptions {
  projects: DeskProject[]
  onOpenProject: (slug: string) => void
}

export function mountDesignerDesk(
  host: HTMLElement,
  { projects, onOpenProject }: MountDesignerDeskOptions,
): () => void {
  host.replaceChildren()

  const svg = el('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    'aria-label': 'Line drawing of a product designer at a Mac with project folders',
  })
  svg.style.width = '100%'
  svg.style.height = '100%'
  svg.style.display = 'block'
  svg.style.color = '#1c1c1c'
  svg.style.setProperty('--paper', '#fdfdfc')

  const { filter } = inkDefs(svg, 'desk')
  host.appendChild(svg)
  const scene = el('g', { filter }, svg)

  // room hints: window + wall shelf
  shape(scene, 0.8).setAttribute('d', 'M28 36 L148 36 L148 118 L28 118 Z')
  pen(scene, 0.5).setAttribute('d', 'M88 36 L88 118 M28 77 L148 77')
  pen(scene, 0.55).setAttribute('d', 'M170 52 L250 52 M178 58 L190 58 M200 58 L214 58 M224 58 L240 58')

  // desk top + edge + legs
  shape(scene, 0.95).setAttribute(
    'd',
    `M18 ${DESK_Y} L622 ${DESK_Y} L612 ${DESK_Y + 14} L28 ${DESK_Y + 14} Z`,
  )
  pen(scene, 0.7).setAttribute(
    'd',
    `M42 ${DESK_Y + 14} L50 ${H - 8} M598 ${DESK_Y + 14} L590 ${H - 8}`,
  )
  // mug
  paint(scene, ACCENT, 0.7).setAttribute(
    'd',
    `M118 ${DESK_Y - 18} L118 ${DESK_Y - 2} L138 ${DESK_Y - 2} L138 ${DESK_Y - 18} Q128 ${DESK_Y - 22} 118 ${DESK_Y - 18} Z`,
  )
  pen(scene, 0.55).setAttribute('d', `M138 ${DESK_Y - 14} Q148 ${DESK_Y - 12} 138 ${DESK_Y - 6}`)

  // --- iMac
  const macX = 318
  const macY = DESK_Y
  const screen = {
    x: macX,
    y: macY - 132,
    w: 248,
    h: 148,
  }
  // stand
  shape(scene, 0.85).setAttribute(
    'd',
    `M${macX + 108} ${macY} L${macX + 124} ${macY - 18} L${macX + 140} ${macY - 18} L${macX + 156} ${macY} Z`,
  )
  shape(scene, 0.85).setAttribute(
    'd',
    `M${macX + 96} ${macY} L${macX + 168} ${macY} L${macX + 164} ${macY + 6} L${macX + 100} ${macY + 6} Z`,
  )
  // chin + bezel
  shape(scene, 0.95).setAttribute(
    'd',
    `M${screen.x - 6} ${screen.y - 6} L${screen.x + screen.w + 6} ${screen.y - 6} L${screen.x + screen.w + 6} ${screen.y + screen.h + 18} L${screen.x - 6} ${screen.y + screen.h + 18} Z`,
  )
  // screen glass (desktop)
  paint(scene, '#e8f2ec', 0.7).setAttribute(
    'd',
    `M${screen.x} ${screen.y} L${screen.x + screen.w} ${screen.y} L${screen.x + screen.w} ${screen.y + screen.h} L${screen.x} ${screen.y + screen.h} Z`,
  )
  // menu bar
  shape(scene, 0.45).setAttribute(
    'd',
    `M${screen.x} ${screen.y} L${screen.x + screen.w} ${screen.y} L${screen.x + screen.w} ${screen.y + 12} L${screen.x} ${screen.y + 12} Z`,
  )
  pen(scene, 0.4).setAttribute(
    'd',
    `M${screen.x + 10} ${screen.y + 6} L${screen.x + 28} ${screen.y + 6} M${screen.x + screen.w - 40} ${screen.y + 6} L${screen.x + screen.w - 12} ${screen.y + 6}`,
  )
  // camera notch
  blot(scene).setAttribute(
    'd',
    `M${screen.x + screen.w / 2 - 2} ${screen.y - 2} A2 2 0 1 0 ${screen.x + screen.w / 2 + 2} ${screen.y - 2} Z`,
  )

  // folders on desktop
  const folderLayer = el('g', {}, scene)
  const folderHits: Array<{ g: SVGGElement; slug: string }> = []
  const cols = Math.min(projects.length, 5)
  const folderW = 36
  const folderGap = 10
  const rowW = cols * folderW + (cols - 1) * folderGap
  const startX = screen.x + (screen.w - rowW) / 2
  const folderY = screen.y + 36

  projects.slice(0, 5).forEach((project, i) => {
    const fx = startX + i * (folderW + folderGap)
    const g = el('g', { style: 'cursor:pointer' }, folderLayer)
    g.setAttribute('role', 'link')
    g.setAttribute('aria-label', `Open ${project.label} case study`)
    g.tabIndex = 0

    const tab = paint(g, ACCENT, 0.65)
    tab.setAttribute(
      'd',
      `M${f(fx + 2)} ${f(folderY)} L${f(fx + 14)} ${f(folderY)} L${f(fx + 17)} ${f(folderY + 4)} L${f(fx + 2)} ${f(folderY + 4)} Z`,
    )
    const body = paint(g, '#d8ebe1', 0.7)
    body.setAttribute(
      'd',
      `M${f(fx)} ${f(folderY + 4)} L${f(fx + folderW)} ${f(folderY + 4)} L${f(fx + folderW - 1)} ${f(folderY + 28)} L${f(fx + 1)} ${f(folderY + 28)} Z`,
    )
    // invisible larger hit target
    const hit = el(
      'rect',
      {
        x: fx - 4,
        y: folderY - 4,
        width: folderW + 8,
        height: 48,
        fill: 'transparent',
      },
      g,
    )
    hit.style.cursor = 'pointer'

    const label = el(
      'text',
      {
        x: fx + folderW / 2,
        y: folderY + 42,
        'text-anchor': 'middle',
        'font-family': 'Syne, system-ui, sans-serif',
        'font-size': 7.5,
        'font-weight': 600,
        fill: 'currentColor',
      },
      g,
    )
    label.textContent = project.label

    const open = () => onOpenProject(project.slug)
    g.addEventListener('pointerdown', (e) => {
      e.stopPropagation()
      open()
    })
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    })
    folderHits.push({ g, slug: project.slug })
  })

  // keyboard
  shape(scene, 0.75).setAttribute(
    'd',
    `M248 ${DESK_Y - 4} L312 ${DESK_Y - 4} L316 ${DESK_Y + 2} L244 ${DESK_Y + 2} Z`,
  )
  pen(scene, 0.4).setAttribute(
    'd',
    Array.from({ length: 8 }, (_, i) => `M${252 + i * 7.2} ${DESK_Y - 2} l0 2.2`).join(' '),
  )

  // --- seated figure (figure space, facing +x toward Mac)
  const fig = el('g', {}, scene)
  const farArm = limb(fig, 3.5)
  const nearArm = limb(fig, 3.5)
  const farLeg = limb(fig, 4.1)
  const nearLeg = limb(fig, 4.1)
  const torso = shape(fig)
  const torsoSeam = pen(fig, PEN * 0.55)
  const head = el(
    'ellipse',
    { rx: 3.7, ry: 4.7, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN },
    fig,
  )
  const hair = blot(fig)
  const chair = shape(fig)
  const seat = shape(fig)

  const typeSpring = spring(55, 8)
  const headBob = spring(28, 5)
  const wind = pointerWind(svg, 0.15)
  let hoverSlug: string | null = null

  folderHits.forEach(({ g, slug }) => {
    g.addEventListener('pointerenter', () => {
      hoverSlug = slug
    })
    g.addEventListener('pointerleave', () => {
      if (hoverSlug === slug) hoverSlug = null
    })
  })

  const stop = run((t, dt) => {
    wind.step(t)
    const typePulse = 0.5 + 0.5 * Math.sin(t * 7.2)
    const tap = typeSpring.step(typePulse * 4.5, dt)
    const bob = headBob.step(wobble(t, 0.7) * 0.8 + Math.sin(t * 2.1) * 0.4, dt)

    place(fig, 210, DESK_Y + 2, 1, SCALE)

    // chair (local coords, feet at y=120)
    chair.setAttribute(
      'd',
      `M22 78 L22 118 L28 118 L28 92 L54 92 L54 118 L60 118 L60 78 Q41 70 22 78 Z`,
    )
    seat.setAttribute('d', `M24 90 L58 90 L58 96 L24 96 Z`)

    // seated hips / legs under desk
    const hip: Vec = [40, 78 + bob * 0.15]
    farLeg.draw(
      [
        hip,
        [28, 98],
        [18, 118],
      ],
      [0.25, 0.7],
    )
    nearLeg.draw(
      [
        [42, hip[1]],
        [52, 96],
        [66, 112],
      ],
      [0.25, 0.7],
    )

    // torso leaning slightly toward Mac
    const sh: Vec = [44, 44 + bob]
    torso.setAttribute(
      'd',
      `M${f(sh[0] - 8)} ${f(sh[1] + 2)} Q${f(sh[0] - 1)} ${f(sh[1] - 3)} ${f(sh[0] + 7)} ${f(sh[1] + 2)} L${f(sh[0] + 9)} ${f(hip[1] - 2)} L${f(sh[0] - 9)} ${f(hip[1])} Z`,
    )
    torsoSeam.setAttribute('d', `M${f(sh[0] + 1)} ${f(sh[1] + 4)} L${f(sh[0] + 2)} ${f(hip[1] - 8)}`)

    const hc: Vec = [46.5, 33 + bob]
    head.setAttribute('cx', f(hc[0]))
    head.setAttribute('cy', f(hc[1]))
    hair.setAttribute(
      'd',
      `M${f(hc[0] - 4.2)} ${f(hc[1] - 2)} Q${f(hc[0] - 1)} ${f(hc[1] - 8)} ${f(hc[0] + 4)} ${f(hc[1] - 3)} L${f(hc[0] + 3.6)} ${f(hc[1] - 0.5)} Q${f(hc[0])} ${f(hc[1] - 4.5)} ${f(hc[0] - 3.8)} ${f(hc[1] - 0.2)} Z`,
    )

    // far arm resting / supporting
    const shF: Vec = [sh[0] - 2, sh[1] + 3]
    farArm.draw(
      [
        shF,
        [shF[0] + 10, shF[1] + 14],
        [shF[0] + 22, shF[1] + 22],
      ],
      [0.2, 0.45],
    )

    // near arm typing on keyboard
    const shN: Vec = [sh[0] + 3, sh[1] + 3]
    const elb: Vec = [shN[0] + 14, shN[1] + 12]
    const hand: Vec = [shN[0] + 26 + tap * 0.15, shN[1] + 20 - tap * 0.35]
    nearArm.draw([shN, elb, hand], [0.2, 0.4])

    // folder hover lift
    folderHits.forEach(({ g, slug }, i) => {
      const baseY = 0
      const lift = hoverSlug === slug ? -3 : 0
      const fx = startX + i * (folderW + folderGap)
      const active = hoverSlug === slug ? ease(1) : 0
      g.setAttribute(
        'transform',
        `translate(0 ${f(baseY + lift + Math.sin(t * 6 + i) * active * 0.6)})`,
      )
      void fx
    })
  })

  return () => {
    stop()
    host.replaceChildren()
  }
}

export const DESK_PROJECTS: DeskProject[] = [
  { slug: 'tshaped-redesigned', label: 'T Shaped' },
  { slug: 'katz-master-in-ai-program-page', label: 'Katz' },
  { slug: 'higher-ed-concept', label: 'Chapman' },
  { slug: 'ticketmaster-spatial-seat-selection', label: 'Ticketmaster' },
  { slug: 'safescroll', label: 'Safescroll' },
]
