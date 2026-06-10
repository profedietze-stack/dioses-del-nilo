import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { God } from '../../types'
import { GODS } from '../../data/gods'
import { STAT_ICONS, STAT_LABELS } from '../../data/periods'

interface Props {
  onSelect: (god: God) => void
  onBack: () => void
}

export function GodSelectScreen({ onSelect, onBack }: Props) {
  const [hov, setHov] = useState<God>(GODS[0])

  return (
    <motion.div
      className="god-screen"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <button className="btn-back" onClick={onBack}>← Volver</button>
      <h2 className="sec-title">ELIGE TU DEIDAD</h2>
      <div className="god-layout">
        <div className="god-grid">
          {GODS.map((g, i) => (
            <motion.button
              key={g.id}
              className={`god-card${hov?.id === g.id ? ' sel' : ''}`}
              style={{
                borderColor: hov?.id === g.id ? g.col : undefined,
                borderLeftColor: g.col,
                boxShadow: hov?.id === g.id ? `0 0 20px ${g.col}55` : undefined,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setHov(g)}
              onClick={() => onSelect(g)}
            >
              <span className="god-icon">{g.icon}</span>
              <span className="god-name" style={{ color: g.col }}>{g.name}</span>
              <span className="god-title-sm">{g.title}</span>
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {hov && (
            <motion.div
              key={hov.id}
              className="god-detail"
              style={{ borderColor: hov.col, boxShadow: `0 0 24px ${hov.col}33` }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="gd-icon">{hov.icon}</div>
              <h3 className="gd-name" style={{ color: hov.col }}>{hov.name}</h3>
              <p className="gd-title">{hov.title}</p>
              <p className="gd-desc">{hov.desc}</p>
              <p className="gd-lore"><em>"{hov.lore}"</em></p>
              <div className="bonuses">
                {Object.entries(hov.bon).filter(([, v]) => v !== 0).map(([k, v]) => (
                  <div key={k} className={`btag ${v > 0 ? 'pos' : 'neg'}`}>
                    {STAT_ICONS[k]} {STAT_LABELS[k]}: {v > 0 ? '+' : ''}{v}%
                  </div>
                ))}
              </div>
              <button className="btn-g" style={{ marginTop: 8 }} onClick={() => onSelect(hov)}>
                Encarnar a {hov.name}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
