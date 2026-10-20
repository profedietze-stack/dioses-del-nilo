import { describe, it, expect } from 'vitest'
import { EMPTY_GS, resolverDecision, resolverCoronacion, aplicarPuzzle, combinarFx, cruceDePeriodo } from './turnos'
import type { EstadoTurno } from './turnos'
import { buildGameEvents } from '../data/eventPools'
import { PLAY_STYLES } from '../data/periodLore'
import { INIT } from './gameLogic'
import { applyGodPower } from './godPowers'
import type { EventOption, HistoryEntry } from '../types'

const events = buildGameEvents(8, 'ra')
const estado = (over: Partial<EstadoTurno> = {}): EstadoTurno => ({
  godId: 'ra', stats: { ...INIT }, gs: { ...EMPTY_GS }, history: [], evIdx: 0, events, ...over,
})
const comun = (i: number) => events[i].opts[0]

describe('resolverDecision', () => {
  it('aplica el efecto con la afinidad del dios y avanza un evento', () => {
    const opt = comun(0)
    const r = resolverDecision(estado(), opt)
    expect(r.fx).toEqual(applyGodPower('ra', opt).fx)
    expect(r.evIdx).toBe(1)
    expect(r.history).toHaveLength(1)
    expect(r.history[0]).toMatchObject({ eventId: events[0].id, choice: opt.t })
    expect(r.fin).toBe(false)
  })

  it('no toca el estado que recibe', () => {
    const e = estado()
    const antes = JSON.stringify(e)
    resolverDecision(e, comun(0))
    expect(JSON.stringify(e)).toBe(antes)
  })

  it('cuenta militar, pacífica y cruel por tipo de opción', () => {
    const o = (type: EventOption['type']): EventOption => ({ t: 't', fx: { estabilidad: 1 }, type })
    expect(resolverDecision(estado(), o('militar')).gs.mil).toBe(1)
    expect(resolverDecision(estado(), o('diplomatico')).gs.peace).toBe(1)
    expect(resolverDecision(estado(), o('cruel')).gs.cruel).toBe(1)
    expect(resolverDecision(estado(), o('economico')).gs).toMatchObject({ mil: 0, peace: 0, cruel: 0 })
  })

  it('la racha sin pérdidas se corta con una pérdida', () => {
    const sube: EventOption = { t: 'a', fx: { riqueza: 2 }, type: 'economico' }
    const baja: EventOption = { t: 'b', fx: { riqueza: -2 }, type: 'economico' }
    const r1 = resolverDecision(estado(), sube)
    expect(r1.gs.stabStr).toBe(1)
    const r2 = resolverDecision(estado({ gs: r1.gs, history: r1.history, stats: r1.stats, evIdx: 1 }), baja)
    expect(r2.gs.stabStr).toBe(0)
  })

  it('marca «resucitó» al pasar de una barra en 5 o menos a todas en 50 o más', () => {
    const casiCaido = { ...INIT, riqueza: 5 }
    const sube: EventOption = { t: 'a', fx: { riqueza: 50 }, type: 'economico' }
    expect(resolverDecision(estado({ stats: casiCaido }), sube).gs.revived).toBe(true)
    expect(resolverDecision(estado(), sube).gs.revived).toBe(false)
  })

  it('el último evento termina la partida y no arma transición', () => {
    const i = events.length - 1
    const r = resolverDecision(estado({ evIdx: i }), comun(i))
    expect(r.fin).toBe(true)
    expect(r.transicion).toBeNull()
  })

  it('al pasar del evento 7 al 8 arma la transición Antiguo → Medio', () => {
    const r = resolverDecision(estado({ evIdx: 7 }), comun(7))
    expect(r.transicion?.fromPeriod.id).toBe('antiguo')
    expect(r.transicion?.toPeriod?.id).toBe('medio')
    expect(resolverDecision(estado({ evIdx: 6 }), comun(6)).transicion).toBeNull()
  })
})

describe('cruceDePeriodo', () => {
  it('no hay transición después del último período', () => {
    expect(cruceDePeriodo(events, [], 31, 32, { ...INIT })).toBeNull()
  })

  it('el estilo de juego sale de las opciones elegidas en el período', () => {
    const militares: HistoryEntry[] = []
    for (let i = 0; i < 8; i++) {
      if (events[i].isPharaoh) continue
      const op = events[i].opts.find(o => o.type === 'militar') ?? events[i].opts[0]
      militares.push({ eventId: events[i].id, choice: op.t, effects: {}, statsAfter: { ...INIT } })
    }
    const t = cruceDePeriodo(events, militares, 7, 8, { ...INIT })
    expect(t?.playStyle).toBe(PLAY_STYLES.militar)
  })
})

describe('resolverCoronacion', () => {
  it('suma bendición y maldición, avanza y no cuenta como militar/pacífica/cruel', () => {
    const i = events.findIndex(e => e.isPharaoh)
    const r = resolverCoronacion(estado({ evIdx: i }), { cultura: 5, fe: 2 }, { fe: -2, comercio: -3 })
    expect(r.fx).toEqual({ cultura: 5, comercio: -3 })
    expect(r.evIdx).toBe(i + 1)
    expect(r.history[0].choice).toBe('pharaoh_event')
    expect(r.gs).toMatchObject({ mil: 0, peace: 0, cruel: 0 })
    expect(r.gs.stabStr).toBe(0)
  })
})

describe('combinarFx y aplicarPuzzle', () => {
  it('combinarFx descarta los ceros', () => {
    expect(combinarFx({ fe: 3 }, { fe: -3, cultura: 1 })).toEqual({ cultura: 1 })
  })

  it('con statKeys el delta va entero a cada barra indicada', () => {
    const r = aplicarPuzzle({ ...INIT }, { statKeys: ['fe', 'cultura'] }, 4)
    expect(r).toMatchObject({ fe: 54, cultura: 54, riqueza: 50 })
  })

  it('sin statKeys el delta se parte en dos y va a las seis barras', () => {
    const r = aplicarPuzzle({ ...INIT }, {}, -6)
    expect(Object.values(r).every(v => v === 47)).toBe(true)
  })

  it('delta 0 devuelve el mismo objeto; los valores se acotan a 0–100', () => {
    const s = { ...INIT }
    expect(aplicarPuzzle(s, {}, 0)).toBe(s)
    expect(aplicarPuzzle({ ...INIT, fe: 99 }, { statKeys: ['fe'] }, 5).fe).toBe(100)
  })
})
