import { describe, it, expect } from 'vitest'
import { INIT, clamp, applyFx } from './gameLogic'
import type { Stats } from '../types'

describe('clamp', () => {
  it('leaves in-range values untouched', () => {
    expect(clamp(50)).toBe(50)
  })
  it('floors below 0', () => {
    expect(clamp(-15)).toBe(0)
  })
  it('caps above 100', () => {
    expect(clamp(140)).toBe(100)
  })
})

describe('applyFx', () => {
  it('adds deltas to the listed stats and leaves the rest untouched', () => {
    const result = applyFx(INIT, { estabilidad: 10, riqueza: -5 })
    expect(result.estabilidad).toBe(60)
    expect(result.riqueza).toBe(45)
    expect(result.cultura).toBe(INIT.cultura)
  })

  it('clamps the result into [0, 100] instead of overflowing', () => {
    const maxed: Stats = { ...INIT, estabilidad: 95 }
    expect(applyFx(maxed, { estabilidad: 20 }).estabilidad).toBe(100)

    const bottomed: Stats = { ...INIT, riqueza: 5 }
    expect(applyFx(bottomed, { riqueza: -20 }).riqueza).toBe(0)
  })

  it('does not mutate the input stats object', () => {
    const before = { ...INIT }
    applyFx(INIT, { fe: 10 })
    expect(INIT).toEqual(before)
  })

  it('is a no-op with an empty delta', () => {
    expect(applyFx(INIT, {})).toEqual(INIT)
  })
})

/**
 * Un guardado editado deja las estadísticas en NaN, y el juego no lo nota.
 *
 * `clamp` era `Math.max(0, Math.min(100, v))`, que **deja pasar el NaN**: las dos
 * comparaciones con NaN son falsas y sale intacto por el medio. Y `loadSave`
 * comprobaba que `stats` fuera un objeto, no que sus valores fueran números.
 *
 * Con una sola estadística en texto, `"mucha" + 5` da `"mucha5"` y de ahí en más
 * todo es NaN: el promedio, el puntaje y el ancho de las barras (`width: NaN%`).
 * Lo peor es lo callado que es. `getDivineTitle(NaN)` falla todas sus
 * comparaciones y cae al último caso, así que el alumno termina de «Iniciado del
 * Templo» sin importar lo bien que haya jugado, y el veredicto se va a «Imperio
 * Frágil» por el mismo camino. Ni un error en consola.
 */
describe('las estadísticas aguantan un guardado editado', () => {
  it('clamp devuelve siempre un número usable', () => {
    for (const basura of [NaN, undefined, null, 'mucha', {}, [1, 2], Infinity, -Infinity]) {
      const v = clamp(basura as unknown as number)
      expect(Number.isFinite(v), `clamp(${JSON.stringify(basura)}) = ${v}`).toBe(true)
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(100)
    }
  })

  it('y los números de verdad siguen pasando acotados', () => {
    expect(clamp(50)).toBe(50)
    expect(clamp(-20)).toBe(0)
    expect(clamp(180)).toBe(100)
  })

  it('una estadística que vino como texto no contagia al resto', () => {
    const sucias = { ...INIT, estabilidad: 'mucha' as unknown as number }
    const r = applyFx(sucias, { estabilidad: 5, riqueza: 3 })
    for (const [k, v] of Object.entries(r)) {
      expect(Number.isFinite(v), `${k} quedó en ${v}`).toBe(true)
    }
  })
})
