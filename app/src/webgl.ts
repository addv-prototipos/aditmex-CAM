/**
 * Detección de WebGL sin importar three.js — vive separado de Scene3D.tsx
 * para que SceneBackdrop pueda decidir si vale la pena cargar el chunk de
 * React Three Fiber (lazy) sin pagar su peso solo por preguntar.
 * Fallback 2D es requisito de MP.md §21 ("implementar fallback 2D si
 * WebGL no está disponible").
 */
/** Escenas de MP.md §21 que intentan 3D real — ver Scene3D.tsx. */
export const REAL_3D_SCENES = new Set(['aditmex', 'siguiente-nivel', 'michoacan'])

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}
