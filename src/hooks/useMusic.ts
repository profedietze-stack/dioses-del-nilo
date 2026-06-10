import { useCallback, useRef } from 'react'
import { startMusic, stopMusic, toggleMusic, playSound } from '../audio/musicEngine'

export function useMusic(initialOn = true) {
  const on = useRef(initialOn)

  const play = useCallback((type: string) => {
    playSound(type)
  }, [])

  const start = useCallback(() => {
    if (on.current) startMusic()
  }, [])

  const stop = useCallback(() => {
    stopMusic()
  }, [])

  const toggle = useCallback((): boolean => {
    const next = toggleMusic()
    on.current = next
    return next
  }, [])

  return { play, start, stop, toggle }
}
