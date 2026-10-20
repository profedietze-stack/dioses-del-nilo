import { test, expect, type Page } from '@playwright/test'

/* H14. Dos reglas que ningún test de reglas del juego ve:
   - en pantalla táctil, todo lo que se toca mide al menos 44 px (WCAG 2.5.5 / guía de Apple);
   - con teclado, el elemento enfocado se ve (WCAG 2.4.7). */

const MIN = 44

async function chicos(page: Page) {
  return page.evaluate((min) => {
    const out: string[] = []
    const sel = 'button, a[href], [role=button], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    for (const el of document.querySelectorAll<HTMLElement>(sel)) {
      const s = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0 || s.visibility === 'hidden' || s.display === 'none') continue
      if (r.width < min - 0.5 || r.height < min - 0.5) {
        out.push(`${(el.className || el.tagName).toString().slice(0, 30)} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent ?? '').trim().slice(0, 18)}"`)
      }
    }
    return out
  }, MIN)
}

async function aElegirDios(page: Page) {
  await page.goto('/')
  await page.getByRole('button', { name: /Nueva Partida/ }).click()
  await page.getByPlaceholder('Escribe tu nombre...').fill('Test')
  await page.getByRole('button', { name: /Comenzar mi Reinado/ }).click()
  await page.getByRole('button', { name: /Saltar intro/ }).click()
}

test.describe('táctil: targets de 44 px', () => {
  test.skip(({ isMobile }) => !isMobile, 'solo en el proyecto móvil')

  test('nombre, dioses y juego', async ({ page }) => {
    test.setTimeout(60_000)
    await page.goto('/')
    await page.getByRole('button', { name: /Nueva Partida/ }).click()
    expect(await chicos(page), 'pantalla de nombre').toEqual([])
    await page.getByPlaceholder('Escribe tu nombre...').fill('Test')
    await page.getByRole('button', { name: /Comenzar mi Reinado/ }).click()
    await page.getByRole('button', { name: /Saltar intro/ }).click()
    await page.getByRole('button', { name: /Encarnar/ }).waitFor()
    expect(await chicos(page), 'elegir dios').toEqual([])
    await page.waitForTimeout(1200)
    await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Encarnar/.test(b.textContent ?? ''))!.click())
    await page.locator('.stat-row--clickable').first().waitFor()
    await page.waitForTimeout(1200)
    expect(await chicos(page), 'pantalla de juego').toEqual([])
  })
})

test.describe('teclado: el foco se ve', () => {
  test.skip(({ isMobile }) => isMobile, 'el foco por teclado es de escritorio')

  test('botones, filas de estadística y consejeros muestran un contorno', async ({ page }) => {
    test.setTimeout(60_000)
    await aElegirDios(page)
    await page.getByRole('button', { name: /Encarnar/ }).waitFor()
    await page.waitForTimeout(1200)
    await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Encarnar/.test(b.textContent ?? ''))!.click())
    await page.locator('.stat-row--clickable').first().waitFor()
    await page.waitForTimeout(1200)

    const sinAnillo: string[] = []
    // Recorre con Tab los primeros 30 elementos enfocables y mira el contorno real.
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab')
      const r = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null
        if (!el || el === document.body) return null
        const s = getComputedStyle(el)
        const visible = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2
        const sombra = s.boxShadow !== 'none'
        return { visible: visible || sombra, nombre: `${(el.className || el.tagName).toString().slice(0, 30)} "${(el.textContent ?? '').trim().slice(0, 18)}"` }
      })
      if (r && !r.visible) sinAnillo.push(r.nombre)
    }
    expect(sinAnillo).toEqual([])
  })
})
