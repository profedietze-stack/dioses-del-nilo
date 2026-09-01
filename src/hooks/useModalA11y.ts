import { useEffect, useRef } from 'react'

/**
 * Accessibility helper for modal dialogs:
 *  - Closes on Escape
 *  - Moves focus into the dialog on mount, restores it on unmount
 *  - Lightweight focus trap (Tab/Shift+Tab cycle within the dialog)
 *
 * Spread the returned `dialogProps` on the dialog container and attach `ref`.
 */
export function useModalA11y(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null

    const focusables = () =>
      Array.from(
        ref.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter(el => !el.hasAttribute('disabled'))

    // Focus first interactive element, or the dialog itself.
    const first = focusables()[0]
    if (first) first.focus()
    else ref.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const els = focusables()
        if (els.length === 0) { e.preventDefault(); return }
        const firstEl = els[0]
        const lastEl = els[els.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault(); lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault(); firstEl.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [onClose])

  return {
    ref,
    dialogProps: {
      role: 'dialog' as const,
      'aria-modal': true,
      tabIndex: -1,
    },
  }
}
