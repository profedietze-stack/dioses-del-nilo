import type { GameEvent } from '../types'

export const EVENTS_ANTIGUO_EXTRA: GameEvent[] = [
  {id:101,per:"antiguo",cat:"politica",title:"Los Dos Reinos se Unen",
  desc:"La sangre de la batalla de Menfis aún no seca y ya tienes ante ti la pregunta que definirá los próximos mil años: ¿cómo gobernar un Egipto que hasta ayer era dos países enemigos? El norte habla un dialecto diferente, venera al halcón Horus pero también a la serpiente Wadjet. El sur venera al buitre Nekhbet y al escorpión. Los sacerdotes del norte no reconocen tus dioses. Los nomarcas del delta miran tu corona roja con desconfianza. Puedes imponer el sur sobre el norte, o buscar algo más difícil: la síntesis.",
  ctx:"La unificación circa 3100 aC fue un proceso gradual y violento. La Paleta de Narmer muestra al faraón con ambas coronas, símbolo de la fusión. El sistema de los nomos —42 provincias administradas localmente— fue la solución pragmática que permitió gobernar un territorio de 1.000 km de largo durante 3.000 años.",
  opts:[
    {t:"Síntesis cultural: adoptar los dioses, tradiciones y títulos de ambos reinos por igual",fx:{estabilidad:8,riqueza:4,cultura:8,influencia:6},type:"politico"},
    {t:"Primacía del sur: el Alto Egipto impone su administración y sus dioses al norte",fx:{estabilidad:-4,riqueza:2,cultura:-4,influencia:8},type:"militar"},
    {t:"Sistema de nomos: autonomía provincial bajo supervisión de vizires reales",fx:{estabilidad:7,riqueza:6,cultura:6,influencia:4},type:"social"},
    {t:"Dejar que los reinos funcionen separados bajo un faraón común en lo ceremonial",fx:{estabilidad:-6,riqueza:0,cultura:0,influencia:-4},type:"cruel"}
  ],
  tl:{date:"3100 aC",ph:"Narmer / Menes",ev:"Unificación del Alto y Bajo Egipto — nacimiento del Estado",tip:"La doble corona del faraón (el pschent) combinaba la corona blanca del sur con la roja del norte. Era más que un símbolo: era el contrato político de la unificación. Llevarla era gobernar la tensión entre dos mundos."}},

  {id:102,per:"antiguo",cat:"economia",title:"Las Canteras de Asuán",
  desc:"El arquitecto real llega con los planos: el nuevo templo de Ra en Heliópolis requiere 200 columnas de granito rosa de Asuán, a 900 kilómetros al sur. Las canteras ya funcionan, pero los bloques de 20 toneladas deben bajarse al Nilo en trineos de madera, cargarse en balsas, navegar semanas por las cataratas y llegar sin fracturarse. Cinco hombres murieron aplastados el año pasado. El capataz propone un nuevo sistema de rodillos de madera húmeda. Funcionaría, pero requiere doce meses de prueba y triplicaría el costo.",
  ctx:"Las canteras de Asuán produjeron el granito de la mayoría de los monumentos del Antiguo Imperio. El Obelisco Inacabado, aún visible hoy, muestra una griatura que obligó a abandonarlo. Pesa 1.200 toneladas. Los egipcios no usaron ruedas para transportar bloques: usaban trineos de madera sobre barro húmedo.",
  opts:[
    {t:"Invertir en la innovación de rodillos: más costo ahora, menos accidentes y pérdidas futuras",fx:{estabilidad:4,riqueza:-7,cultura:5,influencia:2},type:"social"},
    {t:"Continuar el sistema actual con más supervisores de seguridad",fx:{estabilidad:2,riqueza:-3,cultura:2,influencia:0},type:"economico"},
    {t:"Sustituir el granito por caliza pintada: más barato, más rápido, resultado aceptable",fx:{estabilidad:0,riqueza:4,cultura:-5,influencia:-2},type:"economico"},
    {t:"Duplicar la fuerza de trabajo con prisioneros libios: más cuerpos compensan la ineficiencia",fx:{estabilidad:-5,riqueza:3,cultura:-6,influencia:4},type:"cruel"}
  ],
  tl:{date:"2600 aC",ph:"Sneferu (Nebmaat)",ev:"Primera pirámide verdadera — la Pirámide Roja de Dahshur",tip:"Sneferu construyó tres pirámides: la escalonada de Meidum, la acodada (que cambió de ángulo a mitad) y la Pirámide Roja. Aprendió de cada error. Su hijo Keops aplicó esas lecciones en Guiza."}},

  {id:103,per:"antiguo",cat:"politica",title:"El Visir que Sabe Demasiado",
  desc:"Imhotep lleva veinte años siendo la mente más brillante del Imperio: arquitecto, médico, astrónomo, escriba jefe. Diseñó la primera pirámide. Conoce los archivos secretos del tesoro, los nombres de los espías en las cortes extranjeras, las debilidades de cada nomarca. Es leal. Pero es un hombre de baja cuna que tiene más poder real que cualquier noble. Los príncipes de sangre real llevan años presionando para que lo destituyas. Hoy, uno de ellos depositó sobre tu mesa un papiro con acusaciones de malversación.",
  ctx:"Imhotep (circa 2650 aC) fue tan excepcional que fue deificado dos mil años después de su muerte: los griegos lo identificaron con Asclepio, dios de la medicina. Es uno de los pocos comunes en la historia egipcia que alcanzó estatus divino. El Papiro de Edwin Smith, el tratado médico más antiguo, es atribuido a su tradición.",
  opts:[
    {t:"Investigar las acusaciones con un tribunal independiente de escribas reales",fx:{estabilidad:5,riqueza:0,cultura:7,influencia:4},type:"cultural"},
    {t:"Defender públicamente a Imhotep: los nobles aprenden que la meritocracia no se negocia",fx:{estabilidad:3,riqueza:0,cultura:8,influencia:6},type:"social"},
    {t:"Ascenderlo formalmente pero rodearle de consejeros nobles que lo controlen",fx:{estabilidad:6,riqueza:0,cultura:4,influencia:2},type:"politico"},
    {t:"Destituirlo para calmar a los nobles: el orden social es más importante que el talento",fx:{estabilidad:-6,riqueza:-2,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"2650 aC",ph:"Djoser (Dyeser)",ev:"Pirámide Escalonada — primer edificio de piedra de la historia",tip:"Imhotep recibió el título de 'Gran Vidente' y su nombre aparece en la base de la estatua de Djoser —algo sin precedente para un hombre sin sangre real. Fue venerado como sabio durante 2.000 años después de su muerte."}},

  {id:104,per:"antiguo",cat:"religion",title:"Ra contra Osiris",
  desc:"La tensión entre los sacerdotes de Heliópolis, guardianes del culto solar a Ra, y los de Abidos, guardianes del culto a Osiris y el Más Allá, ha estallado en un conflicto abierto. Los heliopolitanos argumentan que el faraón es hijo del Sol y su poder viene de Ra. Los osirianos contraatacan: sin Osiris no hay resurrección, sin resurrección no hay faraón eterno. Ambos cultos son enormes, ambos tienen tierras, escribas y ejércitos de sacerdotes. El pueblo está confundido. Tú debes decidir cuál es la teología oficial del Estado.",
  ctx:"La síntesis Ra-Osiris fue uno de los grandes logros del pensamiento egipcio. El 'Libro de lo que hay en el Más Allá' describe cómo el sol-Ra viaja de noche por el inframundo y su barca se une temporalmente con el cuerpo de Osiris, fundiéndose ambos en el instante de la medianoche.",
  opts:[
    {t:"Síntesis teológica: Ra y Osiris son manifestaciones del mismo poder divino, complementarios",fx:{estabilidad:8,riqueza:0,cultura:8,influencia:4},type:"cultural"},
    {t:"Primacía solar: Ra es el dios supremo del Estado, Osiris permanece en la esfera privada",fx:{estabilidad:4,riqueza:0,cultura:4,influencia:8},type:"politico"},
    {t:"Primacía osiriana: el faraón como hijo de Osiris tiene mayor arraigo popular",fx:{estabilidad:6,riqueza:0,cultura:6,influencia:6},type:"social"},
    {t:"Suprimir el culto de Osiris: solo los templos solares recibirán financiamiento estatal",fx:{estabilidad:-8,riqueza:4,cultura:-8,influencia:0},type:"cruel"}
  ],
  tl:{date:"2500 aC",ph:"Kefrén (Jafra)",ev:"Gran Esfinge de Guiza — guardiana del horizonte solar",tip:"La Esfinge mira exactamente al este, hacia el sol naciente. En el equinoccio de primavera, el sol sale exactamente entre las dos pirámides mayores de Guiza. Los egipcios diseñaron el paisaje entero como un reloj solar monumental."}},

  {id:105,per:"antiguo",cat:"sociedad",title:"La Primera Huelga de la Historia",
  desc:"Los papiros de la aldea de Deir el-Medina son claros: los trabajadores no se mueven. Han abandonado las herramientas, se han sentado a la sombra de los muros y esperan. La razón: llevan tres semanas sin recibir sus raciones de cebada, aceite de linaza y cerveza. El responsable es el vizir del norte, que desvió los fondos hacia la construcción de su propia tumba. Los obreros no piden más de lo que les corresponde: piden lo acordado. Detrás de ellos, sus familias. Delante, la obra del faraón paralizada.",
  ctx:"La huelga documentada en los papiros de Deir el-Medina (circa 1170 aC) es la primera huelga laboral de la historia. Los obreros se sentaron ante los recintos funerarios reales y declararon: 'Tenemos hambre y sed; no hay ropa, no hay pez, no hay verdura. Envía a decirlo al Faraón, nuestro buen señor.'",
  opts:[
    {t:"Pago inmediato de las raciones atrasadas y destitución del vizir malversador",fx:{estabilidad:8,riqueza:-5,cultura:5,influencia:4},type:"social"},
    {t:"Negociar: pago parcial ahora, el resto en un mes, con supervisión real de las raciones",fx:{estabilidad:5,riqueza:-2,cultura:3,influencia:2},type:"economico"},
    {t:"Investigar al vizir antes de pagar: la justicia es más importante que la rapidez",fx:{estabilidad:2,riqueza:0,cultura:7,influencia:2},type:"cultural"},
    {t:"Declarar a los huelguistas insubordinados y remplazarlos con nuevos trabajadores",fx:{estabilidad:-8,riqueza:2,cultura:-7,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1170 aC aprox.",ph:"Ramsés III (Usermaatre Meryamun)",ev:"Primera huelga laboral documentada de la historia",tip:"El papiro de la huelga está en el Museo Egipcio de Turín. Los obreros recibieron sus raciones al día siguiente. La huelga funcionó. Era el siglo XII aC, y los trabajadores ya sabían cómo presionar al Estado."}},

  {id:106,per:"antiguo",cat:"cultura",title:"Los Escribas y el Alfabeto",
  desc:"El director de la Casa de la Vida en Menfis te presenta un problema y una oportunidad al mismo tiempo. Los jeroglíficos son perfectos para los monumentos, pero aprender a escribirlos toma doce años. El Imperio necesita miles de funcionarios que registren impuestos, inventarios, cartas diplomáticas. Un joven escriba ha propuesto un sistema alternativo: signos simplificados, uno por sonido, más rápidos de aprender y de trazar. Podría democratizar la escritura. O podría banalizar lo sagrado.",
  ctx:"El hierático (escritura cursiva egipcia) fue la solución práctica al problema de los jeroglíficos. Más tarde evolucionó al demótico. Los proto-sinaíticos (escritura encontrada en las minas del Sinaí, circa 1850 aC) fueron la síntesis entre jeroglíficos y lenguaje semítico: el primer alfabeto, padre de todos los actuales.",
  opts:[
    {t:"Adoptar el sistema simplificado para la administración, manteniendo jeroglíficos para templos",fx:{estabilidad:5,riqueza:5,cultura:7,influencia:4},type:"cultural"},
    {t:"Crear escuelas de escribas con el sistema nuevo para duplicar los funcionarios en una generación",fx:{estabilidad:4,riqueza:4,cultura:8,influencia:2},type:"social"},
    {t:"Mantener solo los jeroglíficos: la dificultad de la escritura protege su poder sagrado",fx:{estabilidad:2,riqueza:-2,cultura:4,influencia:6},type:"politico"},
    {t:"Prohibir cualquier escritura fuera de los templos y la administración real",fx:{estabilidad:-6,riqueza:0,cultura:-8,influencia:2},type:"cruel"}
  ],
  tl:{date:"2400 aC",ph:"Imperio Antiguo",ev:"Desarrollo del hierático — la escritura cotidiana del Imperio",tip:"Se han encontrado más de 700 signos jeroglíficos distintos. Un escriba competente conocía unos 150. La escritura hierática redujo eso a 80 signos. El demótico posterior a 27. El alfabeto fenicio: 22. Cada simplificación fue una revolución."}},

  {id:107,per:"antiguo",cat:"economia",title:"El Canal del Desierto",
  desc:"Un ingeniero hidráulico presenta un proyecto audaz ante el consejo: un canal de 150 kilómetros que conectaría un brazo del Nilo con el oasis de Kharga, en el desierto occidental. Llevaría agua a tierras yermas, permitiría cultivar trigo adicional para 200.000 personas, y abriría una ruta comercial protegida hacia el interior. El costo es astronómico: quince años de trabajo, desviar recursos de otros proyectos. Pero si funciona, Egipto tendría una segunda zona agrícola independiente del Nilo.",
  ctx:"Los egipcios del Imperio Antiguo excavaron sistemas de canales sofisticados en el Fayum y otras regiones. El canal 'de los faraones' que Neco II y luego los persas intentaron construir entre el Nilo y el Mar Rojo es el proyecto de infraestructura hidráulica más ambicioso de la antigüedad, precursor del Canal de Suez.",
  opts:[
    {t:"Aprobar el proyecto a largo plazo: la visión estratégica supera el costo inmediato",fx:{estabilidad:2,riqueza:-8,cultura:4,influencia:6},type:"economico"},
    {t:"Proyecto piloto: un segmento de 30 km para verificar la viabilidad antes de comprometer recursos",fx:{estabilidad:4,riqueza:-3,cultura:3,influencia:2},type:"social"},
    {t:"Rechazar el canal y reforzar los sistemas de riego existentes en el Delta",fx:{estabilidad:6,riqueza:2,cultura:0,influencia:-2},type:"economico"},
    {t:"Forzar la construcción con trabajo esclavo para reducir costos a la mitad",fx:{estabilidad:-6,riqueza:-2,cultura:-5,influencia:4},type:"cruel"}
  ],
  tl:{date:"2300 aC",ph:"Pepi I (Merira)",ev:"Primeras grandes obras de irrigación del Imperio Antiguo",tip:"El sistema de riego del Fayum, desarrollado durante el Imperio Medio, transformó una depresión del desierto en el granero más productivo de Egipto. Hoy sigue siendo zona agrícola, 4.000 años después."}},

  {id:108,per:"antiguo",cat:"sociedad",title:"Los Médicos del Nilo",
  desc:"El sumo médico del palacio, Hesy-Ra, presenta al consejo un documento extraordinario: un tratado sistemático sobre 48 casos clínicos, con diagnóstico, pronóstico y tratamiento. Por primera vez en la historia, la medicina se separa de la magia: fractura de cráneo, heridas de guerra, enfermedades del vientre, tratadas con observación, no con conjuros. Pero los sacerdotes de Sekhmet, diosa de la curación, ven en esto una amenaza directa a su poder y sus ingresos. Proponen que los médicos laicos sean subordinados al templo.",
  ctx:"El Papiro de Edwin Smith (circa 1600 aC, copiado de textos del Imperio Antiguo) es el documento médico más antiguo del mundo. Describe 48 casos con racionalismo sorprendente: 'Si examinas a un hombre con una herida en la cabeza que penetra hasta el hueso... y él tiembla, debes decir: es una dolencia que trataré.'",
  opts:[
    {t:"Crear una escuela médica laica bajo protección real, independiente de los templos",fx:{estabilidad:4,riqueza:-5,cultura:8,influencia:4},type:"cultural"},
    {t:"Sistema mixto: médicos laicos para heridas de guerra, sacerdotes para enfermedades internas",fx:{estabilidad:6,riqueza:-2,cultura:6,influencia:2},type:"social"},
    {t:"Subvencionar los templos para que incorporen los nuevos métodos dentro del culto",fx:{estabilidad:5,riqueza:-4,cultura:4,influencia:4},type:"politico"},
    {t:"Prohibir la medicina sin rituales: el cuerpo es sagrado y no puede tratarse sin la bendición divina",fx:{estabilidad:-5,riqueza:0,cultura:-8,influencia:0},type:"cruel"}
  ],
  tl:{date:"2600 aC",ph:"Djoser",ev:"Imhotep y los primeros tratados médicos racionales",tip:"El papiro de Edwin Smith fue comprado por el americano Edwin Smith en Luxor en 1862. Permaneció sin traducir durante 75 años. Cuando finalmente se descifró, los médicos quedaron atónitos: el diagnóstico de lesiones cerebrales era clínicamente correcto."}},
]

export const EVENTS_MEDIO_EXTRA: GameEvent[] = [
  {id:201,per:"medio",cat:"economia",title:"El Gran Drenaje del Fayum",
  desc:"El ingeniero Amenemhat llega con mapas y datos: la depresión del Fayum, a 80 kilómetros al suroeste de Menfis, podría convertirse en el mayor granero del Imperio si se excavan canales que desvíen agua del Nilo hacia sus tierras bajas. El proyecto requiere diez años, treinta mil trabajadores en turnos rotativos, y la relocalización de seis aldeas de pescadores que viven en la zona. A cambio: 150.000 hectáreas de tierra fértil, suficiente para alimentar a medio millón de personas, independientemente del nivel del Nilo.",
  ctx:"El proyecto de irrigación del Fayum durante el Imperio Medio (Senuseret I, circa 1960 aC) es uno de los mayores logros de ingeniería hidráulica de la antigüedad. El Lago Moeris —el gran lago artificial resultante— es mencionado por Heródoto con asombro. Sigue siendo zona agrícola fértil hoy.",
  opts:[
    {t:"Aprobar el proyecto completo con compensación justa para las aldeas desplazadas",fx:{estabilidad:5,riqueza:8,cultura:4,influencia:4},type:"social"},
    {t:"Proyecto por fases: primero el canal principal, las aldeas se reubicarán gradualmente",fx:{estabilidad:7,riqueza:6,cultura:3,influencia:2},type:"economico"},
    {t:"Solo los canales secundarios sin desplazamiento de aldeas: menos impacto, menos beneficio",fx:{estabilidad:8,riqueza:3,cultura:2,influencia:0},type:"social"},
    {t:"Prioridad absoluta al proyecto: las aldeas tienen treinta días para desalojar",fx:{estabilidad:-6,riqueza:7,cultura:-4,influencia:4},type:"cruel"}
  ],
  tl:{date:"1955 aC",ph:"Senuseret I (Kheperkara)",ev:"Inicio del proyecto de irrigación del Fayum",tip:"El Fayum actual sigue siendo uno de los más productivos de Egipto. Los arqueólogos encontraron retratos pintados sobre tabla (los 'retratos del Fayum', siglo I-IV dC) que son los primeros retratos realistas de individuos de la historia."}},

  {id:202,per:"medio",cat:"politica",title:"La Misión a Biblos",
  desc:"El comerciante Wenamon regresa de Biblos con una noticia preocupante: el príncipe de la ciudad del cedro ya no tiembla ante el nombre del faraón. Hace cincuenta años, los mensajeros egipcios eran recibidos con reverencia y el cedro fluía como regalo. Hoy, el príncipe exige oro, plata y comercio de igual a igual. La madera del Líbano es imprescindible: sin cedro no hay barcos, sin barcos no hay expediciones a Punt ni comercio mediterráneo. Pero negociar como iguales sienta un precedente peligroso.",
  ctx:"El Relato de Unamón (circa 1070 aC) documenta la humillación de un enviado egipcio en Biblos. Es el texto que mejor ilustra la decadencia del poder egipcio en el Levante. En el Imperio Medio, el cedro llegaba como tributo; en el Período Tardío, Egipto lo compraba como cualquier cliente.",
  opts:[
    {t:"Negociar en igualdad: tratado comercial con precio justo a cambio de suministro garantizado",fx:{estabilidad:4,riqueza:-5,cultura:5,influencia:7},type:"diplomatico"},
    {t:"Misión diplomática de alto rango con regalo de oro para restablecer el prestigio",fx:{estabilidad:2,riqueza:-6,cultura:3,influencia:8},type:"diplomatico"},
    {t:"Alternativas al cedro: desarrollo de técnicas de construcción con papiro comprimido y palma",fx:{estabilidad:4,riqueza:2,cultura:6,influencia:-2},type:"cultural"},
    {t:"Expedición militar al Levante para recordar a Biblos quién manda",fx:{estabilidad:-5,riqueza:-7,cultura:-4,influencia:4},type:"cruel"}
  ],
  tl:{date:"1900 aC aprox.",ph:"Imperio Medio",ev:"Comercio estable con Biblos — el cedro fluye al Nilo",tip:"El cedro del Líbano era tan valioso que los faraones lo llamaban 'el árbol de los dioses'. Los ataúdes de los nobles del Imperio Nuevo eran de cedro traído de Biblos. Un ataúd de cedro era señal inequívoca de riqueza."}},

  {id:203,per:"medio",cat:"sociedad",title:"La Epidemia del Delta",
  desc:"Un barco mercante procedente de Canaán llegó al puerto de Avaris con marinos enfermos. En tres semanas, la fiebre se extendió a cinco aldeas del Delta. Los síntomas son desconocidos: erupciones cutáneas, fiebre alta, delirio. Los médicos no saben qué es. Los sacerdotes dicen que es la ira de Sekhmet. El barrio de los mercaderes cananeos está acordonado, pero la enfermedad ya está dentro. Cien muertos en un mes. El flujo comercial del Delta está paralizado. El miedo se extiende más rápido que la enfermedad.",
  ctx:"Las epidemias en el Antiguo Egipto están documentadas en los papiros médicos y en textos como los de Merneptah (1213 aC). El contacto con Canaán y el Mediterráneo introdujo patógenos a los que la población del Nilo no tenía inmunidad. El 'evento de 1200 aC' que derrumbó la Edad de Bronce pudo tener un componente epidémico.",
  opts:[
    {t:"Cuarentena estricta del Delta con distribución de raciones desde el exterior",fx:{estabilidad:4,riqueza:-5,cultura:4,influencia:4},type:"social"},
    {t:"Equipos médicos enviados al Delta con los tratamientos disponibles",fx:{estabilidad:7,riqueza:-4,cultura:6,influencia:4},type:"cultural"},
    {t:"Cierre total del comercio marítimo mientras dure la epidemia",fx:{estabilidad:6,riqueza:-7,cultura:2,influencia:-2},type:"politico"},
    {t:"Quemar los barcos y las casas infectadas: el fuego es el único remedio",fx:{estabilidad:-6,riqueza:-4,cultura:-4,influencia:0},type:"cruel"}
  ],
  tl:{date:"1800 aC aprox.",ph:"Imperio Medio tardío",ev:"Primeras cuarentenas documentadas en Egipto",tip:"Los papiros médicos egipcios describen con precisión síntomas de viruela, tuberculosis y enfermedades parasitarias del Nilo. El esquistosoma —parásito del agua dulce— fue identificado en momias de 3.200 años de antigüedad."}},

  {id:204,per:"medio",cat:"cultura",title:"El Cuento de Sinuhé",
  desc:"El escriba Neferhotep te presenta un manuscrito extraordinario: la historia de Sinuhé, funcionario que huyó de Egipto al morir el faraón Amenemhat I, vivió décadas entre los beduinos del Levante, prosperó, se casó, tuvo hijos... y anheló toda su vida regresar al Nilo. Es una historia de identidad, de exilio voluntario, de lo que significa ser egipcio. El escriba propone que el texto se enseñe en las escuelas como modelo de escritura perfecta. Los conservadores protestan: ¿un funcionario que huyó merece ser ejemplo para los jóvenes?",
  ctx:"La Historia de Sinuhé (circa 1900 aC) es considerada la obra maestra de la literatura egipcia. Se conservan más copias que de cualquier otro texto literario: fue el texto más copiado en las escuelas de escribas durante 600 años. Es psicológicamente sofisticada y sorprendentemente moderna en su exploración del exilio y la identidad.",
  opts:[
    {t:"Incorporar Sinuhé al currículo oficial de todas las escuelas de escribas del Imperio",fx:{estabilidad:5,riqueza:-2,cultura:8,influencia:2},type:"cultural"},
    {t:"Permitir su circulación privada pero sin financiamiento estatal",fx:{estabilidad:3,riqueza:0,cultura:5,influencia:0},type:"social"},
    {t:"Editar el texto para glorificar más al faraón y menos al aventurero individual",fx:{estabilidad:4,riqueza:-2,cultura:3,influencia:6},type:"politico"},
    {t:"Prohibirlo: un hombre que huye de Egipto no es modelo para ningún joven del Imperio",fx:{estabilidad:-5,riqueza:0,cultura:-8,influencia:0},type:"cruel"}
  ],
  tl:{date:"1875 aC",ph:"Senuseret I (Kheperkara)",ev:"Composición de la Historia de Sinuhé",tip:"Sinuhé regresa a Egipto anciano, recibe del faraón una tumba, un ajuar funerario y el perdón. El texto termina con las palabras 'ha terminado felizmente de principio a fin, como se encontró por escrito'. Los egipcios inventaron también los finales felices."}},

  {id:205,per:"medio",cat:"politica",title:"Las Fortalezas de Nubia",
  desc:"El general Ikhernofret regresa del sur con su informe: la frontera con Kush en la Segunda Catarata está asegurada, pero el costo es alto. Mantener ocho fortalezas con 5.000 soldados consume el 15% del presupuesto militar. Los nubios de Kush son formidables guerreros y comerciantes astutos. Proponen una alternativa: tratado de comercio en lugar de ocupación militar, permitir el libre flujo de marfil, ébano y esclavos a cambio de retirar las guarniciones. Significaría ceder el control de las minas de oro.",
  ctx:"La cadena de fortalezas de Senuseret III en Nubia (circa 1850 aC) incluía Buhen, Mirgissa y otras seis. Tenían sistemas de comunicación por señales de fuego, fosos secos y bastiones angulados: ingeniería militar sin igual en el mundo de su tiempo. Las inundaciones del lago Nasser las sepultaron en los años 60.",
  opts:[
    {t:"Mantener las fortalezas y reforzarlas: el control del Nilo hasta la Tercera Catarata no se negocia",fx:{estabilidad:4,riqueza:-6,cultura:2,influencia:8},type:"militar"},
    {t:"Tratado comercial con Kush: retirar las guarniciones intermedias y mantener solo las más al norte",fx:{estabilidad:6,riqueza:4,cultura:4,influencia:4},type:"diplomatico"},
    {t:"Expandir las fortalezas hacia el sur para controlar las minas directamente",fx:{estabilidad:-2,riqueza:-8,cultura:0,influencia:7},type:"militar"},
    {t:"Retirarse completamente del sur de la Segunda Catarata y concentrar fuerzas en el norte",fx:{estabilidad:2,riqueza:4,cultura:-2,influencia:-6},type:"cruel"}
  ],
  tl:{date:"1870 aC",ph:"Senuseret III (Khakaura)",ev:"Construcción de la cadena de fortalezas en la Segunda Catarata",tip:"Senuseret III fue tan venerado en Nubia que tras su muerte lo adoraron como dios local. Las fortalezas de Nubia son la primera red de defensa estratégica coordinada de la historia militar."}},

  {id:206,per:"medio",cat:"religion",title:"El Oráculo de Crocodilopolis",
  desc:"En el Fayum, el culto al cocodrilo sagrado Sobek ha crecido de forma inquietante. Los sacerdotes de Crocodilopolis alimentan con carne y vino a un cocodrilo viviente que llaman Petesuchos —'hijo de Sobek'— y afirman que el reptil responde preguntas sobre el futuro. Miles de peregrinos llegan cada mes. Los donantes construyeron un segundo templo sin permiso del Estado. Los sacerdotes de Amón en Karnak están furiosos: Sobek no debería tener este poder. El pueblo, sin embargo, cree.",
  ctx:"El culto a Sobek floreció durante el Imperio Medio, cuando la familia real adoptó el nombre del dios cocodrilo (Amenemhat 'Sobek es grande'). Crocodilopolis (actual Medinet el-Fayum) fue uno de los centros religiosos más activos de Egipto. Los griegos la llamaron así por los cocodrilos sagrados.",
  opts:[
    {t:"Oficializar el culto de Sobek con financiamiento estatal y regulación de los sacerdotes",fx:{estabilidad:7,riqueza:-4,cultura:7,influencia:4},type:"politico"},
    {t:"Integrar a Sobek como manifestación de Ra: Sobek-Ra, unificando los dos cultos",fx:{estabilidad:8,riqueza:-2,cultura:8,influencia:6},type:"cultural"},
    {t:"Permitir el culto pero limitar el tamaño de los templos sin permiso real",fx:{estabilidad:4,riqueza:0,cultura:4,influencia:4},type:"politico"},
    {t:"Destruir el templo no autorizado: ningún santuario existe sin decreto faraónico",fx:{estabilidad:-7,riqueza:0,cultura:-7,influencia:-2},type:"cruel"}
  ],
  tl:{date:"1850 aC",ph:"Amenemhat III (Nimaatra)",ev:"Apogeo del culto a Sobek en el Fayum",tip:"Amenemhat III construyó su pirámide en Hawara, junto al templo de Sobek. Su complejo funerario fue tan elaborado que Heródoto lo llamó 'el Laberinto' y lo consideró más impresionante que las pirámides de Guiza."}},

  {id:207,per:"medio",cat:"economia",title:"El Tesoro que Falta",
  desc:"El escriba jefe de la Casa del Tesoro llega con un papiro que le tiembla en las manos: falta oro. No poco. El equivalente a treinta años de exportaciones de mirra. El rastro contable apunta a cuatro vizires diferentes actuando en coordinación durante una década. El fraude es sistémico, no individual. Si lo haces público, sacudes la confianza en toda la burocracia. Si lo resuelves en silencio, el sistema queda intacto pero la corrupción también.",
  ctx:"El sistema burocrático egipcio del Imperio Medio fue uno de los más sofisticados del mundo antiguo: registros de impuestos, inventarios de silos, nóminas de trabajadores. Pero toda burocracia compleja tiene sus puntos ciegos. Los papiros de Kahun revelan niveles de detalle administrativo asombrosos —y sus inevitables irregularidades.",
  opts:[
    {t:"Juicio público de todos los implicados: la corrupción sistémica exige respuesta visible",fx:{estabilidad:5,riqueza:4,cultura:7,influencia:4},type:"cultural"},
    {t:"Reforma silenciosa: recuperar lo robado discretamente y rediseñar el sistema de control",fx:{estabilidad:8,riqueza:5,cultura:2,influencia:2},type:"economico"},
    {t:"Ejecutar a los cuatro vizires como advertencia y redistribuir sus bienes entre el pueblo",fx:{estabilidad:-2,riqueza:6,cultura:-4,influencia:8},type:"militar"},
    {t:"Ignorarlo: perseguir a los vizires crearía inestabilidad política en plena campaña nubia",fx:{estabilidad:-7,riqueza:-4,cultura:-6,influencia:-6},type:"cruel"}
  ],
  tl:{date:"1900 aC",ph:"Amenemhat II (Nebwenenra)",ev:"Consolidación del sistema burocrático del Imperio Medio",tip:"Los papiros de Lahun (Kahun) son los archivos más completos del Imperio Medio: incluyen contratos de trabajo, registros médicos, correspondencia privada y hasta listas de ratas en los graneros. La burocracia egipcia era extraordinariamente detallista."}},

  {id:208,per:"medio",cat:"sociedad",title:"Los Esclavos que No son Esclavos",
  desc:"El escriba de los registros levanta una cuestión incómoda ante el consejo: en los papiros del Imperio hay tres categorías de trabajadores forzados que en la práctica se comportan igual, pero tienen estatus legales completamente distintos. Los prisioneros de guerra son propiedad del Estado. Los deudores que no pueden pagar trabajan por su deuda. Los campesinos en corvée son ciudadanos libres que deben días de trabajo al faraón. La confusión entre categorías genera abusos: capataces que tratan a trabajadores libres como esclavos. El pueblo está resentido.",
  ctx:"Egipto no tuvo esclavitud en el sentido romano en la mayor parte de su historia. Los 'servidores del rey' eran una categoría flexible que incluía prisioneros, deudores y trabajadores estatales. El Código de Hammurabi babilónico (1754 aC) muestra cuánto más explícita era la esclavitud en otras culturas contemporáneas.",
  opts:[
    {t:"Código laboral escrito: derechos y obligaciones de cada categoría de trabajador claramente definidos",fx:{estabilidad:8,riqueza:-3,cultura:8,influencia:4},type:"cultural"},
    {t:"Unificar todas las categorías en un sistema único de trabajo estatal con salario mínimo",fx:{estabilidad:6,riqueza:-5,cultura:6,influencia:2},type:"social"},
    {t:"Eliminar el trabajo por deuda: solo prisioneros de guerra y corvée voluntaria",fx:{estabilidad:4,riqueza:-4,cultura:5,influencia:0},type:"social"},
    {t:"Formalizar la esclavitud plena como en Mesopotamia: claridad legal aunque sea cruel",fx:{estabilidad:-7,riqueza:4,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1850 aC",ph:"Imperio Medio",ev:"Primeras regulaciones laborales documentadas del Imperio",tip:"El Papiro Westcar describe trabajadores que reciben salarios en cerveza, pan y ropa. Los mejores artesanos del Imperio ganaban el equivalente a pequeños propietarios. La clase media artesana egipcia es una de las primeras de la historia."}},
]

export const EVENTS_NUEVO_EXTRA: GameEvent[] = [
  {id:301,per:"nuevo",cat:"politica",title:"El Valle de los Reyes",
  desc:"El arquitecto real Ineni llega con una propuesta radical: abandonar las pirámides. Después de 1.500 años, todo el mundo sabe que las pirámides son tumbas. Cada faraón enterrado en ellas ha sido saqueado. En su lugar, propone un valle remoto en la montaña tebana, accesible solo por una grieta en la roca: tumbas excavadas en secreto, sin monumentos visibles, con entradas selladas y engañosas. Nadie sabrá dónde está el faraón. Los sacerdotes objetan: una tumba sin pirámide no tiene la fuerza para elevar al faraón al cielo.",
  ctx:"Tutmosis I (circa 1504 aC) fue el primer faraón enterrado en el Valle de los Reyes. La decisión fue un intento racional de prevenir el saqueo. No funcionó: casi todas las tumbas del Valle fueron saqueadas en la antigüedad. La de Tutankamón, descubierta intacta por Howard Carter en 1922, fue la excepción que confirmó la regla.",
  opts:[
    {t:"Adoptar el Valle de los Reyes: secreto, profundidad y trampa son la mejor protección",fx:{estabilidad:4,riqueza:4,cultura:8,influencia:4},type:"cultural"},
    {t:"Pirámide simbólica modesta más tumba secreta subterránea: lo mejor de ambos mundos",fx:{estabilidad:6,riqueza:-4,cultura:6,influencia:2},type:"social"},
    {t:"Continuar la tradición piramidal: la forma es teológicamente imprescindible",fx:{estabilidad:5,riqueza:-6,cultura:5,influencia:6},type:"cultural"},
    {t:"Enterramiento secreto sin tumba elaborada: el faraón no necesita monumentos, vive en sus obras",fx:{estabilidad:-2,riqueza:5,cultura:-4,influencia:0},type:"cruel"}
  ],
  tl:{date:"1504 aC",ph:"Tutmosis I (Akheperkara)",ev:"Primera tumba en el Valle de los Reyes",tip:"Howard Carter tardó seis años en encontrar la tumba de Tutankamón. Abrió la cámara principal el 26 de noviembre de 1922. Al asomarse con una vela preguntó: '¿Ves algo?' Su respuesta se hizo famosa: 'Sí, cosas maravillosas.'"}},

  {id:302,per:"nuevo",cat:"sociedad",title:"Los Obreros de la Necrópolis",
  desc:"En la aldea de Deir el-Medina, 60 familias de artesanos de élite viven en secreto absoluto: conocen la ubicación exacta de todas las tumbas reales, los mecanismos de sus trampas, los pasadizos secretos. Son los mejores grabadores, pintores y albañiles del mundo. Pero ese secreto tiene un precio: no pueden salir de la aldea sin escolta. Sus cartas están interceptadas. Sus hijos heredan la profesión obligatoriamente. Ahora piden permiso para que sus hijas puedan casarse fuera de la aldea sin restricciones.",
  ctx:"Deir el-Medina (1550-1080 aC) es el sitio arqueológico mejor documentado del Mundo Antiguo: se conservan miles de ostraca (fragmentos de cerámica) con cartas, listas de trabajo, pleitos vecinales y poemas de amor. Sabemos los nombres de los trabajadores, sus salarios, sus deudas, sus amores y sus peleas.",
  opts:[
    {t:"Conceder el permiso matrimonial: la lealtad se gana con confianza, no con encierro",fx:{estabilidad:7,riqueza:0,cultura:6,influencia:2},type:"social"},
    {t:"Conceder el permiso solo para artesanos retirados que ya no trabajen en las tumbas activas",fx:{estabilidad:5,riqueza:0,cultura:4,influencia:2},type:"politico"},
    {t:"Compensación económica: mejor salario y tierras propias a cambio de mantener las restricciones",fx:{estabilidad:4,riqueza:-5,cultura:3,influencia:4},type:"economico"},
    {t:"Mantener las restricciones totales: el secreto de las tumbas es más importante que la libertad individual",fx:{estabilidad:-6,riqueza:0,cultura:-6,influencia:0},type:"cruel"}
  ],
  tl:{date:"1350 aC",ph:"Imperio Nuevo",ev:"Florecimiento de Deir el-Medina — aldea de artesanos",tip:"En Deir el-Medina se encontraron los primeros relojes de agua (clepsidras) para medir turnos de trabajo, la primera huelga documentada, y poemas de amor de una sofisticación que sorprende: 'Mi corazón salta cuando pienso en tu amor como en los lotos que crecen en el pantano.'"}},

  {id:303,per:"nuevo",cat:"religion",title:"Tutankamón Restaura los Dioses",
  desc:"El joven rey tiene doce años y lleva dos en el trono. Sus consejeros —el general Horemheb y el visir Ay— le presentan el informe: Egipto está en caos espiritual después de Akenatón. Los templos de Amón siguen cerrados. Miles de sacerdotes sin trabajo, estatuas de los dioses antiguas rotas, el pueblo sin rituales para los difuntos. La solución es clara: restaurar todos los cultos tradicionales, reabrir los templos, devolver las tierras. Pero hacerlo implica admitir que su padre adoptivo fue un error. Y el niño faraón debe firmarlo.",
  ctx:"La Estela de la Restauración de Tutankamón (circa 1332 aC) es uno de los documentos más importantes del Imperio Nuevo. Describe el caos religioso post-Akenatón: templos en ruinas, oráculos que no respondían, dioses 'que daban la espalda a Egipto'. La restauración fue tan total que Tutankamón borró su nombre de Tutankaten a Tutankamón.",
  opts:[
    {t:"Restauración total e inmediata: todos los templos reabiertos, sacerdotes reinstalados, tierras devueltas",fx:{estabilidad:8,riqueza:-6,cultura:8,influencia:4},type:"cultural"},
    {t:"Restauración gradual por prioridades: primero Amón de Tebas, luego los demás cultos",fx:{estabilidad:6,riqueza:-4,cultura:7,influencia:4},type:"politico"},
    {t:"Restaurar los cultos pero mantener Atón como dios oficial secundario del Estado",fx:{estabilidad:2,riqueza:-2,cultura:4,influencia:2},type:"politico"},
    {t:"Esperar diez años para restaurar: la transición lenta evita conflictos con los atonistas que quedan",fx:{estabilidad:-4,riqueza:0,cultura:-4,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1332 aC",ph:"Tutankamón (Nebkheperura)",ev:"Restauración de los cultos tradicionales post-Akenatón",tip:"Tutankamón murió a los 18-19 años, posiblemente de malaria complicada con una fractura de pierna. Su tumba, la KV62, contenía más de 5.000 objetos. Su máscara funeraria de oro macizo pesa 10,23 kg. Es el símbolo más reconocido del Antiguo Egipto."}},

  {id:304,per:"nuevo",cat:"militar",title:"La Batalla de Qadesh",
  desc:"El mes de mayo del año 5 de Ramsés II. El ejército egipcio marcha en cuatro divisiones hacia Qadesh, en el norte de Siria, para enfrentar al ejército hitita de Muwatalli II. Dos espías hititas capturados afirman que el ejército enemigo está lejos. Son mentira: 40.000 soldados hititas esperan ocultos. La división de Amón avanza sola, separada de las otras tres. Cuando los carros hititas atacan, Ramsés II está casi solo. Lo que ocurre en las siguientes horas decidirá el destino de dos imperios.",
  ctx:"Qadesh (1274 aC) fue la batalla de carros más grande de la historia antigua: 5.000-6.000 carros de ambos lados. Ramsés II sobrevivió según los textos egipcios gracias a su valor personal. Los historiadores modernos creen que el resultado fue un empate costoso para ambos. El tratado de paz de 1259 aC fue la consecuencia.",
  opts:[
    {t:"Resistencia desesperada: Ramsés combate personalmente para dar tiempo a que lleguen refuerzos",fx:{estabilidad:-2,riqueza:-4,cultura:4,influencia:8},type:"militar"},
    {t:"Retirada ordenada: preservar el ejército y negociar desde una posición menos comprometida",fx:{estabilidad:4,riqueza:-2,cultura:-4,influencia:4},type:"militar"},
    {t:"Contraataque rápido usando los carros ligeros de la guardia personal real",fx:{estabilidad:-4,riqueza:-6,cultura:2,influencia:7},type:"militar"},
    {t:"Enviar emisarios a Muwatalli: ofrecer Qadesh a cambio de armisticio inmediato",fx:{estabilidad:2,riqueza:0,cultura:-6,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1274 aC",ph:"Ramsés II (Usermaatra Setepenra)",ev:"Batalla de Qadesh — mayor choque de carros de la historia",tip:"Ramsés II mandó grabar su 'victoria' en Qadesh en cinco templos. El Poema de Pentaur lo describe como un semidios que combatió solo contra miles. Los textos hititas describen un empate. La diferencia entre historia y propaganda tiene 3.300 años."}},

  {id:305,per:"nuevo",cat:"cultura",title:"Abu Simbel: El Templo de la Montaña",
  desc:"El arquitecto mayor presenta los planos: el faraón quiere que se excave un templo entero en la roca viva de la montaña de Abu Simbel, en la frontera con Nubia. Cuatro colosos de 20 metros de altura vigilando el río. Una sala hipóstila de columnas osiríacas. Un santuario interior orientado para que dos veces al año —el 22 de febrero y el 22 de octubre— los rayos del sol del amanecer iluminen exactamente la estatua del faraón sentado entre los dioses. El proyecto requiere veinte años. La orientación astronómica es el mayor desafío técnico jamás planteado a los ingenieros egipcios.",
  ctx:"Abu Simbel (circa 1264 aC) es un prodigio de ingeniería astronómica. La orientación solar funciona con exactitud milimétrica: dos veces al año el sol llega al fondo del santuario a 65 metros de profundidad. En 1968, cuando el lago Nasser amenazó sumergirlo, la UNESCO coordinó su traslado completo 65 metros hacia arriba, manteniendo la orientación exacta.",
  opts:[
    {t:"Aprobar el proyecto completo incluyendo la precisión astronómica: la perfección o nada",fx:{estabilidad:3,riqueza:-8,cultura:8,influencia:8},type:"cultural"},
    {t:"Templo monumental sin la complejidad astronómica: más rápido y menos costoso",fx:{estabilidad:4,riqueza:-5,cultura:6,influencia:6},type:"cultural"},
    {t:"Dos templos más pequeños en lugar de uno colosal: mejor distribución del impacto político",fx:{estabilidad:5,riqueza:-6,cultura:7,influencia:7},type:"politico"},
    {t:"Redirigir los fondos a fortalezas militares en Nubia: la arquitectura no frena ejércitos",fx:{estabilidad:4,riqueza:-2,cultura:-5,influencia:4},type:"cruel"}
  ],
  tl:{date:"1264 aC",ph:"Ramsés II (Usermaatra Setepenra)",ev:"Construcción del Gran Templo de Abu Simbel",tip:"La orientación solar de Abu Simbel se calculó para el 22 de febrero (cumpleaños de Ramsés) y el 22 de octubre (su coronación). Solo la estatua de Ptah, dios de la oscuridad, permanece siempre en sombra. El azar o el genio — todavía se debate."}},

  {id:306,per:"nuevo",cat:"economia",title:"Los Mercenarios del Faraón",
  desc:"El general Horemheb llega con un informe que mezcla buenas y malas noticias: los soldados libios y nubios mercenarios son los mejores guerreros del ejército. Disciplinados, valientes, leales al sueldo y, hasta ahora, al faraón. Pero representan ya el 40% del ejército profesional. Si el oro falta o si alguien les ofrece más... En Siria, el rey hitita ya envió emisarios a sus líderes. El precio de la lealtad mercenaria es la dependencia perpetua. Pero sin ellos, el ejército regular ya no puede sostener las fronteras solo.",
  ctx:"Los mercenarios medjay (nubios) y libu (libios) fueron pilares del ejército egipcio desde el Imperio Medio. La dependencia de mercenarios fue una de las causas del colapso del Imperio Nuevo: cuando el tesoro quedó vacío tras las invasiones de los Pueblos del Mar, el ejército mercenario simplemente se fue.",
  opts:[
    {t:"Integración total: los mercenarios reciben tierras y ciudadanía a cambio de lealtad permanente",fx:{estabilidad:6,riqueza:-5,cultura:4,influencia:6},type:"social"},
    {t:"Reducir progresivamente los mercenarios entrenando reclutas nativos",fx:{estabilidad:4,riqueza:-3,cultura:2,influencia:4},type:"militar"},
    {t:"Mantener la situación actual: la mezcla funciona y no hay que arreglarlo si no está roto",fx:{estabilidad:5,riqueza:-4,cultura:0,influencia:5},type:"politico"},
    {t:"Expulsar a todos los mercenarios: el ejército egipcio debe ser solo de sangre egipcia",fx:{estabilidad:-8,riqueza:2,cultura:-2,influencia:-6},type:"cruel"}
  ],
  tl:{date:"1300 aC aprox.",ph:"Seti I / Ramsés II",ev:"Apogeo del ejército profesional mixto del Imperio Nuevo",tip:"Los guerreros medjay fueron tan efectivos que su nombre se convirtió en sinónimo de 'policía' en el Imperio Nuevo. En la actual Sudán, Medjay significa todavía 'guardián de orden'. Una palabra de 3.300 años sigue viva."}},

  {id:307,per:"nuevo",cat:"politica",title:"La Conspiración del Harén",
  desc:"El visir real te entrega un papiro con sellos rotos de evidencia: un grupo de altas esposas del harén, lideradas por Tiye, madre de un hijo menor del faraón, conspiró para asesinar a Ramsés III durante la fiesta de Opet. Doce conspiradores identificados, incluidos dos jueces del tribunal real que debían juzgar el caso. El escándalo amenaza con destruir la credibilidad del sistema judicial entero. Si el faraón juzga a quienes debían juzgarlo, ¿quién juzga al faraón?",
  ctx:"La Conspiración del Harén (circa 1155 aC) está documentada en el Papiro Judicial de Turín. Ramsés III fue probablemente asesinado: análisis forenses de su momia en 2012 revelaron una herida de cuchillo en la garganta que le cortó la tráquea. El juicio es el proceso judicial mejor documentado del Antiguo Egipto.",
  opts:[
    {t:"Tribunal especial de jueces nombrados directamente por el faraón, proceso público",fx:{estabilidad:6,riqueza:0,cultura:7,influencia:6},type:"cultural"},
    {t:"Juicio secreto: la conspiración no debe conocerse para preservar la imagen de la familia real",fx:{estabilidad:5,riqueza:0,cultura:-2,influencia:4},type:"politico"},
    {t:"Ejecutar a los conspiradores inmediatamente sin juicio: la conspiración ya es prueba suficiente",fx:{estabilidad:-4,riqueza:0,cultura:-6,influencia:5},type:"militar"},
    {t:"Ignorar el caso y exiliar silenciosamente a Tiye: el escándalo de un juicio es peor que el crimen",fx:{estabilidad:-7,riqueza:0,cultura:-7,influencia:-5},type:"cruel"}
  ],
  tl:{date:"1155 aC",ph:"Ramsés III (Usermaatre Meryamun)",ev:"Conspiración del Harén — primer magnicidio documentado",tip:"El papiro judicial menciona que algunos jueces se corrompieron y participaron en orgías con las conspiratrices durante el juicio. Fueron juzgados junto a ellas. La justicia egipcia al menos era coherente en sus escándalos."}},

  {id:308,per:"nuevo",cat:"cultura",title:"El Himno a Atón",
  desc:"El sumo poeta del templo de Atón en Amarna te presenta el himno más extraordinario jamás compuesto en Egipto. Akenatón lo dictó personalmente: celebra la creación del mundo por el disco solar, la diversidad de los pueblos, la alegría de los animales al amanecer, la dependencia de toda vida de la luz. Es bellísimo. También es el primer texto en la historia que describe un dios creador universal de toda la humanidad, no solo de Egipto. Los paralelos con el Salmo 104 hebreo son imposibles de ignorar. ¿Qué haces con un texto revolucionario que cuestiona todo el orden anterior?",
  ctx:"El Gran Himno a Atón (circa 1346 aC) es uno de los poemas religiosos más bellos de la antigüedad. Sus paralelos con el Salmo 104 de la Biblia hebrea llevaron a décadas de debate: ¿influyó el monoteísmo de Akenatón en el monoteísmo hebreo? La mayoría de los historiadores hoy considera que la conexión es real aunque indirecta.",
  opts:[
    {t:"Preservar el himno como documento histórico aunque el culto de Atón sea abolido",fx:{estabilidad:4,riqueza:0,cultura:8,influencia:2},type:"cultural"},
    {t:"Incorporar pasajes del himno a la liturgia de Amón: la belleza no tiene dueño teológico",fx:{estabilidad:6,riqueza:0,cultura:7,influencia:4},type:"cultural"},
    {t:"Destruir todos los ejemplares: el himno es propaganda de una herejía y corrompe a quien lo lee",fx:{estabilidad:-4,riqueza:0,cultura:-8,influencia:2},type:"cruel"},
    {t:"Traducirlo a cuatro idiomas y enviarlo como regalo diplomático a reyes extranjeros",fx:{estabilidad:2,riqueza:-2,cultura:8,influencia:8},type:"diplomatico"}
  ],
  tl:{date:"1346 aC",ph:"Akenatón (Amenhotep IV)",ev:"Composición del Gran Himno a Atón",tip:"El Salmo 104 bíblico y el Himno a Atón comparten imágenes casi idénticas: los leones que cazan de noche, los pájaros que cantan al amanecer, los barcos que navegan por el río. Si la conexión es directa o coincidencia poética, el debate tiene 150 años de historia académica."}},
]

export const EVENTS_TARDIO_EXTRA: GameEvent[] = [
  {id:401,per:"tardio",cat:"politica",title:"Los Faraones Negros",
  desc:"Kashta y luego Piye llegaron del sur. Los reyes de Kush, que habían absorbido durante siglos la cultura egipcia mientras Egipto se fragmentaba, ahora vienen a 'restaurar' Maat. Son más egipcios que muchos egipcios: conocen los textos sagrados, hablan con acento del Nilo, construyen pirámides más pequeñas pero más perfectas que las del Imperio Nuevo. La ironía es perfecta: Egipto puede ser salvado por quienes alguna vez fueron sus esclavos. El pueblo tebano los recibe con flores. Los nobles del delta, con recelo.",
  ctx:"La Dinastía XXV kushita (747-656 aC) fue la última época de esplendor de Tebas. Los faraones nubios restauraron templos, codificaron textos religiosos y mantuvieron a los asirios a raya durante décadas. Sus pirámides en Meroe (actual Sudán) son hoy la mayor concentración de pirámides del mundo: 200 estructuras.",
  opts:[
    {t:"Reconocer plenamente a los faraones nubios: la legitimidad viene de la cultura, no del origen",fx:{estabilidad:8,riqueza:6,cultura:8,influencia:4},type:"cultural"},
    {t:"Alianza pragmática: los kushitas gobiernan el sur, el Delta mantiene autonomía",fx:{estabilidad:6,riqueza:4,cultura:6,influencia:4},type:"politico"},
    {t:"Resistencia pasiva: cooperar en lo mínimo indispensable mientras se buscan aliados asirios",fx:{estabilidad:-4,riqueza:0,cultura:-2,influencia:4},type:"politico"},
    {t:"Rebelión abierta del Delta contra los faraones kushitas",fx:{estabilidad:-8,riqueza:-6,cultura:-4,influencia:-6},type:"cruel"}
  ],
  tl:{date:"747 aC",ph:"Piye (Pianjy) — Dinastía XXV kushita",ev:"Conquista kushita — faraones de piel negra gobiernan Egipto",tip:"Las pirámides de Meroe en Sudán son más altas y empinadas que las egipcias. Los faraones kushitas construyeron más pirámides que ningún faraón egipcio individual. El Museo de Berlín guarda la colección más completa de arte meroítico del mundo."}},

  {id:402,per:"tardio",cat:"economia",title:"El Canal de Neco II",
  desc:"El faraón Neco II propone el proyecto de infraestructura más ambicioso desde las pirámides: un canal que conecte el brazo más oriental del Nilo con el Mar Rojo, pasando por el istmo del Sinaí. 180 kilómetros. Las especias de Arabia y la India llegarían directamente a los puertos mediterráneos sin pasar por caravanas terrestres. El comercio del mundo cambiaría. Un oráculo adiverte: 'El canal beneficia al bárbaro.' Heródoto escribirá después que 120.000 trabajadores murieron en la construcción.",
  ctx:"El canal de Neco II (circa 600 aC) fue terminado por los persas bajo Darío I. Funcionó hasta el siglo VIII dC cuando fue abandonado. El Canal de Suez moderno (1869) siguió casi exactamente la misma ruta que Neco II trazó 2.500 años antes. La visión geopolítica del faraón tardío fue perfecta.",
  opts:[
    {t:"Completar el canal sin importar el costo humano: el beneficio estratégico lo justifica",fx:{estabilidad:-4,riqueza:8,cultura:-2,influencia:8},type:"economico"},
    {t:"Canal más corto solo entre el Nilo y los Lagos Amargos, reduciendo el costo y el tiempo",fx:{estabilidad:4,riqueza:5,cultura:2,influencia:4},type:"economico"},
    {t:"Abandonar el canal y construir en su lugar una flota en el Mar Rojo para comercio directo",fx:{estabilidad:4,riqueza:4,cultura:2,influencia:4},type:"economico"},
    {t:"Suspender el proyecto al conocer la profecía: el oráculo no se desafía",fx:{estabilidad:6,riqueza:-2,cultura:2,influencia:-2},type:"cruel"}
  ],
  tl:{date:"600 aC",ph:"Neco II (Wehemibre)",ev:"Inicio del canal Nilo-Mar Rojo — precursor del Canal de Suez",tip:"Heródoto afirma que el canal podían navegar dos trirremes en paralelo. Darío I lo terminó y grabó una estela en su honor. Los arqueólogos encontraron en 2019 restos del canal en El Qantara, confirmando su existencia y la ruta descrita por los antiguos."}},

  {id:403,per:"tardio",cat:"cultura",title:"La Biblioteca de Alejandría",
  desc:"Ptolomeo I Sóter convoca a los mayores intelectuales del Mediterráneo: quiere construir el mayor repositorio de conocimiento humano jamás creado. Una biblioteca universal en Alejandría, con traducción sistemática de todos los textos conocidos: egipcios, babilónicos, persas, hebreos, griegos, persas. El filósofo Demetrio de Falero diseña el plan: agentes del Estado compran o copian libros en todos los puertos, todo barco que atraca en Alejandría debe prestar sus manuscritos para ser copiados. Es el primer proyecto de digitalización de la historia, en papiro.",
  ctx:"La Biblioteca de Alejandría (fundada circa 285 aC) reunió entre 200.000 y 700.000 rollos de papiro. Allí Euclides escribió los Elementos, Eratóstenes midió la circunferencia de la Tierra, Aristarco propuso que la Tierra gira alrededor del Sol. Fue el mayor centro intelectual de la antigüedad, destruido gradualmente entre los siglos I y VII dC.",
  opts:[
    {t:"Financiamiento total del Estado: la Biblioteca como proyecto nacional de Egipto",fx:{estabilidad:4,riqueza:-8,cultura:8,influencia:8},type:"cultural"},
    {t:"Biblioteca más Mouseion: centro de investigación donde los científicos reciben salario del Estado",fx:{estabilidad:2,riqueza:-8,cultura:8,influencia:8},type:"cultural"},
    {t:"Biblioteca selectiva: solo los mejores textos de cada tradición, sin la obsesión por la cantidad",fx:{estabilidad:4,riqueza:-4,cultura:7,influencia:6},type:"cultural"},
    {t:"Rechazar el proyecto: el conocimiento concentrado en un lugar puede ser destruido en un día",fx:{estabilidad:2,riqueza:4,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"285 aC",ph:"Ptolomeo I Sóter",ev:"Fundación de la Biblioteca de Alejandría",tip:"Eratóstenes calculó la circunferencia de la Tierra en Alejandría circa 240 aC usando la diferencia de ángulos del sol en Siena y Alejandría en el solsticio de verano. Su resultado fue de 39.375 km. El valor real es 40.075 km. Error: 1,7%."}},

  {id:404,per:"tardio",cat:"sociedad",title:"El Dinero Llega al Nilo",
  desc:"Los mercaderes griegos de Naucratis traen una novedad que está revolucionando el Mediterráneo: la moneda. Pequeños discos de electro, plata y bronce con un valor garantizado por el Estado emisor. Los fenicios la adoptaron. Los persas la adoptaron. En Egipto, toda la economía funciona desde hace 3.000 años por redistribución estatal: el faraón recibe grano, aceite y lino en impuestos, y los redistribuye como salarios. Nadie compra ni vende: intercambia, con el Estado como intermediario. La moneda cambiaría todo. ¿O lo destruiría todo?",
  ctx:"Egipto adoptó la moneda metálica más tarde que cualquier otra gran civilización mediterránea: recién bajo la dominación persa (siglo V aC). El sistema redistributivo sin moneda había funcionado sorprendentemente bien durante 2.500 años. Con la moneda llegaron también la inflación, la deuda privada y la acumulación individual de riqueza.",
  opts:[
    {t:"Adoptar la moneda: crear una casa de la moneda real y acuñar el primer dracma egipcio",fx:{estabilidad:4,riqueza:8,cultura:6,influencia:6},type:"economico"},
    {t:"Sistema mixto: moneda para el comercio exterior, redistribución estatal para el interior",fx:{estabilidad:6,riqueza:6,cultura:4,influencia:4},type:"economico"},
    {t:"Rechazar la moneda y reforzar el sistema redistributivo: Egipto no necesita lo que inventaron los griegos",fx:{estabilidad:5,riqueza:-2,cultura:4,influencia:-4},type:"politico"},
    {t:"Adoptar la moneda griega directamente sin acuñar una propia: más rápido, menos costo",fx:{estabilidad:2,riqueza:6,cultura:-4,influencia:-4},type:"cruel"}
  ],
  tl:{date:"500 aC",ph:"Período Tardío bajo influencia persa y griega",ev:"Introducción de la moneda metálica en Egipto",tip:"La primera moneda acuñada en Egipto con sello real egipcio apareció bajo los Ptolomeos (siglo III aC). Antes, los egipcios usaban 'pesos de plata' sin forma estándar. La estandarización monetaria tardó 2.500 años de historia faraónica."}},

  {id:405,per:"tardio",cat:"religion",title:"Los Animales de los Dioses",
  desc:"En el Período Tardío, algo extraordinario ocurre en los templos: millones de animales embalsamados. Gatos para Bastet, ibis para Thoth, cocodrilos para Sobek, halcones para Horus, perros para Anubis. Los peregrinos los compran en los puestos del templo, los ofrendan al dios y los sacerdotes los entierran en catacumbas especiales. Arqueólogos del futuro encontrarán 8 millones de ibis momificados en Saqqara. Pero una investigación revela que muchos animales son sacrificados en el templo mismo para satisfacer la demanda. ¿Es esto piedad o negocio?",
  ctx:"Las catacumbas de animales de Saqqara contienen más de 8 millones de ibis momificados. El análisis reveló que muchos murieron jóvenes, criados en granjas del templo. El negocio de las momias animales fue uno de los más rentables del Período Tardío. La piedad popular y la economía del templo eran indistinguibles.",
  opts:[
    {t:"Regular el culto: solo animales que murieron naturalmente pueden ser momificados y ofrendados",fx:{estabilidad:4,riqueza:-4,cultura:6,influencia:2},type:"cultural"},
    {t:"Expandir las granjas del templo oficialmente: demanda popular + ingresos para los templos",fx:{estabilidad:6,riqueza:6,cultura:4,influencia:4},type:"economico"},
    {t:"Limitar el comercio a las grandes ciudades con santuarios certificados",fx:{estabilidad:5,riqueza:2,cultura:5,influencia:4},type:"politico"},
    {t:"Prohibir la venta de animales sagrados: la fe no puede ser un negocio",fx:{estabilidad:-6,riqueza:-6,cultura:-4,influencia:-4},type:"cruel"}
  ],
  tl:{date:"600-30 aC",ph:"Período Tardío y Ptolemaico",ev:"Apogeo del culto a los animales sagrados momificados",tip:"En 2019 se descubrió en Saqqara una catacumba nueva con millones de momias de gatos, cocodrilos, cobras y escarabajos. El análisis de ADN de los ibis momificados muestra que provenían de todo el Mediterráneo, importados especialmente para el culto."}},

  {id:406,per:"tardio",cat:"politica",title:"César en el Nilo",
  desc:"Julio César llegó a Alejandría persiguiendo a Pompeyo, pero encontró algo inesperado: una guerra civil entre Cleopatra VII y su hermano Ptolomeo XIII por el trono de Egipto. Cleopatra se hizo introducir ante César enrollada en una alfombra —o en un saco de ropa, los relatos varían. Lo que no varía es el resultado: César apoyó a Cleopatra. El joven Ptolomeo XIII murió en el Nilo. Alejandría ardió. Y en el incendio, miles de rollos de la Biblioteca se perdieron. La historia más brillante de Egipto se decide en una alcoba.",
  ctx:"La alianza Cleopatra-César (48-44 aC) fue el último intento de Egipto de mantener su independencia usando la política romana. Cleopatra entendió que el único modo de sobrevivir era ser indispensable para Roma. Funcionó durante 18 años. La batalla de Actio en 31 aC fue su fin.",
  opts:[
    {t:"Alianza plena con César: Egipto como socio privilegiado de Roma, no como provincia",fx:{estabilidad:6,riqueza:6,cultura:6,influencia:8},type:"diplomatico"},
    {t:"Neutralidad estratégica: no tomar partido en la guerra civil romana",fx:{estabilidad:7,riqueza:4,cultura:4,influencia:2},type:"politico"},
    {t:"Apoyar a Pompeyo: el perdedor de Farsalia como carta de revancha futura",fx:{estabilidad:-6,riqueza:-4,cultura:0,influencia:-6},type:"militar"},
    {t:"Aprovechar el caos romano para declarar independencia total de influencias externas",fx:{estabilidad:-4,riqueza:2,cultura:4,influencia:-8},type:"cruel"}
  ],
  tl:{date:"48 aC",ph:"Cleopatra VII Filopátor",ev:"Llegada de César a Alejandría — inicio de la era romano-egipcia",tip:"El incendio de la Biblioteca de Alejandría durante la guerra civil entre César y Ptolomeo XIII destruyó al menos 40.000 rollos según las fuentes antiguas. No fue la única vez que la Biblioteca ardió: sufrió daños bajo Julio César, Aureliano (270 dC) y el califa Omar (640 dC), según distintas fuentes."}},

  {id:407,per:"tardio",cat:"cultura",title:"El Decreto de Rosetta",
  desc:"El joven Ptolomeo V necesita apoyo desesperadamente. El ejército mercenario está sin pago. Las revueltas nativas sacuden el Delta. Los sacerdotes de Menfis tienen el poder real del país. En el sínodo de Menfis de 196 aC, el nuevo faraón negocia: los sacerdotes recibirán exenciones fiscales, nuevos privilegios, y el reconocimiento de sus derechos ancestrales. A cambio, emitirán un decreto proclamando la divinidad del faraón en tres idiomas y dos escrituras: griego, hierático y demótico. Una piedra de granito negro registrará el acuerdo. La llaman la Piedra de Rosetta.",
  ctx:"La Piedra de Rosetta (196 aC) es el documento más famoso de la arqueología. Fue encontrada por un soldado de Napoleón en 1799 en Rashid. Champollion la usó en 1822 para descifrar los jeroglíficos: comparó el texto griego conocido con el demótico y el jeroglífico hasta identificar los cartuchos de Ptolomeo. Fue el desciframiento más importante de la historia.",
  opts:[
    {t:"Emitir el decreto en los tres idiomas: el alcance simbólico vale la complejidad",fx:{estabilidad:7,riqueza:-4,cultura:8,influencia:6},type:"cultural"},
    {t:"Solo en griego y demótico: los jeroglíficos son ya un idioma muerto en uso administrativo",fx:{estabilidad:5,riqueza:-2,cultura:5,influencia:4},type:"politico"},
    {t:"Decreto verbal sin piedra: las concesiones se hacen, pero sin documento que las fije",fx:{estabilidad:3,riqueza:0,cultura:2,influencia:2},type:"politico"},
    {t:"Rechazar la negociación: el faraón no mendiga legitimidad de sus propios sacerdotes",fx:{estabilidad:-8,riqueza:2,cultura:-5,influencia:-6},type:"cruel"}
  ],
  tl:{date:"196 aC",ph:"Ptolomeo V Epífanes",ev:"Emisión del Decreto de Menfis — la Piedra de Rosetta",tip:"Champollion tenía 32 años cuando descifró los jeroglíficos en 1822. Cayó desmayado de la emoción, literalmente. No pudo levantarse durante cinco días. Cuando volvió en sí, dijo solo: 'Je tiens l'affaire!' (¡Lo tengo!). Murió diez años después, a los 41."}},

  {id:408,per:"tardio",cat:"sociedad",title:"Los Hijos de Grecia y el Nilo",
  desc:"Tres generaciones después de Alejandro Magno, Alejandría es la ciudad más grande del mundo mediterráneo. Griegos, macedonios, judíos, egipcios nativos, sirios, persas, nubios: dos millones de personas conviven en una ciudad diseñada en cuadrícula perfecta. Los egipcios de piel oscura, que hablan copto y honran a Isis y Osiris, conviven con griegos que philosophan en el Mouseion y judíos que leen la Torá en griego (la Septuaginta). La mezcla es brillante y conflictiva a la vez. Un disturbio en el barrio judío amenaza con extenderse.",
  ctx:"Alejandría ptolemaica fue la primera metrópoli multicultural de la historia. La Septuaginta (traducción griega de la Torá, circa 250 aC) se hizo en Alejandría. El Museo (Mouseion) fue el primer instituto de investigación científica de la historia. Eratóstenes, Euclides, Herón y Hipatia trabajaron allí.",
  opts:[
    {t:"Convocatoria de líderes comunitarios: solucionar el conflicto con diálogo entre las comunidades",fx:{estabilidad:7,riqueza:0,cultura:8,influencia:4},type:"social"},
    {t:"Guarnición militar en el barrio en conflicto hasta que baje la tensión",fx:{estabilidad:5,riqueza:-2,cultura:-2,influencia:6},type:"militar"},
    {t:"Tribunales mixtos con representantes de cada comunidad para resolver disputas formalmente",fx:{estabilidad:8,riqueza:-3,cultura:7,influencia:4},type:"cultural"},
    {t:"Expulsar del barrio a los provocadores identificados, sea cual sea su origen",fx:{estabilidad:-4,riqueza:0,cultura:-6,influencia:-4},type:"cruel"}
  ],
  tl:{date:"250 aC aprox.",ph:"Ptolomeo II Filadelfo",ev:"Alejandría — primera metrópoli multicultural del mundo",tip:"La Septuaginta fue traducida en Alejandría por 72 sabios judíos (6 de cada una de las 12 tribus). Según la leyenda, los 72 trabajaron por separado y produjeron traducciones idénticas: prueba de su inspiración divina. La historia es apócrifa, pero la Septuaginta real sigue siendo la mayor empresa de traducción de la antigüedad."}}
]
