import type { GameEvent } from '../types'

export const EVENTS_ANTIGUO_EXTRA: GameEvent[] = [
  {id:101,per:"antiguo",cat:"politica",title:"Los Dos Reinos se Unen",
  desc:"La sangre de la batalla de Menfis aún no seca y ya tienes ante ti la pregunta que definirá los próximos mil años: ¿cómo gobernar un Egipto que hasta ayer era dos países enemigos? El norte habla un dialecto diferente, venera al halcón Horus pero también a la serpiente Wadjet. El sur venera al buitre Nekhbet y al escorpión. Los sacerdotes del norte no reconocen tus dioses. Los nomarcas del delta miran tu corona roja con desconfianza. Puedes imponer el sur sobre el norte, o buscar algo más difícil: la síntesis.",
  ctx:"La unificación circa 3100 aC fue un proceso gradual y violento. La Paleta de Narmer muestra al faraón con ambas coronas, símbolo de la fusión. El sistema de los nomos —42 provincias administradas localmente— fue la solución pragmática que permitió gobernar un territorio de 1.000 km de largo durante 3.000 años.",
  opts:[
    {t:"Síntesis cultural: adoptar los dioses, tradiciones y títulos de ambos reinos por igual",fx:{estabilidad:8,riqueza:4,cultura:8,influencia:6},type:"politico"},
    {t:"Primacía del sur: el Alto Egipto impone su administración y sus dioses al norte",fx:{estabilidad:-4,riqueza:2,cultura:-4,influencia:8},type:"militar"},
    {t:"Sistema de nomos: autonomía provincial bajo supervisión de vizires reales",fx:{estabilidad:7,riqueza:6,cultura:6,influencia:4},type:"social"},
    {t:"Dejar que los reinos funcionen separados bajo un faraón común en lo ceremonial",fx:{estabilidad:-6,riqueza:0,cultura:0,influencia:-4},type:"politico"}
  ],
  tl:{date:"3100 aC",ph:"Narmer / Menes",ev:"Unificación del Alto y Bajo Egipto — nacimiento del Estado",tip:"La doble corona del faraón (el pschent) combinaba la corona blanca del sur con la roja del norte. Era más que un símbolo: era el contrato político de la unificación. Llevarla era gobernar la tensión entre dos mundos."}},

  {id:102,per:"antiguo",cat:"economia",title:"Las Canteras de Asuán",
  desc:"El arquitecto real llega con los planos: el nuevo templo de Ra en Heliópolis requiere 200 columnas de granito rosa de Asuán, a 900 kilómetros al sur. Las canteras ya funcionan, pero los bloques de 20 toneladas deben bajarse al Nilo en trineos de madera, cargarse en balsas, navegar semanas por las cataratas y llegar sin fracturarse. Cinco hombres murieron aplastados el año pasado. El capataz propone un nuevo sistema de rodillos de madera húmeda. Funcionaría, pero requiere doce meses de prueba y triplicaría el costo.",
  ctx:"Las canteras de Asuán produjeron el granito de la mayoría de los monumentos del Antiguo Imperio. El Obelisco Inacabado, aún visible hoy, muestra una grieta que obligó a abandonarlo. Pesa más de 1.000 toneladas. Los egipcios no usaron ruedas para transportar bloques: usaban trineos de madera sobre arena húmeda.",
  opts:[
    {t:"Invertir en la innovación de rodillos: más costo ahora, menos accidentes y pérdidas futuras",fx:{estabilidad:4,riqueza:-7,cultura:5,influencia:2},type:"social"},
    {t:"Continuar el sistema actual con más supervisores de seguridad",fx:{estabilidad:2,riqueza:-3,cultura:2,influencia:0},type:"economico"},
    {t:"Sustituir el granito por caliza pintada: más barato, más rápido, resultado aceptable",fx:{estabilidad:0,riqueza:4,cultura:-5,influencia:-2},type:"economico"},
    {t:"Duplicar la fuerza de trabajo con prisioneros libios: más cuerpos compensan la ineficiencia",fx:{estabilidad:-5,riqueza:3,cultura:-6,influencia:4},type:"cruel"}
  ],
  tl:{date:"2560 aC aprox.",ph:"Keops (IV dinastía)",ev:"Granito de Asuán para la Gran Pirámide",tip:"Para la Cámara del Rey de la Gran Pirámide se trajeron desde Asuán, por el Nilo, bloques de granito de decenas de toneladas (las estimaciones van de 50 a 80). Asuán queda a unos 900 km de Guiza."}},

  {id:103,per:"antiguo",cat:"politica",title:"El Visir que Sabe Demasiado",
  desc:"Imhotep lleva veinte años siendo la mente más brillante del Imperio: canciller del rey, sumo sacerdote de Heliópolis, jefe de las obras del rey. Se le atribuye el diseño de la primera pirámide. Conoce los archivos secretos del tesoro, los nombres de los espías en las cortes extranjeras, las debilidades de cada nomarca. Es leal. Pero, según la tradición, no es de sangre real y tiene más poder real que cualquier noble. Los príncipes de sangre real llevan años presionando para que lo destituyas. Hoy, uno de ellos depositó sobre tu mesa un papiro con acusaciones de malversación.",
  ctx:"Imhotep (hacia el 2650 aC) fue tan excepcional que dos mil años después fue deificado: los griegos lo identificaron con Asclepio, dios de la medicina. Su fama de médico es posterior: ningún texto de su época lo dice. Es de los pocos hombres sin sangre real que llegaron a ser adorados como dioses.",
  opts:[
    {t:"Investigar las acusaciones con un tribunal independiente de escribas reales",fx:{estabilidad:5,riqueza:0,cultura:7,influencia:4},type:"cultural"},
    {t:"Defender públicamente a Imhotep: los nobles aprenden que la meritocracia no se negocia",fx:{estabilidad:3,riqueza:0,cultura:8,influencia:6},type:"social"},
    {t:"Ascenderlo formalmente pero rodearle de consejeros nobles que lo controlen",fx:{estabilidad:6,riqueza:0,cultura:4,influencia:2},type:"politico"},
    {t:"Destituirlo para calmar a los nobles: el orden social es más importante que el talento",fx:{estabilidad:-6,riqueza:-2,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"2650 aC",ph:"Djoser (Dyeser)",ev:"Pirámide Escalonada — primer edificio de piedra de la historia",tip:"La base de una estatua de Djoser lleva el nombre de Imhotep con sus títulos, entre ellos «el más grande de los videntes»: un honor poco común para un funcionario. Los egipcios posteriores lo recordaron como sabio durante siglos."}},

  {id:104,per:"antiguo",cat:"religion",title:"Ra contra Osiris",
  desc:"La tensión entre los sacerdotes de Heliópolis, guardianes del culto solar a Ra, y los de Abidos, guardianes del culto a Osiris y el Más Allá, ha estallado en un conflicto abierto. Los heliopolitanos argumentan que el faraón es hijo del Sol y su poder viene de Ra. Los osirianos contraatacan: sin Osiris no hay resurrección, sin resurrección no hay faraón eterno. Ambos cultos son enormes, ambos tienen tierras, escribas y ejércitos de sacerdotes. El pueblo está confundido. Tú debes decidir cuál es la teología oficial del Estado.",
  ctx:"Hacia el final del Antiguo Imperio, Abidos ya era un centro principal del culto de Osiris. La síntesis Ra-Osiris fue uno de los grandes logros del pensamiento egipcio: siglos después, el Libro de lo que hay en el Más Allá cuenta cómo el sol-Ra viaja de noche por el inframundo y se une con Osiris a medianoche.",
  opts:[
    {t:"Síntesis teológica: Ra y Osiris son manifestaciones del mismo poder divino, complementarios",fx:{estabilidad:8,riqueza:0,cultura:8,influencia:4},type:"cultural"},
    {t:"Primacía solar: Ra es el dios supremo del Estado, Osiris permanece en la esfera privada",fx:{estabilidad:4,riqueza:0,cultura:4,influencia:8},type:"politico"},
    {t:"Primacía osiriana: el faraón como hijo de Osiris tiene mayor arraigo popular",fx:{estabilidad:6,riqueza:0,cultura:6,influencia:6},type:"social"},
    {t:"Suprimir el culto de Osiris: solo los templos solares recibirán financiamiento estatal",fx:{estabilidad:-8,riqueza:4,cultura:-8,influencia:0},type:"cruel"}
  ],
  tl:{date:"2360 aC aprox.",ph:"Unas (V dinastía)",ev:"Los Textos de las Pirámides unen a Ra y a Osiris",tip:"En la pirámide de Unas el rey sube al cielo con Ra y también reina entre los muertos como Osiris. Los textos mezclan teologías de orígenes distintos, y no está claro cómo convivían en la práctica los sacerdotes de cada culto."}},

  {id:105,per:"nuevo",cat:"sociedad",title:"La Primera Huelga de la Historia",
  desc:"Los papiros de la aldea de Deir el-Medina son claros: los trabajadores no se mueven. Han abandonado las herramientas, se han sentado a la sombra de los muros y esperan. La razón: llevan tres semanas sin recibir sus raciones de cebada, aceite de linaza y cerveza. La causa es un Estado en crisis, que ya no logra reunir el grano a tiempo. Los obreros no piden más de lo que les corresponde: piden lo acordado. Detrás de ellos, sus familias. Delante, la obra del faraón paralizada.",
  ctx:"La huelga quedó registrada en el Papiro de la Huelga de Turín, escrito por el escriba Amennakhte, en el año 29 de Ramsés III (hacia el 1157 aC). Los obreros dejaron las herramientas y se sentaron ante los templos funerarios: sus raciones llevaban semanas sin llegar. Se la suele llamar la primera huelga laboral documentada de la historia.",
  opts:[
    {t:"Pago inmediato de las raciones atrasadas y destitución del vizir malversador",fx:{estabilidad:8,riqueza:-5,cultura:5,influencia:4},type:"social"},
    {t:"Negociar: pago parcial ahora, el resto en un mes, con supervisión real de las raciones",fx:{estabilidad:5,riqueza:-2,cultura:3,influencia:2},type:"economico"},
    {t:"Investigar al vizir antes de pagar: la justicia es más importante que la rapidez",fx:{estabilidad:2,riqueza:0,cultura:7,influencia:2},type:"cultural"},
    {t:"Declarar a los huelguistas insubordinados y remplazarlos con nuevos trabajadores",fx:{estabilidad:-8,riqueza:2,cultura:-7,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1157 aC aprox.",ph:"Ramsés III (Usermaatre Meryamun)",ev:"Primera huelga laboral documentada de la historia",tip:"El papiro está en el Museo Egizio de Turín. Las autoridades pagaron el grano atrasado, pero pocos días después los obreros volvieron a protestar. Era el siglo XII aC, y los trabajadores ya sabían cómo presionar al Estado."}},

  {id:106,per:"antiguo",cat:"cultura",title:"Los Escribas y la Escritura Rápida",
  desc:"El jefe de los escribas reales te presenta un problema y una oportunidad al mismo tiempo. Los jeroglíficos son perfectos para los monumentos, pero aprender a escribirlos lleva años. El Imperio necesita miles de funcionarios que registren impuestos, inventarios, cartas diplomáticas. Un joven escriba ha propuesto un sistema alternativo: signos cursivos, trazados de corrido con pincel y tinta, más rápidos de aprender y de escribir. Podría democratizar la escritura. O podría banalizar lo sagrado.",
  ctx:"El hierático, la escritura cursiva egipcia, fue la solución práctica al problema de los jeroglíficos: se trazaba rápido con tinta sobre papiro, y más tarde evolucionó al demótico. La escritura protosinaítica, hallada en las minas del Sinaí (entre el 1850 y el 1500 aC, según los autores), adaptó signos egipcios a una lengua semita y es uno de los primeros alfabetos conocidos.",
  opts:[
    {t:"Adoptar el sistema simplificado para la administración, manteniendo jeroglíficos para templos",fx:{estabilidad:5,riqueza:5,cultura:7,influencia:4},type:"cultural"},
    {t:"Crear escuelas de escribas con el sistema nuevo para duplicar los funcionarios en una generación",fx:{estabilidad:4,riqueza:4,cultura:8,influencia:2},type:"social"},
    {t:"Mantener solo los jeroglíficos: la dificultad de la escritura protege su poder sagrado",fx:{estabilidad:2,riqueza:-2,cultura:4,influencia:6},type:"politico"},
    {t:"Prohibir cualquier escritura fuera de los templos y la administración real",fx:{estabilidad:-6,riqueza:0,cultura:-8,influencia:2},type:"cruel"}
  ],
  tl:{date:"2380 aC aprox.",ph:"Papiros de Abusir (V dinastía)",ev:"El archivo de un templo, escrito en hierático",tip:"Los papiros de Abusir son de los más antiguos que se conservan: turnos de sacerdotes, listas de ofrendas e inventarios de un templo. El hierático, más cursivo, era la escritura de la administración; los jeroglíficos se reservaban a los monumentos."}},

  {id:107,per:"antiguo",cat:"economia",title:"El Camino de los Oasis",
  desc:"Una caravana llega del desierto occidental con noticias de los oasis de Kharga y Dakhla: hay agua en pozos y manantiales y tierra que se puede cultivar. Los comerciantes piden que el Estado abra un camino con campamentos y pozos. Los jefes de la frontera temen perder hombres y grano en tierras tan lejanas. Algunos consejeros proponen enviar antes una expedición de reconocimiento; otros, dejar los oasis a los caravaneros.",
  ctx:"Sobre la Girga Road, el camino entre el valle del Nilo y Kharga, hay campamentos faraónicos desde el Antiguo Imperio avanzado. Hacia el 2300 a.C. los gobernadores de Dakhla se hacían enterrar en Balat, en mastabas parecidas a las de Saqqara; para algunos investigadores el oasis era más un puesto en territorio ajeno que una provincia.",
  opts:[
    {t:"Abrir el camino con campamentos y pozos, y destinar un gobernador a los oasis",fx:{estabilidad:-1,riqueza:-6,influencia:6,comercio:4},type:"politico"},
    {t:"Enviar primero una expedición de reconocimiento y decidir con lo que traiga",fx:{estabilidad:3,riqueza:-3,cultura:2,influencia:2,comercio:1},type:"social"},
    {t:"Dejar los oasis a los caravaneros y cobrarles un tributo en la frontera",fx:{estabilidad:4,riqueza:3,influencia:-2,comercio:1},type:"economico"},
    {t:"Reclutar a la fuerza a los aldeanos de la frontera para abrir el camino más rápido",fx:{estabilidad:-6,riqueza:-2,cultura:-5,influencia:4},type:"cruel"}
  ],
  tl:{date:"2400 aC aprox.",ph:"Girga Road y Balat (Dakhla)",ev:"Campamentos faraónicos en el camino a los oasis",tip:"Sobre la Girga Road, entre el valle del Nilo y Kharga, se encontraron campamentos del Antiguo Imperio. En Dakhla, los gobernadores se enterraron en Balat hacia el 2300 a.C."}},

  {id:108,per:"antiguo",cat:"sociedad",title:"Los Médicos del Nilo",
  desc:"El médico principal del palacio presenta al consejo un documento extraordinario: un tratado sistemático sobre 48 casos clínicos, con diagnóstico, pronóstico y tratamiento. Cada caso se trata con observación y remedios prácticos, y los conjuros pasan a segundo plano: fracturas de cráneo, heridas de cuello y de pecho, golpes de guerra. Pero los sacerdotes de Sekhmet, diosa de la curación, ven en esto una amenaza directa a su poder y sus ingresos. Proponen que los médicos laicos sean subordinados al templo.",
  ctx:"El Papiro de Edwin Smith (hacia 1600 aC, copiado de textos más antiguos) es el tratado quirúrgico más antiguo que se conoce. Describe 48 casos, casi todos de heridas, con examen, diagnóstico y un veredicto: «una dolencia que trataré», «una dolencia con la que lucharé» o «una dolencia que no se puede tratar».",
  opts:[
    {t:"Crear una escuela médica laica bajo protección real, independiente de los templos",fx:{estabilidad:4,riqueza:-5,cultura:8,influencia:4},type:"cultural"},
    {t:"Sistema mixto: médicos laicos para heridas de guerra, sacerdotes para enfermedades internas",fx:{estabilidad:6,riqueza:-2,cultura:6,influencia:2},type:"social"},
    {t:"Subvencionar los templos para que incorporen los nuevos métodos dentro del culto",fx:{estabilidad:5,riqueza:-4,cultura:4,influencia:4},type:"politico"},
    {t:"Prohibir la medicina sin rituales: el cuerpo es sagrado y no puede tratarse sin la bendición divina",fx:{estabilidad:-5,riqueza:0,cultura:-8,influencia:0},type:"cruel"}
  ],
  tl:{date:"2600 aC aprox.",ph:"Papiro Edwin Smith (copia de ~1600 aC)",ev:"Un tratado de 48 casos de heridas y su tratamiento",tip:"Edwin Smith lo compró en Luxor en 1862 y Breasted lo tradujo en 1930. Describe cada caso con examen, diagnóstico y tratamiento. Breasted pensó que copiaba un original mucho más antiguo; atribuirlo a Imhotep es solo una conjetura."}},
]

export const EVENTS_MEDIO_EXTRA: GameEvent[] = [
  {id:201,per:"medio",cat:"economia",title:"El Gran Drenaje del Fayum",
  desc:"El ingeniero real llega con datos: la depresión del Fayum, al suroeste de Menfis, podría convertirse en el mayor granero del reino si se regulan los canales que llevan agua del Nilo a sus tierras bajas. El proyecto requiere años de trabajo, miles de obreros en turnos rotativos y mudar a las aldeas de pescadores que viven junto al lago. A cambio: mucha tierra fértil, que dependería menos del nivel de la crecida.",
  ctx:"Bajo la XII dinastía se regularon el Fayum y el lago Moeris (el actual Birket Qarun, mucho más grande entonces) con diques y canales; los egiptólogos no coinciden en qué rey hizo cada obra (Senuseret II o Amenemhat III). El lago contenía el exceso de la crecida y servía de reserva para regar.",
  opts:[
    {t:"Aprobar el proyecto completo con compensación justa para las aldeas desplazadas",fx:{estabilidad:5,riqueza:8,cultura:4,influencia:4},type:"social"},
    {t:"Proyecto por fases: primero el canal principal, las aldeas se reubicarán gradualmente",fx:{estabilidad:7,riqueza:6,cultura:3,influencia:2},type:"economico"},
    {t:"Solo los canales secundarios sin desplazamiento de aldeas: menos impacto, menos beneficio",fx:{estabilidad:8,riqueza:3,cultura:2,influencia:0},type:"social"},
    {t:"Prioridad absoluta al proyecto: las aldeas tienen treinta días para desalojar",fx:{estabilidad:-6,riqueza:7,cultura:-4,influencia:4},type:"cruel"}
  ],
  tl:{date:"1880 aC aprox.",ph:"Senuseret II y Amenemhat III (dinastía XII)",ev:"Obras de regulación del lago y de los canales del Fayum",tip:"El Fayum sigue siendo una zona agrícola importante. Allí se encontraron los retratos del Fayum (siglos I a IV dC), de los retratos pintados más realistas que se conservan de la Antigüedad."}},

  {id:202,per:"medio",cat:"politica",title:"La Misión a Biblos",
  desc:"Una misión regresa de Biblos con cedro y con un mensaje del príncipe de la ciudad. Su familia lleva títulos egipcios y escribe su nombre en jeroglíficos, pero ahora quiere hablar de igual a igual: pide oro, plata y que el faraón lo trate como socio y no como súbdito. El cedro es imprescindible: sin él no hay barcos ni expediciones a Punt. Pero negociar como iguales sienta un precedente peligroso.",
  ctx:"Biblos era el principal puerto del comercio egipcio en el Levante. En el Imperio Medio se restableció el comercio de cedro: inscripciones de Senuseret I mencionan expediciones a las «terrazas del cedro». Después, sus gobernantes usaron el título egipcio «hati-a» y se hicieron grabar en jeroglíficos, como en el obelisco de Abishemu.",
  opts:[
    {t:"Negociar en igualdad: tratado comercial con precio justo a cambio de suministro garantizado",fx:{estabilidad:4,riqueza:-5,cultura:5,influencia:7},type:"diplomatico"},
    {t:"Misión diplomática de alto rango con regalo de oro para restablecer el prestigio",fx:{estabilidad:2,riqueza:-6,cultura:3,influencia:8},type:"diplomatico"},
    {t:"Alternativas al cedro: desarrollo de técnicas de construcción con papiro comprimido y palma",fx:{estabilidad:4,riqueza:2,cultura:6,influencia:-2},type:"cultural"},
    {t:"Expedición militar al Levante para recordar a Biblos quién manda",fx:{estabilidad:-5,riqueza:-7,cultura:-4,influencia:4},type:"militar"}
  ],
  tl:{date:"1850 aC aprox.",ph:"Biblos y la dinastía XII",ev:"Biblos, socio del cedro y de los títulos egipcios",tip:"Los gobernantes de Biblos llevaban un título egipcio, «hati-a», y escribían sus nombres en jeroglíficos. Los ataúdes de cedro del Líbano eran señal de riqueza."}},

  {id:203,per:"medio",cat:"sociedad",title:"La Epidemia del Delta",
  desc:"Un barco mercante procedente de Canaán llegó al puerto de Avaris con marinos enfermos. En tres semanas, la fiebre se extendió a cinco aldeas del Delta. Los síntomas son desconocidos: erupciones cutáneas, fiebre alta, delirio. Los médicos no saben qué es. Los sacerdotes dicen que es la ira de Sekhmet. El barrio de los mercaderes cananeos está acordonado, pero la enfermedad ya está dentro. Cien muertos en un mes. El flujo comercial del Delta está paralizado. El miedo se extiende más rápido que la enfermedad.",
  ctx:"Es un escenario imaginado: no se conoce una epidemia así en el Imperio Medio. Sí se conoce el contacto constante del Delta con Canaán, sobre todo en Avaris, y los papiros médicos muestran cómo se trataba a los enfermos: con remedios y con rituales.",
  opts:[
    {t:"Aislar el Delta del resto del país con distribución de raciones desde el exterior",fx:{estabilidad:4,riqueza:-5,cultura:4,influencia:4},type:"social"},
    {t:"Equipos médicos enviados al Delta con los tratamientos disponibles",fx:{estabilidad:7,riqueza:-4,cultura:6,influencia:4,fe:-1},type:"cultural"},
    {t:"Cierre total del comercio marítimo mientras dure la epidemia",fx:{estabilidad:6,riqueza:-7,cultura:2,influencia:-2},type:"politico"},
    {t:"Quemar los barcos y las casas infectadas: el fuego es el único remedio",fx:{estabilidad:-6,riqueza:-4,cultura:-4,influencia:0},type:"cruel"}
  ],
  tl:{date:"1800 aC aprox.",ph:"Papiros médicos de Lahun (Kahun)",ev:"Uno de los textos médicos egipcios más antiguos",tip:"Los médicos egipcios anotaban síntomas y remedios, pero atribuían muchas enfermedades a demonios o a la ira de dioses como Sekhmet. Ante una enfermedad nueva contaban con recetas y rituales, no con una explicación de cómo se contagiaba."}},

  {id:204,per:"medio",cat:"cultura",title:"El Cuento de Sinuhé",
  desc:"El escriba Neferhotep te presenta un manuscrito extraordinario: la historia de Sinuhé, funcionario que huyó de Egipto al morir el faraón Amenemhat I, vivió décadas entre los beduinos del Levante, prosperó, se casó, tuvo hijos... y anheló toda su vida regresar al Nilo. Es una historia de identidad, de exilio voluntario, de lo que significa ser egipcio. El escriba propone que el texto se enseñe en las escuelas como modelo de escritura perfecta. Los conservadores protestan: ¿un funcionario que huyó merece ser ejemplo para los jóvenes?",
  ctx:"La Historia de Sinuhé (hacia 1900 aC) es considerada una obra maestra de la literatura egipcia. Es de los textos literarios más copiados: se seguía copiando en las escuelas de escribas siglos después, en el Imperio Nuevo. Explora el exilio y la identidad con una sofisticación sorprendentemente moderna.",
  opts:[
    {t:"Incorporar Sinuhé al currículo oficial de todas las escuelas de escribas del Imperio",fx:{estabilidad:5,riqueza:-2,cultura:8,influencia:2},type:"cultural"},
    {t:"Permitir su circulación privada pero sin financiamiento estatal",fx:{estabilidad:3,riqueza:0,cultura:5,influencia:0},type:"social"},
    {t:"Editar el texto para glorificar más al faraón y menos al aventurero individual",fx:{estabilidad:4,riqueza:-2,cultura:3,influencia:6},type:"politico"},
    {t:"Prohibirlo: un hombre que huye de Egipto no es modelo para ningún joven del Imperio",fx:{estabilidad:-5,riqueza:0,cultura:-8,influencia:0},type:"cruel"}
  ],
  tl:{date:"1875 aC",ph:"Senuseret I (Kheperkara)",ev:"Composición de la Historia de Sinuhé",tip:"Sinuhé regresa a Egipto anciano, recibe del faraón una tumba, un ajuar funerario y el perdón. El texto termina con un colofón de copista: la obra «llegó a su fin, de principio a fin, tal como se encontró escrita»."}},

  {id:205,per:"medio",cat:"militar",title:"Las Fortalezas de Nubia",
  desc:"El comandante de la frontera sur regresa con su informe: la frontera con Kush en la Segunda Catarata está asegurada, pero el costo es alto. Mantener las fortalezas con miles de soldados consume buena parte del presupuesto militar. Los nubios de Kush son formidables guerreros y comerciantes astutos. Proponen una alternativa: tratado de comercio en lugar de ocupación militar, permitir el libre flujo de marfil, ébano y esclavos a cambio de retirar las guarniciones. Significaría ceder el control de las minas de oro.",
  ctx:"La cadena de fortalezas de Senuseret III en Nubia (hacia 1850 aC) incluía Buhen, Mirgissa, Semna, Kumma y Uronarti, entre otras. Tenían fosos secos y bastiones angulados, y los informes de Semna muestran a las guarniciones vigilando los movimientos nubios. El lago Nasser las cubrió después de construirse la presa de Asuán, en los años 60.",
  opts:[
    {t:"Mantener las fortalezas y reforzarlas: el control del Nilo hasta la Segunda Catarata no se negocia",fx:{estabilidad:4,riqueza:-6,cultura:2,influencia:8},type:"militar"},
    {t:"Tratado comercial con Kush: retirar las guarniciones intermedias y mantener solo las más al norte",fx:{estabilidad:6,riqueza:3,cultura:4,influencia:4},type:"diplomatico"},
    {t:"Expandir las fortalezas hacia el sur para controlar las minas directamente",fx:{estabilidad:-2,riqueza:-8,cultura:0,influencia:7},type:"militar"},
    {t:"Retirarse completamente del sur de la Segunda Catarata y concentrar fuerzas en el norte",fx:{estabilidad:2,riqueza:4,cultura:-2,influencia:-6},type:"militar"}
  ],
  tl:{date:"1870 aC",ph:"Senuseret III (Khakaura)",ev:"Construcción de la cadena de fortalezas en la Segunda Catarata",tip:"Las fortalezas empezaron bajo Senuseret I y casi todas se terminaron con Senuseret III. Guardaban la frontera frente al reino de Kerma y eran una de las redes de fortificaciones más elaboradas de su tiempo."}},

  {id:206,per:"medio",cat:"religion",title:"El Oráculo de Crocodilopolis",
  desc:"En el Fayum, el culto al cocodrilo sagrado Sobek ha crecido de forma inquietante. Los sacerdotes de Crocodilopolis alimentan con carne y vino a un cocodrilo viviente y afirman que el reptil responde preguntas sobre el futuro. Miles de peregrinos llegan cada mes. Los donantes construyeron un segundo templo sin permiso del Estado. Los sacerdotes de Amón en Karnak están furiosos: Sobek no debería tener este poder. El pueblo, sin embargo, cree.",
  ctx:"El culto a Sobek floreció en el Imperio Medio: varios reyes llevaron su nombre (Sobekhotep, Sobekneferu). Crocodilopolis, cerca de la actual Medinet el-Fayum, fue uno de sus centros. Siglos después, Estrabón describe allí un cocodrilo alimentado con pan, carne y vino. Sobek-Ra es una de las fusiones con el dios sol.",
  opts:[
    {t:"Oficializar el culto de Sobek con financiamiento estatal y regulación de los sacerdotes",fx:{estabilidad:7,riqueza:-4,cultura:7,influencia:4},type:"politico"},
    {t:"Integrar a Sobek como manifestación de Ra: Sobek-Ra, unificando los dos cultos",fx:{estabilidad:8,riqueza:-2,cultura:8,influencia:6,fe:-1},type:"cultural"},
    {t:"Permitir el culto pero limitar el tamaño de los templos sin permiso real",fx:{estabilidad:4,riqueza:0,cultura:4,influencia:4},type:"politico"},
    {t:"Destruir el templo no autorizado: ningún santuario existe sin decreto faraónico",fx:{estabilidad:-7,riqueza:0,cultura:-7,influencia:-2},type:"cruel"}
  ],
  tl:{date:"1850 aC",ph:"Amenemhat III (Nimaatra)",ev:"Apogeo del culto a Sobek en el Fayum",tip:"Amenemhat III construyó su pirámide en Hawara, en el Fayum, la región de Sobek. Su complejo funerario fue tan elaborado que Heródoto, siglos después, habló de un «Laberinto» más impresionante que las pirámides; se lo suele identificar con ese complejo."}},

  {id:207,per:"medio",cat:"economia",title:"El Tesoro que Falta",
  desc:"El escriba jefe de la Casa del Tesoro llega con un papiro que le tiembla en las manos: falta oro. No poco. El equivalente a treinta años de exportaciones de mirra. El rastro contable apunta a cuatro vizires diferentes actuando en coordinación durante una década. El fraude es sistémico, no individual. Si lo haces público, sacudes la confianza en toda la burocracia. Si lo resuelves en silencio, el sistema queda intacto pero la corrupción también.",
  ctx:"El sistema burocrático egipcio del Imperio Medio fue uno de los más sofisticados del mundo antiguo: registros de impuestos, inventarios de silos, nóminas de trabajadores. Pero toda burocracia compleja tiene sus puntos ciegos. Los papiros de Kahun revelan niveles de detalle administrativo asombrosos —y sus inevitables irregularidades.",
  opts:[
    {t:"Juicio público de todos los implicados: la corrupción sistémica exige respuesta visible",fx:{estabilidad:5,riqueza:4,cultura:7,influencia:4},type:"cultural"},
    {t:"Reforma silenciosa: recuperar lo robado discretamente y rediseñar el sistema de control",fx:{estabilidad:8,riqueza:5,cultura:2,influencia:2},type:"economico"},
    {t:"Ejecutar a los cuatro vizires como advertencia y redistribuir sus bienes entre el pueblo",fx:{estabilidad:-2,riqueza:6,cultura:-4,influencia:8},type:"militar"},
    {t:"Ignorarlo: perseguir a los vizires crearía inestabilidad política en plena campaña nubia",fx:{estabilidad:-7,riqueza:-4,cultura:-6,influencia:-6},type:"politico"}
  ],
  tl:{date:"1850 aC aprox.",ph:"Papiros de Lahun (Kahun)",ev:"Archivos administrativos de una ciudad del Imperio Medio",tip:"Los papiros de Lahun (Kahun) incluyen contratos, cartas, cuentas de templo, textos médicos y de matemática: de los archivos más variados que se conservan del Imperio Medio."}},

  {id:208,per:"medio",cat:"sociedad",title:"Los Esclavos que No son Esclavos",
  desc:"El escriba de los registros levanta una cuestión incómoda ante el consejo: en los papiros del Imperio hay tres categorías de trabajadores forzados que en la práctica se comportan igual, pero tienen estatus legales completamente distintos. Los prisioneros de guerra son propiedad del Estado. Los deudores que no pueden pagar trabajan por su deuda. Los campesinos en corvée son ciudadanos libres que deben días de trabajo al faraón. La confusión entre categorías genera abusos: capataces que tratan a trabajadores libres como esclavos. El pueblo está resentido.",
  ctx:"Los egipcios tenían varios términos para quienes trabajaban para otros, y los egiptólogos discuten cuáles equivalen a «esclavo». En el Papiro Brooklyn aparecen servidores de origen asiático en casas privadas. El Código de Hammurabi babilónico (1754 aC) muestra una esclavitud mucho más explícita en otras culturas de la época.",
  opts:[
    {t:"Código laboral escrito: derechos y obligaciones de cada categoría de trabajador claramente definidos",fx:{estabilidad:8,riqueza:-6,cultura:8,influencia:4},type:"cultural"},
    {t:"Unificar todas las categorías en un sistema único de trabajo estatal con salario mínimo",fx:{estabilidad:6,riqueza:-5,cultura:6,influencia:2},type:"social"},
    {t:"Eliminar el trabajo por deuda: solo prisioneros de guerra y corvée voluntaria",fx:{estabilidad:4,riqueza:-4,cultura:5,influencia:0},type:"social"},
    {t:"Formalizar la esclavitud plena como en Mesopotamia: claridad legal aunque sea cruel",fx:{estabilidad:-7,riqueza:4,cultura:-8,influencia:-4},type:"cruel"}
  ],
  tl:{date:"1750 aC aprox.",ph:"Papiro Brooklyn 35.1446 (dinastías XII–XIII)",ev:"Lista de servidores de una casa, muchos con nombres asiáticos",tip:"Los egipcios tenían varios nombres para quienes trabajaban para otros, y no todos equivalen a «esclavo»: había prisioneros, deudores y trabajadores de turno. Cómo clasificar este papiro es un tema todavía debatido."}},
]

export const EVENTS_NUEVO_EXTRA: GameEvent[] = [
  {id:301,per:"nuevo",cat:"politica",title:"El Valle de los Reyes",
  desc:"El arquitecto real Ineni llega con una propuesta radical: abandonar las pirámides. Después de más de mil años, todo el mundo sabe que las pirámides son tumbas. Cada faraón enterrado en ellas ha sido saqueado. En su lugar, propone un valle remoto en la montaña tebana, accesible solo por una grieta en la roca: tumbas excavadas en secreto, sin monumentos visibles, con entradas selladas y engañosas. Nadie sabrá dónde está el faraón. Los sacerdotes objetan: una tumba sin pirámide no tiene la fuerza para elevar al faraón al cielo.",
  ctx:"Tutmosis I (hacia 1504 aC) habría sido el primer faraón enterrado en el Valle de los Reyes. La decisión fue un intento racional de prevenir el saqueo. No funcionó: casi todas las tumbas del Valle fueron saqueadas en la antigüedad. La de Tutankamón, descubierta casi intacta por Howard Carter en 1922, fue la excepción.",
  opts:[
    {t:"Adoptar el Valle de los Reyes: secreto, profundidad y trampa son la mejor protección",fx:{estabilidad:4,riqueza:4,cultura:8,influencia:4},type:"cultural"},
    {t:"Pirámide simbólica modesta más tumba secreta subterránea: lo mejor de ambos mundos",fx:{estabilidad:6,riqueza:-4,cultura:6,influencia:2},type:"social"},
    {t:"Continuar la tradición piramidal: la forma es teológicamente imprescindible",fx:{estabilidad:5,riqueza:-6,cultura:5,influencia:6},type:"cultural"},
    {t:"Enterramiento secreto sin tumba elaborada: el faraón no necesita monumentos, vive en sus obras",fx:{estabilidad:-2,riqueza:5,cultura:-4,influencia:0},type:"politico"}
  ],
  tl:{date:"1504 aC",ph:"Tutmosis I (Akheperkara)",ev:"Probable primera tumba real en el Valle de los Reyes",tip:"Howard Carter tardó seis años en encontrar la tumba de Tutankamón. Cuando asomó una vela por el agujero, Lord Carnarvon le preguntó si veía algo. Su respuesta se hizo famosa: «Sí, cosas maravillosas»."}},

  {id:302,per:"nuevo",cat:"sociedad",title:"Los Obreros de la Necrópolis",
  desc:"En la aldea de Deir el-Medina viven familias de artesanos de élite, aparte, junto al valle: conocen la ubicación exacta de todas las tumbas reales y sus pasadizos. Son los mejores grabadores, pintores y albañiles del reino y cobran en raciones del Estado. Ese secreto tiene un precio: muchos hijos heredan el oficio de sus padres y se espera lealtad absoluta. Ahora piden permiso para que sus hijas puedan casarse fuera de la aldea sin trámites.",
  ctx:"Deir el-Medina (1550-1080 aC) es el sitio arqueológico mejor documentado del Mundo Antiguo: se conservan miles de ostraca (fragmentos de cerámica) con cartas, listas de trabajo, pleitos vecinales y poemas de amor. Sabemos los nombres de los trabajadores, sus salarios, sus deudas, sus amores y sus peleas.",
  opts:[
    {t:"Conceder el permiso matrimonial: la lealtad se gana con confianza, no con encierro",fx:{estabilidad:7,riqueza:-1,cultura:6,influencia:2},type:"social"},
    {t:"Conceder el permiso solo para artesanos retirados que ya no trabajen en las tumbas activas",fx:{estabilidad:5,riqueza:0,cultura:4,influencia:2},type:"politico"},
    {t:"Compensación económica: mejor salario y tierras propias a cambio de mantener las restricciones",fx:{estabilidad:4,riqueza:-5,cultura:3,influencia:4},type:"economico"},
    {t:"Mantener las restricciones totales: el secreto de las tumbas es más importante que la libertad individual",fx:{estabilidad:-6,riqueza:0,cultura:-6,influencia:0},type:"politico"}
  ],
  tl:{date:"1350 aC",ph:"Imperio Nuevo",ev:"Florecimiento de Deir el-Medina — aldea de artesanos",tip:"En Deir el-Medina se encontraron miles de ostraca con cartas, listas de trabajo y pleitos de vecinos, y la primera huelga documentada (siglo XII aC). Los obreros se turnaban en dos cuadrillas, la izquierda y la derecha, cada una con su capataz."}},

  {id:303,per:"nuevo",cat:"religion",title:"Tutankamón Restaura los Dioses",
  desc:"El joven rey tiene unos doce años y lleva tres en el trono. Sus consejeros —el general Horemheb y el visir Ay— le presentan el informe: Egipto está en caos espiritual después de Akenatón. Los templos de Amón siguen cerrados. Miles de sacerdotes sin trabajo, estatuas de los dioses antiguas rotas, el pueblo sin rituales para los difuntos. La solución es clara: restaurar todos los cultos tradicionales, reabrir los templos, devolver las tierras. Pero hacerlo implica admitir que su padre fue un error. Y el niño faraón debe firmarlo.",
  ctx:"La Estela de la Restauración de Tutankamón (hacia 1332 aC) es uno de los documentos más importantes del Imperio Nuevo. Describe el caos religioso post-Akenatón: templos en ruinas, oráculos que no respondían, dioses 'que daban la espalda a Egipto'. El rey cambió su nombre de Tutankatón («imagen viva de Atón») a Tutankamón («imagen viva de Amón»).",
  opts:[
    {t:"Restauración total e inmediata: todos los templos reabiertos, sacerdotes reinstalados, tierras devueltas",fx:{estabilidad:8,riqueza:-6,cultura:8,influencia:4},type:"cultural"},
    {t:"Restauración gradual por prioridades: primero Amón de Tebas, luego los demás cultos",fx:{estabilidad:6,riqueza:-4,cultura:7,influencia:4},type:"politico"},
    {t:"Restaurar los cultos pero mantener Atón como dios oficial secundario del Estado",fx:{estabilidad:2,riqueza:-2,cultura:4,influencia:2},type:"politico"},
    {t:"Esperar diez años para restaurar: la transición lenta evita conflictos con los atonistas que quedan",fx:{estabilidad:-4,riqueza:0,cultura:-4,influencia:-4},type:"politico"}
  ],
  tl:{date:"1332 aC",ph:"Tutankamón (Nebkheperura)",ev:"Restauración de los cultos tradicionales post-Akenatón",tip:"Tutankamón murió hacia los 19 años; un estudio de 2010 apunta a malaria y a una enfermedad de los huesos, pero la causa exacta se discute. Su tumba, la KV62, contenía más de 5.000 objetos, y su máscara funeraria de oro macizo pesa 10,23 kg."}},

  {id:304,per:"nuevo",cat:"militar",title:"La Batalla de Qadesh",
  desc:"El mes de mayo del año 5 de Ramsés II. El ejército egipcio marcha en cuatro divisiones hacia Qadesh, en el norte de Siria, para enfrentar al ejército hitita de Muwatalli II. Dos informantes shasu afirman que el ejército enemigo está lejos. Mienten: el ejército hitita espera oculto. La división de Amón avanza sola, separada de las otras tres. Cuando los carros hititas atacan, Ramsés II está casi solo. Lo que ocurre en las siguientes horas decidirá el destino de dos imperios.",
  ctx:"Qadesh (1274 aC) fue una de las mayores batallas de carros de la antigüedad, con miles de carros de ambos lados. Ramsés II sobrevivió según los textos egipcios gracias a su valor personal. Los historiadores modernos creen que el resultado fue un empate costoso para ambos, aunque estratégicamente favoreció a los hititas. El tratado de paz de 1259 aC fue la consecuencia.",
  opts:[
    {t:"Resistencia desesperada: Ramsés combate personalmente para dar tiempo a que lleguen refuerzos",fx:{estabilidad:-5,riqueza:-4,cultura:4,influencia:8},type:"militar"},
    {t:"Retirada ordenada: preservar el ejército y negociar desde una posición menos comprometida",fx:{estabilidad:4,riqueza:-2,cultura:-4,influencia:4},type:"militar"},
    {t:"Contraataque rápido usando los carros ligeros de la guardia personal real",fx:{estabilidad:-4,riqueza:-6,cultura:2,influencia:7},type:"militar"},
    {t:"Enviar emisarios a Muwatalli: ofrecer Qadesh a cambio de armisticio inmediato",fx:{estabilidad:2,riqueza:0,cultura:-6,influencia:-4},type:"diplomatico"}
  ],
  tl:{date:"1274 aC",ph:"Ramsés II (Usermaatra Setepenra)",ev:"Batalla de Qadesh — una de las mayores batallas de carros de la antigüedad",tip:"Ramsés II mandó grabar su 'victoria' en Qadesh en cinco templos. El Poema de Pentaur lo describe como un semidios que combatió solo contra miles. Las fuentes hititas dan otra versión: Qadesh siguió bajo su control. La diferencia entre historia y propaganda tiene 3.300 años."}},

  {id:305,per:"nuevo",cat:"cultura",title:"Abu Simbel: El Templo de la Montaña",
  desc:"El arquitecto mayor presenta los planos: el faraón quiere que se excave un templo entero en la roca viva de la montaña de Abu Simbel, en la frontera con Nubia. Cuatro colosos de 20 metros de altura vigilando el río. Una sala hipóstila de columnas osiríacas. Un santuario interior orientado para que dos veces al año —el 22 de febrero y el 22 de octubre— los rayos del sol del amanecer iluminen exactamente la estatua del faraón sentado entre los dioses. El proyecto requiere veinte años. La orientación astronómica es el mayor desafío técnico jamás planteado a los ingenieros egipcios.",
  ctx:"Abu Simbel (circa 1264 aC) es un prodigio de ingeniería astronómica. La orientación solar funciona con gran exactitud: dos veces al año el sol llega al fondo del santuario a 65 metros de profundidad. En 1968, cuando el lago Nasser amenazó sumergirlo, la UNESCO coordinó su traslado completo 65 metros hacia arriba, manteniendo la orientación exacta.",
  opts:[
    {t:"Aprobar el proyecto completo incluyendo la precisión astronómica: la perfección o nada",fx:{estabilidad:3,riqueza:-8,cultura:8,influencia:8},type:"cultural"},
    {t:"Templo monumental sin la complejidad astronómica: más rápido y menos costoso",fx:{estabilidad:4,riqueza:-5,cultura:6,influencia:6},type:"cultural"},
    {t:"Dos templos más pequeños en lugar de uno colosal: mejor distribución del impacto político",fx:{estabilidad:5,riqueza:-6,cultura:7,influencia:7},type:"politico"},
    {t:"Redirigir los fondos a fortalezas militares en Nubia: la arquitectura no frena ejércitos",fx:{estabilidad:4,riqueza:-2,cultura:-5,influencia:4},type:"militar"}
  ],
  tl:{date:"1264 aC",ph:"Ramsés II (Usermaatra Setepenra)",ev:"Construcción del Gran Templo de Abu Simbel",tip:"El sol ilumina el santuario el 22 de febrero y el 22 de octubre. Se ha propuesto que eran el cumpleaños y la coronación de Ramsés, pero ningún texto lo confirma. Solo la estatua de Ptah, dios de la oscuridad, permanece siempre en sombra."}},

  {id:306,per:"nuevo",cat:"economia",title:"Los Mercenarios del Faraón",
  desc:"El general llega con un informe que mezcla buenas y malas noticias: los soldados libios y nubios mercenarios son los mejores guerreros del ejército. Disciplinados, valientes, leales al sueldo y, hasta ahora, al faraón. Pero ya son una parte enorme del ejército profesional. Si el oro falta o si alguien les ofrece más... En Siria, el rey hitita ya intenta comprar a sus líderes. El precio de la lealtad mercenaria es la dependencia perpetua. Pero sin ellos, el ejército regular ya no puede sostener las fronteras solo.",
  ctx:"Los medjay (nubios) sirvieron como exploradores y soldados desde el Antiguo Imperio, y en el Imperio Nuevo había también libios y shardana, de origen marino, en el ejército. Se ha señalado la dependencia de tropas extranjeras como una debilidad del final del Imperio Nuevo, pero no hay consenso sobre cuánto pesó.",
  opts:[
    {t:"Integración total: los mercenarios reciben tierras y ciudadanía a cambio de lealtad permanente",fx:{estabilidad:6,riqueza:-5,cultura:4,influencia:6},type:"social"},
    {t:"Reducir progresivamente los mercenarios entrenando reclutas nativos",fx:{estabilidad:4,riqueza:-3,cultura:2,influencia:4},type:"militar"},
    {t:"Mantener la situación actual: la mezcla funciona y no hay que arreglarlo si no está roto",fx:{estabilidad:5,riqueza:-4,cultura:0,influencia:5},type:"politico"},
    {t:"Expulsar a todos los mercenarios: el ejército egipcio debe ser solo de sangre egipcia",fx:{estabilidad:-8,riqueza:2,cultura:-2,influencia:-6},type:"cruel"}
  ],
  tl:{date:"1300 aC aprox.",ph:"Seti I / Ramsés II",ev:"Apogeo del ejército profesional mixto del Imperio Nuevo",tip:"El Papiro Anastasi I, de la época de Ramsés II, menciona 1.600 soldados libios (qehek y meshwesh) pagados por el Estado. Los medjay, nubios del desierto, habían servido como exploradores desde el Antiguo Imperio."}},

  {id:307,per:"nuevo",cat:"politica",title:"La Conspiración del Harén",
  desc:"El visir real te entrega un papiro con sellos rotos de evidencia: un grupo de esposas del harén, lideradas por Tiye, madre de un hijo menor del faraón, conspiró para asesinar a Ramsés III. Decenas de implicados identificados, y se sospecha de varios jueces del tribunal que debía juzgar el caso. El escándalo amenaza con destruir la credibilidad del sistema judicial entero. Si el faraón juzga a quienes debían juzgarlo, ¿quién juzga al faraón?",
  ctx:"La Conspiración del Harén (circa 1155 aC) está documentada en el Papiro Judicial de Turín. Ramsés III fue probablemente asesinado: análisis forenses de su momia en 2012 revelaron una herida de cuchillo en la garganta que le cortó la tráquea. El juicio es uno de los procesos judiciales mejor documentados del Antiguo Egipto.",
  opts:[
    {t:"Tribunal especial de jueces nombrados directamente por el faraón, proceso público",fx:{estabilidad:6,riqueza:-1,cultura:7,influencia:6},type:"cultural"},
    {t:"Juicio secreto: la conspiración no debe conocerse para preservar la imagen de la familia real",fx:{estabilidad:5,riqueza:0,cultura:-2,influencia:4},type:"politico"},
    {t:"Ejecutar a los conspiradores inmediatamente sin juicio: la conspiración ya es prueba suficiente",fx:{estabilidad:-4,riqueza:0,cultura:-6,influencia:5},type:"militar"},
    {t:"Ignorar el caso y exiliar silenciosamente a Tiye: el escándalo de un juicio es peor que el crimen",fx:{estabilidad:-7,riqueza:0,cultura:-7,influencia:-5},type:"cruel"}
  ],
  tl:{date:"1155 aC",ph:"Ramsés III (Usermaatre Meryamun)",ev:"Conspiración del Harén y juicio de los conspiradores",tip:"Decenas de personas fueron condenadas, y algunos de los propios jueces fueron castigados por haber estado de fiesta con las mujeres acusadas, según el papiro judicial."}},

  {id:308,per:"nuevo",cat:"cultura",title:"El Himno a Atón",
  desc:"El sumo poeta del templo de Atón en Amarna te presenta el himno más extraordinario jamás compuesto en Egipto. Se atribuye al propio Akenatón: celebra la creación del mundo por el disco solar, la diversidad de los pueblos, la alegría de los animales al amanecer, la dependencia de toda vida de la luz. Es bellísimo. Describe a un dios creador de todos los pueblos, no solo de Egipto. Los paralelos con el Salmo 104 hebreo son llamativos. ¿Qué haces con un texto revolucionario que cuestiona todo el orden anterior?",
  ctx:"El Gran Himno a Atón (circa 1346 aC) es uno de los poemas religiosos más bellos de la antigüedad. Sus paralelos con el Salmo 104 de la Biblia hebrea llevaron a décadas de debate: ¿influyó el monoteísmo de Akenatón en el monoteísmo hebreo? No hay consenso: algunos ven una influencia, otros una tradición poética común del Cercano Oriente.",
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
  desc:"Kashta y luego Piye llegaron del sur. Los reyes de Kush, que habían absorbido durante siglos la cultura egipcia mientras Egipto se fragmentaba, ahora vienen a 'restaurar' Maat. Son más egipcios que muchos egipcios: conocen los textos sagrados, construyen pirámides pequeñas y empinadas. La ironía es perfecta: Egipto puede ser salvado por quienes alguna vez fueron sus vasallos. El pueblo tebano los recibe con flores. Los nobles del delta, con recelo.",
  ctx:"La Dinastía XXV kushita (747-656 aC) restauró templos y viejos modelos artísticos y religiosos de Egipto, y mantuvo a los asirios a raya durante años. En Sudán hay más pirámides que en todo Egipto: las de los reyes kushitas en El-Kurru y Nuri, y más tarde las de Meroe.",
  opts:[
    {t:"Reconocer plenamente a los faraones nubios: la legitimidad viene de la cultura, no del origen",fx:{estabilidad:8,riqueza:3,cultura:8,influencia:3},type:"cultural"},
    {t:"Alianza pragmática: los kushitas gobiernan el sur, el Delta mantiene autonomía",fx:{estabilidad:6,riqueza:4,cultura:6,influencia:3},type:"politico"},
    {t:"Resistencia pasiva: cooperar en lo mínimo indispensable mientras se buscan aliados asirios",fx:{estabilidad:-4,riqueza:0,cultura:-2,influencia:4},type:"politico"},
    {t:"Rebelión abierta del Delta contra los faraones kushitas",fx:{estabilidad:-8,riqueza:-6,cultura:-4,influencia:-6},type:"militar"}
  ],
  tl:{date:"747 aC",ph:"Piye (Pianjy) — Dinastía XXV kushita",ev:"Conquista kushita: faraones nubios gobiernan Egipto",tip:"Los reyes kushitas se hicieron enterrar bajo pirámides pequeñas y de lados empinados, a la manera egipcia, pero en Sudán."}},

  {id:402,per:"tardio",cat:"economia",title:"El Canal de Neco II",
  desc:"El faraón Neco II propone el proyecto de infraestructura más ambicioso desde las pirámides: un canal que conecte el brazo más oriental del Nilo con el Mar Rojo, pasando por el istmo del Sinaí. Los productos de Arabia y del Mar Rojo llegarían directamente a los puertos mediterráneos sin pasar por caravanas terrestres. El comercio del mundo cambiaría. Un oráculo advierte: 'El canal beneficia al bárbaro.' Heródoto escribirá después que 120.000 trabajadores murieron en la construcción.",
  ctx:"El canal de Neco II (hacia 600 aC) fue terminado por los persas bajo Darío I y funcionó, con interrupciones, hasta el siglo VIII dC. El Canal de Suez (1869) unió los mismos dos mares, aunque por otra ruta.",
  opts:[
    {t:"Completar el canal sin importar el costo humano: el beneficio estratégico lo justifica",fx:{estabilidad:-4,riqueza:8,cultura:-2,influencia:8},type:"economico"},
    {t:"Canal más corto solo entre el Nilo y los Lagos Amargos, reduciendo el costo y el tiempo",fx:{estabilidad:3,riqueza:5,cultura:2,influencia:4},type:"economico"},
    {t:"Abandonar el canal y construir en su lugar una flota en el Mar Rojo para comercio directo",fx:{estabilidad:4,riqueza:4,cultura:2,influencia:4},type:"economico"},
    {t:"Suspender el proyecto al conocer la profecía: el oráculo no se desafía",fx:{estabilidad:6,riqueza:-2,cultura:2,influencia:-2},type:"religioso"}
  ],
  tl:{date:"600 aC",ph:"Neco II (Wehemibre)",ev:"Inicio del canal Nilo-Mar Rojo — precursor del Canal de Suez",tip:"Heródoto afirma que en el canal cabían dos trirremes en paralelo. Darío I lo terminó y dejó estelas con inscripciones en jeroglíficos y en lenguas cuneiformes."}},

  {id:403,per:"tardio",cat:"cultura",title:"La Biblioteca de Alejandría",
  desc:"Ptolomeo I Sóter convoca a los mayores intelectuales del Mediterráneo: quiere construir el mayor repositorio de conocimiento humano jamás creado. Una biblioteca universal en Alejandría, con textos de muchas lenguas: egipcios, babilónicos, persas, hebreos, griegos. El filósofo Demetrio de Falero diseña el plan: agentes del Estado compran o copian libros en todos los puertos, todo barco que atraca en Alejandría debe prestar sus manuscritos para ser copiados.",
  ctx:"La Biblioteca de Alejandría (fundada hacia 285 aC) llegó a reunir cientos de miles de rollos, según cifras antiguas poco fiables. Allí trabajaron Euclides y Eratóstenes. Fue uno de los mayores centros intelectuales de la antigüedad; su declive fue gradual y no se sabe con certeza cuándo terminó.",
  opts:[
    {t:"Financiamiento total del Estado: la Biblioteca como proyecto nacional de Egipto",fx:{estabilidad:4,riqueza:-9,cultura:8,influencia:8},type:"cultural"},
    {t:"Biblioteca más Mouseion: centro de investigación donde los científicos reciben salario del Estado",fx:{estabilidad:2,riqueza:-8,cultura:8,influencia:8},type:"cultural"},
    {t:"Biblioteca selectiva: solo los mejores textos de cada tradición, sin la obsesión por la cantidad",fx:{estabilidad:4,riqueza:-4,cultura:7,influencia:6},type:"cultural"},
    {t:"Rechazar el proyecto: el conocimiento concentrado en un lugar puede ser destruido en un día",fx:{estabilidad:2,riqueza:4,cultura:-8,influencia:-4},type:"politico"}
  ],
  tl:{date:"285 aC",ph:"Ptolomeo I Sóter",ev:"Fundación de la Biblioteca de Alejandría",tip:"Entre sus bibliotecarios estuvo Eratóstenes, que calculó la circunferencia de la Tierra comparando la sombra del sol en Siena y en Alejandría. Su cifra quedó cerca del valor real; cuánto exactamente depende de la medida del estadio que usara."}},

  {id:404,per:"tardio",cat:"sociedad",title:"El Dinero Llega al Nilo",
  desc:"Los mercaderes griegos de Naucratis traen una novedad que está revolucionando el Mediterráneo: la moneda. Pequeños discos de electro, plata y bronce con un valor garantizado por el Estado emisor. Los fenicios la adoptaron. Los persas la adoptaron. En Egipto, buena parte de la economía funciona desde hace siglos por redistribución estatal: el faraón recibe grano, aceite y lino en impuestos y los redistribuye como salarios; el resto se resuelve con trueque, midiendo el valor en peso de metal. La moneda cambiaría todo. ¿O lo destruiría todo?",
  ctx:"En Egipto la moneda llegó tarde: durante siglos se usó el peso de plata y el trueque, y las primeras monedas que circularon fueron griegas y persas (siglo V aC). El sistema redistributivo sin moneda había funcionado durante mucho tiempo.",
  opts:[
    {t:"Adoptar la moneda: crear una casa de la moneda real y acuñar el primer dracma egipcio",fx:{estabilidad:3,riqueza:8,cultura:6,influencia:6},type:"economico"},
    {t:"Sistema mixto: moneda para el comercio exterior, redistribución estatal para el interior",fx:{estabilidad:4,riqueza:6,cultura:4,influencia:4},type:"economico"},
    {t:"Rechazar la moneda y reforzar el sistema redistributivo: Egipto no necesita lo que inventaron los griegos",fx:{estabilidad:5,riqueza:-2,cultura:4,influencia:-4},type:"politico"},
    {t:"Adoptar la moneda griega directamente sin acuñar una propia: más rápido, menos costo",fx:{estabilidad:2,riqueza:6,cultura:-4,influencia:-4},type:"economico"}
  ],
  tl:{date:"400 aC aprox.",ph:"Egipto bajo dominio persa",ev:"Circulan monedas de plata griegas e imitaciones",tip:"Antes, el Estado pagaba en raciones de grano y el valor se medía en peso de metal. Las monedas que primero circularon en Egipto fueron de plata ateniense y sus imitaciones; la acuñación local se afianzó en el siglo IV aC."}},

  {id:405,per:"tardio",cat:"religion",title:"Los Animales de los Dioses",
  desc:"En el Período Tardío, algo extraordinario ocurre en los templos: millones de animales embalsamados. Gatos para Bastet, ibis para Thoth, cocodrilos para Sobek, halcones para Horus, perros para Anubis. Los peregrinos los compran en los puestos del templo, los ofrendan al dios y los sacerdotes los entierran en catacumbas especiales. Arqueólogos del futuro estimarán en más de un millón y medio los ibis momificados solo en Saqqara. Pero una investigación revela que muchos animales son sacrificados en el templo mismo para satisfacer la demanda. ¿Es esto piedad o negocio?",
  ctx:"Las catacumbas de ibis de Saqqara contienen más de un millón y medio de ibis momificados. Un análisis de ADN de 2019 sugiere que muchos eran silvestres, capturados y mantenidos poco tiempo en corrales del templo. El negocio de las momias animales fue muy rentable en el Período Tardío: la piedad popular y la economía del templo eran indistinguibles.",
  opts:[
    {t:"Regular el culto: solo animales que murieron naturalmente pueden ser momificados y ofrendados",fx:{estabilidad:4,riqueza:-4,cultura:6,influencia:2},type:"cultural"},
    {t:"Expandir las granjas del templo oficialmente: demanda popular + ingresos para los templos",fx:{estabilidad:6,riqueza:6,cultura:4,influencia:4},type:"economico"},
    {t:"Limitar el comercio a las grandes ciudades con santuarios certificados",fx:{estabilidad:5,riqueza:2,cultura:5,influencia:4},type:"politico"},
    {t:"Prohibir la venta de animales sagrados: la fe no puede ser un negocio",fx:{estabilidad:-6,riqueza:-6,cultura:-4,influencia:-4},type:"cruel"}
  ],
  tl:{date:"600 aC",ph:"Período Tardío y Ptolemaico",ev:"Apogeo del culto a los animales sagrados momificados",tip:"Un estudio de ADN de 2019 encontró que los ibis momificados tenían tanta diversidad genética como los silvestres: probablemente eran capturados en libertad y no criados en granjas. En Tuna el-Gebel hay unos cuatro millones."}},

  {id:406,per:"tardio",cat:"politica",title:"César en el Nilo",
  desc:"Julio César llegó a Alejandría persiguiendo a Pompeyo, pero encontró algo inesperado: una guerra civil entre Cleopatra VII y su hermano Ptolomeo XIII por el trono de Egipto. Cleopatra se hizo introducir ante César enrollada en una alfombra —o en un saco de ropa, los relatos varían. Lo que no varía es el resultado: César apoyó a Cleopatra. El joven Ptolomeo XIII murió en el Nilo. Alejandría ardió. Y en el incendio, miles de rollos de la Biblioteca se perdieron. La historia más brillante de Egipto se decide en una alcoba.",
  ctx:"La alianza Cleopatra-César (48-44 aC) fue el último intento de Egipto de mantener su independencia usando la política romana. Cleopatra entendió que el único modo de sobrevivir era ser indispensable para Roma. Funcionó durante 18 años. La batalla de Actio en 31 aC fue su fin.",
  opts:[
    {t:"Alianza plena con César: Egipto como socio privilegiado de Roma, no como provincia",fx:{estabilidad:6,riqueza:6,cultura:3,influencia:8},type:"diplomatico"},
    {t:"Neutralidad estratégica: no tomar partido en la guerra civil romana",fx:{estabilidad:7,riqueza:1,cultura:4,influencia:2},type:"politico"},
    {t:"Apoyar a Pompeyo: el perdedor de Farsalia como carta de revancha futura",fx:{estabilidad:-6,riqueza:-4,cultura:0,influencia:-6},type:"militar"},
    {t:"Aprovechar el caos romano para declarar independencia total de influencias externas",fx:{estabilidad:-4,riqueza:2,cultura:4,influencia:-8},type:"politico"}
  ],
  tl:{date:"48 aC",ph:"Cleopatra VII Filopátor",ev:"Llegada de César a Alejandría y guerra alejandrina",tip:"El incendio durante la guerra entre César y Ptolomeo XIII destruyó, según fuentes antiguas, al menos 40.000 rollos de la Biblioteca. Con el tiempo sufrió otros daños; que la destruyera el califa Omar (640 dC) es muy probablemente una leyenda."}},

  {id:407,per:"tardio",cat:"cultura",title:"El Decreto de Rosetta",
  desc:"El joven Ptolomeo V necesita apoyo desesperadamente. El ejército mercenario está sin pago. Las revueltas nativas sacuden el Delta. Los sacerdotes de Menfis tienen el poder real del país. En el sínodo de Menfis de 196 aC, el nuevo faraón negocia: los sacerdotes recibirán exenciones fiscales, nuevos privilegios, y el reconocimiento de sus derechos ancestrales. A cambio, emitirán un decreto proclamando la divinidad del faraón en dos lenguas y tres escrituras: jeroglífico, demótico y griego. Una piedra de granodiorita negra registrará el acuerdo. La llaman la Piedra de Rosetta.",
  ctx:"La Piedra de Rosetta (196 aC) es uno de los documentos más famosos de la arqueología. Fue encontrada por un soldado de Napoleón en 1799 en Rashid. Champollion la usó en 1822 para descifrar los jeroglíficos: comparó el texto griego conocido con el demótico y el jeroglífico hasta identificar los cartuchos de Ptolomeo. Fue un desciframiento decisivo.",
  opts:[
    {t:"Emitir el decreto en los tres idiomas: el alcance simbólico vale la complejidad",fx:{estabilidad:7,riqueza:-4,cultura:8,influencia:6},type:"cultural"},
    {t:"Solo en griego y demótico: los jeroglíficos son ya un idioma muerto en uso administrativo",fx:{estabilidad:5,riqueza:-2,cultura:5,influencia:4},type:"politico"},
    {t:"Decreto verbal sin piedra: las concesiones se hacen, pero sin documento que las fije",fx:{estabilidad:3,riqueza:0,cultura:2,influencia:2},type:"politico"},
    {t:"Rechazar la negociación: el faraón no mendiga legitimidad de sus propios sacerdotes",fx:{estabilidad:-8,riqueza:2,cultura:-5,influencia:-6},type:"politico"}
  ],
  tl:{date:"196 aC",ph:"Ptolomeo V Epífanes",ev:"Emisión del Decreto de Menfis — la Piedra de Rosetta",tip:"Champollion tenía 31 años cuando descifró los jeroglíficos, en 1822. Según se cuenta, al comprobarlo gritó «¡Lo tengo!» y se desmayó de la emoción. Murió diez años después, a los 41."}},

  {id:408,per:"tardio",cat:"sociedad",title:"Los Hijos de Grecia y el Nilo",
  desc:"Tres generaciones después de Alejandro Magno, Alejandría es la ciudad más grande del mundo mediterráneo. Griegos, macedonios, judíos, egipcios nativos, sirios, persas, nubios: cientos de miles de personas conviven en una ciudad diseñada en cuadrícula perfecta. Los egipcios de piel oscura, que hablan egipcio y honran a Isis y Osiris, conviven con griegos que philosophan en el Mouseion y judíos que leen la Torá en griego (la Septuaginta). La mezcla es brillante y conflictiva a la vez. Un disturbio en el barrio judío amenaza con extenderse.",
  ctx:"Alejandría ptolemaica fue una de las primeras grandes metrópolis multiculturales. La Septuaginta (traducción griega de la Torá, circa 250 aC) se hizo en Alejandría. El Museo (Mouseion) fue uno de los primeros grandes centros de investigación. Eratóstenes, Euclides y, siglos después, Hipatia trabajaron allí.",
  opts:[
    {t:"Convocatoria de líderes comunitarios: solucionar el conflicto con diálogo entre las comunidades",fx:{estabilidad:7,riqueza:0,cultura:8,influencia:4},type:"social"},
    {t:"Guarnición militar en el barrio en conflicto hasta que baje la tensión",fx:{estabilidad:5,riqueza:-2,cultura:-2,influencia:6},type:"militar"},
    {t:"Tribunales mixtos con representantes de cada comunidad para resolver disputas formalmente",fx:{estabilidad:8,riqueza:-3,cultura:7,influencia:4},type:"cultural"},
    {t:"Expulsar del barrio a los provocadores identificados, sea cual sea su origen",fx:{estabilidad:-4,riqueza:0,cultura:-6,influencia:-4},type:"cruel"}
  ],
  tl:{date:"250 aC aprox.",ph:"Ptolomeo II Filadelfo",ev:"Alejandría, una de las primeras metrópolis multiculturales",tip:"La Septuaginta fue traducida en Alejandría, según la leyenda, por 72 sabios judíos (6 de cada una de las 12 tribus) que trabajaron por separado y produjeron traducciones idénticas. La historia es apócrifa, pero la Septuaginta real es una de las mayores empresas de traducción de la antigüedad."}}
]
