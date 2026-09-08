# addv/cmem.md

Registro comprimido de la conversación del proyecto bajo el protocolo `addv-web-app`. Entradas nuevas se agregan al final, nunca se reescribe el historial previo.

---

## 2026-09-07 — Adopción del protocolo y docs base

**Pedido**: cargar la skill `addv-web-app` y crear la documentación base del protocolo (`CLAUDE.md`, `project_state.md`, `README.md`, `addv/cmem.md`).

**Contexto encontrado**: proyecto ya existente con un commit (`4318db8`), sin ninguna de las cuatro docs del protocolo. Sitio: `index.html` estático de una página (908 líneas, HTML+CSS+JS inline), imágenes en `assets/images/`, material de negocio en `Docs/` (sin trackear). Dos PDFs sueltos en la raíz también sin trackear.

**Discutido/criticado**: no aplicó crítica de requerimiento — petición explícita y sin ambigüedad (crear 4 archivos de documentación estándar). No es cambio visual, no requiere propuesta antes/después (paso 4 no aplica a documentación).

**Decidido**:
- Las 4 docs se crean con el contenido real observado del repo, no plantillas genéricas.
- Se documentan como pendientes (no se resuelven en este segmento): Docker, paleta de colores no verificada, duplicidad de PDFs sueltos, alcance de pruebas, `.idea/` sin trackear.

**Implementado**: `CLAUDE.md`, `project_state.md`, `README.md` en raíz; `addv/cmem.md` en `addv/`.

**Pendiente**: todo lo listado en la sección "Decisiones pendientes de confirmar con el usuario" de `project_state.md` — Docker/Docker Compose, limpieza de PDFs duplicados, si `Docs/` se trackea, alcance de pruebas.

---

## 2026-09-07 — Limpieza de PDFs duplicados

**Pedido**: eliminar los PDFs porque ya existe su versión en Markdown.

**Implementado**: borrados `Docs/Brief.pdf` y `Docs/Guia_Estudio_ADITMEX_Consejo_Agroalimentario_Michoacan-1.pdf` (los `.md` correspondientes se conservan). Los 2 PDFs sueltos que había en la raíz ya no existían al momento de ejecutar (el usuario los había movido/gestionado por su cuenta antes).

---

## 2026-09-07 — Descubrimiento de `Docs/MP.md` + `Docs/images_prompt.md` y auditoría de marca real

**Contexto encontrado**: aparecieron `Docs/MP.md` (prompt maestro, ~1800 líneas) y `Docs/images_prompt.md` sin que el usuario los mencionara antes — el usuario confirmó que él los invocó/creó.

**Pedido**: "ejecutar" `MP.md` y, si hace falta, actualizar `images_prompt.md`, aplicando el flujo de `addv-web-app` (análisis, impacto, mejora, plan, propuesta visual antes/después en cada etapa).

**Analizado**: `MP.md` pide reconstruir el sitio completo como app React/Vite/Tailwind/Three.js empaquetada con Tauri (Windows .exe/.msi), en 8 etapas con gates de aprobación humana — y el propio `MP.md` instruye no programar nada en su Etapa/Fase 1, solo auditar y presentar diagnóstico. **Riesgo de calendario señalado al usuario**: la reunión con el Consejo es 2026-09-08, un día después de esta sesión — incompatible con ese alcance. El usuario pausó ("por cierto pausa") antes de decidir sobre el rediseño completo.

**Pedido siguiente (tras la pausa)**: tomar la identidad visual/de marca real del sitio `aditmex.com.mx` tal cual, mejorarla en calidad para la presentación, y separar en `images_prompt.md` los prompts de mejora de identidad de marca de los de contenido narrativo.

**Investigado (fuente primaria, extracción directa, no estimación)**:
- CSS en vivo de `aditmex.com.mx` (curl del HTML + bundle CSS de Next.js): `--primary:#27274D` (marino), `--accent:#C4AC4D` (dorado), tipografía `Montserrat` (heading) + `Geist`/`Geist Mono` (cuerpo/mono).
- Logo oficial (`aditmex-logo-white.svg`): solo usa `#FFFFFF` + `#C4AC4D`, diseñado para fondo oscuro — confirma que el marino es el fondo de marca.
- Investigación web sobre el Consejo: presidente confirmado Carlos Ochoa Arceo (fuentes SEDECO, prensa 2026).

**Propuesta visual**: artifact con comparativo antes (paleta/tipografía estimada) vs. ahora (real, extraída), logo real renderizado, rampa tonal derivada (no inventada) y preview del bloque nuevo de `images_prompt.md`. Publicado antes de tocar ningún archivo.

**Confirmado por el usuario**: "usa la extraída del sitio web".

**Implementado**:
- `index.html`: tokens de `:root` remapeados a los valores reales (`--wheat`/`--paprika` → `#C4AC4D`, `--espresso`/`--steel` → tonos reales de marino, `--serif`/`--sans`/`--mono` → Montserrat/Geist/Geist Mono), Google Fonts actualizado. Se mantuvieron los NOMBRES de variable existentes (72 usos en el archivo) para minimizar riesgo de regresión — solo cambiaron los valores hex/fuente, no la estructura del CSS.
- `Docs/images_prompt.md`: nueva sección `IDENTIDAD DE MARCA` (ID-01 logo revectorizado, ID-02 textura de marca), separada de las 12 escenas narrativas, usando solo los 2 hex reales.
- Verificado visualmente en navegador (servidor estático local + capturas) — sin regresiones, contraste correcto.

**Pendiente**: decisión sobre `MP.md` completo (rebuild React/Tauri) — no iniciado, conflicto de calendario sin resolver. El resto de pendientes de `project_state.md` sigue abierto.

---

## 2026-09-07 — Realineación de contenido para la reunión de mañana

**Pedido**: "sigue con index.html para mañana".

**Analizado**: al leer `index.html` completo se detectó que todo el copy está enfocado en panificación con tono de catálogo/cotización ("Solicitar cotización", especificaciones de dosificación g/kg, "Cada fórmula que sale de su horno empieza en la nuestra") — contradice directamente la regla explícita de `GuiaEstudio_Aditmex.md`: *"No conviertas la reunión en una lista de precios"*, y no menciona Michoacán/Consejo ni la posición "aliado técnico" en ningún punto.

**Pregunta bloqueante**: no estaba claro si este `index.html` es el material para la reunión del Consejo o un sitio de ventas aparte sin relación con la junta — pregunté antes de asumir. El usuario confirmó: **es para la reunión del Consejo**, y que sí debía realinearse el contenido (no solo el estilo).

**Implementado** (solo copy, CSS/JS/estructura intactos — riesgo de regresión mínimo):
- `<title>`/meta description: de "panificación" a "aliado técnico y comercial para la industria agroalimentaria".
- Nav: CTA "Solicitar asesoría" → "Conversemos".
- Hero: eyebrow/h1/sub/CTA reescritos con el mensaje de 30 segundos real del brief (acompañar a desarrollar/mejorar/estandarizar, no solo vender insumos).
- "Quiénes somos": amplía de "plantas de panificación y repostería" a "empresas agroalimentarias... transformar su materia prima".
- "Cómo trabajamos": los 4 pasos pasaron de ser específicos de panificación (harinas/mejoradores/sabor/acabado) a la política de servicio real (escuchar → identificar → asesorar → acompañar), tomada de `GuiaEstudio_Aditmex.md`/`MP.md`.
- Segmentos: panificación deja de ser "sector prioritario" exclusivo, pasa a "mayor profundidad técnica" dentro de un panorama de 4 sectores.
- Portafolio técnico: intro reencuadrada explícitamente como "ejemplo" de asesoría, no catálogo completo — mismos datos técnicos (se conservan como evidencia de profundidad real, no se inventó nada nuevo).
- CTA final: de framing de cotización/precio a framing de conversación, incorporando la frase de política de servicio ya aprobada en `MP.md`: "No prometemos tener todas las respuestas. Prometemos trabajar para encontrar la correcta."
- Mensaje predefinido de WhatsApp actualizado (ya no dice "cotizar materias primas para panificación").

**Verificación visual**: la extensión Claude-in-Chrome se desconectó a mitad de la sesión anterior; el usuario la reinició y pidió revisar. Se verificó en navegador sección por sección (hero, quiénes somos, cómo trabajamos, segmentos, portafolio técnico con tabs, resultados, CTA final, footer) — sin roturas de layout, contraste correcto, tipografía Montserrat/Geist cargando bien, copy nuevo legible en todas las secciones.

---

## 2026-09-07 — Ruflo configurado + arranque de `/app` (MP.md, Fase 1-2)

**Contexto**: tras el commit+push del `index.html` realineado, el usuario pidió (1) "configura ruflo como en D:\srv\portalFac" y, en el mismo tramo de conversación, (2) continuar con el plan grande de `MP.md` — confirmó explícitamente "carpeta /app aparte, index.html de raíz queda intacto" y pidió documentar para que **OpenCode** (modelo declarado por el usuario: "muse spark 1.2", no reconocido — se documentó la incertidumbre en vez de asumir capacidades) pueda continuar con la misma calidad.

**Ruflo**: inspeccionado `D:\srv\portalFac` (`.mcp.json`, `.claude/settings.json`, `.gitignore`) para replicar solo la parte de *configuración declarativa* — se excluyó a propósito el estado en vivo (`.claude-flow/` runtime, `.swarm/memory.db`, logs, sesiones) por ser historial de OTRO proyecto, no portable, y el servidor MCP `idea` (JetBrains, específico de esa máquina/proyecto). Replicado en la raíz de `adtmex_ventas`: `.mcp.json` (servidor `claude-flow`, `autoStart:false`, topología mesh, 5 agentes) + `.claude/settings.json` (mismo bloque `claudeFlow`). Confirmado que en `portalFac` estos archivos están en `.gitignore` (no se commitean, configuración por máquina) — mismo criterio aplicado aquí, `.gitignore` actualizado.

**`/app` — decisión de arquitectura confirmada por el usuario**: proyecto nuevo, separado, no toca el `index.html` de raíz (ese sigue siendo el sitio real de la reunión del 2026-09-08). Antes de esto se preguntó explícitamente si el build grande debía arrancar ya sabiendo que se entrega después de la reunión, o si había que recortar alcance para tener algo listo antes — el usuario eligió **arrancar ya, entrega post-reunión**, sin presión de fecha.

**Implementado**:
- Scaffold Vite + React + TypeScript en `/app`, Tailwind v4 (`@tailwindcss/vite`, tokens de marca reales en `@theme`), Framer Motion, `three`/`@react-three/fiber`/`@react-three/drei` instalados (sin usar todavía — reservados para los 3 momentos 3D de `MP.md` §21), `lucide-react`.
- Fuentes Montserrat/Geist reales autohospedadas en `src/assets/fonts/` (no CDN — requisito de `MP.md` §18: la app final debe correr offline en Tauri).
- `vite.config.ts` con `base:'./'` (requisito para servir desde `file://` dentro de Tauri).
- `App.tsx` + `scenes.tsx`: shell de presentación fullscreen, navegación por teclado (flechas/espacio/home/end), indicador de progreso discreto, transiciones con Framer Motion, `prefers-reduced-motion` respetado. 5 de las 14 escenas de `MP.md` §12 con copy literal (portada, contexto, oportunidad, problema invisible, quién es ADITMEX) — nada inventado.
- Verificado: `tsc --noEmit` limpio, `npm run build` limpio (offline, sin fetch externo), probado en navegador (`npm run dev`) — navegación por teclado funcional, contraste real correcto (confirmado con zoom, el gris que se veía en el screenshot era compresión JPEG, no un bug real).
- `app/AGENTS.md` (para OpenCode) + `app/CLAUDE.md` (apunta a AGENTS.md, sin duplicar): diagnóstico completo, identidad visual, stack y decisiones, qué existe, qué sigue en orden, y el recordatorio explícito del gate de aprobación humana de `MP.md` §0.9 antes de Fase 3 (3D real, imágenes finales, Tauri).

**Pendiente**: escenas 6-14, sistema visual completo por escena, mock 3D (placeholder, no Three.js real todavía), y **detenerse en el gate** antes de construir nada de Fase 3 sin aprobación explícita del usuario.

---

## 2026-09-07 — 14/14 escenas, verificación, commit, y reorganización de remotes

**Pedido**: "continua donde te quedaste" — retomar tras el corte de sesión anterior (9 escenas de `/app` pendientes de mergear y verificar).

**Implementado (`/app`)**: verificado que las 14 escenas ya estaban mergeadas en `scenes.tsx` y que `App.tsx` usa `scenes.length`/`index` de forma dinámica (sin límite hardcodeado que ajustar). `tsc --noEmit` y `npm run build` limpios. Levantado `vite` local y recorridas las 14 escenas en navegador con `get_page_text` (contenido real del DOM, no solo screenshot) — cada escena con copy único, contador `NN/14` y dots sincronizados, sin errores de consola.

**Falsa alarma investigada**: en un screenshot tras 13 `ArrowRight` seguidos, el contador parecía "congelado" en `01/14` mientras el contenido y los dots ya mostraban la escena 14. Se lanzó un agente Explore a leer `App.tsx` completo: confirmó que un único estado `index` alimenta contador y dots en el mismo render, sin animación/debounce diferencial — descartaba bug de lógica. La causa real resultó doble: (1) la pestaña del navegador tenía un bundle cacheado de una versión anterior (se resolvió con hard-reload, `ctrl+shift+r`); (2) por separado, al mandar teclas más rápido que los 700ms de la transición `AnimatePresence mode="wait"`, el contenido visual queda momentáneamente detrás del índice — comportamiento esperado del componente, no bug, irrelevante para uso real (una tecla a la vez).

**Incidente**: para detener el servidor de desarrollo se usó `taskkill /F /IM node.exe`, que mata todos los procesos `node.exe` de la máquina — no solo el de este proyecto. Esto tumbó también la conexión MCP de Ruflo (confirmado por el aviso de "347 deferred tools no longer available" inmediatamente después). Reportado al usuario proactivamente. Pendiente: usar un método más quirúrgico (PID específico) la próxima vez.

**Commit**: `e0c4183 feat: scaffold /app Vite+React+TS prototype with 14-scene narrative (MP.md)` — 31 archivos, incluye todo `/app` + `.gitignore`/`project_state.md`/`cmem.md` de la sesión anterior. Verificado antes de stagear que el `.gitignore` de `/app` excluye `node_modules`/`dist` correctamente (28 archivos untracked, ninguno de build/cache).

**Reorganización de remotes (pedido explícito del usuario tras el push)**: el repo tenía `origin` → `aditmex-CAM.git` y `origin-ventas` → `aditmex-ventas.git` (este último con aviso de GitHub de que el repo se movió a `addv-prototipos/aditmex-ventas`). El commit `e0c4183` se empujó primero por error a `origin-ventas` (rama trackeada por defecto). El usuario pidió cancelar/revertir y aclaró exactamente el criterio: **todo el trabajo de hoy en este directorio debe vivir en `aditmex-CAM.git`**, y **`aditmex-ventas.git` debe quedar intacto** (tal como estaba antes de este push, en `ae7cbf8`). Ejecutado:
1. `git push origin-ventas ae7cbf8:master --force-with-lease` — revierte `aditmex-ventas.git` a `ae7cbf8`, quitando `e0c4183` de ahí.
2. `git push origin master` — fast-forward de `aditmex-CAM.git` desde `31f3bb8` hasta `e0c4183` (incorpora también `ae7cbf8`, que ya era parte del trabajo "de hoy" y no estaba antes en ese repo).
3. `git remote remove origin-ventas` — a pedido explícito, para que no quede riesgo de push accidental futuro a ese repo.

Verificado con `git fetch` a ambos remotes antes de eliminar `origin-ventas`: `aditmex-ventas.git` en `ae7cbf8` (intacto), `aditmex-CAM.git` en `e0c4183` (todo). Único remote local ahora: `origin` → `aditmex-CAM.git`.

**Pendiente**: gate de aprobación humana antes de Fase 3 de `MP.md` (3D real, Tauri) — sin iniciar. Resto de pendientes de `project_state.md` sigue abierto.

---

## 2026-09-07 — Sistema visual de fondos por escena (siguiente paso de AGENTS.md)

**Pedido**: "continua con el siguiente paso" → siguiente paso de `app/AGENTS.md` era "sistema visual completo" (composición por escena, sin imágenes finales todavía).

**Propuesta antes/después**: siguiendo la regla del repo de que ningún cambio visual se implementa sin propuesta + confirmación explícita, se publicó un artifact (`https://claude.ai/code/artifact/abfcf343-886a-48ce-8568-0e31c6550f16`) comparando 3 escenas reales (portada, oportunidad, confianza) en su estado actual vs. 3 tratamientos de fondo propuestos — solo CSS/SVG/canvas, sin imágenes nuevas, sin texto nuevo, usando únicamente los 2 colores de marca. El usuario confirmó: "adelante, impleméntalo".

**Implementado**:
- `app/src/SceneBackdrop.tsx` (nuevo): componente con 4 variantes — `retrato` (viñeta radial + `<canvas>` de partículas doradas, respeta `prefers-reduced-motion`), `cadena` (línea + nodos SVG diagonal), `lista` (guías horizontales sutiles), `base` (solo viñeta suave).
- `scenes.tsx`: campo `treatment` agregado a cada una de las 14 escenas. Al mapear el sistema al contenido real se corrigió la asignación que había quedado en el pie del artifact (ahí decía "cadena → oportunidad, siguiente-nivel, portafolio" y "lista → qué-hacemos, confianza"): revisando el texto real, `qué-hacemos` también es una cadena con flechas igual que `oportunidad`/`siguiente-nivel` (debe ir en `cadena`, no en `lista`), y `portafolio` es una frase retórica sin cadena ni enumeración (va en `base`). La única escena con contenido realmente enumerado es `confianza` — es la única en `lista`. Mapeo final: retrato→portada/aditmex/michoacan/cierre/cta-final (5) · cadena→oportunidad/qué-hacemos/siguiente-nivel (3) · lista→confianza (1) · base→contexto/problema/portafolio/servicio/vision (5).
- Escena `confianza`: el body "01 Escuchamos · 02 Entendemos · …" se reestructuró a un array `steps` renderizado como badges numerados en `App.tsx` — mismas 5 palabras, sin invención, solo cambia prosa→estructura (igual que se mostró en el artifact).
- `App.tsx`: importa `SceneBackdrop`, lo renderiza como primera capa dentro de `motion.section` con `relative`/`z-0`, y sube el contenido de texto existente a `relative z-10` para que no quede tapado.

**Verificado**: `tsc --noEmit` y `npm run build` limpios (bundle CSS/JS creció ~1KB/3KB, nada llamativo). Servidor dev en puerto nuevo (5174, para no chocar con instancias previas), recorrido de las 14 escenas con `get_page_text` (contenido + tratamiento correcto en cada una) y screenshots de las 4 variantes (retrato, cadena, lista, base) confirmando que se ven como en la propuesta. Se repitió la misma falsa alarma del contador "congelado" ya documentada (tab con bundle cacheado) — se resolvió igual, con hard-reload; no es un bug del código, ya está anotado en "Gotchas operativos" de `AGENTS.md` para que no se vuelva a investigar desde cero. Sin errores de consola.

**Incidente evitado esta vez**: se detuvo el servidor de desarrollo matando el proceso por PID específico (`kill $(cat pidfile)`), no con `taskkill /IM node.exe` — no se repitió el incidente de la sesión anterior que tumbó la conexión MCP de Ruflo.

**Commit**: `a8bab14 feat(app): sistema visual de fondos por escena (retrato/cadena/lista/base)` — pusheado directo a `aditmex-CAM.git` (único remote).

**Pendiente**: mock 3D (MP.md §22) es el siguiente paso de `AGENTS.md`, luego el gate de aprobación humana antes de Fase 3. Sin iniciar.
