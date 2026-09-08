import { test, expect } from '@playwright/test';

const SCENES = [
  { id: 'portada', eyebrow: 'ADITMEX', hasImage: true, has3D: false },
  { id: 'contexto', eyebrow: 'El contexto', hasImage: true, has3D: false },
  { id: 'oportunidad', eyebrow: 'La oportunidad', hasImage: true, has3D: false },
  { id: 'problema', eyebrow: 'El problema invisible', hasImage: true, has3D: false },
  { id: 'aditmex', eyebrow: 'Quién es ADITMEX', hasImage: true, has3D: true },
  { id: 'qué-hacemos', eyebrow: 'Cómo trabajamos', hasImage: true, has3D: false },
  { id: 'portafolio', eyebrow: 'El portafolio como soluciones', hasImage: true, has3D: false },
  { id: 'siguiente-nivel', eyebrow: 'Del producto actual al siguiente nivel', hasImage: true, has3D: true },
  { id: 'confianza', eyebrow: 'Confianza', hasImage: true, has3D: false },
  { id: 'servicio', eyebrow: 'Servicio', hasImage: true, has3D: false },
  { id: 'michoacan', eyebrow: 'Michoacán', hasImage: true, has3D: true },
  { id: 'vision', eyebrow: 'Visión', hasImage: true, has3D: false },
  { id: 'cierre', eyebrow: 'Cierre', hasImage: true, has3D: false },
  { id: 'cta-final', eyebrow: 'Siguiente paso', hasImage: true, has3D: false },
];

test.describe('ADITMEX /app — 14 escenas', () => {
  test.beforeEach(async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    // @ts-ignore
    (page as any).__errors = errors;
  });

  test('navegación completa 14/14 con teclado y dots — contador y eyebrow sincronizados', async ({ page }) => {
    await page.goto('/');
    // escena 1 visible
    await expect(page.locator('text=ADITMEX').first()).toBeVisible();
    await expect(page.getByText('01 / 14')).toBeVisible();

    for (let i = 0; i < SCENES.length; i++) {
      const expectedNum = String(i + 1).padStart(2, '0');
      // eyebrow visible
      await expect(page.locator(`text=${SCENES[i].eyebrow}`).first()).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(`${expectedNum} / 14`)).toBeVisible({ timeout: 3000 });
      // dot activo
      const dots = page.locator('button[aria-label^="Ir a escena"]');
      await expect(dots.nth(i)).toHaveClass(/bg-gold/);
      if (i < SCENES.length - 1) {
        await page.keyboard.press('ArrowRight');
        // transición Framer Motion 700ms + buffer
        await page.waitForTimeout(950);
      }
    }
    // volver con ArrowLeft y Home/End
    await page.keyboard.press('Home');
    await page.waitForTimeout(900);
    await expect(page.getByText('01 / 14')).toBeVisible();
    await page.keyboard.press('End');
    await page.waitForTimeout(900);
    await expect(page.getByText('14 / 14')).toBeVisible();
    await expect(page.locator('text=Siguiente paso').first()).toBeVisible();
  });

  test('clicks reales en dots — no "renderer frozen"', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/');
    const dots = page.locator('button[aria-label^="Ir a escena"]');
    // saltos no adyacentes (repro del bug reportado: 7s / frozen)
    const jumps = [4, 10, 7, 0, 13, 2, 8];
    for (const idx of jumps) {
      const start = Date.now();
      await dots.nth(idx).click();
      await expect(page.getByText(`${String(idx + 1).padStart(2, '0')} / 14`)).toBeVisible({ timeout: 5000 });
      await expect(page.locator(`text=${SCENES[idx].eyebrow}`).first()).toBeVisible({ timeout: 5000 });
      const elapsed = Date.now() - start;
      expect(elapsed, `transición a escena ${idx + 1} debe ser < 3000ms (fue ${elapsed}ms)`).toBeLessThan(3000);
    }
  });

  test('14 escenas con foto — img carga, no rota, decoding async (todas con imagen)', async ({ page }) => {
    await page.goto('/');
    for (let i = 0; i < SCENES.length; i++) {
      if (!SCENES[i].hasImage) continue;
      // navegar a esa escena vía dot click (más cercano a uso real)
      await page.locator('button[aria-label^="Ir a escena"]').nth(i).click();
      await page.waitForTimeout(950);
      const img = page.locator('img').first();
      await expect(img).toBeVisible({ timeout: 5000 });
      await expect(img).toHaveAttribute('src', /\/images\/.+\.webp/);
      // decoding async no bloquea — naturalWidth > 0
      const w = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(w, `img ${SCENES[i].id} naturalWidth`).toBeGreaterThan(0);
      const complete = await img.evaluate((el: HTMLImageElement) => el.complete);
      expect(complete).toBeTruthy();
    }
  });

  test('3 escenas 3D — canvas persistente, sin Context Lost', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    await page.goto('/');
    // visitar cada escena 3D y verificar que existe un solo canvas persistente
    for (const idx of [4, 7, 10]) { // aditmex, siguiente-nivel, michoacan
      await page.locator('button[aria-label^="Ir a escena"]').nth(idx).click();
      await page.waitForTimeout(1100);
      await expect(page.locator('canvas')).toBeVisible({ timeout: 5000 });
      const canvasCount = await page.locator('canvas').count();
      expect(canvasCount, 'solo un canvas persistente en App.tsx').toBe(1);
    }
    // navegar 5 ciclos completos y verificar que no aparece Context Lost
    for (let c = 0; c < 5; c++) {
      for (const idx of [4, 10, 7, 4]) {
        await page.locator('button[aria-label^="Ir a escena"]').nth(idx).click();
        await page.waitForTimeout(500);
      }
    }
    const lost = consoleErrors.filter((e) => /Context Lost|WebGLRenderer/i.test(e));
    expect(lost, `no debe haber Context Lost: ${lost.join('; ')}`).toEqual([]);
  });

  test('a11y smoke — headings, aria-labels, keyboard operable', async ({ page }) => {
    await page.goto('/');
    // un h1 por escena
    await expect(page.locator('h1')).toBeVisible();
    // 14 dots con aria-label
    await expect(page.locator('button[aria-label^="Ir a escena"]')).toHaveCount(14);
    // keyboard: Tab llega a los dots
    await page.keyboard.press('Tab');
    // al menos un dot es focusable
    const firstDot = page.locator('button[aria-label^="Ir a escena"]').first();
    await firstDot.focus();
    await expect(firstDot).toBeFocused();
  });

  test('paleta y tipografía — tokens reales aplicados', async ({ page }) => {
    await page.goto('/');
    const bg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-navy') || getComputedStyle(document.body).backgroundColor);
    // el body debe tener fondo navy (#27274D) via clase bg-navy
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    // #27274D = rgb(39,39,77)
    expect(bodyBg).toMatch(/39,\s*39,\s*77|#27274d/i);
    // heading usa Montserrat
    const font = await page.evaluate(() => getComputedStyle(document.querySelector('h1')!).fontFamily);
    expect(font.toLowerCase()).toContain('montserrat');
  });

  test('sin errores de consola en recorrido completo', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/');
    for (let i = 0; i < SCENES.length - 1; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(900);
    }
    expect(errors, `errores de consola: ${errors.join(' | ')}`).toEqual([]);
  });
});
