import { describe, it, expect } from 'vitest'
import { EVENTS } from './events'
import * as X from './events_extra'
import { EVENTS_DIOSES } from './events_dioses'
import { EVENTS_EQUILIBRIO } from './events_equilibrio'

const TODOS = [...EVENTS, ...Object.values(X).flat(), ...EVENTS_DIOSES, ...EVENTS_EQUILIBRIO]

describe('las opciones de los eventos', () => {
  it('cada evento tiene cuatro opciones distintas', () => {
    for (const e of TODOS) {
      expect(e.opts, `evento ${e.id}`).toHaveLength(4)
      expect(new Set(e.opts.map(o => o.t)).size, `evento ${e.id} repite una opción`).toBe(4)
    }
  })

  it('«cruel» es una etiqueta de crueldad, no de «la peor opción»', () => {
    // Estas opciones eran «cruel» sólo por ser la trampa del evento (ignorar, ceder,
    // negociar, esperar…); el cartel «Decisión Cruel — costo humano» les mentía y
    // además inflaba el logro «No hay opción buena».
    const noCrueles = [
      /^Perdonarlo a cambio/, /^Ignorar el problema/, /^Rendición negociada/, /^Aceptación resignada/,
      /^Enviar emisarios/, /^Esperar diez años/, /^Adoptar la moneda griega/, /^Acumular en secreto/,
    ]
    for (const e of TODOS) {
      for (const o of e.opts) {
        if (noCrueles.some(re => re.test(o.t))) expect(o.type, `ev${e.id}: ${o.t}`).not.toBe('cruel')
      }
    }
  })

  it('ninguna opción deja el evento sin efecto', () => {
    for (const e of TODOS) for (const o of e.opts) expect(Object.keys(o.fx).length, `ev${e.id}: ${o.t}`).toBeGreaterThan(0)
  })

  /**
   * Una opción dominada es peor o igual que otra en las seis estadísticas: elegirla
   * nunca conviene, así que no es una decisión. La peor opción de cada evento puede
   * serlo (es la trampa a propósito); cualquier otra, no. Cuando esto saltaba, el
   * arreglo fue ponerle un costo real a la opción fuerte, nunca premiar a la débil.
   */
  it('ninguna alternativa legítima queda dominada por otra', () => {
    const K = ['estabilidad', 'riqueza', 'cultura', 'influencia', 'fe', 'comercio'] as const
    const v = (o: { fx: Partial<Record<(typeof K)[number], number>> }, k: (typeof K)[number]) => o.fx[k] ?? 0
    const suma = (o: Parameters<typeof v>[0]) => K.reduce((a, k) => a + v(o, k), 0)
    const domina = (a: Parameters<typeof v>[0], b: Parameters<typeof v>[0]) =>
      K.every(k => v(a, k) >= v(b, k)) && K.some(k => v(a, k) > v(b, k))
    const malos: string[] = []
    for (const e of TODOS) {
      const peor = e.opts.reduce((w, o) => (suma(o) < suma(w) ? o : w), e.opts[0])
      for (const b of e.opts) {
        if (b === peor) continue
        for (const a of e.opts) if (a !== b && domina(a, b)) malos.push(`ev${e.id}: «${b.t.slice(0, 50)}» < «${a.t.slice(0, 50)}»`)
      }
    }
    expect(malos).toEqual([])
  })
})
