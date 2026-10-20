import { test, expect, type Page, type ConsoleMessage } from '@playwright/test'

/**
 * Full end-to-end playthrough: menu -> name -> skip intro -> pick a god ->
 * play all 32 events (handling every puzzle type and both period-transition
 * screens) -> end screen.
 *
 * Most steps (modals, event choices, WordOrder, GlyphPuzzle) are click-only,
 * so those run inside the page via evaluate — a 32-event run is 150+
 * discrete steps, and polling from inside the page is faster and less
 * flaky than round-tripping each click through the test runner. MaatScale
 * and PharaohTimeline are drag-and-drop only (no click-to-place fallback),
 * so those two are handled with real Playwright drag gestures between
 * bursts of the in-page loop.
 */
async function runClickBurst(page: Page, iterations: number) {
  return page.evaluate(async (max) => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
    const clickTextBtn = (re: RegExp) => {
      const el = [...document.querySelectorAll('button')].find(b => re.test(b.textContent ?? ''))
      if (el) { (el as HTMLButtonElement).click(); return true }
      return false
    }
    const log: string[] = []
    let unhandledStreak = 0

    for (let i = 0; i < max; i++) {
      await sleep(150)

      const anyModal = document.querySelector(
        '.gm-overlay button, .god-modal-overlay button, .cmod-overlay button, .pharaoh-overlay button, .pmod-overlay button, .modal-overlay button'
      )
      if (anyModal) {
        const overlayCount = document.querySelectorAll('.gm-overlay, .god-modal-overlay, .cmod-overlay, .pharaoh-overlay, .pmod-overlay, .modal-overlay').length;
        (anyModal as HTMLButtonElement).click();
        log.push(`modal:"${(anyModal.textContent ?? '').slice(0, 20)}" overlays=${overlayCount}`)
        continue
      }

      // Only after any modal is closed (the advisor modal covers the puzzle).
      // A drag-only puzzle is waiting for the test runner — stop and hand back.
      if (document.querySelector('.maat-hand-cards .maat-card, .pht-pool-cards .pht-card')) {
        log.push('DRAG_PUZZLE_PENDING')
        break
      }

      if (document.querySelector('.puz-wrap')) {
        if (clickTextBtn(/^Continuar/)) { log.push('puzzle:continue'); continue }
        if (document.querySelector('.word-bank')) {
          const w = document.querySelector('.word-bank .word-btn')
          if (w) { (w as HTMLButtonElement).click(); log.push('wordorder:place'); continue }
          if (clickTextBtn(/Verificar texto/)) { log.push('wordorder:verify'); continue }
        }
        if (clickTextBtn(/Confirmar selección/)) { log.push('glyph:confirm'); continue }
        if (clickTextBtn(/Confirmar — Pesar el corazón/)) { log.push('maat:confirm'); continue }
        if (clickTextBtn(/Confirmar orden cronológico/)) { log.push('pht:verify'); continue }
        // A momentary render gap (e.g. right after the last card is
        // dropped, before React paints the confirm button) can leave no
        // button matched for a tick, especially under CI/parallel-worker
        // resource contention — retry generously before giving up.
        unhandledStreak++
        log.push('puzzle:unhandled ' + (document.querySelector('.puz h3')?.textContent ?? '?'))
        if (unhandledStreak >= 60) break
        continue
      }
      unhandledStreak = 0

      if (document.querySelector('.pharaoh-event-placeholder')) { log.push('pharaoh:wait'); continue }

      const ptBtn = document.querySelector('.pt-btn')
      if (ptBtn) {
        log.push('period-transition hasImg=' + !!document.querySelector('.pt-header-photo'))
        ;(ptBtn as HTMLButtonElement).click()
        continue
      }

      if (document.querySelector('.end')) { log.push('END'); break }

      const opts = document.querySelectorAll('.opts .opt')
      if (opts.length) {
        const cat = document.querySelector('.ev-tag.cat')?.textContent ?? '?'
        const hasImg = !!document.querySelector('.ev-cat-img')
        log.push(`event cat=${cat} img=${hasImg}`)
        ;(opts[i % opts.length] as HTMLButtonElement).click()
        continue
      }

      log.push('UNKNOWN')
    }
    return log
  }, iterations)
}

async function solveMaatScale(page: Page) {
  const cards = page.locator('.maat-hand-cards .maat-card')
  const heart = page.locator('.maat-plate').first()
  const feather = page.locator('.maat-plate').nth(1)
  let count = await cards.count()
  let i = 0
  while (count > 0 && i < 20) {
    await cards.first().dragTo(i % 2 === 0 ? heart : feather, { timeout: 5000 }).catch(() => undefined)
    await page.waitForTimeout(150)
    count = await cards.count()
    i++
  }
}

async function solvePharaohTimeline(page: Page) {
  const pool = page.locator('.pht-pool-cards .pht-card')
  // Siempre al primer hueco vacío: no depende de cuántos arrastres anteriores salieron bien.
  const firstEmpty = page.locator('.pht-slot.empty').first()
  let tries = 0
  let ultimoError = ''
  while ((await pool.count()) > 0 && tries < 6) {
    await pool.first().dragTo(firstEmpty, { timeout: 5000 }).catch(e => { ultimoError = String(e).split(String.fromCharCode(10)).slice(0, 4).join(' / ') })
    await page.waitForTimeout(150)
    tries++
  }
  if ((await pool.count()) > 0) {
    const overlays = await page.evaluate(() => [...document.querySelectorAll('[class*=overlay]')].map(e => e.className).join(','))
    throw new Error(`no se pudo arrastrar el faraón tras ${tries} intentos. overlays=[${overlays}] último error: ${ultimoError} | ERRORES: ${erroresDe(page)}`)
  }
}

/** Errores de consola y de página por pestaña, para incluirlos en los diagnósticos de atasco. */
const erroresDePagina = new WeakMap<Page, string[]>()
const erroresDe = (page: Page) => (erroresDePagina.get(page) ?? []).slice(0, 6).join(' // ') || 'ninguno'

async function startNewGame(page: Page, godName: string) {
  const errs: string[] = []
  erroresDePagina.set(page, errs)
  page.on('pageerror', e => errs.push('PAGEERROR ' + String(e).slice(0, 200)))
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ' ' + m.text().slice(0, 200)) })
  page.on('requestfailed', r => errs.push('REQFAIL ' + r.url().split('/').pop() + ' ' + (r.failure()?.errorText ?? '')))
  // Diagnóstico del atasco intermitente: E2E_NO_FS=1 desactiva la pantalla completa en el test.
  // Diagnóstico: E2E_NO_AUDIO=1 reemplaza AudioContext por un doble que no hace nada.
  if (process.env.E2E_NO_AUDIO) {
    await page.addInitScript(() => {
      const stub = (): unknown => new Proxy(function () { /* nada */ }, {
        get: (_t, k) => (k === 'currentTime' ? 0 : k === 'state' ? 'running' : k === 'sampleRate' ? 44100 : stub()),
        apply: () => stub(), construct: () => stub() as object, set: () => true,
      })
      ;(window as unknown as Record<string, unknown>).AudioContext = function () { return stub() }
    })
  }
  if (process.env.E2E_NO_FS) await page.addInitScript(() => { Element.prototype.requestFullscreen = () => Promise.resolve() })
  await page.goto('/')
  await page.getByRole('button', { name: /Nueva Partida/ }).click()

  await page.getByPlaceholder('Escribe tu nombre...').fill('Test Player')
  await page.getByRole('button', { name: /Comenzar mi Reinado/ }).click()

  // Espera el botón: entre pantallas hay un instante sin él, y un isVisible() inmediato lo daba por ausente.
  await page.getByRole('button', { name: /Saltar intro/ }).click()

  await page.locator('.god-card').filter({ has: page.locator('.god-name', { hasText: new RegExp(`^${godName}$`) }) }).click()
  await expect(page.locator('.ev-num').first()).toBeVisible({ timeout: 10000 })
}

/** Juega hasta el final, o hasta que aparezca el evento `stopAtEvent` (paso a paso). */
async function playOn(page: Page, stopAtEvent?: number) {
  const fullLog: string[] = []
  let modalOnly = 0
  for (let burst = 0; burst < 400; burst++) {
    if (stopAtEvent) {
      // evaluate, no locator: durante un puzzle no hay .ev-num y un locator esperaría ahí hasta el timeout.
      const n = await page.evaluate(() => document.querySelector('.ev-num')?.textContent ?? null)
      if (n && new RegExp(`Evento ${stopAtEvent} /`).test(n)) break
    }
    const chunk = await runClickBurst(page, stopAtEvent ? 1 : 25)
    // Atasco: una ráfaga entera de «modal» sin que nada avance. Intermitente y sin explicar:
    // en vez de esperar al timeout, fallamos rápido y con el estado del modal a la vista.
    modalOnly = chunk.length >= (stopAtEvent ? 1 : 20) && chunk.every(l => l.startsWith('modal:')) ? modalOnly + 1 : 0
    if (modalOnly >= (stopAtEvent ? 15 : 4)) {
      const est = await page.evaluate(async () => {
        const ov = document.querySelector('.cmod-overlay, .gm-overlay, .pharaoh-overlay, .pmod-overlay, .modal-overlay')
        const raf = await new Promise<boolean>(res => { requestAnimationFrame(() => res(true)); setTimeout(() => res(false), 700) })
        return {
          overlay: ov?.className, style: ov?.getAttribute('style'), raf, animations: document.getAnimations().length,
          visibility: document.visibilityState, fullscreen: !!document.fullscreenElement, viewport: `${innerWidth}x${innerHeight}`,
          ev: document.querySelector('.ev-num')?.textContent,
          anims: document.getAnimations().map(a => `${a.playState}@${Math.round(Number(a.currentTime))}`).join(','),
          timeline0: Math.round(Number(document.timeline.currentTime)),
          timeline1: await new Promise<number>(res => setTimeout(() => res(Math.round(Number(document.timeline.currentTime))), 500)),
        }
      })
      // ¿Cierra con un clic real (ratón de Playwright) o también lo ignora?
      const real = await page.getByRole('button', { name: /Continuar/ }).first().click({ timeout: 3000 }).then(() => 'clic real ok', e => 'clic real falló: ' + String(e).split(String.fromCharCode(10))[0])
      await page.waitForTimeout(800)
      const sigue = await page.evaluate(() => !!document.querySelector('.cmod-overlay, .gm-overlay, .pharaoh-overlay'))
      // ¿El árbol ACTUAL de React todavía contiene ese nodo? (huérfano vs. actualización sin confirmar)
      const arbol = await page.evaluate(() => {
        const els = [...document.querySelectorAll('.cmod-overlay')]
        const el = els[0] as HTMLElement | undefined
        if (!el) return 'sin overlay'
        const fk = Object.keys(el).find(x => x.startsWith('__reactFiber'))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let f: any = fk ? (el as any)[fk] : null
        while (f && f.return) f = f.return
        const root = f?.stateNode
        if (!root?.current) return 'sin raíz de React'
        let encontrado = false, appConsejer: unknown = 'no hallado', n = 0
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hooks = (fib: any) => { let c = 0; for (let h = fib.memoizedState; h && c < 60; h = h.next) c++; return c }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const walk = (fib: any) => {
          while (fib && n++ < 20000) {
            if (fib.stateNode === el) encontrado = true
            if (appConsejer === 'no hallado' && typeof fib.type === 'function' && hooks(fib) >= 18) {
              let i = 0
              for (let h = fib.memoizedState; h && i < 14; h = h.next, i++) if (i === 13) appConsejer = h.memoizedState === null ? 'null' : 'objeto'
            }
            if (fib.child) walk(fib.child)
            fib = fib.sibling
          }
        }
        walk(root.current)
        // Cadena de claves (key) desde el overlay hasta la raíz: quién lo mantiene vivo.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let c: any = fk ? (el as any)[fk] : null
        const cadena: string[] = []
        while (c) { if (c.key != null) cadena.push(String(c.key)); c = c.return }
        const games = document.querySelectorAll('.game').length
        const evNums = document.querySelectorAll('.ev-num').length
        return `cadena[${cadena.join(' < ')}] .game=${games} .ev-num=${evNums} overlays=${els.length} conectado=${el.isConnected} enArbolActual=${encontrado} consejer(arbol actual)=${appConsejer} nodos=${n}`
      })
      const props = await page.evaluate(() => {
        const b = document.querySelector('.cmod-overlay button, .gm-overlay button') as HTMLElement | null
        if (!b) return 'sin botón'
        const k = Object.keys(b).find(x => x.startsWith('__reactProps'))
        return k ? Object.keys((b as unknown as Record<string, Record<string, unknown>>)[k]).join(',') : 'sin __reactProps'
      })
      const estado = await page.evaluate(() => {
        // Estado de los hooks de <App>, leído desde el fiber de React (sólo diagnóstico).
        const el = document.querySelector('.cmod-overlay, .gm-overlay') as HTMLElement | null
        if (!el) return 'sin overlay'
        const fk = Object.keys(el).find(x => x.startsWith('__reactFiber'))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let f: any = fk ? (el as any)[fk] : null
        // En el build las funciones están minificadas: buscamos <App> por su cantidad de hooks.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nHooks = (fib: any) => { let n = 0; for (let h = fib.memoizedState; h && n < 60; h = h.next) n++; return n }
        while (f && nHooks(f) < 18) f = f.return
        if (!f) return 'sin fiber con >=18 hooks'
        const out: string[] = ['hooks=' + nHooks(f)]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (let h: any = f.memoizedState, i = 0; h && i < 60; h = h.next, i++) {
          const v = h.memoizedState
          if (v === null || typeof v !== 'object' || Array.isArray(v) || 'current' in v || 'tag' in v) {
            try { out.push(i + ':' + JSON.stringify(v)?.slice(0, 60)) } catch { out.push(i + ':?') }
          }
        }
        return out.join(' ')
      })
      throw new Error('el modal no se cierra tras varias ráfagas de «Continuar»: estado App=' + estado + ' || ' + JSON.stringify(est) + ' | ' + real + ' | sigue abierto tras clic real: ' + sigue + ' | props del botón: ' + props + ' | ÁRBOL: ' + arbol + ' | ERRORES: ' + erroresDe(page))
    }
    fullLog.push(...chunk)
    const last = chunk[chunk.length - 1]

    if (last === 'END') break

    if (last === 'DRAG_PUZZLE_PENDING') {
      if (await page.locator('.maat-hand-cards .maat-card').count() > 0) {
        await solveMaatScale(page)
        fullLog.push('maat:dragged')
      }
      if (await page.locator('.pht-pool-cards .pht-card').count() > 0) {
        await solvePharaohTimeline(page)
        fullLog.push('pht:dragged')
      }
      continue
    }

    if (typeof last === 'string' && last.startsWith('puzzle:unhandled')) {
      throw new Error('Unhandled puzzle type: ' + last + ' | ERRORES: ' + erroresDe(page))
    }
  }

  return fullLog
}

async function playThrough(page: Page, godName: string) {
  await startNewGame(page, godName)
  return playOn(page)
}

// Diagnóstico: E2E_NO_SW=1 bloquea el service worker (precachea 4,8 MB en la primera visita).
if (process.env.E2E_NO_SW) test.use({ serviceWorkers: 'block' })

test.describe('full playthrough', () => {
  // Los puzzles de arrastre se resuelven con el mouse de Playwright; el arrastre
  // táctil (touchstart/move/end) es otro camino del código y no lo cubre este test.
  test.skip(({ isMobile }) => isMobile, 'drag solver uses mouse events')

  test('completes a full game with Ra without console errors', async ({ page }) => {
    test.setTimeout(180_000)
    const errors: string[] = []
    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', err => errors.push(String(err)))

    const log = await playThrough(page, 'RA')

    expect(log).toContain('END')
    expect(log.filter(l => l === 'UNKNOWN')).toHaveLength(0)

    // Los quince puzzles tienen que aparecer. Antes salían nueve: seis (las
    // balanzas de Maat y las líneas de faraones) quedaban fuera por el orden del
    // arreglo y este test seguía en verde porque nunca miraba cuántos salían.
    expect(log.filter(l => l === 'puzzle:continue')).toHaveLength(15)
    expect(log).toContain('maat:dragged')
    expect(log).toContain('pht:dragged')

    const transitions = log.filter(l => l.startsWith('period-transition'))
    expect(transitions.length).toBeGreaterThan(0)
    for (const t of transitions) expect(t).toContain('hasImg=true')

    const events = log.filter(l => l.startsWith('event'))
    expect(events.length).toBeGreaterThan(0)
    for (const e of events) expect(e).toContain('img=true')

    await expect(page.locator('.end')).toBeVisible()
    await expect(page.locator('.end-player-name')).toContainText('Test Player')

    expect(errors, `Console errors during playthrough:\n${errors.join('\n')}`).toHaveLength(0)
  })

  test('resuming mid-game keeps the remaining puzzles', async ({ page }) => {
    test.setTimeout(180_000)
    await startNewGame(page, 'THOTH')
    const before = await playOn(page, 11) // pasaron los puzzles de los eventos 3, 6, 7 y 9
    const seenBefore = before.filter(l => l === 'puzzle:continue').length
    expect(seenBefore).toBeGreaterThan(0)

    await page.goto('/')
    await page.getByRole('button', { name: /Continuar Partida/ }).click()
    await expect(page.locator('.ev-num').first()).toBeVisible({ timeout: 10000 })

    const after = await playOn(page)
    expect(after).toContain('END')
    // Ni se repiten los ya hechos ni se pierden los que faltaban: en total, quince.
    expect(seenBefore + after.filter(l => l === 'puzzle:continue').length).toBe(15)
  })

  test('el puzzle de faraones se resuelve tocando, también en una pantalla baja', async ({ page }) => {
    test.setTimeout(180_000)
    // 700 px de alto: ahí el mazo quedaba al borde de la pantalla y el arrastre fallaba.
    await page.setViewportSize({ width: 1280, height: 700 })
    await startNewGame(page, 'RA')
    for (let b = 0; b < 100; b++) {
      const chunk = await runClickBurst(page, 25)
      if (chunk[chunk.length - 1] === 'DRAG_PUZZLE_PENDING') break
    }
    const pool = page.locator('.pht-pool-cards .pht-card')
    await expect(pool).toHaveCount(6)

    // El mazo se ve sin desplazarse.
    const box = await pool.first().boundingBox()
    expect(box!.y + box!.height).toBeLessThanOrEqual(700)

    // Tocar un faraón y después su lugar, sin arrastrar.
    while ((await pool.count()) > 0) {
      await pool.first().click()
      await page.locator('.pht-slot.empty').first().click()
    }
    await page.getByRole('button', { name: /Confirmar orden cronológico/ }).click()
    await expect(page.locator('.maat-result')).toBeVisible()
  })

  test('resuming a save written at game end goes straight to the end screen', async ({ page }) => {
    test.setTimeout(180_000)
    const errors: string[] = []
    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    const log = await playThrough(page, 'OSIRIS')
    expect(log).toContain('END')
    await expect(page.locator('.end')).toBeVisible()

    // Reload without clearing the save (mirrors a player closing the tab
    // right as the game ends) and resume via "Continuar Partida".
    await page.goto('/')
    await page.getByRole('button', { name: /Continuar Partida/ }).click()

    await expect(page.locator('.end')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Cargando...')).not.toBeVisible()

    expect(errors, `Console errors on resume:\n${errors.join('\n')}`).toHaveLength(0)
  })
})
