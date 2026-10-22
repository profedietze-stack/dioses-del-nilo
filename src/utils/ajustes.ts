/* Ajustes del jugador (aspecto, letra, sonido). Funciones puras: no tocan el DOM ni el audio.
   Se guardan en localStorage y se leen campo por campo: un valor con el tipo cambiado
   (o de una versión futura) cae a su valor por defecto sin tirar los demás. */

export const CLAVE_AJUSTES = 'diosesNilo_ajustes'

export const TEMAS = ['clasico', 'contraste', 'claro'] as const
export const TAMANOS = ['chica', 'normal', 'grande', 'enorme'] as const
export const FUENTES = ['clasica', 'legible'] as const
export const INTERLINEADOS = ['normal', 'amplio'] as const
export const MOVIMIENTOS = ['normal', 'reducido'] as const

export type Tema = (typeof TEMAS)[number]
export type Tamano = (typeof TAMANOS)[number]
export type Fuente = (typeof FUENTES)[number]
export type Interlineado = (typeof INTERLINEADOS)[number]
export type Movimiento = (typeof MOVIMIENTOS)[number]

export interface Ajustes {
  tema: Tema
  tamano: Tamano
  fuente: Fuente
  interlineado: Interlineado
  movimiento: Movimiento
  imagenes: boolean
  musica: boolean
  volMusica: number // 0..1
  efectos: boolean
  volEfectos: number // 0..1
}

export const AJUSTES_POR_DEFECTO: Ajustes = {
  tema: 'clasico',
  tamano: 'normal',
  fuente: 'clasica',
  interlineado: 'normal',
  movimiento: 'normal',
  imagenes: true,
  musica: true,
  volMusica: 0.8,
  efectos: true,
  volEfectos: 0.8,
}

/* Factor sobre el tamaño base de letra (18 px). */
export const ESCALA_TAMANO: Record<Tamano, number> = { chica: 0.9, normal: 1, grande: 1.15, enorme: 1.3 }

const elegir = <T extends string>(v: unknown, validos: readonly T[], def: T): T =>
  typeof v === 'string' && (validos as readonly string[]).includes(v) ? (v as T) : def
const booleano = (v: unknown, def: boolean) => (typeof v === 'boolean' ? v : def)
const volumen = (v: unknown, def: number) =>
  typeof v === 'number' && Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : def

/* Interpreta lo que haya guardado (texto JSON o nada). Nunca lanza. */
export function leerAjustes(crudo: string | null | undefined): Ajustes {
  const d = AJUSTES_POR_DEFECTO
  let o: Record<string, unknown> = {}
  try {
    const p: unknown = crudo ? JSON.parse(crudo) : null
    if (p && typeof p === 'object' && !Array.isArray(p)) o = p as Record<string, unknown>
  } catch { /* guardado ilegible: se usan los valores por defecto */ }
  return {
    tema: elegir(o.tema, TEMAS, d.tema),
    tamano: elegir(o.tamano, TAMANOS, d.tamano),
    fuente: elegir(o.fuente, FUENTES, d.fuente),
    interlineado: elegir(o.interlineado, INTERLINEADOS, d.interlineado),
    movimiento: elegir(o.movimiento, MOVIMIENTOS, d.movimiento),
    imagenes: booleano(o.imagenes, d.imagenes),
    musica: booleano(o.musica, d.musica),
    volMusica: volumen(o.volMusica, d.volMusica),
    efectos: booleano(o.efectos, d.efectos),
    volEfectos: volumen(o.volEfectos, d.volEfectos),
  }
}

/* Lo que se escribe en <html>: atributos data-* (los lee el CSS) y el tamaño base. */
export function paraDocumento(a: Ajustes) {
  return {
    atributos: {
      'data-tema': a.tema,
      'data-fuente': a.fuente,
      'data-interlineado': a.interlineado,
      'data-movimiento': a.movimiento,
    } as Record<string, string>,
    tamanoBase: `${18 * ESCALA_TAMANO[a.tamano]}px`,
  }
}
