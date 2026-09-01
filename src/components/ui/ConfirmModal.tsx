import { motion } from 'framer-motion'
import { useModalA11y } from '../../hooks/useModalA11y'

interface Props {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  icon?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  title,
  message,
  confirmLabel = 'Aceptar',
  cancelLabel = 'Cancelar',
  icon = '𓀭',
  onConfirm,
  onCancel,
}: Props) {
  const { ref, dialogProps } = useModalA11y(onCancel)

  return (
    <motion.div
      className="delete-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        ref={ref}
        {...dialogProps}
        aria-label={title}
        className="delete-modal"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="delete-modal-ico" aria-hidden="true">{icon}</div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="delete-modal-btns">
          <button className="btn-o" onClick={onCancel}>{cancelLabel}</button>
          <button className="btn-delete-confirm" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
