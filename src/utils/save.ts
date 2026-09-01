import type { SaveData } from '../types'

const SAVE_KEY = 'diosesNilo_v3'
const SAVE_VERSION = 3

function isValidSave(d: unknown): d is SaveData {
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
    // playerName was added after v3 saves already existed in the wild; default
    // it rather than rejecting older saves that predate the field.
    if (typeof parsed.playerName !== 'string') parsed.playerName = ''
    return parsed as SaveData
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
