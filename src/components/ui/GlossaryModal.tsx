import { motion } from 'framer-motion'
import { GLOSSARY_MAP } from '../../data/glossary'

const CAT_LABELS: Record<string, string> = {
  egipcio:  '𓆣 Término Egipcio',
  historia: '📜 Historia',
  economia: '💰 Economía',
  religion: '𓂀 Religión',
  ciencia:  '🔬 Ciencia y Cultura',
  sociedad: '🤝 Sociedad',
}

interface Props {
  word: string
  onClose: () => void
}

export function GlossaryModal({ word, onClose }: Props) {
  const entry = GLOSSARY_MAP[word.toLowerCase()]
  if (!entry) return null

  return (
    <motion.div
      className="gmod-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      <motion.div
        className="gmod"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="gmod-cat">{CAT_LABELS[entry.cat] ?? entry.cat}</div>
        <h3 className="gmod-word">{word}</h3>
        <p className="gmod-def">{entry.def}</p>
        <button className="btn-g" style={{ marginTop: 8, padding: '8px 20px', fontSize: '.82rem' }} onClick={onClose}>
          Entendido ✓
        </button>
      </motion.div>
    </motion.div>
  )
}
