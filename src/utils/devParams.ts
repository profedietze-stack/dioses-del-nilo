import type { Stats } from '../types'

export interface DevParams {
  godId?: string
  evIdx?: number
  screen?: string
  stats?: Partial<Stats>
}

export function parseDevParams(): DevParams | null {
  if (!import.meta.env.DEV) return null
  const p = new URLSearchParams(window.location.search)
  if (!p.size) return null

  const stats: Partial<Stats> = {}
  if (p.has('estabilidad')) stats.estabilidad = Number(p.get('estabilidad'))
  if (p.has('riqueza'))     stats.riqueza     = Number(p.get('riqueza'))
  if (p.has('cultura'))     stats.cultura     = Number(p.get('cultura'))
  if (p.has('influencia'))  stats.influencia  = Number(p.get('influencia'))

  return {
    godId:  p.get('godId')  ?? undefined,
    evIdx:  p.has('evIdx')  ? Number(p.get('evIdx')) : undefined,
    screen: p.get('screen') ?? undefined,
    stats:  Object.keys(stats).length ? stats : undefined,
  }
}
