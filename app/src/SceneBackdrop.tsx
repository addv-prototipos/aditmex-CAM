/**
 * Fondo decorativo por escena — sistema visual aprobado (propuesta con
 * antes/después publicada y confirmada por el usuario, 2026-09-07).
 * Sin imágenes, sin fetch externo: solo gradientes CSS, SVG y un <canvas>
 * de partículas ligero. Las imágenes finales de Docs/images_prompt.md
 * llegan después del gate de MP.md §0.9 (Fase 3) — esto es composición,
 * no arte final.
 */
import { useEffect, useRef } from 'react'
import type { Scene } from './scenes'

function Particles({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()

    const N = 42
    const points = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      r: 0.6 + Math.random() * 1.6,
      a: 0.12 + Math.random() * 0.32,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
    }))

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      for (const p of points) {
        if (!reduceMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(196,172,77,${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}

function Vignette({ strength }: { strength: 'soft' | 'strong' }) {
  const opacity = strength === 'strong' ? 1 : 0.55
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        background:
          'radial-gradient(120% 90% at 78% 18%, rgba(196,172,77,.14), transparent 60%), ' +
          'radial-gradient(90% 70% at 8% 100%, rgba(61,61,112,.5), transparent 65%)',
      }}
    />
  )
}

function ChainLines() {
  const nodes = [
    { x: 60, y: 300 },
    { x: 190, y: 245 },
    { x: 320, y: 190 },
    { x: 450, y: 135 },
    { x: 580, y: 80 },
  ]
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-90"
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
    >
      <line
        x1={nodes[0].x}
        y1={nodes[0].y}
        x2={nodes[nodes.length - 1].x}
        y2={nodes[nodes.length - 1].y}
        stroke="rgba(196,172,77,.35)"
        strokeWidth={1.5}
      />
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 0 || i === nodes.length - 1 ? 5.5 : 4.5}
          fill={i === 0 || i === nodes.length - 1 ? '#C4AC4D' : 'rgba(196,172,77,.65)'}
        />
      ))}
    </svg>
  )
}

function GuideLines() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-55" viewBox="0 0 640 360" preserveAspectRatio="none">
      <line x1="0" y1="90" x2="640" y2="90" stroke="rgba(255,255,255,.05)" />
      <line x1="0" y1="270" x2="640" y2="270" stroke="rgba(255,255,255,.05)" />
    </svg>
  )
}

export function SceneBackdrop({
  treatment,
  reduceMotion,
}: {
  treatment: Scene['treatment']
  reduceMotion: boolean
}) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {treatment === 'retrato' && (
        <>
          <Vignette strength="strong" />
          <Particles reduceMotion={reduceMotion} />
        </>
      )}
      {treatment === 'cadena' && (
        <>
          <Vignette strength="soft" />
          <ChainLines />
        </>
      )}
      {treatment === 'lista' && (
        <>
          <Vignette strength="soft" />
          <GuideLines />
        </>
      )}
      {treatment === 'base' && <Vignette strength="soft" />}
    </div>
  )
}
