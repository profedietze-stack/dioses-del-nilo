import { motion } from 'framer-motion'
import type { Stats, StatKey, TimelineCard } from '../../types'
import { STAT_ICONS, STAT_LABELS } from '../../data/periods'
import { pickAdvisors, getAdvisorLine } from '../../data/advisors'
import { useModalA11y } from '../../hooks/useModalA11y'

interface Props {
  choice: string
  fx: Partial<Stats>
  /** Lo que sumó o restó la afinidad del dios en esta decisión, si actuó. */
  power?: { name: string; note: Partial<Stats> } | null
  /** Lo que pasó de verdad. Se muestra acá, después de elegir: antes podía contar el desenlace. */
  card?: TimelineCard
  onContinue: () => void
}

export function ConsejerModal({ choice, fx, power, card, onContinue }: Props) {
  const affected = (Object.entries(fx) as [StatKey, number][]).filter(([, v]) => v !== 0)
  const [a1, a2] = pickAdvisors(fx)

  const a1stat = affected.find(([k]) => k === a1.stat)?.[1] ?? 0
  const a2stat = affected.find(([k]) => k === a2.stat)?.[1] ?? 0
  const a1line = getAdvisorLine(a1, a1stat)
  const a2line = getAdvisorLine(a2, a2stat)
  const { ref, dialogProps } = useModalA11y(onContinue)

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
        ref={ref}
        {...dialogProps}
        aria-label="Tus consejeros hablan"
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

        {power && (
          <div className="cmod-power">
            ✦ {power.name}:{' '}
            {(Object.entries(power.note) as [StatKey, number][]).map(([k, v]) => (
              <span key={k} className={v > 0 ? 'pos' : 'neg'}>{v > 0 ? '+' : ''}{v} {STAT_LABELS[k]} </span>
            ))}
          </div>
        )}

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

        {card && (
          <div className="tl-card">
            <span className="tl-card-ico" aria-hidden="true">📅</span>
            <div>
              <span className="tl-card-lbl">Lo que pasó en realidad</span>
              <strong>{card.date} · {card.ph}</strong>
              <p>{card.ev}</p>
              <em>{card.tip}</em>
            </div>
          </div>
        )}

        <button className="btn-g" style={{ width: '100%', marginTop: 4 }} onClick={onContinue}>
          Continuar →
        </button>
      </motion.div>
    </motion.div>
  )
}
