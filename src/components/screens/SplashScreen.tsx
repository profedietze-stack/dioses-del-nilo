import { motion } from 'framer-motion'

const SPLASH_BG_SRC = import.meta.env.BASE_URL + 'images/splash-loading.jpg'

export function SplashScreen() {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <img src={SPLASH_BG_SRC} alt="" aria-hidden="true" className="splash-bg-photo" />
      <div className="splash-overlay" />
      <motion.div
        className="splash-c"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="splash-glyph">𓆣</div>
        <h1 className="splash-title">DIOSES DEL NILO</h1>
        <div className="splash-loader">
          <span />
          <span />
          <span />
        </div>
      </motion.div>
    </motion.div>
  )
}
