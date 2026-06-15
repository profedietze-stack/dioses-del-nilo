import type { Stats, PlayStyle, LegacyVerdict, PeriodLore } from '../types'

export type { PlayStyle, LegacyVerdict, PeriodLore }

// ── PLAY STYLE ────────────────────────────────────────────────────────────────
export const PLAY_STYLES: Record<string, PlayStyle> = {
  cultural:    { icon: '📜', title: 'El Sabio del Nilo',        desc: 'Priorizaste el conocimiento, las artes y los templos. Los escribas prosperaron y el legado cultural de tu reinado será eterno.' },
  social:      { icon: '🤝', title: 'El Padre del Pueblo',      desc: 'Cuidaste al pueblo sobre todo lo demás. Tu nombre se pronuncia con gratitud en cada aldea del Imperio.' },
  militar:     { icon: '⚔️', title: 'El Conquistador del Nilo', desc: 'Tu reinado fue de espada y gloria. Las fronteras se expandieron y los pueblos vecinos aprendieron a respetar el poder de Egipto.' },
  economico:   { icon: '💰', title: 'El Gran Constructor',      desc: 'El tesoro floreció bajo tu mano. Graneros llenos, rutas comerciales seguras y obras monumentales definen tu legado.' },
  diplomatico: { icon: '🕊️', title: 'El Tejedor de Alianzas',  desc: 'La diplomacia fue tu arma más poderosa. Negociaste donde otros guerrearon y cosechaste alianzas donde otros ganaron enemigos.' },
  politico:    { icon: '👑', title: 'El Gran Reorganizador',    desc: 'Reestructuraste el poder del Imperio con mano firme y visión estratégica. Tu legado es un gobierno más sólido.' },
  cruel:       { icon: '💀', title: 'La Mano de Hierro',        desc: 'No dudaste en métodos duros cuando los consideraste necesarios. Efectivo, pero el tiempo juzgará el costo humano de tu reinado.' },
  default:     { icon: '𓆣', title: 'El Faraón Equilibrado',    desc: 'Distribuiste tus decisiones entre múltiples frentes. Versátil y adaptable: el tipo de gobernante que los imperios necesitan para sobrevivir.' },
}

// ── LEGACY VERDICT ────────────────────────────────────────────────────────────
export function getLegacyVerdict(stats: Stats): LegacyVerdict {
  const values = Object.values(stats)
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  const minStat = Math.min(...values)
  if (minStat < 15) return { verdict: 'Imperio en Crisis',  color: '#C0392B', desc: 'Alguna de tus métricas está al borde del colapso. El Imperio tembló bajo tu mandato.' }
  if (avg >= 65)    return { verdict: 'Imperio Glorioso',   color: '#D4A017', desc: 'Todas las métricas florecieron. Los historiadores recordarán este período como una era dorada.' }
  if (avg >= 45)    return { verdict: 'Imperio Estable',    color: '#4EADD4', desc: 'Un reinado sólido. No todo fue perfecto, pero el Imperio sigue en pie y avanza.' }
  return               { verdict: 'Imperio Frágil',     color: '#E8543A', desc: 'El Imperio sobrevivió, pero con heridas. El próximo período requerirá decisiones más cuidadosas.' }
}

// ── PERIOD LORE ────────────────────────────────────────────────────────────────
export const PERIOD_LORE: Record<string, PeriodLore> = {
  antiguo: {
    id: 'antiguo',
    summary: 'La era de los constructores: las pirámides, la unificación y el nacimiento del faraón como dios viviente.',
    historicalFact: 'Los trabajadores de las pirámides no eran esclavos. Eran campesinos libres pagados con cerveza, pan y atención médica gratuita. Los papiros médicos de esta era son los textos científicos más antiguos de la humanidad.',
    factTitle: '¿Sabías que...?',
    achievement: 'La Gran Pirámide de Giza fue la estructura más alta del mundo durante casi 4.000 años. Fue construida alineando 2,3 millones de bloques de piedra con una precisión que sigue asombrando a los ingenieros modernos.',
    achievementTitle: 'El legado del Antiguo Imperio',
    augurio: 'Las aguas del Nilo guardan memorias largas. Cuando el río calla, los nomarcas hablan demasiado fuerte. Escucha, faraón: la unidad cuesta más que las piedras de una pirámide...',
    nextPeriodName: 'Imperio Medio',
    nextPeriodIntro: 'El Antiguo Imperio colapsa cuando los nomarcas (gobernadores provinciales) acumulan demasiado poder. Egipto se fragmenta. Pero de las cenizas del Primer Período Intermedio surgirá el Imperio Medio: una era de reunificación, comercio y cultura literaria sin precedentes.',
    nextChallenges: ['Reunificar un Egipto fragmentado en reinos rivales', 'Controlar la ambición de los nomarcas', 'Expandir el comercio hacia Nubia y el Mediterráneo'],
  },
  medio: {
    id: 'medio',
    summary: 'La era de la reunificación y el florecimiento cultural: la burocracia se consolida, el comercio prospera y la literatura alcanza su cima.',
    historicalFact: 'El Imperio Medio produjo las primeras obras literarias de entretenimiento del mundo: el "Cuento de Sinuhé" (considerada la primera novela de la historia) y las primeras canciones de amor escritas de la humanidad.',
    factTitle: '¿Sabías que...?',
    achievement: 'Los faraones del Imperio Medio construyeron el primer sistema de irrigación artificial a gran escala: el lago Fayum ("Mar de Moeris"), convirtiendo el desierto en más de 17.000 hectáreas de tierra cultivable.',
    achievementTitle: 'El legado del Imperio Medio',
    augurio: 'Del desierto del noreste llegan sombras que hablan otra lengua y montan carros de guerra. El horizonte del delta se oscurece con velas desconocidas. El tiempo de la comodidad termina, faraón...',
    nextPeriodName: 'Imperio Nuevo',
    nextPeriodIntro: 'Los Hyksos, un pueblo guerrero del Levante, invaden Egipto y lo dominan durante 100 años. El shock de esta primera conquista impulsa a los egipcios a crear el ejército más poderoso de su historia. Comienza el Imperio Nuevo: la era de Tutankamón, Ramsés II y los mayores templos jamás construidos.',
    nextChallenges: ['Expulsar a los invasores Hyksos del delta', 'Crear un ejército profesional con carros de guerra', 'Expandir el Imperio hacia Canán, Siria y Nubia'],
  },
  nuevo: {
    id: 'nuevo',
    summary: 'La era dorada: Tutankamón, Ramsés II, Nefertiti. El Imperio más extenso, poderoso y rico de toda la historia de Egipto.',
    historicalFact: 'Ramsés II y el rey hitita Hattusili III firmaron en 1259 a.C. el primer tratado de paz internacional de la historia escrita, después de la Batalla de Qadesh. El tratado fue redactado en jeroglífico Y en cuneiforme hitita — copias sobreviven en el Museo de El Cairo y en la sede de las Naciones Unidas en Nueva York.',
    factTitle: '¿Sabías que...?',
    achievement: 'Los templos de Abu Simbel fueron tallados directamente en la roca viva por Ramsés II. Estaban diseñados para que dos veces al año (el 22 de febrero y el 22 de octubre) los rayos del sol iluminaran las estatuas de los dioses en la cámara más profunda.',
    achievementTitle: 'El legado del Imperio Nuevo',
    augurio: 'El sol que más alto brilla es también el que más pronunciada tiene su caída. Los sacerdotes de Amón acumulan lo que los faraones conquistaron. Los "Pueblos del Mar" avanzan desde el horizonte norte. La estrella de Egipto comienza a declinar...',
    nextPeriodName: 'Período Tardío',
    nextPeriodIntro: 'El Imperio Nuevo colapsa bajo deudas, sequías y ataques de los misteriosos "Pueblos del Mar". Libia, Asiria, Nubia y finalmente Persia dominarán Egipto en sucesión. El último capítulo de la historia faraónica ha comenzado.',
    nextChallenges: ['Resistir las invasiones de Libia, Asiria y Persia', 'Mantener la identidad cultural bajo dominio extranjero', 'Negociar con el creciente poder griego en el Mediterráneo'],
  },
  tardio: {
    id: 'tardio',
    summary: 'El último capítulo de los faraones: dominio libio, nubio, asirio y persa. El Egipto independiente lucha por su identidad cultural hasta la llegada de Alejandro.',
    historicalFact: 'Los faraones nubios de la Dinastía XXV (de Nubia/Sudán actual) fueron los guardianes más devotos de la cultura egipcia: restauraron templos abandonados, revivieron rituales olvidados y fueron enterrados en pirámides — una práctica que los propios egipcios habían abandonado siglos antes.',
    factTitle: '¿Sabías que...?',
    achievement: 'Alejandro Magno conquistó Egipto en 332 a.C. sin derramar sangre — los egipcios lo recibieron como libertador del dominio persa. En el Oráculo de Siwa, fue proclamado hijo del dios Amón. Fundó Alejandría, que se convertiría en la ciudad más grande del mundo antiguo.',
    achievementTitle: 'El fin de una era',
    augurio: 'Tu historia llega a su horizonte, faraón. Pero Egipto es más antiguo que sus reyes y más joven que sus pirámides. Las civilizaciones mueren; los monumentos, no. Tu nombre está escrito en piedra.',
    nextPeriodName: '',
    nextPeriodIntro: '',
    nextChallenges: [],
  },
}

// ── ADVISOR PERIOD-END LINES ─────────────────────────────────────────────────
export const ADVISOR_PERIOD_LINES: Record<string, Record<'high' | 'low' | 'neutral', string[]>> = {
  aldeana: {   // Nefertari — estabilidad
    high:    ['El pueblo te despide de este período con canciones, faraón. Las aldeas florecieron bajo tu gobierno.', 'Vi madres nombrarte en sus plegarias. Construiste algo valioso: la paz del pueblo.'],
    low:     ['Las aldeas guardan heridas de este período, faraón. Espero que el próximo seas más atento a los que no tienen voz.', 'He escuchado demasiados llantos en los mercados. El pueblo necesita más de ti en los tiempos que vienen.'],
    neutral: ['El pueblo sobrevivió. No es poco, pero tampoco es suficiente. El próximo período, recuerda que las aldeas son el corazón del Imperio.', 'Hubo momentos buenos y malos para el pueblo. Así es el gobierno. Lo importante es no olvidar nunca a los que sostienen todo desde abajo.'],
  },
  escriba: {  // Heqanakhte — riqueza
    high:    ['Los registros del tesoro no mienten, faraón: este período fue generoso. El comercio fluyó y los graneros están llenos.', 'Excelente gestión de los recursos. Los mercaderes del Mediterráneo hablarán bien de Egipto durante años.'],
    low:     ['El tesoro sangró demasiado en este período. Necesitamos decisiones más cautelosas con los recursos. El próximo ciclo no nos perdonará la misma imprudencia.', 'Los graneros están más vacíos de lo que deberían. Toma nota, faraón: sin riqueza, no hay ejércitos, ni templos, ni Imperio.'],
    neutral: ['El tesoro aguantó. No fuimos ricos, pero tampoco quebramos. El próximo período hay oportunidades comerciales que no deberíamos perder.', 'Un balance aceptable. Los mercaderes siguen llegando, lo cual es una señal positiva. Mantén las rutas abiertas.'],
  },
  sacerdote: { // Amenhotep — cultura
    high:    ['Los templos brillan, los escribas prosperan y el conocimiento de Egipto se extiende. Este período fue una bendición para la cultura.', 'Los dioses están complacidos, faraón. Los monumentos que construiste en nombre del saber perdurarán más que cualquier ejército.'],
    low:     ['Los templos necesitaron más atención de la que recibieron. La cultura no es un lujo, faraón — es lo que nos hace egipcios y no simplemente otro pueblo más del desierto.', 'He visto templos descuidados y escribas sin recursos. El próximo período, recuerda: la civilización se construye con conocimiento, no solo con espadas.'],
    neutral: ['El equilibrio cultural fue suficiente para mantener la identidad del Imperio. Pero podríamos haber alcanzado más. Los dioses esperan más de nosotros.', 'Ni el florecimiento ni el deterioro cultural. Un período de transición. El próximo, apunta más alto — Egipto siempre fue grande cuando cuidó su legado cultural.'],
  },
  general: {  // Meritaten — influencia
    high:    ['El nombre de Egipto resuena con poder en todos los rincones del mundo conocido. Este período fortaleció nuestra posición estratégica.', 'Las fronteras resistieron, los aliados se mantuvieron fieles y nuestros enemigos nos respetan. Un período sólido desde la perspectiva del poder.'],
    low:     ['La influencia de Egipto se debilitó este período. Los pueblos vecinos notaron la vacilación. El próximo ciclo necesitará decisiones más firmes para recuperar lo perdido.', 'Nuestros aliados se preguntan si Egipto sigue siendo el gigante que conocían. Hay trabajo que hacer para restaurar el respeto perdido.'],
    neutral: ['La posición estratégica de Egipto se mantiene, aunque sin grandes avances. A veces la estabilidad es también una victoria.', 'Un período sin grandes triunfos ni grandes derrotas en el plano del poder. El próximo período traerá nuevos desafíos que pondrán a prueba la influencia del Imperio.'],
  },
}
