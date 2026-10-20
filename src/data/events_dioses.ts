import type { GameEvent } from '../types'

/**
 * Un evento exclusivo por dios: sólo sale en la partida de ese dios, en el período
 * que le corresponde, ocupando el lugar de uno de los eventos comunes.
 *
 * Cada uno se apoya en una fuente conocida y dice como dudoso lo que es dudoso
 * (las cifras de Heródoto, para qué se hicieron las estatuas de Sekhmet).
 * Las estadísticas fe y comercio, que ningún evento común movía, entran acá.
 */
export const EVENTS_DIOSES: GameEvent[] = [
  {
    id: 501, per: 'antiguo', cat: 'religion', godOnly: 'ra',
    title: 'El Templo del Sol',
    desc: 'Los sacerdotes de Heliópolis llegan al palacio con planos en papiro. Proponen algo nuevo: un templo al aire libre, con un obelisco bajo el cielo abierto, donde Ra reciba cada amanecer las ofrendas del reino. Piden también que el faraón sea llamado «Hijo de Ra» en todos los documentos oficiales. El tesoro duda, y los sacerdotes de las provincias miran en silencio qué elegirá el faraón-sol.',
    ctx: 'Desde la IV dinastía (con Djedefre) los reyes añaden «hijo de Ra» a su titulatura, y en la V dinastía levantaron templos al sol junto a sus pirámides; el primero, de Userkaf, está en Abusir. El culto de Ra en Heliópolis pasó a ser el centro de la religión del Estado.',
    opts: [
      { t: 'Levantar el gran templo solar con su obelisco y destinarle las rentas de tierras reales', fx: { estabilidad: 3, riqueza: -6, cultura: 5, influencia: 2, fe: 6 }, type: 'religioso' },
      { t: 'Adoptar el título «Hijo de Ra» y mantener las ofrendas actuales, sin construir nada', fx: { estabilidad: 4, riqueza: -1, cultura: 1, influencia: 4, fe: 3 }, type: 'politico' },
      { t: 'Honrar a Ra junto a los dioses locales de cada nomo, con altares en las provincias', fx: { estabilidad: 6, riqueza: -3, cultura: 3, influencia: -2, fe: 2, comercio: 1 }, type: 'social' },
      { t: 'Reservar el culto solar a la familia real y a la corte', fx: { estabilidad: -3, riqueza: 2, cultura: -1, influencia: 3, fe: -4 }, type: 'politico' },
    ],
    tl: { date: '2494 aC aprox.', ph: 'Userkaf (V dinastía)', ev: 'Primer templo solar de Abusir', tip: 'Los reyes de la V dinastía construyeron templos al sol junto a sus pirámides, más pequeñas que las de la dinastía anterior. Ra se volvió el dios del Estado.' },
  },
  {
    id: 502, per: 'medio', cat: 'religion', godOnly: 'osiris',
    title: 'Los Misterios de Abidos',
    desc: 'Miles de fieles quieren peregrinar a Abidos, donde según la tradición descansa Osiris. Piden permiso para erigir estelas junto al camino de las procesiones y presenciar el drama anual de la muerte y el renacimiento del dios. Los sacerdotes advierten que el santuario es pequeño y las ofrendas, escasas. Un funcionario de confianza podría renovar la estatua del dios y organizar la fiesta, pero el tesoro tiene otras urgencias.',
    ctx: 'Abidos fue el gran centro del culto de Osiris. En el Imperio Medio se volvió lugar de peregrinación: miles de estelas y capillas de particulares jalonan el camino de las procesiones. La estela del funcionario Ikhernofret, del reinado de Senusret III, cuenta cómo el rey lo envió a Abidos a honrar a Osiris y a organizar la fiesta.',
    opts: [
      { t: 'Costear la renovación de la estatua de Osiris y la procesión anual', fx: { estabilidad: 3, riqueza: -6, cultura: 4, influencia: 1, fe: 7 }, type: 'religioso' },
      { t: 'Permitir que los particulares paguen sus propias estelas junto al camino de la procesión', fx: { estabilidad: 2, riqueza: 3, cultura: 3, fe: 3, comercio: 1 }, type: 'economico' },
      { t: 'Limitar la fiesta a los sacerdotes del templo, sin peregrinos', fx: { estabilidad: -1, riqueza: 1, cultura: 1, influencia: 2, fe: -2 }, type: 'politico' },
      { t: 'Cobrar entrada a los peregrinos para sostener el santuario', fx: { estabilidad: -3, riqueza: 6, cultura: -2, fe: -4, comercio: 1 }, type: 'economico' },
    ],
    tl: { date: '1870 aC aprox.', ph: 'Senusret III (Khakaura)', ev: 'Ikhernofret organiza la fiesta de Osiris en Abidos', tip: 'Su estela, hallada en Abidos, es una de las principales fuentes sobre los misterios de Osiris.' },
  },
  {
    id: 503, per: 'medio', cat: 'cultura', godOnly: 'thoth',
    title: 'La Sátira de los Oficios',
    desc: 'Un escriba anciano te entrega un papiro que se copia en todas las escuelas: un padre lleva a su hijo a la capital y le explica por qué ser escriba es mejor que ser herrero, tejedor o soldado. Quien escribe, dice el texto, se libra de los trabajos forzosos. El escriba propone abrir escuelas para más muchachos, pero algunos temen que los hijos de los campesinos abandonen los campos por el cálamo.',
    ctx: 'La «Sátira de los Oficios» (o Instrucción de Dua-Jety) es un texto del Imperio Medio escrito para formar escribas. Se copió durante siglos como ejercicio escolar: se conservan decenas de copias en papiros, tablillas y ostraca (fragmentos de cerámica). Ser escriba eximía de los trabajos manuales y abría la carrera administrativa.',
    opts: [
      { t: 'Abrir escuelas de escribas del Estado para hijos de campesinos con talento', fx: { estabilidad: 2, riqueza: -5, cultura: 7, influencia: 2, comercio: 1 }, type: 'social' },
      { t: 'Ampliar las escuelas de los templos, con copistas que preserven los textos', fx: { estabilidad: 1, riqueza: -3, cultura: 5, fe: 4 }, type: 'religioso' },
      { t: 'Mantener la escritura en las familias de funcionarios, donde ya se enseña', fx: { estabilidad: 3, riqueza: 1, cultura: -2, influencia: 3 }, type: 'politico' },
      { t: 'Premiar sólo a los escribas con rango y cerrar las escuelas pequeñas', fx: { estabilidad: -2, riqueza: 4, cultura: -5, influencia: 1, comercio: 1 }, type: 'economico' },
    ],
    tl: { date: '1850 aC aprox.', ph: 'Imperio Medio', ev: 'La Sátira de los Oficios: elogio del escriba', tip: 'El texto compara el oficio de escriba con el de herrero, tejedor o soldado, y se copió durante siglos en las escuelas.' },
  },
  {
    id: 504, per: 'nuevo', cat: 'militar', godOnly: 'horus',
    title: 'El Paso de Aruna',
    desc: 'Una coalición de príncipes de Canaán se atrinchera tras las murallas de Meguido. Tres caminos llevan hasta allí: dos largos y seguros, y uno estrecho, el paso de Aruna, donde el ejército tendría que avanzar en fila y una emboscada sería fatal. Los generales piden prudencia. El rey halcón mira el mapa: el camino peligroso es también el que el enemigo no espera.',
    ctx: 'Según los Anales de Tutmosis III, grabados en Karnak, el rey desoyó a sus generales y cruzó por el angosto paso de Aruna (hacia el 1457 a.C.). El enemigo no lo había custodiado: el ejército egipcio llegó por sorpresa y venció, aunque Meguido resistió un asedio de siete u ocho meses.',
    opts: [
      { t: 'Cruzar el paso de Aruna en fila: la sorpresa vale más que la prudencia', fx: { estabilidad: -2, riqueza: -2, influencia: 9, fe: 1 }, type: 'militar' },
      { t: 'Tomar el camino seguro del norte, aunque el enemigo tenga tiempo de prepararse', fx: { estabilidad: 3, riqueza: -2, influencia: 3, cultura: 1 }, type: 'militar' },
      { t: 'Dividir el ejército y avanzar por los tres caminos a la vez', fx: { estabilidad: -2, riqueza: -3, influencia: 5, comercio: 1 }, type: 'militar' },
      { t: 'Enviar emisarios a los príncipes aliados para romper la coalición antes de combatir', fx: { estabilidad: 4, riqueza: -3, cultura: 1, influencia: 3, comercio: 2 }, type: 'diplomatico' },
    ],
    tl: { date: '1457 aC', ph: 'Tutmosis III (Menkheperra)', ev: 'Batalla de Meguido', tip: 'Los Anales de Karnak son uno de los relatos de batalla más antiguos y detallados que se conservan.' },
  },
  {
    id: 505, per: 'nuevo', cat: 'sociedad', godOnly: 'hathor',
    title: 'La Hermosa Fiesta del Valle',
    desc: 'Cada año, en Tebas, la estatua de Amón cruza el Nilo hacia la orilla de los muertos. Las familias la siguen con flores, pan y cerveza, se sientan junto a las tumbas de sus antepasados y pasan la noche entre música. Este año el cortejo es más numeroso que nunca: los sacerdotes piden más ofrendas, los vecinos piden más cerveza y los guardias piden menos gente.',
    ctx: 'La Hermosa Fiesta del Valle se celebraba en Tebas durante el Imperio Nuevo. La estatua de Amón cruzaba el río hasta la orilla occidental, y las familias comían y bebían en las tumbas de sus muertos, entre música y flores. Era una fiesta de encuentro entre los vivos y los antepasados.',
    opts: [
      { t: 'Costear banquetes, flores y músicos para que todas las familias participen', fx: { estabilidad: 5, riqueza: -5, cultura: 3, fe: 4, comercio: 1 }, type: 'social' },
      { t: 'Mantener la procesión de los sacerdotes sin banquete público', fx: { estabilidad: 1, riqueza: -1, cultura: 1, fe: 2 }, type: 'religioso' },
      { t: 'Entregar el abastecimiento de pan y cerveza a comerciantes con licencia', fx: { estabilidad: -1, riqueza: 4, fe: -2, comercio: 4 }, type: 'economico' },
      { t: 'Prohibir las vigilias nocturnas en las tumbas por razones de seguridad', fx: { estabilidad: 2, cultura: -3, influencia: 2, fe: -4 }, type: 'politico' },
    ],
    tl: { date: '1450 aC aprox.', ph: 'Imperio Nuevo', ev: 'La Hermosa Fiesta del Valle, en Tebas', tip: 'Era una fiesta de encuentro con los antepasados: las familias comían en las tumbas, entre flores, música y cerveza.' },
  },
  {
    id: 506, per: 'nuevo', cat: 'religion', godOnly: 'sekhmet',
    title: 'Las Leonas de Amenhotep',
    desc: 'Los sacerdotes piden una ofrenda gigantesca: cientos de estatuas de la diosa leona Sekhmet, talladas en granito oscuro, para que un ritual diario calme su furia. Dicen que mientras ella esté apaciguada, la enfermedad y la guerra se mantendrán lejos. Los canteros advierten del costo, y los médicos reales piden recursos para sus propios remedios.',
    ctx: 'Amenhotep III (hacia 1390-1353 a.C.) hizo tallar centenares de estatuas de Sekhmet, hoy repartidas por museos de todo el mundo. Se discute para qué: la explicación más aceptada es un ritual diario para pacificar a la diosa; otras las ligan al jubileo del rey o a su salud. Ninguna está probada.',
    opts: [
      { t: 'Encargar las estatuas y un ritual diario durante todo el año', fx: { estabilidad: 2, riqueza: -7, cultura: 4, influencia: 2, fe: 7 }, type: 'religioso' },
      { t: 'Tallar unas pocas estatuas para el templo principal', fx: { estabilidad: 1, riqueza: -3, cultura: 3, fe: 3 }, type: 'cultural' },
      { t: 'Financiar a los médicos reales y las boticas del Delta, y honrar a la diosa con una fiesta', fx: { estabilidad: 4, riqueza: -4, cultura: 3, fe: 2, comercio: 1 }, type: 'social' },
      { t: 'Ahorrar el oro: la diosa se aplaca con respeto, no con granito', fx: { estabilidad: -2, riqueza: 5, cultura: -3, influencia: 1, fe: -4 }, type: 'economico' },
    ],
    tl: { date: '1370 aC aprox.', ph: 'Amenhotep III', ev: 'Centenares de estatuas de Sekhmet para Tebas', tip: 'Hay estatuas de Sekhmet de su reinado en museos de todo el mundo.' },
  },
  {
    id: 507, per: 'tardio', cat: 'sociedad', godOnly: 'anubis',
    title: 'Los Tres Precios de la Muerte',
    desc: 'Los embalsamadores de Menfis se presentan con una queja. Sus clientes ricos exigen el mejor tratamiento, con aceites finos y vendas de lino; los pobres piden algo barato, y algunos no pueden pagar nada. Hay familias que entierran a sus muertos sin ritual por falta de plata. Los embalsamadores piden que el Estado fije los precios o los deje libres.',
    ctx: 'El historiador griego Heródoto, que visitó Egipto hacia el 450 a.C., describe tres calidades de embalsamamiento según lo que pagara la familia. Las momias que se conservan confirman que el tratamiento variaba mucho. Los detalles y precios que da Heródoto no son del todo confiables.',
    opts: [
      { t: 'Fijar tarifas y pagar con fondos públicos un rito básico para quienes no puedan', fx: { estabilidad: 5, riqueza: -5, cultura: 2, fe: 5 }, type: 'social' },
      { t: 'Dejar los precios libres: que cada familia pague lo que pueda', fx: { estabilidad: -3, riqueza: 4, fe: -2, comercio: 2 }, type: 'economico' },
      { t: 'Crear un gremio con licencia real que controle la calidad del trabajo', fx: { estabilidad: 2, riqueza: 1, cultura: 1, influencia: 3, fe: 1 }, type: 'politico' },
      { t: 'Prohibir los rituales baratos: sin embalsamamiento digno, no hay entierro', fx: { estabilidad: -3, riqueza: 3, cultura: -2, influencia: 2, fe: 3 }, type: 'religioso' },
    ],
    tl: { date: '450 aC aprox.', ph: 'Persia (dinastía XXVII)', ev: 'Heródoto describe tres calidades de embalsamamiento', tip: 'Las momias que se conservan confirman que el tratamiento variaba según el dinero de la familia.' },
  },
  {
    id: 508, per: 'tardio', cat: 'religion', godOnly: 'bastet',
    title: 'La Fiesta de Bubastis',
    desc: 'Cada año, barcas llenas de peregrinos suben el río hasta Bubastis, la ciudad de la diosa gata. Hay música, cantos y vino en las cubiertas, y las orillas se llenan de gente que saluda y baila. Este año los vecinos se quejan de los desórdenes y los guardias de los muelles piden permiso para limitar el número de barcas. Los sacerdotes responden que la diosa recibe a todos.',
    ctx: 'Heródoto (siglo V a.C.) describe la fiesta de Bastet en Bubastis como una de las más concurridas de Egipto, con barcas llenas de peregrinos; sus cifras de asistentes son una exageración probable. Bubastis fue el gran centro del culto de Bastet: allí se hallaron cementerios de gatos sagrados y estatuillas de bronce. De allí era originaria la dinastía XXII.',
    opts: [
      { t: 'Apoyar la fiesta con muelles ordenados, guardias y puestos de agua para los peregrinos', fx: { estabilidad: 5, riqueza: -4, cultura: 2, fe: 4, comercio: 2 }, type: 'social' },
      { t: 'Cobrar un peaje a las barcas de los peregrinos para sostener el templo', fx: { estabilidad: -2, riqueza: 6, fe: -2, comercio: 1 }, type: 'economico' },
      { t: 'Limitar las barcas y exigir permiso a las autoridades de cada nomo', fx: { estabilidad: 3, riqueza: 1, influencia: 3, fe: -3, comercio: -1 }, type: 'politico' },
      { t: 'Prohibir la fiesta hasta que cesen los desórdenes', fx: { estabilidad: -4, riqueza: 1, cultura: -3, influencia: 2, fe: -6 }, type: 'politico' },
    ],
    tl: { date: '450 aC aprox.', ph: 'Heródoto (siglo V aC)', ev: 'La fiesta de Bastet en Bubastis', tip: 'En Bubastis se encontraron cementerios de gatos sagrados, ofrendas a la diosa Bastet.' },
  },
]
