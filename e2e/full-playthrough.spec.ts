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
        if (unhandledStreak >= 20) break
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
  while ((await pool.count()) > 0 && tries < 20) {
    await pool.first().dragTo(firstEmpty, { timeout: 5000 }).catch(() => undefined)
    await page.waitForTimeout(150)
    tries++
  }
}

async function startNewGame(page: Page, godName: string) {
  await page.goto('/')
  await page.getByRole('button', { name: /Nueva Partida/ }).click()

  await page.getByPlaceholder('Escribe tu nombre...').fill('Test Player')
  await page.getByRole('button', { name: /Comenzar mi Reinado/ }).click()

  const skipIntro = page.getByRole('button', { name: /Saltar intro/ })
  if (await skipIntro.isVisible().catch(() => false)) await skipIntro.click()

  await page.locator('.god-card').filter({ has: page.locator('.god-name', { hasText: new RegExp(`^${godName}$`) }) }).click()
  await expect(page.locator('.ev-num').first()).toBeVisible({ timeout: 10000 })
}

/** Juega hasta el final, o hasta que aparezca el evento `stopAtEvent` (paso a paso). */
async function playOn(page: Page, stopAtEvent?: number) {
  const fullLog: string[] = []
  for (let burst = 0; burst < 400; burst++) {
    if (stopAtEvent) {
      // evaluate, no locator: durante un puzzle no hay .ev-num y un locator esperaría ahí hasta el timeout.
      const n = await page.evaluate(() => document.querySelector('.ev-num')?.textContent ?? null)
      if (n && new RegExp(`Evento ${stopAtEvent} /`).test(n)) break
    }
    const chunk = await runClickBurst(page, stopAtEvent ? 1 : 25)
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
      throw new Error('Unhandled puzzle type: ' + last)
    }
  }

  return fullLog
}

async function playThrough(page: Page, godName: string) {
  await startNewGame(page, godName)
  return playOn(page)
}

test.describe('full playthrough', () => {
  // Los puzzles de arrastre se resuelven con el mouse de Playwright; el arrastre
  // táctil (touchstart/move/end) es otro camino del código y no lo cubre este test.
  test.skip(({ isMobile }) => isMobile, 'drag solver uses mouse events')

  test('completes a full game with Ra without console errors', async ({ page }) => {
    test.setTimeout(300_000)
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
    test.setTimeout(300_000)
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

  test('resuming a save written at game end goes straight to the end screen', async ({ page }) => {
    test.setTimeout(300_000)
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
