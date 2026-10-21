import { describe, it, expect } from 'vitest'
import { EVENTS } from './events'
import * as X from './events_extra'
import { EVENTS_DIOSES } from './events_dioses'
import { EVENTS_EQUILIBRIO } from './events_equilibrio'
import type { GameEvent } from '../types'

/* Afirmaciones que estaban en los textos y que las fuentes desmienten o no respaldan (tandas 5 a 12).
   No prueba que el resto sea verdad: solo evita que reaparezcan. Cada entrada dice qué dicen las fuentes. */
const TODOS: GameEvent[] = [...EVENTS, ...Object.values(X).flat(), ...EVENTS_EQUILIBRIO, ...EVENTS_DIOSES]

const texto = (e: GameEvent) =>
  [e.title, e.desc, e.ctx, ...e.opts.map(o => o.t), e.tl.date, e.tl.ph, e.tl.ev, e.tl.tip].join('\n')

const DESMENTIDAS: [RegExp, string][] = [
  [/Nehsi/, 'Nehsy es de la expedición de Hatshepsut (Imperio Nuevo), no del Antiguo Imperio'],
  [/283 conjuros/, 'la pirámide de Unas tiene 228; en total se conocen unos 760'],
  [/800 conjuros/, 'los Textos de las Pirámides suman unos 760, no 800'],
  [/Hesy-Ra/, 'Hesy-Ra fue jefe de dentistas y médicos de Djoser; no escribió el Papiro Edwin Smith'],
  [/documento médico más antiguo del mundo/, 'el Papiro de Lahun es más antiguo; Edwin Smith es el tratado quirúrgico más antiguo'],
  [/reinado más largo de la historia/, 'lo atestiguado de Pepi II llega al año ~62; los 94 años son tradición'],
  [/Polícrates/, 'el que pasó a Cambises fue Fanes de Halicarnaso'],
  [/elefantes de guerra/, 'Cambises no usó elefantes en Egipto'],
  [/200\.000 soldados/, 'no hay cifra confiable del ejército persa'],
  [/Taharqa huyó/, 'quien huyó de Tebas en 663 aC fue Tanutamón'],
  [/granito negro/, 'la Piedra de Rosetta es de granodiorita'],
  [/griego, hierático y demótico/, 'la piedra tiene jeroglífico, demótico y griego: dos lenguas, tres escrituras'],
  [/hablan copto/, 'el copto es posterior; en la Alejandría ptolemaica se hablaba egipcio'],
  [/dos millones de personas/, 'Alejandría ptolemaica tenía cientos de miles'],
  [/8 millones de ibis/, 'en Saqqara se estiman unos 1,75 millones de ibis'],
  [/criados en granjas del templo/, 'el ADN de 2019 sugiere ibis silvestres'],
  [/nueve idiomas/, 'Plutarco dice que hablaba muchas lenguas, no un número exacto'],
  [/matemática, farmacóloga|matemática, filósofa/, 'Cleopatra no figura en las fuentes como matemática ni farmacóloga'],
  [/3\.000 años de civilización faraónica ininterrumpida/, 'hubo dominaciones extranjeras antes de Cleopatra'],
  [/Murió doce años después/, 'Alejandro fundó Alejandría en 331 aC y murió en 323: nueve años'],
  [/siete días de planificación/, 'no figura en las fuentes'],
  [/Revolución de 1952, 2\.477/, 'el último faraón nativo cayó en 343 aC; Naguib llegó en 1952-1953'],
  [/faraones de piel negra/, 'se dice faraones nubios o kushitas'],
  [/sus esclavos\./, 'los kushitas no eran esclavos de Egipto'],
  [/Heracleópolis describen/, 'los textos del Primer Período Intermedio no se limitan a Heracleópolis'],
  [/primer alfabeto del mundo/, 'la escritura protosinaítica es antecesora del alfabeto'],
  [/Casa de la Vida en Menfis/, 'no hay evidencia de esa institución en ese lugar y época'],
  [/Harkhuf regresa de una expedición al Sinaí/, 'Harkhuf exploró Nubia en el Antiguo Imperio'],
  [/Senuseret I, circa 1960 aC/, 'las obras del Fayum se atribuyen a Senuseret II y Amenemhat III'],
  [/Lago Moeris —el gran lago artificial/, 'el lago Moeris era natural: se regulaba su nivel'],
  [/Código de Hammurabi babilónico \(1754 aC\) muestra cuánto más explícita/, 'el Papiro Brooklyn muestra servidores asiáticos en casas egipcias'],
  [/Relato de Unamón \(circa 1070 aC\) documenta la humillación de un enviado egipcio en Biblos\. Es el texto/, 'el Relato de Unamón es del Período Tardío, no del Imperio Medio'],
  [/relojes de agua \(clepsidras\)/, 'el reloj de agua de Amenhotep III está en Karnak, no en Deir el-Medina'],
  [/primer código ético escrito de la historia/, 'es de los primeros códigos éticos escritos que se conocen'],
  [/padre adoptivo/, 'el padre de Tutankamón fue Akenatón (ADN, 2010)'],
  [/tiene dieciséis años/, 'Tutmosis III era un niño cuando Hatshepsut asumió'],
  [/Doce conspiradores/, 'hubo decenas de implicados en la conspiración del harén'],
  [/fiesta de Opet/, 'las fuentes no dicen que fuera durante la fiesta de Opet'],
  [/Traen hierro/, 'los Pueblos del Mar no traían hierro'],
  [/primera tumba en el Valle de los Reyes/i, 'es la probable primera tumba real del Valle'],
]

describe('afirmaciones desmentidas', () => {
  it('ninguna reaparece en los textos de los eventos', () => {
    const halladas: string[] = []
    for (const e of TODOS) {
      const t = texto(e)
      for (const [patron, porque] of DESMENTIDAS) {
        if (patron.test(t)) halladas.push(`ev${e.id} «${e.title}»: ${patron} — ${porque}`)
      }
    }
    expect(halladas).toEqual([])
  })
})
