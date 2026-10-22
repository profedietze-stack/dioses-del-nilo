import { describe, it, expect } from 'vitest'
import {
  leerAjustes, paraDocumento, AJUSTES_POR_DEFECTO, TEMAS, TAMANOS, ESCALA_TAMANO,
} from './ajustes'

describe('leerAjustes', () => {
  it('sin guardado devuelve los valores por defecto', () => {
    expect(leerAjustes(null)).toEqual(AJUSTES_POR_DEFECTO)
    expect(leerAjustes(undefined)).toEqual(AJUSTES_POR_DEFECTO)
    expect(leerAjustes('')).toEqual(AJUSTES_POR_DEFECTO)
  })

  it('JSON ilegible o de otro tipo cae a los valores por defecto sin lanzar', () => {
    for (const malo of ['{no es json', 'null', '42', '"texto"', '[1,2]']) {
      expect(leerAjustes(malo)).toEqual(AJUSTES_POR_DEFECTO)
    }
  })

  it('lee campo por campo: un campo roto no arrastra a los demás', () => {
    const a = leerAjustes(JSON.stringify({ tema: 'contraste', tamano: 'gigante', volMusica: 'alto', musica: false }))
    expect(a.tema).toBe('contraste')
    expect(a.musica).toBe(false)
    expect(a.tamano).toBe(AJUSTES_POR_DEFECTO.tamano)
    expect(a.volMusica).toBe(AJUSTES_POR_DEFECTO.volMusica)
  })

  it('acota los volúmenes a 0..1 y descarta NaN/Infinity', () => {
    expect(leerAjustes(JSON.stringify({ volMusica: 7, volEfectos: -3 }))).toMatchObject({ volMusica: 1, volEfectos: 0 })
    expect(leerAjustes('{"volMusica":1e999}').volMusica).toBe(AJUSTES_POR_DEFECTO.volMusica)
  })

  it('un guardado completo vuelve igual', () => {
    const a = { ...AJUSTES_POR_DEFECTO, tema: 'claro' as const, tamano: 'enorme' as const, imagenes: false, volEfectos: 0.25 }
    expect(leerAjustes(JSON.stringify(a))).toEqual(a)
  })
})

describe('paraDocumento', () => {
  it('cada tema y tamaño produce su atributo y tamaño base', () => {
    for (const tema of TEMAS) expect(paraDocumento({ ...AJUSTES_POR_DEFECTO, tema }).atributos['data-tema']).toBe(tema)
    for (const t of TAMANOS) {
      expect(paraDocumento({ ...AJUSTES_POR_DEFECTO, tamano: t }).tamanoBase).toBe(`${18 * ESCALA_TAMANO[t]}px`)
    }
  })

  it('los tamaños crecen de chica a enorme', () => {
    const v = TAMANOS.map(t => ESCALA_TAMANO[t])
    expect([...v].sort((x, y) => x - y)).toEqual(v)
  })
})
