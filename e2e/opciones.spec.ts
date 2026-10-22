import { test, expect, type Page } from '@playwright/test'
import { buildGameEvents } from '../src/data/eventPools'
import { PUZZLES_DEF } from '../src/data/puzzles'

/* Menú de opciones dentro de la partida: se abre desde el encabezado, cambia el aspecto, la letra y
   el sonido, se recuerda al recargar y no rompe el juego si lo guardado está dañado. */

const CLAVE = 'diosesNilo_ajustes'

/* Partida guardada a mano para llegar al juego sin jugar hasta ahí. `extra` se escribe antes de cargar. */
async function aLaPartida(page: Page, ajustes?: unknown) {
  const eventIds = buildGameEvents(8, 'ra').map(e => e.id)
  const save = {
    godId: 'ra', playerName: 'Test', stats: { estabilidad: 50, riqueza: 50, cultura: 50, influencia: 50, fe: 50, comercio: 50 },
    evIdx: 1, eventIds, history: [], achievements: [], puzDone: PUZZLES_DEF.map(p => p.id), puzOk: 0, puzFail: 0, gs: {}, t: Date.now(), v: 3,
  }
  await page.addInitScript(([s, a, k]) => {
    localStorage.setItem('diosesNilo_v3', JSON.stringify(s))
    // Solo la primera carga: así lo que el test cambia sobrevive a un reload.
    if (a !== null && !sessionStorage.getItem('sembrado')) {
      localStorage.setItem(k as string, typeof a === 'string' ? a : JSON.stringify(a))
      sessionStorage.setItem('sembrado', '1')
    }
  }, [save, ajustes ?? null, CLAVE] as const)
  await page.goto('/')
  await page.getByRole('button', { name: /Continuar Partida/ }).click()
  await page.locator('.game-hd').getByRole('button', { name: 'Opciones' }).waitFor()
}

const abrir = async (page: Page) => {
  await page.locator('.game-hd').getByRole('button', { name: 'Opciones' }).click()
  await expect(page.getByRole('dialog', { name: 'Opciones' })).toBeVisible()
}
const guardado = (page: Page) => page.evaluate(k => JSON.parse(localStorage.getItem(k) ?? 'null'), CLAVE)
const html = (page: Page) => page.evaluate(() => ({
  tema: document.documentElement.dataset.tema,
  fuente: document.documentElement.dataset.fuente,
  base: parseFloat(getComputedStyle(document.documentElement).fontSize),
}))

test('se abre desde el encabezado y se cierra con Escape, devolviendo el foco', async ({ page }) => {
  await aLaPartida(page)
  const boton = page.locator('.game-hd').getByRole('button', { name: 'Opciones' })
  await boton.click()
  const dlg = page.getByRole('dialog', { name: 'Opciones' })
  await expect(dlg).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dlg).toBeHidden()
  await expect(boton).toBeFocused()
})

test('tema, letra y tipo de letra cambian el documento y se recuerdan al recargar', async ({ page }) => {
  await aLaPartida(page)
  expect(await html(page)).toMatchObject({ tema: 'clasico', fuente: 'clasica', base: 18 })
  await abrir(page)
  await page.getByRole('radio', { name: /Alto contraste/ }).click()
  await page.getByRole('radio', { name: 'Enorme' }).click()
  await page.getByRole('radio', { name: 'Fácil de leer' }).click()
  const despues = await html(page)
  expect(despues.tema).toBe('contraste')
  expect(despues.fuente).toBe('legible')
  expect(despues.base).toBeCloseTo(23.4, 1)
  expect(await guardado(page)).toMatchObject({ tema: 'contraste', tamano: 'enorme', fuente: 'legible' })

  await page.reload()
  await page.getByRole('button', { name: /Continuar Partida/ }).click()
  await page.locator('.game-hd').getByRole('button', { name: 'Opciones' }).waitFor()
  expect(await html(page)).toMatchObject({ tema: 'contraste', fuente: 'legible' })
  await abrir(page)
  await expect(page.getByRole('radio', { name: 'Enorme' })).toHaveAttribute('aria-checked', 'true')
})

test('ocultar la imagen de cada evento la saca de la pantalla', async ({ page }) => {
  await aLaPartida(page)
  await expect(page.locator('.ev-cat-img')).toHaveCount(1)
  await abrir(page)
  await page.getByRole('switch', { name: /imagen de cada evento/ }).click()
  await page.keyboard.press('Escape')
  await expect(page.locator('.ev-cat-img')).toHaveCount(0)
})

test('la música se apaga desde Opciones y el botón del encabezado lo refleja; los volúmenes se deshabilitan', async ({ page }) => {
  await aLaPartida(page)
  await expect(page.getByRole('button', { name: 'Silenciar música' })).toBeVisible()
  await abrir(page)
  const vol = page.getByRole('slider', { name: 'Volumen de la música' })
  await expect(vol).toBeEnabled()
  await page.getByRole('switch', { name: 'Música' }).click()
  await expect(vol).toBeDisabled()
  await page.getByRole('switch', { name: 'Efectos de sonido' }).click()
  await expect(page.getByRole('slider', { name: 'Volumen de los efectos' })).toBeDisabled()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Activar música' })).toBeVisible()
  expect(await guardado(page)).toMatchObject({ musica: false, efectos: false })
})

test('un volumen se guarda y "Restablecer todo" vuelve a los valores de fábrica', async ({ page }) => {
  await aLaPartida(page)
  await abrir(page)
  await page.getByRole('slider', { name: 'Volumen de la música' }).fill('25')
  expect(await guardado(page)).toMatchObject({ volMusica: 0.25 })
  await page.getByRole('radio', { name: 'Claro' }).click()
  await page.getByRole('button', { name: 'Restablecer todo' }).click()
  expect(await guardado(page)).toMatchObject({ tema: 'clasico', tamano: 'normal', volMusica: 0.8, musica: true })
})

test('un guardado dañado o con tipos cambiados no rompe el juego', async ({ page }) => {
  const errores: string[] = []
  page.on('pageerror', e => errores.push(e.message))
  await aLaPartida(page, '{esto no es json')
  expect(await html(page)).toMatchObject({ tema: 'clasico', base: 18 })
  await page.evaluate(k => localStorage.setItem(k, JSON.stringify({ tema: 5, tamano: 'gigante', volMusica: 'alto', musica: 'si', imagenes: false })), CLAVE)
  await page.reload()
  await page.getByRole('button', { name: /Continuar Partida/ }).click()
  await page.locator('.game-hd').getByRole('button', { name: 'Opciones' }).waitFor()
  expect(await html(page)).toMatchObject({ tema: 'clasico', base: 18 })
  await expect(page.locator('.ev-cat-img')).toHaveCount(0)   // el único campo válido sí se respeta
  expect(errores).toEqual([])
})

test('desde el menú principal: se abre, cambia el aspecto y se recuerda al empezar la partida', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Opciones/ }).click()
  const dlg = page.getByRole('dialog', { name: 'Opciones' })
  await expect(dlg).toBeVisible()
  await page.getByRole('radio', { name: 'Grande' }).click()
  await page.getByRole('radio', { name: /Alto contraste/ }).click()
  await page.getByRole('switch', { name: 'Música' }).click()
  await page.keyboard.press('Escape')
  await expect(dlg).toBeHidden()
  expect(await html(page)).toMatchObject({ tema: 'contraste', base: 20.7 })
  expect(await guardado(page)).toMatchObject({ tamano: 'grande', tema: 'contraste', musica: false })
  // Lo elegido en el menú rige en la partida: con la música apagada el botón del encabezado ofrece activarla.
  await page.getByRole('button', { name: /Nueva Partida/ }).click()
  await page.getByPlaceholder('Escribe tu nombre...').fill('Test')
  await page.getByRole('button', { name: /Comenzar mi Reinado/ }).click()
  await page.getByRole('button', { name: /Saltar intro/ }).click()
  await page.getByRole('button', { name: /Encarnar/ }).waitFor()
  await page.waitForTimeout(1200)
  await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Encarnar/.test(b.textContent ?? ''))!.click())
  await expect(page.getByRole('button', { name: 'Activar música' })).toBeVisible()
  expect(await html(page)).toMatchObject({ tema: 'contraste', base: 20.7 })
})

test.describe('en teléfono', () => {
  test.skip(({ isMobile }) => !isMobile, 'solo en el proyecto móvil')

  for (const [ancho, alto] of [[390, 844], [360, 740]] as const) {
    test(`con la letra enorme el menú principal sigue usable en ${ancho}x${alto}`, async ({ page }) => {
      await page.setViewportSize({ width: ancho, height: alto })
      await page.addInitScript(k => localStorage.setItem(k, JSON.stringify({ tamano: 'enorme' })), CLAVE)
      await page.goto('/')
      const boton = page.getByRole('button', { name: /Opciones/ })
      await boton.scrollIntoViewIfNeeded()
      const r = await boton.boundingBox()
      expect(r!.height).toBeGreaterThanOrEqual(43.5)
      expect(r!.x).toBeGreaterThanOrEqual(0)
      expect(r!.x + r!.width).toBeLessThanOrEqual(ancho)
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0)
      await boton.click()
      await expect(page.getByRole('dialog', { name: 'Opciones' })).toBeVisible()
    })

    test(`con la letra enorme el encabezado y el menú caben en ${ancho}x${alto}`, async ({ page }) => {
      await page.setViewportSize({ width: ancho, height: alto })
      await aLaPartida(page, { tamano: 'enorme', fuente: 'legible', interlineado: 'amplio' })
      const hd = await page.evaluate(() => {
        const bs = [...document.querySelectorAll<HTMLElement>('.game-hd .hd-btn')].map(b => b.getBoundingClientRect())
        return {
          n: bs.length, menores: bs.filter(r => r.width < 43.5 || r.height < 43.5).length,
          filas: new Set(bs.map(r => Math.round(r.top))).size,
          alDerecha: Math.max(...bs.map(r => r.right)), ancho: window.innerWidth,
          desborde: document.documentElement.scrollWidth - window.innerWidth,
        }
      })
      expect(hd.n).toBe(4)
      expect(hd.menores, 'botones de 44 px').toBe(0)
      expect(hd.filas, 'una sola fila').toBe(1)
      expect(hd.alDerecha).toBeLessThanOrEqual(hd.ancho)
      expect(hd.desborde, 'scroll horizontal').toBeLessThanOrEqual(0)

      await abrir(page)
      const m = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.aj-modal')!
        const r = el.getBoundingClientRect()
        const chicos = [...el.querySelectorAll<HTMLElement>('button, input')].filter(b => {
          const c = b.getBoundingClientRect()
          return c.width > 0 && (c.width < 43.5 || c.height < 43.5) && !b.classList.contains('modal-x')
        }).map(b => `${b.className} ${b.textContent}`)
        return { dentro: r.left >= 0 && r.right <= window.innerWidth && r.bottom <= window.innerHeight + 1, scroll: getComputedStyle(el).overflowY, chicos, desborde: el.scrollWidth - el.clientWidth }
      })
      expect(m.dentro, 'el menú entra en la pantalla').toBe(true)
      expect(m.scroll).toBe('auto')
      expect(m.chicos, 'controles de menos de 44 px').toEqual([])
      expect(m.desborde, 'desborde horizontal del menú').toBeLessThanOrEqual(0)
    })
  }
})
