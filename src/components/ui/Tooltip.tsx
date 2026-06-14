import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  text: string
  children: React.ReactNode
  pos?: 'top' | 'bottom' | 'right' | 'left'
  className?: string
}

export function Tooltip({ text, children, pos = 'top', className = '' }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div
      className={`tip-wrap${className ? ' ' + className : ''}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            className={`tip tip-${pos}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.12 }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
