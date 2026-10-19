import type { GameStats, HistoryEntry, Stats } from '../types'

export interface AchCtx {
  godId?: string
  stats: Stats
  history: HistoryEntry[]
  gs: GameStats
  puzOk: number
  puzFail: number
  puzTotal: number
  elapsedMs: number
}

/**
 * Logros que se ganan por algo que pasa en el camino (una racha, un renacer).
 * Todos los demás hablan del estado «al final» o «terminar con…», y se evalúan
 * recién cuando termina la partida.
 *
 * Antes se evaluaban en cada decisión y no se revocaban: `speedrun` («menos de
 * una hora») y `escriba` («sin perder 2 puzzles») se concedían en la primera
 * decisión a todo el mundo, y «Terminar con Influencia > 68» bastaba con haber
 * cruzado ese número una vez a mitad de partida.
 */
export const DURING_GAME = new Set([
  'tragedia', 'resurrector', 'osiris_renacer', 'ra_fuego', 'horus_vengador', 'bastet_gato',
])

export function evaluateAchievements(ctx: AchCtx, prev: readonly string[], final: boolean): string[] {
  const { godId: gid, stats: ns, history: nh, gs: ngs, puzOk, puzFail, puzTotal, elapsedMs } = ctx
  const vals = Object.values(ns)
  const checks: Record<string, boolean> = {
    escriba: puzFail <= 1,
    conquistador: ns.influencia > 68,
    artesano: ns.cultura > 72,
    mercader: ns.riqueza > 68,
    guardian: ns.estabilidad > 72,
    puzzlemaster: puzFail === 0 && puzOk >= puzTotal,
    speedrun: elapsedMs < 3600000,
    equilibrio: nh.length > 0 && nh.every(h => h.statsAfter && Object.values(h.statsAfter).every(v => v >= 40 && v <= 60)),
    tragedia: ngs.cruel >= 3,
    resurrector: ngs.revived,
    ra_solar: gid === 'ra' && vals.every(v => v > 58),
    ra_fuego: gid === 'ra' && ngs.stabStr >= 10,
    osiris_cosecha: gid === 'osiris' && ns.riqueza > 70 && ns.estabilidad > 68,
    osiris_renacer: gid === 'osiris' && ngs.revived,
    thoth_ibis: gid === 'thoth' && ns.cultura > 75,
    horus_halcon: gid === 'horus' && ns.influencia > 75,
    horus_vengador: gid === 'horus' && ngs.mil >= 5,
    hathor_armonia: gid === 'hathor' && vals.filter(v => v > 62).length >= 2,
    hathor_amor: gid === 'hathor' && nh.length > 0 && ngs.peace / nh.length >= 0.7,
    sekhmet_leona: gid === 'sekhmet' && ns.influencia > 70 && ns.riqueza > 62,
    anubis_guardian: gid === 'anubis' && ns.cultura > 68,
    anubis_guia: gid === 'anubis' && ngs.infMax <= 50,
    bastet_gato: gid === 'bastet' && ngs.stabStr >= 20,
    bastet_gracia: gid === 'bastet' && ns.influencia > 62 && ns.estabilidad > 68,
  }
  const nuevos = Object.entries(checks)
    .filter(([id, ok]) => ok && !prev.includes(id) && (final || DURING_GAME.has(id)))
    .map(([id]) => id)
  return nuevos.length ? [...prev, ...nuevos] : [...prev]
}
