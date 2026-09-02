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
