import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { EVENTS } from './events'
import * as X from './events_extra'
import { EVENTS_DIOSES } from './events_dioses'
import { EVENTS_EQUILIBRIO } from './events_equilibrio'
import { buildGameEvents } from './eventPools'

/* El reparto de categorías era: 1 evento `militar` en 62, y 1 solo de `cultura` en el Antiguo Imperio.
   Una partida podía pasar sin una decisión de guerra y la imagen cat-militar.jpg casi no se mostraba. */
const COMUNES = [...EVENTS, ...Object.values(X).flat(), ...EVENTS_EQUILIBRIO]
const CATS = ['economia', 'politica', 'religion', 'sociedad', 'cultura', 'militar']
const PERIODOS = ['antiguo', 'medio', 'nuevo', 'tardio']

describe('reparto de categorías', () => {
  it('los ids no se repiten entre todos los eventos', () => {
    const ids = [...COMUNES, ...EVENTS_DIOSES].map(e => e.id)
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([])
  })

  it('cada período tiene al menos un evento de cada categoría', () => {
    const faltan: string[] = []
    for (const p of PERIODOS) for (const c of CATS) {
      if (!COMUNES.some(e => e.per === p && e.cat === c)) faltan.push(`${p}/${c}`)
    }
    expect(faltan).toEqual([])
  })

  it('ninguna categoría usada es desconocida, y todas tienen su imagen', () => {
    const usadas = new Set([...COMUNES, ...EVENTS_DIOSES].map(e => e.cat))
    for (const c of usadas) {
      expect(CATS, `categoría ${c}`).toContain(c)
      expect(existsSync(join(process.cwd(), 'public', 'images', `cat-${c}.jpg`)), `cat-${c}.jpg`).toBe(true)
    }
  })

  it('en el reparto de un partida salen decisiones militares y culturales (medido sobre partidas simuladas)', () => {
    const N = 2000
    const conCat: Record<string, number> = {}
    let conDosMilitares = 0
    for (let i = 0; i < N; i++) {
      const ev = buildGameEvents(8, 'ra').filter(e => !e.isPharaoh)
      for (const c of new Set(ev.map(e => e.cat))) conCat[c] = (conCat[c] ?? 0) + 1
      if (ev.filter(e => e.cat === 'militar').length >= 2) conDosMilitares++
    }
    for (const c of CATS) expect(conCat[c] / N, `categoría ${c}`).toBeGreaterThan(0.97)
    expect(conDosMilitares / N).toBeGreaterThan(0.9)
  })
})
