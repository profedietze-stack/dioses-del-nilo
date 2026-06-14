import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Stats } from '../../types'
import { ADVISORS, getAdvisorAdvice } from '../../data/advisors'
import { Tooltip } from './Tooltip'

interface Props {
  stats: Stats
  eventCat: string
}

const STAT_ORDER = ['estabilidad', 'riqueza', 'cultura', 'influencia'] as const

export function AdvisorPanel({ stats, eventCat }: Props) {
  const [open, setOpen] = useState<string | null>(null)

  const advisorData = STAT_ORDER.map(stat => {
    const adv = ADVISORS[stat]
    const { line, urgency } = getAdvisorAdvice(adv, stats[stat], eventCat)
    return { adv, line, urgency }
  })

  const hasAlert = advisorData.some(d => d.urgency !== 'normal')

  return (
    <div className="adv-panel">
      <div className="adv-panel-header">
        <span className="adv-panel-title">𓆣 Consejeros</span>
        {hasAlert && <span className="adv-panel-alert">¡Tienen algo que decirte!</span>}
      </div>
      <div className="adv-chips">
        {advisorData.map(({ adv, line, urgency }) => {
          const isOpen = open === adv.id
          return (
            <div key={adv.id} className="adv-chip-wrap">
              <Tooltip text={`${adv.name} · ${adv.title}`} pos="top">
              <button
                className={`adv-chip urgency-${urgency}${isOpen ? ' open' : ''}`}
                style={{ '--acol': adv.color } as React.CSSProperties}
                onClick={() => setOpen(isOpen ? null : adv.id)}
              >
                <span className="adv-chip-icon">{adv.icon}</span>
                <span className="adv-chip-name">{adv.name}</span>
                {urgency !== 'normal' && (
                  <span className={`adv-pulse pulse-${urgency}`} />
                )}
              </button>
              </Tooltip>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="adv-bubble"
                    style={{ '--acol': adv.color } as React.CSSProperties}
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="adv-bubble-hd">
                      <span className="adv-bubble-icon">{adv.icon}</span>
                      <div>
                        <strong>{adv.name}</strong>
                        <span className="adv-bubble-title">{adv.title}</span>
                      </div>
                      {urgency !== 'normal' && (
                        <span className={`adv-urgency-tag tag-${urgency}`}>
                          {urgency === 'critical' ? '⚠ URGENTE' : '! Atención'}
                        </span>
                      )}
                    </div>
                    <p className="adv-bubble-line">"{line}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
