import { motion } from 'framer-motion'
import type { God } from '../../types'

interface Props {
  god: God
  approval: string
  encouragement: string
  fact: string
  onClose: () => void
}

export function GodModal({ god, approval, encouragement, fact, onClose }: Props) {
  return (
    <motion.div
      className="gm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="gm-card"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ '--gcol': god.col } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >
        <div className="gm-header">
          <span className="gm-icon">{god.icon}</span>
          <div className="gm-header-text">
            <strong className="gm-name">{god.name}</strong>
            <span className="gm-title">{god.title}</span>
          </div>
          <div className="gm-header-bar" />
        </div>

        <div className="gm-section">
          <div className="gm-section-lbl">💬 Aprobación</div>
          <p className="gm-text gm-approval">"{approval}"</p>
        </div>

        <div className="gm-section">
          <div className="gm-section-lbl">✨ Aliento</div>
          <p className="gm-text gm-encourage">"{encouragement}"</p>
        </div>

        <div className="gm-section gm-section--fact">
          <div className="gm-section-lbl">📜 ¿Sabías que...?</div>
          <p className="gm-text gm-fact">{fact}</p>
        </div>

        <button className="btn-g gm-btn" onClick={onClose}>
          Continuar →
        </button>
      </motion.div>
    </motion.div>
  )
}
