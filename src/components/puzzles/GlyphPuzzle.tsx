import { useState, useEffect } from 'react'
import type { PuzzleDef, Glyph } from '../../types'

interface Props {
  puz: PuzzleDef
  onDone: (ok: boolean, statDelta: number) => void
}

export function GlyphPuzzle({ puz, onDone }: Props) {
  const [glyphs] = useState<Glyph[]>(() => [...(puz.glyphs ?? [])].sort(() => Math.random() - 0.5))
  const [clicked, setClicked] = useState<Set<number>>(new Set())
  const [time, setTime] = useState(puz.timeLimit ?? 40)
  const [ended, setEnded] = useState(false)
  const [tooltip, setTooltip] = useState<Glyph | null>(puz.glyphs?.[0] ?? null)
  const [statDelta, setStatDelta] = useState(0)
  const [doneCalled, setDoneCalled] = useState(false)

  useEffect(() => {
    if (ended) return
    const t = setInterval(() => setTime(p => { if (p <= 1) { setEnded(true); return 0 } return p - 1 }), 1000)
    return () => clearInterval(t)
  }, [ended])

  useEffect(() => {
    if (!ended || doneCalled) return
    setDoneCalled(true)
    const egyptians = glyphs.filter(g => g.c)
    const nonEgyptians = glyphs.filter(g => !g.c)
    let delta = 0
    egyptians.forEach(g => { const i = glyphs.indexOf(g); if (clicked.has(i)) delta += 1; else delta -= 1 })
    nonEgyptians.forEach(g => { const i = glyphs.indexOf(g); if (clicked.has(i)) delta -= 2 })
    setStatDelta(Math.max(-8, Math.min(8, delta)))
  }, [ended, doneCalled, glyphs, clicked])

  const toggle = (i: number) => {
    if (ended) return
    setClicked(p => { const s = new Set(p); s.has(i) ? s.delete(i) : s.add(i); return s })
  }

  const egyptians = glyphs.filter(g => g.c)
  const hits = egyptians.filter(g => clicked.has(glyphs.indexOf(g))).length
  const falsePositives = glyphs.filter(g => !g.c && clicked.has(glyphs.indexOf(g))).length
  const score = egyptians.length > 0
    ? Math.max(0, Math.round(((hits - falsePositives) / egyptians.length) * 100))
    : 0
  const target = puz.target ?? 60

  const getGlyphState = (g: Glyph, i: number) => {
    if (!ended) return clicked.has(i) ? 'sel' : ''
    if (g.c && clicked.has(i)) return 'ok'
    if (!g.c && clicked.has(i)) return 'fail'
    if (g.c && !clicked.has(i)) return 'missed'
    return 'neutral'
  }

  return (
    <div className="puz">
      <div className="puz-ico">𓆣</div>
      <h3>JEROGLÍFICOS SAGRADOS</h3>
      <p className="puz-q">Seleccioná solo los <strong>jeroglíficos egipcios</strong>. Evitá los símbolos de otras culturas.</p>
      {!ended && <div className="puz-timer">⏱ {time}s</div>}
      {tooltip && (
        <div className="glyph-tooltip">
          <strong>{tooltip.lbl}</strong><br />
          <span>{tooltip.desc}</span>
        </div>
      )}
      <div className="glyph-grid">
        {glyphs.map((g, i) => (
          <button
            key={i}
            className={`glyph-btn ${getGlyphState(g, i)}`}
            onClick={() => toggle(i)}
            onMouseEnter={() => setTooltip(g)}
          >
            {g.s}
          </button>
        ))}
      </div>
      {!ended && (
        <div className="puz-score">Seleccionados: {clicked.size} / Jeroglíficos egipcios: {egyptians.length}</div>
      )}
      {!ended && (
        <button className="btn-g" style={{ marginTop: 12 }} onClick={() => setEnded(true)}>
          Confirmar selección
        </button>
      )}
      {ended && (
        <div className="glyph-feedback">
          <div className={`puz-res ${score >= target ? 'ok' : 'fail'}`}>
            {score >= target ? `✓ ¡Bien hecho! ${score}% de acierto` : `✗ ${score}% de acierto — seguí practicando`}
          </div>
          <div className="stat-impact" style={{ color: statDelta >= 0 ? '#6fcf74' : '#e07060' }}>
            Impacto en stats: {statDelta >= 0 ? '+' : ''}{statDelta} puntos
          </div>
          <div className="glyph-legend">
            <span className="legend-item ok">✓ Jeroglífico egipcio seleccionado</span>
            <span className="legend-item missed">○ Jeroglífico egipcio no seleccionado</span>
            <span className="legend-item fail">✗ Símbolo de otra cultura seleccionado</span>
            <span className="legend-item neutral">— Símbolo ajeno correctamente ignorado</span>
          </div>
          <div className="glyph-review">
            {glyphs.map((g, i) => (
              <div key={i} className={`glyph-review-item ${getGlyphState(g, i)}`}>
                <span className="glyph-review-sym">{g.s}</span>
                <div>
                  <strong>{g.lbl}</strong>
                  <p>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="btn-g"
            style={{ marginTop: 16, width: '100%' }}
            onClick={() => onDone(score >= target, statDelta)}
          >
            Continuar →
          </button>
        </div>
      )}
    </div>
  )
}
