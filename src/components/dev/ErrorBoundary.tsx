import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props  { children: ReactNode }
interface State  { error: Error | null; info: ErrorInfo | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, info: null }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info })
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    const { error, info } = this.state
    if (!error) return this.props.children

    if (import.meta.env.DEV) {
      return (
        <div style={{ background: '#1a0000', color: '#ff6b6b', padding: '2rem', fontFamily: 'monospace', minHeight: '100dvh', overflow: 'auto' }}>
          <h1 style={{ color: '#ff4444' }}>💥 React Crash</h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '.8rem' }}>
            {error.message}{'\n\n'}{error.stack}
          </pre>
          <hr style={{ borderColor: '#440000', margin: '1rem 0' }} />
          <h2>Component Stack</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '.75rem', color: '#ff9999' }}>
            {info?.componentStack}
          </pre>
          <button
            onClick={() => this.setState({ error: null, info: null })}
            style={{ marginTop: '1rem', padding: '.5rem 1rem', background: '#440000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '.25rem' }}
          >
            Intentar recuperar
          </button>
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', background: '#1A1408', color: '#D4A017', fontFamily: 'serif', textAlign: 'center', padding: '2rem' }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>𓆣</div>
          <h2>Los dioses interrumpieron el reinado</h2>
          <p style={{ color: '#8B6914', margin: '1rem 0' }}>Algo inesperado ocurrió. Recarga la página para continuar.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '.6rem 1.5rem', background: '#D4A017', color: '#1A1408', border: 'none', cursor: 'pointer', borderRadius: '.5rem', fontWeight: 'bold' }}
          >
            Recargar
          </button>
        </div>
      </div>
    )
  }
}
