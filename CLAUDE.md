# CLAUDE.md

Contexto operativo para cualquier sesión de Claude Code en este repo. Este proyecto opera bajo el protocolo **addv-web-app** — ver `~/.claude/skills/addv-web-app/SKILL.md`. Toda petición sigue el flujo: Analizar → Revisar impacto → Criticar y mejorar → Propuesta visual → Confirmar → Implementar → Probar → Asegurar. No lo repitas por petición, ya está activo por defecto en este repo.

## Qué es esto

Presentación de ventas de ADITMEX (proveedor de materias primas, aditivos e ingredientes para industria alimentaria) dirigida al Consejo Agroalimentario de Michoacán. Sitio estático de una sola página, sin backend, sin build step.

## Arquitectura

- `index.html` — sitio estático raíz (HTML+CSS+JS inline, sin framework) para la reunión 2026-09-08. Tokens reales ya aplicados (ver Paleta).
- `assets/images/` — `backgrounds/`, `hero/`, `products/`, `segments/` del sitio raíz.
- `/app` — experiencia inmersiva (Vite+React+TS+Tailwind+Three.js) con 14 escenas de `Docs/MP.md`, `base:'./'` para Tauri offline. Ver `app/AGENTS.md` y `app/CLAUDE.md`.
- `Docs/` — material de negocio (`Brief.md`, `GuiaEstudio_Aditmex.md`, `MP.md`, `images_prompt.md`, `Guion_Presentacion_*.pdf`).
- `addv/cmem.md` — historial comprimido de decisiones. Léelo al empezar sesión.

## Paleta y diseño

Tokens en `:root` de `index.html:16-49` — **identidad real extraída en vivo de aditmex.com.mx (07 sep 2026)**, no estimación: `--primary #27274D` (marino, fondo principal), `--accent #C4AC4D` (dorado, único acento). Rampa derivada: `#1A1A2E`/`#3D3D70`/`#D4BE6D`. Variables legacy (`--wheat`/`--paprika`/`--steel`) mapeadas a esos valores reales por compatibilidad (72 usos). Fuentes: **Montserrat** (display, `font-display`) + **Geist** (cuerpo) + **Geist Mono** (mono) — Google Fonts en `index.html`, autohospedadas TTF en `app/src/assets/fonts/` para offline Tauri.

## Convenciones

- Sin build: los cambios a `index.html` son directos, no hay paso de compilación que correr.
- `prefers-reduced-motion` ya respetado globalmente — cualquier animación nueva debe seguir esa misma regla y animar solo `transform`/`opacity` (ver skill `low-impact-motion`).
- Idioma del sitio: español (`lang="es-MX"`).

## Comandos frecuentes

- **Sitio raíz** (`index.html`): sin build — abrir directo o `python -m http.server`.
- **App** (`/app`): `npm install` · `npm run dev` (5173) · `npm run build` · `npm run preview` · `npm run test:e2e` (Playwright, 7 tests: navegación 14/14, dots, imágenes, 3D, a11y).
- **Docker**: aún no configurado (ver `project_state.md`).

## Reglas de este repo (heredadas del protocolo)

- Paleta real ya verificada — no tratar como estimación.
- No mover `Docs/*.pdf` sin confirmación — posible duplicidad pendiente con el usuario.
- Cualquier cambio visual requiere propuesta antes/después y confirmación explícita (paso 4 y 6).
- Actualizar `project_state.md` y agregar entrada en `addv/cmem.md` al cerrar cada segmento.
