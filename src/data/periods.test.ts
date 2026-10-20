import { describe, it, expect } from 'vitest'
import { OPTION_TYPE_LABELS } from './periods'
import { GOD_POWERS } from './godPowers'
import { EVENTS } from './events'
import * as X from './events_extra'
import { EVENTS_DIOSES } from './events_dioses'

const TODOS = [...EVENTS, ...Object.values(X).flat(), ...EVENTS_DIOSES]

/**
 * `religioso` era un tipo de opción sin cartel: el botón mostraba la palabra cruda y, al
 * agregar las habilidades de los dioses, la pantalla de selección se caía al pedirle el
 * texto. Todo tipo que use un evento o un dios tiene que tener su cartel.
 */
describe('carteles de los tipos de opción', () => {
  it('todo tipo que usa un evento tiene cartel', () => {
    for (const t of new Set(TODOS.flatMap(e => e.opts.map(o => o.type)))) {
      expect(OPTION_TYPE_LABELS[t], `tipo «${t}»`).toBeTruthy()
    }
  })

  it('y todo tipo que nombra la habilidad de un dios también', () => {
    for (const [dios, p] of Object.entries(GOD_POWERS)) {
      for (const t of [...p.favored, ...p.against]) expect(OPTION_TYPE_LABELS[t], `${dios}: ${t}`).toBeTruthy()
    }
  })
})
