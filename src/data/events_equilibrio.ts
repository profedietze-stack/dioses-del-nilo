import type { GameEvent } from '../types'

/**
 * Eventos que equilibran las categorías.
 *
 * De 62 eventos comunes, 1 era `militar` (Qadesh) y el Antiguo Imperio tenía 1 solo
 * de `cultura`: una partida entera podía pasar sin una sola decisión de guerra, y la
 * imagen `cat-militar.jpg` casi nunca se mostraba. Se reetiquetaron los que eran
 * militares de verdad (17, 23, 25, 28, 205) y se escribieron estos cuatro.
 *
 * Cada uno se apoya en una fuente y dice como dudoso lo que es dudoso (las cifras
 * de Weni, dónde estaba Sekmem).
 */
export const EVENTS_EQUILIBRIO: GameEvent[] = [
  {
    id: 109, per: 'antiguo', cat: 'militar',
    title: 'El Ejército de Weni',
    desc: 'Desde el nordeste, los «habitantes de las arenas» —pastores y aldeanos del Sinaí y de Canaán— asaltan las caravanas y las minas de turquesa. Weni, un funcionario que empezó cuidando un almacén real, propone formar un ejército como nunca se vio: levas de todos los nomos y soldados de Nubia y Libia, bajo un solo mando. Los nomarcas no quieren entregar a sus hombres, y el tesoro tendrá que alimentarlos. Otros consejeros prefieren comprar la paz o fortificar el camino y esperar.',
    ctx: 'La autobiografía de Weni, grabada en su tumba de Abidos, cuenta que bajo el rey Pepi I (VI dinastía, hacia el 2300 a.C.) mandó un ejército reclutado en todo Egipto y entre los pueblos de Nubia y Libia, y que hizo cinco campañas contra «los habitantes de las arenas». En la última, el ejército cruzó por barco y desembarcó a espaldas del enemigo. Las cifras son las del propio Weni, un texto que exalta a su autor.',
    opts: [
      { t: 'Formar un gran ejército con levas de todos los nomos y soldados de Nubia y Libia, bajo el mando de Weni', fx: { estabilidad: -3, riqueza: -6, influencia: 8, comercio: 1 }, type: 'militar' },
      { t: 'Fortificar el camino de las minas con guarniciones permanentes y esperar', fx: { estabilidad: 4, riqueza: -4, influencia: 2, comercio: 1 }, type: 'militar' },
      { t: 'Comprar la paz con regalos y acuerdos con los jefes de las arenas para que dejen pasar las caravanas', fx: { estabilidad: 2, riqueza: -3, cultura: 1, influencia: -2, comercio: 4 }, type: 'diplomatico' },
      { t: 'Abandonar las minas del Sinaí y comerciar por mar con Biblos', fx: { estabilidad: -1, riqueza: 3, cultura: -1, influencia: -5, comercio: 3 }, type: 'economico' },
    ],
    tl: { date: '2300 aC aprox.', ph: 'Pepi I (VI dinastía)', ev: 'Campañas de Weni contra los habitantes de las arenas', tip: 'La autobiografía de Weni es uno de los textos militares más antiguos que se conservan: describe un ejército reunido de todo Egipto y una operación por mar.' },
  },
  {
    id: 110, per: 'antiguo', cat: 'cultura',
    title: 'La Tumba de Piedra de Djoser',
    desc: 'El rey quiere una tumba que dure para siempre. Hasta hoy los reyes se enterraban bajo una mastaba de adobe, un banco bajo de ladrillo secado al sol. Imhotep, jefe de los trabajos del rey, propone algo que nadie hizo: construirlo todo en piedra caliza y superponer seis mastabas cada vez más pequeñas, como una escalera hacia el cielo. Costará años de canteras, miles de brazos y las reservas de grano. Los ancianos del consejo dicen que lo que siempre fue de adobe debe seguir siendo de adobe.',
    ctx: 'El complejo funerario de Djoser en Saqqara (III dinastía, hacia el 2650 a.C.) es el primer gran edificio de piedra tallada que se conserva. La base de una estatua del rey lleva el nombre de Imhotep con sus títulos; los egipcios posteriores lo recordaron como arquitecto y sabio, y siglos más tarde fue adorado como un dios. Los historiadores discuten cuántos obreros eran campesinos que trabajaban durante la crecida.',
    opts: [
      { t: 'Aprobar la pirámide de seis escalones, toda en piedra, con Imhotep al frente de la obra', fx: { estabilidad: 1, riqueza: -8, cultura: 9, influencia: 4, fe: 3 }, type: 'cultural' },
      { t: 'Construir en piedra, empleando a los campesinos durante la crecida, cuando no pueden sembrar, y pagándoles en grano', fx: { estabilidad: 5, riqueza: -5, cultura: 5, influencia: 2, fe: 2 }, type: 'social' },
      { t: 'Levantar una mastaba de piedra de un solo cuerpo, más pequeña y más rápida', fx: { estabilidad: 2, riqueza: -3, cultura: 2, influencia: 1, fe: 1 }, type: 'politico' },
      { t: 'Mantener la mastaba de adobe: es más barata y la tradición no se toca', fx: { estabilidad: 3, riqueza: 4, cultura: -4, influencia: -1, fe: -1 }, type: 'economico' },
    ],
    tl: { date: '2650 aC aprox.', ph: 'Djoser (III dinastía)', ev: 'Pirámide escalonada de Saqqara', tip: 'Fue el primer gran monumento de piedra tallada de Egipto. De ahí salió la idea de la pirámide, que las dinastías siguientes llevarían a las formas lisas de Guiza.' },
  },
  {
    id: 209, per: 'medio', cat: 'militar',
    title: 'La Caída de Sekmem',
    desc: 'El rey ha marchado al norte contra los asiáticos de Retjenu y la campaña terminó: Sekmem cayó. Un oficial que luchó en ella, Sebekju, pide audiencia para recibir la recompensa por haber capturado a un enemigo en combate. Pero la pregunta de fondo es otra: ¿qué hacer con la tierra conquistada? Los generales piden una guarnición; los escribas, un tributo anual; los sacerdotes, que el rey agradezca a los dioses y regrese.',
    ctx: 'La estela de Sebekju, oficial de Senusret III (hacia el 1860 a.C.), cuenta una campaña del rey en Retjenu, el nombre egipcio de la región de Siria y Palestina, y dice que «Sekmem cayó». No se sabe con certeza dónde estaba Sekmem: una hipótesis es Siquem, pero se discute. Tampoco hay pruebas de una guarnición egipcia permanente allí: las campañas de esa época parecen expediciones de castigo.',
    opts: [
      { t: 'Dejar una guarnición egipcia en Sekmem para asegurar el camino hacia Biblos', fx: { estabilidad: -1, riqueza: -5, influencia: 7, comercio: 2 }, type: 'militar' },
      { t: 'Imponer un tributo anual de madera, cobre y ganado y retirar el ejército', fx: { estabilidad: 1, riqueza: 5, influencia: 3, comercio: 1 }, type: 'economico' },
      { t: 'Firmar acuerdos con los jefes locales: protección egipcia a cambio de abrir el comercio', fx: { estabilidad: 3, riqueza: -1, cultura: 2, influencia: 2, comercio: 5 }, type: 'diplomatico' },
      { t: 'Agradecer a los dioses con una estela y volver sin dejar nada', fx: { estabilidad: 2, riqueza: -2, cultura: 2, influencia: -1, fe: 4 }, type: 'religioso' },
    ],
    tl: { date: '1860 aC aprox.', ph: 'Senusret III (Khakaura)', ev: 'Estela de Sebekju: «Sekmem cayó»', tip: 'Es de los pocos textos del Imperio Medio que nombran una campaña egipcia en Siria y Palestina.' },
  },
  {
    id: 409, per: 'tardio', cat: 'militar',
    title: 'Carquemis: la Guerra por Siria',
    desc: 'El Imperio asirio se desmorona: Nínive ha caído ante babilonios y medos, y los restos del ejército asirio se reúnen junto al Éufrates. Egipto, que fue aliado de Asiria, teme algo peor que un vecino débil: una Babilonia fuerte a las puertas de Siria. El faraón Neco II reúne a sus consejeros. Marchar hasta el Éufrates significa meses de camino y media fuerza del ejército; no marchar es ver cómo otro poder decide la suerte de las ciudades de la costa.',
    ctx: 'La Crónica babilónica registra que en el 605 a.C. Nabucodonosor derrotó en Carquemis al ejército egipcio, que había ido a ayudar a los restos de Asiria. Los profetas hebreos también lo recuerdan (Jeremías 46). Heródoto atribuye a Neco II una flota de trirremes en el Mediterráneo y en el mar Rojo.',
    opts: [
      { t: 'Marchar con todo el ejército hasta el Éufrates y disputarle Siria a Babilonia', fx: { estabilidad: -3, riqueza: -6, influencia: 8, comercio: 1 }, type: 'militar' },
      { t: 'Ocupar con guarniciones las ciudades de la costa siria, sin buscar una batalla decisiva', fx: { estabilidad: 2, riqueza: -4, influencia: 4, comercio: 2 }, type: 'militar' },
      { t: 'Negociar con Babilonia una frontera en Siria antes de que llegue su ejército', fx: { estabilidad: 3, riqueza: -1, cultura: 1, influencia: -1, comercio: 3 }, type: 'diplomatico' },
      { t: 'Quedarse en el Delta: fortificar Pelusio y construir una flota de trirremes', fx: { estabilidad: 4, riqueza: -5, influencia: 2, comercio: 2 }, type: 'politico' },
    ],
    tl: { date: '605 aC', ph: 'Neco II (XXVI dinastía)', ev: 'Batalla de Carquemis', tip: 'Carquemis, junto al Éufrates, decidió quién dominaría Siria: Babilonia o Egipto. Ganó Babilonia.' },
  },
]
