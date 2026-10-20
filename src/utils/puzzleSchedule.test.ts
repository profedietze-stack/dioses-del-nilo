import { describe, it, expect } from 'vitest'
import { pendingPuzzle, puzzlesBefore } from './puzzleSchedule'
import { PUZZLES_DEF } from '../data/puzzles'

/** Juega los 32 eventos como lo hace la app: en cada índice, resuelve lo que esté pendiente. */
function recorrer(total = 32, esFaraon: (i: number) => boolean = () => false) {
  const hechos: number[] = []
  for (let ev = 0; ev <= total; ev++) {
    if (esFaraon(ev)) continue
    for (let p = pendingPuzzle(ev, hechos); p; p = pendingPuzzle(ev, hechos)) hechos.push(p.id)
  }
  return hechos
}

describe('qué puzzle toca', () => {
  it('los quince puzzles se muestran en una partida (antes salían nueve)', () => {
    expect(recorrer().sort((a, b) => a - b)).toEqual(PUZZLES_DEF.map(p => p.id).sort((a, b) => a - b))
  })

  it('salen en orden de aparición, no en el orden en que están escritos', () => {
    const orden = recorrer().map(id => PUZZLES_DEF.find(p => p.id === id)!.afterEvent)
    expect(orden).toEqual([...orden].sort((a, b) => a - b))
  })

  it('un puzzle no se repite una vez hecho', () => {
    expect(pendingPuzzle(40, PUZZLES_DEF.map(p => p.id))).toBeUndefined()
  })

  it('no sale antes de tiempo', () => {
    expect(pendingPuzzle(2, [])).toBeUndefined()
    expect(pendingPuzzle(3, [])?.afterEvent).toBe(3)
  })

  it('al reanudar, los que ya quedaron atrás no vuelven a pedirse', () => {
    const atras = puzzlesBefore(11)
    expect(atras.length).toBeGreaterThan(0)
    expect(pendingPuzzle(11, atras)).toBeUndefined()
    expect(pendingPuzzle(12, atras)?.afterEvent).toBe(12)
  })
})
