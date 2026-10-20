import type { EventOption, GameEvent, GameStats, HistoryEntry, PeriodTransitionData, PuzzleDef, Stats } from '../types'
import { PERIODS } from '../data/periods'
import { PLAY_STYLES, PERIOD_LORE, getLegacyVerdict } from '../data/periodLore'
import { INIT, applyFx, clamp } from './gameLogic'
import { applyGodPower } from './godPowers'

/**
 * La lógica de un turno, sin pantalla: recibe el estado y devuelve el nuevo.
 * `App.tsx` solo la llama y reparte el resultado entre los `useState`, el guardado
 * y los sonidos. Así se puede probar sin navegador.
 */

export const EMPTY_GS: GameStats = { mil: 0, peace: 0, revived: false, stabStr: 0, infMax: 0, cruel: 0 }

export interface EstadoTurno {
  godId?: string
  stats: Stats
  gs: GameStats
  history: HistoryEntry[]
  evIdx: number
  events: GameEvent[]
}

export interface ResultadoTurno {
  fx: Partial<Stats>
  stats: Stats
  gs: GameStats
  history: HistoryEntry[]
  evIdx: number
  /** Era el último evento: la partida termina. */
  fin: boolean
  /** Solo en una decisión común: el poder del dios que se aplicó, si hubo. */
  poder: { name: string; note: Partial<Stats> } | null
  /** Solo en una decisión común: se cruzó el límite entre dos períodos. */
  transicion: PeriodTransitionData | null
}

/** Rachas y marcas que miran los logros: «sin pérdidas», «resucitó», «influencia máxima». */
function seguirRachas(gs: GameStats, antes: Stats, fx: Partial<Stats>, despues: Stats): GameStats {
  const n = { ...gs }
  const estabaBajo = Object.values(antes).some(v => v <= 5)
  if (estabaBajo && Object.values(despues).every(v => v >= 50)) n.revived = true
  const sinPerdida = Object.values(fx).every(v => (v ?? 0) >= 0)
  n.stabStr = sinPerdida ? n.stabStr + 1 : 0
  n.infMax = Math.max(n.infMax, despues.influencia)
  return n
}

/** Si entre `desde` y `hasta` se pasó al período siguiente, arma los datos de la pantalla de transición. */
export function cruceDePeriodo(
  events: GameEvent[], history: HistoryEntry[], desde: number, hasta: number, stats: Stats,
): PeriodTransitionData | null {
  const porPeriodo = events.length / 4
  const pDesde = Math.floor(desde / porPeriodo)
  const pHasta = Math.floor(hasta / porPeriodo)
  if (!(pHasta > pDesde && pDesde < 3)) return null
  const fromPeriod = PERIODS[pDesde]
  const toPeriod = PERIODS[Math.min(3, pHasta)]
  const delPeriodo = history.slice(Math.round(pDesde * porPeriodo))
  const conteo: Record<string, number> = {}
  for (const entry of delPeriodo) {
    const ev = events.find(e => e.id === entry.eventId)
    const op = ev?.opts.find(o => o.t === entry.choice)
    if (op) conteo[op.type] = (conteo[op.type] ?? 0) + 1
  }
  const dominante = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'default'
  return {
    fromPeriod, toPeriod, statsAtEnd: stats,
    playStyle: PLAY_STYLES[dominante] ?? PLAY_STYLES.default,
    lore: PERIOD_LORE[fromPeriod.id],
    verdict: getLegacyVerdict(stats),
  }
}

/** El alumno eligió una opción. La afinidad del dios se suma acá: el resto ve el efecto final. */
export function resolverDecision(e: EstadoTurno, opt: EventOption): ResultadoTurno {
  const powered = applyGodPower(e.godId, opt)
  const fx = powered.fx
  const stats = applyFx(e.stats, fx)
  const ev = e.events[e.evIdx]
  const gs = seguirRachas(e.gs, e.stats, fx, stats)
  if (opt.type === 'militar') gs.mil++
  if (['social', 'diplomatico', 'cultural'].includes(opt.type)) gs.peace++
  if (opt.type === 'cruel') gs.cruel++
  const history = [...e.history, { eventId: ev.id, choice: opt.t, effects: fx, statsAfter: stats }]
  const evIdx = e.evIdx + 1
  const fin = evIdx >= e.events.length
  return {
    fx, stats, gs, history, evIdx, fin,
    poder: powered.powerName ? { name: powered.powerName, note: powered.note } : null,
    transicion: fin ? null : cruceDePeriodo(e.events, history, e.evIdx, evIdx, stats),
  }
}

/** Suma los efectos de la bendición y de la maldición de una coronación, sin ceros. */
export function combinarFx(a: Partial<Stats>, b: Partial<Stats>): Partial<Stats> {
  const out: Partial<Stats> = {}
  for (const k of Object.keys(INIT) as (keyof Stats)[]) {
    const v = (a[k] ?? 0) + (b[k] ?? 0)
    if (v !== 0) out[k] = v
  }
  return out
}

/** Terminó una coronación: no cuenta como militar/pacífica/cruel, pero sí mueve las rachas. */
export function resolverCoronacion(e: EstadoTurno, bendicion: Partial<Stats>, maldicion: Partial<Stats>): ResultadoTurno {
  const fx = combinarFx(bendicion, maldicion)
  const stats = applyFx(e.stats, fx)
  const ev = e.events[e.evIdx]
  const history = [...e.history, { eventId: ev.id, choice: 'pharaoh_event', effects: fx, statsAfter: stats }]
  const evIdx = e.evIdx + 1
  return {
    fx, stats, gs: seguirRachas(e.gs, e.stats, fx, stats), history, evIdx,
    fin: evIdx >= e.events.length, poder: null, transicion: null,
  }
}

/** Efecto de un puzzle sobre las barras: `statKeys` fija cuáles; sin eso, el delta se reparte en dos. */
export function aplicarPuzzle(stats: Stats, def: Pick<PuzzleDef, 'statKeys'>, delta: number): Stats {
  if (delta === 0) return stats
  const keys = def.statKeys ?? (Object.keys(INIT) as (keyof Stats)[])
  const porBarra = def.statKeys ? delta : Math.round(delta / 2)
  const n = { ...stats }
  for (const k of keys) n[k] = clamp(n[k] + porBarra)
  return n
}
