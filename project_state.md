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

- **Docker**: el protocolo exige "Docker siempre" pero el sitio no tiene contenedorización todavía. No implementado — pendiente de que el usuario confirme si quiere levantarlo (nginx sirviendo estático sería la opción más simple).
- **Paleta de colores no verificada**: los tokens CSS en `index.html` son una estimación de marca, no los HEX oficiales de ADITMEX. Marcado explícitamente en el propio código (`index.html` líneas ~16-25).
- **Pruebas**: no hay pruebas unitarias ni funcionales todavía. Para un sitio estático sin lógica de negocio compleja, el piso mínimo razonable sería smoke test (build/lint HTML, verificación de enlaces/imágenes rotos, chequeo de accesibilidad) — no implementado, pendiente de definir alcance con el usuario.
- **Duplicidad de PDFs**: `DOC-20260907-WA0048.pdf` y `Guia_Estudio_ADITMEX_Consejo_Agroalimentario_Michoacan-1.pdf` están sueltos en la raíz del repo (sin trackear) y parecen duplicar contenido que ya vive en `Docs/`. No se ha tocado — pendiente de confirmar con el usuario si se limpian/mueven.
- **`.idea/`** sin trackear — carpeta de configuración de IDE (JetBrains). No se ha decidido si debe ir a `.gitignore` o si el usuario la quiere trackeada.
- Sin `.gitignore` en el repo.

## Decisiones ya tomadas

- El registro de conversación comprimido del proyecto vive en `addv/cmem.md`, no en la raíz (regla del protocolo).
- `CLAUDE.md`, este `project_state.md` y `README.md` se quedan en la raíz (auto-carga de Claude Code y renderizado de README en la plataforma git).

## Decisiones pendientes de confirmar con el usuario

- Si se conteneriza el sitio con Docker/Docker Compose y con qué setup (nginx estático es la opción por defecto sugerida).
- Qué hacer con los dos PDFs sueltos en la raíz.
- Si `Docs/` debe trackearse en git o quedarse fuera (actualmente sin trackear).
- Alcance de pruebas para un sitio 100% estático.
