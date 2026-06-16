import { motion } from 'framer-motion'
import type { Advisor, Urgency } from '../../data/advisors'

interface Props {
  advisor: Advisor
  advice: string
  urgency: Urgency
  onClose: () => void
}

export function AdvisorModal({ advisor, advice, urgency, onClose }: Props) {
  const urgencyLabel =
    urgency === 'critical' ? '⚠ SITUACIÓN CRÍTICA' :
    urgency === 'warning'  ? '! ATENCIÓN REQUERIDA' : null

  return (
    <motion.div
      className="advm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="advm-card"
        style={{ '--advm-col': advisor.color } as React.CSSProperties}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="advm-header">
          <span className="advm-icon">{advisor.icon}</span>
          <div className="advm-header-text">
            <strong className="advm-name">{advisor.name}</strong>
            <span className="advm-title">{advisor.title}</span>
          </div>
          <div className="advm-bar" />
        </div>

        {urgencyLabel && (
          <div className={`advm-urgency advm-urgency--${urgency}`}>
            {urgencyLabel}
          </div>
        )}

        <p className="advm-advice">"{advice}"</p>

        <button className="btn-g advm-btn" onClick={onClose}>
          Entendido →
        </button>
      </motion.div>
    </motion.div>
  )
}
