import { describe, it, expect } from 'vitest'
import { evaluateAchievements, DURING_GAME, type AchCtx } from './achievements'
import { ACHIEVEMENTS } from '../data/achievements'
import { INIT } from './gameLogic'

const base: AchCtx = {
  godId: 'ra', stats: { ...INIT }, history: [],
  gs: { mil: 0, peace: 0, revived: false, stabStr: 0, infMax: 0, cruel: 0 },
  puzOk: 0, puzFail: 0, puzTotal: 15, elapsedMs: 1000,
}

describe('logros', () => {
  it('«menos de una hora» y «sin perder 2 puzzles» no se regalan en la primera decisión', () => {
    expect(evaluateAchievements(base, [], false)).toEqual([])
  })

  it('«terminar con Influencia > 68» no se gana por pasar por ahí a mitad de partida', () => {
    const alto = { ...base, stats: { ...INIT, influencia: 90 } }
    expect(evaluateAchievements(alto, [], false)).toEqual([])
    expect(evaluateAchievements(alto, [], true)).toContain('conquistador')
  })

  it('los de racha sí se ganan en el camino', () => {
    const racha = { ...base, gs: { ...base.gs, stabStr: 10, cruel: 3 } }
    const r = evaluateAchievements(racha, [], false)
    expect(r).toContain('ra_fuego')
    expect(r).toContain('tragedia')
  })

  it('lo ganado no se pierde ni se duplica', () => {
    const r = evaluateAchievements({ ...base, gs: { ...base.gs, cruel: 3 } }, ['tragedia'], true)
    expect(r.filter(x => x === 'tragedia')).toHaveLength(1)
  })

  it('puzzlemaster pide todos los puzzles, sin errores', () => {
    expect(evaluateAchievements({ ...base, puzOk: 14, puzFail: 0 }, [], true)).not.toContain('puzzlemaster')
    expect(evaluateAchievements({ ...base, puzOk: 15, puzFail: 1 }, [], true)).not.toContain('puzzlemaster')
    expect(evaluateAchievements({ ...base, puzOk: 15, puzFail: 0 }, [], true)).toContain('puzzlemaster')
  })

  it('cada logro de «durante la partida» existe en el catálogo', () => {
    const ids = ACHIEVEMENTS.map(a => a.id)
    for (const id of DURING_GAME) expect(ids).toContain(id)
  })
})
