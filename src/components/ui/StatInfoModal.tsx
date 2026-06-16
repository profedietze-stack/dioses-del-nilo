import { motion } from 'framer-motion'
import type { StatKey } from '../../types'
import { STAT_ICONS, STAT_LABELS, STAT_DESC, STAT_TIPS, STAT_COLORS } from '../../data/periods'

interface Props {
  statKey: StatKey
  onClose: () => void
}

export function StatInfoModal({ statKey, onClose }: Props) {
  const icon = STAT_ICONS[statKey]
  const label = STAT_LABELS[statKey]
  const desc = STAT_DESC[statKey]
  const tips = STAT_TIPS[statKey] ?? []
  const color = STAT_COLORS[statKey]

  return (
    <motion.div
      className="si-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="si-card"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        style={{ '--si-col': color } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >
        <div className="si-header">
          <span className="si-icon">{icon}</span>
          <strong className="si-name">{label}</strong>
          <div className="si-bar" />
        </div>

        <p className="si-desc">{desc}</p>

        <div className="si-tips">
          <div className="si-tips-lbl">💡 Consejos</div>
          <ul className="si-tips-list">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        <button className="btn-g si-btn" onClick={onClose}>
          Entendido →
        </button>
      </motion.div>
    </motion.div>
  )
}
