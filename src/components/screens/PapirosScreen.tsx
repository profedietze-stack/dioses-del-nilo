import { useState } from 'react'
import { Tooltip } from '../ui/Tooltip'
import { motion } from 'framer-motion'
import type { God, Stats, HistoryEntry } from '../../types'
import { ACHIEVEMENTS } from '../../data/achievements'
import { EVENTS } from '../../data/events'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS } from '../../data/periods'
import { GLOSSARY } from '../../data/glossary'

const CAT_ICONS: Record<string, string> = {
  egipcio:  '𓆣',
  historia: '📜',
  economia: '💰',
  religion: '𓂀',
  ciencia:  '🔬',
  sociedad: '🤝',
}
const CAT_NAMES: Record<string, string> = {
  egipcio:  'Egipcio',
  historia: 'Historia',
  economia: 'Economía',
  religion: 'Religión',
  ciencia:  'Ciencia',
  sociedad: 'Sociedad',
}
const ALL_CATS = ['egipcio', 'historia', 'economia', 'religion', 'ciencia', 'sociedad'] as const

interface Props {
  achievements: string[]
  history: HistoryEntry[]
  god: God | null
  stats: Stats | null
  startTime: number
  onBack: () => void
}

export function PapirosScreen({ achievements, history, god, stats, startTime, onBack }: Props) {
  const [tab, setTab] = useState<'logros' | 'stats' | 'historial' | 'glosario'>('logros')
  const [glossCat, setGlossCat] = useState<string>('todos')
  const filteredGloss = GLOSSARY
    .filter(e => glossCat === 'todos' || e.cat === glossCat)
    .sort((a, b) => a.word.localeCompare(b.word, 'es'))
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
        {(['logros', 'stats', 'historial', 'glosario'] as const).map(t => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'logros' ? 'Logros' : t === 'stats' ? 'Stats' : t === 'historial' ? 'Historial' : '𓆣 Glosario'}
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

      {tab === 'glosario' && (
        <div className="gloss-tab">
          <div className="gloss-cats">
            <button className={`gloss-cat-btn${glossCat === 'todos' ? ' active' : ''}`} onClick={() => setGlossCat('todos')}>
              📚 Todos ({GLOSSARY.length})
            </button>
            {ALL_CATS.map(c => (
              <button key={c} className={`gloss-cat-btn${glossCat === c ? ' active' : ''}`} onClick={() => setGlossCat(c)}>
                {CAT_ICONS[c]} {CAT_NAMES[c]}
              </button>
            ))}
          </div>
          <div className="gloss-entries">
            {filteredGloss.map(e => (
              <div key={e.word} className="gloss-entry">
                <div className="gloss-entry-hd">
                  <span className="gloss-entry-word">{e.word}</span>
                  <span className="gloss-entry-cat">{CAT_ICONS[e.cat]} {CAT_NAMES[e.cat]}</span>
                </div>
                <p className="gloss-entry-def">{e.def}</p>
              </div>
            ))}
          </div>
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
