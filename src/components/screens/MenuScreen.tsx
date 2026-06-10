import { motion } from 'framer-motion'

interface Props {
  hasSave: boolean
  onNew: () => void
  onContinue: () => void
  onAchievements: () => void
  onInfo: () => void
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

export function MenuScreen({ hasSave, onNew, onContinue, onAchievements, onInfo }: Props) {
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
        </motion.nav>
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
