import type { Period } from '../types'

export const PERIODS: Period[] = [
  { id: 'antiguo', name: 'Antiguo Imperio', dates: '3100-2180 aC', col: '#FFD700' },
  { id: 'medio', name: 'Imperio Medio', dates: '2055-1650 aC', col: '#CD853F' },
  { id: 'nuevo', name: 'Imperio Nuevo', dates: '1550-1077 aC', col: '#B8860B' },
  { id: 'tardio', name: 'Período Tardío', dates: '1070-332 aC', col: '#8B6914' },
]

export const STAT_ICONS: Record<string, string> = {
  estabilidad: '🌊',
  riqueza: '💰',
  cultura: '📜',
  influencia: '⚔️',
}

export const STAT_COLORS: Record<string, string> = {
  estabilidad: '#4EADD4',
  riqueza: '#FFB938',
  cultura: '#B56FDB',
  influencia: '#E8543A',
}

export const STAT_LABELS: Record<string, string> = {
  estabilidad: 'ESTABILIDAD',
  riqueza: 'RIQUEZA',
  cultura: 'CULTURA',
  influencia: 'INFLUENCIA',
}

export const STAT_DESC: Record<string, string> = {
  estabilidad: 'Mide qué tan unido y tranquilo está el pueblo. Si cae demasiado, habrá revueltas y el Imperio se desintegra.',
  riqueza: 'El oro, los graneros y los recursos del Imperio. Sin riqueza no hay obras, ni ejércitos, ni templos.',
  cultura: 'El conocimiento, el arte, la escritura y los templos. Una cultura fuerte hace al Imperio eterno.',
  influencia: 'El poder del faraón sobre otras naciones y dentro del propio Egipto. Se gana con decisiones fuertes y se pierde con la debilidad.',
}

export const OPTION_TYPE_LABELS: Record<string, string> = {
  cultural:    '📜 Decisión Cultural — favorece el conocimiento, el arte y los templos',
  social:      '🤝 Decisión Social — cuida al pueblo y la vida comunitaria',
  militar:     '⚔️ Decisión Militar — usa la fuerza o el ejército',
  economico:   '💰 Decisión Económica — afecta el comercio y el tesoro',
  diplomatico: '🕊️ Decisión Diplomática — busca acuerdos con otros pueblos',
  politico:    '👑 Decisión Política — reorganiza el poder interno del Imperio',
  cruel:       '💀 Decisión Cruel — puede ser efectiva, pero tiene un costo humano',
}
