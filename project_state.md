# project_state.md

Estado del proyecto `adtmex_ventas` bajo el protocolo `addv-web-app`. Última actualización: 2026-09-07.

## Qué existe

- `index.html` (908 líneas) — sitio de una página, HTML+CSS+JS inline, sin dependencias de build. Presentación de ventas de ADITMEX para reunión con el Consejo Agroalimentario de Michoacán (8 sep 2026).
- `assets/images/{backgrounds,hero,products,segments}/` — imágenes del sitio.
- `Docs/` (sin trackear en git) — `Brief.md`/`Brief.pdf` (briefing ejecutivo de la reunión), `GuiaEstudio_Aditmex.md`/`Guia_Estudio_ADITMEX_Consejo_Agroalimentario_Michoacan-1.pdf`, `Nuevo Documento de texto.txt`.
- `/app` — prototipo Vite+React+TS+Tailwind del rediseño mayor de `Docs/MP.md`, separado del `index.html` de raíz. **14/14 escenas** con copy real de `MP.md` mergeadas, `tsc --noEmit` y `npm run build` limpios, verificado en navegador escena por escena (contenido, contador, dots, sin errores de consola). Helpers de Ruflo copiados a `app/.claude/helpers/` (no trackeados en git, config por máquina).
- Documentación base del protocolo (`CLAUDE.md`, este archivo, `README.md`, `addv/cmem.md`).
- Commit más reciente en el repo: `e0c4183 feat: scaffold /app Vite+React+TS prototype with 14-scene narrative (MP.md)`.
- **Remote único**: `origin` → `https://github.com/addv-prototipos/aditmex-CAM.git`. Todo el trabajo de este repo (`adtmex_ventas`) vive únicamente ahí.

## En progreso

Nada activo ahora mismo — se acaba de cerrar el segmento de verificación del scaffold `/app` (14 escenas) y la reorganización de remotes.

## Falta / pendiente

- **Docker**: el protocolo exige "Docker siempre" pero el sitio estático raíz no tiene contenedorización todavía. No implementado.
- **Rediseño mayor (`Docs/MP.md`) — `/app`**: 14/14 escenas de la Fase 2 completas y verificadas (ver arriba). **Gate de aprobación humana pendiente antes de Fase 3** (3D real con Three.js, imágenes finales, empaquetado Tauri) — no iniciar sin confirmación explícita del usuario. Ver `app/AGENTS.md` para detalle completo y qué sigue (documentado para que otro agente, ej. OpenCode, pueda continuar sin perder contexto).
- **Incidente a vigilar**: durante la verificación del `/app` se cerró el servidor de desarrollo con `taskkill /F /IM node.exe`, que mata *todos* los procesos `node.exe` de la máquina, no solo el de este proyecto — tumbó también la conexión MCP de Ruflo. Si Ruflo no responde en la próxima sesión, reiniciar Claude Code / relanzar Ruflo. Pendiente: usar un método de apagado más quirúrgico (PID específico) en vez de `taskkill /IM` la próxima vez.
- **Pruebas**: no hay pruebas unitarias ni funcionales todavía en el sitio raíz. Para un sitio estático sin lógica de negocio compleja, el piso mínimo razonable sería smoke test (build/lint HTML, verificación de enlaces/imágenes rotos, chequeo de accesibilidad) — no implementado, pendiente de definir alcance con el usuario.
- **`.idea/`** sin trackear — carpeta de configuración de IDE (JetBrains). No se ha decidido si debe ir a `.gitignore` o si el usuario la quiere trackeada.

## Cerrado

- **Realineación de contenido de `index.html` a la reunión del Consejo (2026-09-08)**: el sitio estaba enfocado 100% en panificación (catálogo/cotización, "cada fórmula que sale de su horno...") y no reflejaba el posicionamiento del brief ("aliado técnico agroalimentario", sin lista de precios). Confirmado con el usuario que este `index.html` SÍ es el material para la reunión — se reescribió copy en: `<title>`/meta, nav, hero, "Quiénes somos", el bloque "Cómo trabajamos" (ahora genérico: escuchar → identificar → asesorar → acompañar, tomado de la política de servicio real del brief), la sección de segmentos (panificación pasa de "sector prioritario" exclusivo a "mayor profundidad técnica" dentro de un panorama agroalimentario más amplio), la intro del portafolio técnico (reencuadrada explícitamente como "ejemplo", no catálogo completo — cumple la regla del brief "no conviertas la reunión en una lista de precios"), y el CTA final (de "cotización" a "conversación", usando la frase de política de servicio "no prometemos tener todas las respuestas..."). CSS/JS/estructura sin tocar — cero riesgo de regresión técnica. Verificación: revisada visualmente en navegador sección por sección (hero, quiénes somos, cómo trabajamos, segmentos, portafolio, resultados, CTA final, footer) — sin roturas de layout, contraste correcto, tipografía cargando bien.

- PDFs duplicados eliminados: `Docs/Brief.pdf` y `Docs/Guia_Estudio_ADITMEX_Consejo_Agroalimentario_Michoacan-1.pdf` (quedan solo sus versiones `.md`).
- **Identidad de marca real aplicada a `index.html`**: paleta y tipografía extraídas en vivo del CSS de `aditmex.com.mx` (07 sep 2026) — `#27274D` marino (`--primary`), `#C4AC4D` dorado (`--accent`), Montserrat (headings) + Geist/Geist Mono (cuerpo/mono). Reemplaza la paleta placeholder (teal/ámbar/Fraunces) que antes estaba marcada como "no verificada". Verificado visualmente en navegador (servidor local), sin regresiones.
- `Docs/images_prompt.md` ampliado con sección `IDENTIDAD DE MARCA` (ID-01 logo revectorizado, ID-02 textura de marca) separada de las 12 escenas narrativas — usa exclusivamente los 2 hex reales.
- **Ruflo configurado** (local, no commiteado — mismo criterio que `D:\srv\portalFac`): `.mcp.json` (servidor `claude-flow`, `autoStart:false`) + `.claude/settings.json` (topología mesh, 5 agentes máx., memoria en RAM) calcados de `portalFac`. `.gitignore` actualizado para excluir `.claude/`, `.claude-flow/`, `.agents/`, `.mcp.json`, `.swarm/`, `node_modules/`.
- **Scaffold `/app` completado (14/14 escenas)**: las 9 escenas restantes (06-14) se autoraron con copy literal de `MP.md` y se mergearon al arreglo `scenes.tsx` (51 → ~114 líneas). `tsc --noEmit` y `npm run build` limpios. Verificación en navegador: recorrido de las 14 escenas con `get_page_text` (no solo screenshot) confirmando contenido único por escena, contador `NN/14` y dots sincronizados, sin errores de consola. Se investigó una falsa alarma (contador aparentemente "congelado" en `01/14` mientras el contenido avanzaba) — resultó ser un bundle cacheado en la pestaña del navegador (se resolvió con hard-reload) y, por separado, un efecto esperado de `AnimatePresence mode="wait"` al mandar teclas más rápido que la transición de 700ms — el código en sí (`App.tsx`) es correcto, un solo estado `index` alimenta contador y dots en el mismo render. Commiteado como `e0c4183`.
- **Reorganización de remotes git**: el repo tenía dos remotes (`origin` → `aditmex-CAM.git`, `origin-ventas` → `aditmex-ventas.git`, migrado a `addv-prototipos/aditmex-ventas`). El usuario decidió que **todo el trabajo de este directorio (`adtmex_ventas`) vive únicamente en `aditmex-CAM.git`**, y que `aditmex-ventas.git` debe quedar intacto tal como estaba antes de este segmento (en `ae7cbf8`). Se revirtió el push accidental de `e0c4183` en `aditmex-ventas.git` (force-push de vuelta a `ae7cbf8`), se empujó `e0c4183` a `aditmex-CAM.git`, y se eliminó el remote `origin-ventas` del repo local. Único remote ahora: `origin` → `aditmex-CAM.git`.

## Decisiones ya tomadas

- El registro de conversación comprimido del proyecto vive en `addv/cmem.md`, no en la raíz (regla del protocolo).
- `CLAUDE.md`, este `project_state.md` y `README.md` se quedan en la raíz (auto-carga de Claude Code y renderizado de README en la plataforma git).
- **Remote único autorizado para este repo: `origin` → `https://github.com/addv-prototipos/aditmex-CAM.git`.** No volver a agregar/pushear a `aditmex-ventas.git` desde este directorio salvo instrucción explícita nueva del usuario — ese repo es de otro proyecto/propietario y debe permanecer intacto.

## Decisiones pendientes de confirmar con el usuario

- Si se conteneriza el sitio con Docker/Docker Compose y con qué setup (nginx estático es la opción por defecto sugerida).
- Qué hacer con los dos PDFs sueltos en la raíz.
- Si `Docs/` debe trackearse en git o quedarse fuera (actualmente sin trackear).
- Alcance de pruebas para un sitio 100% estático.
