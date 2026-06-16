import { useState, useEffect, useRef, useCallback } from 'react'
import type { PuzzleDef } from '../../types'
import { dealMaatCards, type MaatCard } from '../../data/maatCards'

interface Props {
  puz: PuzzleDef
  onDone: (ok: boolean, statDelta: number) => void
}

type Placement = { card: MaatCard; target: 'heart' | 'feather' }

const HEART_START = 73
const FEATHER_START = 50

export function MaatScale({ puz, onDone }: Props) {
  const [hand] = useState<MaatCard[]>(() => dealMaatCards(puz.cardCount ?? 8))
  const [placements, setPlacements] = useState<Placement[]>([])
  const [time, setTime] = useState(puz.timeLimit ?? 60)
  const [ended, setEnded] = useState(false)
  const [statDelta, setStatDelta] = useState(0)
  const [dragOver, setDragOver] = useState<'heart' | 'feather' | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  // touch drag ghost
  const ghostRef = useRef<HTMLDivElement | null>(null)
  const touchCardRef = useRef<MaatCard | null>(null)
  const heartZoneRef = useRef<HTMLDivElement>(null)
  const featherZoneRef = useRef<HTMLDivElement>(null)
  const doneCalled = useRef(false)

  const heartNet = HEART_START + placements.filter(p => p.target === 'heart').reduce((s, p) => s + p.card.weight, 0)
  const featherNet = FEATHER_START + placements.filter(p => p.target === 'feather').reduce((s, p) => s + p.card.weight, 0)
  const diff = Math.abs(heartNet - featherNet)
  const tiltDeg = Math.max(-20, Math.min(20, (heartNet - featherNet) * 0.5))
  const placed = new Set(placements.map(p => p.card.id))
  const remaining = hand.filter(c => !placed.has(c.id))

  useEffect(() => {
    if (ended) return
    const t = setInterval(() => setTime(p => {
      if (p <= 1) { setEnded(true); return 0 }
      return p - 1
    }), 1000)
    return () => clearInterval(t)
  }, [ended])

  useEffect(() => {
    if (!ended || doneCalled.current) return
    doneCalled.current = true
    let delta: number
    if (diff === 0)       delta = 12
    else if (diff <= 3)   delta = 9
    else if (diff <= 7)   delta = 6
    else if (diff <= 12)  delta = 3
    else if (diff <= 18)  delta = 0
    else if (diff <= 25)  delta = -4
    else                  delta = -8
    setStatDelta(delta)
  }, [ended, diff])

  const placeCard = useCallback((card: MaatCard, target: 'heart' | 'feather') => {
    setPlacements(p => [...p, { card, target }])
  }, [])

  const unplace = (cardId: string) => {
    if (ended) return
    setPlacements(p => p.filter(x => x.card.id !== cardId))
  }

  // ── HTML5 drag (desktop) ──────────────────────────────────────────────────
  const onDragStart = (e: React.DragEvent, card: MaatCard) => {
    e.dataTransfer.setData('cardId', card.id)
    setDraggingId(card.id)
  }
  const onDragEnd = () => { setDraggingId(null); setDragOver(null) }

  const onDrop = (e: React.DragEvent, target: 'heart' | 'feather') => {
    e.preventDefault()
    const id = e.dataTransfer.getData('cardId')
    const card = hand.find(c => c.id === id)
    if (card && !placed.has(card.id)) placeCard(card, target)
    setDragOver(null)
    setDraggingId(null)
  }

  // ── Touch drag (mobile) ───────────────────────────────────────────────────
  const createGhost = (card: MaatCard, x: number, y: number) => {
    const ghost = document.createElement('div')
    ghost.style.cssText = `
      position: fixed; z-index: 9999; pointer-events: none;
      background: rgba(124,77,255,.9); color: #fff;
      border: 2px solid #b39dff; border-radius: 10px;
      padding: 8px 14px; font-size: 14px; font-weight: 600;
      transform: translate(-50%, -50%) scale(1.1);
      transition: none; white-space: nowrap;
      left: ${x}px; top: ${y}px;
    `
    ghost.textContent = `${card.icon} ${card.label}`
    document.body.appendChild(ghost)
    ghostRef.current = ghost
  }

  const onTouchStart = (e: React.TouchEvent, card: MaatCard) => {
    if (ended) return
    e.preventDefault()
    touchCardRef.current = card
    setDraggingId(card.id)
    const t = e.touches[0]
    createGhost(card, t.clientX, t.clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!ghostRef.current) return
    e.preventDefault()
    const t = e.touches[0]
    ghostRef.current.style.left = `${t.clientX}px`
    ghostRef.current.style.top = `${t.clientY}px`

    // highlight drop zone
    const el = document.elementFromPoint(t.clientX, t.clientY)
    if (heartZoneRef.current?.contains(el as Node)) setDragOver('heart')
    else if (featherZoneRef.current?.contains(el as Node)) setDragOver('feather')
    else setDragOver(null)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (ghostRef.current) { ghostRef.current.remove(); ghostRef.current = null }
    const t = e.changedTouches[0]
    const el = document.elementFromPoint(t.clientX, t.clientY)
    const card = touchCardRef.current
    if (card && !placed.has(card.id)) {
      if (heartZoneRef.current?.contains(el as Node)) placeCard(card, 'heart')
      else if (featherZoneRef.current?.contains(el as Node)) placeCard(card, 'feather')
    }
    touchCardRef.current = null
    setDraggingId(null)
    setDragOver(null)
  }

  const confirm = () => setEnded(true)
  const allPlaced = remaining.length === 0
  const timerColor = time <= 10 ? '#D85A30' : time <= 20 ? '#BA7517' : 'var(--color-text-secondary)'

  const dropZoneStyle = (side: 'heart' | 'feather') => ({
    outline: dragOver === side ? '2px dashed var(--gold)' : '2px dashed transparent',
    background: dragOver === side ? 'rgba(212,160,23,.1)' : undefined,
    transition: 'outline .15s, background .15s',
  })

  return (
    <div className="puz">
      <div className="puz-ico">⚖️</div>
      <h3>BALANZA DE MAAT</h3>
      <p className="puz-hint">Arrastrá cada ficha al plato del corazón o de la pluma para alcanzar el equilibrio sagrado.</p>

      {!ended && (
        <div className="maat-timer" style={{ color: timerColor }}>⏱ {time}s</div>
      )}

      {/* Scale SVG */}
      <div className="maat-scale-wrap">
        <svg viewBox="0 0 320 160" className="maat-svg">
          <line x1="160" y1="12" x2="160" y2="45" stroke="var(--color-text-secondary)" strokeWidth="2"/>
          <circle cx="160" cy="10" r="4" fill="var(--color-text-secondary)"/>
          <g style={{ transformOrigin: '160px 45px', transform: `rotate(${tiltDeg}deg)`, transition: 'transform 0.6s ease' }}>
            <line x1="40" y1="45" x2="280" y2="45" stroke="var(--color-text-primary)" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="160" cy="45" r="5" fill="var(--color-text-primary)"/>
            <line x1="60" y1="45" x2="60" y2="70" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeDasharray="3,2"/>
            <line x1="260" y1="45" x2="260" y2="70" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeDasharray="3,2"/>
            <rect x="25" y="70" width="70" height="60" rx="4" fill="var(--color-background-secondary)" stroke="var(--color-border-secondary)" strokeWidth="0.5"/>
            <text x="60" y="100" textAnchor="middle" fontSize="28">🫀</text>
            <text x="60" y="124" textAnchor="middle" fontSize="11" fill="var(--color-text-secondary)">Corazón</text>
            <rect x="225" y="70" width="70" height="60" rx="4" fill="var(--color-background-secondary)" stroke="var(--color-border-secondary)" strokeWidth="0.5"/>
            <text x="260" y="100" textAnchor="middle" fontSize="28">🪶</text>
            <text x="260" y="124" textAnchor="middle" fontSize="11" fill="var(--color-text-secondary)">Pluma de Maat</text>
          </g>
        </svg>
      </div>

      {/* Drop zones */}
      {!ended && (
        <div className="maat-plates">
          <div
            ref={heartZoneRef}
            className="maat-plate"
            style={dropZoneStyle('heart')}
            onDragOver={e => { e.preventDefault(); setDragOver('heart') }}
            onDragLeave={() => setDragOver(null)}
            onDrop={e => onDrop(e, 'heart')}
          >
            <div className="maat-plate-lbl">🫀 Corazón</div>
            <div className="maat-plate-cards">
              {placements.filter(p => p.target === 'heart').map(p => (
                <button key={p.card.id} className="maat-placed-chip" onClick={() => unplace(p.card.id)} title="Devolver">
                  {p.card.icon} {p.card.label} ×
                </button>
              ))}
              {placements.filter(p => p.target === 'heart').length === 0 && (
                <span className="maat-drop-hint">Soltá fichas aquí</span>
              )}
            </div>
          </div>
          <div
            ref={featherZoneRef}
            className="maat-plate"
            style={dropZoneStyle('feather')}
            onDragOver={e => { e.preventDefault(); setDragOver('feather') }}
            onDragLeave={() => setDragOver(null)}
            onDrop={e => onDrop(e, 'feather')}
          >
            <div className="maat-plate-lbl">🪶 Pluma de Maat</div>
            <div className="maat-plate-cards">
              {placements.filter(p => p.target === 'feather').map(p => (
                <button key={p.card.id} className="maat-placed-chip" onClick={() => unplace(p.card.id)} title="Devolver">
                  {p.card.icon} {p.card.label} ×
                </button>
              ))}
              {placements.filter(p => p.target === 'feather').length === 0 && (
                <span className="maat-drop-hint">Soltá fichas aquí</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hand */}
      {!ended && (
        <div className="maat-hand">
          <div className="maat-hand-lbl">Fichas en mano — arrastrá al plato ({remaining.length} restantes)</div>
          <div className="maat-hand-cards">
            {remaining.map(c => (
              <div
                key={c.id}
                className={`maat-card${draggingId === c.id ? ' dragging' : ''}`}
                draggable
                onDragStart={e => onDragStart(e, c)}
                onDragEnd={onDragEnd}
                onTouchStart={e => onTouchStart(e, c)}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <span className="maat-card-ico">{c.icon}</span>
                <span className="maat-card-lbl">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!ended && allPlaced && (
        <button className="btn-g" style={{ marginTop: 12, width: '100%' }} onClick={confirm}>
          Confirmar — Pesar el corazón
        </button>
      )}

      {/* Result */}
      {ended && (
        <div className="maat-result">
          <div className={`puz-res ${diff <= 7 ? 'ok' : 'fail'}`}>
            {diff === 0
              ? '✓ ¡Equilibrio perfecto! Maat está satisfecha'
              : diff <= 7
              ? `✓ Casi perfecto — diferencia de ${diff}`
              : `✗ Desequilibrio de ${diff} — el corazón no pasó la prueba`}
          </div>
          <div className={`puz-stat-result ${statDelta >= 0 ? 'reward' : 'penalty'}`}>
            {statDelta >= 0
              ? `✨ Fe, Cultura y Estabilidad +${statDelta} por el equilibrio sagrado`
              : `⚠ Fe, Cultura y Estabilidad ${statDelta} por el desequilibrio`}
          </div>

          <div className="maat-review">
            <div className="maat-review-title">Revelación de las fichas sagradas</div>
            {hand.map(c => {
              const pl = placements.find(p => p.card.id === c.id)
              const isV = c.type === 'virtud'
              return (
                <div key={c.id} className={`maat-review-item ${isV ? 'virtud' : 'pecado'}`}>
                  <span className="maat-review-ico">{c.icon}</span>
                  <div>
                    <div className="maat-review-name">
                      {c.label}
                      <span className={`maat-type-tag ${isV ? 'virtud' : 'pecado'}`}>{isV ? 'virtud' : 'pecado'}</span>
                      {pl
                        ? <span className="maat-dest-tag">{pl.target === 'heart' ? '🫀' : '🪶'}</span>
                        : <span className="maat-dest-tag maat-no-place">no colocada</span>}
                    </div>
                    <p className="maat-review-hint">{c.hint}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <button className="btn-g" style={{ marginTop: 16, width: '100%' }} onClick={() => onDone(diff <= 7, statDelta)}>
            Continuar →
          </button>
        </div>
      )}
    </div>
  )
}
