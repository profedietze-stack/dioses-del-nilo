import { EVENTS } from './events'
import {
  EVENTS_ANTIGUO_EXTRA,
  EVENTS_MEDIO_EXTRA,
  EVENTS_NUEVO_EXTRA,
  EVENTS_TARDIO_EXTRA,
} from './events_extra'
import type { GameEvent } from '../types'

const ALL_EVENTS = [
  ...EVENTS,
  ...EVENTS_ANTIGUO_EXTRA,
  ...EVENTS_MEDIO_EXTRA,
  ...EVENTS_NUEVO_EXTRA,
  ...EVENTS_TARDIO_EXTRA,
]

const POOL_ANTIGUO = ALL_EVENTS.filter(e => e.per === 'antiguo')
const POOL_MEDIO   = ALL_EVENTS.filter(e => e.per === 'medio')
const POOL_NUEVO   = ALL_EVENTS.filter(e => e.per === 'nuevo')
const POOL_TARDIO  = ALL_EVENTS.filter(e => e.per === 'tardio')

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Pick n random events from a pool */
function pick(pool: GameEvent[], n: number): GameEvent[] {
  return shuffle(pool).slice(0, Math.min(n, pool.length))
}

/** Build a random game: perPeriod events from each of the 4 periods */
export function buildGameEvents(perPeriod = 8): GameEvent[] {
  return [
    ...pick(POOL_ANTIGUO, perPeriod),
    ...pick(POOL_MEDIO,   perPeriod),
    ...pick(POOL_NUEVO,   perPeriod),
    ...pick(POOL_TARDIO,  perPeriod),
  ]
}

/** Reconstruct event list from saved IDs (for continue) */
export function getEventsById(ids: number[]): GameEvent[] {
  return ids.map(id => ALL_EVENTS.find(e => e.id === id)).filter(Boolean) as GameEvent[]
}
