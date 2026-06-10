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
