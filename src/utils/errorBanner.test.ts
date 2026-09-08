import { describe, it, expect, beforeEach } from 'vitest'
import { initErrorBanner } from './errorBanner'

// El banner existe para los dos casos que un ErrorBoundary de React NO ve: un
// error de `window` y una promesa sin atender. Si alguna vez se rompe, la
// pantalla se queda muda y nadie se entera — asi que conviene comprobarlo.

describe('initErrorBanner', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  // Ojo con el orden: `initErrorBanner` registra listeners en `window` y no
  // hay forma de sacarlos entre tests. El del filtro corre primero, cuando es
  // el unico escuchando; si corriera despues, el listener del test anterior
  // —que no filtra nada— mostraria el banner igual.
  it('respeta el filtro `ignorar`', () => {
    initErrorBanner({ ignorar: (motivo) => motivo.includes('ruido') })
    window.dispatchEvent(new ErrorEvent('error', {
      message: 'ruido de biblioteca',
      error: new Error('ruido de biblioteca'),
      filename: 'x.ts', lineno: 1, colno: 1,
    }))
    expect(document.getElementById('__error_banner__')).toBeNull()
  })
  it('muestra el banner ante un error de window', () => {
    initErrorBanner()
    window.dispatchEvent(new ErrorEvent('error', {
      message: 'algo se rompio',
      error: new Error('algo se rompio'),
      filename: 'x.ts', lineno: 1, colno: 1,
    }))
    const banner = document.getElementById('__error_banner__')
    expect(banner).not.toBeNull()
    expect(banner!.textContent).toContain('algo se rompio')
  })

})
