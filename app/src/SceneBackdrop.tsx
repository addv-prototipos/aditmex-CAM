/**
 * Fondo decorativo por escena — sistema visual aprobado (propuesta con
 * antes/después publicada y confirmada por el usuario, 2026-09-07).
 * Sin imágenes, sin fetch externo: solo gradientes CSS, SVG y un <canvas>
 * de partículas ligero. Las imágenes finales de Docs/images_prompt.md
 * llegan después del gate de MP.md §0.9 (Fase 3) — esto es composición,
 * no arte final.
 *
 * Fase 3 (gate aprobado 2026-09-07): las 3 escenas de MP.md §21 (aditmex/
 * siguiente-nivel/michoacan) ahora intentan 3D real (`Scene3D.tsx`, React
 * Three Fiber) — pero el <Canvas> vive en App.tsx, montado una sola vez y
 * persistente entre escenas (ver nota ahí: remontarlo por escena agotaba
 * el límite de contextos WebGL del navegador tras pocas navegaciones —
 * "THREE.WebGLRenderer: Context Lost" — inaceptable en una presentación
 * en vivo). Este archivo solo decide si debe *ceder* su mock 2D para
 * dejar ver el canvas de atrás (`hasWebGL()` true) o mostrarlo siempre
 * (fallback obligatorio de MP.md §21 si no hay WebGL).
 */
import { useEffect, useMemo, useRef } from 'react'
import type { Scene } from './scenes'
import { REAL_3D_SCENES, hasWebGL } from './webgl'

/**
 * `organize`: mock del 3D #1 de MP.md §21 ("partículas/materias primas que
 * se organizan") — sin ambición de reemplazarlo, solo probar el ritmo:
 * las partículas convergen en un clúster (~1.4s, ease-out) y luego
 * respiran ahí con un jitter mínimo determinista (seno/coseno, sin
 * acumular velocidad — no hay riesgo de que "se escapen" del clúster).
 * Con `prefers-reduced-motion` arriba ya no hay animación de scroll/CSS,
 * pero este canvas se anima por rAF/JS, así que si además `reduceMotion`
 * viene true se salta directo al estado final organizado, sin bucle.
 */
function Particles({ reduceMotion, organize = false }: { reduceMotion: boolean; organize?: boolean }) {
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

    const w0 = canvas.clientWidth
    const h0 = canvas.clientHeight
    const clusterX = w0 * 0.72
    const clusterY = h0 * 0.42
    const clusterR = Math.min(w0, h0) * 0.16
    const ORGANIZE_MS = 1400
    const start = performance.now()

    const N = 42
    const points = Array.from({ length: N }, () => {
      const angle = Math.random() * Math.PI * 2
      const radius = clusterR * Math.sqrt(Math.random())
      const targetX = clusterX + Math.cos(angle) * radius
      const targetY = clusterY + Math.sin(angle) * radius
      const scattered = organize && !reduceMotion
      return {
        x: scattered ? Math.random() * w0 : targetX,
        y: scattered ? Math.random() * h0 : targetY,
        ix: scattered ? undefined : targetX,
        iy: scattered ? undefined : targetY,
        targetX,
        targetY,
        r: 0.6 + Math.random() * 1.6,
        a: 0.14 + Math.random() * 0.34,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        phase: Math.random() * Math.PI * 2,
      }
    })
    for (const p of points) {
      if (p.ix === undefined) {
        p.ix = p.x
        p.iy = p.y
      }
    }

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const draw = (now: number) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      const elapsed = now - start

      for (const p of points) {
        if (organize) {
          if (elapsed < ORGANIZE_MS) {
            const t = easeOutCubic(elapsed / ORGANIZE_MS)
            p.x = p.ix! + (p.targetX - p.ix!) * t
            p.y = p.iy! + (p.targetY - p.iy!) * t
          } else {
            const settle = now * 0.0006
            p.x = p.targetX + Math.sin(settle + p.phase) * 2.4
            p.y = p.targetY + Math.cos(settle * 1.3 + p.phase) * 2.4
          }
        } else if (!reduceMotion) {
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
    draw(start)

    return () => cancelAnimationFrame(raf)
  }, [reduceMotion, organize])

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />
}

/**
 * `stagger`: mock del 3D #2 de MP.md §21 ("cadena de transformación:
 * materia prima → ingrediente → producto") — reservado para la escena
 * cuyo texto ya narra exactamente esa cadena (`siguiente-nivel`). El
 * resto de escenas `cadena` (oportunidad, qué-hacemos) quedan igual que
 * antes, sin animación, para no sobre-usar el efecto.
 */
function ChainLines({ stagger = false }: { stagger?: boolean }) {
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
        style={
          stagger
            ? { strokeDasharray: 600, animation: 'line-grow 1.1s ease forwards' }
            : undefined
        }
      />
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 0 || i === nodes.length - 1 ? 5.5 : 4.5}
          fill={i === 0 || i === nodes.length - 1 ? '#C4AC4D' : 'rgba(196,172,77,.65)'}
          style={
            stagger
              ? { opacity: 0, transformOrigin: `${n.x}px ${n.y}px`, animation: `node-in .5s ease forwards`, animationDelay: `${i * 180}ms` }
              : undefined
          }
        />
      ))}
    </svg>
  )
}

/**
 * `red`: mock del 3D #3 de MP.md §21 ("red de conexión entre productores,
 * ingredientes, procesos y mercado") — grafo, no cadena lineal: sin punto
 * de inicio/fin marcado, 2 nodos "hub" con pulso sutil (respeta
 * prefers-reduced-motion vía la regla global de index.css).
 */
function NetworkGraph() {
  const nodes = [
    { x: 380, y: 60, hub: false },
    { x: 480, y: 40, hub: true },
    { x: 560, y: 110, hub: false },
    { x: 600, y: 220, hub: false },
    { x: 520, y: 290, hub: true },
    { x: 430, y: 250, hub: false },
    { x: 460, y: 150, hub: false },
    { x: 340, y: 180, hub: false },
  ]
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 0],
    [6, 7],
    [7, 5],
    [1, 6],
  ]
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-80"
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(196,172,77,.22)"
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.hub ? 5.5 : 3.5}
          fill={n.hub ? '#C4AC4D' : 'rgba(196,172,77,.6)'}
          style={
            n.hub
              ? { transformOrigin: `${n.x}px ${n.y}px`, animation: `node-pulse ${2.4 + i * 0.3}s ease-in-out infinite` }
              : undefined
          }
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

function Legacy2DContent({
  treatment,
  reduceMotion,
  sceneId,
}: {
  treatment: Scene['treatment']
  reduceMotion: boolean
  sceneId: string
}) {
  return (
    <>
      {treatment === 'retrato' && <Particles reduceMotion={reduceMotion} organize={sceneId === 'aditmex'} />}
      {treatment === 'cadena' && <ChainLines stagger={sceneId === 'siguiente-nivel'} />}
      {treatment === 'red' && <NetworkGraph />}
      {treatment === 'lista' && <GuideLines />}
    </>
  )
}

export function SceneImage({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      decoding="async"
      draggable={false}
    />
  )
}

export function PhotoScrim() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(100deg, rgba(26,26,46,.88) 0%, rgba(26,26,46,.62) 42%, rgba(26,26,46,.28) 75%, rgba(26,26,46,.32) 100%)',
      }}
    />
  )
}

export function Vignette({ strength }: { strength: 'soft' | 'strong' }) {
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

export function SceneBackdrop({
  treatment,
  reduceMotion,
  sceneId,
  image,
}: {
  treatment: Scene['treatment']
  reduceMotion: boolean
  sceneId: string
  image?: string
}) {
  const rendersOnGlobalCanvas = useMemo(() => REAL_3D_SCENES.has(sceneId) && hasWebGL(), [sceneId])
  // Para escenas 3D la foto se renderiza en App.tsx detrás del <Canvas> global
  // (z-0), para que el 3D quede entre la foto y el texto. Aquí solo va Vignette.
  const showImageHere = !!image && !rendersOnGlobalCanvas

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {showImageHere && (
        <>
          <SceneImage src={image} />
          <PhotoScrim />
        </>
      )}
      <Vignette strength={treatment === 'retrato' ? 'strong' : 'soft'} />
      {!rendersOnGlobalCanvas && <Legacy2DContent treatment={treatment} reduceMotion={reduceMotion} sceneId={sceneId} />}
    </div>
  )
}
