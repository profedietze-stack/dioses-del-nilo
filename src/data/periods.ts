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
  fe: '☥',
  comercio: '🏺',
}

export const STAT_COLORS: Record<string, string> = {
  estabilidad: '#4EADD4',
  riqueza: '#FFB938',
  cultura: '#B56FDB',
  influencia: '#E8543A',
  fe: '#7C4DFF',
  comercio: '#00897B',
}

export const STAT_LABELS: Record<string, string> = {
  estabilidad: 'ESTABILIDAD',
  riqueza: 'RIQUEZA',
  cultura: 'CULTURA',
  influencia: 'INFLUENCIA',
  fe: 'FE',
  comercio: 'COMERCIO',
}

export const STAT_DESC: Record<string, string> = {
  estabilidad: 'Mide qué tan unido y tranquilo está el pueblo. Si cae demasiado, habrá revueltas y el Imperio se desintegra.',
  riqueza: 'El oro, los graneros y los recursos del Imperio. Sin riqueza no hay obras, ni ejércitos, ni templos.',
  cultura: 'El conocimiento, el arte, la escritura y los templos. Una cultura fuerte hace al Imperio eterno.',
  influencia: 'El poder del faraón sobre otras naciones y dentro del propio Egipto. Se gana con decisiones fuertes y se pierde con la debilidad.',
  fe: 'La devoción del pueblo a los dioses y la legitimidad divina del faraón. Sin fe, el orden sagrado se rompe y el Imperio pierde su razón de ser.',
  comercio: 'Las rutas de intercambio, los puertos del Nilo y las expediciones a tierras lejanas. El comercio trae materiales únicos y enriquece a todo el Imperio.',
}

export const STAT_TIPS: Record<string, string[]> = {
  estabilidad: [
    'Pagar deudas al pueblo antes que construir monumentos.',
    'Las decisiones crueles seguidas hunden la estabilidad rápido.',
    'Nefertari alerta cuando el pueblo está al límite.',
    'Un pueblo estable tolera mejor las crisis económicas.',
  ],
  riqueza: [
    'Las guerras largas vacían el tesoro: calcular el costo.',
    'Las inversiones en comercio devuelven riqueza sostenida.',
    'Heqanakhte identifica las mejores oportunidades de ingresos.',
    'Sin riqueza mínima no se pueden financiar ejércitos ni templos.',
  ],
  cultura: [
    'Construir templos y escuelas da beneficios a largo plazo.',
    'Amenhotep guía las decisiones de conocimiento y escritura.',
    'Una cultura alta refuerza la legitimidad del faraón.',
    'Las expediciones científicas elevan cultura y comercio juntos.',
  ],
  influencia: [
    'Las decisiones militares fuertes suben la influencia.',
    'Ceder ante demandas extranjeras la baja rápidamente.',
    'Meritaten anticipa cuándo conviene mostrar fuerza o diplomacia.',
    'La influencia alta permite negociar desde una posición de poder.',
  ],
  fe: [
    'Sostener rituales y financiar templos mantiene la Fe alta.',
    'Decisiones que humillan al clero bajan la Fe del pueblo.',
    'Fe alta hace al pueblo más resiliente ante hambrunas y guerras.',
    'Los sacerdotes son aliados poderosos, pero pueden volverse en tu contra.',
  ],
  comercio: [
    'Abrir rutas de intercambio con Nubia y el Levante multiplica la riqueza.',
    'La guerra con vecinos interrumpe las rutas comerciales.',
    'Las expediciones marítimas (como las de Punt) dan materiales únicos.',
    'Un Nilo bien administrado es la arteria del comercio interno.',
  ],
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
