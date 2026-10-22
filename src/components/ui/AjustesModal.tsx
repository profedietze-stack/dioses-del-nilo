import type { ReactNode } from 'react'
import { useModalA11y } from '../../hooks/useModalA11y'
import { useAjustes } from '../../hooks/useAjustes'
import { playSound } from '../../audio/musicEngine'
import type { Tema, Tamano, Fuente, Interlineado, Movimiento } from '../../utils/ajustes'

interface Props {
  onClose: () => void
  /** La música la arranca y la para la pantalla de juego, no el ajuste: se le avisa qué eligió el jugador. */
  onMusica: (activa: boolean) => void
}

interface Opcion<T extends string> { valor: T; etiqueta: string; muestra?: string }

function Grupo<T extends string>({ nombre, valor, opciones, onChange }: {
  nombre: string; valor: T; opciones: Opcion<T>[]; onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={nombre} className="aj-seg">
      {opciones.map(o => (
        <button
          key={o.valor}
          type="button"
          role="radio"
          aria-checked={valor === o.valor}
          className={`aj-seg-btn${valor === o.valor ? ' on' : ''}`}
          onClick={() => onChange(o.valor)}
        >
          {o.muestra && <span className="aj-muestra" aria-hidden="true">{o.muestra}</span>}
          {o.etiqueta}
        </button>
      ))}
    </div>
  )
}

function Fila({ titulo, ayuda, children }: { titulo: string; ayuda?: string; children: ReactNode }) {
  return (
    <div className="aj-fila">
      <div className="aj-fila-txt">
        <strong>{titulo}</strong>
        {ayuda && <small>{ayuda}</small>}
      </div>
      {children}
    </div>
  )
}

function Interruptor({ nombre, activo, onChange }: { nombre: string; activo: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      aria-label={nombre}
      className={`aj-sw${activo ? ' on' : ''}`}
      onClick={() => onChange(!activo)}
    >
      <span className="aj-sw-txt" aria-hidden="true">{activo ? 'Sí' : 'No'}</span>
      <span className="aj-sw-knob" aria-hidden="true" />
    </button>
  )
}

function Volumen({ nombre, valor, deshabilitado, onChange, onSoltar }: {
  nombre: string; valor: number; deshabilitado: boolean; onChange: (v: number) => void; onSoltar?: () => void
}) {
  const pct = Math.round(valor * 100)
  return (
    <div className="aj-vol">
      <input
        type="range" min={0} max={100} step={5}
        value={pct}
        disabled={deshabilitado}
        aria-label={nombre}
        aria-valuetext={`${pct} por ciento`}
        onChange={e => onChange(Number(e.target.value) / 100)}
        onPointerUp={onSoltar}
        onKeyUp={onSoltar}
      />
      <span className="aj-vol-n" aria-hidden="true">{pct}%</span>
    </div>
  )
}

export function AjustesModal({ onClose, onMusica }: Props) {
  const { ajustes: a, cambiar, restablecer } = useAjustes()
  const { ref, dialogProps } = useModalA11y(onClose)

  const temas: Opcion<Tema>[] = [
    { valor: 'clasico', etiqueta: 'Clásico', muestra: '🌙' },
    { valor: 'claro', etiqueta: 'Claro', muestra: '☀️' },
    { valor: 'contraste', etiqueta: 'Alto contraste', muestra: '◐' },
  ]
  const tamanos: Opcion<Tamano>[] = [
    { valor: 'chica', etiqueta: 'Chica' },
    { valor: 'normal', etiqueta: 'Normal' },
    { valor: 'grande', etiqueta: 'Grande' },
    { valor: 'enorme', etiqueta: 'Enorme' },
  ]
  const fuentes: Opcion<Fuente>[] = [
    { valor: 'clasica', etiqueta: 'Clásica' },
    { valor: 'legible', etiqueta: 'Fácil de leer' },
  ]
  const interlineados: Opcion<Interlineado>[] = [
    { valor: 'normal', etiqueta: 'Normal' },
    { valor: 'amplio', etiqueta: 'Amplio' },
  ]
  const movimientos: Opcion<Movimiento>[] = [
    { valor: 'normal', etiqueta: 'Normal' },
    { valor: 'reducido', etiqueta: 'Reducido' },
  ]

  return (
    <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={ref} {...dialogProps} aria-label="Opciones" className="modal aj-modal">
        <button className="modal-x" onClick={onClose} aria-label="Cerrar">✕</button>
        <h3 className="modal-title">⚙️ Opciones</h3>

        <section className="aj-sec" aria-labelledby="aj-h-aspecto">
          <h4 id="aj-h-aspecto">Aspecto</h4>
          <Fila titulo="Tema de color">
            <Grupo nombre="Tema de color" valor={a.tema} opciones={temas} onChange={tema => cambiar({ tema })} />
          </Fila>
          <Fila titulo="Imagen de cada evento" ayuda="Ocultarla deja más lugar para el texto.">
            <Interruptor nombre="Mostrar la imagen de cada evento" activo={a.imagenes} onChange={imagenes => cambiar({ imagenes })} />
          </Fila>
          <Fila titulo="Movimiento" ayuda="Reducido quita animaciones y transiciones.">
            <Grupo nombre="Movimiento" valor={a.movimiento} opciones={movimientos} onChange={movimiento => cambiar({ movimiento })} />
          </Fila>
        </section>

        <section className="aj-sec" aria-labelledby="aj-h-letra">
          <h4 id="aj-h-letra">Letra</h4>
          <Fila titulo="Tamaño">
            <Grupo nombre="Tamaño de letra" valor={a.tamano} opciones={tamanos} onChange={tamano => cambiar({ tamano })} />
          </Fila>
          <Fila titulo="Tipo de letra" ayuda="«Fácil de leer» usa una letra sin adornos.">
            <Grupo nombre="Tipo de letra" valor={a.fuente} opciones={fuentes} onChange={fuente => cambiar({ fuente })} />
          </Fila>
          <Fila titulo="Espaciado" ayuda="Amplio separa líneas, palabras y letras.">
            <Grupo nombre="Espaciado del texto" valor={a.interlineado} opciones={interlineados} onChange={interlineado => cambiar({ interlineado })} />
          </Fila>
          <p className="aj-prueba">Así se verá el texto del juego: Egipto nació a orillas del Nilo.</p>
        </section>

        <section className="aj-sec" aria-labelledby="aj-h-sonido">
          <h4 id="aj-h-sonido">Sonido</h4>
          <Fila titulo="Música">
            <Interruptor nombre="Música" activo={a.musica} onChange={on => { cambiar({ musica: on }); onMusica(on) }} />
          </Fila>
          <Fila titulo="Volumen de la música">
            <Volumen nombre="Volumen de la música" valor={a.volMusica} deshabilitado={!a.musica} onChange={volMusica => cambiar({ volMusica })} />
          </Fila>
          <Fila titulo="Efectos de sonido">
            <Interruptor nombre="Efectos de sonido" activo={a.efectos} onChange={efectos => cambiar({ efectos })} />
          </Fila>
          <Fila titulo="Volumen de los efectos">
            <Volumen
              nombre="Volumen de los efectos" valor={a.volEfectos} deshabilitado={!a.efectos}
              onChange={volEfectos => cambiar({ volEfectos })} onSoltar={() => playSound('click')}
            />
          </Fila>
        </section>

        <div className="aj-pie">
          <button type="button" className="btn-o" onClick={() => { restablecer(); onMusica(true) }}>Restablecer todo</button>
          <button type="button" className="btn-g" onClick={onClose}>Listo</button>
        </div>
      </div>
    </div>
  )
}
