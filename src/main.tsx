/*
  Las tipografias, servidas desde el propio sitio y no desde el CDN de Google.

  Los que abren esto son menores: ese servidor recibia, en cada carga y sin que
  nadie lo eligiera, la IP del aula y la hora. Y con el wifi de la escuela caido
  o el dominio filtrado, el juego se abria con otra letra.

  Solo el subconjunto latino y solo los grosores que el CSS usa.
*/
import '@fontsource/cinzel/latin-400.css'
import '@fontsource/cinzel/latin-600.css'
import '@fontsource/cinzel/latin-900.css'
import '@fontsource/crimson-pro/latin-300.css'
import '@fontsource/crimson-pro/latin-400.css'
import '@fontsource/crimson-pro/latin-300-italic.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './styles/globals.css'
import { App } from './App'
import { ErrorBoundary } from './components/dev/ErrorBoundary'
import { initErrorBanner } from './utils/errorBanner'

// El banner global de errores. Un ErrorBoundary de React solo ve lo que
// revienta durante el render: los errores de `window` y las promesas sin
// atender pasan de largo y dejan la pantalla como si nada. En un aula eso
// es peor que un cartel feo, porque nadie sabe que mirar.
initErrorBanner()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
)
