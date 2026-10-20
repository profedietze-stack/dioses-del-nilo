import { describe, it, expect } from 'vitest'
import { applyGodPower } from './godPowers'
import { GOD_POWERS } from '../data/godPowers'
import { GODS } from '../data/gods'
import { buildGameEvents } from '../data/eventPools'
import { INIT, applyFx, clamp } from './gameLogic'
import type { EventOption, Stats } from '../types'

const op = (type: EventOption['type'], fx: Partial<Stats> = { estabilidad: 3 }): EventOption => ({ t: 'x', fx, type })

describe('habilidades de los dioses', () => {
  it('cada dios tiene la suya, y no hay dos iguales', () => {
    for (const g of GODS) expect(GOD_POWERS[g.id], g.id).toBeTruthy()
    const firmas = GODS.map(g => JSON.stringify([GOD_POWERS[g.id].favored, GOD_POWERS[g.id].bonus]))
    expect(new Set(firmas).size).toBe(GODS.length)
  })

  it('suma la afinidad a la opción que le gusta', () => {
    const r = applyGodPower('ra', op('religioso', { cultura: 4 }))
    expect(r.fx).toEqual({ cultura: 4, fe: 2 })
    expect(r.powerName).toBe('Luz del Mediodía')
  })

  it('resta cuando la opción le va en contra', () => {
    expect(applyGodPower('ra', op('cruel', { estabilidad: -3 })).fx.estabilidad).toBe(-5)
  })

  it('no toca lo que no le interesa, ni muta la opción original', () => {
    const o = op('economico', { riqueza: 5 })
    const r = applyGodPower('ra', o)
    expect(r.fx).toBe(o.fx)
    expect(r.powerName).toBeNull()
    applyGodPower('osiris', o)
    expect(o.fx).toEqual({ riqueza: 5 })
  })

  it('un dios que no existe (o ninguno) no cambia nada', () => {
    expect(applyGodPower(undefined, op('militar')).fx).toEqual({ estabilidad: 3 })
    expect(applyGodPower('zeus', op('militar')).fx).toEqual({ estabilidad: 3 })
  })

  it('ningún dios gana de más (medido sobre partidas simuladas)', () => {
    const suma = (fx: Partial<Stats>) => Object.values(fx).reduce((a, b) => a + (b ?? 0), 0)
    const partida = (godId: string, elegir: (o: EventOption[]) => EventOption) => {
      const g = GODS.find(x => x.id === godId)!
      let s = { ...INIT } as Stats
      for (const k of Object.keys(g.bon) as (keyof Stats)[]) s[k] = clamp(50 + g.bon[k])
      for (const ev of buildGameEvents(8, godId)) {
        if (ev.isPharaoh) continue
        s = applyFx(s, applyGodPower(godId, elegir(ev.opts)).fx)
      }
      return Object.values(s).reduce((a, b) => a + b, 0) / 6
    }
    const mejor = (o: EventOption[]) => o.reduce((b, x) => (suma(x.fx) > suma(b.fx) ? x : b))
    const azar = (o: EventOption[]) => o[Math.floor(Math.random() * o.length)]
    const media = (godId: string, f: typeof mejor) =>
      Array.from({ length: 300 }, () => partida(godId, f)).reduce((a, b) => a + b, 0) / 300
    // Antes de las afinidades, 1,2 puntos separaban al mejor dios del peor con el azar.
    const m = GODS.map(g => media(g.id, azar))
    expect(Math.max(...m) - Math.min(...m)).toBeLessThan(4)
    const b = GODS.map(g => media(g.id, mejor))
    expect(Math.max(...b) - Math.min(...b)).toBeLessThan(6)
  })
})
