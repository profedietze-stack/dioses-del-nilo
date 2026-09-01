import { useCallback, useEffect, useRef } from 'react'
import type { GameEvent, Stats, Screen, PeriodTransitionData, EventOption } from '../types'
import { PERIODS } from '../data/periods'
import { PLAY_STYLES, PERIOD_LORE, getLegacyVerdict } from '../data/periodLore'

interface DevToolsArgs {
  gameEvents: GameEvent[]
  evIdx: number
  stats: Stats
  totalEvents: number
  handleChoice: (opt: EventOption) => void
  setPeriodTransData: (d: PeriodTransitionData) => void
  setScreen: (s: Screen) => void
}

/**
 * DEV-only debugging helpers: skip events, force period transitions, and
 * keyboard shortcuts (Shift+→ to skip, Shift+P to trigger a transition).
 * No-ops in production builds.
 */
export function useDevTools(args: DevToolsArgs) {
  const ref = useRef(args)
  ref.current = args

  const skipEvent = useCallback(() => {
    if (!import.meta.env.DEV) return
    const { gameEvents, evIdx, handleChoice } = ref.current
    const ev = gameEvents[evIdx]
    if (!ev) return
    const opt = ev.opts[Math.floor(Math.random() * ev.opts.length)]
    if (opt) handleChoice(opt)
  }, [])

  const triggerPeriodTransition = useCallback((fromPeriodIdx: number) => {
    if (!import.meta.env.DEV) return
    const fromPeriod = PERIODS[fromPeriodIdx]
    const toPeriod   = PERIODS[Math.min(PERIODS.length - 1, fromPeriodIdx + 1)]
    if (!fromPeriod) return
    const { stats, setPeriodTransData, setScreen } = ref.current
    const lore    = PERIOD_LORE[fromPeriod.id]
    const verdict = getLegacyVerdict(stats)
    setPeriodTransData({ fromPeriod, toPeriod, statsAtEnd: stats, playStyle: PLAY_STYLES.default, lore, verdict })
    setScreen('periodTransition')
  }, [])

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const handler = (e: KeyboardEvent) => {
      if (!e.shiftKey) return
      if (e.key === 'ArrowRight') { e.preventDefault(); skipEvent() }
      if (e.key === 'P') {
        e.preventDefault()
        const { evIdx, totalEvents } = ref.current
        triggerPeriodTransition(Math.min(PERIODS.length - 2, Math.floor(evIdx / (totalEvents / PERIODS.length))))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [skipEvent, triggerPeriodTransition])

  return { skipEvent, triggerPeriodTransition }
}
