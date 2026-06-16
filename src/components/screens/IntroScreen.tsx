import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS, STAT_DESC } from '../../data/periods'
import { ADVISORS } from '../../data/advisors'

// ── MAP DATA ─────────────────────────────────────────────────────────────────
interface Region {
  id: string
  name: string
  icon: string
  info: string
  path: string
  fill: string
  labelX: number
  labelY: number
}

const REGIONS: Region[] = [
  {
    id: 'mediterraneo',
    name: 'Mar Mediterráneo',
    icon: '🌊',
    info: 'Principal ruta de comercio con Grecia, Fenicia y Roma. El delta del Nilo desembocaba aquí creando puertos naturales que enriquecieron el Imperio durante siglos.',
    path: 'M 0,0 L 260,0 L 260,30 L 0,30 Z',
    fill: '#1a5f8a',
    labelX: 130, labelY: 18,
  },
  {
    id: 'delta',
    name: 'Delta del Nilo',
    icon: '🌿',
    info: 'La tierra más fértil de Egipto. El Nilo se divide en múltiples brazos antes de llegar al mar. Aquí estaba el Bajo Egipto, representado por la corona roja del faraón.',
    path: 'M 72,30 L 188,30 L 154,88 L 106,88 Z',
    fill: '#2d6e1a',
    labelX: 130, labelY: 63,
  },
  {
    id: 'oeste',
    name: 'Desierto Occidental',
    icon: '🏜️',
    info: 'El Gran Mar de Arena, parte del Sahara. Protegía a Egipto de invasiones por el oeste. Los oasis de Siwa y Bahariya eran vitales para caravanas comerciales que cruzaban el interior de África.',
    path: 'M 0,30 L 72,30 L 106,88 L 110,290 L 0,290 Z',
    fill: '#9e7520',
    labelX: 33, labelY: 178,
  },
  {
    id: 'nilo',
    name: 'Valle del Nilo',
    icon: '𓇋',
    info: 'El corazón del Imperio. El Nilo inundaba cada año dejando limo negro fertilísimo en sus orillas. El Alto Egipto se extendía aquí: Tebas (hoy Luxor) fue su gran capital durante siglos.',
    path: 'M 106,88 L 154,88 L 150,290 L 110,290 Z',
    fill: '#2d6e1a',
    labelX: 130, labelY: 195,
  },
  {
    id: 'este',
    name: 'Desierto Oriental y Sinaí',
    icon: '⛏️',
    info: 'Rico en oro, granito y cobre. Las expediciones mineras cruzaban este desierto hacia el Mar Rojo y la Península del Sinaí — puerta de entrada hacia Canán y el Medio Oriente.',
    path: 'M 188,30 L 260,30 L 260,290 L 150,290 L 154,88 Z',
    fill: '#8a6020',
    labelX: 217, labelY: 178,
  },
  {
    id: 'nubia',
    name: 'Nubia',
    icon: '👑',
    info: 'Al sur de la primera catarata del Nilo. Fuente de oro, ébano, marfil e incienso. A veces aliada y a veces conquistada por Egipto, en el Período Tardío tuvo sus propios faraones (Dinastía XXV).',
    path: 'M 0,290 L 260,290 L 250,340 L 10,340 Z',
    fill: '#5a2e0a',
    labelX: 130, labelY: 318,
  },
]

// ── SLIDE ANIM ────────────────────────────────────────────────────────────────
const variants = {
  enter:  (d: number) => ({ opacity: 0, x: d * 48 }),
  center: { opacity: 1, x: 0 },
  exit:   (d: number) => ({ opacity: 0, x: d * -48 }),
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
interface Props { onFinish: () => void; playerName?: string }

const TOTAL = 5

export function IntroScreen({ onFinish, playerName }: Props) {
  const [step, setStep]             = useState(0)
  const [dir, setDir]               = useState(1)
  const [activeRegion, setActive]   = useState<string | null>(null)

  const go = (next: number) => {
    setDir(next > step ? 1 : -1)
    setActive(null)
    setStep(next)
  }

  const region = REGIONS.find(r => r.id === activeRegion)
  const advisors = Object.values(ADVISORS)

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <button className="intro-skip" onClick={onFinish}>Saltar intro ›</button>

      {/* ── SLIDES ── */}
      <div className="intro-body">
        <AnimatePresence mode="wait" custom={dir}>

          {/* 0 — Mapa realista + título */}
          {step === 0 && (
            <motion.div key="s0" className="intro-slide intro-slide--hero intro-slide--hero-v"
              custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <div className="intro-map-img-wrap">
                <img
                  src="/images/mapa-egipto.jpg"
                  alt="Mapa del Imperio Egipcio"
                  className="intro-map-img"
                />
              </div>
              <div className="intro-text-col intro-text-col--center">
                <h1 className="intro-game-title">𓆣 Dioses del Nilo</h1>
                {playerName && <p className="intro-pharaoh-greet">El Imperio te aguarda, Faraón <strong>{playerName}</strong>.</p>}
                <div className="intro-facts-row">
                  <div className="intro-fact-box">
                    <span className="ifb-ico">📍</span>
                    <p>Egipto ocupa el noreste de África. Sin el Nilo, todo sería desierto. Con él, floreció durante <strong>más de 3.000 años</strong>.</p>
                  </div>
                  <div className="intro-fact-box">
                    <span className="ifb-ico">🕰️</span>
                    <p>En este juego gobernarás cuatro períodos históricos, desde el <strong>Antiguo Imperio</strong> (3100 a.C.) hasta el <strong>Período Tardío</strong> (332 a.C.).</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 1 — Nacimiento de la civilización */}
          {step === 1 && (
            <motion.div key="s1" className="intro-slide"
              custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <h2 className="intro-heading">Hace 5.000 años...</h2>
              <p className="intro-lead">Tres fuerzas crearon la civilización más longeva de la historia:</p>
              <div className="intro-panels">
                <div className="intro-panel">
                  <span className="intro-panel-ico">🌊</span>
                  <strong>La Inundación</strong>
                  <p>Cada año el Nilo inundaba sus orillas. Al bajar las aguas dejaba <em>limo negro</em>: el suelo más fértil del mundo antiguo.</p>
                </div>
                <div className="intro-panel">
                  <span className="intro-panel-ico">🌾</span>
                  <strong>El Excedente</strong>
                  <p>Gracias a esa fertilidad, los egipcios producían más alimento del que necesitaban. Ese excedente permitió construir ciudades, ejércitos y monumentos.</p>
                </div>
                <div className="intro-panel">
                  <span className="intro-panel-ico">𓃭</span>
                  <strong>La Unificación</strong>
                  <p>Alrededor del 3100 a.C., el Rey Narmer unió el Alto y el Bajo Egipto bajo una sola corona. Nació el Imperio Egipcio.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2 — El sistema del faraón */}
          {step === 2 && (
            <motion.div key="s2" className="intro-slide"
              custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <h2 className="intro-heading">El Sistema del Faraón</h2>
              <p className="intro-lead">El poder en Egipto funcionaba como una pirámide social:</p>
              <div className="intro-hier">
                {/* Tier 1 — apex */}
                <div className="ihr-tier ihr-tier--1">
                  <div className="ihr-card ihr-gold ihr-apex">
                    <span>𓃭</span>
                    <strong>El Faraón</strong>
                    <small>Dios en la Tierra. Rey absoluto. Responsable de mantener la Maat: el orden del universo.</small>
                  </div>
                </div>
                {/* Tier 2 */}
                <div className="ihr-tier ihr-tier--2">
                  <div className="ihr-card">
                    <span>𓀭</span>
                    <strong>El Visir</strong>
                    <small>Primer ministro. Administraba justicia y coordinaba el Imperio en nombre del faraón.</small>
                  </div>
                  <div className="ihr-card">
                    <span>𓂀</span>
                    <strong>Sumo Sacerdote</strong>
                    <small>Controlaba los templos y sus enormes riquezas. Interpretaba la voluntad de los dioses.</small>
                  </div>
                </div>
                {/* Tier 3 */}
                <div className="ihr-tier ihr-tier--3">
                  <div className="ihr-card ihr-dim">
                    <span>📜</span>
                    <strong>Escribas y Funcionarios</strong>
                    <small>Registraban impuestos, contratos y leyes. Eran los administradores del Imperio.</small>
                  </div>
                </div>
                {/* Tier 4 */}
                <div className="ihr-tier ihr-tier--4">
                  <div className="ihr-card ihr-dim">
                    <span>🌾</span>
                    <strong>Campesinos y Artesanos</strong>
                    <small>La mayoría del pueblo. Pagaban impuestos con trabajo y alimento. Sostuvieron todo el sistema.</small>
                  </div>
                </div>
                {/* Tier 5 — base */}
                <div className="ihr-tier ihr-tier--5">
                  <div className="ihr-card ihr-dim ihr-base">
                    <span>⛓️</span>
                    <strong>Esclavos y Prisioneros</strong>
                    <small>Prisioneros de guerra y deudores. Trabajaban en construcciones, minas y labores domésticas.</small>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3 — Mapa interactivo */}
          {step === 3 && (
            <motion.div key="s3" className="intro-slide intro-slide--map"
              custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <h2 className="intro-heading">Conocé el Imperio</h2>
              <p className="intro-map-hint">Hacé click en cada región para aprender sobre ella.</p>
              <div className="intro-map-row">
                <EgyptMap interactive={true} active={activeRegion} onClick={setActive} />
                <div className="intro-region-panel">
                  <AnimatePresence mode="wait">
                    {region ? (
                      <motion.div key={region.id} className="intro-region-info"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}>
                        <div className="iri-ico">{region.icon}</div>
                        <strong className="iri-name">{region.name}</strong>
                        <p className="iri-text">{region.info}</p>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" className="intro-region-empty"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <span>👆</span>
                        <p>Tocá una región del mapa para descubrir qué papel jugó en la historia del Imperio.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4 — Tutorial stats + consejeros */}
          {step === 4 && (
            <motion.div key="s4" className="intro-slide"
              custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <h2 className="intro-heading">Tu Imperio, Tus Decisiones</h2>
              <p className="intro-lead">Cuatro métricas miden el estado de tu gobierno:</p>
              <div className="intro-stats-grid">
                {(['estabilidad','riqueza','cultura','influencia','fe','comercio'] as const).map(k => (
                  <div key={k} className="ist-card" style={{ '--sc': STAT_COLORS[k] } as React.CSSProperties}>
                    <span className="ist-ico">{STAT_ICONS[k]}</span>
                    <div className="ist-card-text">
                    <strong>{STAT_LABELS[k]}</strong>
                    <p>{STAT_DESC[k]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="intro-adv-row">
                <span className="intro-adv-lbl">Cuatro consejeros te guiarán durante el juego:</span>
                <div className="intro-adv-chips">
                  {advisors.map(adv => (
                    <div key={adv.id} className="intro-adv-chip" style={{ '--ac': adv.color } as React.CSSProperties}>
                      <span>{adv.icon}</span>
                      <span className="iac-name">{adv.name}</span>
                      <span className="iac-title">{adv.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── NAV ── */}
      <div className="intro-nav">
        <div className="intro-dots">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button key={i} className={`idot${step === i ? ' active' : ''}`} onClick={() => go(i)} />
          ))}
        </div>
        <div className="intro-nav-btns">
          {step > 0 && (
            <button className="btn-back" onClick={() => go(step - 1)}>← Anterior</button>
          )}
          <button className="btn-g" onClick={() => step < TOTAL - 1 ? go(step + 1) : onFinish()}>
            {step === TOTAL - 1 ? '¡Elegir mi Dios! →' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── SVG MAP ───────────────────────────────────────────────────────────────────
function EgyptMap({ interactive, active, onClick }: {
  interactive: boolean
  active: string | null
  onClick: (id: string) => void
}) {
  return (
    <svg
      viewBox="0 0 260 340"
      className={`egypt-svg${interactive ? ' egypt-svg--i' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {REGIONS.map(r => (
        <path
          key={r.id}
          d={r.path}
          fill={r.fill}
          opacity={interactive && active && active !== r.id ? 0.45 : 0.9}
          stroke={active === r.id ? '#D4A017' : '#1a1208'}
          strokeWidth={active === r.id ? 2 : 0.8}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            transition: 'opacity 0.2s, stroke-width 0.15s',
          }}
          onClick={() => interactive && onClick(r.id)}
        />
      ))}

      {/* Nile river */}
      <motion.path
        d="M 130,0 C 129,14 131,22 130,30 C 128,48 133,68 130,88 C 127,118 124,158 127,198 C 129,238 125,268 124,290 L 123,340"
        stroke="#4EADD4"
        strokeWidth={interactive ? 4 : 3}
        fill="none"
        opacity={0.88}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Labels */}
      {!interactive && REGIONS.map(r => (
        <text
          key={r.id + 'l'}
          x={r.labelX} y={r.labelY}
          textAnchor="middle"
          fontSize="7.5"
          fill="rgba(255,255,255,0.88)"
          fontFamily="Crimson Pro, serif"
          fontWeight="600"
          style={{ pointerEvents: 'none' }}
        >
          {r.name}
        </text>
      ))}

      {/* Interactive: emoji icons */}
      {interactive && REGIONS.map(r => (
        <text
          key={r.id + 'i'}
          x={r.labelX} y={r.labelY + 6}
          textAnchor="middle"
          fontSize="16"
          style={{ pointerEvents: 'none' }}
        >
          {r.icon}
        </text>
      ))}
    </svg>
  )
}
