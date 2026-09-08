# CLAUDE.md

Contexto operativo para cualquier sesión de Claude Code en este repo. Este proyecto opera bajo el protocolo **addv-web-app** — ver `~/.claude/skills/addv-web-app/SKILL.md`. Toda petición sigue el flujo: Analizar → Revisar impacto → Criticar y mejorar → Propuesta visual → Confirmar → Implementar → Probar → Asegurar. No lo repitas por petición, ya está activo por defecto en este repo.

## Qué es esto

Presentación de ventas de ADITMEX (proveedor de materias primas, aditivos e ingredientes para industria alimentaria) dirigida al Consejo Agroalimentario de Michoacán. Sitio estático de una sola página, sin backend, sin build step.

## Arquitectura

- `index.html` — todo el sitio: HTML + CSS (`<style>` inline) + JS inline. Sin framework, sin bundler.
- `assets/images/` — `backgrounds/`, `hero/`, `products/`, `segments/`.
- `Docs/` — material de negocio de referencia (briefing ejecutivo, guía de estudio para la reunión). No es parte del sitio desplegado.
- `addv/cmem.md` — historial comprimido de decisiones de este proyecto bajo el protocolo. Léelo al empezar sesión nueva para no repetir preguntas ya resueltas.

## Paleta y diseño

Tokens definidos en `:root` dentro de `index.html` (líneas ~16-50). **Advertencia dejada en el propio código**: la paleta actual es una estimación visual, no verificada contra el sitio real de ADITMEX (no se pudo leer su CSS ni decodificar imágenes al momento de crear el sitio). Sustituir por los HEX oficiales de marca en cuanto estén disponibles — tratar como pendiente, no como decisión final.

Fuentes: Fraunces (serif, títulos), Manrope (sans, cuerpo), IBM Plex Mono (mono, eyebrows/detalles técnicos) — cargadas vía Google Fonts.

## Convenciones

- Sin build: los cambios a `index.html` son directos, no hay paso de compilación que correr.
- `prefers-reduced-motion` ya respetado globalmente — cualquier animación nueva debe seguir esa misma regla y animar solo `transform`/`opacity` (ver skill `low-impact-motion`).
- Idioma del sitio: español (`lang="es-MX"`).

## Comandos frecuentes

No hay `package.json` ni gestor de paquetes en este proyecto — es HTML estático puro.

- **Ver el sitio en local**: abrir `index.html` directo en el navegador, o servirlo con cualquier servidor estático simple (ej. `python -m http.server` desde la raíz) si se necesita probar rutas relativas o fetch.
- **Docker**: aún no configurado. Pendiente de decisión con el usuario (ver `project_state.md`) — el protocolo exige Docker siempre, pero para un sitio 100% estático la forma más simple es una imagen nginx sirviendo `index.html` + `assets/`; no se ha implementado todavía.

## Reglas de este repo (heredadas del protocolo)

- No tocar la paleta de colores como si fuera definitiva sin avisar que es una estimación no verificada.
- No mover `Docs/*.pdf` ni los PDFs sueltos en la raíz (`DOC-20260907-WA0048.pdf`, `Guia_Estudio_ADITMEX_Consejo_Agroalimentario_Michoacan-1.pdf`) sin confirmación — puede haber duplicidad con `Docs/` pendiente de resolver con el usuario.
- Cualquier cambio visual al sitio requiere propuesta antes/después y confirmación explícita antes de implementarse (paso 4 y 6 del protocolo).
- Actualizar `project_state.md` y agregar entrada nueva en `addv/cmem.md` al cerrar cada segmento de trabajo.
