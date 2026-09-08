/**
 * Contenido de escenas — Fase 2 (prototipo, 14/14 escenas de MP.md §12).
 * Todo el texto viene literal de Docs/MP.md / Docs/Brief.md / Docs/GuiaEstudio_Aditmex.md.
 * No se inventa ningún dato, cifra o claim — ver regla "no inventes
 * investigación" (MP.md §0.12) y "seguridad de marca" (MP.md §37).
 *
 * `treatment` = sistema visual de fondo (propuesta con antes/después
 * confirmada por el usuario, 2026-09-07 — ver SceneBackdrop.tsx). 4
 * familias reutilizables, no 14 diseños bespoke:
 *   - retrato: viñeta + partículas doradas — apertura, cierre, y el
 *     momento "quién es ADITMEX". En `aditmex` las partículas además
 *     convergen en un clúster al entrar (mock 3D #1 de MP.md §21,
 *     "partículas que se organizan").
 *   - cadena: línea/nodos SVG — las 3 escenas cuyo título YA es una
 *     cadena con flechas (oportunidad, qué-hacemos, siguiente-nivel). En
 *     `siguiente-nivel` la línea y los nodos aparecen en secuencia (mock
 *     3D #2, "cadena de transformación").
 *   - red: grafo SVG con nodos conectados, sin inicio/fin marcado —
 *     `michoacan` (mock 3D #3, "red productores-ingredientes-mercado").
 *   - lista: guías horizontales sutiles — la única escena con contenido
 *     realmente enumerado (confianza, "01…05").
 *   - base: viñeta sutil sin elemento adicional — el resto, para que no
 *     todas las escenas "suenen fuerte" a la vez.
 *
 * `steps` (solo escena `confianza`): mismos 5 pasos que antes vivían como
 * una sola línea de texto ("01 Escuchamos · 02 …"), ahora estructurados
 * para renderizarse como badges — mismas palabras, sin texto nuevo.
 *
 * `image` (Fase 3, imágenes finales de Docs/images_prompt.md, integradas
 * 2026-09-07): foto de fondo real en las 11 escenas SIN 3D real. Decisión
 * de diseño: `aditmex`/`siguiente-nivel`/`michoacan` se quedan sin foto a
 * propósito — su fondo 3D vive en un <Canvas> global (App.tsx) pintado
 * DETRÁS de toda la sección de la escena; una foto de fondo ahí taparía
 * el 3D por completo (son capas separadas, no se puede alternar "encima").
 * El mapeo foto↔escena es por afinidad de contenido, no por el orden
 * recomendado de images_prompt.md (ese orden asume 12 escenas, aquí hay
 * 14 y 3 quedan reservadas para 3D) — ver SceneBackdrop.tsx para cómo se
 * renderiza (foto + velo de contraste, luego el resto de las capas igual
 * que antes).
 */
import type { ReactNode } from 'react'

export type Treatment = 'retrato' | 'cadena' | 'lista' | 'red' | 'base'

export type Scene = {
  id: string
  eyebrow: string
  title: ReactNode
  body?: string
  treatment: Treatment
  steps?: string[]
  image?: string
}

export const scenes: Scene[] = [
  {
    id: 'portada',
    eyebrow: 'ADITMEX',
    title: 'Materias primas que abren posibilidades.',
    treatment: 'retrato',
    image: 'images/hero-agroindustria-michoacan.webp',
  },
  {
    id: 'contexto',
    eyebrow: 'El contexto',
    title: 'Michoacán produce.',
    body: 'El valor no termina en la cosecha.',
    treatment: 'base',
    image: 'images/michoacan-value-chain.webp',
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
    image: 'images/transformed-food-products.webp',
  },
  {
    id: 'problema',
    eyebrow: 'El problema invisible',
    title: 'A veces, crecer no requiere una idea nueva.',
    body: 'Requiere encontrar la solución correcta.',
    treatment: 'base',
    image: 'images/mexican-food-entrepreneur.webp',
  },
  {
    id: 'aditmex',
    eyebrow: 'Quién es ADITMEX',
    title: 'El aliado detrás del ingrediente.',
    treatment: 'retrato',
    image: 'images/agro-texture-background.webp',
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
    image: 'images/ingredient-supply.webp',
  },
  {
    id: 'portafolio',
    eyebrow: 'El portafolio como soluciones',
    title:
      'No empezamos preguntando qué producto quieres comprar. Empezamos preguntando qué necesitas resolver.',
    treatment: 'base',
    image: 'images/food-ingredients-premium.webp',
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
    image: 'images/brand/aditmex-brand-texture.webp',
  },
  {
    id: 'confianza',
    eyebrow: 'Confianza',
    title: 'El ADITMEX Standard',
    steps: ['Escuchamos', 'Entendemos', 'Buscamos', 'Proponemos', 'Damos seguimiento'],
    treatment: 'lista',
    image: 'images/food-quality-standardization.webp',
  },
  {
    id: 'servicio',
    eyebrow: 'Servicio',
    title: 'Así trabajamos.',
    treatment: 'base',
    image: 'images/food-business-consultation.webp',
  },
  {
    id: 'michoacan',
    eyebrow: 'Michoacán',
    title:
      'Queremos que las empresas agroalimentarias de Michoacán tengan cerca un aliado para resolver lo que necesitan para crecer.',
    treatment: 'red',
    // Sin `image` a propósito: reusaba michoacan-value-chain.webp (ya en
    // `contexto`) y era una repetición notoria en el recorrido de 14
    // escenas. Prompt #13 nuevo en Docs/images_prompt.md
    // ("michoacan-regional-network.webp") para esta escena específica —
    // en cuanto exista el archivo real (WebP real, no PNG renombrado —
    // ver AGENTS.md), agrégalo aquí como
    // image: 'images/michoacan-regional-network.webp'.
  },
  {
    id: 'vision',
    eyebrow: 'Visión',
    title: 'Una nueva etapa de crecimiento necesita proveedores que piensen contigo.',
    treatment: 'base',
    image: 'images/michoacan-agroindustry.webp',
  },
  {
    id: 'cierre',
    eyebrow: 'Cierre',
    title: 'Una buena idea merece algo más que una materia prima.',
    body: 'Merece respaldo. ADITMEX.',
    treatment: 'retrato',
    image: 'images/ingredient-particles-abstract.webp',
  },
  {
    id: 'cta-final',
    eyebrow: 'Siguiente paso',
    title: 'Quien conoce lo que necesita para avanzar, deja de depender del azar.',
    body: 'ADITMEX — El respaldo detrás de lo que quieres desarrollar.',
    treatment: 'retrato',
    image: 'images/product-development-food.webp',
  },
]
