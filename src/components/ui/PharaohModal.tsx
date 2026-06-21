import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PharaohData, PharaohBlessing, PharaohMission } from '../../data/pharaohs'
import type { Stats } from '../../types'

interface Props {
  pharaoh: PharaohData
  onDone: (blessingFx: Partial<Stats>, missionFx: Partial<Stats>) => void
}

type Step = 'coronation' | 'mission' | 'response'

export function PharaohModal({ pharaoh, onDone }: Props) {
  const [step, setStep]       = useState<Step>('coronation')
  const [blessing, setBlessing] = useState<PharaohBlessing | null>(null)
  const [mission, setMission]   = useState<PharaohMission | null>(null)

  const handleBlessing = (b: PharaohBlessing) => {
    setBlessing(b)
    setStep('mission')
  }

  const handleMission = (m: PharaohMission) => {
    setMission(m)
    setStep('response')
    setTimeout(() => onDone(blessing!.fx, m.fx), 2400)
  }

  return (
    <motion.div
      className="pharaoh-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">

        {/* ── STEP 1: CORONACIÓN ── */}
        {step === 'coronation' && (
          <motion.div key="coronation" className="pharaoh-modal"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.38, ease: 'easeOut' }}>

            <div className="pharaoh-ritual-label">𓇳 El Ka Eterno presencia una coronación</div>

            <p className="pharaoh-ka-text">"{pharaoh.coronationText}"</p>

            <div className="pharaoh-identity">
              <div className="pharaoh-big-icon">{pharaoh.icon}</div>
              <div className="pharaoh-cartouche">
                <span className="pharaoh-cartouche-bar" />
                <span className="pharaoh-name">{pharaoh.name}</span>
                <span className="pharaoh-name-glyph">{pharaoh.nameGlyph}</span>
                <span className="pharaoh-cartouche-bar" />
              </div>
              <div className="pharaoh-meta">
                <span className="pharaoh-dynasty">{pharaoh.dynasty}</span>
                <span className="pharaoh-years">{pharaoh.years}</span>
              </div>
              <p className="pharaoh-title-line">{pharaoh.title}</p>
              <p className="pharaoh-bio">{pharaoh.bio}</p>
            </div>

            <div className="pharaoh-section-title">¿Qué virtud divina insuflarás en este faraón?</div>
            <div className="pharaoh-blessings">
              {pharaoh.blessings.map(b => (
                <button key={b.id} className="pharaoh-blessing-card" onClick={() => handleBlessing(b)}>
                  <span className="pb-icon">{b.icon}</span>
                  <strong className="pb-label">{b.label}</strong>
                  <p className="pb-desc">{b.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: CONSULTA DIVINA ── */}
        {step === 'mission' && blessing && (
          <motion.div key="mission" className="pharaoh-modal"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.38, ease: 'easeOut' }}>

            <div className="pharaoh-ritual-label">𓇳 El Faraón Consulta al Ka Eterno</div>

            <div className="pharaoh-speech-wrap">
              <span className="pharaoh-speech-icon">{pharaoh.icon}</span>
              <blockquote className="pharaoh-speech">"{pharaoh.pharaohGreeting}"</blockquote>
              <span className="pharaoh-speech-name">— {pharaoh.name}</span>
            </div>

            <div className="pharaoh-section-title">¿Qué misión encomendarás a {pharaoh.name}?</div>
            <div className="pharaoh-missions">
              {pharaoh.missions.map(m => (
                <button key={m.id} className="pharaoh-mission-btn" onClick={() => handleMission(m)}>
                  <span className="pm-icon">{m.icon}</span>
                  <div className="pm-text">
                    <strong className="pm-label">{m.label}</strong>
                    <p className="pm-desc">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: RESPUESTA DEL FARAÓN ── */}
        {step === 'response' && mission && (
          <motion.div key="response" className="pharaoh-modal pharaoh-modal--response"
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.32 }}>

            <div className="pharaoh-response-icon">{pharaoh.icon}</div>
            <div className="pharaoh-response-name">{pharaoh.name}</div>

            <blockquote className="pharaoh-speech pharaoh-speech--response">
              "{mission.pharaohResponse}"
            </blockquote>

            <p className="pharaoh-ka-close">
              𓇳 El Ka Eterno acepta las palabras del faraón. El Imperio avanza.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  )
}
