import type { SaveData } from '../types'

const SAVE_KEY = 'diosesNilo_v3'

export function loadSave(): SaveData | null {
  try {
    const d = localStorage.getItem(SAVE_KEY)
    return d ? (JSON.parse(d) as SaveData) : null
  } catch {
    return null
  }
}

export function writeSave(d: SaveData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(d))
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
