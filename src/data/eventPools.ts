import { EVENTS } from './events'
import {
  EVENTS_ANTIGUO_EXTRA,
  EVENTS_MEDIO_EXTRA,
  EVENTS_NUEVO_EXTRA,
  EVENTS_TARDIO_EXTRA,
} from './events_extra'
import { PHARAOH_PLACEHOLDER_EVENTS } from './pharaohs'
import type { GameEvent } from '../types'

const NORMAL_EVENTS = [
  ...EVENTS,
  ...EVENTS_ANTIGUO_EXTRA,
  ...EVENTS_MEDIO_EXTRA,
  ...EVENTS_NUEVO_EXTRA,
  ...EVENTS_TARDIO_EXTRA,
]

// Includes pharaoh placeholders so getEventsById can reconstruct saved games
const ALL_EVENTS = [...NORMAL_EVENTS, ...PHARAOH_PLACEHOLDER_EVENTS]

const POOL_ANTIGUO = NORMAL_EVENTS.filter(e => e.per === 'antiguo')
const POOL_MEDIO   = NORMAL_EVENTS.filter(e => e.per === 'medio')
const POOL_NUEVO   = NORMAL_EVENTS.filter(e => e.per === 'nuevo')
const POOL_TARDIO  = NORMAL_EVENTS.filter(e => e.per === 'tardio')

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick(pool: GameEvent[], n: number): GameEvent[] {
  return shuffle(pool).slice(0, Math.min(n, pool.length))
}

function insertAt(events: GameEvent[], pharaoh: GameEvent, pos: number): GameEvent[] {
  const r = [...events]
  r.splice(pos, 0, pharaoh)
  return r
}

/**
 * Build a random game with perPeriod total slots per period.
 * One slot per period is a fixed pharaoh event at position 4 within each period block.
 * Remaining (perPeriod - 1) slots are random normal events.
 */
export function buildGameEvents(perPeriod = 8): GameEvent[] {
  const [ph0, ph1, ph2, ph3] = PHARAOH_PLACEHOLDER_EVENTS

  const antiguo = pick(POOL_ANTIGUO, perPeriod - 1)
  const medio   = pick(POOL_MEDIO,   perPeriod - 1)
  const nuevo   = pick(POOL_NUEVO,   perPeriod - 1)
  const tardio  = pick(POOL_TARDIO,  perPeriod - 1)

  return [
    ...insertAt(antiguo, ph0, 4),
    ...insertAt(medio,   ph1, 4),
    ...insertAt(nuevo,   ph2, 4),
    ...insertAt(tardio,  ph3, 4),
  ]
}

/** Reconstruct event list from saved IDs (for continue — includes pharaoh placeholders) */
export function getEventsById(ids: number[]): GameEvent[] {
  return ids.map(id => ALL_EVENTS.find(e => e.id === id)).filter(Boolean) as GameEvent[]
}
