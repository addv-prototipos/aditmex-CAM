/**
 * Contenido de escenas — Fase 2 (prototipo, 14/14 escenas de MP.md §12).
 * Todo el texto viene literal de Docs/MP.md / Docs/Brief.md / Docs/GuiaEstudio_Aditmex.md.
 * No se inventa ningún dato, cifra o claim — ver regla "no inventes
 * investigación" (MP.md §0.12) y "seguridad de marca" (MP.md §37).
 *
 * `treatment` = sistema visual de fondo (propuesta con antes/después
 * confirmada por el usuario, 2026-09-07 — ver SceneBackdrop.tsx). 3
 * familias reutilizables, no 14 diseños bespoke:
 *   - retrato: viñeta + partículas doradas — apertura, cierre, y los dos
 *     momentos de mayor peso narrativo (quién es ADITMEX, Michoacán).
 *   - cadena: línea/nodos SVG — las 3 escenas cuyo título YA es una
 *     cadena con flechas (oportunidad, qué-hacemos, siguiente-nivel).
 *   - lista: guías horizontales sutiles — la única escena con contenido
 *     realmente enumerado (confianza, "01…05").
 *   - base: viñeta sutil sin elemento adicional — el resto, para que no
 *     todas las escenas "suenen fuerte" a la vez.
 *
 * `steps` (solo escena `confianza`): mismos 5 pasos que antes vivían como
 * una sola línea de texto ("01 Escuchamos · 02 …"), ahora estructurados
 * para renderizarse como badges — mismas palabras, sin texto nuevo.
 * Falta: mock 3D, imágenes finales — ver AGENTS.md → "Qué sigue". El gate
 * de aprobación (MP.md §0.9) sigue pendiente antes de Fase 3 (3D real,
 * imágenes finales, Tauri).
 */
import type { ReactNode } from 'react'

export type Treatment = 'retrato' | 'cadena' | 'lista' | 'base'

export type Scene = {
  id: string
  eyebrow: string
  title: ReactNode
  body?: string
  treatment: Treatment
  steps?: string[]
}

export const scenes: Scene[] = [
  {
    id: 'portada',
    eyebrow: 'ADITMEX',
    title: 'Materias primas que abren posibilidades.',
    treatment: 'retrato',
  },
  {
    id: 'contexto',
    eyebrow: 'El contexto',
    title: 'Michoacán produce.',
    body: 'El valor no termina en la cosecha.',
    treatment: 'base',
  },
  {
    id: 'oportunidad',
    eyebrow: 'La oportunidad',
    title: (
      <>
        Materia prima <i>→</i> transformación <i>→</i> producto <i>→</i> valor
        agregado <i>→</i> mercado
      </>
    ),
    treatment: 'cadena',
  },
  {
    id: 'problema',
    eyebrow: 'El problema invisible',
    title: 'A veces, crecer no requiere una idea nueva.',
    body: 'Requiere encontrar la solución correcta.',
    treatment: 'base',
  },
  {
    id: 'aditmex',
    eyebrow: 'Quién es ADITMEX',
    title: 'El aliado detrás del ingrediente.',
    treatment: 'retrato',
  },
  {
    id: 'qué-hacemos',
    eyebrow: 'Cómo trabajamos',
    title: (
      <>
        Necesidad <i>→</i> análisis <i>→</i> búsqueda <i>→</i> selección{' '}
        <i>→</i> suministro <i>→</i> seguimiento
      </>
    ),
    treatment: 'cadena',
  },
  {
    id: 'portafolio',
    eyebrow: 'El portafolio como soluciones',
    title:
      'No empezamos preguntando qué producto quieres comprar. Empezamos preguntando qué necesitas resolver.',
    treatment: 'base',
  },
  {
    id: 'siguiente-nivel',
    eyebrow: 'Del producto actual al siguiente nivel',
    title: (
      <>
        Materia prima <i>→</i> formulación <i>→</i> producto estandarizado
      </>
    ),
    body: 'Fruta → pulpa → bebida · Fruta → preparación → mermelada',
    treatment: 'cadena',
  },
  {
    id: 'confianza',
    eyebrow: 'Confianza',
    title: 'El ADITMEX Standard',
    steps: ['Escuchamos', 'Entendemos', 'Buscamos', 'Proponemos', 'Damos seguimiento'],
    treatment: 'lista',
  },
  {
    id: 'servicio',
    eyebrow: 'Servicio',
    title: 'Así trabajamos.',
    treatment: 'base',
  },
  {
    id: 'michoacan',
    eyebrow: 'Michoacán',
    title:
      'Queremos que las empresas agroalimentarias de Michoacán tengan cerca un aliado para resolver lo que necesitan para crecer.',
    treatment: 'retrato',
  },
  {
    id: 'vision',
    eyebrow: 'Visión',
    title: 'Una nueva etapa de crecimiento necesita proveedores que piensen contigo.',
    treatment: 'base',
  },
  {
    id: 'cierre',
    eyebrow: 'Cierre',
    title: 'Una buena idea merece algo más que una materia prima.',
    body: 'Merece respaldo. ADITMEX.',
    treatment: 'retrato',
  },
  {
    id: 'cta-final',
    eyebrow: 'Siguiente paso',
    title: 'Quien conoce lo que necesita para avanzar, deja de depender del azar.',
    body: 'ADITMEX — El respaldo detrás de lo que quieres desarrollar.',
    treatment: 'retrato',
  },
]
