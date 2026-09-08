/**
 * Contenido de escenas — Fase 2 (prototipo, 14/14 escenas de MP.md §12).
 * Todo el texto viene literal de Docs/MP.md / Docs/Brief.md / Docs/GuiaEstudio_Aditmex.md.
 * No se inventa ningún dato, cifra o claim — ver regla "no inventes
 * investigación" (MP.md §0.12) y "seguridad de marca" (MP.md §37).
 * Falta: sistema visual completo por escena, mock 3D, imágenes finales —
 * ver AGENTS.md → "Qué sigue". El gate de aprobación (MP.md §0.9) sigue
 * pendiente antes de Fase 3 (3D real, imágenes finales, Tauri).
 */
import type { ReactNode } from 'react'

export type Scene = {
  id: string
  eyebrow: string
  title: ReactNode
  body?: string
}

export const scenes: Scene[] = [
  {
    id: 'portada',
    eyebrow: 'ADITMEX',
    title: 'Materias primas que abren posibilidades.',
  },
  {
    id: 'contexto',
    eyebrow: 'El contexto',
    title: 'Michoacán produce.',
    body: 'El valor no termina en la cosecha.',
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
  },
  {
    id: 'problema',
    eyebrow: 'El problema invisible',
    title: 'A veces, crecer no requiere una idea nueva.',
    body: 'Requiere encontrar la solución correcta.',
  },
  {
    id: 'aditmex',
    eyebrow: 'Quién es ADITMEX',
    title: 'El aliado detrás del ingrediente.',
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
  },
  {
    id: 'portafolio',
    eyebrow: 'El portafolio como soluciones',
    title:
      'No empezamos preguntando qué producto quieres comprar. Empezamos preguntando qué necesitas resolver.',
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
  },
  {
    id: 'confianza',
    eyebrow: 'Confianza',
    title: 'El ADITMEX Standard',
    body: '01 Escuchamos · 02 Entendemos · 03 Buscamos · 04 Proponemos · 05 Damos seguimiento',
  },
  {
    id: 'servicio',
    eyebrow: 'Servicio',
    title: 'Así trabajamos.',
  },
  {
    id: 'michoacan',
    eyebrow: 'Michoacán',
    title:
      'Queremos que las empresas agroalimentarias de Michoacán tengan cerca un aliado para resolver lo que necesitan para crecer.',
  },
  {
    id: 'vision',
    eyebrow: 'Visión',
    title: 'Una nueva etapa de crecimiento necesita proveedores que piensen contigo.',
  },
  {
    id: 'cierre',
    eyebrow: 'Cierre',
    title: 'Una buena idea merece algo más que una materia prima.',
    body: 'Merece respaldo. ADITMEX.',
  },
  {
    id: 'cta-final',
    eyebrow: 'Siguiente paso',
    title: 'Quien conoce lo que necesita para avanzar, deja de depender del azar.',
    body: 'ADITMEX — El respaldo detrás de lo que quieres desarrollar.',
  },
]
