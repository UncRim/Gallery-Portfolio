// Portfolio-first line-art card: a designer walks across a NYC kerb with a
// portfolio folio. Click to tip the hat; pointer moves the scarf in the wind.
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
  pt,
  run,
  shape,
  shoe,
  type Vec,
} from './ink.ts'
import { gait } from './gait.ts'
import { clamp, ease, pendulum, pointerWind, spring } from './motion.ts'

const W = 640
const H = 220
const GROUND = 176
const SCALE = 1.15
/** Portfolio green — matches site accent. */
const ACCENT = '#1a6b4a'
const FOLIO = '#2f3d36'

export function mountDesignerWalk(host: HTMLElement): () => void {
  host.replaceChildren()

  const svg = el('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    'aria-label': 'Line drawing of a product designer walking with a portfolio',
  })
  svg.style.width = '100%'
  svg.style.height = '100%'
  svg.style.display = 'block'
  svg.style.color = '#1c1c1c'
  svg.style.setProperty('--paper', '#fdfdfc')

  const { filter } = inkDefs(svg, 'pd')
  host.appendChild(svg)
  const scene = el('g', { filter }, svg)

  // street: kerb, paving marks, lamp, fire-escape hint
  pen(scene, 0.9).setAttribute('d', `M0 ${GROUND} L${W} ${GROUND} M0 ${GROUND + 8} L${W} ${GROUND + 8}`)
  pen(scene, 0.55).setAttribute(
    'd',
    Array.from({ length: 20 }, (_, i) => `M${i * 34 + 12} ${GROUND} l0 8`).join(' '),
  )
  shape(scene, 0.9).setAttribute('d', `M520 ${GROUND} L522 58 L528 58 L530 ${GROUND}Z`)
  shape(scene, 0.9).setAttribute('d', 'M512 58 L538 58 L534 46 L516 46Z')
  pen(scene, 0.55).setAttribute('d', 'M518 52 L532 52 M525 46 L525 40')
  // distant windows block
  shape(scene, 0.75).setAttribute('d', 'M40 118 L40 70 L118 70 L118 118 Z')
  pen(scene, 0.45).setAttribute(
    'd',
    'M52 82 L70 82 L70 98 L52 98 Z M88 82 L106 82 L106 98 L88 98 Z M52 108 L70 108 M88 108 L106 108',
  )

  const fig = el('g', { style: 'cursor:pointer' }, scene)
  const farArm = limb(fig, 3.6)
  const legs = [limb(fig, 4.2), limb(fig, 4.2)]
  const shoes = [blot(fig), blot(fig)]
  const coat = shape(fig)
  const coatSeam = pen(fig, PEN * 0.6)
  const scarfTail = paint(fig, ACCENT, PEN * 0.8)
  const head = el(
    'ellipse',
    { rx: 3.6, ry: 4.6, fill: PAPER, stroke: 'currentColor', 'stroke-width': PEN },
    fig,
  )
  const hat = blot(fig)
  const scarf = paint(fig, ACCENT, PEN * 0.8)
  const nearArm = limb(fig, 3.6)
  const folioG = el('g', {}, fig)
  const folio = paint(folioG, FOLIO, PEN * 0.8)
  const folioBand = pen(folioG, PEN * 0.55)

  const walk = gait({ kind: 'walk' })
  const wind = pointerWind(svg, 0.2)
  const armSwing = [spring(60, 9), spring(60, 9)]
  const folioSwing = pendulum(14, 1.8)
  const tail = spring(30, 4)
  let phase = 0
  let x = 90
  let tipT = -1

  const onTip = () => {
    if (tipT < 0) tipT = 0
  }
  fig.addEventListener('pointerdown', onTip)

  const stop = run((t, dt) => {
    wind.step(t)
    let tip = 0
    if (tipT >= 0) {
      tipT += dt
      tip =
        tipT < 0.35
          ? ease(tipT / 0.35)
          : tipT < 1.2
            ? 1
            : 1 - ease((tipT - 1.2) / 0.4)
      if (tipT > 1.6) tipT = -1
    }
    const go = 1 - tip * 0.85
    phase += (dt / walk.period) * go
    x += walk.speed * SCALE * dt * go
    if (x > W + 50) x = -50
    place(fig, x, GROUND, 1, SCALE)

    const p = walk.pose(phase, go)
    const b = p.bob
    p.feet.forEach((fo, i) => {
      legs[i].draw([p.hip, fo.knee, fo.ankle], [0.3, 0.8])
      shoe(shoes[i], fo.ankle, fo.pitch)
    })
    fig.insertBefore(legs[p.front].g, coat)
    fig.insertBefore(shoes[p.front], coat)

    const kF = p.feet[p.front].knee
    const aF = p.feet[p.front].ankle
    const sh: Vec = [41, 41 + b]
    const hemY = 92
    const fx = Math.max(kF[0] + 2.4, 46.4)
    coat.setAttribute(
      'd',
      `M${f(sh[0] - 6)} ${f(sh[1] + 1)} Q${f(sh[0] - 1)} ${f(sh[1] - 2.4)} ${f(sh[0] + 5)} ${f(sh[1] + 1)} L${f(fx - 0.6)} ${f(70 + b)} Q${f(fx)} ${f(82 + b * 0.5)} ${f(Math.max(fx, aF[0] - 4))} ${hemY} L${f(30.6)} ${hemY + 1} L${f(33.2)} ${f(70 + b)}Z`,
    )
    coatSeam.setAttribute('d', `M${f(sh[0] + 2.6)} ${f(sh[1] + 4)} L${f(sh[0] + 3.8)} ${f(66 + b)}`)

    const hc: Vec = [42.6, 31.6 + b]
    head.setAttribute('cx', f(hc[0]))
    head.setAttribute('cy', f(hc[1]))
    const lift = tip * 5
    hat.setAttribute(
      'd',
      `M${f(hc[0] - 6.4)} ${f(hc[1] - 3.6 - lift)} L${f(hc[0] + 6.6)} ${f(hc[1] - 3.6 - lift)} Q${f(hc[0] + 4.4)} ${f(hc[1] - 5 - lift)} ${f(hc[0] + 4)} ${f(hc[1] - 8 - lift)} Q${f(hc[0])} ${f(hc[1] - 11 - lift)} ${f(hc[0] - 3.8)} ${f(hc[1] - 8 - lift)} Q${f(hc[0] - 4.2)} ${f(hc[1] - 5 - lift)} ${f(hc[0] - 6.4)} ${f(hc[1] - 3.6 - lift)}Z`,
    )
    scarf.setAttribute(
      'd',
      `M${f(hc[0] - 4.6)} ${f(hc[1] + 4.6)} Q${f(hc[0])} ${f(hc[1] + 8.4)} ${f(hc[0] + 4)} ${f(hc[1] + 4.8)} L${f(hc[0] + 4.4)} ${f(hc[1] + 7.6)} Q${f(hc[0])} ${f(hc[1] + 11)} ${f(hc[0] - 4.8)} ${f(hc[1] + 7.4)}Z`,
    )
    const flow = tail.step(-6 - walk.speed * 0.08 * go - wind.value * 5 + Math.sin(t * 9) * 0.8, dt)
    scarfTail.setAttribute(
      'd',
      `M${f(hc[0] - 3.6)} ${f(hc[1] + 6)} Q${f(hc[0] - 6 + flow * 0.4)} ${f(hc[1] + 9)} ${f(hc[0] - 4 + flow)} ${f(hc[1] + 16 + flow * 0.2)} L${f(hc[0] - 1 + flow * 0.9)} ${f(hc[1] + 16.6 + flow * 0.2)} Q${f(hc[0] - 3 + flow * 0.3)} ${f(hc[1] + 10)} ${f(hc[0] - 0.8)} ${f(hc[1] + 7.4)}Z`,
    )

    const legSwing = (p.feet[0].ankle[0] - 40) / (walk.stride / 2)
    const farA = (armSwing[0].step(-legSwing * 16 * go, dt) * Math.PI) / 180
    const nearA = (armSwing[1].step(legSwing * 14 * go, dt) * Math.PI) / 180
    const shF: Vec = [sh[0] - 1, sh[1] + 2]
    const shN: Vec = [sh[0] + 1.6, sh[1] + 2.4]
    const elbF: Vec = [shF[0] + 17 * Math.sin(farA), shF[1] + 17 * Math.cos(farA)]
    farArm.draw(
      [shF, elbF, [elbF[0] + 16 * Math.sin(farA + 0.25), elbF[1] + 16 * Math.cos(farA + 0.25)]],
      [0.2, 0.5],
    )

    let hand: Vec
    if (tip > 0.01) {
      const target: Vec = [hc[0] + 4, hc[1] - 4 - lift]
      const mid = lerpP(shN, target, 0.5)
      const elb: Vec = [mid[0] + 7 * tip, mid[1] + 3]
      hand = lerpP(
        [shN[0] + 17 * Math.sin(nearA) + 16 * Math.sin(nearA + 0.1), shN[1] + 33],
        target,
        tip,
      )
      nearArm.draw(
        [shN, lerpP([shN[0] + 17 * Math.sin(nearA), shN[1] + 17], elb, tip), hand],
        [0.2, 0.4],
      )
    } else {
      const elb: Vec = [shN[0] + 17 * Math.sin(nearA), shN[1] + 17 * Math.cos(nearA)]
      hand = [elb[0] + 16 * Math.sin(nearA + 0.1), elb[1] + 16 * Math.cos(nearA + 0.1)]
      nearArm.draw([shN, elb, hand], [0.2, 0.4])
    }

    const accel = Math.cos(2 * Math.PI * phase * 2) * 1.6 * go
    const ca = folioSwing.step(-accel - wind.value * 0.3, dt)
    const ch: Vec = tip > 0.01 ? [shN[0] + 6, shN[1] + 34] : hand
    folioG.setAttribute('transform', `rotate(${f(ca * 57.3)} ${pt(ch)})`)
    folio.setAttribute(
      'd',
      `M${f(ch[0] - 7)} ${f(ch[1] + 1.6)} L${f(ch[0] + 7)} ${f(ch[1] + 1.6)} L${f(ch[0] + 7.4)} ${f(ch[1] + 15)} L${f(ch[0] - 7.4)} ${f(ch[1] + 15)}Z`,
    )
    folioBand.setAttribute(
      'd',
      `M${f(ch[0] - 7)} ${f(ch[1] + 5)} L${f(ch[0] + 7)} ${f(ch[1] + 5)} M${f(ch[0])} ${f(ch[1] + 1.6)} L${f(ch[0])} ${f(ch[1] + 15)}`,
    )
  })

  return () => {
    fig.removeEventListener('pointerdown', onTip)
    stop()
    host.replaceChildren()
  }
}

function lerpP(a: Vec, b: Vec, t: number): Vec {
  t = clamp(t, 0, 1)
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}
