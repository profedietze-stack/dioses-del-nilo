import { describe, it, expect } from 'vitest'
import { barajar, barajarDesordenado } from './barajar'

// El barajado importa más de lo que parece en un juego de ordenar: si reparte
// mal, el puzzle se entrega casi resuelto y el chico no tiene nada que
// resolver. El comparador que había antes —`sort(() => Math.random() - 0.5)`—
// devolvía la lista ya ordenada el 9,4% de las veces con cinco piezas.

const LISTA = ['a', 'b', 'c', 'd', 'e']

describe('barajar', () => {
  it('no pierde ni inventa elementos', () => {
    for (let i = 0; i < 500; i++) {
      expect([...barajar(LISTA)].sort()).toEqual([...LISTA].sort())
    }
  })

  it('no toca la lista original', () => {
    const copia = [...LISTA]
    barajar(LISTA)
    expect(LISTA).toEqual(copia)
  })

  it('reparte parejo: cada elemento pasa por cada posición', () => {
    const veces = LISTA.map(() => LISTA.map(() => 0))
    const N = 20000
    for (let i = 0; i < N; i++) {
      barajar(LISTA).forEach((letra, pos) => {
        veces[LISTA.indexOf(letra)]![pos]!++
      })
    }
    const esperado = N / LISTA.length
    for (const [elemento, porPosicion] of veces.entries()) {
      for (const [pos, n] of porPosicion.entries()) {
        expect(
          Math.abs(n - esperado) / esperado,
          `"${LISTA[elemento]}" cae en la posición ${pos} el ${(n / N * 100).toFixed(1)}% de las veces`,
        ).toBeLessThan(0.15)
      }
    }
  })

  it('deja pocas piezas en su lugar: una en promedio, no una y media', () => {
    // El comparador viejo dejaba 1,43 piezas quietas de cinco. Un barajado
    // uniforme deja exactamente una en promedio, sea cual sea el tamaño.
    let quietas = 0
    const N = 20000
    for (let i = 0; i < N; i++) {
      quietas += barajar(LISTA).filter((x, i2) => x === LISTA[i2]).length
    }
    expect(quietas / N).toBeGreaterThan(0.85)
    expect(quietas / N).toBeLessThan(1.15)
  })

  it('aguanta listas vacías y de un solo elemento', () => {
    expect(barajar([])).toEqual([])
    expect(barajar(['solo'])).toEqual(['solo'])
  })
})

describe('barajarDesordenado', () => {
  it('nunca entrega la lista resuelta', () => {
    const resuelto = (o: string[]) => o.every((x, i) => x === LISTA[i])
    for (let i = 0; i < 3000; i++) {
      expect(resuelto(barajarDesordenado(LISTA, resuelto))).toBe(false)
    }
  })

  it('se rinde en vez de colgarse cuando no hay otro orden posible', () => {
    // Dos piezas iguales: cualquier orden es "el resuelto". Tiene que devolver
    // algo igual, no quedarse dando vueltas.
    const iguales = ['x', 'x']
    const resuelto = () => true
    expect(barajarDesordenado(iguales, resuelto)).toEqual(['x', 'x'])
  })

  it('sigue siendo una permutación de lo que recibió', () => {
    const resuelto = (o: string[]) => o.every((x, i) => x === LISTA[i])
    for (let i = 0; i < 500; i++) {
      expect([...barajarDesordenado(LISTA, resuelto)].sort()).toEqual([...LISTA].sort())
    }
  })
})

describe('reparto de las cartas de Maat', () => {
  it('ninguna carta del pool queda condenada al fondo', async () => {
    const { dealMaatCards, MAAT_CARD_POOL } = await import('../data/maatCards')
    const veces: Record<string, number> = {}
    const N = 4000
    for (let i = 0; i < N; i++) {
      for (const c of dealMaatCards(8)) veces[c.id] = (veces[c.id] ?? 0) + 1
    }
    expect(Object.keys(veces).length, 'hay cartas que no salen nunca').toBe(MAAT_CARD_POOL.length)
    // Se reparten 8 de las que haya: todas deberían salir con la misma
    // frecuencia. Con el comparador viejo, las primeras del archivo salían
    // bastante más que las últimas.
    const esperado = 8 / MAAT_CARD_POOL.length
    for (const [id, n] of Object.entries(veces)) {
      const p = n / N
      expect(
        Math.abs(p - esperado) / esperado,
        `"${id}" sale el ${(p * 100).toFixed(1)}% de las veces y debería salir el ${(esperado * 100).toFixed(1)}%`,
      ).toBeLessThan(0.12)
    }
  })
})
