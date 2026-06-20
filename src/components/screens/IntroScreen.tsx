import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS, STAT_DESC } from '../../data/periods'
import { ADVISORS } from '../../data/advisors'

// ── PYRAMID TIER DATA ────────────────────────────────────────────────────────
interface TierData {
  id: string
  icon: string
  title: string
  short: string
  long: string
  color: string
}

const PYRAMID_TIERS: TierData[] = [
  {
    id: 'faraon',
    icon: '𓃭',
    title: 'El Faraón',
    short: 'Dios en la Tierra. Rey absoluto.',
    long: 'El faraón era considerado la encarnación del dios Horus en vida y de Osiris tras la muerte. Su autoridad era absoluta e incuestionable: comandaba el ejército, controlaba las riquezas del reino y era el único intermediario entre los dioses y los hombres.\n\nSu deber sagrado era mantener la Maat — el orden cósmico que equilibraba la justicia, la verdad y la armonía del universo. Si la Maat se rompía (hambrunas, guerras, caos), se culpaba al faraón por no haber cumplido su rol divino.\n\nPortaba la doble corona del Alto y el Bajo Egipto. Sus titulares incluían cinco nombres sagrados, entre ellos el cartucho real, considerado mágicamente protector.',
    color: '#D4A017',
  },
  {
    id: 'visir',
    icon: '𓀭',
    title: 'El Visir',
    short: 'Primer ministro del Imperio.',
    long: 'El visir (tjati) era el funcionario más poderoso después del faraón. Supervisaba todos los aspectos del gobierno: la justicia, el sistema de impuestos, los proyectos de construcción, la administración de tierras y el comercio exterior.\n\nA menudo había dos visires: uno para el Alto Egipto y otro para el Bajo Egipto. Era el último juez en disputas civiles y penales, y reportaba directamente al faraón cada amanecer.\n\nEl cargo era hereditario en algunas dinastías, pero en otras el faraón elegía personalmente a un hombre de confianza. Figuras como Imhotep (arquitecto de Djoser) y Rekhmire (bajo Tutmosis III) son los visires más célebres de la historia.',
    color: '#a87d3e',
  },
  {
    id: 'sacerdote',
    icon: '𓂀',
    title: 'Sumo Sacerdote',
    short: 'Controlaba templos y riquezas divinas.',
    long: 'Los sacerdotes egipcios no eran predicadores espirituales como en las religiones modernas: eran administradores del dios residente en el templo. El Sumo Sacerdote era el custodio de la estatua sagrada, responsable de alimentarla, vestirla y "activarla" en rituales diarios.\n\nCon el tiempo, los templos acumularon enormes propiedades: tierras, ganado, barcos y talleres. El Sumo Sacerdote de Amón en Tebas llegó a controlar el 30% de las tierras cultivables de Egipto, convirtiéndose en un poder rival del faraón.\n\nDurante el Tercer Período Intermedio, los sacerdotes de Amón gobernaron el Alto Egipto como faraones de facto, mostrando hasta qué punto el clero podía concentrar poder político.',
    color: '#7a5c99',
  },
  {
    id: 'escribas',
    icon: '📜',
    title: 'Escribas y Funcionarios',
    short: 'Los administradores del Imperio.',
    long: 'Los escribas eran la clase media intelectual del antiguo Egipto. Aprendían a leer y escribir desde niños en las "escuelas de escribas" (casas de vida). Dominaban los tres sistemas de escritura: jeroglífico (monumental), hierático (administrativo) y demótico (popular).\n\nSus funciones eran esenciales: registraban los censos y cosechas, calculaban impuestos, redactaban contratos y cartas, llevaban las cuentas de los templos y los palacios, y organizaban expediciones militares y comerciales.\n\nSer escriba era el camino de ascenso social más seguro. Un campesino inteligente podía llegar a funcionario del Estado gracias a esta habilidad. Los textos de la época los describen como "privilegiados" que no sudaban bajo el sol ni cargaban piedras.',
    color: '#4a7a5c',
  },
  {
    id: 'campesinos',
    icon: '🌾',
    title: 'Campesinos y Artesanos',
    short: 'La base que sostuvo todo el sistema.',
    long: 'Los campesinos (fellahin) constituían el 80–90% de la población egipcia. Cultivaban trigo, cebada, lino y papiro en las orillas del Nilo aprovechando el limo negro de las inundaciones anuales. Pagaban impuestos en especie — grano, aceite, tela — que abastecían los graneros estatales.\n\nDurante la temporada de inundación, cuando los campos estaban anegados, el Estado los empleaba en la construcción de monumentos. Las pirámides no fueron construidas por esclavos: investigaciones modernas demuestran que eran trabajadores pagados que recibían raciones de pan, cerveza y atención médica.\n\nLos artesanos (carpinteros, orfebres, alfareros, tejedores) formaban una categoría ligeramente superior. Los más hábiles trabajaban en los talleres reales o en el pueblo de Deir el-Medina, comunidad especializada en construir las tumbas del Valle de los Reyes.',
    color: '#5a8a30',
  },
  {
    id: 'esclavos',
    icon: '⛓️',
    title: 'Esclavos y Prisioneros',
    short: 'Prisioneros de guerra y deudores.',
    long: 'La esclavitud en el antiguo Egipto era diferente a la esclavitud moderna. Los esclavos eran principalmente prisioneros de guerra capturados en campañas contra Nubia, Canán o Libia. También podían ser egipcios que caían en esclavitud por deudas impagables o como castigo por ciertos crímenes.\n\nTrabajaban en minas, canteras, construcciones monumentales y hogares de nobles. Sin embargo, en Egipto los esclavos podían poseer propiedades, casarse con personas libres e incluso comprar su propia libertad. Algunos llegaron a ocupar posiciones de confianza en las casas de sus dueños.\n\nRamsés II capturó miles de hititas y nubios tras sus campañas; muchos fueron integrados al ejército egipcio o asignados a los templos como mano de obra especializada. La esclavitud masiva al estilo romano nunca fue característica del sistema egipcio.',
    color: '#5a2e0a',
  },
]

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

const TOTAL = 6

export function IntroScreen({ onFinish, playerName }: Props) {
  const [step, setStep]             = useState(0)
  const [dir, setDir]               = useState(1)
  const [activeRegion, setActive]   = useState<string | null>(null)
  const [tierModal, setTierModal]   = useState<TierData | null>(null)
  const [mapImgErr, setMapImgErr]   = useState(false)

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
                {mapImgErr
                  ? <EgyptMap interactive={false} active={null} onClick={() => {}} />
                  : <img
                      src="/images/mapa-egipto.jpg"
                      alt="Mapa del Imperio Egipcio"
                      className="intro-map-img"
                      onError={() => setMapImgErr(true)}
                    />
                }
              </div>
              <div className="intro-text-col intro-text-col--center">
                <h1 className="intro-game-title">𓆣 Dioses del Nilo</h1>
                {playerName && <p className="intro-pharaoh-greet">El Nilo te convoca, <strong>{playerName}</strong>.</p>}
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

          {/* 1 — El Ka Eterno: rol del jugador */}
          {step === 1 && (
            <motion.div key="s1" className="intro-slide intro-slide--ka"
              custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <div className="intro-ka-symbol">𓇳</div>
              <h2 className="intro-heading">Tú eres el Ka Eterno</h2>
              <p className="intro-lead">
                No eres un faraón mortal. Eres algo más antiguo — y más poderoso.
              </p>
              <div className="intro-ka-body">
                <div className="intro-ka-block">
                  <span className="intro-ka-ico">𓃭</span>
                  <div>
                    <strong>El Ka: la fuerza divina</strong>
                    <p>Para los egipcios, el Ka era la energía vital que el dios Jnum insufla en cada ser al nacer. En el faraón, el Ka no era humano — era la chispa de Horus, el dios del cielo encarnado en la tierra.</p>
                  </div>
                </div>
                <div className="intro-ka-block">
                  <span className="intro-ka-ico">🌊</span>
                  <div>
                    <strong>Eterno como el Nilo</strong>
                    <p>Cuando un faraón moría, su Ka no desaparecía: pasaba al siguiente. Tú eres ese Ka — la voluntad divina que guió a Egipto durante más de 3.000 años, a través de cada dinastía, cada crisis y cada gloria.</p>
                  </div>
                </div>
                <div className="intro-ka-block">
                  <span className="intro-ka-ico">⚖️</span>
                  <div>
                    <strong>Tu misión: mantener la Maat</strong>
                    <p>La Maat era el orden cósmico — la balanza entre caos y armonía. Tu deber no es solo gobernar: es sostener ese equilibrio frágil entre los dioses, el pueblo y las fuerzas de la naturaleza.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2 — Nacimiento de la civilización */}
          {step === 2 && (
            <motion.div key="s2" className="intro-slide"
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

          {/* 3 — El sistema del faraón */}
          {step === 3 && (
            <motion.div key="s3b" className="intro-slide"
              custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <h2 className="intro-heading">El Sistema del Faraón</h2>
              <p className="intro-lead">El poder en Egipto funcionaba como una pirámide social. <span className="intro-tap-hint">Tocá cada nivel para aprender más.</span></p>
              <div className="intro-hier">
                {PYRAMID_TIERS.slice(0, 1).map(t => (
                  <div key={t.id} className="ihr-tier ihr-tier--1">
                    <button className="ihr-card ihr-gold ihr-apex ihr-clickable" onClick={() => setTierModal(t)}>
                      <span>{t.icon}</span>
                      <strong>{t.title}</strong>
                      <small>{t.short}</small>
                      <span className="ihr-tap">👆 más info</span>
                    </button>
                  </div>
                ))}
                <div className="ihr-tier ihr-tier--2">
                  {PYRAMID_TIERS.slice(1, 3).map(t => (
                    <button key={t.id} className="ihr-card ihr-clickable" onClick={() => setTierModal(t)}>
                      <span>{t.icon}</span>
                      <strong>{t.title}</strong>
                      <small>{t.short}</small>
                      <span className="ihr-tap">👆 más info</span>
                    </button>
                  ))}
                </div>
                <div className="ihr-tier ihr-tier--3">
                  <button className="ihr-card ihr-dim ihr-clickable" onClick={() => setTierModal(PYRAMID_TIERS[3])}>
                    <span>{PYRAMID_TIERS[3].icon}</span>
                    <strong>{PYRAMID_TIERS[3].title}</strong>
                    <small>{PYRAMID_TIERS[3].short}</small>
                    <span className="ihr-tap">👆 más info</span>
                  </button>
                </div>
                <div className="ihr-tier ihr-tier--4">
                  <button className="ihr-card ihr-dim ihr-clickable" onClick={() => setTierModal(PYRAMID_TIERS[4])}>
                    <span>{PYRAMID_TIERS[4].icon}</span>
                    <strong>{PYRAMID_TIERS[4].title}</strong>
                    <small>{PYRAMID_TIERS[4].short}</small>
                    <span className="ihr-tap">👆 más info</span>
                  </button>
                </div>
                <div className="ihr-tier ihr-tier--5">
                  <button className="ihr-card ihr-dim ihr-base ihr-clickable" onClick={() => setTierModal(PYRAMID_TIERS[5])}>
                    <span>{PYRAMID_TIERS[5].icon}</span>
                    <strong>{PYRAMID_TIERS[5].title}</strong>
                    <small>{PYRAMID_TIERS[5].short}</small>
                    <span className="ihr-tap">👆 más info</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4 — Mapa interactivo */}
          {step === 4 && (
            <motion.div key="s4b" className="intro-slide intro-slide--map"
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

          {/* 5 — Tutorial stats + consejeros */}
          {step === 5 && (
            <motion.div key="s5" className="intro-slide"
              custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <h2 className="intro-heading">Tu Imperio, Tus Decisiones</h2>
              <p className="intro-lead">Seis métricas miden el estado de tu gobierno:</p>
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
                <span className="intro-adv-lbl">Seis consejeros te guiarán durante el juego:</span>
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

      {/* ── TIER MODAL ── */}
      <AnimatePresence>
        {tierModal && (
          <motion.div
            className="tier-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setTierModal(null)}
          >
            <motion.div
              className="tier-modal"
              style={{ '--tc': tierModal.color } as React.CSSProperties}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="tier-modal-ico">{tierModal.icon}</div>
              <h3 className="tier-modal-title">{tierModal.title}</h3>
              <div className="tier-modal-body">
                {tierModal.long.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <button className="btn-o" style={{ marginTop: 18, width: '100%' }} onClick={() => setTierModal(null)}>
                Cerrar ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
