# ADITMEX · Presentación de ventas

Sitio estático de una sola página con la presentación comercial de ADITMEX (materias primas, aditivos e ingredientes para industria alimentaria) para la reunión con el Consejo Agroalimentario de Michoacán.

## Requisitos previos

- Un navegador moderno (no requiere Node, Python ni ninguna dependencia para verlo).
- Para servirlo localmente como lo haría un servidor real: cualquier herramienta capaz de servir archivos estáticos (Python, Docker, `npx serve`, etc.).

No hay variables de entorno ni secretos que configurar — el sitio no tiene backend.

## Ejecutar en local (sin Docker)

Abrir `index.html` directamente en el navegador es suficiente para revisión rápida:

```bash
# Windows
start index.html
```

## Ejecutar en local (Docker)

> Pendiente: este proyecto todavía no incluye `Dockerfile` ni `docker-compose.yml` (ver `project_state.md`). Cuando se implemente, esta sección se actualizará con los comandos exactos (`docker compose up`) y la URL/healthcheck para verificar que quedó arriba. Mientras tanto, usar la opción sin Docker de arriba.

## Estructura

```
index.html              # sitio completo: HTML + CSS + JS inline
assets/images/
  backgrounds/
  hero/
  products/
  segments/
Docs/                    # material de negocio de referencia (no se despliega)
```

## Documentación del proyecto

- `CLAUDE.md` — contexto operativo para trabajar en este repo con Claude Code.
- `project_state.md` — qué existe, qué falta, decisiones pendientes.
- `addv/cmem.md` — historial comprimido de decisiones tomadas sesión a sesión.
