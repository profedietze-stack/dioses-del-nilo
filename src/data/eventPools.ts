import { EVENTS } from './events'
import {
  EVENTS_ANTIGUO_EXTRA,
  EVENTS_MEDIO_EXTRA,
  EVENTS_NUEVO_EXTRA,
  EVENTS_TARDIO_EXTRA,
} from './events_extra'
import { EVENTS_DIOSES } from './events_dioses'
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
const ALL_EVENTS = [...NORMAL_EVENTS, ...EVENTS_DIOSES, ...PHARAOH_PLACEHOLDER_EVENTS]

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

// Position within each period block where the fixed pharaoh event is inserted.
export const PHARAOH_INSERT_POS = 4

function insertAt(events: GameEvent[], pharaoh: GameEvent, pos: number): GameEvent[] {
  const r = [...events]
  r.splice(pos, 0, pharaoh)
  return r
}

/**
 * Build a random game with perPeriod total slots per period.
 * Con `godId`, el evento exclusivo de ese dios ocupa uno de los lugares comunes de su período.
 * One slot per period is a fixed pharaoh event at PHARAOH_INSERT_POS within each period block.
 * Remaining (perPeriod - 1) slots are random normal events.
 */
export function buildGameEvents(perPeriod = 8, godId?: string): GameEvent[] {
  const [ph0, ph1, ph2, ph3] = PHARAOH_PLACEHOLDER_EVENTS
  const exclusive = godId ? EVENTS_DIOSES.find(e => e.godOnly === godId) : undefined

  // El evento exclusivo del dios ocupa el lugar de uno común de su período: la partida
  // sigue teniendo perPeriod eventos por período, y aparece en una posición al azar.
  const block = (pool: GameEvent[], per: string, pharaoh: GameEvent): GameEvent[] => {
    const mine = exclusive && exclusive.per === per ? exclusive : undefined
    const normal = pick(pool, perPeriod - 1 - (mine ? 1 : 0))
    return insertAt(mine ? shuffle([...normal, mine]) : normal, pharaoh, PHARAOH_INSERT_POS)
  }

  return [
    ...block(POOL_ANTIGUO, 'antiguo', ph0),
    ...block(POOL_MEDIO, 'medio', ph1),
    ...block(POOL_NUEVO, 'nuevo', ph2),
    ...block(POOL_TARDIO, 'tardio', ph3),
  ]
}

/**
 * Reconstruct event list from saved IDs (for continue — includes pharaoh placeholders).
 * Returns null if any ID fails to resolve, so callers can fall back to a fresh game
 * instead of silently producing a shorter list that desyncs from the saved evIdx.
 */
export function getEventsById(ids: number[]): GameEvent[] | null {
  const out: GameEvent[] = []
  for (const id of ids) {
    const ev = ALL_EVENTS.find(e => e.id === id)
    if (!ev) return null
    out.push(ev)
  }
  return out
}
