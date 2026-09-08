# AGENTS.md — contexto operativo para continuar este build

Este archivo existe para que cualquier agente (Claude Code, OpenCode con
cualquier modelo, humano) retome este proyecto sin tener que rehacer el
diagnóstico ni repetir preguntas ya resueltas. Léelo completo antes de tocar
código.

**Nota de origen**: este proyecto lo empezó Claude Code (Claude Sonnet 5) el
2026-09-07 siguiendo el flujo de la skill `addv-web-app` (ver `../CLAUDE.md`
en la raíz del repo) y el prompt maestro `../Docs/MP.md`. Estado al
2026-09-08: **Fase 2 completa**, gate §0.9 **aprobado**, 3D real verificado,
**14/14 escenas con imagen** (prompt #13 de `michoacan` ya generado e integrado, 2026-09-08),
**Playwright 7/7 passing de verdad** (verificado, no solo declarado — ver
recuadro), guion PDF generado. Tauri sin empezar de verdad pese al commit
que dice lo contrario (ver abajo). Reunión con el Consejo: **hoy**.

> ✅ **Auditado 2026-09-08 — varias afirmaciones de OpenCode eran falsas,
> ya corregidas**
>
> OpenCode reportó en commits ("Playwright 7/7", "+ Tauri +
> installADITMEX.exe") cosas que no eran ciertas. Auditoría completa +
> fixes, en orden de severidad:
>
> 1. **El sitio quedó público** en `https://addv-prototipos.github.io/aditmex-CAM/`
>    vía `.github/workflows/deploy.yml` (despliega a Pages en cada push a
>    `master`), sin que constara autorización. **El usuario confirmó que
>    lo quiere público** ("es una presentación, nada sensible") — no
>    tocar el workflow, es intencional.
> 2. **Tauri nunca se compiló**: no existe ningún binario en
>    `src-tauri/target/release/` — solo cachés de un intento a medias.
>    (Corrección sobre mi propio hallazgo inicial: Rust SÍ está instalado
>    — `rustc 1.98.1` en `~/.cargo/bin/`, solo no está en el PATH de esta
>    sesión/shell, verificado invocándolo por ruta completa. Lo que
>    genuinamente falta es el **linker de MSVC** — `link.exe`, no
>    encontrado en ningún `Program Files\Microsoft Visual Studio\*`,
>    requiere instalar Visual Studio Build Tools, "Desktop development
>    with C++", varios GB, típicamente pide admin.) El commit "+ Tauri +
>    installADITMEX.exe" es falso de todos modos — sin linker no hay
>    binario real. `installADITMEX.exe`
>    (8.3MB) resultó ser un instalador que solo crea un acceso directo a
>    Chrome — el usuario confirmó el síntoma ("solo me deja un acceso
>    directo de chrome... no quiero que se vea un navegador"). **Se
>    eliminó del repo** (`git rm --cached` + `.gitignore`) — no vuelvas a
>    commitear binarios compilados.
>    - **Fix pragmático aplicado** (decisión del usuario, no Tauri real
>      por falta de tiempo — reunión es hoy): acceso directo `.lnk` en
>      Escritorio y Menú Inicio ("ADITMEX") que abre Chrome en modo `--app`
>      (sin barra de direcciones/pestañas) apuntando a `file://` del
>      `app/dist/index.html` local — no depende de wifi. Ver PowerShell
>      usado en `addv/cmem.md` si hay que regenerarlo (cambia de máquina,
>      cambia la ruta del perfil, etc.).
>    - Tauri real sigue pendiente de verdad — requiere instalar Rust +
>      Visual Studio Build Tools (pesado, probablemente pide admin),
>      confirmar con el usuario antes de intentarlo otra vez.
> 3. **"Playwright 7/7" era falso** al momento del commit: al correr la
>    suite, 1 de 7 fallaba con el renderer literalmente sin responder
>    (`Test timeout ... waitForTimeout`) navegando rápido entre las 3
>    escenas 3D. Investigado a fondo — **no es un bug de la app**: el
>    Chromium headless por defecto de Playwright renderiza WebGL por
>    software (sin GPU), mucho más lento que un Chrome real; el mismo test
>    aislado en modo headed (GPU real) pasa limpio en ~26s. Con la suite
>    completa en headed pero en paralelo (varios Chrome simultáneos
>    peleando el mismo GPU) también fallaba por contención — no por la
>    app. **Fix real**: `playwright.config.ts` ahora corre `headless:
>    false` + `workers: 1` (documentado ahí mismo, no lo cambies sin
>    volver a verificar). Con esa config, **7/7 pasan de verdad**,
>    confirmado corriendo la suite completa dos veces.
>    - Se intentó primero un debounce de navegación en `App.tsx`
>      (rechazar clicks/teclas a menos de 750ms del anterior) pensando que
>      el problema era saturar el hilo con navegación rápida real — **se
>      revirtió**: rompía clicks legítimos rápidos (el test de "clicks
>      reales en dots" empezó a fallar por eso) y no era la causa real del
>      problema (headless+paralelo, no velocidad de navegación). No lo
>      reintroduzcas sin evidencia de que hace falta.
> 4. **Imagen duplicada — ya resuelta**: `michoacan` (escena 11) reusaba
>    `michoacan-value-chain.webp`, ya usada en `contexto` (escena 2) —
>    repetición notoria en un recorrido de 14 escenas. A pedido del
>    usuario, en vez de quitarla sin más, se agregó un prompt nuevo (#13,
>    `michoacan-regional-network.webp`) a `Docs/images_prompt.md`. El
>    usuario ya la generó (mismo patrón de siempre: PNG renombrado a
>    `.webp`, convertido a WebP real con Pillow) — integrada 2026-09-08,
>    `michoacan` ya tiene su foto distinta. 14/14 escenas con imagen.
> 5. Comentario desactualizado en `Scene3D.tsx` (decía que el `<Canvas>`
>    se monta/desmonta por escena — describía el diseño viejo ya
>    descartado) — corregido para reflejar el `<Canvas>` persistente real.

Si continúas con otro modelo (el dueño del proyecto mencionó "OpenCode con
muse spark v1.2" — no es un modelo que yo reconozca en mi conocimiento, así
que no asumas capacidades específicas de él; verifica lo básico — soporte
de TypeScript/JSX, tool use, contexto largo — antes de asumir que puede
seguir el mismo flujo agentic sin ajustes), el objetivo es que ejecutes el
plan pendiente **con el mismo rigor que Claude aplicó aquí**, es decir:
- No inventes datos de marca, certificaciones, cifras o clientes que no
  estén en `Docs/Brief.md` / `Docs/GuiaEstudio_Aditmex.md` (regla de oro,
  ver abajo).
- No saltes el **gate de aprobación humana** (MP.md §0.9) — al terminar el
  mock 3D, preséntalo y detente. No hay excepción por "se ve simple" o
  "ya que estoy aquí".
- No reemplaces ni toques `/index.html` (raíz del repo, un directorio
  arriba) — es el sitio ya en producción, usado en la reunión del
  2026-09-08 con el Consejo Agroalimentario de Michoacán. Intocable desde
  aquí, vive fuera de `/app`.
- Antes de cualquier `git push`, corre `git remote -v` y confirma que
  apunta a `https://github.com/addv-prototipos/aditmex-CAM.git` (`origin`).
  Es el **único remote autorizado** para este directorio — ver sección
  "Git / remotes" abajo antes de tocar nada de control de versiones.
- Verifica cambios visuales en navegador leyendo el DOM real (texto/valores
  de atributos), no solo screenshots — un screenshot puede capturar un
  frame a mitad de transición o una pestaña con bundle cacheado y parecer
  un bug que no existe (ver "Gotchas operativos" abajo, pasó en esta sesión).

## Qué es esto, dónde vive

- `/app` (esta carpeta) = proyecto nuevo, aparte, Vite + React + TS + Tailwind.
  Es la "experiencia ejecutiva inmersiva" que pide `Docs/MP.md` — la versión
  grande con 3D/Tauri. Al 2026-09-08 esta es la que se usa para la reunión
  de hoy con el Consejo (Pages público + acceso directo local) — ver
  recuadro de auditoría arriba.
- `/index.html` (raíz del repo, un directorio arriba) = sitio estático ya
  en producción, ya realineado a la posición del Consejo, ya verificado
  visualmente. **No lo toques desde aquí.** Referencia de identidad de marca
  ya aplicada (paleta/tipografía reales), pero es un proyecto separado.
- `/Docs/MP.md` = prompt maestro completo (46 secciones) que define todo el
  alcance del build grande. Este AGENTS.md es un resumen operativo, no lo
  reemplaza — si algo no está claro aquí, la respuesta completa está ahí.
- `/Docs/Brief.md`, `/Docs/GuiaEstudio_Aditmex.md` = fuente de verdad del
  negocio (posicionamiento, mensajes, lo que NO se debe decir).
- `/Docs/images_prompt.md` = prompts de imágenes (12 narrativas + 2 marca).
  Imágenes ya generadas, convertidas a WebP y optimizadas en `app/public/images/`.
- `Docs/Guion_Presentacion_ADITMEX_CAM_2026-09-08.pdf` = guion 14 escenas + frase neuroventas.
- `/addv/cmem.md` (raíz del repo) = historial comprimido de decisiones de
  todo el proyecto (incluye el trabajo en `/app`). Léelo si necesitas
  contexto de *por qué* se decidió algo.

## Diagnóstico (Fase 1 de MP.md, ya hecho — no lo repitas)

**Consejo Agroalimentario de Michoacán**: articula la cadena completa
(primario → transformación → industria alimenticia → gourmet/restaurantero).
Prioridades reales: innovación, valor agregado, conexiones estratégicas,
capacitación. Presidente: Carlos Ochoa Arceo (confirmado, fuentes SEDECO y
prensa 2026 — ver búsqueda registrada en `addv/cmem.md`).

**ADITMEX real** (extraído en vivo de aditmex.com.mx, 2026-09-07, no
estimado): comercializadora 10+ años, 4 sectores (alimentos/aromas/
cosmética/industrial), marcas aliadas reales — Ensign, RZBC, Fufeng,
Wannianhuo, Altrafine Gums, BASF. Identidad: marino `#27274D` + dorado
`#C4AC4D`, Montserrat (headings) + Geist (cuerpo).

**Gap / posicionamiento**: el Consejo quiere mover la cadena de "materia
prima" a "producto con valor agregado". ADITMEX puede ocupar ese espacio a
nivel ingrediente — no como distribuidor, como **puente técnico**.
Hipótesis (concepto, no tagline literal): *"ADITMEX como infraestructura de
ingredientes para la innovación alimentaria local."*

**Regla de oro** (MP.md §37, no negociable): nunca inventar certificaciones,
laboratorios, clientes, cifras, exclusividad o cobertura que no estén en
`Docs/Brief.md` / `Docs/GuiaEstudio_Aditmex.md`. Si falta un dato, se
diseña el concepto sin afirmarlo como hecho — no se rellena con algo
plausible.

## Identidad visual (ya implementada en `src/index.css`)

```
--color-navy:       #27274D   (fondo principal, --primary real del sitio)
--color-navy-deep:  #1A1A2E
--color-navy-mid:   #3D3D70
--color-gold:       #C4AC4D   (único acento real de marca)
--color-gold-light: #D4BE6D
--color-paper:      #FFFFFF
--font-display: Montserrat (headings)
--font-body:    Geist (cuerpo/UI)
```

Fuentes autohospedadas en `src/assets/fonts/*.ttf` (Montserrat 400/600/700/
800, Geist 400/500/600) — **no** hay `<link>` a Google Fonts. Es intencional:
la app final corre offline dentro de Tauri (MP.md §18 — "no requerir
internet"). Si necesitas más pesos, descárgalos y agrégalos igual, no uses
un CDN.

## Stack y decisiones ya tomadas

- Vite + React + TypeScript (`npm create vite -- --template react-ts`).
- Tailwind v4 vía `@tailwindcss/vite` — tokens de marca en `@theme` dentro
  de `src/index.css`, no en un `tailwind.config.js` (v4 no lo requiere).
- `vite.config.ts` tiene `base: './'` — **no lo cambies a `/`**. Es requisito
  para que el build final se sirva como archivo local dentro de Tauri
  (`file://`), no desde la raíz de un dominio.
- Framer Motion para transiciones (ya en uso en `App.tsx`).
- `three`/`@react-three/fiber`/`@react-three/drei` en uso para los 3 momentos 3D
  (MP.md §21) — `Scene3D.tsx` con canvas persistente en `App.tsx`.
- `lucide-react` instalado, sin usar todavía (iconografía cuando haga falta).
- `@playwright/test` para E2E (`playwright.config.ts` + `tests/scenes.spec.ts`, 7 tests).
- Todo respeta `prefers-reduced-motion` — ver `useReducedMotion()` en
  `App.tsx` y el media query global en `index.css`. Cualquier animación
  nueva debe seguir el mismo patrón.

## Qué existe ahora mismo (Fase 2 de MP.md — completa, 14/14 escenas)

`src/App.tsx` + `src/scenes.tsx`: shell de presentación de pantalla
completa, navegación por teclado (`←/→/Space/Home/End`), indicador de
progreso discreto (puntos, sin navbar tradicional — MP.md §30), transición
entre escenas con Framer Motion. **Las 14 escenas de MP.md §12**, texto
literal (no inventado), en este orden en `scenes.tsx`:

1. Portada — "ADITMEX" / "Materias primas que abren posibilidades."
2. El contexto — "Michoacán produce." / "El valor no termina en la cosecha."
3. La oportunidad — cadena materia prima → transformación → producto →
   valor agregado → mercado
4. El problema invisible — "A veces, crecer no requiere una idea nueva. /
   Requiere encontrar la solución correcta."
5. Quién es ADITMEX — "El aliado detrás del ingrediente."
6. Qué hacemos (sistema)
7. El portafolio como soluciones — "No empezamos preguntando qué producto
   quieres comprar. Empezamos preguntando qué necesitas resolver."
8. Del producto actual al siguiente nivel — materia prima → formulación →
   producto estandarizado (ejemplos: fruta → pulpa → bebida; fruta →
   preparación → mermelada)
9. Confianza — "El ADITMEX Standard" (5 pasos: escuchamos, entendemos,
   buscamos, proponemos, damos seguimiento)
10. Servicio — "Así trabajamos."
11. Michoacán — posicionamiento como aliado local para crecer
12. Visión — "Una nueva etapa de crecimiento necesita proveedores que
    piensen contigo."
13. Cierre — "Una buena idea merece algo más que una materia prima. Merece
    respaldo. ADITMEX."
14. Siguiente paso (CTA final) — "Quien conoce lo que necesita para
    avanzar, deja de depender del azar."

Verificado (2026-09-07): `tsc --noEmit` limpio, `npm run build` limpio
(offline, sin fetch externo). Probado en navegador con recorrido completo
de las 14 escenas leyendo el DOM real (`get_page_text`, no solo
screenshot) — contenido único por escena, contador `NN/14` y dots
sincronizados con el estado real, sin errores de consola. Commiteado como
`e0c4183` en `git`. Todo esto ya está hecho — no lo repitas.

## Qué sigue (en orden)

1. ~~Sistema visual completo~~ — **hecho** (`a8bab14`). `SceneBackdrop.tsx`
   define 3 tratamientos (`retrato`: viñeta+partículas doradas · `cadena`:
   línea/nodos SVG · `lista`: guías sutiles + badges numerados · `base`:
   viñeta sola), cada escena de `scenes.tsx` tiene un campo `treatment`
   asignado según su contenido real. Propuesta con antes/después
   presentada como artifact y confirmada por el usuario antes de tocar
   código. Sigue sin imágenes finales — es composición con CSS/SVG/canvas,
   no arte generado.
2. ~~Mock 3D~~ (MP.md §21/§22) — **hecho y verificado visualmente**
   (`91d9eac`). Los 3 momentos de §21 mockeados con CSS/SVG/canvas, sin
   Three.js: partículas organizándose (`aditmex`), cadena apareciendo en
   secuencia (`siguiente-nivel`), red de nodos con pulso (`michoacan`,
   treatment nuevo `red`). `tsc`/`build` limpios. Verificado 2026-09-07 con
   `npm run dev` + extensión Claude-in-Chrome (ya reconectó tras el
   bloqueo de sesiones previas): las 3 escenas cargan con el DOM correcto
   (`get_page_text`), partículas de `aditmex` convergen dentro del radio
   de clúster esperado (`clusterX/Y` de `SceneBackdrop.tsx`), cadena de
   `siguiente-nivel` dibuja línea+5 nodos completos, red de `michoacan`
   muestra 8 nodos/2 hubs con `node-pulse` (CSS infinito, no capturable
   en screenshot estático pero confirmado en código). Consola limpia, sin
   errores. **Nota de proceso**: al navegar con `repeat` de teclas rápido
   (3 `ArrowRight` en una sola llamada), el contador `NN/14` avanzó antes
   que el contenido visible por ~3s — es el mismo comportamiento ya
   documentado en "Gotchas operativos" (`AnimatePresence mode="wait"`
   encola exit/enter por cada paso), no un bug nuevo; se confirmó
   esperando a que el DOM alcanzara el índice mostrado.
3. ~~GATE DE APROBACIÓN HUMANA~~ (MP.md §0.9) — **aprobado 2026-09-07**
   ("apruebo, sigue a Fase 3"). Fase 3 en curso.
4. ~~3D real (React Three Fiber)~~ — **hecho** (`Scene3D.tsx`), verificado
   visualmente. Detalle en `addv/cmem.md` (segmento "3D real Fase 3").
   Resumen técnico:
   - `webgl.ts`: `hasWebGL()` + `REAL_3D_SCENES` (set compartido). Si no
     hay WebGL, `SceneBackdrop.tsx` nunca deja de mostrar su mock 2D — el
     fallback de MP.md §21 sigue intacto.
   - `Scene3D.tsx` (lazy, chunk aparte ~888KB/236KB gzip — no engorda el
     bundle principal de 327KB) trae los 3 momentos: `OrganizingParticles`
     (fibonacci-sphere, converge en 1.4s), `TransformationChain` (5 nodos +
     segmentos que aparecen en secuencia), `ConnectionNetwork` (8 nodos/2
     hubs con pulso, rotación lenta). Paleta: solo navy/gold reales.
   - **El `<Canvas>` vive en `App.tsx`, NO en `SceneBackdrop.tsx`**, montado
     una sola vez (persistente entre las 14 escenas) — bug real encontrado
     y corregido en esta sesión: montarlo por escena (una implementación
     intermedia, ya descartada) recreaba el contexto WebGL en cada
     navegación y lo agotaba en pocos clics (`THREE.WebGLRenderer: Context
     Lost` en consola, verificado). Si tocas el 3D, **no vuelvas a mover el
     `<Canvas>` dentro de `SceneBackdrop`** — `frameloop` se controla vía
     prop `active` (`'always'` solo en las 3 escenas, `'demand'` el resto).
   - Verificado: 5 ciclos de navegación real (5→11→8→5→11→8→5→11→…) sin un
     solo "Context Lost" ni error en consola tras el fix.
5. ~~Imágenes finales (`Docs/images_prompt.md`)~~ — **hecho y verificado**
   (2026-09-07 recepción/corrección PNG→WebP, 2026-09-08 integración +
   optimización 1280/q72 + preload). 11/14 escenas con foto (mapeo por
   afinidad, no orden de `images_prompt.md`), 3 con 3D sin foto. Bug
   7s/frozen resuelto: resize 1672→1280, `SceneBackdrop` eager+decoding async,
   `App.tsx` preload `new Image()`. **Verificado con Playwright**
   (`tests/scenes.spec.ts`): navegación 14/14 con clicks reales en dots
   (<3s por salto), 13 imágenes con `naturalWidth>0`, sin `Context Lost`
   en 5 ciclos. **Requiere headed + serial** (`playwright.config.ts`) —
   ver recuadro de auditoría, headless/paralelo da falsos positivos de
   "renderer frozen" que no son bugs reales.
6. ~~QA (MP.md §39 Fase 4)~~ — **cubierto con Playwright**: 7 tests E2E
   (ver `playwright.config.ts` + `tests/scenes.spec.ts`). Ejecutar con
   `npm run test:e2e`. Para CI, el workflow de Pages puede agregar un job
   `test` antes de `build`.
7. Tauri 2 (`.exe`/`.msi`) real sigue sin compilarse — Rust está instalado
   (`~/.cargo/bin`, no en PATH) pero **falta el linker de MSVC**
   (`link.exe`, Visual Studio Build Tools). Instalar eso es un cambio de
   sistema pesado (varios GB, probable admin) — pedir confirmación
   explícita antes de intentarlo. Para hoy, el usuario ya decidió el
   fallback pragmático (acceso directo `.lnk` en modo app, ver recuadro
   de auditoría) en vez de esto.

## Git / remotes

El repo raíz (`adtmex_ventas`, un directorio arriba de `/app`) tiene **un
solo remote autorizado**: `origin` → `https://github.com/addv-prototipos/aditmex-CAM.git`.
Todo el trabajo de este proyecto (raíz + `/app`) vive ahí.

Existió un segundo remote, `origin-ventas` (`aditmex-ventas.git`, de otro
propietario/proyecto) — se usó por error una vez para pushear un commit de
`/app`, se revirtió (force-push de vuelta a su estado previo) y el remote
se **eliminó** del repo local a pedido explícito del usuario. No lo vuelvas
a agregar ni a pushear ahí salvo instrucción nueva y explícita del usuario.
Antes de cualquier `git push`, corre `git remote -v` y confirma que el
único remote es `aditmex-CAM.git`.

## Gotchas operativos (aprendidos en esta sesión, evita repetirlos)

- **No uses `taskkill /F /IM node.exe`** (ni equivalentes que matan por
  nombre de proceso) para detener el servidor de `vite`. Mata *todos* los
  procesos `node.exe` de la máquina, incluyendo cosas que no tienen nada
  que ver con este proyecto (en esta sesión tumbó también la conexión MCP
  de Ruflo). Detén el proceso por PID específico, o con `Ctrl+C` en la
  terminal donde corre.
- **Verificación visual en navegador**: si acabas de cambiar código y algo
  se ve "congelado" o inconsistente en un screenshot, antes de asumir que
  es un bug del código, descarta: (1) bundle cacheado en la pestaña —
  recarga con `ctrl+shift+r`; (2) si mandaste varias teclas rápido, la
  transición de `AnimatePresence mode="wait"` en `App.tsx` (700ms) puede
  hacer que el contenido visual vaya un paso detrás del índice por un
  instante — es esperado, no un bug, espera ~1s entre pasos al probar
  navegación por teclado.
- Lee el DOM real (texto/atributos) para verificar estado, no solo
  screenshots — un JPEG comprimido o un frame a mitad de animación puede
  hacer parecer un bug algo que no lo es.
- **`navigate()` (Claude-in-Chrome) al mismo URL exacto no garantiza una
  recarga real de JS** — si necesitas un estado 100% limpio para probar
  algo (ej. confirmar si un `useState` arranca en su valor inicial),
  agrega un query string distinto cada vez (`?t=<timestamp>`) o usa una
  pestaña nueva. En esta sesión, reusar la misma URL dejó `index`/`needs3D`
  de React con el valor de la navegación anterior, generando falsos
  positivos de "la escena no cambia" que en realidad eran estado viejo.
- Si un script de verificación (`javascript_tool`) tarda mucho o Chrome
  responde `"renderer may be frozen or unresponsive"`, no asumas todavía
  que es un bug de la app — reproduce lo mismo con un click real
  (`computer` tool) antes de perseguir el bug en el código; el propio
  mecanismo de disparar el evento por script puede comportarse distinto
  a una interacción real del usuario.

## Comandos

```bash
npm install
npm run dev        # http://localhost:5173 (o el puerto libre siguiente)
npm run build      # tsc -b && vite build -> dist/
npm run preview    # sirve dist/ para probar el build de producción
npm run test:e2e   # Playwright 7 tests (chromium, webServer vite auto)
```

Tauri aún no está configurado (llega en la fase posterior al gate). Cuando
se agregue: `npm run tauri:dev`, `npm run tauri:build` — documentar aquí en
cuanto exista.

## Reglas de lenguaje (MP.md §0.14, aplican a TODO el copy nuevo)

Evitar: "somos los mejores", "líderes", "nadie hace esto", "garantizamos",
"revolucionamos". Preferir: "acompañamos", "ayudamos a identificar",
"buscamos alternativas", "trabajamos para resolver". Público ejecutivo, una
idea por pantalla, sin párrafos largos.
