import type { StatKey, OptionType } from '../types'

export type Urgency = 'critical' | 'warning' | 'normal'

export interface Advisor {
  id: string
  name: string
  title: string
  icon: string
  color: string
  stat: StatKey
  domains: OptionType[]
  lines: {
    pos: string[]
    neg: string[]
    neutral: string[]
  }
  advice: {
    critical: string[]
    low: string[]
    ok: string[]
    high: string[]
    domain: string[]
  }
}

export const ADVISORS: Record<StatKey, Advisor> = {
  estabilidad: {
    id: 'aldeana',
    name: 'Nefertari',
    title: 'Voz del Pueblo',
    icon: '𓇋',
    color: '#6fcf74',
    stat: 'estabilidad',
    domains: ['social', 'politico'],
    lines: {
      pos: [
        'El pueblo respira, faraón. Las aldeas duermen en paz esta noche.',
        'Escuché a las madres en el mercado: te bendicen. La estabilidad es el mayor de los tesoros.',
        'Cuando el orden reina, hasta los niños cantan en las calles. Buena decisión.',
        'Las familias comen tranquilas. El pueblo no pide más que eso.',
      ],
      neg: [
        'Los murmullos crecen en las aldeas. No es buena señal, faraón.',
        'Vi madres preocupadas en el mercado hoy. La estabilidad es frágil como el papiro.',
        'Cuando el pueblo pierde la esperanza, los problemas llegan solos. Cuida tu siguiente paso.',
        'Las aldeas sufren. Recuerda: sin gente leal, no hay Imperio.',
      ],
      neutral: [
        'El pueblo observa, faraón. Cada decisión deja marca.',
        'Las aldeas están atentas. El tiempo dirá si fue sabia.',
      ],
    },
    advice: {
      critical: [
        '¡Faraón, el pueblo está al borde del levantamiento! Una decisión equivocada puede encender la revuelta.',
        'Las aldeas hierven de descontento. Sin orden, perderemos el control del Imperio.',
        '¡Esto es urgente! La estabilidad está por colapsar. Piensa primero en el pueblo.',
      ],
      low: [
        'El pueblo murmura más de lo habitual. Elige con cuidado: la calma es frágil.',
        'La estabilidad flaquea. Una mala decisión ahora puede desatar el caos.',
        'Las familias están inquietas. Lo que decidas hoy lo sentirán en las aldeas mañana.',
      ],
      ok: [
        'El pueblo está atento, faraón. Las aldeas esperan tu sabiduría.',
        'Los tiempos son razonables. Mantén el orden sin olvidar a los más humildes.',
        'La estabilidad aguanta, pero no es infinita. Piensa en el bienestar del pueblo.',
      ],
      high: [
        'El pueblo confía en ti, faraón. Aprovecha este momento de calma para tomar decisiones audaces.',
        'Las aldeas prosperan. Es buen momento para decisiones que cimenten el futuro.',
        'El orden reina. Úsalo bien: la tranquilidad también puede ser una oportunidad.',
      ],
      domain: [
        'Este asunto toca directamente al pueblo, faraón. Mi consejo: escucha antes de decidir.',
        'Los temas sociales me incumben. Lo que elijas aquí se sentirá en cada hogar del Imperio.',
        'El corazón del pueblo late fuerte ante esto. La decisión correcta es la que mantiene la paz.',
      ],
    },
  },

  riqueza: {
    id: 'escriba',
    name: 'Heqanakhte',
    title: 'Escriba del Tesoro',
    icon: '𓏭',
    color: '#D4A017',
    stat: 'riqueza',
    domains: ['economico', 'diplomatico'],
    lines: {
      pos: [
        'He revisado los registros: el oro fluye hacia el tesoro del faraón.',
        'Los graneros se llenan. El comercio prospera con esta decisión.',
        'Excelente para las arcas, faraón. Los mercaderes del Nilo lo celebrarán.',
        'Los números sonríen. Esta decisión fue rentable para el Imperio.',
      ],
      neg: [
        'He calculado las pérdidas. Los cofres lloran, faraón.',
        'El tesoro se resiente. Debemos ser más cuidadosos con los recursos del Imperio.',
        'Esta decisión nos costará caro en las próximas estaciones de cosecha.',
        'Los mercaderes murmuran. Sin riqueza, hasta los ejércitos pierden el paso.',
      ],
      neutral: [
        'Los registros están al día. El tesoro aguarda tu próxima decisión.',
        'He anotado los movimientos. Las consecuencias económicas se verán pronto.',
      ],
    },
    advice: {
      critical: [
        '¡El tesoro está casi vacío, faraón! Sin recursos no hay ejército, ni templos, ni Imperio.',
        'Los graneros lloran. Esta decisión puede determinar si Egipto sobrevive a la siguiente estación.',
        '¡Emergencia económica! Cada elección que cueste oro puede hundirnos.',
      ],
      low: [
        'Los cofres se sienten ligeros. Considera el costo antes de decidir.',
        'El comercio se resiente. Elige con el tesoro en mente.',
        'Hemos gastado más de lo que hemos ganado. Conviene ser prudente ahora.',
      ],
      ok: [
        'Los registros están equilibrados. Hay margen para decidir con prudencia.',
        'El tesoro aguanta. Pero no hay que malgastar lo que tanto costó acumular.',
        'La economía está estable. Cualquier decisión tiene consecuencias que he calculado.',
      ],
      high: [
        'Las arcas rebosan, faraón. Podemos darnos el lujo de ser generosos o ambiciosos.',
        'El oro fluye. Es buen momento para invertir en el futuro del Imperio.',
        'El tesoro está sólido. Úsalo con visión: la riqueza de hoy es el poder de mañana.',
      ],
      domain: [
        'Este asunto tiene consecuencias económicas directas. He revisado los números.',
        'Los temas de comercio y tesoro son mi especialidad. Piensa bien en el costo.',
        'El oro no miente. Lo que decidas aquí afectará las arcas del faraón.',
      ],
    },
  },

  cultura: {
    id: 'sacerdote',
    name: 'Amenhotep',
    title: 'Sacerdote de Amón',
    icon: '𓂀',
    color: '#4EADD4',
    stat: 'cultura',
    domains: ['cultural'],
    lines: {
      pos: [
        'Los dioses sonríen, faraón. El saber avanza y el Imperio crece.',
        'Amón guía tu mano. La cultura florece cuando el faraón honra el conocimiento.',
        'El papiro no miente: cuando el pueblo aprende, el Imperio se hace eterno.',
        'Los templos resuenan con cantos de gratitud. Sabia elección.',
      ],
      neg: [
        'Los templos se silencian, faraón. Sin cultura, el pueblo olvida quién es.',
        'Amón observa con tristeza. La ignorancia es el enemigo que no se ve venir.',
        'El conocimiento retrocede. Debemos rezar para que los dioses perdonen esta deuda.',
        'Sin historia, sin arte, sin saber... ¿qué diferencia al faraón del invasor?',
      ],
      neutral: [
        'Los sacerdotes oran por tu sabiduría, faraón.',
        'Los dioses escuchan cada decisión. Que Amón te ilumine.',
      ],
    },
    advice: {
      critical: [
        '¡Los templos se vacían, faraón! Sin cultura ni saber, somos iguales que los bárbaros.',
        'El conocimiento se extingue. Esta decisión puede salvar o hundir nuestra memoria como pueblo.',
        '¡Amón clama! Si no rescatamos la cultura ahora, las generaciones futuras no sabrán quiénes fuimos.',
      ],
      low: [
        'Los escribas y sacerdotes están preocupados. La cultura necesita atención urgente.',
        'El saber flaquea. Recuerda: un pueblo sin historia pierde su identidad.',
        'Los templos se quedan sin recursos. Elige con respeto al conocimiento.',
      ],
      ok: [
        'Los dioses observan con calma. El saber avanza, aunque despacio.',
        'Los templos funcionan. Elige con respeto por la tradición y el conocimiento.',
        'La cultura está en equilibrio. Cuídala: es el legado que dejamos al futuro.',
      ],
      high: [
        'Amón sonríe, faraón. La cultura florece y el pueblo conoce su historia.',
        'Los sacerdotes cantan alabanzas. Aprovecha este momento de esplendor cultural.',
        'El conocimiento abunda. Es hora de usarlo para tomar la decisión más sabia.',
      ],
      domain: [
        'Este asunto toca el alma del Imperio: el saber, la fe, la tradición. Elige con reverencia.',
        'Los temas culturales son sagrados. Lo que decidas quedará grabado en los papiros.',
        'Amón me habla: esta decisión definirá cómo nos recuerden los que vengan después.',
      ],
    },
  },

  influencia: {
    id: 'general',
    name: 'Meritaten',
    title: 'General del Ejército',
    icon: '𓌀',
    color: '#E8543A',
    stat: 'influencia',
    domains: ['militar', 'cruel'],
    lines: {
      pos: [
        '¡El Imperio se expande! Nuestras fronteras hablan de gloria, faraón.',
        'El ejército marcha confiado. Nadie duda del poder del que manda en el Nilo.',
        'Bien decidido. El mundo sabe quién gobierna. Eso vale más que mil tropas.',
        'Los reinos vecinos han tomado nota. Respetamos con fuerza.',
      ],
      neg: [
        'Nuestros vecinos nos estudian, faraón. La debilidad invita al invasor.',
        'El ejército murmura. Una decisión blanda hoy puede costar caro mañana.',
        'La influencia no se regala. Hemos perdido terreno que costará recuperar.',
        'Sin poder, las alianzas se evaporan. Debemos actuar con determinación.',
      ],
      neutral: [
        'El ejército aguarda órdenes, faraón. La fuerza se demuestra en la acción.',
        'Los reinos vecinos observan. Cada decisión es un mensaje.',
      ],
    },
    advice: {
      critical: [
        '¡El Imperio pierde respeto ante los reinos vecinos! Si no actuamos, los invasores tomarán nota.',
        'Nuestras fronteras están en peligro. Una mala decisión aquí puede costar sangre.',
        '¡Faraón, la influencia ha caído peligrosamente! Los enemigos ya nos están probando.',
      ],
      low: [
        'Los reinos vecinos nos miran con menos temor. Debemos recuperar terreno.',
        'La influencia mengua. Elige con determinación o pagaremos el precio.',
        'El ejército necesita una señal de fortaleza. Esta decisión importa.',
      ],
      ok: [
        'El ejército está listo, faraón. El Imperio mantiene su posición.',
        'Los vecinos nos respetan, aunque siempre buscan oportunidades. Mantén la guardia.',
        'La influencia es estable. No la desperdicies en decisiones que no tienen visión.',
      ],
      high: [
        'El Imperio irradia poder, faraón. Los reinos vecinos nos temen y respetan.',
        'El ejército marcha confiado. Esta es la hora de consolidar la grandeza de Egipto.',
        'Somos fuertes. Aprovecha este momento: la influencia abre puertas que el oro no puede comprar.',
      ],
      domain: [
        'Este asunto es militar, faraón. La fuerza y la estrategia son mi territorio.',
        'En temas de poder y guerra, mis palabras valen oro. Escúchame antes de decidir.',
        'El ejército y el Imperio dependen de esta decisión. Piensa como un estratega.',
      ],
    },
  },
  fe: {
    id: 'sacerdote',
    name: 'Amenhotep',
    title: 'Sumo Sacerdote de Amón',
    icon: '𓂀',
    color: '#7C4DFF',
    stat: 'fe',
    domains: ['religioso', 'cultural'],
    lines: {
      pos: [
        'Los dioses sonríen, faraón. Los templos rebosan de ofrendas y gratitud.',
        'La Fe del pueblo crece. Amón protege a quienes lo honran con generosidad.',
        'Bien decidido. Los rituales sagrados mantienen el orden del cosmos.',
        'Los sacerdotes elevan plegarias por tu reinado. Los dioses escuchan.',
      ],
      neg: [
        'Los dioses observan, faraón. Descuidar la Fe trae consecuencias que el oro no repara.',
        'Los templos se vacían. Sin Fe, el pueblo pierde el hilo que lo une al cosmos.',
        'El favor divino se gana con actos, no con palabras. Debemos rectificar.',
        'Los sacerdotes murmuran. La voluntad de los dioses no puede ignorarse.',
      ],
      neutral: [
        'Los dioses aguardan tus ofrendas, faraón. La Fe se cultiva cada día.',
        'El equilibrio entre lo divino y lo terrenal define a un gran faraón.',
      ],
    },
    advice: {
      critical: [
        '¡La Fe se desmorona! Los dioses pueden retirar su protección si no actuamos de inmediato.',
        'Los templos reportan templos vacíos y rituales abandonados. Esto es una señal de mal presagio.',
        '¡Faraón, sin la bendición de los dioses el Imperio queda expuesto a todo mal!',
      ],
      low: [
        'La Fe decrece. Los dioses no son pacientes con quienes los olvidan.',
        'Los sacerdotes piden orientación. Necesitamos fortalecer los lazos con los templos.',
        'Un acto de piedad ahora puede restaurar el favor divino antes de que sea tarde.',
      ],
      ok: [
        'Los templos funcionan, faraón. Pero la Fe siempre puede crecer más.',
        'Los dioses están satisfechos, aunque nunca sobra una ofrenda generosa.',
        'La Fe es estable. Mantén los rituales y el pueblo seguirá creyendo.',
      ],
      high: [
        'Los dioses bendicen tu reinado, faraón. La Fe del pueblo es tu mayor escudo.',
        'Los templos prosperan. Amón guía cada una de tus decisiones con sabiduría divina.',
        'Excelente. Cuando la Fe es alta, hasta las cosechas y las batallas favorecen al faraón.',
      ],
      domain: [
        'Este es un asunto sagrado, faraón. La voluntad de los dioses debe guiar esta decisión.',
        'En lo que concierne a los templos y rituales, mi consejo vale más que cualquier riqueza.',
        'Los dioses observan esta decisión. Actúa con piedad y serás recompensado.',
      ],
    },
  },
  comercio: {
    id: 'mercader',
    name: 'Khentkaus',
    title: 'Gran Supervisora de Rutas',
    icon: '🏺',
    color: '#00897B',
    stat: 'comercio',
    domains: ['economico', 'diplomatico'],
    lines: {
      pos: [
        'Las caravanas llegan cargadas, faraón. Nubia y el Levante nos favorecen.',
        'El comercio florece. Los mercados del Nilo son los más ricos del mundo antiguo.',
        'Buena decisión. Las rutas comerciales abiertas son tan valiosas como un ejército.',
        'Los intercambios prosperan. El Imperio crece en riqueza gracias a tu visión.',
      ],
      neg: [
        'Las rutas comerciales sufren, faraón. Sin intercambio, el Imperio se empobrece.',
        'Los mercados se ralentizan. Una decisión equivocada puede cerrar puertas que tardan en abrirse.',
        'El Comercio requiere estabilidad y confianza. Hemos perdido terreno.',
        'Las caravanas buscan caminos más seguros. Debemos reconquistar su confianza.',
      ],
      neutral: [
        'Los mercados aguardan tu señal, faraón. El Comercio es el pulso del Imperio.',
        'Las rutas del Nilo conectan mundos. Cada decisión afecta el flujo de riqueza.',
      ],
    },
    advice: {
      critical: [
        '¡El Comercio se ha desplomado! Las rutas comerciales están en riesgo y los mercados temen.',
        'Los mercaderes de Nubia han reducido sus envíos. Debemos actuar antes de perder esas rutas.',
        '¡Faraón, sin Comercio la riqueza del Imperio se agota más rápido de lo que imaginas!',
      ],
      low: [
        'El Comercio se debilita. Necesitamos abrir o proteger las rutas de intercambio.',
        'Los mercados reportan menos actividad. Una decisión pro-comercio es urgente.',
        'Las caravanas necesitan garantías. Sin ellas, buscarán otros caminos.',
      ],
      ok: [
        'El Comercio es estable, faraón. Pero siempre hay más rutas por abrir.',
        'Los mercados funcionan. Mantén las políticas que favorecen el intercambio.',
        'Las rutas están activas. Con un poco más de impulso, podríamos multiplicar las ganancias.',
      ],
      high: [
        'El Imperio comercia con el mundo, faraón. Las riquezas de Nubia y el Levante son nuestras.',
        'Los mercados del Nilo son los más prósperos del mundo conocido. ¡Excelente gestión!',
        'El Comercio en su apogeo enriquece todos los sectores del Imperio. Mantén este rumbo.',
      ],
      domain: [
        'Este asunto afecta directamente las rutas comerciales, faraón. Mi experiencia es clave aquí.',
        'En temas de intercambio y economía, nadie conoce mejor las rutas que yo.',
        'El Comercio habla su propio idioma. Escúchame antes de tomar esta decisión.',
      ],
    },
  },
}

export type AdvisorAdvice = {
  line: string
  urgency: Urgency
}

export function getAdvisorAdvice(
  advisor: Advisor,
  statValue: number,
  eventCat: string,
): AdvisorAdvice {
  const domainMatch = advisor.domains.includes(eventCat as OptionType)

  if (statValue < 25) {
    return {
      line: pick(advisor.advice.critical),
      urgency: 'critical',
    }
  }
  if (statValue < 40) {
    return {
      line: domainMatch ? pick(advisor.advice.domain) : pick(advisor.advice.low),
      urgency: 'warning',
    }
  }
  if (domainMatch) {
    return {
      line: pick(advisor.advice.domain),
      urgency: statValue < 55 ? 'warning' : 'normal',
    }
  }
  if (statValue > 65) {
    return { line: pick(advisor.advice.high), urgency: 'normal' }
  }
  return { line: pick(advisor.advice.ok), urgency: 'normal' }
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function pickAdvisors(fx: Partial<Record<StatKey, number>>): [Advisor, Advisor] {
  const affected = (Object.entries(fx) as [StatKey, number][])
    .filter(([, v]) => v !== 0)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))

  if (affected.length === 0) {
    return [ADVISORS.cultura, ADVISORS.estabilidad]
  }

  const first = ADVISORS[affected[0][0]]
  if (affected.length === 1) {
    const fallbacks: StatKey[] = ['estabilidad', 'cultura', 'riqueza', 'influencia']
    const other = fallbacks.find(k => k !== affected[0][0]) as StatKey
    return [first, ADVISORS[other]]
  }

  const second = ADVISORS[affected[1][0]]
  if (first.id === second.id) {
    const fallbacks: StatKey[] = ['estabilidad', 'cultura', 'riqueza', 'influencia']
    const other = fallbacks.find(k => k !== affected[0][0] && k !== affected[1][0]) as StatKey
    return [first, ADVISORS[other ?? 'cultura']]
  }

  return [first, second]
}

export function getAdvisorLine(advisor: Advisor, value: number): string {
  const pool = value > 0 ? advisor.lines.pos : value < 0 ? advisor.lines.neg : advisor.lines.neutral
  return pool[Math.floor(Math.random() * pool.length)]
}
