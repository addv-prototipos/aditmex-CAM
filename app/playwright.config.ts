import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // serial a propósito: con headed + WebGL real, correr los 7 tests en
  // paralelo (varios Chrome simultáneos peleando por el mismo GPU) hace
  // fallar específicamente el test 3D por contención, no por un bug real
  // (confirmado 2026-09-08 — mismo test aislado pasa limpio, en paralelo
  // con el resto falla). Con 7 tests el costo de ir serial es mínimo.
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      // headed a propósito: esta app usa WebGL real (React Three Fiber,
      // 3 escenas). El Chromium headless por defecto renderiza WebGL por
      // software (SwiftShader), mucho más lento que un Chrome real con
      // GPU — reproduce un "cuelgue" (renderer sin responder >30s
      // navegando rápido entre las 3 escenas 3D) que NO ocurre en headed
      // ni en el Chrome real del presentador (confirmado 2026-09-08:
      // mismo test, mismo repro, falla en headless, pasa limpio en
      // headed en 26.5s). No cambiar a headless sin volver a verificar.
      use: { ...devices['Desktop Chrome'], headless: false },
    },
  ],
  webServer: {
    command: 'npm run dev -- --port 5173 --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
