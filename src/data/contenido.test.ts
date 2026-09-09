import { describe, it, expect } from 'vitest'
import { PUZZLES_DEF } from './puzzles'
import { GODS } from './gods'
import { GOD_APPROVAL, GOD_ENCOURAGEMENT, CATEGORY_FACTS } from './godLore'
import { MAAT_CARD_POOL } from './maatCards'

// El contenido, contra la egiptología y contra sí mismo.
//
// Los tests que había miran las reglas del juego: que el barajado reparta, que
// el guardado aguante, que el puzzle no se entregue resuelto. Todo eso puede
// estar perfecto y el juego enseñar mitología equivocada igual — y en un juego
// sobre el Egipto antiguo, eso es lo único que el alumno se lleva puesto.

/** Todo el texto que el alumno puede leer, con su procedencia. */
function textos(): Array<[string, string]> {
  const out: Array<[string, string]> = []

  for (const p of PUZZLES_DEF) {
    if (p.type === 'ordenar' && p.tpl) out.push([`puzzle ${p.id}`, p.tpl])
    if (p.type === 'glifos' && p.glyphs) {
      for (const g of p.glyphs) out.push([`puzzle ${p.id} · ${g.s}`, `${g.lbl} — ${g.desc}`])
    }
  }
  for (const g of GODS) out.push([`dios ${g.id}`, `${g.title} ${g.desc} ${g.lore}`])
  for (const [nombre, mapa] of [['aprobación', GOD_APPROVAL], ['ánimo', GOD_ENCOURAGEMENT]] as const) {
    for (const [id, lore] of Object.entries(mapa)) {
      for (const frases of Object.values(lore as Record<string, string[]>)) {
        if (Array.isArray(frases)) frases.forEach(f => out.push([`${nombre} de ${id}`, f]))
      }
    }
  }
  for (const [cat, frases] of Object.entries(CATEGORY_FACTS)) {
    frases.forEach(f => out.push([`dato de ${cat}`, f]))
  }
  for (const c of MAAT_CARD_POOL) out.push([`carta ${c.id}`, `${c.label} ${c.hint ?? ''}`])

  return out
}

const TODO = textos()
const donde = (re: RegExp) => TODO.filter(([, t]) => re.test(t)).map(([d]) => d)

/**
 * La balanza es de Maat, no de Anubis.
 *
 * En el juicio del corazón, lo que se pesa es el corazón del difunto contra la
 * pluma de Maat: la balanza es de ella. Anubis **opera** la balanza —ajusta el
 * fiel, conduce al difunto— y Osiris preside el juicio y dicta el veredicto.
 * Son tres papeles distintos y el juego los tenía cruzados.
 *
 * Lo notable es que el juego ya lo sabía. Su propia ficha de Anubis dice, con
 * todas las letras: «Dios de la momificación y conductor de almas. Pesa los
 * corazones en la balanza de Maat». Y los eventos hablan del «juicio del corazón
 * ante Osiris». Pero en otros tres lugares aparecía «la balanza de Anubis», y el
 * puzzle 9 —que el alumno tiene que resolver— lo coronaba llamándolo «juez de
 * los muertos».
 *
 * El alumno que abre la ficha del dios lee una cosa y el que juega el puzzle,
 * otra.
 */
describe('el juicio del corazón', () => {
  it('la ficha de Anubis sigue diciendo de quién es la balanza', () => {
    const anubis = GODS.find(g => g.id === 'anubis')!
    expect(anubis.desc).toMatch(/balanza de Maat/i)
  })

  it('y ningún texto se la atribuye a Anubis', () => {
    expect(donde(/balanza de Anubis/i)).toEqual([])
  })

  it('Anubis no es el juez de los muertos: ese es Osiris', () => {
    expect(donde(/Anubis[^.]{0,40}juez/i)).toEqual([])
    const puzzle = PUZZLES_DEF.find(p => p.id === 9)!
    expect(puzzle.tpl).toMatch(/Osiris/i)
  })

  it('pero Anubis sigue siendo el que pesa el corazón, que es lo suyo', () => {
    const puzzle = PUZZLES_DEF.find(p => p.id === 9)!
    expect(puzzle.tpl).toMatch(/ANUBIS/)
    expect(puzzle.words).toContain('ANUBIS')
  })
})

/**
 * Los jeroglíficos, contra el estándar Unicode.
 *
 * El puzzle de glifos enseña «este signo es tal cosa», y tres del segundo set
 * estaban mal identificados. No es una errata de estilo: es el dato entero.
 *
 *   𓆑  U+13191 · I009 · víbora cornuda, fonema «f»
 *       decía: «Cobra uraeus — la cobra real en posición de ataque»
 *   𓏌  U+133CC · W024 · vasija, fonema «nw»
 *       decía: «Papiro enrollado — símbolo de escritura y conocimiento»
 *   𓁹  U+13079 · D004 · ojo, «ir» (ver)
 *       decía: «Ojo de Wadjet», que además ya estaba en el otro set como
 *       «Ojo de Horus (Udjat)» con el glifo que sí corresponde, 𓂀 (D010)
 *
 * Los tres SON jeroglíficos egipcios, así que el mecanismo del puzzle —separar
 * lo egipcio de lo que no lo es— seguía funcionando. Lo que estaba mal era lo
 * único que el puzzle enseña.
 *
 * Fuente: Unicode 13000–1342F (Egyptian Hieroglyphs) y los códigos Gardiner.
 */
describe('las etiquetas de los jeroglíficos', () => {
  const glifos = PUZZLES_DEF
    .filter(p => p.type === 'glifos' && p.glyphs)
    .flatMap(p => p.glyphs!.map(g => ({ ...g, puzzle: p.id })))

  const etiqueta = (s: string) => glifos.find(g => g.s === s)

  it('la víbora cornuda no es una cobra', () => {
    const g = etiqueta('\u{13191}')
    expect(g, 'desapareció el glifo I009').toBeTruthy()
    expect(`${g!.lbl} ${g!.desc}`, 'I009 es la víbora cornuda, fonema f').not.toMatch(/cobra|uraeus/i)
    expect(g!.lbl).toMatch(/v[íi]bora/i)
  })

  it('la vasija no es un papiro enrollado', () => {
    const g = etiqueta('\u{133CC}')
    expect(g, 'desapareció el glifo W024').toBeTruthy()
    expect(`${g!.lbl} ${g!.desc}`, 'W024 es una vasija, fonema nw').not.toMatch(/papiro/i)
    expect(g!.lbl).toMatch(/vasija|recipiente/i)
  })

  it('el ojo simple no es el ojo de Wadjet', () => {
    const g = etiqueta('\u{13079}')
    expect(g, 'desapareció el glifo D004').toBeTruthy()
    expect(g!.lbl, 'D004 es el ojo común; el udjat es D010').not.toMatch(/wadjet|udjat|horus/i)
  })

  it('y el udjat de verdad sigue siendo D010', () => {
    const g = etiqueta('\u{13080}')
    expect(g!.lbl).toMatch(/udjat|horus/i)
  })

  it('cada glifo aparece una sola vez en todo el juego', () => {
    const vistos = glifos.map(g => g.s)
    const repetidos = vistos.filter((s, i) => vistos.indexOf(s) !== i)
    expect(repetidos).toEqual([])
  })

  it('y ninguna etiqueta se repite entre glifos distintos', () => {
    const etiquetas = glifos.map(g => g.lbl.toLowerCase())
    const repetidas = etiquetas.filter((l, i) => etiquetas.indexOf(l) !== i)
    expect(repetidas).toEqual([])
  })
})
