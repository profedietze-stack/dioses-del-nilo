import { loadSave, writeSave, clearSave } from '../utils/save'
import type { SaveData } from '../types'

export function useSave() {
  return { loadSave, writeSave, clearSave }
}

export function hasSaveData(): boolean {
  return loadSave() !== null
}

export type { SaveData }
