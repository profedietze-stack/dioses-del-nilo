import type { Stats } from '../types'

export const INIT: Stats = { estabilidad: 50, riqueza: 50, cultura: 50, influencia: 50, fe: 50, comercio: 50 }

// Ojo con el NaN: `Math.max(0, Math.min(100, NaN))` devuelve NaN, porque las dos
// comparaciones con NaN son falsas y se cuela por el medio. Con una sola estadistica
// en NaN —basta con un guardado editado donde venga como texto— el promedio, el
// puntaje y el ancho de las barras se vuelven NaN, y `getDivineTitle` falla todas sus
// comparaciones y cae al ultimo titulo: el alumno termina de «Iniciado del Templo»
// sin importar como haya jugado, sin un solo error en consola.
export const clamp = (v: number): number => {
  const n = Number(v)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, n))
}

export function applyFx(stats: Stats, fx: Partial<Stats>): Stats {
  const n = { ...stats }
  for (const k in fx) {
    const key = k as keyof Stats
    const base = Number(n[key])
    n[key] = clamp((Number.isFinite(base) ? base : 50) + (Number(fx[key]) || 0))
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
