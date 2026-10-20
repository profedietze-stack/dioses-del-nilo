import type { OptionType, Stats } from '../types'

/**
 * Habilidad de cada dios.
 *
 * Antes elegir dios daba un bono inicial de ±7 que cada decisión (±4,5 por
 * estadística) borraba en dos o tres eventos: el puntaje medio de los ocho dioses
 * iba de 69,4 a 70,6, o sea que elegir dios era ambientación y no juego.
 *
 * Ahora cada dios tiene una afinidad: ciertos tipos de decisión le salen mejor
 * (`favored` suma `bonus`) y otros peor (`against` resta `penalty`). Eso cambia
 * qué opciones convienen, no cuánto se puede ganar. Dos de las seis estadísticas,
 * fe y comercio, nunca se movían con las decisiones (valían 0 en los 62 eventos);
 * las afinidades las usan.
 */
export interface GodPower {
  name: string
  desc: string
  favored: OptionType[]
  bonus: Partial<Stats>
  against: OptionType[]
  penalty: Partial<Stats>
}

export const GOD_POWERS: Record<string, GodPower> = {
  ra: {
    name: 'Luz del Mediodía',
    desc: 'Las decisiones religiosas y culturales fortalecen la fe del pueblo en el faraón. Las crueles apagan su luz.',
    favored: ['religioso', 'cultural'], bonus: { fe: 2 },
    against: ['cruel'], penalty: { estabilidad: -2 },
  },
  osiris: {
    name: 'Don de la Crecida',
    desc: 'Lo social y lo económico florecen como el limo del Nilo, aunque poco. La violencia seca la tierra y la fe.',
    favored: ['social', 'economico'], bonus: { riqueza: 1 },
    against: ['militar', 'cruel'], penalty: { fe: -2 },
  },
  thoth: {
    name: 'Palabra Precisa',
    desc: 'Las decisiones culturales y diplomáticas se vuelven más sabias. Las armas no son su territorio.',
    favored: ['cultural', 'diplomatico'], bonus: { cultura: 2 },
    against: ['militar'], penalty: { influencia: -2 },
  },
  horus: {
    name: 'Halcón Vigilante',
    desc: 'Las decisiones militares y políticas aumentan la influencia. Negociar y ceder le resultan ajenos.',
    favored: ['militar', 'politico'], bonus: { influencia: 4 },
    against: ['diplomatico'], penalty: { comercio: -1 },
  },
  hathor: {
    name: 'Alegría de las Dos Tierras',
    desc: 'La diplomacia abre rutas y trae prosperidad. La guerra y la crueldad rompen la armonía.',
    favored: ['diplomatico'], bonus: { comercio: 2 },
    against: ['militar', 'cruel'], penalty: { estabilidad: -2 },
  },
  sekhmet: {
    name: 'Ira de la Leona',
    desc: 'Cada decisión militar impone respeto: gran influencia. La mansedumbre inquieta al reino.',
    favored: ['militar'], bonus: { influencia: 4 },
    against: ['social', 'diplomatico'], penalty: { estabilidad: -1 },
  },
  anubis: {
    name: 'Guía de Almas',
    desc: 'Las decisiones religiosas y políticas dan fe y justicia. Lo mercantil no es lo suyo.',
    favored: ['religioso', 'politico'], bonus: { fe: 2 },
    against: ['economico'], penalty: { riqueza: -2 },
  },
  bastet: {
    name: 'Protectora del Hogar',
    desc: 'Lo social y lo político dan estabilidad al hogar y al reino. La crueldad y la guerra minan la fe.',
    favored: ['social', 'politico'], bonus: { estabilidad: 2 },
    against: ['cruel', 'militar'], penalty: { fe: -1 },
  },
}
