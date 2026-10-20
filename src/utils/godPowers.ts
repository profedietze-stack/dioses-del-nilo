import type { EventOption, Stats } from '../types'
import { GOD_POWERS } from '../data/godPowers'

export interface PoweredChoice {
  fx: Partial<Stats>
  /** Qué sumó o restó el dios, para mostrárselo al jugador. Vacío si no actuó. */
  note: Partial<Stats>
  powerName: string | null
}

/** Efecto de una opción con la afinidad del dios aplicada. No muta la opción. */
export function applyGodPower(godId: string | undefined, opt: EventOption): PoweredChoice {
  const power = godId ? GOD_POWERS[godId] : undefined
  if (!power) return { fx: opt.fx, note: {}, powerName: null }
  const adj = power.favored.includes(opt.type) ? power.bonus : power.against.includes(opt.type) ? power.penalty : null
  if (!adj) return { fx: opt.fx, note: {}, powerName: null }
  const fx: Partial<Stats> = { ...opt.fx }
  for (const k of Object.keys(adj) as (keyof Stats)[]) fx[k] = (fx[k] ?? 0) + (adj[k] ?? 0)
  return { fx, note: adj, powerName: power.name }
}
