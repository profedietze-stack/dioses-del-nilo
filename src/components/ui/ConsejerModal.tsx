import { motion } from 'framer-motion'
import type { Stats, StatKey } from '../../types'
import { STAT_ICONS, STAT_LABELS } from '../../data/periods'
import { pickAdvisors, getAdvisorLine } from '../../data/advisors'

interface Props {
  choice: string
  fx: Partial<Stats>
  onContinue: () => void
}

export function ConsejerModal({ choice, fx, onContinue }: Props) {
  const affected = (Object.entries(fx) as [StatKey, number][]).filter(([, v]) => v !== 0)
  const [a1, a2] = pickAdvisors(fx)

  const a1stat = affected.find(([k]) => k === a1.stat)?.[1] ?? 0
  const a2stat = affected.find(([k]) => k === a2.stat)?.[1] ?? 0
  const a1line = getAdvisorLine(a1, a1stat)
  const a2line = getAdvisorLine(a2, a2stat)

  return (
    <motion.div
      className="cmod-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onContinue}
    >
      <motion.div
        className="cmod"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="cmod-header">
          <span className="cmod-label">Tus consejeros hablan</span>
          <div className="cmod-choice">"{choice}"</div>
        </div>

        <div className="cmod-fx">
          {affected.map(([k, v]) => (
            <div key={k} className="cmod-fx-row">
              <span className="cmod-fx-stat">{STAT_ICONS[k]} {STAT_LABELS[k]}</span>
              <span className={`fx ${v > 0 ? 'pos' : 'neg'}`} style={{ fontSize: '.9rem', padding: '2px 10px' }}>
                {v > 0 ? '+' : ''}{v}
              </span>
            </div>
          ))}
        </div>

        <div className="cmod-advisors">
          {[{ adv: a1, val: a1stat, line: a1line }, { adv: a2, val: a2stat, line: a2line }].map(({ adv, line }) => (
            <div key={adv.id} className="cmod-advisor" style={{ '--acol': adv.color } as React.CSSProperties}>
              <div className="cmod-adv-icon">{adv.icon}</div>
              <div className="cmod-adv-body">
                <div className="cmod-adv-name">
                  <strong>{adv.name}</strong>
                  <span className="cmod-adv-title">{adv.title}</span>
                </div>
                <p className="cmod-adv-line">"{line}"</p>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-g" style={{ width: '100%', marginTop: 4 }} onClick={onContinue}>
          Continuar →
        </button>
      </motion.div>
    </motion.div>
  )
}
