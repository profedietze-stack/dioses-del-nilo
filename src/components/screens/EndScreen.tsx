import { motion } from 'framer-motion'
import type { God, Stats } from '../../types'
import { ACHIEVEMENTS } from '../../data/achievements'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS } from '../../data/periods'

interface Props {
  stats: Stats
  achievements: string[]
  god: God | null
  startTime: number
  onNew: () => void
  onMenu: () => void
}

const GOD_TITLES: Record<string, string[]> = {
  ra:      ['Llama Efímera', 'Portador del Disco', 'Sacerdote del Alba', 'Faraón del Sol Naciente', 'Ra Encarnado'],
  osiris:  ['Alma Perdida', 'Guardián de Semillas', 'Señor de la Cosecha', 'Resucitado de Duat', 'Osiris Viviente'],
  thoth:   ['Escriba Novato', 'Lector de Papiros', 'Guardián del Saber', 'Maestro de Jeroglifos', 'Thoth Encarnado'],
  horus:   ['Halcón Caído', 'Guerrero del Delta', 'Señor de Batalla', 'Ojo del Cielo', 'Horus Invicto'],
  hathor:  ['Alma en Disonancia', 'Portadora de Armonía', 'Señora del Amor', 'Diosa de Dos Tierras', 'Hathor Radiante'],
  sekhmet: ['Leona Dormida', 'Garra del Desierto', 'Llama de Guerra', 'Señora del Poder', 'Sekhmet Desatada'],
  anubis:  ['Alma sin Guía', 'Pesador de Corazones', 'Señor del Umbral', 'Custodio de Duat', 'Anubis Eterno'],
  bastet:  ['Gato sin Hogar', 'Protectora del Umbral', 'Guardiana del Nilo', 'Señora de las Dos Tierras', 'Bastet Inmortal'],
}

const QUOTES = [
  '"El desierto no perdona la ignorancia, pero da una nueva oportunidad al que aprende." — Proverbio del Nilo',
  '"Cada caída del Nilo trae consigo nueva vida. También tú puedes comenzar de nuevo." — Sabiduría de Ptah',
  '"El equilibrio de Maat no se alcanza en un día; se construye decisión a decisión." — Libro de los Muertos',
  '"El escriba que conoce la historia no repite sus errores. Tú has aprendido." — Papiro de Ani',
  '"Como Ra que renace cada amanecer, tu nombre quedará grabado en el cartucho de la memoria." — Textos de las Pirámides',
]

const PRIZES = [
  { ico: '🏺', name: 'Vasija de Barro', desc: 'Una humilde vasija del Nilo. Sigue practicando.' },
  { ico: '𓏏', name: 'Tablilla de Escriba', desc: 'Una tablilla de arcilla donde registrar tus primeros aprendizajes.' },
  { ico: '📜', name: 'Papiro Sagrado', desc: 'Un papiro con fragmentos del Libro de los Muertos.' },
  { ico: '𓋹', name: 'Ankh de Plata', desc: 'La cruz de la vida en plata. Símbolo de tu progreso en el camino divino.' },
  { ico: '👑', name: 'Corona del Faraón', desc: 'La doble corona del Alto y Bajo Egipto. El Imperio te reconoce.' },
]

export function EndScreen({ stats, achievements, god, startTime, onNew, onMenu }: Props) {
  const score = Object.values(stats).reduce((a, b) => a + b, 0)
  const maxScore = 400
  const pct = Math.round((score / maxScore) * 100)
  const tier = pct > 85 ? 4 : pct > 70 ? 3 : pct > 50 ? 2 : pct > 30 ? 1 : 0
  const godId = god?.id ?? 'ra'
  const godTitle = (GOD_TITLES[godId] ?? GOD_TITLES.ra)[tier]
  const quote = QUOTES[tier]
  const prize = PRIZES[tier]
  const unlockedAch = ACHIEVEMENTS.filter(a => achievements.includes(a.id))
  const playMins = Math.floor((Date.now() - startTime) / 60000)

  return (
    <motion.div
      className="end"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="end-header">
        <div className="end-g">𓆣</div>
        <h2 className="end-title">El Imperio ha hablado</h2>
        <div className="end-god-row">
          <span className="end-god-icon">{god?.icon}</span>
          <div>
            <div className="end-god-name">{god?.name}</div>
            <div className="end-god-title-lbl">Encarnación divina</div>
          </div>
        </div>
        <div className="end-divine-title">{godTitle}</div>
        <div className="end-quote">{quote}</div>
      </div>

      <div className="end-body">
        <div className="end-col">
          <h3 className="end-section-title">📊 Legado del Imperio</h3>
          <div className="end-score-big">
            <span className="end-score-num">{score}</span>
            <span className="end-score-max"> / {maxScore}</span>
            <div className="end-score-bar">
              <motion.div
                className="end-score-fill"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
            <div className="end-score-pct">{pct}% de legado</div>
          </div>
          <div className="end-stats">
            {Object.entries(stats).map(([k, v]) => (
              <div key={k} className="end-stat">
                <span>{STAT_ICONS[k]} {STAT_LABELS[k]}</span>
                <div className="mini"><motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }} style={{ height: '100%', borderRadius: 3, background: STAT_COLORS[k] }} /></div>
                <span style={{ color: STAT_COLORS[k], fontFamily: "'Cinzel',serif", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="end-meta">
            <span>⏱ {playMins} min de juego</span>
            <span>🧩 {achievements.length} logros</span>
          </div>
          <div className="end-prize">
            <div className="end-prize-ico">{prize.ico}</div>
            <div>
              <strong>{prize.name}</strong>
              <p>{prize.desc}</p>
            </div>
          </div>
        </div>

        <div className="end-col">
          <h3 className="end-section-title">📜 Logros Conseguidos</h3>
          {unlockedAch.length === 0 ? (
            <p className="empty" style={{ padding: '20px 0' }}>Ningún logro desbloqueado. ¡Intentalo de nuevo!</p>
          ) : (
            <div className="end-ach-list">
              {unlockedAch.map(a => (
                <div key={a.id} className={`end-ach-item type-${a.type}`}>
                  <span className="end-ach-ico">{a.ico}</span>
                  <div>
                    <strong>{a.name}</strong>
                    <p>{a.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="end-acts">
        <button className="btn-g" onClick={onNew}>⚡ Nueva Partida</button>
        <button className="btn-o" onClick={onMenu}>🏠 Menú Principal</button>
      </div>
    </motion.div>
  )
}
