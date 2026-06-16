import { useState } from 'react'
import type { Stats, Screen } from '../../types'
import type { God } from '../../types'

export interface DebugActions {
  evIdx: number
  totalEvents: number
  stats: Stats
  god: God | null
  screen: Screen
  setEvIdx: (n: number) => void
  setStats: (s: Stats) => void
  setScreen: (s: Screen) => void
  skipEvent: () => void
  triggerPeriodTransition: (fromPeriodIdx: number) => void
}

export function DebugPanel({ actions }: { actions: DebugActions }) {
  const [open, setOpen] = useState(false)
  const { evIdx, totalEvents, stats, god, screen, setEvIdx, setStats, setScreen, skipEvent, triggerPeriodTransition } = actions

  if (!import.meta.env.DEV) return null

  const STAT_KEYS = ['estabilidad', 'riqueza', 'cultura', 'influencia'] as const

  return (
    <div className="dbg-wrap">
      <button className="dbg-toggle" onClick={() => setOpen(o => !o)} title="Shift+D">
        {open ? '✕' : '🐛'}
      </button>
      {open && (
        <div className="dbg-panel">
          <div className="dbg-info">
            <span>🎮 {god?.name ?? '—'}</span>
            <span>📺 {screen}</span>
          </div>

          <div className="dbg-section">
            <div className="dbg-section-lbl">Evento <span className="dbg-val">{evIdx}/{totalEvents}</span></div>
            <input
              type="range" min={0} max={totalEvents - 1} value={evIdx}
              onChange={e => setEvIdx(Number(e.target.value))}
            />
          </div>

          <div className="dbg-section">
            <div className="dbg-section-lbl">Stats</div>
            {STAT_KEYS.map(k => (
              <div key={k} className="dbg-stat-row">
                <span className="dbg-stat-lbl">{k.slice(0, 3)}</span>
                <input
                  type="range" min={0} max={100} value={stats[k]}
                  onChange={e => setStats({ ...stats, [k]: Number(e.target.value) })}
                />
                <span className="dbg-val">{stats[k]}</span>
              </div>
            ))}
          </div>

          <div className="dbg-section">
            <div className="dbg-section-lbl">Acciones</div>
            <div className="dbg-btns">
              <button onClick={skipEvent} title="Shift+→">⏩ Skip ev.</button>
              <button onClick={() => triggerPeriodTransition(0)}>P1→P2</button>
              <button onClick={() => triggerPeriodTransition(1)}>P2→P3</button>
              <button onClick={() => triggerPeriodTransition(2)}>P3→P4</button>
              <button onClick={() => setScreen('periodTransition' as Screen)}>→ Transición</button>
              <button onClick={() => setScreen('end')}>→ End</button>
              <button onClick={() => setScreen('menu')}>→ Menú</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
