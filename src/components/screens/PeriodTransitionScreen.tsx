import { motion } from 'framer-motion'
import { ADVISORS } from '../../data/advisors'
import { ADVISOR_PERIOD_LINES } from '../../data/periodLore'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS } from '../../data/periods'
import type { PeriodTransitionData } from '../../types'

const section = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
}
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

interface Props {
  data: PeriodTransitionData
  onContinue: () => void
}

export function PeriodTransitionScreen({ data, onContinue }: Props) {
  const { fromPeriod, toPeriod, statsAtEnd, playStyle, lore, verdict } = data
  const advisors = Object.values(ADVISORS)

  return (
    <motion.div
      className="pt-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── HEADER ── */}
      <div className="pt-header" style={{ '--pcol': fromPeriod.col } as React.CSSProperties}>
        <div className="pt-header-glyphs">𓂀 𓆣 𓇋 𓏏 𓆑</div>
        <p className="pt-label">— Fin del Período —</p>
        <h1 className="pt-period-name">{fromPeriod.name}</h1>
        <p className="pt-dates">{fromPeriod.dates}</p>
        <p className="pt-summary">{lore.summary}</p>
      </div>

      <motion.div className="pt-body" variants={container} initial="hidden" animate="show">

        {/* ── D: CARTA DE LEGADO ── */}
        <motion.section className="pt-section" variants={section}>
          <div className="pt-section-label">𓏏 Tu Legado</div>
          <div className="pt-legacy-card" style={{ '--vcol': verdict.color } as React.CSSProperties}>
            <div className="ptlc-verdict">{verdict.verdict}</div>
            <p className="ptlc-desc">{verdict.desc}</p>
            <div className="ptlc-stats">
              {(Object.entries(statsAtEnd) as [string, number][]).map(([k, v]) => (
                <div key={k} className="ptlc-stat">
                  <span className="ptlc-stat-ico">{STAT_ICONS[k]}</span>
                  <span className="ptlc-stat-lbl">{STAT_LABELS[k]}</span>
                  <div className="ptlc-bar">
                    <motion.div
                      className="ptlc-bar-fill"
                      style={{ background: STAT_COLORS[k] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${v}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </div>
                  <span className="ptlc-stat-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── A: ESTILO DE GOBIERNO ── */}
        <motion.section className="pt-section" variants={section}>
          <div className="pt-section-label">𓃭 Estilo de Gobierno</div>
          <div className="pt-playstyle">
            <span className="pt-ps-icon">{playStyle.icon}</span>
            <div>
              <strong className="pt-ps-title">{playStyle.title}</strong>
              <p className="pt-ps-desc">{playStyle.desc}</p>
            </div>
          </div>
        </motion.section>

        {/* ── ADVISOR COMMENTS ── */}
        <motion.section className="pt-section" variants={section}>
          <div className="pt-section-label">𓀭 Tus Consejeros Reflexionan</div>
          <div className="pt-advisors">
            {advisors.map(adv => {
              const statVal = statsAtEnd[adv.stat]
              const level: 'high' | 'low' | 'neutral' =
                statVal >= 60 ? 'high' : statVal < 35 ? 'low' : 'neutral'
              const lines = ADVISOR_PERIOD_LINES[adv.id]?.[level] ?? []
              const line = lines[Math.floor(Math.random() * lines.length)] ?? '...'
              return (
                <div key={adv.id} className="pt-adv-card"
                  style={{ '--ac': adv.color } as React.CSSProperties}>
                  <div className="pt-adv-hd">
                    <span className="pt-adv-ico">{adv.icon}</span>
                    <div>
                      <strong className="pt-adv-name">{adv.name}</strong>
                      <span className="pt-adv-title">{adv.title}</span>
                    </div>
                    <span className="pt-adv-val" style={{ color: statVal >= 60 ? '#6fcf74' : statVal < 35 ? '#E8543A' : '#A0906A' }}>
                      {STAT_ICONS[adv.stat]} {statVal}
                    </span>
                  </div>
                  <p className="pt-adv-line">"{line}"</p>
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* ── B: HECHO HISTÓRICO ── */}
        <motion.section className="pt-section" variants={section}>
          <div className="pt-section-label">𓇯 {lore.factTitle}</div>
          <div className="pt-fact-box">
            <p>{lore.historicalFact}</p>
          </div>
          <div className="pt-achievement">
            <div className="pt-ach-label">{lore.achievementTitle}</div>
            <p>{lore.achievement}</p>
          </div>
        </motion.section>

        {/* ── C: AUGURIO ── */}
        <motion.section className="pt-section pt-section--augurio" variants={section}>
          <div className="pt-section-label">𓂀 El Oráculo Habla</div>
          <blockquote className="pt-augurio">
            <span className="pt-augurio-ico">𓆣</span>
            <p>{lore.augurio}</p>
          </blockquote>
        </motion.section>

        {/* ── PRÓXIMO PERÍODO ── */}
        {toPeriod && lore.nextPeriodIntro && (
          <motion.section className="pt-section pt-section--next" variants={section}
            style={{ '--ncol': toPeriod.col } as React.CSSProperties}>
            <div className="pt-section-label">⟶ El Horizonte Llama</div>
            <div className="pt-next-period">
              <div className="pt-next-hd">
                <strong className="pt-next-name">{lore.nextPeriodName}</strong>
                <span className="pt-next-dates">{toPeriod.dates}</span>
              </div>
              <p className="pt-next-intro">{lore.nextPeriodIntro}</p>
              {lore.nextChallenges.length > 0 && (
                <div className="pt-challenges">
                  <div className="pt-ch-label">Desafíos que enfrentarás:</div>
                  <ul className="pt-ch-list">
                    {lore.nextChallenges.map((ch, i) => (
                      <li key={i}>{ch}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* ── CTA ── */}
        <motion.div className="pt-cta" variants={section}>
          <button className="btn-g pt-btn" onClick={onContinue}>
            {toPeriod ? `Comenzar el ${lore.nextPeriodName} →` : 'Ver mi Legado Final →'}
          </button>
        </motion.div>

      </motion.div>
    </motion.div>
  )
}
