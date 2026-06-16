import type { Stats } from '../types'

export const INIT: Stats = { estabilidad: 50, riqueza: 50, cultura: 50, influencia: 50, fe: 50, comercio: 50 }

export const clamp = (v: number): number => Math.max(0, Math.min(100, v))

export function applyFx(stats: Stats, fx: Partial<Stats>): Stats {
  const n = { ...stats }
  for (const k in fx) {
    const key = k as keyof Stats
    n[key] = clamp((n[key] ?? 50) + (fx[key] ?? 0))
  }
  return n
}

export function calcScore(stats: Stats, puzOk: number, puzFail: number): number {
  const vals = Object.values(stats)
  const statAvg = vals.reduce((a, b) => a + b, 0) / vals.length
  const puzBonus = puzOk * 3 - puzFail * 2
  return Math.round(statAvg + puzBonus)
}

export function getDivineTitle(score: number): string {
  if (score >= 80) return 'Faraón de los Dos Reinos'
  if (score >= 65) return 'Gran Visir del Imperio'
  if (score >= 50) return 'Nomarca del Delta'
  if (score >= 35) return 'Escriba Real'
  return 'Iniciado del Templo'
}
