import type { PuzzleDef } from '../types'
import { PUZZLES_DEF } from '../data/puzzles'

/**
 * Qué puzzle toca ahora.
 *
 * Antes la app leía `PUZZLES_DEF[puzIdx]` en el orden del arreglo y lo mostraba
 * sólo si `evIdx === afterEvent`. Los puzzles 10 a 15 (las dos balanzas de Maat y
 * las cuatro líneas de faraones) están escritos al final del arreglo con
 * `afterEvent` 16, 25, 7, 14, 22 y 30, todos menores que el 27 del puzzle 9: para
 * cuando le tocaba el turno, el juego ya había pasado de largo y no aparecían
 * nunca. Seis puzzles de quince, y justamente los dos de arrastrar.
 *
 * Ahora el criterio es el contrario: toca el primer puzzle no hecho cuyo
 * `afterEvent` ya se alcanzó. No depende del orden en que estén escritos, y si un
 * evento lo tapa (la coronación de un faraón) el puzzle espera en vez de perderse.
 */
export function pendingPuzzle(
  evIdx: number,
  done: readonly number[],
  defs: readonly PuzzleDef[] = PUZZLES_DEF,
): PuzzleDef | undefined {
  return [...defs]
    .sort((a, b) => a.afterEvent - b.afterEvent)
    .find(p => p.afterEvent <= evIdx && !done.includes(p.id))
}

/** Los que ya quedaron atrás en una partida guardada antes de que se guardara `puzDone`. */
export function puzzlesBefore(evIdx: number, defs: readonly PuzzleDef[] = PUZZLES_DEF): number[] {
  return defs.filter(p => p.afterEvent < evIdx).map(p => p.id)
}
