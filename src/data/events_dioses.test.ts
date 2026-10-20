import { describe, it, expect } from 'vitest'
import { EVENTS_DIOSES } from './events_dioses'
import { GODS } from './gods'
import { PERIODS } from './periods'
import { buildGameEvents, getEventsById } from './eventPools'
import { EVENTS } from './events'
import * as X from './events_extra'

const COMUNES = [...EVENTS, ...Object.values(X).flat()]

describe('eventos exclusivos de cada dios', () => {
  it('hay exactamente uno por dios, de un período que existe', () => {
    for (const g of GODS) expect(EVENTS_DIOSES.filter(e => e.godOnly === g.id), g.id).toHaveLength(1)
    expect(EVENTS_DIOSES).toHaveLength(GODS.length)
    for (const e of EVENTS_DIOSES) expect(PERIODS.map(p => p.id)).toContain(e.per)
  })

  it('sus ids no chocan con los de los eventos comunes', () => {
    const ids = [...COMUNES, ...EVENTS_DIOSES].map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada partida de un dios incluye su evento una vez, y los otros dioses no lo ven', () => {
    for (const g of GODS) {
      for (let i = 0; i < 40; i++) {
        const evs = buildGameEvents(8, g.id)
        expect(evs).toHaveLength(32)
        const mios = evs.filter(e => e.godOnly)
        expect(mios.map(e => e.godOnly), g.id).toEqual([g.id])
        // Sigue habiendo ocho eventos por período y el faraón en su lugar.
        for (const p of PERIODS) expect(evs.filter(e => e.per === p.id), `${g.id}/${p.id}`).toHaveLength(8)
      }
    }
  })

  it('sin dios (o con partidas viejas) no aparece ninguno', () => {
    for (let i = 0; i < 40; i++) expect(buildGameEvents(8).some(e => e.godOnly)).toBe(false)
  })

  it('una partida guardada con su evento exclusivo se puede reconstruir', () => {
    const evs = buildGameEvents(8, 'horus')
    const vuelta = getEventsById(evs.map(e => e.id))
    expect(vuelta?.map(e => e.id)).toEqual(evs.map(e => e.id))
  })

  it('cuentan con fuente: el contexto nombra a quién lo documenta o lo marca como dudoso', () => {
    for (const e of EVENTS_DIOSES) {
      expect(e.ctx.length, e.title).toBeGreaterThan(120)
      expect(e.tl.date && e.tl.ph && e.tl.ev && e.tl.tip, e.title).toBeTruthy()
    }
    // Lo que no está probado se dice como dudoso, no como hecho.
    const sekhmet = EVENTS_DIOSES.find(e => e.godOnly === 'sekhmet')!
    expect(sekhmet.ctx).toMatch(/no está probada|no están probadas|se discute/i)
  })
})
