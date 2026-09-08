/**
 * 3D real (React Three Fiber) para los 3 momentos memorables de MP.md §21:
 * partículas que se organizan (`aditmex`), cadena de transformación
 * (`siguiente-nivel`), red de conexión (`michoacan`). Sustituye los mocks
 * CSS/SVG de SceneBackdrop.tsx solo en esas 3 escenas y solo si hay WebGL
 * (ver webgl.ts) — si no hay WebGL, SceneBackdrop nunca llega a importar
 * este archivo, cae directo al mock 2D ya aprobado.
 *
 * Un <Canvas> se monta/desmonta junto con cada una de estas 3 escenas
 * (AnimatePresence en App.tsx desmonta la escena completa al cambiar) —
 * no corre de fondo en las otras 11, cumple "correr razonablemente en
 * laptops Windows" (MP.md §21).
 *
 * Paleta: únicamente navy/gold reales de marca (ver index.css --color-*),
 * sin colores nuevos. `reduceMotion` congela cada escena en su estado
 * final sin loop, igual que el resto del sitio.
 */
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

const GOLD = '#C4AC4D'
const GOLD_LIGHT = '#D4BE6D'

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function OrganizingParticles({ reduceMotion }: { reduceMotion: boolean }) {
  const N = 60
  const ORGANIZE_MS = 1400
  const startRef = useRef(performance.now())
  const refs = useRef<(THREE.Object3D | null)[]>([])

  const particles = useMemo(
    () =>
      Array.from({ length: N }, (_, i) => {
        // distribución fibonacci-sphere: clúster parejo, no denso al centro
        const phi = Math.acos(1 - (2 * (i + 0.5)) / N)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const r = 1.1
        const target = new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi) * 0.6,
        )
        const scatter = new THREE.Vector3(
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3,
        )
        return { target, scatter, phase: Math.random() * Math.PI * 2 }
      }),
    [],
  )

  useFrame(() => {
    const elapsed = performance.now() - startRef.current
    particles.forEach((p, i) => {
      const obj = refs.current[i]
      if (!obj) return
      if (reduceMotion || elapsed >= ORGANIZE_MS) {
        const settle = reduceMotion ? 0 : performance.now() * 0.0006
        obj.position.set(
          p.target.x + Math.sin(settle + p.phase) * 0.03,
          p.target.y + Math.cos(settle * 1.3 + p.phase) * 0.03,
          p.target.z,
        )
      } else {
        const t = easeOutCubic(elapsed / ORGANIZE_MS)
        obj.position.lerpVectors(p.scatter, p.target, t)
      }
    })
  })

  return (
    <group position={[1.7, 0.2, 0]}>
      <Instances limit={N} range={N}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.85} />
        {particles.map((p, i) => (
          <Instance
            key={i}
            ref={(el: THREE.Object3D | null) => {
              refs.current[i] = el
            }}
            position={p.scatter}
          />
        ))}
      </Instances>
    </group>
  )
}

function ChainSegment({
  a,
  b,
  delay,
  startTimeRef,
  reduceMotion,
}: {
  a: THREE.Vector3
  b: THREE.Vector3
  delay: number
  startTimeRef: React.MutableRefObject<number>
  reduceMotion: boolean
}) {
  const matRef = useRef<THREE.LineBasicMaterial>(null)
  const positions = useMemo(() => new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z]), [a, b])

  useFrame(() => {
    if (!matRef.current) return
    if (reduceMotion) {
      matRef.current.opacity = 0.4
      return
    }
    const elapsed = performance.now() - startTimeRef.current
    const t = Math.max(0, Math.min(1, (elapsed - delay) / 400))
    matRef.current.opacity = 0.4 * t
  })

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial ref={matRef} color={GOLD} transparent opacity={0} />
    </line>
  )
}

function ChainNode({
  position,
  hub,
  delay,
  startTimeRef,
  reduceMotion,
}: {
  position: THREE.Vector3
  hub: boolean
  delay: number
  startTimeRef: React.MutableRefObject<number>
  reduceMotion: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)
  const finalScale = hub ? 0.09 : 0.07

  useFrame(() => {
    if (!ref.current) return
    if (reduceMotion) {
      ref.current.scale.setScalar(finalScale)
      return
    }
    const elapsed = performance.now() - startTimeRef.current
    const t = Math.max(0, Math.min(1, (elapsed - delay) / 500))
    ref.current.scale.setScalar(0.001 + easeOutCubic(t) * finalScale)
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color={hub ? GOLD : GOLD_LIGHT} />
    </mesh>
  )
}

function TransformationChain({ reduceMotion }: { reduceMotion: boolean }) {
  const startRef = useRef(performance.now())
  const nodes = useMemo(
    () => [
      new THREE.Vector3(-2.6, -1.3, -0.3),
      new THREE.Vector3(-1.3, -0.65, 0),
      new THREE.Vector3(0, 0, 0.3),
      new THREE.Vector3(1.3, 0.65, 0),
      new THREE.Vector3(2.6, 1.3, -0.3),
    ],
    [],
  )
  const NODE_STAGGER = 180

  return (
    <group position={[0.3, 0, 0]}>
      {nodes.slice(0, -1).map((n, i) => (
        <ChainSegment
          key={i}
          a={n}
          b={nodes[i + 1]}
          delay={i * NODE_STAGGER}
          startTimeRef={startRef}
          reduceMotion={reduceMotion}
        />
      ))}
      {nodes.map((n, i) => (
        <ChainNode
          key={i}
          position={n}
          hub={i === 0 || i === nodes.length - 1}
          delay={i * NODE_STAGGER}
          startTimeRef={startRef}
          reduceMotion={reduceMotion}
        />
      ))}
    </group>
  )
}

const NETWORK_NODES: [number, number, boolean][] = [
  [380, 60, false],
  [480, 40, true],
  [560, 110, false],
  [600, 220, false],
  [520, 290, true],
  [430, 250, false],
  [460, 150, false],
  [340, 180, false],
]
const NETWORK_EDGES: [number, number][] = [
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

function ConnectionNetwork({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const hubRefs = useRef<Record<number, THREE.Object3D | null>>({})

  const nodes = useMemo(
    () =>
      NETWORK_NODES.map(([x, y, hub], i) => ({
        pos: new THREE.Vector3((x - 470) / 130, -(y - 175) / 130, Math.sin(i * 1.7) * 0.4),
        hub,
      })),
    [],
  )

  useFrame((_, delta) => {
    if (!reduceMotion && groupRef.current) groupRef.current.rotation.y += delta * 0.06
    const t = performance.now() * 0.001
    nodes.forEach((n, i) => {
      if (!n.hub) return
      const obj = hubRefs.current[i]
      if (!obj) return
      obj.scale.setScalar(reduceMotion ? 1 : 1 + Math.sin(t * 1.6 + i) * 0.12)
    })
  })

  return (
    <group ref={groupRef} position={[1.6, 0.1, 0]}>
      {NETWORK_EDGES.map(([a, b], i) => {
        const pa = nodes[a].pos
        const pb = nodes[b].pos
        const positions = new Float32Array([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z])
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={GOLD} transparent opacity={0.22} />
          </line>
        )
      })}
      {nodes.map((n, i) => (
        <mesh
          key={i}
          ref={
            n.hub
              ? (el: THREE.Object3D | null) => {
                  hubRefs.current[i] = el
                }
              : undefined
          }
          position={n.pos}
        >
          <sphereGeometry args={[n.hub ? 0.09 : 0.06, 12, 12]} />
          <meshBasicMaterial color={n.hub ? GOLD : GOLD_LIGHT} transparent opacity={n.hub ? 1 : 0.7} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * `active` controla el frameloop: en las otras 11 escenas (o si el
 * usuario ya se fue de las 3 especiales) el canvas sigue montado —ver
 * App.tsx, es a propósito, evita recrear el contexto WebGL— pero no
 * necesita dibujar nada cuadro a cuadro.
 */
export function Scene3D({
  sceneId,
  reduceMotion,
  active,
}: {
  sceneId: string
  reduceMotion: boolean
  active: boolean
}) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6], fov: 40 }}
      frameloop={active && !reduceMotion ? 'always' : 'demand'}
    >
      {sceneId === 'aditmex' && <OrganizingParticles reduceMotion={reduceMotion} />}
      {sceneId === 'siguiente-nivel' && <TransformationChain reduceMotion={reduceMotion} />}
      {sceneId === 'michoacan' && <ConnectionNetwork reduceMotion={reduceMotion} />}
    </Canvas>
  )
}
