import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { scenes } from './scenes'

// Navegación de teclado + indicador de progreso: ver MP.md §19 "Presentación
// fullscreen". Placeholder de 3D (MP.md §21) queda pendiente — ver AGENTS.md.
function App() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const last = scenes.length - 1

  const go = useCallback(
    (next: number) => setIndex((i) => Math.min(last, Math.max(0, typeof next === 'number' ? next : i))),
    [last],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(index + 1) }
      else if (e.key === 'ArrowLeft') { go(index - 1) }
      else if (e.key === 'Home') { go(0) }
      else if (e.key === 'End') { go(last) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, go, last])

  const scene = scenes[index]

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-navy text-paper">
      <AnimatePresence mode="wait">
        <motion.section
          key={scene.id}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -24 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.22, 0.68, 0, 1] }}
          className="flex h-full w-full flex-col items-start justify-center gap-6 px-10 md:px-24"
        >
          <span className="font-body text-xs uppercase tracking-[0.14em] text-gold-light">
            {scene.eyebrow}
          </span>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight text-balance md:text-6xl">
            {scene.title}
          </h1>
          {scene.body && (
            <p className="max-w-2xl font-body text-lg text-white/70 italic">{scene.body}</p>
          )}
        </motion.section>
      </AnimatePresence>

      {/* Indicador de progreso — discreto, MP.md §19/§30 (sin navbar tradicional) */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Ir a escena ${i + 1}: ${s.eyebrow}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-8 bg-gold' : 'w-1.5 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <div className="absolute right-8 top-8 font-body text-xs tracking-[0.1em] text-white/40">
        {String(index + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
      </div>
    </div>
  )
}

export default App
