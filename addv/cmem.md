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
