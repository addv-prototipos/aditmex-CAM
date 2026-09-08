# Build: compila el sitio estático (Vite) — sin Tauri, sin Rust, solo el
# frontend web. Ver AGENTS.md si hace falta el empaquetado nativo (Tauri
# real sigue sin compilarse, requiere linker MSVC fuera de este contenedor).
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve: nginx sirviendo el build estático, sin backend, sin estado.
FROM nginx:1.27-alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
