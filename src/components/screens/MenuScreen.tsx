import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  hasSave: boolean
  onNew: () => void
  onContinue: () => void
  onAchievements: () => void
  onInfo: () => void
  onDeleteSave: () => void
}

const GLYPHS = ['𓂀', '𓇳', '𓆣', '𓏏', '𓆑', '𓅓', '𓂋', '𓈖', '𓆎', '𓇋']

const navVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function MenuScreen({ hasSave, onNew, onContinue, onAchievements, onInfo, onDeleteSave }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <motion.div
      className="menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="menu-bg" aria-hidden="true">
        {GLYPHS.map((g, i) => (
          <span key={i} className="bg-g" style={{ '--i': i } as React.CSSProperties}>{g}</span>
        ))}
      </div>
      <div className="menu-c">
        <motion.div
          className="menu-logo"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="logo-sym">𓆣 𓇳 𓆣</div>
          <h1 className="game-title">DIOSES DEL NILO</h1>
          <div className="logo-sym">𓂀 ⸰ 𓂀</div>
          <p className="game-sub">Guía el destino del Imperio</p>
        </motion.div>
        <motion.nav
          className="menu-nav"
          variants={navVariants}
          initial="hidden"
          animate="show"
        >
          <motion.button variants={itemVariants} className="btn-g lg" onClick={onNew}>⚡ Nueva Partida</motion.button>
          <motion.button variants={itemVariants} className="btn-g lg" onClick={onContinue} disabled={!hasSave}>📖 Continuar Partida</motion.button>
          <motion.button variants={itemVariants} className="btn-o" onClick={onAchievements}>📜 Papiros</motion.button>
          <motion.button variants={itemVariants} className="btn-o" onClick={onInfo}>📚 Info Didáctica</motion.button>
          {hasSave && (
            <motion.button
              variants={itemVariants}
              className="btn-delete-save"
              onClick={() => setConfirmDelete(true)}
            >
              🗑 Borrar partida guardada
            </motion.button>
          )}
        </motion.nav>

        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              className="delete-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(false)}
            >
              <motion.div
                className="delete-modal"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="delete-modal-ico">𓀭</div>
                <h3>¿Borrar partida?</h3>
                <p>Se perderá todo el progreso guardado. Esta acción no se puede deshacer.</p>
                <div className="delete-modal-btns">
                  <button className="btn-o" onClick={() => setConfirmDelete(false)}>Cancelar</button>
                  <button className="btn-delete-confirm" onClick={() => { onDeleteSave(); setConfirmDelete(false) }}>Borrar</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.footer
          className="menu-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <span className="footer-sep">𓆣</span>
          <span>Creado por </span>
          <span className="footer-name">ProfeD.</span>
          <span className="footer-sep">𓆣</span>
        </motion.footer>
      </div>
    </motion.div>
  )
}
