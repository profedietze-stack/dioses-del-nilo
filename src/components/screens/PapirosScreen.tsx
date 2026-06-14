import { useState } from 'react'
import { Tooltip } from '../ui/Tooltip'
import { motion } from 'framer-motion'
import type { God, Stats, HistoryEntry } from '../../types'
import { ACHIEVEMENTS } from '../../data/achievements'
import { EVENTS } from '../../data/events'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS } from '../../data/periods'

interface Props {
  achievements: string[]
  history: HistoryEntry[]
  god: God | null
  stats: Stats | null
  startTime: number
  onBack: () => void
}

export function PapirosScreen({ achievements, history, god, stats, startTime, onBack }: Props) {
  const [tab, setTab] = useState<'logros' | 'stats' | 'historial'>('logros')
  const unlocked = ACHIEVEMENTS.filter(a => achievements.includes(a.id))
  const locked = ACHIEVEMENTS.filter(a => !achievements.includes(a.id))
  const mins = Math.floor((Date.now() - startTime) / 60000)

  return (
    <motion.div
      className="papiros"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <button className="btn-back" onClick={onBack}>← Volver</button>
      <h2 className="sec-title">📜 PAPIROS</h2>
      <div className="tabs">
        {(['logros', 'stats', 'historial'] as const).map(t => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'logros' ? 'Logros' : t === 'stats' ? 'Stats' : 'Historial'}
          </button>
        ))}
      </div>

      {tab === 'logros' && (
        <div className="ach-grid">
          {unlocked.map(a => (
            <Tooltip key={a.id} text={a.desc} pos="top" className="tip-block">
              <div className={`ach on ${a.type}`}>
                <span className="ach-ico">{a.ico}</span>
                <div>
                  <strong>{a.name}</strong>
                  <p>{a.title}</p>
                </div>
              </div>
            </Tooltip>
          ))}
          {locked.map(a => (
            <Tooltip key={a.id} text={a.secret ? 'Completá otros logros para descubrir este.' : a.desc} pos="top" className="tip-block">
              <div className={`ach off${a.secret ? ' sec' : ''}`}>
                <span className="ach-ico">🔒</span>
                <div>
                  <strong>{a.secret ? '???' : a.name}</strong>
                  <p>{a.secret ? 'Logro secreto' : a.title}</p>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      )}

      {tab === 'stats' && (
        <div className="sum">
          <div className="sum-row"><span>Dios encarnado</span><strong>{god?.name ?? '—'}</strong></div>
          <div className="sum-row"><span>Tiempo jugado</span><strong>{mins} min</strong></div>
          <div className="sum-row"><span>Eventos completados</span><strong>{history.length}</strong></div>
          <div className="sum-row"><span>Logros</span><strong>{achievements.length} / {ACHIEVEMENTS.length}</strong></div>
          {stats && Object.entries(stats).map(([k, v]) => (
            <div key={k} className="sum-stat">
              <span>{STAT_ICONS[k]} {STAT_LABELS[k]}</span>
              <div className="mini"><div style={{ width: `${v}%`, background: STAT_COLORS[k] }} /></div>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
      )}

      {tab === 'historial' && (
        <div className="hist-list">
          {history.length === 0 && <p className="empty">No hay historial aún.</p>}
          {history.map((item, i) => {
            const ev = EVENTS.find(e => e.id === item.eventId)
            return (
              <div key={i} className="hist-item">
                <span className="hist-n">#{i + 1}</span>
                <div>
                  <strong>{ev?.title}</strong>
                  <p>{item.choice}</p>
                  <div className="hist-fx">
                    {Object.entries(item.effects ?? {}).filter(([, v]) => v !== 0).map(([k, v]) => (
                      <span key={k} className={`fx ${v > 0 ? 'pos' : 'neg'}`}>
                        {STAT_ICONS[k]} {v > 0 ? '+' : ''}{v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
