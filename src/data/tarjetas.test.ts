import { describe, it, expect } from 'vitest'
import { EVENTS } from './events'
import * as X from './events_extra'
import { EVENTS_DIOSES } from './events_dioses'
import { EVENTS_EQUILIBRIO } from './events_equilibrio'
import type { GameEvent } from '../types'

/* La tarjeta de la línea de tiempo se muestra después de elegir. Cuatro de los eventos originales
   mostraban la de otro tema (la crecida que falla con la unificación de Narmer, la traición del visir
   con la pirámide de Djoser, «Ra contra Osiris» con la Esfinge) y varios repetían la misma tarjeta. */
const TODOS: GameEvent[] = [...EVENTS, ...Object.values(X).flat(), ...EVENTS_EQUILIBRIO, ...EVENTS_DIOSES]

const sinTildes = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const palabras = (s: string) => new Set(sinTildes(s).match(/[a-z]{5,}/g) ?? [])
// Palabras que aparecen en casi cualquier evento y no prueban que hablen de lo mismo.
const COMUNES = new Set(['egipto', 'egipcio', 'egipcios', 'faraon', 'faraones', 'imperio', 'reino', 'dinastia', 'antiguo', 'periodo', 'historia'])

describe('tarjetas de la línea de tiempo', () => {
  it('no hay dos eventos con la misma tarjeta', () => {
    for (const campo of ['ev', 'tip'] as const) {
      const vistos = new Map<string, number>()
      const repetidos: string[] = []
      for (const e of TODOS) {
        const k = e.tl[campo]
        if (vistos.has(k)) repetidos.push(`ev${vistos.get(k)} y ev${e.id}: ${k.slice(0, 60)}`)
        else vistos.set(k, e.id)
      }
      expect(repetidos, campo).toEqual([])
    }
  })

  it('la tarjeta comparte alguna palabra con el título, el texto o el contexto de su evento', () => {
    const sueltas: string[] = []
    for (const e of TODOS) {
      const evento = palabras(`${e.title} ${e.desc} ${e.ctx}`)
      const tarjeta = [...palabras(`${e.tl.ph} ${e.tl.ev} ${e.tl.tip}`)].filter(w => !COMUNES.has(w))
      if (!tarjeta.some(w => evento.has(w))) sueltas.push(`ev${e.id} «${e.title}» ↔ ${e.tl.ph}: ${e.tl.ev}`)
    }
    expect(sueltas).toEqual([])
  })
})

/* Con la tarjeta en el modal de después de elegir, la pantalla de decisión lleva el título, el relato,
   el contexto y las opciones. Antes la mediana era de 222 palabras (máximo 270) con la tarjeta incluida,
   y la tarjeta podía contar el desenlace antes de elegir. */
const palabrasDe = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

describe('carga de texto de la pantalla de decisión', () => {
  const carga = (e: GameEvent) => palabrasDe(e.desc) + palabrasDe(e.ctx) + e.opts.reduce((a, o) => a + palabrasDe(o.t), 0)

  it('ningún evento pasa de 215 palabras entre relato, contexto y opciones', () => {
    const largos = TODOS.filter(e => carga(e) > 215).map(e => `ev${e.id} «${e.title}»: ${carga(e)}`)
    expect(largos).toEqual([])
  })

  it('la mediana queda por debajo de 180', () => {
    const v = TODOS.map(carga).sort((a, b) => a - b)
    expect(v[Math.floor(v.length / 2)]).toBeLessThan(180)
  })
})
