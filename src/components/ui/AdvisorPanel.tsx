import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Stats } from '../../types'
import { ADVISORS, getAdvisorAdvice } from '../../data/advisors'
import { AdvisorModal } from './AdvisorModal'

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
        {advisorData.map(({ adv, urgency }) => (
          <button
            key={adv.id}
            className={`adv-chip urgency-${urgency}`}
            style={{ '--acol': adv.color } as React.CSSProperties}
            onClick={() => setOpen(adv.id)}
            title={`${adv.name} · ${adv.title}`}
          >
            <span className="adv-chip-icon">{adv.icon}</span>
            <span className="adv-chip-name">{adv.name}</span>
            {urgency !== 'normal' && (
              <span className={`adv-pulse pulse-${urgency}`} />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (() => {
          const d = advisorData.find(x => x.adv.id === open)
          if (!d) return null
          return (
            <AdvisorModal
              key="advm"
              advisor={d.adv}
              advice={d.line}
              urgency={d.urgency}
              onClose={() => setOpen(null)}
            />
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
