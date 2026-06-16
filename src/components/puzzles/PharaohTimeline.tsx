import { useState, useRef, useCallback } from 'react'
import type { PuzzleDef } from '../../types'
import { PHARAOHS_BY_PERIOD, type PharaohCard } from '../../data/pharaohCards'

interface Props {
  puz: PuzzleDef
  onDone: (ok: boolean, statDelta: number) => void
}

export function PharaohTimeline({ puz, onDone }: Props) {
  const periodKey = puz.pharaohPeriod ?? 'antiguo'
  const allCards = PHARAOHS_BY_PERIOD[periodKey] ?? []
  const correct = [...allCards].sort((a, b) => b.yearBC - a.yearBC)

  const [hand] = useState<PharaohCard[]>(() => [...allCards].sort(() => Math.random() - 0.5))
  const [slots, setSlots] = useState<(PharaohCard | null)[]>(Array(6).fill(null))
  const [done, setDone] = useState(false)
  const [dragOver, setDragOver] = useState<number | 'pool' | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  // touch drag
  const ghostRef = useRef<HTMLDivElement | null>(null)
  const touchCardRef = useRef<{ card: PharaohCard; fromSlot: number | null } | null>(null)
  const slotRefs = useRef<(HTMLDivElement | null)[]>(Array(6).fill(null))
  const poolRef = useRef<HTMLDivElement>(null)

  const placed = new Set(slots.filter(Boolean).map(c => c!.id))
  const pool = hand.filter(c => !placed.has(c.id))
  const allFilled = slots.every(Boolean)

  const placeInSlot = useCallback((card: PharaohCard, slotIdx: number, fromSlot: number | null) => {
    setSlots(prev => {
      const next = [...prev]
      if (fromSlot !== null) next[fromSlot] = null
      const displaced = next[slotIdx]
      next[slotIdx] = card
      if (displaced && fromSlot !== null) next[fromSlot] = displaced
      return next
    })
  }, [])

  const returnToPool = useCallback((slotIdx: number) => {
    if (done) return
    setSlots(prev => { const n = [...prev]; n[slotIdx] = null; return n })
  }, [done])

  // ── HTML5 drag ─────────────────────────────────────────────────────────────
  const onDragStartPool = (e: React.DragEvent, card: PharaohCard) => {
    e.dataTransfer.setData('cardId', card.id)
    e.dataTransfer.setData('fromSlot', '-1')
    setDraggingId(card.id)
  }

  const onDragStartSlot = (e: React.DragEvent, card: PharaohCard, slotIdx: number) => {
    e.dataTransfer.setData('cardId', card.id)
    e.dataTransfer.setData('fromSlot', String(slotIdx))
    setDraggingId(card.id)
  }

  const onDragEnd = () => { setDraggingId(null); setDragOver(null) }

  const onDropSlot = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('cardId')
    const fromSlot = parseInt(e.dataTransfer.getData('fromSlot'))
    const card = hand.find(c => c.id === id)
    if (!card) return
    placeInSlot(card, slotIdx, fromSlot === -1 ? null : fromSlot)
    setDragOver(null); setDraggingId(null)
  }

  const onDropPool = (e: React.DragEvent) => {
    e.preventDefault()
    const fromSlot = parseInt(e.dataTransfer.getData('fromSlot'))
    if (fromSlot >= 0) returnToPool(fromSlot)
    setDragOver(null); setDraggingId(null)
  }

  // ── Touch drag ─────────────────────────────────────────────────────────────
  const createGhost = (card: PharaohCard, x: number, y: number) => {
    const g = document.createElement('div')
    g.style.cssText = `position:fixed;z-index:9999;pointer-events:none;background:#4B3A8A;color:#e8d5ff;border:2px solid #9c7dff;border-radius:10px;padding:8px 12px;font-size:13px;font-weight:600;transform:translate(-50%,-50%) scale(1.08);white-space:nowrap;left:${x}px;top:${y}px;`
    g.textContent = `${card.icon} ${card.name}`
    document.body.appendChild(g)
    ghostRef.current = g
  }

  const onTouchStartPool = (e: React.TouchEvent, card: PharaohCard) => {
    e.preventDefault()
    touchCardRef.current = { card, fromSlot: null }
    setDraggingId(card.id)
    const t = e.touches[0]
    createGhost(card, t.clientX, t.clientY)
  }

  const onTouchStartSlot = (e: React.TouchEvent, card: PharaohCard, slotIdx: number) => {
    if (done) return
    e.preventDefault()
    touchCardRef.current = { card, fromSlot: slotIdx }
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
    const el = document.elementFromPoint(t.clientX, t.clientY)
    let found: number | 'pool' | null = null
    slotRefs.current.forEach((ref, i) => { if (ref?.contains(el as Node)) found = i })
    if (poolRef.current?.contains(el as Node)) found = 'pool'
    setDragOver(found)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (ghostRef.current) { ghostRef.current.remove(); ghostRef.current = null }
    const t = e.changedTouches[0]
    const el = document.elementFromPoint(t.clientX, t.clientY)
    const ref = touchCardRef.current
    if (ref) {
      let target: number | null = null
      slotRefs.current.forEach((r, i) => { if (r?.contains(el as Node)) target = i })
      if (target !== null) {
        placeInSlot(ref.card, target, ref.fromSlot)
      } else if (poolRef.current?.contains(el as Node) && ref.fromSlot !== null) {
        returnToPool(ref.fromSlot)
      }
    }
    touchCardRef.current = null
    setDraggingId(null)
    setDragOver(null)
  }

  // ── Scoring ────────────────────────────────────────────────────────────────
  const correctCount = done ? slots.filter((c, i) => c?.id === correct[i]?.id).length : 0

  const calcDelta = (hits: number) => {
    if (hits === 6) return 12
    if (hits === 5) return 9
    if (hits === 4) return 6
    if (hits === 3) return 3
    if (hits === 2) return 0
    return -4
  }

  const confirm = () => setDone(true)

  const slotStyle = (i: number): React.CSSProperties => ({
    outline: dragOver === i ? '2px dashed #D4A017' : '2px dashed transparent',
    background: dragOver === i ? 'rgba(212,160,23,.1)' : undefined,
    transition: 'outline .1s, background .1s',
  })

  const periodLabels: Record<string, string> = {
    antiguo: 'Antiguo Imperio',
    medio: 'Imperio Medio',
    nuevo: 'Imperio Nuevo',
    tardio: 'Período Tardío',
  }

  const delta = done ? calcDelta(correctCount) : 0

  return (
    <div className="puz">
      <div className="puz-ico">👑</div>
      <h3>LÍNEA DE TIEMPO — {periodLabels[periodKey]?.toUpperCase()}</h3>
      <p className="puz-hint">Arrastrá los faraones del más antiguo (arriba) al más reciente (abajo).</p>

      {/* Timeline slots */}
      <div className="pht-timeline">
        <div className="pht-axis-label pht-axis-top">⬆ Más antiguo</div>
        {Array(6).fill(null).map((_, i) => (
          <div
            key={i}
            ref={el => { slotRefs.current[i] = el }}
            className={`pht-slot${slots[i] ? ' filled' : ' empty'}`}
            style={slotStyle(i)}
            onDragOver={e => { e.preventDefault(); setDragOver(i) }}
            onDragLeave={() => setDragOver(null)}
            onDrop={e => onDropSlot(e, i)}
          >
            <span className="pht-slot-num">{i + 1}</span>
            {slots[i] ? (
              <div
                className={`pht-card placed${draggingId === slots[i]!.id ? ' dragging' : ''}${done ? (slots[i]!.id === correct[i]?.id ? ' ok' : ' fail') : ''}`}
                draggable={!done}
                onDragStart={e => onDragStartSlot(e, slots[i]!, i)}
                onDragEnd={onDragEnd}
                onTouchStart={e => onTouchStartSlot(e, slots[i]!, i)}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <span className="pht-card-ico">{slots[i]!.icon}</span>
                <div className="pht-card-info">
                  <span className="pht-card-name">{slots[i]!.name}</span>
                  {done && <span className="pht-card-year">{slots[i]!.yearBC} a.C.</span>}
                </div>
                {done && (
                  <span className={`pht-check ${slots[i]!.id === correct[i]?.id ? 'ok' : 'fail'}`}>
                    {slots[i]!.id === correct[i]?.id ? '✓' : '✗'}
                  </span>
                )}
              </div>
            ) : (
              <span className="pht-slot-hint">Soltá aquí</span>
            )}
          </div>
        ))}
        <div className="pht-axis-label pht-axis-bot">⬇ Más reciente</div>
      </div>

      {/* Pool */}
      {!done && (
        <div
          ref={poolRef}
          className="pht-pool"
          onDragOver={e => { e.preventDefault(); setDragOver('pool') }}
          onDragLeave={() => setDragOver(null)}
          onDrop={onDropPool}
          style={{ outline: dragOver === 'pool' ? '2px dashed rgba(212,160,23,.5)' : '2px dashed transparent' }}
        >
          <div className="pht-pool-lbl">Faraones disponibles — {pool.length} restantes</div>
          <div className="pht-pool-cards">
            {pool.map(c => (
              <div
                key={c.id}
                className={`pht-card pool${draggingId === c.id ? ' dragging' : ''}`}
                draggable
                onDragStart={e => onDragStartPool(e, c)}
                onDragEnd={onDragEnd}
                onTouchStart={e => onTouchStartPool(e, c)}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <span className="pht-card-ico">{c.icon}</span>
                <div className="pht-card-info">
                  <span className="pht-card-name">{c.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!done && allFilled && (
        <button className="btn-g" style={{ marginTop: 12, width: '100%' }} onClick={confirm}>
          Confirmar orden cronológico
        </button>
      )}

      {/* Result */}
      {done && (
        <div className="maat-result">
          <div className={`puz-res ${correctCount >= 4 ? 'ok' : 'fail'}`}>
            {correctCount === 6
              ? '✓ ¡Orden perfecto! Conocés bien la historia del Imperio'
              : correctCount >= 4
              ? `✓ ${correctCount} de 6 faraones en el lugar correcto`
              : `✗ ${correctCount} de 6 correctos — el orden cronológico es complejo`}
          </div>
          <div className={`puz-stat-result ${delta >= 0 ? 'reward' : 'penalty'}`}>
            {delta >= 0
              ? `✨ Cultura e Influencia +${delta} por tu conocimiento histórico`
              : `⚠ Cultura e Influencia ${delta} por el orden incorrecto`}
          </div>

          <div className="pht-review">
            <div className="maat-review-title">Orden correcto de los faraones</div>
            {correct.map((c, i) => {
              const placed2 = slots[i]
              const isOk = placed2?.id === c.id
              return (
                <div key={c.id} className={`pht-review-row ${isOk ? 'ok' : 'fail'}`}>
                  <span className="pht-review-pos">{i + 1}</span>
                  <span className="pht-review-ico">{c.icon}</span>
                  <div className="pht-review-info">
                    <span className="pht-review-name">{c.name} — {c.yearBC} a.C.</span>
                    <span className="pht-review-fact">{c.fact}</span>
                  </div>
                  <span className={`pht-check ${isOk ? 'ok' : 'fail'}`}>{isOk ? '✓' : '✗'}</span>
                </div>
              )
            })}
          </div>

          <button className="btn-g" style={{ marginTop: 16, width: '100%' }} onClick={() => onDone(correctCount >= 4, delta)}>
            Continuar →
          </button>
        </div>
      )}
    </div>
  )
}
