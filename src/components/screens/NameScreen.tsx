import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onFinish: (name: string) => void
  onBack: () => void
}

export function NameScreen({ onFinish, onBack }: Props) {
  const [name, setName] = useState('')
  const trimmed = name.trim()
  const valid = trimmed.length >= 4

  const submit = () => {
    if (valid) onFinish(trimmed)
  }

  return (
    <motion.div
      className="ns-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="ns-card">
        <div className="ns-glyphs">𓂀 𓆣 𓇳 𓆣 𓂀</div>
        <h1 className="ns-title">¿Cómo te llama el Pueblo?</h1>
        <p className="ns-sub">El Imperio recordará tu nombre por eternidades.</p>

        <div className="ns-field">
          <label className="ns-label" htmlFor="pharaoh-name">Nombre del Faraón</label>
          <input
            id="pharaoh-name"
            className="ns-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Escribe tu nombre..."
            maxLength={24}
            autoFocus
            autoComplete="off"
          />
          <div className="ns-hint">
            {trimmed.length > 0 && trimmed.length < 4
              ? `Mínimo 4 caracteres (faltan ${4 - trimmed.length})`
              : trimmed.length >= 4
              ? `¡Bienvenido, Faraón ${trimmed}!`
              : 'Mínimo 4 caracteres'}
          </div>
        </div>

        <motion.button
          className="btn-g ns-btn"
          onClick={submit}
          disabled={!valid}
          whileHover={valid ? { scale: 1.03 } : {}}
          whileTap={valid ? { scale: 0.97 } : {}}
        >
          𓇳 Comenzar mi Reinado
        </motion.button>
        <button className="btn-o ns-back-btn" onClick={onBack}>
          ← Volver al Menú
        </button>
      </div>
    </motion.div>
  )
}
