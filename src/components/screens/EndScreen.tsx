import { motion } from 'framer-motion'
import type { God, Stats } from '../../types'
import { ACHIEVEMENTS } from '../../data/achievements'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS } from '../../data/periods'

interface Props {
  stats: Stats
  achievements: string[]
  god: God | null
  startTime: number
  playerName: string
  onNew: () => void
  onMenu: () => void
}

// ── 10+ universal titles ──────────────────────────────────────────────────────
function assignTitle(stats: Stats, achievements: string[], score: number): string {
  const pct = (score / 600) * 100
  const { estabilidad, riqueza, cultura, influencia, fe, comercio } = stats

  if (pct >= 90)                                       return 'Faraón de los Dos Reinos'
  if (achievements.includes('puzzlemaster') && pct >= 72) return 'El Sabio de Karnak'
  if (achievements.includes('tragedia') && pct >= 50) return 'Señor de Hierro del Desierto'
  if (fe >= 75 && pct >= 65)                          return 'Sumo Sacerdote del Nilo'
  if (comercio >= 75 && pct >= 65)                    return 'Gran Mercader de las Dos Tierras'
  if (cultura >= 75 && pct >= 65)                     return 'Maestro de los Jeroglíficos'
  if (influencia >= 75 && pct >= 60)                  return 'Conquistador del Levante'
  if (estabilidad >= 75 && pct >= 60)                 return 'Guardián de la Maat'
  if (riqueza >= 75 && pct >= 60)                     return 'Señor de los Tesoros de Amón'
  if (pct >= 70)                                       return 'Gran Visir del Imperio'
  if (pct >= 55)                                       return 'Nomarca del Alto Egipto'
  if (pct >= 40)                                       return 'Escriba Real de Menfis'
  if (pct >= 25)                                       return 'Guardián del Templo Menor'
  return 'Iniciado de la Casa de la Vida'
}

// ── Narrative paragraph ───────────────────────────────────────────────────────
function buildNarrative(stats: Stats, achievements: string[], god: God | null, name: string): string {
  const { estabilidad, riqueza, cultura, influencia, fe, comercio } = stats
  const strengths: string[] = []
  const weaknesses: string[] = []

  if (estabilidad >= 65) strengths.push('mantuvo el orden y la paz en todo el Imperio')
  else if (estabilidad < 40) weaknesses.push('el pueblo sufrió bajo la inestabilidad de su reinado')
  if (riqueza >= 65) strengths.push('los graneros y tesoros del faraón jamás estuvieron vacíos')
  else if (riqueza < 40) weaknesses.push('las arcas reales se vieron empobrecidas')
  if (cultura >= 65) strengths.push('escribas y artistas florecieron bajo su patronazgo')
  else if (cultura < 40) weaknesses.push('los saberes del Imperio fueron descuidados')
  if (influencia >= 65) strengths.push('los pueblos vecinos temieron y respetaron su nombre')
  else if (influencia < 40) weaknesses.push('la influencia más allá de las fronteras fue escasa')
  if (fe >= 65) strengths.push('los dioses recibieron sus ofrendas y los templos prosperaron')
  else if (fe < 40) weaknesses.push('la fe del pueblo menguó sin el sostén de los rituales')
  if (comercio >= 65) strengths.push('las rutas de Nubia y el Levante enriquecieron al pueblo')
  else if (comercio < 40) weaknesses.push('el comercio exterior quedó limitado')

  const godName = god?.name ?? 'los dioses'
  let text = `Bajo la protección de ${godName}, el faraón ${name} gobernó el Imperio Egipcio con mano firme. `

  if (strengths.length > 0) {
    text += `Se destacó porque ${strengths.slice(0, 2).join(' y ')}. `
  }
  if (weaknesses.length > 0) {
    text += `Sin embargo, la historia recuerda que ${weaknesses[0]}. `
  }
  if (achievements.includes('equilibrio')) {
    text += 'Los historiadores lo recuerdan como un gobernante equilibrado, fiel a la Maat. '
  } else if (achievements.includes('conquistador')) {
    text += 'Su nombre se grabó en las estelas de conquista a lo largo del Nilo. '
  } else if (achievements.includes('artesano')) {
    text += 'Los monumentos y papiros de su época sobrevivieron hasta nuestros días. '
  }
  text += 'Su cartucho quedará grabado en los muros del templo por la eternidad.'
  return text
}

// ── Component ─────────────────────────────────────────────────────────────────
export function EndScreen({ stats, achievements, god, startTime, playerName, onNew, onMenu }: Props) {
  const score = Object.values(stats).reduce((a, b) => a + b, 0)
  const maxScore = 600
  const pct = Math.round((score / maxScore) * 100)
  const title = assignTitle(stats, achievements, score)
  const narrative = buildNarrative(stats, achievements, god, playerName || 'el Faraón')
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
      {/* Papyrus header */}
      <div className="end-papyrus-hd">
        <div className="end-papyrus-border" />
        <div className="end-pap-glyphs">𓆣 𓇳 𓆣</div>

        <div className="end-god-row">
          <span className="end-god-icon">{god?.icon}</span>
          <div>
            <div className="end-god-name">{god?.name}</div>
            <div className="end-god-title-lbl">Dios Protector</div>
          </div>
        </div>

        <div className="end-divine-title">{title}</div>
        <div className="end-player-name">{playerName}</div>
        <p className="end-narrative">{narrative}</p>
        <div className="end-papyrus-border" />
      </div>

      {/* Score */}
      <div className="end-score-section">
        <h3 className="end-section-title">📊 Legado del Imperio</h3>
        <div className="end-score-big">
          <span className="end-score-num">{score}</span>
          <span className="end-score-max"> / {maxScore}</span>
        </div>
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

      {/* Stats */}
      <div className="end-stats">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="end-stat">
            <span>{STAT_ICONS[k]} {STAT_LABELS[k]}</span>
            <div className="mini">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${v}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                style={{ height: '100%', borderRadius: 3, background: STAT_COLORS[k] }}
              />
            </div>
            <span style={{ color: STAT_COLORS[k], fontFamily: "'Cinzel',serif", fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="end-meta">
        <span>⏱ {playMins} min de juego</span>
        <span>🧩 {achievements.length} logros</span>
      </div>

      {/* Achievements */}
      {unlockedAch.length > 0 && (
        <div className="end-ach-wrap">
          <h3 className="end-section-title">📜 Logros del Reinado</h3>
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
        </div>
      )}

      <div className="end-acts">
        <button className="btn-g" onClick={onNew}>⚡ Nueva Partida</button>
        <button className="btn-o" onClick={onMenu}>🏠 Menú Principal</button>
      </div>
    </motion.div>
  )
}
