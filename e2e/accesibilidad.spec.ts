import { test, expect, type Page } from '@playwright/test'
import { buildGameEvents } from '../src/data/eventPools'
import { PUZZLES_DEF } from '../src/data/puzzles'

/* H14. Dos reglas que ningún test de reglas del juego ve:
   - en pantalla táctil, todo lo que se toca mide al menos 44 px (WCAG 2.5.5 / guía de Apple);
   - con teclado, el elemento enfocado se ve (WCAG 2.4.7). */

const MIN = 44

async function chicos(page: Page) {
  return page.evaluate((min) => {
    const out: string[] = []
    const sel = 'button, a[href], [role=button], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    // Ademas de los controles declarados: lo que el cursor marca como clickeable (un div con
    // onClick no es un button) y lo que se puede arrastrar. Solo el elemento externo de cada uno.
    const cand = new Set<HTMLElement>(document.querySelectorAll<HTMLElement>(sel))
    for (const el of document.querySelectorAll<HTMLElement>('body *')) {
      const pointer = (e: HTMLElement | null) => !!e && getComputedStyle(e).cursor === 'pointer'
      if ((pointer(el) && !pointer(el.parentElement)) || el.draggable) cand.add(el)
    }
    for (const el of cand) {
      const s = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0 || s.visibility === 'hidden' || s.display === 'none') continue
      // Excepcion de WCAG 2.5.5: un enlace dentro de un parrafo (las palabras del glosario) no se agranda.
      if (s.display === 'inline') continue
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
    await page.locator('.intro-nav').waitFor({ state: 'detached' })  // la salida animada del intro
    expect(await chicos(page), 'elegir dios').toEqual([])
    await page.waitForTimeout(1200)
    await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Encarnar/.test(b.textContent ?? ''))!.click())
    await page.locator('.stat-row--clickable').first().waitFor()
    await page.waitForTimeout(1200)
    expect(await chicos(page), 'pantalla de juego').toEqual([])
  })
})

/* Partida guardada a mano para llegar a cualquier pantalla sin jugar hasta ahi. */
async function entrarEn(page: Page, evIdx: number, hechos: number[] | 'todos') {
  const eventIds = buildGameEvents(8, 'ra').map(e => e.id)
  const puzDone = hechos === 'todos' ? PUZZLES_DEF.map(p => p.id) : hechos
  const save = {
    godId: 'ra', playerName: 'Test', stats: { estabilidad: 50, riqueza: 50, cultura: 50, influencia: 50, fe: 50, comercio: 50 },
    evIdx, eventIds, history: [], achievements: [], puzDone, puzOk: 0, puzFail: 0, gs: {}, t: Date.now(), v: 3,
  }
  await page.addInitScript(s => localStorage.setItem('diosesNilo_v3', JSON.stringify(s)), save)
  await page.goto('/')
  await page.getByRole('button', { name: /Continuar Partida/ }).click()
}
const todosMenos = (id: number) => PUZZLES_DEF.filter(p => p.id !== id).map(p => p.id)
const asentar = (page: Page) => page.waitForTimeout(1200)

test.describe('táctil: puzzles, modales y final', () => {
  test.skip(({ isMobile }) => !isMobile, 'solo en el proyecto móvil')

  const puzzles: [string, number, number, string][] = [
    ['ordenar palabras', 1, 3, '.word-bank'],
    ['glifos', 2, 6, '.glyph-grid'],
    ['balanza de Maat', 10, 16, '.maat-hand-cards'],
    ['línea de faraones', 12, 7, '.pht-pool'],
  ]
  for (const [nombre, id, despuesDe, selector] of puzzles) {
    test(`puzzle ${nombre}`, async ({ page }) => {
      test.setTimeout(60_000)
      await entrarEn(page, despuesDe, todosMenos(id))
      await page.locator(selector).first().waitFor({ timeout: 15_000 })
      await asentar(page)
      expect(await chicos(page), `puzzle ${nombre}`).toEqual([])
    })
  }

  test('modales de la partida: estadística, menú y consejeros', async ({ page }) => {
    test.setTimeout(60_000)
    await page.setViewportSize({ width: 390, height: 844 })  // telefono
    await entrarEn(page, 0, 'todos')
    await page.locator('.stat-row--clickable').first().waitFor()
    await asentar(page)
    // En telefono Papiros, Menu y Musica estaban ocultos con display: none.
    for (const nombre of [/Papiros/, /Menú/, /Silenciar|Activar música/]) {
      await expect(page.getByRole('button', { name: nombre }).first(), String(nombre)).toBeVisible()
    }
    await page.locator('.stat-row--clickable').first().click()
    await asentar(page)
    expect(await chicos(page), 'modal de estadística').toEqual([])
    await page.locator('.si-btn').click()
    await page.locator('.si-overlay').waitFor({ state: 'detached' })

    await page.getByRole('button', { name: /Menú/ }).first().click()
    await page.locator('.delete-modal').waitFor()
    await asentar(page)
    expect(await chicos(page), 'modal de confirmar menú').toEqual([])
    await page.locator('.delete-modal-btns .btn-o').click()
    await page.locator('.delete-modal-overlay').waitFor({ state: 'detached' })

    await page.locator('.opt').first().click()
    await page.locator('.cmod').waitFor()
    await asentar(page)
    expect(await chicos(page), 'modal de consejeros').toEqual([])

    // La tarjeta de «lo que pasó en realidad» vive en este modal, no en la pantalla de decisión
    // (donde sumaba ~47 palabras y a veces contaba el desenlace antes de elegir).
    await expect(page.locator('.cmod .tl-card')).toBeVisible()
    expect(await page.locator('.event-panel .tl-card').count()).toBe(0)
    // Con la tarjeta el modal es más alto: tiene que entrar en el telefono y, si la pantalla es
    // más baja (horizontal), desplazarse en vez de cortarse. (En este contexto no se puede
    // redimensionar la ventana tras pedir pantalla completa, así que se mira el CSS.)
    const r = await page.locator('.cmod').evaluate(el => {
      const b = el.getBoundingClientRect(), c = getComputedStyle(el)
      return { top: b.top, bottom: b.bottom, alto: innerHeight, overflowY: c.overflowY, tope: parseFloat(c.maxHeight) }
    })
    expect(r.top, 'modal arriba').toBeGreaterThanOrEqual(0)
    expect(r.bottom, 'modal abajo').toBeLessThanOrEqual(r.alto)
    expect(r.overflowY).toBe('auto')
    expect(r.tope, 'tope de alto').toBeLessThanOrEqual(r.alto - 32)
    await expect(page.locator('.cmod .btn-g'), 'Continuar visible').toBeInViewport()
  })

  test('menú, info didáctica y papiros', async ({ page }) => {
    test.setTimeout(60_000)
    await page.goto('/')
    await page.getByRole('button', { name: /Info Didáctica/ }).waitFor({ timeout: 15_000 })
    await asentar(page)
    expect(await chicos(page), 'menú').toEqual([])
    await page.getByRole('button', { name: /Info Didáctica/ }).click()
    await asentar(page)
    expect(await chicos(page), 'info didáctica').toEqual([])
    await page.keyboard.press('Escape')
    await page.evaluate(() => (document.querySelector('.modal-overlay, .im-overlay, [class*="overlay"]') as HTMLElement | null)?.click())
    await asentar(page)
    await page.getByRole('button', { name: /Papiros/ }).click()
    await asentar(page)
    expect(await chicos(page), 'papiros').toEqual([])
  })

  test('pantalla final', async ({ page }) => {
    test.setTimeout(60_000)
    await entrarEn(page, 32, 'todos')
    await page.locator('.end').waitFor({ timeout: 15_000 })
    await asentar(page)
    expect(await chicos(page), 'pantalla final').toEqual([])
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
