import { describe, it, expect, beforeEach } from 'vitest'
import { loadSave, writeSave, clearSave } from './save'
import { INIT } from './gameLogic'
import type { SaveData } from '../types'

const baseSave: SaveData = {
  godId: 'ra',
  playerName: 'Cleopatra',
  stats: INIT,
  evIdx: 5,
  eventIds: [1, 2, 3],
  history: [],
  achievements: [],
  puzDone: [3, 6],
  puzOk: 1,
  puzFail: 1,
  gs: { mil: 1, peace: 2, revived: false, stabStr: 3, infMax: 55, cruel: 0 },
  t: Date.now(),
}

beforeEach(() => {
  localStorage.clear()
})

describe('writeSave / loadSave', () => {
  it('round-trips a save exactly', () => {
    writeSave(baseSave)
    const loaded = loadSave()
    expect(loaded).toMatchObject(baseSave)
  })

  it('returns null when nothing is saved', () => {
    expect(loadSave()).toBeNull()
  })

  it('rejects a save written with a different schema version', () => {
    localStorage.setItem('diosesNilo_v3', JSON.stringify({ ...baseSave, v: 1 }))
    expect(loadSave()).toBeNull()
  })

  it('rejects malformed JSON without throwing', () => {
    localStorage.setItem('diosesNilo_v3', '{not valid json')
    expect(loadSave()).toBeNull()
  })

  it('rejects a save missing required fields', () => {
    localStorage.setItem('diosesNilo_v3', JSON.stringify({ godId: 'ra' }))
    expect(loadSave()).toBeNull()
  })

  it('defaults playerName to empty string for pre-existing saves that predate the field', () => {
    // Simulates a save written before playerName was added to SaveData.
    const { playerName, ...legacy } = baseSave
    void playerName
    localStorage.setItem('diosesNilo_v3', JSON.stringify({ ...legacy, v: 3 }))
    expect(loadSave()?.playerName).toBe('')
  })
})

describe('el avance de los puzzles sobrevive a recargar', () => {
  it('guarda qué puzzles se hicieron y cuántos salieron bien o mal', () => {
    writeSave(baseSave)
    const l = loadSave()!
    expect([l.puzDone, l.puzOk, l.puzFail]).toEqual([[3, 6], 1, 1])
  })

  it('un guardado de antes, sin ese avance, no vuelve a pedir los puzzles que ya quedaron atrás', () => {
    const { puzDone, puzOk, puzFail, gs, ...viejo } = { ...baseSave, evIdx: 11 }
    void puzDone; void puzOk; void puzFail; void gs
    localStorage.setItem('diosesNilo_v3', JSON.stringify({ ...viejo, v: 3 }))
    const l = loadSave()!
    expect(l.puzDone).toEqual(expect.arrayContaining([1, 2, 3])) // afterEvent 3, 6, 9
    expect(l.puzDone).not.toContain(4) // afterEvent 12: todavía no
    expect([l.puzOk, l.puzFail]).toEqual([0, 0])
  })
})

describe('un guardado editado no rompe el arranque', () => {
  it('una estadística en texto no contamina a las demás', () => {
    localStorage.setItem('diosesNilo_v3', JSON.stringify({ ...baseSave, stats: { ...INIT, fe: 'mucha', riqueza: null }, v: 3 }))
    const l = loadSave()!
    for (const v of Object.values(l.stats)) expect(Number.isFinite(v)).toBe(true)
    expect(l.stats.estabilidad).toBe(INIT.estabilidad)
  })

  it('el historial con entradas rotas se descarta entrada por entrada', () => {
    localStorage.setItem('diosesNilo_v3', JSON.stringify({ ...baseSave, history: [null, 7, { eventId: 'x' }, { eventId: 1, choice: 'a', effects: {}, statsAfter: INIT }], v: 3 }))
    expect(loadSave()!.history).toHaveLength(1)
  })

  it('listas con basura y contadores con el tipo cambiado se limpian', () => {
    localStorage.setItem('diosesNilo_v3', JSON.stringify({ ...baseSave, achievements: ['a', 3, null], puzDone: [1, 'z'], puzOk: 'x', gs: 'no', v: 3 }))
    const l = loadSave()!
    expect(l.achievements).toEqual(['a'])
    expect(l.puzDone).toEqual([1])
    expect(l.puzOk).toBe(0)
    expect(l.gs.cruel).toBe(0)
  })
})

describe('clearSave', () => {
  it('removes a stored save', () => {
    writeSave(baseSave)
    clearSave()
    expect(loadSave()).toBeNull()
  })

  it('is a no-op when nothing is stored', () => {
    expect(() => clearSave()).not.toThrow()
  })
})
