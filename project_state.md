# project_state.md

Estado del proyecto `adtmex_ventas` bajo el protocolo `addv-web-app`. Última actualización: 2026-09-07.

## Qué existe

- `index.html` (908 líneas) — sitio de una página, HTML+CSS+JS inline, sin dependencias de build. Presentación de ventas de ADITMEX para reunión con el Consejo Agroalimentario de Michoacán (8 sep 2026).
- `assets/images/{backgrounds,hero,products,segments}/` — imágenes del sitio.
- `Docs/` (sin trackear en git) — `Brief.md`/`Brief.pdf` (briefing ejecutivo de la reunión), `GuiaEstudio_Aditmex.md`/`Guia_Estudio_ADITMEX_Consejo_Agroalimentario_Michoacan-1.pdf`, `Nuevo Documento de texto.txt`.
- Documentación base del protocolo (`CLAUDE.md`, este archivo, `README.md`, `addv/cmem.md`) — recién creada.
- Commit único en el repo: `4318db8 ADD - Se agrega la presentación de ventas`.

## En progreso

Nada activo ahora mismo — se acaba de cerrar el segmento de creación de docs base.

## Falta / pendiente

- **Docker**: el protocolo exige "Docker siempre" pero el sitio estático raíz no tiene contenedorización todavía. No implementado.
- **Rediseño mayor (`Docs/MP.md`) — EN PROGRESO en `/app`**: proyecto Vite+React+TS+Tailwind aparte (no toca el `index.html` de raíz). Confirmado con el usuario: arranca ahora, entrega prevista después de la reunión del 2026-09-08 (no hay presión de fecha). Estado: Fase 1 (auditoría/diagnóstico) hecha, Fase 2 (prototipo) parcial — 5 de 14 escenas con copy real de `MP.md`, sistema de tokens real aplicado, fuentes autohospedadas (offline), navegación por teclado + indicador de progreso, build y typecheck verificados, probado en navegador. Gate de aprobación humana pendiente antes de Fase 3 (3D real, imágenes finales, Tauri) — ver `app/AGENTS.md` para el detalle completo y qué sigue. Documentado en `app/AGENTS.md` + `app/CLAUDE.md` para que otro agente (el usuario mencionó usar OpenCode) pueda continuar sin perder contexto.
- **Pruebas**: no hay pruebas unitarias ni funcionales todavía. Para un sitio estático sin lógica de negocio compleja, el piso mínimo razonable sería smoke test (build/lint HTML, verificación de enlaces/imágenes rotos, chequeo de accesibilidad) — no implementado, pendiente de definir alcance con el usuario.
- **`.idea/`** sin trackear — carpeta de configuración de IDE (JetBrains). No se ha decidido si debe ir a `.gitignore` o si el usuario la quiere trackeada.
- Sin `.gitignore` en el repo.

## Cerrado

- **Realineación de contenido de `index.html` a la reunión del Consejo (2026-09-08)**: el sitio estaba enfocado 100% en panificación (catálogo/cotización, "cada fórmula que sale de su horno...") y no reflejaba el posicionamiento del brief ("aliado técnico agroalimentario", sin lista de precios). Confirmado con el usuario que este `index.html` SÍ es el material para la reunión — se reescribió copy en: `<title>`/meta, nav, hero, "Quiénes somos", el bloque "Cómo trabajamos" (ahora genérico: escuchar → identificar → asesorar → acompañar, tomado de la política de servicio real del brief), la sección de segmentos (panificación pasa de "sector prioritario" exclusivo a "mayor profundidad técnica" dentro de un panorama agroalimentario más amplio), la intro del portafolio técnico (reencuadrada explícitamente como "ejemplo", no catálogo completo — cumple la regla del brief "no conviertas la reunión en una lista de precios"), y el CTA final (de "cotización" a "conversación", usando la frase de política de servicio "no prometemos tener todas las respuestas..."). CSS/JS/estructura sin tocar — cero riesgo de regresión técnica. Verificación: revisada visualmente en navegador sección por sección (hero, quiénes somos, cómo trabajamos, segmentos, portafolio, resultados, CTA final, footer) — sin roturas de layout, contraste correcto, tipografía cargando bien.

- PDFs duplicados eliminados: `Docs/Brief.pdf` y `Docs/Guia_Estudio_ADITMEX_Consejo_Agroalimentario_Michoacan-1.pdf` (quedan solo sus versiones `.md`).
- **Identidad de marca real aplicada a `index.html`**: paleta y tipografía extraídas en vivo del CSS de `aditmex.com.mx` (07 sep 2026) — `#27274D` marino (`--primary`), `#C4AC4D` dorado (`--accent`), Montserrat (headings) + Geist/Geist Mono (cuerpo/mono). Reemplaza la paleta placeholder (teal/ámbar/Fraunces) que antes estaba marcada como "no verificada". Verificado visualmente en navegador (servidor local), sin regresiones.
- `Docs/images_prompt.md` ampliado con sección `IDENTIDAD DE MARCA` (ID-01 logo revectorizado, ID-02 textura de marca) separada de las 12 escenas narrativas — usa exclusivamente los 2 hex reales.
- **Ruflo configurado** (local, no commiteado — mismo criterio que `D:\srv\portalFac`): `.mcp.json` (servidor `claude-flow`, `autoStart:false`) + `.claude/settings.json` (topología mesh, 5 agentes máx., memoria en RAM) calcados de `portalFac`. `.gitignore` actualizado para excluir `.claude/`, `.claude-flow/`, `.agents/`, `.mcp.json`, `.swarm/`, `node_modules/`.
- **Scaffold `/app` iniciado** (ver arriba, sección "Rediseño mayor").

## Decisiones ya tomadas

- El registro de conversación comprimido del proyecto vive en `addv/cmem.md`, no en la raíz (regla del protocolo).
- `CLAUDE.md`, este `project_state.md` y `README.md` se quedan en la raíz (auto-carga de Claude Code y renderizado de README en la plataforma git).

## Decisiones pendientes de confirmar con el usuario

- Si se conteneriza el sitio con Docker/Docker Compose y con qué setup (nginx estático es la opción por defecto sugerida).
- Qué hacer con los dos PDFs sueltos en la raíz.
- Si `Docs/` debe trackearse en git o quedarse fuera (actualmente sin trackear).
- Alcance de pruebas para un sitio 100% estático.
