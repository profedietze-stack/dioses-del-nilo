import { describe, it, expect } from 'vitest'
import { EVENTS } from './events'
import * as X from './events_extra'

const TODOS = [...EVENTS, ...Object.values(X).flat()]

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
})
