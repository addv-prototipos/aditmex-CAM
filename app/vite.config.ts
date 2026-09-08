import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // base relativa: el build final se sirve como archivo local dentro de
  // Tauri (file://), no desde la raíz de un dominio — ver AGENTS.md.
  base: './',
  plugins: [react(), tailwindcss()],
})
