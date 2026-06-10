import { useState } from 'react'
import { DIDACTIC } from '../../data/didactic'

interface Props {
  onClose: () => void
}

export function InfoModal({ onClose }: Props) {
  const [tab, setTab] = useState<'student' | 'teacher'>('student')

  return (
    <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <button className="modal-x" onClick={onClose}>✕</button>
        <h3 className="modal-title">📚 Información Didáctica</h3>
        <div className="tabs">
          <button className={`tab${tab === 'student' ? ' active' : ''}`} onClick={() => setTab('student')}>Estudiantes</button>
          <button className={`tab${tab === 'teacher' ? ' active' : ''}`} onClick={() => setTab('teacher')}>Docentes</button>
        </div>
        <div className="modal-body">
          {tab === 'student' ? (
            <div>
              <h4>¿Cómo se juega?</h4>
              {DIDACTIC.student.map((s, i) => (
                <div key={i} className="info-blk">
                  <strong>{s.sub}</strong>
                  <p>{s.txt}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h4>Objetivos Pedagógicos</h4>
              <ul>{DIDACTIC.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
              <h4>Conexión Curricular</h4>
              <p>{DIDACTIC.curriculum}</p>
              <h4>Dinámicas de Aula</h4>
              {DIDACTIC.dynamics.map((d, i) => (
                <div key={i} className="info-blk">
                  <strong>{d.mode}</strong>
                  <p>{d.desc}</p>
                </div>
              ))}
              <h4>Preguntas para Discusión</h4>
              <ul>{DIDACTIC.discussion.map((q, i) => <li key={i}>{q}</li>)}</ul>
              <h4>Glosario</h4>
              {DIDACTIC.glossary.map((g, i) => (
                <div key={i} className="info-blk">
                  <strong>{g.term}</strong>
                  <p>{g.def}</p>
                </div>
              ))}
              <h4>Rúbrica de Evaluación</h4>
              <table className="rubric">
                <thead><tr><th>Criterio</th><th>Indicadores</th></tr></thead>
                <tbody>
                  {DIDACTIC.rubric.map((r, i) => (
                    <tr key={i}><td>{r.c}</td><td>{r.i}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
