import type { GameEvent } from '../types'

export const EVENTS: GameEvent[] =[
  {id:1,per:"antiguo",cat:"economia",title:"La Crecida del Nilo Falla",
  desc:"El mes de Akhet ha llegado, pero el Nilo no responde. Los nilómetros de Elefantina marcan niveles alarmantemente bajos: las aguas no subirán lo suficiente. En las orillas, los campesinos contemplan mudos la tierra reseca. Sin la inundación, no habrá limo negro, no habrá cosecha, no habrá vida. Los sacerdotes de Hapi invocan al dios del río, pero el pueblo te mira a ti. La hambruna se siente como una sombra que se acerca.",
  ctx:"La inundación anual (akhet, junio-septiembre) depositaba el limo negro que hacía de Egipto el 'don del Nilo', según Heródoto. Los nilómetros medían el nivel: menos de 16 codos significaba hambruna; más de 18, inundaciones destructoras. Un fallo era interpretado como castigo divino.",
  opts:[
    {t:"Organizar rituales masivos en honor a Hapi: música, ofrendas y procesiones al río",fx:{estabilidad:5,riqueza:-5,cultura:5,influencia:-2},type:"cultural"},
    {t:"Abrir los silos estatales: distribuir reservas de grano a precio reducido en todos los nomos",fx:{estabilidad:8,riqueza:-7,cultura:0,influencia:3},type:"social"},
    {t:"Requisar el grano de los nobles y sacerdotes para redistribuirlo entre el pueblo",fx:{estabilidad:3,riqueza:4,cultura:-4,influencia:6},type:"militar"},
    {t:"Declarar que el pueblo ha ofendido a los dioses y exigir sacrificios y penitencia pública",fx:{estabilidad:-6,riqueza:0,cultura:-5,influencia:-4},type:"cruel"}
  ],
  tl:{date:"2900 aC",ph:"Narmer / Menes",ev:"Unificación del Alto y Bajo Egipto",tip:"Narmer unificó los Dos Reinos con la doble corona. Su paleta de esquisto narra la primera gran conquista de la historia."}},

  {id:2,per:"antiguo",cat:"politica",title:"La Traición del Visir",
  desc:"Tus espías traen una noticia devastadora: Amenhotep, tu visir de veinte años de servicio, ha estado negociando en secreto con los jefes nómades del Sinaí, prometiéndoles acceso a las minas de cobre a cambio de sobornos de oro. La corte entera espera tu reacción. El visir era tu mano derecha, conoce todos los secretos del Estado. Si te muestras débil, los demás nobles tomarán nota. Si eres demasiado cruel, sembrarás el miedo entre tus funcionarios.",
  ctx:"El visir (tjaty) administraba la justicia, coordinaba la burocracia y era la voz del faraón. Su traición rompía Maat, el orden cósmico que el faraón debía mantener. Los textos de Rekhmira describen que el visir debía ser 'el pilar de toda la tierra'.",
  opts:[
    {t:"Juzgarlo públicamente ante el tribunal de los 30 nobles: justicia visible para todos",fx:{estabilidad:7,riqueza:0,cultura:7,influencia:5},type:"cultural"},
    {t:"Ejecutarlo en la plaza central como advertencia a cualquier traidor potencial",fx:{estabilidad:4,riqueza:0,cultura:-5,influencia:8},type:"militar"},
    {t:"Exiliarlo al desierto y confiscar todas sus propiedades para el tesoro real",fx:{estabilidad:3,riqueza:6,cultura:0,influencia:5},type:"economico"},
    {t:"Perdonarlo a cambio de información detallada sobre los contactos nómades",fx:{estabilidad:-4,riqueza:2,cultura:-4,influencia:-5},type:"cruel"}
  ],
  tl:{date:"2650 aC",ph:"Djoser (Dyeser)",ev:"Pirámide Escalonada de Saqqara — primera en piedra",tip:"Imhotep, arquitecto y médico genial, diseñó para Djoser la primera estructura de piedra de la historia. Fue tan venerado que siglos después fue deificado."}},

  {id:3,per:"antiguo",cat:"religion",title:"El Oráculo de Amón Habla",
  desc:"En medio de la noche, el sumo sacerdote llega a tu cámara con los ojos encendidos: el oráculo de Amón en Karnak ha profetizado. Una plaga de langostas devastará los campos si no se erige un nuevo santuario en su honor antes de la próxima inundación. Los sacerdotes muestran los papiros: la señal es clara. Pero el tesoro real está comprometido con la construcción de la nueva necrópolis. Construir el santuario requeriría desviar miles de trabajadores y toneladas de piedra caliza.",
  ctx:"Los oráculos eran la voz política de los dioses: el clero de Amón usaba la estatua procesional para 'responder' preguntas inclinándose hacia adelante (sí) o atrás (no). Este sistema concentró tanto poder en los sacerdotes que en el Período Tardío gobernaron el sur de Egipto.",
  opts:[
    {t:"Financiar el santuario completo: el pueblo verá la devoción del faraón",fx:{estabilidad:7,riqueza:-8,cultura:8,influencia:-2},type:"cultural"},
    {t:"Construir un santuario más modesto con láminas de oro en las columnas",fx:{estabilidad:4,riqueza:-4,cultura:5,influencia:2},type:"economico"},
    {t:"Ordenar estudios astrológicos adicionales antes de comprometer recursos",fx:{estabilidad:-3,riqueza:0,cultura:2,influencia:-2},type:"social"},
    {t:"Declarar que el oráculo fue mal interpretado y destituir al sumo sacerdote",fx:{estabilidad:-7,riqueza:2,cultura:-8,influencia:4},type:"cruel"}
  ],
  tl:{date:"2560 aC",ph:"Keops (Jufu)",ev:"Gran Pirámide de Guiza — 2.3 millones de bloques",tip:"La Gran Pirámide tardó 20 años y 25.000 trabajadores. Era la estructura más alta del mundo durante 3.800 años, hasta la catedral de Lincoln en 1311 dC."}},

  {id:4,per:"antiguo",cat:"sociedad",title:"Los Trabajadores del Gran Templo se Niegan",
  desc:"El capataz llega con malas noticias: los obreros de la cantera de Tura han abandonado las herramientas. Llevan tres días sin moverse. El calor es insoportable, la comida escasea, y dos hombres murieron aplastados por bloques mal asegurados. Son hombres libres, campesinos que sirven su turno de trabajo obligatorio al Estado, la corvée. Sus familias esperan en las aldeas del delta. Sin ellos, la construcción se detiene.",
  ctx:"Los constructores de monumentos egipcios NO eran esclavos. Eran trabajadores del Estado que servían turnos rotativos, recibían cerveza, pan, pescado salado, atención médica y un entierro honorable. Los papiros de Deir el-Medina documentan incluso huelgas por falta de raciones.",
  opts:[
    {t:"Mejorar las raciones, añadir médicos y establecer normas de seguridad en la cantera",fx:{estabilidad:8,riqueza:-6,cultura:4,influencia:0},type:"social"},
    {t:"Negociar: reducir el turno de trabajo a cambio de dos años adicionales de servicio",fx:{estabilidad:5,riqueza:-2,cultura:2,influencia:2},type:"economico"},
    {t:"Enviar soldados para escoltar a los trabajadores de vuelta a la obra por la fuerza",fx:{estabilidad:-7,riqueza:0,cultura:-4,influencia:7},type:"militar"},
    {t:"Reemplazarlos con prisioneros nubios: los hombres libres ya no son confiables",fx:{estabilidad:-5,riqueza:3,cultura:-7,influencia:4},type:"cruel"}
  ],
  tl:{date:"2490 aC",ph:"Micerino (Menkaura)",ev:"Tercera pirámide de Guiza con revestimiento de granito rosa",tip:"Micerino, más humano que sus predecesores, redujo el tamaño de su pirámide pero la revistió de costoso granito rosa de Asuán. Los textos tardíos lo recuerdan como el faraón más justo."}},

  {id:5,per:"antiguo",cat:"economia",title:"La Expedición a la Tierra de Punt",
  desc:"El almirante Nehsi llega ante ti con mapas y propuestas: los mercaderes de Punt, la tierra misteriosa al sur del Mar Rojo, ofrecen mirra para los templos, ébano negro como la noche, incienso para las ceremonias y marfil de elefante. Pero el viaje exige diez barcos, doscientos marineros, meses de travesía por mares desconocidos y fondos considerables del tesoro. La última expedición fue hace cincuenta años. Algunos de los marineros no regresaron.",
  ctx:"Punt era probablemente la actual Somalia, Eritrea o Yemen. El ébano y la mirra eran imprescindibles en la vida religiosa egipcia. La reina Hatshepsut envió la expedición más famosa circa 1495 aC, documentada en bajorrelieves del templo de Deir el-Bahari.",
  opts:[
    {t:"Financiar la expedición completa: el prestigio y las riquezas de Punt bien valen el riesgo",fx:{estabilidad:0,riqueza:8,cultura:5,influencia:5},type:"economico"},
    {t:"Expedición mixta: asociarse con mercaderes fenicios para compartir costos y riesgos",fx:{estabilidad:0,riqueza:5,cultura:2,influencia:2},type:"economico"},
    {t:"Declinar: los riesgos superan los beneficios, reforzar el comercio terrestre con Nubia",fx:{estabilidad:3,riqueza:-2,cultura:-2,influencia:-2},type:"social"},
    {t:"Ordenar la expedición como corvée militar: los marineros irán quieran o no",fx:{estabilidad:-4,riqueza:7,cultura:-4,influencia:-5},type:"cruel"}
  ],
  tl:{date:"2450 aC",ph:"Sahura (Dinastía V)",ev:"Primera expedición naval documentada a Punt",tip:"Sahura envió la primera flota registrada en textos: 5 barcos y 200 hombres. Los relieves de su templo funerario muestran los barcos cargados de árboles de mirra con las raíces envueltas en arpillera."}},

  {id:6,per:"antiguo",cat:"politica",title:"Los Nomos Reclaman Autonomía",
  desc:"Los nomarcas del Alto Egipto han enviado un documento conjunto: reclaman el derecho a recaudar sus propios impuestos, a nombrar a sus propios jueces y a mantener milicias privadas. Su argumento es seductor: las provincias distantes conocen mejor sus necesidades. Pero tú sabes lo que esto significa en realidad. Cuando el poder del faraón se fragmenta, Egipto se rompe. Ya ocurrió antes. Puede volver a ocurrir.",
  ctx:"La fragmentación del poder en los nomos fue la causa directa del Primer Período Intermedio (2181-2055 aC), cuando Egipto se dividió en reinos menores durante 125 años de guerras civiles, hambrunas y caos. Los textos de Heracleópolis describen el horror de ese período.",
  opts:[
    {t:"Reformar la burocracia: crear inspectores reales que supervisen a los nomarcas in situ",fx:{estabilidad:8,riqueza:-4,cultura:4,influencia:8},type:"social"},
    {t:"Negociar: autonomía fiscal limitada a cambio de tributo fijo anual y lealtad militar",fx:{estabilidad:3,riqueza:-5,cultura:0,influencia:-4},type:"politico"},
    {t:"Destituir a los nomarcas más rebeldes y reemplazarlos con funcionarios leales de Memphis",fx:{estabilidad:-5,riqueza:0,cultura:-2,influencia:8},type:"militar"},
    {t:"Ignorar el problema: los conflictos entre provincias se resolverán solos",fx:{estabilidad:-8,riqueza:-4,cultura:-4,influencia:-7},type:"cruel"}
  ],
  tl:{date:"2200 aC",ph:"Pepi II (Neferkara)",ev:"El reinado más largo de la historia: 94 años",tip:"Pepi II ascendió al trono a los 6 años y reinó casi un siglo. En su vejez, el poder central se evaporó. Su reinado interminable es paradójicamente el inicio del fin del Antiguo Imperio."}},

  {id:7,per:"antiguo",cat:"religion",title:"Los Primeros Textos Sagrados",
  desc:"El sumo sacerdote de Heliópolis llega con una propuesta sin precedentes: grabar en las paredes de la cámara funeraria los hechizos, conjuros e himnos que guiarán al faraón por el Más Allá. Miles de signos jeroglíficos esculpidos en piedra caliza blanca. Nunca antes se había hecho. Los textos transformarían la muerte misma en un viaje con mapa. Pero requieren décadas de trabajo de los mejores escribas y artesanos del reino.",
  ctx:"Los Textos de las Pirámides (2375-2055 aC) son el corpus religioso escrito más antiguo del mundo. Encontrados en las pirámides de Unas y sus sucesores, contienen 800 conjuros para proteger al faraón en el Más Allá. Sentaron las bases del Libro de los Muertos.",
  opts:[
    {t:"Financiar plenamente el proyecto: un cuerpo de 50 escribas trabajará en exclusiva",fx:{estabilidad:4,riqueza:-6,cultura:8,influencia:2},type:"cultural"},
    {t:"Aprobar el proyecto con recursos limitados: los textos más esenciales solamente",fx:{estabilidad:2,riqueza:-2,cultura:5,influencia:0},type:"cultural"},
    {t:"Condicionar los textos: solo se grabarán las glorias del faraón, no los misterios divinos",fx:{estabilidad:-2,riqueza:0,cultura:3,influencia:6},type:"politico"},
    {t:"Prohibirlo: el conocimiento sagrado del Más Allá no debe quedar escrito en piedra",fx:{estabilidad:-4,riqueza:0,cultura:-8,influencia:0},type:"cruel"}
  ],
  tl:{date:"2375 aC",ph:"Unas (Wenis) — Dinastía V",ev:"Primeros Textos de las Pirámides en la historia",tip:"La pirámide de Unas en Saqqara parece modesta por fuera, pero su cámara funeraria está cubierta de jeroglíficos turquesa. Contiene 283 conjuros, el catálogo más antiguo de creencias sobre el Más Allá."}},

  {id:8,per:"antiguo",cat:"sociedad",title:"La Gran Sequía del Sahara",
  desc:"Desde el oeste llegan caravanas desesperadas. La gran sequía que comenzó hace décadas avanza: los pastizales del Sahara se han vuelto desierto, las tribus que antes vivían de sus rebaños ahora huyen. Traen consigo ovejas, cabras, conocimientos sobre pozos y pastoreo... pero también enfermedades que el cuerpo egipcio no conoce. El delta ya recibe a cientos de familias. Pronto serán miles.",
  ctx:"El 'Evento de 4.2 kiloyears' fue una megasequía global circa 2200 aC que transformó el Sahara verde en desierto árido. Arqueólogos como de Menocal lo vinculan directamente con el colapso del Antiguo Imperio y el caos del Primer Período Intermedio.",
  opts:[
    {t:"Política de puertas abiertas: integrar a los refugiados como trabajadores agrícolas y artesanos",fx:{estabilidad:5,riqueza:4,cultura:6,influencia:-2},type:"social"},
    {t:"Admisión controlada: campamentos de cuarentena, registro y asignación de roles productivos",fx:{estabilidad:7,riqueza:2,cultura:4,influencia:0},type:"social"},
    {t:"Ayuda humanitaria exterior: provisiones en la frontera, pero ningún ingreso al territorio",fx:{estabilidad:2,riqueza:-2,cultura:0,influencia:4},type:"politico"},
    {t:"Despliegue militar en la frontera occidental: ningún extranjero cruza las tierras del faraón",fx:{estabilidad:-4,riqueza:0,cultura:-4,influencia:6},type:"cruel"}
  ],
  tl:{date:"2181 aC",ph:"Fin del Antiguo Imperio",ev:"Colapso — inicio del Primer Período Intermedio",tip:"125 años de fragmentación siguieron al colapso. Los 'Textos de las Lamentaciones' describen un mundo al revés: los pobres se volvieron ricos, los templos fueron saqueados, el Nilo olía a sangre."}},

  {id:9,per:"medio",cat:"politica",title:"Reunificación: ¿Cómo Gobernar Egipto?",
  desc:"Mentuhotep II ha reunificado los Dos Reinos después de 125 años de caos. El ejército tebano ha vencido. Pero ahora llega la pregunta más difícil: ¿cómo gobernar un Egipto quebrado, desconfiado y con heridas que aún sangran? Los nomarcas del norte miran con recelo al nuevo faraón del sur. Los templos necesitan reconstrucción. El pueblo quiere orden. Tú decides la arquitectura del nuevo poder.",
  ctx:"Mentuhotep II (2055-2004 aC) es considerado el segundo gran unificador de Egipto. Su estrategia fue pragmática: mantuvo a algunos nomarcas locales pero instaló funcionarios reales como supervisores. Inauguró el Imperio Medio y un siglo de prosperidad.",
  opts:[
    {t:"Sistema bicéfalo: centralismo político con autonomía económica para los nomos leales",fx:{estabilidad:8,riqueza:8,cultura:6,influencia:7},type:"politico"},
    {t:"Centralismo total: todos los nomarcas son reemplazados por burócratas designados desde Tebas",fx:{estabilidad:7,riqueza:4,cultura:0,influencia:8},type:"politico"},
    {t:"Confederación pragmática: los nomarcas conservan su poder a cambio de tributo y soldados",fx:{estabilidad:4,riqueza:6,cultura:4,influencia:4},type:"social"},
    {t:"Dejar que los nomos se gobiernen solos mientras Tebas consolida el sur",fx:{estabilidad:-7,riqueza:-4,cultura:-2,influencia:-6},type:"cruel"}
  ],
  tl:{date:"2055 aC",ph:"Mentuhotep II (Nebhepetre)",ev:"Reunificación — inicio del Imperio Medio",tip:"Mentuhotep II reinó 51 años. Su templo funerario en Deir el-Bahari, con terrazas escalonadas y jardines de mirra, inspiró siglos después a Hatshepsut para construir su propio templo justo al lado."}},

  {id:10,per:"medio",cat:"economia",title:"Las Riquezas del Sinaí",
  desc:"El explorador Harkhuf regresa de una expedición al Sinaí con muestras de turquesa verde-azul del color del cielo al amanecer, y pepitas de cobre brillante. Las vetas son ricas, posiblemente las más ricas del mundo conocido. Pero la región está habitada por tribus beduinas que llevan generaciones extrayendo esos mismos minerales. Ellos conocen los pozos de agua, los caminos seguros, los peligros del desierto. Sin su cooperación, cualquier expedición podría terminar en desastre.",
  ctx:"Las minas de Serabit el-Jadim en el Sinaí fueron explotadas intermitentemente desde el Antiguo Imperio. Allí se encontraron los primeros textos proto-sinaíticos (1850 aC), el eslabón entre los jeroglíficos egipcios y el alfabeto fenicio-semítico, padre de todos los alfabetos actuales.",
  opts:[
    {t:"Contrato justo: contratar a los beduinos como guías, mineros y protectores a cambio de pago",fx:{estabilidad:7,riqueza:8,cultura:4,influencia:4},type:"social"},
    {t:"Negociar el acceso: pagar tributo anual a los líderes beduinos por el derecho de explotación",fx:{estabilidad:4,riqueza:7,cultura:2,influencia:0},type:"economico"},
    {t:"Ocupación militar: una guarnición permanente garantizará el acceso sin depender de los beduinos",fx:{estabilidad:-2,riqueza:8,cultura:-4,influencia:7},type:"militar"},
    {t:"Desplazar a las tribus hacia el interior del desierto por la fuerza",fx:{estabilidad:-8,riqueza:8,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"2000 aC",ph:"Senuseret I (Kheperkara)",ev:"Expansión hacia Nubia y las minas del Sinaí",tip:"En Serabit el-Jadim se construyó un templo a Hathor 'señora de la turquesa'. Los mineros semíticos que trabajaron allí adaptaron jeroglíficos para escribir su propio idioma — el primer alfabeto del mundo."}},

  {id:11,per:"medio",cat:"cultura",title:"El Nacimiento de la Literatura",
  desc:"Los escribas de la Casa de la Vida en Hermópolis proponen algo revolucionario: crear historias escritas no para los dioses ni para la eternidad, sino para el entretenimiento y la reflexión de los vivos. Novelas de viaje, cartas filosóficas, poemas de amor, debates entre el alma y el corazón. Un escriba de nombre Sinuhé ya ha comenzado. Los nobles más conservadores protestan: la escritura es sagrada, no un pasatiempo para cortesanos ociosos.",
  ctx:"La literatura del Imperio Medio (1900-1650 aC) se considera el 'clásico' egipcio. La Historia de Sinuhé, El náufrago, Los diálogos del desesperado son obras de una sofisticación asombrosa. Se copiaron durante siglos como modelos de escritura perfecta.",
  opts:[
    {t:"Crear la primera biblioteca real y asignar escribas dedicados exclusivamente a la literatura",fx:{estabilidad:4,riqueza:-6,cultura:8,influencia:2},type:"cultural"},
    {t:"Apoyar solo obras que exalten la gloria del faraón y los dioses",fx:{estabilidad:2,riqueza:-2,cultura:5,influencia:6},type:"politico"},
    {t:"Permitirlo como actividad privada sin financiamiento estatal",fx:{estabilidad:0,riqueza:0,cultura:3,influencia:0},type:"social"},
    {t:"Prohibir la escritura no-religiosa: solo los sacerdotes necesitan saber escribir",fx:{estabilidad:-7,riqueza:0,cultura:-8,influencia:2},type:"cruel"}
  ],
  tl:{date:"1950 aC",ph:"Amenemhat I (Sehetepibre)",ev:"Composición de la Historia de Sinuhé",tip:"Sinuhé es un funcionario que huye de Egipto por miedo político y vive décadas entre los pueblos del Levante. La historia explora el exilio, la identidad y el anhelo de volver a casa. Es extraordinariamente moderna."}},

  {id:12,per:"medio",cat:"sociedad",title:"¿Qué Hacer con los Prisioneros de Guerra?",
  desc:"El general Amenhotep regresa de Nubia con una victoria aplastante y un problema: siete mil prisioneros. Hombres, mujeres, niños. Guerreros nubios, campesinos, artesanos. Son personas, pero también son boca que alimentar, mano que podría rebelarse. Los generales quieren mano de obra barata para las canteras. Los sacerdotes piden que el faraón demuestre magnanimidad. La decisión que tomes sentará precedente durante generaciones.",
  ctx:"El Imperio Medio fue el período en que el trabajo forzado se sistematizó en Egipto. Los 'sirvientes del rey' (heriu-sha) incluían prisioneros de guerra, deudores y personas sin tierras. Las condiciones variaban enormemente según el trabajo asignado.",
  opts:[
    {t:"Integración progresiva: trabajo obligatorio por diez años con posibilidad de libertad y tierras",fx:{estabilidad:7,riqueza:6,cultura:4,influencia:2},type:"social"},
    {t:"Servicio militar: los nubios son guerreros excepcionales, ofrecerles integración en el ejército",fx:{estabilidad:5,riqueza:-2,cultura:2,influencia:8},type:"militar"},
    {t:"Esclavitud permanente asignada a las minas de oro de Nubia",fx:{estabilidad:-5,riqueza:8,cultura:-7,influencia:4},type:"economico"},
    {t:"Sacrificios rituales en los templos como demostración del poder divino del faraón",fx:{estabilidad:-8,riqueza:0,cultura:-8,influencia:-6},type:"cruel"}
  ],
  tl:{date:"1900 aC",ph:"Senuseret III (Khakaura)",ev:"Conquista de Nubia hasta la 3ª catarata del Nilo",tip:"Senuseret III construyó una cadena de ocho fortalezas en Nubia con sistemas de señalización por fuego. Fue tan venerado en Nubia que siglos después lo adoraron como dios local."}},

  {id:13,per:"medio",cat:"economia",title:"Los Mercaderes de Canaán",
  desc:"Una caravana llegó de Canaán con muestras: aceite de oliva en ánforas de barro rojo, vino tinto perfumado con resina de pino, y tablas de cedro del Líbano cuyo aroma llena el salón del trono. A cambio piden papiro, lino fino y, siempre, oro. La ruta comercial existe desde hace siglos, pero nunca fue tan lucrativa. Sin embargo, las caravanas cruzan tierras de tribus inciertas. El acuerdo requiere protección o el riesgo de perder los cargamentos.",
  ctx:"El comercio con Canaán era vital porque Egipto carecía de madera de calidad. El cedro libanés era imprescindible para barcos, ataúdes de lujo y estructuras de templos. Los textos de Amarna (siglo XIV aC) revelan que el intercambio de regalos diplomáticos era inseparable del comercio.",
  opts:[
    {t:"Tratado comercial oficial con protección militar de las rutas y tarifa arancelaria",fx:{estabilidad:4,riqueza:8,cultura:4,influencia:7},type:"economico"},
    {t:"Monopolio estatal: el faraón compra toda la producción y la redistribuye",fx:{estabilidad:2,riqueza:8,cultura:0,influencia:4},type:"politico"},
    {t:"Comercio libre: los mercaderes privados egipcios negocian directamente",fx:{estabilidad:0,riqueza:5,cultura:2,influencia:0},type:"economico"},
    {t:"Bloquear el comercio: el oro de Egipto no debe salir del país",fx:{estabilidad:0,riqueza:-4,cultura:-4,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1850 aC",ph:"Amenemhat III (Nimaatra)",ev:"Apogeo comercial del Imperio Medio",tip:"Amenemhat III abrió las minas del Fayum y desarrolló la primera economía redistributiva de escala. Su retrato en el Museo Egipcio de El Cairo muestra un rostro cansado, quizás el primer realismo psicológico del arte mundial."}},

  {id:14,per:"medio",cat:"politica",title:"Los Hicsos Llaman a la Puerta",
  desc:"Desde el noreste, más allá del Sinaí, llegan noticias inquietantes: pueblos del Levante, a quienes los egipcios llaman Hicsos —'gobernantes de tierras extranjeras'— se establecen pacíficamente en el delta oriental. Traen algo que Egipto nunca ha visto: caballos, carros de guerra con ruedas, arcos compuestos de múltiples materiales, espadas de bronce de diseño nuevo. No vienen como conquistadores. Pero si crecen lo suficiente... podrían serlo.",
  ctx:"Los Hicsos (1650-1550 aC) gobernaron el norte de Egipto por un siglo como Dinastías XV y XVI. Fueron el trauma fundador del Imperio Nuevo: la humillación de perder el norte impulsó a los faraones posteriores a construir el mayor ejército del mundo antiguo.",
  opts:[
    {t:"Integración estratégica: absorber su tecnología militar y sus conocimientos a cambio de tierras",fx:{estabilidad:4,riqueza:4,cultura:6,influencia:8},type:"militar"},
    {t:"Asentamiento controlado: zona especial en el delta oriental, sin acceso al interior",fx:{estabilidad:7,riqueza:6,cultura:4,influencia:2},type:"social"},
    {t:"Cobrar tributo a cambio de autorización formal: que paguen por quedarse",fx:{estabilidad:2,riqueza:8,cultura:-2,influencia:4},type:"economico"},
    {t:"Campaña militar preventiva: expulsarlos antes de que arraiguen",fx:{estabilidad:-7,riqueza:-4,cultura:-4,influencia:-2},type:"cruel"}
  ],
  tl:{date:"1650 aC",ph:"Salitis (primer rey Hicso)",ev:"Hicsos establecen su capital en Avaris",tip:"Avaris (actual Tell el-Dab'a) era una ciudad cosmopolita con cerámica cananea, micénica y chipriota. Las excavaciones revelaron frescos al estilo minoico: el mundo mediterráneo estaba más conectado de lo que creíamos."}},

  {id:15,per:"medio",cat:"religion",title:"El Más Allá para Todos",
  desc:"Algo extraordinario está ocurriendo en las ciudades del Alto Egipto. Artesanos, comerciantes, incluso algunos campesinos acomodados encargan a los pintores textos sagrados en el interior de sus ataúdes de madera. Los mismos hechizos que antes solo protegían al faraón en el Más Allá, ahora están al alcance de quien pueda pagar. El sumo sacerdote de Osiris lo llama 'la gran democratización'. Los nobles lo llaman 'una usurpación'.",
  ctx:"Los Textos de los Ataúdes (2100-1650 aC) extendieron a las clases medias el derecho a la vida eterna. Este fenómeno, llamado 'democratización del Más Allá', fue una revolución social silenciosa: la muerte igualaba a quien pudiera pagar los ritos. El Libro de los Muertos sería su continuación.",
  opts:[
    {t:"Apoyar el movimiento: financiar la escritura de textos sagrados para los templos de provincias",fx:{estabilidad:8,riqueza:-7,cultura:8,influencia:0},type:"cultural"},
    {t:"Regularlo: crear un sistema de licencias para los sacerdotes que venden los textos",fx:{estabilidad:4,riqueza:4,cultura:5,influencia:6},type:"politico"},
    {t:"No intervenir: que el mercado espiritual funcione libremente",fx:{estabilidad:4,riqueza:0,cultura:5,influencia:0},type:"social"},
    {t:"Prohibirlo: la vida eterna es prerrogativa del faraón y los grandes nobles",fx:{estabilidad:-8,riqueza:0,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"2055-1650 aC",ph:"Imperio Medio",ev:"Textos de los Ataúdes — democratización del Más Allá",tip:"El ataúd del noble Heqanakhte (1950 aC) incluye 222 conjuros. Los textos revelan una teología compleja: el difunto debía superar 42 confesiones negativas ante Osiris y Maat para alcanzar la vida eterna."}},

  {id:16,per:"medio",cat:"sociedad",title:"La Reina que Quiere Gobernar",
  desc:"La reina Sobekneferu es hija de Amenemhat III y hermana del faraón recién fallecido sin herederos varones. Es brillante, política, conocedora de los textos sagrados. Lleva años administrando el estado en la sombra. Ahora reclama el doble trono en su propio nombre, con peluca de faraón, barba postiza y kilt masculino. Los generales están inquietos. Los sacerdotes buscan precedentes en los textos. Tú debes decidir.",
  ctx:"Sobekneferu (Neferusobek, circa 1806-1802 aC) fue la primera faraona documentada que gobernó sola. Adoptó la titulatura masculina completa pero combinó los títulos femeninos con los masculinos: una solución sin precedentes al problema de una mujer en el trono.",
  opts:[
    {t:"Reconocerla plenamente: Sobekneferu gobierna con todos los poderes del faraón",fx:{estabilidad:7,riqueza:0,cultura:8,influencia:4},type:"cultural"},
    {t:"Co-regencia simbólica: gobierna en nombre del futuro heredero mientras se busca uno",fx:{estabilidad:5,riqueza:0,cultura:4,influencia:4},type:"social"},
    {t:"Consejo de regencia masculino con Sobekneferu como figura ceremonial",fx:{estabilidad:-2,riqueza:0,cultura:-7,influencia:4},type:"politico"},
    {t:"Confinamiento: la sucesión debe recaer en un noble varón de la sangre real",fx:{estabilidad:-7,riqueza:0,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1806 aC",ph:"Sobekneferu (Neferusobek)",ev:"Primera faraona que gobierna Egipto en solitario",tip:"El nombre Sobekneferu significa 'las perfecciones de Sobek', el cocodrilo. Gobernó 4 años y sus monumentos se han encontrado en Hawara, Heracleópolis y el Delta. Fue el último faraón del Imperio Medio."}},

  {id:17,per:"nuevo",cat:"politica",title:"La Expulsión de los Hicsos",
  desc:"El momento que tres generaciones de tebanos soñaron ha llegado. El faraón Seqenenra Tao murió en batalla —su momia muestra cinco golpes de hacha en el cráneo, una carnicería—. Su hijo Kamose comenzó la reconquista. Ahora tú, Ahmose, tienes los barcos fluviales, los carros de guerra y los soldados que los propios Hicsos nos enseñaron a usar. Avaris está a cuatro días de navegación. Pero una campaña total exige vaciar el tesoro y sangrar al ejército.",
  ctx:"Ahmose I (1550-1525 aC) expulsó a los Hicsos y fundó la Dinastía XVIII, la más gloriosa de Egipto. La ironía histórica perfecta: usó exactamente las tecnologías militares que los Hicsos introdujeron —carros, arcos compuestos, espadas de bronce— para expulsarlos.",
  opts:[
    {t:"Campaña total con negociación de rendición: expulsarlos pero ofrecerles salida honorable",fx:{estabilidad:4,riqueza:-4,cultura:4,influencia:8},type:"politico"},
    {t:"Guerra de exterminio: perseguirlos hasta Canaán y destruir Avaris piedra a piedra",fx:{estabilidad:-4,riqueza:-6,cultura:4,influencia:8},type:"militar"},
    {t:"Reconquistar el Delta y negociar: Avaris paga tributo pero sigue en pie",fx:{estabilidad:7,riqueza:-2,cultura:2,influencia:6},type:"diplomatico"},
    {t:"Consolidar el sur antes de atacar: que los Hicsos se debiliten solos",fx:{estabilidad:5,riqueza:4,cultura:0,influencia:-6},type:"economico"}
  ],
  tl:{date:"1550 aC",ph:"Ahmose I (Nebpehtyra)",ev:"Fundación del Imperio Nuevo — la era más gloriosa",tip:"La momia de Seqenenra Tao, padre de Ahmose, fue descubierta en 1881 con las heridas de batalla intactas. El análisis de 2021 confirmó que murió en combate, posiblemente capturado y ejecutado por oficiales Hicsos."}},

  {id:18,per:"nuevo",cat:"politica",title:"La Faraona que Desafió el Tiempo",
  desc:"Hatshepsut lleva cinco años como regente del joven Tutmosis III cuando da el paso que nadie esperaba: se corona faraona con plena titulatura real, barba postiza de oro, corona del Alto y Bajo Egipto. Sus monumentos empiezan a mostrarla como hombre. Su arquitecto y favorito, Senenmut, diseña para ella el templo más bello del mundo en las laderas de Deir el-Bahari. Tutmosis III, que ya tiene dieciséis años y mira desde las sombras, espera.",
  ctx:"Hatshepsut (1479-1458 aC) reinó 20 años en paz y prosperidad. Expandió el comercio, construyó más que cualquier faraón anterior, y organizó la expedición a Punt. Tutmosis III, después de su muerte, borró sistemáticamente su nombre de los monumentos — pero no pudo borrar su historia.",
  opts:[
    {t:"Apoyar plenamente a Hatshepsut: su reinado garantiza estabilidad y riqueza",fx:{estabilidad:8,riqueza:8,cultura:8,influencia:4},type:"politico"},
    {t:"Co-regencia equitativa: Hatshepsut y Tutmosis III gobiernan juntos con poder compartido",fx:{estabilidad:7,riqueza:5,cultura:6,influencia:7},type:"social"},
    {t:"Presionar por la abdicación: Tutmosis III ya es mayor y debe tomar el trono solo",fx:{estabilidad:-4,riqueza:0,cultura:-8,influencia:4},type:"politico"},
    {t:"Conspirar con los generales para deponer a Hatshepsut y entronizar a Tutmosis",fx:{estabilidad:-8,riqueza:-2,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1479 aC",ph:"Hatshepsut (Maatkara)",ev:"Coronación — la faraona más exitosa de la historia",tip:"En 1903, Howard Carter descubrió la tumba de Hatshepsut pero no encontró su momia. En 2007, Zahi Hawass identificó sus restos mediante un diente encontrado en una caja con su nombre: había estado oculta entre momias anónimas durante 3.500 años."}},

  {id:19,per:"nuevo",cat:"economia",title:"El Oro que Mueve el Mundo",
  desc:"Las minas de Nubia producen más oro del que Egipto jamás ha visto. Los reyes del Medio Oriente escriben cartas aduladoras: 'El oro en el país de mi hermano es tan abundante como el polvo.' Babilonia, Mitani, los Hititas, todos quieren el oro de Egipto. Puedes usarlo para financiar ejércitos, templos monumentales, o como instrumento de diplomacia: el oro compra alianzas que los ejércitos no pueden garantizar.",
  ctx:"Las cartas de Amarna (1350 aC) revelan un sistema diplomático sofisticado donde el oro egipcio circulaba como moneda de poder internacional. El rey mitanio Tushratta escribió: 'El oro en Egipto es tan abundante como el polvo — por favor envíame más de lo que enviaste a mi padre.'",
  opts:[
    {t:"Diplomacia del oro: regalos estratégicos a aliados clave para construir una red de influencia",fx:{estabilidad:4,riqueza:-4,cultura:2,influencia:8},type:"diplomatico"},
    {t:"Gran programa de construcción: templos, ciudades, canales que duren milenios",fx:{estabilidad:5,riqueza:-5,cultura:8,influencia:4},type:"cultural"},
    {t:"Maximizar la extracción con más trabajadores para acumular reservas estratégicas",fx:{estabilidad:-2,riqueza:8,cultura:0,influencia:6},type:"economico"},
    {t:"Acumular en secreto: el tesoro es poder, nadie debe saber cuánto oro tiene el faraón",fx:{estabilidad:-4,riqueza:8,cultura:-4,influencia:-2},type:"cruel"}
  ],
  tl:{date:"1450 aC",ph:"Tutmosis III (Menkheperra)",ev:"El mayor Imperio Egipcio: del Éufrates a la 4ª catarata",tip:"Tutmosis III ganó 17 campañas militares en 20 años. Su victoria en Meguido (1457 aC) es la primera batalla de la historia documentada en detalle. Napoleón la estudió 3.000 años después como modelo estratégico."}},

  {id:20,per:"nuevo",cat:"religion",title:"Un Solo Dios: La Revolución de Akenatón",
  desc:"Amenhotep IV ha tomado una decisión que sacude los cimientos de Egipto: cierra los templos de todos los dioses. Despide a decenas de miles de sacerdotes. Ordena borrar el nombre de Amón de todos los monumentos —incluyendo el de su propio padre. Se renombra a sí mismo Akenatón. Y declara que solo existe un dios: Atón, el disco solar. Una ciudad nueva, Amarna, emerge en el desierto. Es la primera revolución religiosa monoteísta documentada de la historia humana.",
  ctx:"Akenatón (1353-1336 aC) instauró el primer monoteísmo conocido, 700 años antes del monoteísmo hebreo consolidado. Algunos historiadores sugieren que Moisés, si existió, pudo haber sido influenciado por la teología de Amarna. El debate continúa siendo uno de los más apasionantes de la historia.",
  opts:[
    {t:"Apoyar la reforma: un dios único centraliza el poder espiritual en el faraón divino",fx:{estabilidad:-7,riqueza:4,cultura:-4,influencia:8},type:"politico"},
    {t:"Resistencia discreta: proteger los cultos tradicionales en secreto mientras Akenatón gobierna",fx:{estabilidad:4,riqueza:0,cultura:7,influencia:-4},type:"cultural"},
    {t:"Mediación teológica: proponer que Atón sea el dios principal pero no el único",fx:{estabilidad:7,riqueza:0,cultura:4,influencia:0},type:"social"},
    {t:"Coalición sacerdotal: organizar resistencia abierta de los templos de Amón y Ra",fx:{estabilidad:-4,riqueza:-4,cultura:4,influencia:-7},type:"cruel"}
  ],
  tl:{date:"1346 aC",ph:"Akenatón (Amenhotep IV)",ev:"Primera revolución monoteísta de la historia",tip:"El busto de Nefertiti (Berlín, 1345 aC) es quizás el retrato más famoso del mundo antiguo. Akenatón y Nefertiti desarrollaron un arte completamente nuevo: figuras alargadas, escenas íntimas de familia real, representaciones del sol derramando vida."}},

  {id:21,per:"nuevo",cat:"politica",title:"El Tratado que Cambió el Mundo",
  desc:"Dieciséis años de guerra contra los Hititas han dejado miles de muertos y ningún vencedor claro. La batalla de Qadesh (1274 aC) fue el mayor choque de carros de la historia: 5.000 vehículos de guerra, 40.000 soldados. Ramsés II casi muere allí. Ahora el rey hitita Hattusili III propone algo sin precedentes: un tratado de paz permanente, hermandad entre los dos imperios, intercambio de princesas como garantía. Es una oportunidad histórica.",
  ctx:"El Tratado de Qadesh (1259 aC) es el acuerdo internacional más antiguo conservado. Una copia en cuneiforme hitita está en el Museo de Estambul; otra en jeroglíficos, en el templo de Karnak. Una reproducción fue entregada a la ONU en 1970 como símbolo del primer tratado de paz de la humanidad.",
  opts:[
    {t:"Firmar el tratado completo con alianza matrimonial: paz duradera sobre gloria efímera",fx:{estabilidad:8,riqueza:7,cultura:7,influencia:4},type:"diplomatico"},
    {t:"Firmar la paz sin el matrimonio: acuerdo de no agresión sin compromisos dinásticos",fx:{estabilidad:7,riqueza:4,cultura:4,influencia:4},type:"diplomatico"},
    {t:"Exigir concesiones territoriales adicionales antes de firmar",fx:{estabilidad:-2,riqueza:7,cultura:0,influencia:7},type:"politico"},
    {t:"Rechazar el tratado y relanzar la guerra: Egipto no negocia con iguales",fx:{estabilidad:-8,riqueza:-8,cultura:-4,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1259 aC",ph:"Ramsés II (Usermaatra Setepenra)",ev:"Tratado de Qadesh — el primero de la historia",tip:"Ramsés II reinó 66 años y tuvo más de 100 hijos. Encargó que se grabara su 'victoria' en Qadesh en cinco templos, aunque estratégicamente fue un empate. La propaganda política tiene raíces muy antiguas."}},

  {id:22,per:"nuevo",cat:"cultura",title:"El Libro de los Muertos para Todos",
  desc:"El escriba Ani termina de redactar su encargo más ambicioso: un papiro de 24 metros que contiene 190 conjuros ilustrados con escenas del Más Allá en rojo y negro. Es el Libro de los Muertos más completo jamás creado. Los sacerdotes de Osiris proponen un sistema: copias estándar para las familias que puedan pagarlas, versiones de lujo personalizadas para los nobles. La vida eterna, democratizada y tarifada. El debate es si debe ser accesible o exclusivo.",
  ctx:"El Libro de los Muertos (1550-50 aC) era el 'GPS' del Más Allá. Contenía instrucciones para navegar el Duat, conjuros para superar 42 guardianes y la guía para el juicio del corazón ante Osiris. El papiro de Ani, descubierto en Tebas en 1888, está ahora en el Museo Británico.",
  opts:[
    {t:"Democratización: producción estatal de copias accesibles para todas las familias",fx:{estabilidad:8,riqueza:-8,cultura:8,influencia:2},type:"cultural"},
    {t:"Sistema escalonado: versión básica económica + versión de lujo personalizada",fx:{estabilidad:4,riqueza:4,cultura:7,influencia:2},type:"social"},
    {t:"Exclusividad noble: solo las familias de alto rango merecen acceso a los textos sagrados",fx:{estabilidad:-4,riqueza:6,cultura:4,influencia:4},type:"economico"},
    {t:"Monopolio sacerdotal: solo los sacerdotes poseen los textos, el pueblo debe depender de ellos",fx:{estabilidad:-6,riqueza:0,cultura:-7,influencia:-2},type:"cruel"}
  ],
  tl:{date:"1550 aC aprox.",ph:"Inicio del Imperio Nuevo",ev:"Compilación del Libro de los Muertos",tip:"El papiro de Ani mide 24 metros de largo. La escena del pesaje del corazón muestra a Ani ante 42 jueces confesando que no mató, no robó, no mintió. Es el primer código ético escrito de la historia."}},

  {id:23,per:"nuevo",cat:"sociedad",title:"Los Pueblos del Mar",
  desc:"El caos llega desde el mar. En doce años, los Pueblos del Mar —coalición misteriosa de migrantes guerreros del Egeo y Anatolia— han destruido el Imperio Hitita, saqueado Ugarit y arrasado Chipre. Ahora sus flotas y ejércitos convergen sobre el Delta. Traen hierro, cuando Egipto aún vive en la Edad del Bronce. Sus barcos son más rápidos. Sus espadas, más afiladas. Ramsés III los espera en las orillas del Delta con lo que queda del ejército más poderoso del mundo.",
  ctx:"El colapso de la Edad de Bronce (1200-1150 aC) fue la primera gran catástrofe civilizatoria de la historia: colapsaron simultáneamente los Hititas, Micenas, Troya, Ugarit y el Imperio Chipriota. Solo Egipto sobrevivió, gravemente herido. Las causas siguen siendo debatidas: sequía, invasiones, terremotos, colapso del comercio.",
  opts:[
    {t:"Defensa integral: todo el ejército y la flota en el Delta, más mercenarios libios y nubios",fx:{estabilidad:-4,riqueza:-8,cultura:0,influencia:8},type:"militar"},
    {t:"Táctica diplomática: absorber a parte de los Pueblos del Mar como mercenarios del faraón",fx:{estabilidad:2,riqueza:-4,cultura:2,influencia:7},type:"diplomatico"},
    {t:"Defensa del núcleo: sacrificar el Delta oriental para concentrar fuerzas en el interior",fx:{estabilidad:-7,riqueza:-4,cultura:-4,influencia:4},type:"politico"},
    {t:"Rendición negociada: ceder tierras del Delta a cambio de que cesen las hostilidades",fx:{estabilidad:-8,riqueza:-4,cultura:-8,influencia:-8},type:"cruel"}
  ],
  tl:{date:"1177 aC",ph:"Ramsés III (Usermaatre Meryamun)",ev:"Victoria en el Delta — última gran victoria egipcia",tip:"Los bajorrelieves de Medinet Habu documentan la batalla naval: los egipcios usaron ganchos para capturar los barcos enemigos. Fue la primera batalla naval documentada en detalle en la historia."}},

  {id:24,per:"tardio",cat:"politica",title:"Los Sacerdotes que Gobiernan en las Sombras",
  desc:"El Imperio ha terminado, aunque nadie lo proclama oficialmente. Los sumos sacerdotes de Amón en Tebas controlan el 30% de las tierras de Egipto, tienen su propio ejército, recaudan sus propios impuestos y consultan su propio oráculo antes de tomar decisiones de Estado. El faraón en Memphis es un símbolo dorado vacío de poder. El sumo sacerdote Herhor ha dado el paso final: ha adoptado la titulatura real completa. Egipto tiene dos faraones.",
  ctx:"El Tercer Período Intermedio (1070-664 aC) fue resultado directo de la teopolítica del Imperio Nuevo: al dar demasiadas tierras y poder a los templos como pago por bendiciones divinas, los faraones crearon una aristocracia sacerdotal que eventualmente los devoró.",
  opts:[
    {t:"Alianza matrimonial: el faraón se casa con la hija del sumo sacerdote, uniendo las dos líneas",fx:{estabilidad:7,riqueza:4,cultura:4,influencia:4},type:"diplomatico"},
    {t:"Reforma constitucional: decreto que separa el poder civil del religioso con límites claros",fx:{estabilidad:-6,riqueza:7,cultura:-4,influencia:7},type:"politico"},
    {t:"Golpe de estado con apoyo libio: el ejército mercenario desplaza a los sacerdotes",fx:{estabilidad:-4,riqueza:0,cultura:-7,influencia:8},type:"militar"},
    {t:"Aceptación resignada: mejor ser faraón ceremonial que provocar una guerra civil",fx:{estabilidad:4,riqueza:0,cultura:0,influencia:-8},type:"cruel"}
  ],
  tl:{date:"1070 aC",ph:"Herhor (Sumo Sacerdote de Amón)",ev:"Inicio del Tercer Período Intermedio — Egipto dividido",tip:"El Relato de Unamón (1070 aC) documenta la humillación de un enviado egipcio en Biblos: el príncipe fenicio ya no le teme al faraón y lo hace esperar semanas. Es el retrato literario de un Imperio que agoniza."}},

  {id:25,per:"tardio",cat:"sociedad",title:"La Sombra de Asiria",
  desc:"Asurbanipal, rey de Asiria, ha cruzado el Sinaí. Menfis ha caído en dos semanas. Ahora sus ejércitos marchan hacia Tebas, la ciudad sagrada de Amón, con sus millones de habitantes y sus templos centenarios de oro. Los asirios son conocidos por su brutalidad: ciudades enteras reducidas a cenizas, poblaciones deportadas a Mesopotamia. El faraón nubio Taharqa huyó al sur. El ejército egipcio está desmoralizado. Tebas, sin murallas, espera.",
  ctx:"El saqueo de Tebas (663 aC) impactó tanto al mundo antiguo que el profeta bíblico Nahúm lo citó décadas después como el ejemplo definitivo de destrucción de una gran ciudad. La potencia que había dominado el mundo durante mil años era ahora provincia de un imperio extranjero.",
  opts:[
    {t:"Resistencia guerrillera: usar el Nilo, el desierto y el conocimiento local como armas",fx:{estabilidad:-8,riqueza:-6,cultura:4,influencia:8},type:"militar"},
    {t:"Capitulación estratégica: aceptar el vasallaje a cambio de preservar los templos y la cultura",fx:{estabilidad:4,riqueza:-4,cultura:7,influencia:-7},type:"diplomatico"},
    {t:"Alianza helénica: negociar apoyo militar griego a cambio de concesiones comerciales",fx:{estabilidad:2,riqueza:-2,cultura:7,influencia:7},type:"diplomatico"},
    {t:"Sacrificar Tebas: retirar todas las fuerzas al Delta y dejar que el sur caiga",fx:{estabilidad:-8,riqueza:0,cultura:-8,influencia:-8},type:"cruel"}
  ],
  tl:{date:"663 aC",ph:"Taharqa (faraón nubio de la Dinastía XXV)",ev:"Saqueo asirio de Tebas — el mayor trauma del Período Tardío",tip:"Asurbanipal llevó a Nínive estatuas, textos y tesoros de 3.000 años de historia egipcia. Paradójicamente, su biblioteca en Nínive preservó miles de textos mesopotámicos que de otro modo se habrían perdido."}},

  {id:26,per:"tardio",cat:"economia",title:"Los Griegos de Naucratis",
  desc:"Miletos, Corinto, Samos, Rodas: los mercaderes griegos que comercian en el Delta proponen algo inédito. Quieren una ciudad propia en suelo egipcio: Naucratis, en el Delta occidental. Una ciudad con sus propias leyes, sus propios templos, su propio puerto. Traerían plata del Ática, cerámica de Corinto, vino del Egeo, mercenarios espartanos. Y también: filosofía, ciencia, nuevas formas de pensar. Pero también sus dioses, sus costumbres extrañas, su diferente concepción del mundo.",
  ctx:"Naucratis (fundada circa 620 aC) fue la primera ciudad griega en suelo egipcio. La plata ática y la cerámica griega se volvieron omnipresentes en Egipto. El contacto fue profundo en ambos sentidos: Tales, Pitágoras y Platón viajaron a Egipto. Los griegos afirmaban que toda su ciencia vino del Nilo.",
  opts:[
    {t:"Naucratis como zona económica especial: ciudad griega con autonomía jurídica y monopolio comercial",fx:{estabilidad:4,riqueza:8,cultura:8,influencia:4},type:"economico"},
    {t:"Licencia comercial sin ciudad propia: los griegos pueden comerciar pero no asentarse",fx:{estabilidad:2,riqueza:6,cultura:2,influencia:2},type:"politico"},
    {t:"Asociación estratégica plena: griegos como aliados militares y socios comerciales",fx:{estabilidad:4,riqueza:7,cultura:8,influencia:8},type:"diplomatico"},
    {t:"Rechazar la propuesta: Egipto no necesita comerciantes bárbaros del norte",fx:{estabilidad:0,riqueza:-6,cultura:-4,influencia:-4},type:"cruel"}
  ],
  tl:{date:"620 aC",ph:"Amasis II (Ahmose II)",ev:"Fundación de Naucratis — primer contacto sistemático Grecia-Egipto",tip:"Heródoto visitó Egipto circa 450 aC y describió sus maravillas en detalle. Declaró que los griegos habían aprendido la geometría, la astronomía y la medicina de los sacerdotes egipcios. La deuda cultural fue inmensa."}},

  {id:27,per:"tardio",cat:"religion",title:"El Renacimiento del Pasado",
  desc:"Los faraones de Sais, en el Delta, han tomado una decisión política y espiritual al mismo tiempo: volver a las fuentes. Los artistas reciben instrucciones de copiar exactamente el estilo del Antiguo Imperio, como si hubieran transcurrido 1.500 años de historia en lugar de vivirlos. Los escribas transcriben papiros con ortografía arcaica. Los arquitectos estudian las proporciones de las pirámides. Es una apuesta por la identidad en tiempos de incertidumbre.",
  ctx:"La Dinastía Saíta (664-525 aC) fue la última gran dinastía nativa de Egipto. Su 'arcaísmo' fue una respuesta política a la dominación extranjera: reivindicar el esplendor del pasado como afirmación de identidad. El arte saíta es extraordinariamente refinado y difícil de distinguir del Antiguo Imperio.",
  opts:[
    {t:"Gran proyecto nacional de restauración: copiar los textos sagrados, restaurar los templos",fx:{estabilidad:7,riqueza:-6,cultura:8,influencia:2},type:"cultural"},
    {t:"Síntesis creativa: recuperar lo mejor del pasado pero incorporar innovaciones del presente",fx:{estabilidad:4,riqueza:0,cultura:7,influencia:4},type:"social"},
    {t:"Restauración selectiva: restaurar solo los monumentos más visibles y simbólicos",fx:{estabilidad:4,riqueza:-4,cultura:4,influencia:2},type:"economico"},
    {t:"Prohibir las copias: el pasado glorioso solo sirve para recordar lo mucho que hemos perdido",fx:{estabilidad:-4,riqueza:0,cultura:-8,influencia:0},type:"cruel"}
  ],
  tl:{date:"664 aC",ph:"Psamético I (Wahibra)",ev:"Fundación de la Dinastía Saíta — último renacimiento nativo",tip:"Psamético I unificó Egipto con apoyo de mercenarios griegos (los carios) y expulsó a los gobernadores asirios. Su reinado de 54 años fue una última era dorada antes de la conquista persa."}},

  {id:28,per:"tardio",cat:"politica",title:"El Imperio Persa Llama a la Puerta",
  desc:"Cambises II, rey de reyes de Persia, ha marchado desde Babilonia con el ejército más grande que el mundo ha visto: 200.000 soldados, elefantes de guerra, ingenieros que construyen puentes de barcas sobre el Nilo. Sus espías ya están en la corte. El traidor Polícrates de Samos le ha entregado los planos de las defensas egipcias. En la batalla de Peluso, el ejército egipcio, a pesar de su coraje, está a punto de romperse. El faraón Psamético III tiene pocas horas para decidir.",
  ctx:"La conquista persa (525 aC) marcó el fin de 2.500 años de soberanía faraónica nativa. Paradójicamente, los persas respetaron la religión egipcia y Cambises adoptó el título de faraón. Egipto no volvería a tener un gobernante nativo hasta la Revolución de 1952, 2.477 años después.",
  opts:[
    {t:"Resistencia total aliada con griegos: usar la red de Naucratis para obtener apoyo del Egeo",fx:{estabilidad:-7,riqueza:-8,cultura:7,influencia:4},type:"militar"},
    {t:"Rendición negociada: aceptar la soberanía persa preservando los templos y la religión",fx:{estabilidad:4,riqueza:-2,cultura:7,influencia:-7},type:"diplomatico"},
    {t:"Retirada estratégica al sur: ceder el norte y defender Tebas y Nubia",fx:{estabilidad:-2,riqueza:-4,cultura:4,influencia:0},type:"politico"},
    {t:"Colaboración: entregarse personalmente a Cambises a cambio de título de gobernador",fx:{estabilidad:2,riqueza:4,cultura:-8,influencia:-8},type:"cruel"}
  ],
  tl:{date:"525 aC",ph:"Psamético III (Ankhkaenra)",ev:"Conquista persa — fin de la soberanía faraónica nativa",tip:"Herodoto escribe que Cambises profanó el templo de Ptah y mató al buey sagrado Apis. Los egipcios nunca lo perdonaron. Los arqueólogos modernos no han encontrado evidencia de esa profanación, sugiriendo que pudo ser propaganda."}},

  {id:29,per:"tardio",cat:"sociedad",title:"El Macedonio en el Oráculo de Amón",
  desc:"Alejandro III de Macedonia ha llegado a Egipto no como conquistador sino como liberador: los persas, odiados durante 200 años, han sido derrotados. Los egipcios le abren las puertas. En Menfis, es coronado faraón con todos los ritos. Luego emprende la travesía de 500 kilómetros al oráculo de Amón en el oasis de Siwa, en pleno desierto occidental. El oráculo, voz del mayor dios egipcio, lo proclama 'hijo de Zeus-Amón'. La noticia transforma todo.",
  ctx:"Alejandro (332-323 aC) fundó Alejandría en siete días de planificación. Murió doce años después, a los 32 años, sin volver a pisar Egipto. Pero Alejandría se convirtió en el mayor centro intelectual del mundo antiguo: su Biblioteca reunió hasta 700.000 rollos de papiro.",
  opts:[
    {t:"Coronación plena con todos los ritos faraónicos: legitimidad divina a cambio de respeto cultural",fx:{estabilidad:8,riqueza:7,cultura:8,influencia:4},type:"diplomatico"},
    {t:"Alianza militar estratégica: usar el poder macedonio para reafirmar el dominio egipcio en el Mediterráneo",fx:{estabilidad:4,riqueza:4,cultura:4,influencia:8},type:"militar"},
    {t:"Colaboración mínima: cumplir los rituales formalmente pero preservar la autonomía interna",fx:{estabilidad:2,riqueza:0,cultura:7,influencia:-2},type:"cultural"},
    {t:"Resistencia: organizar una rebelión nativa aprovechando que el ejército macedonio avanza hacia Persia",fx:{estabilidad:-8,riqueza:-8,cultura:-8,influencia:-8},type:"cruel"}
  ],
  tl:{date:"332 aC",ph:"Alejandro III el Grande (faraón macedonio)",ev:"Fundación de Alejandría — nuevo centro del mundo",tip:"Cuando Alejandro trazó los planos de Alejandría, no tenía cal. Usó harina de cebada. Pájaros bajaron a comerse la harina: los augures lo interpretaron como señal de que la ciudad alimentaría al mundo. No se equivocaron."}},

  {id:30,per:"tardio",cat:"politica",title:"El Último Amanecer de Cleopatra",
  desc:"El Mediterráneo ha decidido. Marco Antonio y Cleopatra VII fueron derrotados en Actio por Octavio, el futuro Augusto. Cleopatra, última faraona de la dinastía ptolemaica, última gobernante de Egipto antes de que se convierta en provincia romana, tiene pocas horas para decidir. Ha gobernado durante 22 años con una inteligencia política sin igual: dominaba nueve idiomas, era matemática, filósofa, estratega. Ahora, en el Mausoleo de Alejandría, toma su decisión final.",
  ctx:"Cleopatra VII (69-30 aC) fue la primera ptolemaica en aprender egipcio. Era matemática, farmacóloga, hablaba nueve lenguas. Su muerte en agosto del 30 aC terminó 3.000 años de civilización faraónica ininterrumpida. Egipto no volvería a ser independiente hasta 1952, bajo Naguib y Nasser.",
  opts:[
    {t:"Negociar con Octavio: preservar la cultura, los templos y parte de la administración bajo Roma",fx:{estabilidad:7,riqueza:4,cultura:8,influencia:-4},type:"diplomatico"},
    {t:"Resistencia simbólica final: destruir el tesoro y la flota para que Roma no los use",fx:{estabilidad:-8,riqueza:-8,cultura:4,influencia:7},type:"militar"},
    {t:"Exilio en Etiopía con el tesoro real: preservar la línea ptolemaica para un futuro retorno",fx:{estabilidad:2,riqueza:-6,cultura:6,influencia:-6},type:"social"},
    {t:"Elegir la muerte con dignidad: morir faraona, no cautiva en el desfile triunfal de Roma",fx:{estabilidad:-4,riqueza:0,cultura:8,influencia:4},type:"cultural"}
  ],
  tl:{date:"30 aC",ph:"Cleopatra VII Filopátor",ev:"Fin del Egipto Faraónico — 3.000 años de historia",tip:"Plutarco escribe que Cleopatra murió por la picadura de un áspid escondido en un cesto de higos. Los toxicólogos modernos sugieren que más probablemente usó una mezcla de opio y cicuta. Su tumba, como la de Alejandro, nunca ha sido encontrada."}}
];


