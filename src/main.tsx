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
