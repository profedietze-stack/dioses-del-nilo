import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import {
  AJUSTES_POR_DEFECTO, CLAVE_AJUSTES, leerAjustes, paraDocumento, type Ajustes,
} from '../utils/ajustes'
import { setVolumenEfectos, setVolumenMusica, stopMusic } from '../audio/musicEngine'

interface Valor {
  ajustes: Ajustes
  cambiar: (parcial: Partial<Ajustes>) => void
  restablecer: () => void
}

const Contexto = createContext<Valor | null>(null)

function cargar(): Ajustes {
  try { return leerAjustes(localStorage.getItem(CLAVE_AJUSTES)) } catch { return AJUSTES_POR_DEFECTO }
}

/* Dueño de los ajustes: los guarda, los aplica al documento (atributos data-* y tamaño base de letra)
   y al audio, y le pasa a framer-motion si hay que reducir el movimiento. */
export function AjustesProvider({ children }: { children: ReactNode }) {
  const [ajustes, setAjustes] = useState<Ajustes>(cargar)

  useLayoutEffect(() => {
    const { atributos, tamanoBase } = paraDocumento(ajustes)
    const el = document.documentElement
    for (const [k, v] of Object.entries(atributos)) el.setAttribute(k, v)
    el.style.setProperty('--fs-base', tamanoBase)
    setVolumenMusica(ajustes.volMusica)
    setVolumenEfectos(ajustes.volEfectos, ajustes.efectos)
    if (!ajustes.musica) stopMusic()
    try { localStorage.setItem(CLAVE_AJUSTES, JSON.stringify(ajustes)) } catch { /* sin almacenamiento: vale solo esta visita */ }
  }, [ajustes])

  const cambiar = useCallback((p: Partial<Ajustes>) => setAjustes(a => ({ ...a, ...p })), [])
  const restablecer = useCallback(() => setAjustes(AJUSTES_POR_DEFECTO), [])
  const valor = useMemo(() => ({ ajustes, cambiar, restablecer }), [ajustes, cambiar, restablecer])

  return (
    <Contexto.Provider value={valor}>
      <MotionConfig reducedMotion={ajustes.movimiento === 'reducido' ? 'always' : 'user'}>
        {children}
      </MotionConfig>
    </Contexto.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAjustes(): Valor {
  const v = useContext(Contexto)
  if (!v) throw new Error('useAjustes fuera de <AjustesProvider>')
  return v
}
