import { useState } from 'react'
import type { PuzzleDef } from '../../types'

interface Props {
  puz: PuzzleDef
  onDone: (ok: boolean, statDelta: number) => void
}

export function WordOrder({ puz, onDone }: Props) {
  const words = puz.words ?? []
  const [slots, setSlots] = useState<(string | null)[]>(Array(words.length).fill(null))
  const [avail, setAvail] = useState<string[]>(() => [...words].sort(() => Math.random() - 0.5))
  const [done, setDone] = useState(false)
  const [statDelta, setStatDelta] = useState(0)

  const place = (si: number, w: string) => {
    if (done || slots[si]) return
    setSlots(p => { const n = [...p]; n[si] = w; return n })
    setAvail(p => p.filter(x => x !== w))
  }

  const remove = (si: number) => {
    if (done) return
    const w = slots[si]; if (!w) return
    setSlots(p => { const n = [...p]; n[si] = null; return n })
    setAvail(p => [...p, w])
  }

  const check = () => {
    setDone(true)
    const correct = slots.filter((s, i) => s === words[i]).length
    const total = words.length
    setStatDelta((correct * 3) - ((total - correct) * 2))
  }

  const parts = (puz.tpl ?? '').split(/\[([A-ZÁÉÍÓÚ0-9]+)\]/g)
  const correctCount = done ? slots.filter((s, i) => s === words[i]).length : 0
  const totalWords = words.length

  return (
    <div className="puz">
      <div className="puz-ico">📜</div>
      <h3>COMPLETÁ EL TEXTO SAGRADO</h3>
      <p className="puz-hint">Tocá una palabra → se ubica en el primer espacio libre. Tocá un espacio ocupado para devolverla.</p>
      <div className="puz-tpl">
        {parts.map((p, i) => {
          if (i % 2 === 0) return <span key={i}>{p}</span>
          const si = Math.floor(i / 2)
          const isOk = done && slots[si] === words[si]
          const isFail = done && slots[si] && slots[si] !== words[si]
          return (
            <button
              key={i}
              className={`slot${slots[si] ? ' filled' : ''}${isOk ? ' ok' : isFail ? ' fail' : ''}`}
              onClick={() => remove(si)}
            >
              {slots[si] ?? (done ? <span style={{ color: '#e07060' }}>{words[si]}</span> : '___')}
            </button>
          )
        })}
      </div>
      {!done && (
        <div className="word-bank">
          {avail.map((w, i) => (
            <button
              key={i}
              className="word-btn"
              onClick={() => { const e = slots.findIndex(s => !s); if (e !== -1) place(e, w) }}
            >
              {w}
            </button>
          ))}
        </div>
      )}
      {!done && slots.every(Boolean) && (
        <button className="btn-g" style={{ marginTop: 12 }} onClick={check}>Verificar texto</button>
      )}
      {done && (
        <div className="ordenar-feedback">
          <div className={`puz-res ${correctCount === totalWords ? 'ok' : 'fail'}`}>
            {correctCount === totalWords
              ? '✓ ¡Perfecto! Todas las palabras correctas'
              : `${correctCount} de ${totalWords} palabras correctas`}
          </div>
          <div className={`puz-stat-result ${statDelta >= 0 ? 'reward' : 'penalty'}`}>
            {statDelta >= 0
              ? `✨ Todos los stats +${Math.abs(Math.round(statDelta / 2))} por tu buen trabajo`
              : `⚠ Todos los stats ${Math.round(statDelta / 2)} por los errores cometidos`
            }
          </div>
          <div className="word-review">
            {words.map((w, i) => {
              const chosen = slots[i]
              const ok = chosen === w
              return (
                <div key={i} className={`word-review-item ${ok ? 'ok' : 'fail'}`}>
                  <span className="word-review-sym">{ok ? '✓' : '✗'}</span>
                  <div>
                    {ok
                      ? <span>Correcto: <strong>{w}</strong></span>
                      : <span>Pusiste <strong style={{ color: '#e07060' }}>{chosen ?? '(vacío)'}</strong> → correcta: <strong style={{ color: '#6fcf74' }}>{w}</strong></span>
                    }
                  </div>
                </div>
              )
            })}
          </div>
          <button
            className="btn-g"
            style={{ marginTop: 16, width: '100%' }}
            onClick={() => onDone(correctCount === totalWords, statDelta)}
          >
            Continuar →
          </button>
        </div>
      )}
    </div>
  )
}
