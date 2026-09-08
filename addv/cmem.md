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
