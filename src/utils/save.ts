import type { GameStats, SaveData, Stats } from '../types'
import { INIT } from './gameLogic'
import { puzzlesBefore } from './puzzleSchedule'

const SAVE_KEY = 'diosesNilo_v3'
const SAVE_VERSION = 3

const num = (v: unknown, def = 0): number => (typeof v === 'number' && Number.isFinite(v) ? v : def)
const nums = (v: unknown): number[] => (Array.isArray(v) ? v.filter((x): x is number => typeof x === 'number' && Number.isFinite(x)) : [])
const strs = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [])

/** Cada estadística por separado: una sola en texto no puede arrastrar a las demás. */
function cleanStats(v: unknown): Stats {
  const o = (v && typeof v === 'object' ? v : {}) as Record<string, unknown>
  const out = { ...INIT }
  for (const k of Object.keys(INIT) as (keyof Stats)[]) out[k] = Math.max(0, Math.min(100, num(o[k], INIT[k])))
  return out
}

function cleanGs(v: unknown): GameStats {
  const o = (v && typeof v === 'object' ? v : {}) as Record<string, unknown>
  return {
    mil: num(o.mil), peace: num(o.peace), revived: o.revived === true,
    stabStr: num(o.stabStr), infMax: num(o.infMax), cruel: num(o.cruel),
  }
}

/** Sólo entradas de historial con la forma que Papiros y el final recorren. */
function cleanHistory(v: unknown): SaveData['history'] {
  if (!Array.isArray(v)) return []
  return v.flatMap(h => {
    if (!h || typeof h !== 'object') return []
    const o = h as Record<string, unknown>
    if (typeof o.eventId !== 'number' || typeof o.choice !== 'string') return []
    const effects = o.effects && typeof o.effects === 'object' ? (o.effects as SaveData['history'][number]['effects']) : {}
    return [{ eventId: o.eventId, choice: o.choice, effects, statsAfter: cleanStats(o.statsAfter) }]
  })
}

function isValidSave(d: unknown): d is Record<string, unknown> {
  if (!d || typeof d !== 'object') return false
  const s = d as Record<string, unknown>
  return (
    typeof s.godId === 'string' &&
    typeof s.stats === 'object' && s.stats !== null &&
    typeof s.evIdx === 'number' &&
    Array.isArray(s.eventIds) &&
    Array.isArray(s.history)
  )
}

export function loadSave(): SaveData | null {
  try {
    const d = localStorage.getItem(SAVE_KEY)
    if (!d) return null
    const parsed = JSON.parse(d) as Record<string, unknown>
    // Reject saves from an incompatible schema version.
    if (parsed.v !== undefined && parsed.v !== SAVE_VERSION) return null
    if (!isValidSave(parsed)) return null
    const evIdx = Math.max(0, Math.floor(num(parsed.evIdx)))
    return {
      godId: parsed.godId as string,
      // playerName was added after v3 saves already existed in the wild.
      playerName: typeof parsed.playerName === 'string' ? parsed.playerName : '',
      stats: cleanStats(parsed.stats),
      evIdx,
      eventIds: nums(parsed.eventIds),
      history: cleanHistory(parsed.history),
      achievements: strs(parsed.achievements),
      // Los guardados de antes no traían el avance de los puzzles: los que
      // quedaron atrás se dan por hechos para no volver a pedirlos.
      puzDone: Array.isArray(parsed.puzDone) ? nums(parsed.puzDone) : puzzlesBefore(evIdx),
      puzOk: num(parsed.puzOk),
      puzFail: num(parsed.puzFail),
      gs: cleanGs(parsed.gs),
      t: num(parsed.t),
    }
  } catch {
    return null
  }
}

export function writeSave(d: SaveData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...d, v: SAVE_VERSION }))
  } catch {
    // localStorage full or blocked
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY)
  } catch {
    // ignore
  }
}
