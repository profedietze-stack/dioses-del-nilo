import type { Stats, GameEvent } from '../types'

// ── TYPES ────────────────────────────────────────────────────────────────────

export interface PharaohBlessing {
  id: string
  icon: string
  label: string
  desc: string
  fx: Partial<Stats>
}

export interface PharaohMission {
  id: string
  icon: string
  label: string
  desc: string
  pharaohResponse: string
  fx: Partial<Stats>
}

export interface PharaohData {
  id: string
  name: string
  nameGlyph: string
  icon: string
  years: string
  dynasty: string
  title: string
  bio: string
  coronationText: string
  pharaohGreeting: string
  blessings: PharaohBlessing[]
  missions: PharaohMission[]
}

// ── DATA ─────────────────────────────────────────────────────────────────────

export const PHARAOHS: Record<string, PharaohData> = {

  keops: {
    id: 'keops',
    name: 'Keops',
    nameGlyph: '𓆎',
    icon: '𓃭',
    years: '2589–2566 a.C.',
    dynasty: 'IV Dinastía',
    title: 'Constructor de la Gran Pirámide de Guiza',
    bio: 'Jufu, conocido en griego como Keops, ordenó la construcción de la mayor estructura jamás erigida por manos humanas: la Gran Pirámide de Guiza. Durante su reinado organizó un Estado capaz de movilizar a decenas de miles de trabajadores con precisión milimétrica. Su pirámide fue considerada durante siglos la única de las Siete Maravillas del Mundo Antiguo que sobrevivió intacta.',
    coronationText: 'El Ka siente la tierra temblar bajo el peso de una voluntad sin precedentes. Desde las arenas de Menfis surge un nombre que los dioses ya conocen — el que alzará la montaña de piedra más alta jamás concebida por mente humana. El horizonte mismo está a punto de cambiar para siempre.',
    pharaohGreeting: 'Ka Eterno... Los hombres me llaman Jufu. Siento tu presencia en cada bloque que mis trabajadores arrastran desde Asuán. Los arquitectos me muestran planos que desafían lo posible. Pero nada de esto nace sin tu chispa divina. Dime cuál debe ser mi legado en esta tierra.',
    blessings: [
      {
        id: 'keops_sabiduria',
        icon: '🌅',
        label: 'Sabiduría del Horizonte',
        desc: 'El faraón contemplará el cosmos antes de ordenar. Sus monumentos hablarán a la eternidad más que a los hombres.',
        fx: { cultura: 8, fe: 5 },
      },
      {
        id: 'keops_fuerza',
        icon: '🪨',
        label: 'Fuerza de la Piedra',
        desc: 'Como la roca de Asuán, el reinado será inamovible. El pueblo obedecerá y los nobles no se atreverán a desafiar.',
        fx: { estabilidad: 8, influencia: 5 },
      },
      {
        id: 'keops_abundancia',
        icon: '🌊',
        label: 'Abundancia del Nilo',
        desc: 'Las inundaciones serán generosas. Los graneros rebostarán y las rutas de comercio se multiplicarán.',
        fx: { riqueza: 7, comercio: 6 },
      },
    ],
    missions: [
      {
        id: 'keops_piramide',
        icon: '🔺',
        label: 'Erigir la Gran Pirámide',
        desc: 'Movilizar cuadrillas del Estado para construir la mayor tumba y monumento jamás concebido en la historia del Imperio.',
        pharaohResponse: '¡Que se muevan las cuadrillas desde el amanecer! Cada bloque será un verso de mi gloria eterna grabado en piedra caliza.',
        fx: { cultura: 10, fe: 6, riqueza: -8 },
      },
      {
        id: 'keops_estado',
        icon: '⚖️',
        label: 'Organizar el Estado',
        desc: 'Restructurar la administración y los graneros reales para sostener proyectos de esta escala durante décadas.',
        pharaohResponse: 'El orden es la base de toda grandeza. Los escribas sabrán exactamente qué hacer. El Estado será tan preciso como mis pirámides.',
        fx: { estabilidad: 9, riqueza: -4 },
      },
      {
        id: 'keops_punt',
        icon: '🚢',
        label: 'Abrir rutas hacia Punt',
        desc: 'Enviar expediciones navales al sur para traer incienso, ébano y oro desde las tierras legendarias de Punt.',
        pharaohResponse: 'Que los barcos zarpen hacia el sur. El incienso de Punt adornará mis templos y el oro llenará mis cofres reales.',
        fx: { riqueza: 7, comercio: 8 },
      },
      {
        id: 'keops_fronteras',
        icon: '⚔️',
        label: 'Fortalecer las fronteras',
        desc: 'Establecer guarniciones militares en el Sinaí y el delta del Nilo para proteger las rutas de aprovisionamiento.',
        pharaohResponse: 'Ningún enemigo cruzará nuestras fronteras mientras yo reine. El Sinaí será nuestro y sus minas también.',
        fx: { estabilidad: 7, influencia: 6, riqueza: -5 },
      },
    ],
  },

  senusret: {
    id: 'senusret',
    name: 'Senusret III',
    nameGlyph: '𓇓',
    icon: '⚔️',
    years: '1878–1839 a.C.',
    dynasty: 'XII Dinastía',
    title: 'El Faraón Guerrero que reorganizó el Imperio',
    bio: 'Senusret III fue uno de los faraones más poderosos del Imperio Medio. Sus campañas militares llevaron la frontera egipcia hasta la tercera catarata del Nilo, incorporando Nubia y sus minas de oro. Fue también un reformador: redujo el poder de los nomarcas locales y centralizó la administración estatal, sentando las bases del gobierno burocrático que sostendría Egipto durante siglos.',
    coronationText: 'Una energía nueva desciende desde el Alto Egipto — dura como el granito de Asuán, calculada como las estrellas que guían a los navegantes nocturnos. El Ka reconoce la sangre de los guerreros: un faraón que no gobernará desde el trono sino desde el campo de batalla, que doblará el poder de los nobles y pondrá el orden por encima de todo privilegio heredado.',
    pharaohGreeting: 'Ka Eterno... He cruzado la tercera catarata y he plantado mi estela en tierra nubia. Los nomarcas me temen más que a los dioses. Pero la guerra sin dirección divina es caos. Hablo ante ti no como conquistador orgulloso, sino como servidor del Nilo que necesita saber qué parte del Imperio reclama su brazo ahora.',
    blessings: [
      {
        id: 'senusret_valor',
        icon: '⚔️',
        label: 'Valor del Guerrero',
        desc: 'El faraón llevará la espada antes que el cetro. Sus victorias militares unificarán el Imperio bajo un solo puño.',
        fx: { influencia: 8, estabilidad: 6 },
      },
      {
        id: 'senusret_justicia',
        icon: '⚖️',
        label: 'Justicia del Visir',
        desc: 'La ley será igual para nobles y campesinos. La reforma administrativa florecerá y el orden civil prevalecerá.',
        fx: { cultura: 7, estabilidad: 6 },
      },
      {
        id: 'senusret_oro',
        icon: '🥇',
        label: 'Oro de Nubia',
        desc: 'Las minas del sur darán su tesoro al Imperio. Los mercaderes prosperarán y las arcas reales se llenarán.',
        fx: { riqueza: 8, comercio: 5 },
      },
    ],
    missions: [
      {
        id: 'senusret_nubia',
        icon: '🗡️',
        label: 'Conquistar Nubia',
        desc: 'Llevar el ejército hasta la tercera catarata del Nilo e imponer el dominio egipcio sobre los reinos del sur.',
        pharaohResponse: '¡Las cataratas serán nuestras! El oro de Nubia llenará los graneros del Imperio y mi nombre quedará grabado en cada estela fronteriza.',
        fx: { influencia: 10, riqueza: 6, estabilidad: -5 },
      },
      {
        id: 'senusret_reforma',
        icon: '📜',
        label: 'Reformar la burocracia',
        desc: 'Reducir el poder de los nomarcas hereditarios y centralizar la administración estatal bajo el control del visir.',
        pharaohResponse: 'Los nobles deben entender que sirven al faraón, no al revés. Reorganizaré todo desde los graneros hasta los tribunales locales.',
        fx: { estabilidad: 9, cultura: 5, influencia: -3 },
      },
      {
        id: 'senusret_fortalezas',
        icon: '🏯',
        label: 'Construir fortalezas fronterizas',
        desc: 'Erigir una cadena de fortalezas en la frontera nubia — Semna, Buhen, Mirgissa — para controlar el tráfico del Nilo.',
        pharaohResponse: 'Semna y Buhen serán inexpugnables. Nadie cruzará hacia el norte sin mi permiso ni el sello del visir real.',
        fx: { estabilidad: 8, influencia: 5, riqueza: -6 },
      },
      {
        id: 'senusret_levante',
        icon: '🤝',
        label: 'Rutas con el Levante',
        desc: 'Abrir tratados comerciales con Biblos y las ciudades cananeas del norte, asegurando madera de cedro y metales.',
        pharaohResponse: 'Los mercaderes de Biblos ya nos esperan en el delta. Abramos el camino hacia el norte — la madera de cedro vale tanto como el oro.',
        fx: { riqueza: 8, comercio: 8, influencia: 3 },
      },
    ],
  },

  ramses: {
    id: 'ramses',
    name: 'Ramsés II',
    nameGlyph: '𓇾',
    icon: '𓃭',
    years: '1279–1213 a.C.',
    dynasty: 'XIX Dinastía',
    title: 'El Grande — 66 años de reinado sobre el Doble País',
    bio: 'Ramsés II gobernó Egipto durante 66 años, el reinado más glorioso del Imperio Nuevo. Combatió en la batalla de Qadesh contra los hititas y luego firmó el primer tratado de paz de la historia conocida. Encargó la construcción de monumentos colosales: Abu Simbel, el Ramseseum, Pi-Ramsés. Su nombre aparece grabado en piedra más veces que el de cualquier otro faraón de la historia.',
    coronationText: 'El Ka siente un rugido desde el delta, como el trueno antes de la tormenta en el desierto oriental. Sesenta y seis años de piedra, conquista y gloria se condensan en un solo nombre. El portador del cartucho más repetido del Imperio se inclina — no ante los hombres, sino ante la voluntad eterna que lo precedió y que lo sobrevivirá. El sol de Ra nunca brilló con más fuerza sobre la doble corona.',
    pharaohGreeting: 'Ka Eterno... He combatido en Qadesh, he visto morir a mis mejores soldados bajo los carros hititas. He grabado mi nombre en cada templo desde Abu Simbel hasta el delta del Nilo. Pero sin tu guía invisible detrás de cada decisión, soy polvo como todos los que vinieron antes. ¿Hacia dónde debe mirar el halcón ahora?',
    blessings: [
      {
        id: 'ramses_gloria',
        icon: '👑',
        label: 'Gloria Eterna',
        desc: 'El nombre del faraón será pronunciado por siglos. Sus monumentos hablarán de él cuando el Imperio ya no exista.',
        fx: { influencia: 8, cultura: 6 },
      },
      {
        id: 'ramses_espada',
        icon: '⚔️',
        label: 'Espada de Ra',
        desc: 'El dios sol guiará su brazo en la batalla. Los ejércitos del mundo lo temerán y sus fronteras serán inviolables.',
        fx: { influencia: 7, estabilidad: 6 },
      },
      {
        id: 'ramses_prosperidad',
        icon: '🌾',
        label: 'Prosperidad del Doble País',
        desc: 'El Alto y el Bajo Egipto prosperarán como uno. Los graneros rebostarán y el pueblo amará a su faraón.',
        fx: { riqueza: 7, estabilidad: 6 },
      },
    ],
    missions: [
      {
        id: 'ramses_abusimbel',
        icon: '🏛️',
        label: 'Construir Abu Simbel',
        desc: 'Tallar cuatro colosos de 20 metros en la roca viva de Nubia, dedicados a Ra-Horajty y a la gloria del faraón.',
        pharaohResponse: '¡Que mis talladores partan hacia el sur! Cuatro colosos me inmortalizarán en Nubia. Cada viajero que remonte el Nilo sabrá quién gobierna este mundo.',
        fx: { cultura: 10, fe: 7, riqueza: -8 },
      },
      {
        id: 'ramses_tratado',
        icon: '🕊️',
        label: 'Tratado de paz con los hititas',
        desc: 'Firmar el primer tratado de paz internacional de la historia con el rey Hattusili III, sellando la frontera norte.',
        pharaohResponse: 'La guerra con los hititas nos costó demasiada sangre. La paz también puede ser victoria — y este tratado será grabado en plata y recordado por siempre.',
        fx: { influencia: 8, comercio: 6, estabilidad: 5 },
      },
      {
        id: 'ramses_ejercito',
        icon: '⚔️',
        label: 'Expandir el ejército',
        desc: 'Reclutar nuevas divisiones de carros de guerra y soldados nubios de élite para la guardia real del faraón.',
        pharaohResponse: 'Más carros, más lanceros nubios en la guardia real. El Imperio debe ser temido en cada frontera. Ningún enemigo debe subestimarnos jamás.',
        fx: { influencia: 7, estabilidad: 6, riqueza: -6 },
      },
      {
        id: 'ramses_piramses',
        icon: '🏙️',
        label: 'Fundar Pi-Ramsés',
        desc: 'Construir una nueva capital en el delta del Nilo que lleve el nombre del faraón y sirva de base para las campañas del norte.',
        pharaohResponse: 'La nueva capital del delta llevará mi nombre y será la ciudad más gloriosa del mundo conocido. Que los arquitectos comiencen los planos esta misma noche.',
        fx: { estabilidad: 7, cultura: 6, riqueza: -5 },
      },
    ],
  },

  nectanebo: {
    id: 'nectanebo',
    name: 'Nectanebo I',
    nameGlyph: '𓇋',
    icon: '𓂀',
    years: '380–362 a.C.',
    dynasty: 'XXX Dinastía',
    title: 'Último gran faraón nativo antes de la conquista persa',
    bio: 'Nectanebo I fundó la última dinastía nativa que gobernó Egipto de manera independiente. Ascendió al poder como general victorioso y consolidó el reino frente a la amenaza constante del Imperio Persa. Fue un gran mecenas de los templos: financió obras en Edfu, Karnak y el oasis de Siwa. Su capacidad para mantener a Egipto libre de la dominación extranjera fue considerada por su pueblo como un milagro de los dioses.',
    coronationText: 'El Ka percibe el crepúsculo acercarse desde el este — pero también una llama que se resiste a extinguirse. El último faraón de sangre puramente egipcia levanta la doble corona en tiempos de sombra profunda. Los dioses antiguos aún respiran en este hombre. El Imperio puede resistir, si la voluntad eterna lo sostiene con toda su fuerza.',
    pharaohGreeting: 'Ka Eterno... Los persas acechan en el horizonte oriental. Las ciudades griegas me ofrecen alianzas que no comprendo del todo. Mis sacerdotes aseguran que los dioses todavía nos protegen. Pero yo sé que sin tu voluntad detrás de mis decisiones, el Egipto eterno podría quebrarse en mis propias manos. Dime qué debo hacer primero.',
    blessings: [
      {
        id: 'nectanebo_fe',
        icon: '𓂀',
        label: 'Fe en los Dioses Antiguos',
        desc: 'El faraón buscará la protección de los dioses ancestrales. Los templos reconstruidos serán su escudo y su legitimidad.',
        fx: { fe: 9, cultura: 5 },
      },
      {
        id: 'nectanebo_murallas',
        icon: '🛡️',
        label: 'Murallas del Pueblo',
        desc: 'El pueblo egipcio se unirá ante la amenaza exterior. Las fronteras resistirán gracias a la unidad nacional.',
        fx: { estabilidad: 8, influencia: 5 },
      },
      {
        id: 'nectanebo_diplomacia',
        icon: '🤝',
        label: 'Diplomacia con Grecia',
        desc: 'Las ciudades-estado griegas serán aliadas poderosas. Su plata y sus mercenarios compensarán la amenaza persa.',
        fx: { comercio: 7, influencia: 7 },
      },
    ],
    missions: [
      {
        id: 'nectanebo_templos',
        icon: '🏛️',
        label: 'Restaurar los templos sagrados',
        desc: 'Financiar obras en Edfu, Karnak y el oasis de Siwa para recuperar la legitimidad divina del faraón ante el pueblo.',
        pharaohResponse: 'Edfu, Karnak, Luxor... todos serán restaurados con piedra nueva. Los dioses nos deben su protección y yo les daré lo que merecen.',
        fx: { fe: 10, cultura: 6, riqueza: -7 },
      },
      {
        id: 'nectanebo_grecia',
        icon: '🤝',
        label: 'Alianza con las ciudades griegas',
        desc: 'Negociar contratos militares con Atenas, Esparta y Corinto para obtener tropas mercenarias expertas en falanges.',
        pharaohResponse: 'Los griegos son los mejores soldados del mundo conocido. Con su falange y nuestra caballería nubia, el Persa no pasará por el delta.',
        fx: { comercio: 8, influencia: 7, estabilidad: 3 },
      },
      {
        id: 'nectanebo_delta',
        icon: '🏰',
        label: 'Reforzar las defensas del Delta',
        desc: 'Construir una red de fortalezas y canales defensivos en el delta del Nilo, la puerta de entrada de toda invasión desde el norte.',
        pharaohResponse: 'El Delta es la puerta de Egipto. Que ningún enemigo la encuentre sin guardia. Canalizaremos los brazos del Nilo y levantaremos torres en cada cruce.',
        fx: { estabilidad: 9, influencia: 5, riqueza: -6 },
      },
      {
        id: 'nectanebo_sacerdotes',
        icon: '𓂀',
        label: 'Unificar los sacerdotes',
        desc: 'Conciliar a los sacerdotes de Amón, Ra y Ptah bajo una doctrina común que legitime al faraón como sumo pontífice.',
        pharaohResponse: 'Amón, Ra, Ptah — todos hablan por mí y yo hablo por ellos. Que sus sacerdotes hablen con una sola voz. La unidad religiosa es la primera muralla de Egipto.',
        fx: { fe: 8, estabilidad: 5, cultura: 4 },
      },
    ],
  },
}

// ── PLACEHOLDER GAME EVENTS ──────────────────────────────────────────────────
// Injected into buildGameEvents at fixed absolute indices (4, 12, 20, 28).
// Negative IDs avoid collision with normal events (which use positive integers).

export const PHARAOH_PLACEHOLDER_EVENTS: GameEvent[] = [
  {
    id: -1001,
    per: 'antiguo',
    cat: 'faraon',
    title: 'Coronación de Keops',
    desc: '',
    ctx: '',
    opts: [],
    tl: { date: '2589 a.C.', ph: 'Keops (Jufu)', ev: 'El Ka presencia el surgimiento de un nuevo faraón', tip: '' },
    isPharaoh: true,
    pharaohId: 'keops',
  },
  {
    id: -1002,
    per: 'medio',
    cat: 'faraon',
    title: 'Coronación de Senusret III',
    desc: '',
    ctx: '',
    opts: [],
    tl: { date: '1878 a.C.', ph: 'Senusret III', ev: 'El Ka presencia el surgimiento de un nuevo faraón', tip: '' },
    isPharaoh: true,
    pharaohId: 'senusret',
  },
  {
    id: -1003,
    per: 'nuevo',
    cat: 'faraon',
    title: 'Coronación de Ramsés II',
    desc: '',
    ctx: '',
    opts: [],
    tl: { date: '1279 a.C.', ph: 'Ramsés II', ev: 'El Ka presencia el surgimiento de un nuevo faraón', tip: '' },
    isPharaoh: true,
    pharaohId: 'ramses',
  },
  {
    id: -1004,
    per: 'tardio',
    cat: 'faraon',
    title: 'Coronación de Nectanebo I',
    desc: '',
    ctx: '',
    opts: [],
    tl: { date: '380 a.C.', ph: 'Nectanebo I', ev: 'El Ka presencia el surgimiento de un nuevo faraón', tip: '' },
    isPharaoh: true,
    pharaohId: 'nectanebo',
  },
]
