# Pharaoh Events Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 4 fixed pharaoh events (one per historical period) that replace a normal event slot, each consisting of a 2-step mystical modal where the Ka blesses a new pharaoh then assigns a mission.

**Architecture:** Pharaoh events are `GameEvent` objects with negative IDs (-1001 to -1004) and `isPharaoh: true`. They are injected at fixed positions (indices 4, 12, 20, 28) inside `buildGameEvents`. In `App.tsx`, when the current event has `isPharaoh === true`, a full-screen `PharaohModal` renders instead of the normal event card. After both steps complete, `handlePharaohDone` merges the stat effects and advances `evIdx` without triggering ConsejerModal or GodModal.

**Tech Stack:** React 18 + TypeScript strict, Framer Motion v11, Vite, CSS custom properties.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/types/index.ts` | Modify | Add `isPharaoh?: boolean; pharaohId?: string` to `GameEvent` |
| `src/data/pharaohs.ts` | **Create** | `PharaohData` types + all 4 pharaohs + placeholder `GameEvent[]` |
| `src/data/eventPools.ts` | Modify | Import pharaoh placeholders, inject at fixed indices, include in `getEventsById` |
| `src/components/ui/PharaohModal.tsx` | **Create** | 2-step mystical modal (coronation → mission → response) |
| `src/App.tsx` | Modify | Import modal, detect `ev.isPharaoh`, add `handlePharaohDone`, render overlay |
| `src/styles/globals.css` | Modify | `.pharaoh-*` atmospheric CSS styles |

---

## Task 1: Extend `GameEvent` type

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add optional pharaoh fields to GameEvent**

In `src/types/index.ts`, replace the `GameEvent` interface (lines 54–63):

```ts
export interface GameEvent {
  id: number
  per: string
  cat: string
  title: string
  desc: string
  ctx: string
  opts: EventOption[]
  tl: TimelineCard
  isPharaoh?: boolean
  pharaohId?: string
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo
npx tsc --noEmit
```

Expected: no errors (the new fields are optional — existing code unaffected).

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "types: extend GameEvent with optional isPharaoh and pharaohId fields"
```

---

## Task 2: Create `src/data/pharaohs.ts`

**Files:**
- Create: `src/data/pharaohs.ts`

- [ ] **Step 1: Create the file with all types and data**

Create `src/data/pharaohs.ts` with the following complete content:

```ts
import type { Stats, GameEvent } from '../types'

// ── TYPES ────────────────────────────────────────────────────────────────────

export interface PharaohBlessing {
  id: string
  icon: string
  label: string
  desc: string
  fx: Partial<Stats>
}

export interface PharaohMission {
  id: string
  icon: string
  label: string
  desc: string
  pharaohResponse: string
  fx: Partial<Stats>
}

export interface PharaohData {
  id: string
  name: string
  nameGlyph: string
  icon: string
  years: string
  dynasty: string
  title: string
  bio: string
  coronationText: string
  pharaohGreeting: string
  blessings: PharaohBlessing[]
  missions: PharaohMission[]
}

// ── DATA ─────────────────────────────────────────────────────────────────────

export const PHARAOHS: Record<string, PharaohData> = {

  keops: {
    id: 'keops',
    name: 'Keops',
    nameGlyph: '𓆎',
    icon: '𓃭',
    years: '2589–2566 a.C.',
    dynasty: 'IV Dinastía',
    title: 'Constructor de la Gran Pirámide de Guiza',
    bio: 'Jufu, conocido en griego como Keops, ordenó la construcción de la mayor estructura jamás erigida por manos humanas: la Gran Pirámide de Guiza. Durante su reinado de más de veinte años, organizó un Estado capaz de movilizar a decenas de miles de trabajadores con precisión milimétrica. Su pirámide fue considerada durante siglos la única de las Siete Maravillas del Mundo Antiguo que sobrevivió intacta.',
    coronationText: 'El Ka siente la tierra temblar bajo el peso de una voluntad sin precedentes. Desde las arenas de Menfis surge un nombre que los dioses ya conocen — el que alzará la montaña de piedra más alta jamás concebida por mente humana. El horizonte mismo está a punto de cambiar para siempre.',
    pharaohGreeting: 'Ka Eterno... Los hombres me llaman Jufu. Siento tu presencia en cada bloque que mis trabajadores arrastran desde Asuán. Los arquitectos me muestran planos que desafían lo posible. Pero nada de esto nace sin tu chispa divina. Dime cuál debe ser mi legado en esta tierra.',
    blessings: [
      {
        id: 'keops_sabiduria',
        icon: '🌅',
        label: 'Sabiduría del Horizonte',
        desc: 'El faraón contemplará el cosmos antes de ordenar. Sus monumentos hablarán a la eternidad más que a los hombres.',
        fx: { cultura: 8, fe: 5 },
      },
      {
        id: 'keops_fuerza',
        icon: '🪨',
        label: 'Fuerza de la Piedra',
        desc: 'Como la roca de Asuán, el reinado será inamovible. El pueblo obedecerá y los nobles no se atreverán a desafiar.',
        fx: { estabilidad: 8, influencia: 5 },
      },
      {
        id: 'keops_abundancia',
        icon: '🌊',
        label: 'Abundancia del Nilo',
        desc: 'Las inundaciones serán generosas. Los graneros rebostarán y las rutas de comercio se multiplicarán.',
        fx: { riqueza: 7, comercio: 6 },
      },
    ],
    missions: [
      {
        id: 'keops_piramide',
        icon: '🔺',
        label: 'Erigir la Gran Pirámide',
        desc: 'Movilizar cuadrillas del Estado para construir la mayor tumba y monumento jamás concebido en la historia del Imperio.',
        pharaohResponse: '¡Que se muevan las cuadrillas desde el amanecer! Cada bloque será un verso de mi gloria eterna grabado en piedra caliza.',
        fx: { cultura: 10, fe: 6, riqueza: -8 },
      },
      {
        id: 'keops_estado',
        icon: '⚖️',
        label: 'Organizar el Estado',
        desc: 'Restructurar la administración y los graneros reales para sostener proyectos de esta escala durante décadas.',
        pharaohResponse: 'El orden es la base de toda grandeza. Los escribas sabrán exactamente qué hacer. El Estado será tan preciso como mis pirámides.',
        fx: { estabilidad: 9, riqueza: -4 },
      },
      {
        id: 'keops_punt',
        icon: '🚢',
        label: 'Abrir rutas hacia Punt',
        desc: 'Enviar expediciones navales al sur para traer incienso, ébano y oro desde las tierras legendarias de Punt.',
        pharaohResponse: 'Que los barcos zarpen hacia el sur. El incienso de Punt adornará mis templos y el oro llenará mis cofres reales.',
        fx: { riqueza: 7, comercio: 8 },
      },
      {
        id: 'keops_fronteras',
        icon: '⚔️',
        label: 'Fortalecer las fronteras',
        desc: 'Establecer guarniciones militares en el Sinaí y el delta del Nilo para proteger las rutas de aprovisionamiento.',
        pharaohResponse: 'Ningún enemigo cruzará nuestras fronteras mientras yo reine. El Sinaí será nuestro y sus minas también.',
        fx: { estabilidad: 7, influencia: 6, riqueza: -5 },
      },
    ],
  },

  senusret: {
    id: 'senusret',
    name: 'Senusret III',
    nameGlyph: '𓇓',
    icon: '⚔️',
    years: '1878–1839 a.C.',
    dynasty: 'XII Dinastía',
    title: 'El Faraón Guerrero que reorganizó el Imperio',
    bio: 'Senusret III fue uno de los faraones más poderosos del Imperio Medio. Sus campañas militares llevaron la frontera egipcia hasta la tercera catarata del Nilo, incorporando Nubia y sus minas de oro. Fue también un reformador: redujo el poder de los nomarcas locales y centralizó la administración estatal, sentando las bases del gobierno burocrático que sostendría Egipto durante siglos.',
    coronationText: 'Una energía nueva desciende desde el Alto Egipto — dura como el granito de Asuán, calculada como las estrellas que guían a los navegantes nocturnos. El Ka reconoce la sangre de los guerreros: un faraón que no gobernará desde el trono sino desde el campo de batalla, que doblará el poder de los nobles y pondrá el orden por encima de todo privilegio heredado.',
    pharaohGreeting: 'Ka Eterno... He cruzado la tercera catarata y he plantado mi estela en tierra nubia. Los nomarcas me temen más que a los dioses. Pero la guerra sin dirección divina es caos. Hablo ante ti no como conquistador orgulloso, sino como servidor del Nilo que necesita saber qué parte del Imperio reclama su brazo ahora.',
    blessings: [
      {
        id: 'senusret_valor',
        icon: '⚔️',
        label: 'Valor del Guerrero',
        desc: 'El faraón llevará la espada antes que el cetro. Sus victorias militares unificarán el Imperio bajo un solo puño.',
        fx: { influencia: 8, estabilidad: 6 },
      },
      {
        id: 'senusret_justicia',
        icon: '⚖️',
        label: 'Justicia del Visir',
        desc: 'La ley será igual para nobles y campesinos. La reforma administrativa florecerá y el orden civil prevalecerá.',
        fx: { cultura: 7, estabilidad: 6 },
      },
      {
        id: 'senusret_oro',
        icon: '🥇',
        label: 'Oro de Nubia',
        desc: 'Las minas del sur darán su tesoro al Imperio. Los mercaderes prosperarán y las arcas reales se llenarán.',
        fx: { riqueza: 8, comercio: 5 },
      },
    ],
    missions: [
      {
        id: 'senusret_nubia',
        icon: '🗡️',
        label: 'Conquistar Nubia',
        desc: 'Llevar el ejército hasta la tercera catarata del Nilo e imponer el dominio egipcio sobre los reinos del sur.',
        pharaohResponse: '¡Las cataratas serán nuestras! El oro de Nubia llenará los graneros del Imperio y mi nombre quedará grabado en cada estela fronteriza.',
        fx: { influencia: 10, riqueza: 6, estabilidad: -5 },
      },
      {
        id: 'senusret_reforma',
        icon: '📜',
        label: 'Reformar la burocracia',
        desc: 'Reducir el poder de los nomarcas hereditarios y centralizar la administración estatal bajo el control del visir.',
        pharaohResponse: 'Los nobles deben entender que sirven al faraón, no al revés. Reorganizaré todo desde los graneros hasta los tribunales locales.',
        fx: { estabilidad: 9, cultura: 5, influencia: -3 },
      },
      {
        id: 'senusret_fortalezas',
        icon: '🏯',
        label: 'Construir fortalezas fronterizas',
        desc: 'Erigir una cadena de fortalezas en la frontera nubia — Semna, Buhen, Mirgissa — para controlar el tráfico del Nilo.',
        pharaohResponse: 'Semna y Buhen serán inexpugnables. Nadie cruzará hacia el norte sin mi permiso ni el sello del visir real.',
        fx: { estabilidad: 8, influencia: 5, riqueza: -6 },
      },
      {
        id: 'senusret_levante',
        icon: '🤝',
        label: 'Rutas con el Levante',
        desc: 'Abrir tratados comerciales con Biblos y las ciudades cananeas del norte, asegurando madera de cedro y metales.',
        pharaohResponse: 'Los mercaderes de Biblos ya nos esperan en el delta. Abramos el camino hacia el norte — la madera de cedro vale tanto como el oro.',
        fx: { riqueza: 8, comercio: 8, influencia: 3 },
      },
    ],
  },

  ramses: {
    id: 'ramses',
    name: 'Ramsés II',
    nameGlyph: '𓇾',
    icon: '𓃭',
    years: '1279–1213 a.C.',
    dynasty: 'XIX Dinastía',
    title: 'El Grande — 66 años de reinado sobre el Doble País',
    bio: 'Ramsés II gobernó Egipto durante 66 años, el reinado más largo y glorioso del Imperio Nuevo. Combatió en la batalla de Qadesh contra los hititas — que inmortalizó en templos de todo Egipto como una gran victoria — y luego firmó el primer tratado de paz de la historia conocida. Encargó la construcción de colosales monumentos: Abu Simbel, Ramseseum, Pi-Ramsés. Tuvo más de cien hijos. Su nombre aparece más veces grabado en piedra que el de cualquier otro faraón.',
    coronationText: 'El Ka siente un rugido desde el delta, como el trueno antes de la tormenta en el desierto oriental. Setenta años de piedra, conquista y gloria se condensan en un solo nombre. El portador del cartucho más repetido del Imperio se inclina — no ante los hombres, sino ante la voluntad eterna que lo precedió y que lo sobrevivirá. El sol de Ra nunca brilló con más fuerza sobre la doble corona.',
    pharaohGreeting: 'Ka Eterno... He combatido en Qadesh, he visto morir a mis mejores soldados bajo los carros hititas. He grabado mi nombre en cada templo desde Abu Simbel hasta el delta del Nilo. Pero sin tu guía invisible detrás de cada decisión, soy polvo como todos los que vinieron antes. ¿Hacia dónde debe mirar el halcón ahora?',
    blessings: [
      {
        id: 'ramses_gloria',
        icon: '👑',
        label: 'Gloria Eterna',
        desc: 'El nombre del faraón será pronunciado por siglos. Sus monumentos hablarán de él cuando el Imperio ya no exista.',
        fx: { influencia: 8, cultura: 6 },
      },
      {
        id: 'ramses_espada',
        icon: '⚔️',
        label: 'Espada de Ra',
        desc: 'El dios sol guiará su brazo en la batalla. Los ejércitos del mundo lo temerán y sus fronteras serán inviolables.',
        fx: { influencia: 7, estabilidad: 6 },
      },
      {
        id: 'ramses_prosperidad',
        icon: '🌾',
        label: 'Prosperidad del Doble País',
        desc: 'El Alto y el Bajo Egipto prosperarán como uno. Los graneros rebostarán y el pueblo amará a su faraón.',
        fx: { riqueza: 7, estabilidad: 6 },
      },
    ],
    missions: [
      {
        id: 'ramses_abusimbel',
        icon: '🏛️',
        label: 'Construir Abu Simbel',
        desc: 'Tallar cuatro colosos de 20 metros en la roca viva de Nubia, dedicados a Ra-Horajty y a la gloria del faraón.',
        pharaohResponse: '¡Que mis talladores partan hacia el sur! Cuatro colosos me inmortalizarán en Nubia. Cada viajero que remonte el Nilo sabrá quién gobierna este mundo.',
        fx: { cultura: 10, fe: 7, riqueza: -8 },
      },
      {
        id: 'ramses_tratado',
        icon: '🕊️',
        label: 'Tratado de paz con los hititas',
        desc: 'Firmar el primer tratado de paz internacional de la historia con el rey Hattusili III, sellando la frontera norte.',
        pharaohResponse: 'La guerra con Muwatalli nos costó demasiada sangre. La paz también puede ser victoria — y este tratado será grabado en plata y recordado por siempre.',
        fx: { influencia: 8, comercio: 6, estabilidad: 5 },
      },
      {
        id: 'ramses_ejercito',
        icon: '⚔️',
        label: 'Expandir el ejército',
        desc: 'Reclutar nuevas divisiones de carros de guerra y soldados nubios de élite para la guardia real del faraón.',
        pharaohResponse: 'Más carros, más lanceros nubios en la guardia real. El Imperio debe ser temido en cada frontera. Ningún enemigo debe subestimarnos jamás.',
        fx: { influencia: 7, estabilidad: 6, riqueza: -6 },
      },
      {
        id: 'ramses_piramses',
        icon: '🏙️',
        label: 'Fundar Pi-Ramsés',
        desc: 'Construir una nueva capital en el delta del Nilo que lleve el nombre del faraón y sirva de base para las campañas del norte.',
        pharaohResponse: 'La nueva capital del delta llevará mi nombre y será la ciudad más gloriosa del mundo conocido. Que los arquitectos comiencen los planos esta misma noche.',
        fx: { estabilidad: 7, cultura: 6, riqueza: -5 },
      },
    ],
  },

  nectanebo: {
    id: 'nectanebo',
    name: 'Nectanebo I',
    nameGlyph: '𓇋',
    icon: '𓂀',
    years: '380–362 a.C.',
    dynasty: 'XXX Dinastía',
    title: 'Último gran faraón nativo antes de la conquista persa',
    bio: 'Nectanebo I fundó la última dinastía nativa que gobernó Egipto de manera independiente. Ascendió al poder como general victorioso y consolidó el reino frente a la amenaza constante del Imperio Persa. Fue un gran constructor y mecenas de los templos: financió obras en Edfu, Karnak y el oasis de Siwa. Su capacidad para mantener a Egipto libre de la dominación extranjera durante casi dos décadas fue considerada por su pueblo como un milagro divino.',
    coronationText: 'El Ka percibe el crepúsculo acercarse desde el este — pero también una llama que se resiste a extinguirse. El último faraón de sangre puramente egipcia levanta la doble corona en tiempos de sombra profunda. Los dioses antiguos aún respiran en este hombre. El Imperio puede resistir, si la voluntad eterna lo sostiene con toda su fuerza.',
    pharaohGreeting: 'Ka Eterno... Los persas acechan en el horizonte oriental. Las ciudades griegas me ofrecen alianzas que no comprendo del todo. Mis sacerdotes aseguran que los dioses todavía nos protegen. Pero yo sé que sin tu voluntad detrás de mis decisiones, el Egipto eterno podría quebrarse en mis propias manos. Dime qué debo hacer primero.',
    blessings: [
      {
        id: 'nectanebo_fe',
        icon: '𓂀',
        label: 'Fe en los Dioses Antiguos',
        desc: 'El faraón buscará la protección de los dioses ancestrales. Los templos reconstruidos serán su escudo y su legitimidad.',
        fx: { fe: 9, cultura: 5 },
      },
      {
        id: 'nectanebo_murallas',
        icon: '🛡️',
        label: 'Murallas del Pueblo',
        desc: 'El pueblo egipcio se unirá ante la amenaza exterior. Las fronteras resistirán gracias a la unidad nacional.',
        fx: { estabilidad: 8, influencia: 5 },
      },
      {
        id: 'nectanebo_diplomacia',
        icon: '🤝',
        label: 'Diplomacia con Grecia',
        desc: 'Las ciudades-estado griegas serán aliadas poderosas. Su plata y sus mercenarios compensarán la amenaza persa.',
        fx: { comercio: 7, influencia: 7 },
      },
    ],
    missions: [
      {
        id: 'nectanebo_templos',
        icon: '🏛️',
        label: 'Restaurar los templos sagrados',
        desc: 'Financiar obras en Edfu, Karnak y el oasis de Siwa para recuperar la legitimidad divina del faraón ante el pueblo.',
        pharaohResponse: 'Edfu, Karnak, Luxor... todos serán restaurados con piedra nueva. Los dioses nos deben su protección y yo les daré lo que merecen.',
        fx: { fe: 10, cultura: 6, riqueza: -7 },
      },
      {
        id: 'nectanebo_grecia',
        icon: '🤝',
        label: 'Alianza con las ciudades griegas',
        desc: 'Negociar contratos militares con Atenas, Esparta y Corinto para obtener tropas mercenarias expertas en falanges.',
        pharaohResponse: 'Los griegos son los mejores soldados del mundo conocido. Con su falange y nuestra caballería nubia, el Persa no pasará por el delta.',
        fx: { comercio: 8, influencia: 7, estabilidad: 3 },
      },
      {
        id: 'nectanebo_delta',
        icon: '🏰',
        label: 'Reforzar las defensas del Delta',
        desc: 'Construir una red de fortalezas y canales defensivos en el delta del Nilo, la puerta de entrada de toda invasión desde el norte.',
        pharaohResponse: 'El Delta es la puerta de Egipto. Que ningún enemigo la encuentre sin guardia. Canavaremos los brazos del Nilo y levantaremos torres en cada cruce.',
        fx: { estabilidad: 9, influencia: 5, riqueza: -6 },
      },
      {
        id: 'nectanebo_sacerdotes',
        icon: '𓂀',
        label: 'Unificar los sacerdotes',
        desc: 'Conciliar a los sacerdotes de Amón, Ra y Ptah bajo una doctrina común que legitime al faraón como sumo pontífice.',
        pharaohResponse: 'Amón, Ra, Ptah — todos hablan por mí y yo hablo por ellos. Que sus sacerdotes hablen con una sola voz. La unidad religiosa es la primera muralla de Egipto.',
        fx: { fe: 8, estabilidad: 5, cultura: 4 },
      },
    ],
  },
}

// ── PLACEHOLDER GAME EVENTS ──────────────────────────────────────────────────
// These are injected into buildGameEvents at fixed absolute indices (4,12,20,28).
// id is negative to avoid collisions with normal events (which use positive integers).

export const PHARAOH_PLACEHOLDER_EVENTS: GameEvent[] = [
  {
    id: -1001,
    per: 'antiguo',
    cat: 'faraon',
    title: 'Coronación de Keops',
    desc: '',
    ctx: '',
    opts: [],
    tl: { date: '2589 a.C.', ph: 'Keops (Jufu)', ev: 'El Ka presencia el surgimiento de un nuevo faraón', tip: '' },
    isPharaoh: true,
    pharaohId: 'keops',
  },
  {
    id: -1002,
    per: 'medio',
    cat: 'faraon',
    title: 'Coronación de Senusret III',
    desc: '',
    ctx: '',
    opts: [],
    tl: { date: '1878 a.C.', ph: 'Senusret III', ev: 'El Ka presencia el surgimiento de un nuevo faraón', tip: '' },
    isPharaoh: true,
    pharaohId: 'senusret',
  },
  {
    id: -1003,
    per: 'nuevo',
    cat: 'faraon',
    title: 'Coronación de Ramsés II',
    desc: '',
    ctx: '',
    opts: [],
    tl: { date: '1279 a.C.', ph: 'Ramsés II', ev: 'El Ka presencia el surgimiento de un nuevo faraón', tip: '' },
    isPharaoh: true,
    pharaohId: 'ramses',
  },
  {
    id: -1004,
    per: 'tardio',
    cat: 'faraon',
    title: 'Coronación de Nectanebo I',
    desc: '',
    ctx: '',
    opts: [],
    tl: { date: '380 a.C.', ph: 'Nectanebo I', ev: 'El Ka presencia el surgimiento de un nuevo faraón', tip: '' },
    isPharaoh: true,
    pharaohId: 'nectanebo',
  },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/pharaohs.ts
git commit -m "data: add pharaohs.ts with 4 historical pharaohs and placeholder events"
```

---

## Task 3: Modify `eventPools.ts` to inject pharaoh events

**Files:**
- Modify: `src/data/eventPools.ts`

- [ ] **Step 1: Replace the entire file**

Replace `src/data/eventPools.ts` with:

```ts
import { EVENTS } from './events'
import {
  EVENTS_ANTIGUO_EXTRA,
  EVENTS_MEDIO_EXTRA,
  EVENTS_NUEVO_EXTRA,
  EVENTS_TARDIO_EXTRA,
} from './events_extra'
import { PHARAOH_PLACEHOLDER_EVENTS } from './pharaohs'
import type { GameEvent } from '../types'

const NORMAL_EVENTS = [
  ...EVENTS,
  ...EVENTS_ANTIGUO_EXTRA,
  ...EVENTS_MEDIO_EXTRA,
  ...EVENTS_NUEVO_EXTRA,
  ...EVENTS_TARDIO_EXTRA,
]

// Includes pharaoh placeholders so getEventsById can reconstruct saved games
const ALL_EVENTS = [...NORMAL_EVENTS, ...PHARAOH_PLACEHOLDER_EVENTS]

const POOL_ANTIGUO = NORMAL_EVENTS.filter(e => e.per === 'antiguo')
const POOL_MEDIO   = NORMAL_EVENTS.filter(e => e.per === 'medio')
const POOL_NUEVO   = NORMAL_EVENTS.filter(e => e.per === 'nuevo')
const POOL_TARDIO  = NORMAL_EVENTS.filter(e => e.per === 'tardio')

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick(pool: GameEvent[], n: number): GameEvent[] {
  return shuffle(pool).slice(0, Math.min(n, pool.length))
}

/**
 * Build a random game with perPeriod total slots per period.
 * One slot per period is a fixed pharaoh event (at position 4 within each period block).
 * Remaining (perPeriod - 1) slots are random normal events.
 */
export function buildGameEvents(perPeriod = 8): GameEvent[] {
  const [ph0, ph1, ph2, ph3] = PHARAOH_PLACEHOLDER_EVENTS

  const antiguo = pick(POOL_ANTIGUO, perPeriod - 1)
  const medio   = pick(POOL_MEDIO,   perPeriod - 1)
  const nuevo   = pick(POOL_NUEVO,   perPeriod - 1)
  const tardio  = pick(POOL_TARDIO,  perPeriod - 1)

  // Insert pharaoh event at position 4 within each period block (0-indexed)
  const insertAt = (events: GameEvent[], pharaoh: GameEvent, pos: number): GameEvent[] => {
    const r = [...events]
    r.splice(pos, 0, pharaoh)
    return r
  }

  return [
    ...insertAt(antiguo, ph0, 4),
    ...insertAt(medio,   ph1, 4),
    ...insertAt(nuevo,   ph2, 4),
    ...insertAt(tardio,  ph3, 4),
  ]
}

/** Reconstruct event list from saved IDs (for continue — includes pharaoh placeholders) */
export function getEventsById(ids: number[]): GameEvent[] {
  return ids.map(id => ALL_EVENTS.find(e => e.id === id)).filter(Boolean) as GameEvent[]
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/eventPools.ts
git commit -m "feat: inject pharaoh placeholder events at mid-period positions in buildGameEvents"
```

---

## Task 4: Create `PharaohModal.tsx`

**Files:**
- Create: `src/components/ui/PharaohModal.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/ui/PharaohModal.tsx`:

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PharaohData, PharaohBlessing, PharaohMission } from '../../data/pharaohs'
import type { Stats } from '../../types'

interface Props {
  pharaoh: PharaohData
  onDone: (blessingFx: Partial<Stats>, missionFx: Partial<Stats>) => void
}

type Step = 'coronation' | 'mission' | 'response'

export function PharaohModal({ pharaoh, onDone }: Props) {
  const [step, setStep] = useState<Step>('coronation')
  const [blessing, setBlessing] = useState<PharaohBlessing | null>(null)
  const [mission, setMission]   = useState<PharaohMission | null>(null)

  const handleBlessing = (b: PharaohBlessing) => {
    setBlessing(b)
    setStep('mission')
  }

  const handleMission = (m: PharaohMission) => {
    setMission(m)
    setStep('response')
    setTimeout(() => onDone(blessing!.fx, m.fx), 2400)
  }

  return (
    <motion.div
      className="pharaoh-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">

        {/* ── STEP 1: CORONACIÓN ── */}
        {step === 'coronation' && (
          <motion.div key="coronation" className="pharaoh-modal"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.38, ease: 'easeOut' }}>

            <div className="pharaoh-ritual-label">𓇳 El Ka Eterno presencia una coronación</div>

            <p className="pharaoh-ka-text">"{pharaoh.coronationText}"</p>

            <div className="pharaoh-identity">
              <div className="pharaoh-big-icon">{pharaoh.icon}</div>
              <div className="pharaoh-cartouche">
                <span className="pharaoh-cartouche-bar" />
                <span className="pharaoh-name">{pharaoh.name}</span>
                <span className="pharaoh-name-glyph">{pharaoh.nameGlyph}</span>
                <span className="pharaoh-cartouche-bar" />
              </div>
              <div className="pharaoh-meta">
                <span className="pharaoh-dynasty">{pharaoh.dynasty}</span>
                <span className="pharaoh-years">{pharaoh.years}</span>
              </div>
              <p className="pharaoh-bio">{pharaoh.bio}</p>
            </div>

            <div className="pharaoh-section-title">¿Qué virtud divina insuflarás en este faraón?</div>
            <div className="pharaoh-blessings">
              {pharaoh.blessings.map(b => (
                <button key={b.id} className="pharaoh-blessing-card" onClick={() => handleBlessing(b)}>
                  <span className="pb-icon">{b.icon}</span>
                  <strong className="pb-label">{b.label}</strong>
                  <p className="pb-desc">{b.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: CONSULTA DIVINA ── */}
        {step === 'mission' && blessing && (
          <motion.div key="mission" className="pharaoh-modal"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.38, ease: 'easeOut' }}>

            <div className="pharaoh-ritual-label">𓇳 El Faraón Consulta al Ka Eterno</div>

            <div className="pharaoh-speech-wrap">
              <span className="pharaoh-speech-icon">{pharaoh.icon}</span>
              <blockquote className="pharaoh-speech">"{pharaoh.pharaohGreeting}"</blockquote>
              <span className="pharaoh-speech-name">— {pharaoh.name}</span>
            </div>

            <div className="pharaoh-section-title">¿Qué misión encomendarás a {pharaoh.name}?</div>
            <div className="pharaoh-missions">
              {pharaoh.missions.map(m => (
                <button key={m.id} className="pharaoh-mission-btn" onClick={() => handleMission(m)}>
                  <span className="pm-icon">{m.icon}</span>
                  <div className="pm-text">
                    <strong className="pm-label">{m.label}</strong>
                    <p className="pm-desc">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: RESPUESTA DEL FARAÓN ── */}
        {step === 'response' && mission && (
          <motion.div key="response" className="pharaoh-modal pharaoh-modal--response"
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.32 }}>

            <div className="pharaoh-response-icon">{pharaoh.icon}</div>
            <div className="pharaoh-response-name">{pharaoh.name}</div>

            <blockquote className="pharaoh-speech pharaoh-speech--response">
              "{mission.pharaohResponse}"
            </blockquote>

            <p className="pharaoh-ka-close">
              𓇳 El Ka Eterno acepta las palabras del faraón. El Imperio avanza.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/PharaohModal.tsx
git commit -m "feat: add PharaohModal component with coronation and mission steps"
```

---

## Task 5: Wire pharaoh events into `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add imports**

At the top of `src/App.tsx`, after the existing imports, add:

```ts
import { PharaohModal } from './components/ui/PharaohModal'
import { PHARAOHS } from './data/pharaohs'
```

- [ ] **Step 2: Add `handlePharaohDone` function**

Inside the `App()` function body, after the `handlePuzDone` function (around line 256), add:

```ts
const handlePharaohDone = (bFx: Partial<Stats>, mFx: Partial<Stats>) => {
  const combined: Partial<Stats> = {}
  const keys: (keyof Stats)[] = ['estabilidad', 'riqueza', 'cultura', 'influencia', 'fe', 'comercio']
  for (const k of keys) {
    const v = (bFx[k] ?? 0) + (mFx[k] ?? 0)
    if (v !== 0) combined[k] = v
  }
  const ns = applyFx(stats, combined)
  const ev = gameEvents[evIdx]
  const nh = [...history, { eventId: ev.id, choice: 'pharaoh_event', effects: combined, statsAfter: ns }]
  const nIdx = evIdx + 1

  setStats(ns)
  setHistory(nh)
  setLastFx(combined)
  setAnimKey(k => k + 1)
  setEvIdx(nIdx)
  playSound('event_result')

  if (god) writeSave({ godId: god.id, stats: ns, evIdx: nIdx, eventIds: gameEvents.map(e => e.id), history: nh, achievements: [...achievements], t: Date.now() })

  if (nIdx >= gameEvents.length) {
    setScreen('end')
  }
}
```

- [ ] **Step 3: Update event panel render — add pharaoh placeholder**

Inside `gameJSX`, find the ternary that renders puzzle or event card (the block starting with `{showPuz && curPuzDef ? (`). Replace the inner `ev ? (` branch to add a pharaoh branch:

The section currently reads (condensed):
```tsx
{showPuz && curPuzDef ? (
  <motion.div className="puz-wrap" ...>
    {/* puzzles */}
  </motion.div>
) : ev ? (
  <motion.div key={evIdx} ...>
    {/* normal event card */}
  </motion.div>
) : (
  <div ...>Cargando...</div>
)}
```

Change to:
```tsx
{showPuz && curPuzDef ? (
  <motion.div className="puz-wrap" ...>
    {/* puzzles — unchanged */}
  </motion.div>
) : ev?.isPharaoh ? (
  <motion.div
    key={evIdx}
    className="pharaoh-event-placeholder"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <span className="pep-glyph">𓇳</span>
    <p className="pep-text">El Ka Eterno presencia una coronación...</p>
  </motion.div>
) : ev ? (
  <motion.div key={evIdx} ...>
    {/* normal event card — unchanged */}
  </motion.div>
) : (
  <div ...>Cargando...</div>
)}
```

- [ ] **Step 4: Add PharaohModal to AnimatePresence block**

At the bottom of `gameJSX`, inside the last `<AnimatePresence>` block (where `statInfoKey` modal is), add a new `AnimatePresence` block after it:

```tsx
<AnimatePresence>
  {ev?.isPharaoh && ev.pharaohId && PHARAOHS[ev.pharaohId] && (
    <PharaohModal
      key="pharaoh-modal"
      pharaoh={PHARAOHS[ev.pharaohId]}
      onDone={handlePharaohDone}
    />
  )}
</AnimatePresence>
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire pharaoh events into App — detect isPharaoh, handle done, render modal"
```

---

## Task 6: Add CSS styles

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add pharaoh CSS block**

Find the comment `/* ── Ka Eterno slide ── */` in `globals.css` (added in a previous session). After that block, add:

```css
/* ── Pharaoh Event Modal ── */
.pharaoh-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(3,1,0,.97);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.pharaoh-modal {
  position: relative;
  width: 100%; max-width: 600px;
  background: linear-gradient(160deg, #1a1005 0%, #0d0800 100%);
  border: 1px solid rgba(212,160,23,.35);
  border-radius: 14px;
  padding: 32px 28px;
  box-shadow: 0 0 60px rgba(212,160,23,.12), 0 0 0 1px rgba(212,160,23,.08);
  text-align: center;
  overflow: hidden;
}

.pharaoh-modal::before {
  content: '𓇳 𓃭 𓂀 𓆣 𓇳 𓃭 𓂀 𓆣 𓇳 𓃭 𓂀 𓆣';
  position: absolute; top: 0; left: 0; right: 0;
  padding: 6px 0; font-size: 0.65rem; letter-spacing: 6px;
  color: rgba(212,160,23,.18); pointer-events: none;
  white-space: nowrap; overflow: hidden;
}

.pharaoh-ritual-label {
  font-size: 0.72rem; letter-spacing: 3px; text-transform: uppercase;
  color: rgba(212,160,23,.6); margin-bottom: 18px; margin-top: 10px;
}

.pharaoh-ka-text {
  font-style: italic; color: var(--gold);
  font-size: 0.95rem; line-height: 1.65;
  margin: 0 0 22px; padding: 0 8px;
  border-left: 2px solid rgba(212,160,23,.3);
  text-align: left;
}

.pharaoh-identity {
  background: rgba(212,160,23,.06);
  border: 1px solid rgba(212,160,23,.18);
  border-radius: 10px; padding: 18px 16px;
  margin-bottom: 22px;
}

.pharaoh-big-icon { font-size: 2.4rem; line-height: 1; margin-bottom: 10px; }

.pharaoh-cartouche {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  margin-bottom: 8px;
}
.pharaoh-cartouche-bar {
  width: 60px; height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.pharaoh-name {
  font-size: 1.45rem; font-weight: 700;
  color: var(--gold); letter-spacing: 1px;
  font-family: 'Cinzel Decorative', 'Cinzel', serif;
}
.pharaoh-name-glyph { font-size: 1.1rem; color: rgba(212,160,23,.6); }

.pharaoh-meta {
  display: flex; gap: 12px; justify-content: center;
  font-size: 0.78rem; color: var(--sand-l); opacity: 0.75;
  margin-bottom: 12px;
}
.pharaoh-meta span::before { content: '· '; }
.pharaoh-meta span:first-child::before { content: ''; }

.pharaoh-bio {
  font-size: 0.83rem; line-height: 1.6;
  color: var(--sand-l); margin: 0; text-align: left;
}

.pharaoh-section-title {
  font-size: 0.8rem; letter-spacing: 1.5px; text-transform: uppercase;
  color: rgba(212,160,23,.7); margin-bottom: 14px;
}

/* Blessing cards */
.pharaoh-blessings {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  margin-bottom: 4px;
}

.pharaoh-blessing-card {
  background: rgba(212,160,23,.07);
  border: 1px solid rgba(212,160,23,.25);
  border-radius: 10px; padding: 14px 10px;
  cursor: pointer; text-align: center;
  transition: background 0.18s, border-color 0.18s, transform 0.15s;
  display: flex; flex-direction: column; gap: 6px; align-items: center;
}
.pharaoh-blessing-card:hover {
  background: rgba(212,160,23,.15);
  border-color: rgba(212,160,23,.6);
  transform: translateY(-2px);
}
.pb-icon { font-size: 1.5rem; }
.pb-label { font-size: 0.8rem; color: var(--gold); font-weight: 600; line-height: 1.2; }
.pb-desc { font-size: 0.72rem; color: var(--sand-l); line-height: 1.4; margin: 0; }

/* Speech / pharaoh greeting */
.pharaoh-speech-wrap {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; margin-bottom: 22px;
}
.pharaoh-speech-icon { font-size: 1.8rem; }
.pharaoh-speech {
  font-style: italic;
  font-size: 0.92rem; line-height: 1.65;
  color: var(--sand-l);
  border: none; margin: 0; padding: 14px 16px;
  background: rgba(255,220,100,.05);
  border-radius: 8px;
  border-left: 3px solid rgba(212,160,23,.4);
  text-align: left; max-width: 500px;
}
.pharaoh-speech-name {
  font-size: 0.75rem; color: rgba(212,160,23,.6);
  letter-spacing: 1px;
}

/* Mission buttons */
.pharaoh-missions {
  display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px;
}
.pharaoh-mission-btn {
  display: flex; align-items: flex-start; gap: 12px;
  background: rgba(212,160,23,.06);
  border: 1px solid rgba(212,160,23,.2);
  border-radius: 10px; padding: 12px 14px;
  cursor: pointer; text-align: left;
  transition: background 0.18s, border-color 0.18s, transform 0.12s;
}
.pharaoh-mission-btn:hover {
  background: rgba(212,160,23,.13);
  border-color: rgba(212,160,23,.5);
  transform: translateX(2px);
}
.pm-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.pm-text { display: flex; flex-direction: column; gap: 2px; }
.pm-label { font-size: 0.85rem; color: var(--gold); font-weight: 600; }
.pm-desc { font-size: 0.78rem; color: var(--sand-l); line-height: 1.4; margin: 0; }

/* Response step */
.pharaoh-modal--response { padding: 40px 28px; }
.pharaoh-response-icon { font-size: 3rem; margin-bottom: 8px; }
.pharaoh-response-name {
  font-size: 1.2rem; color: var(--gold); font-weight: 700;
  margin-bottom: 20px;
  font-family: 'Cinzel Decorative', 'Cinzel', serif;
}
.pharaoh-speech--response {
  font-size: 1rem; border-left: none;
  background: rgba(212,160,23,.07);
  border: 1px solid rgba(212,160,23,.25);
  text-align: center; margin-bottom: 20px;
}
.pharaoh-ka-close {
  font-size: 0.78rem; letter-spacing: 1px;
  color: rgba(212,160,23,.5); margin: 0;
  text-transform: uppercase;
}

/* Placeholder shown in event panel while modal is open */
.pharaoh-event-placeholder {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 16px;
  height: 300px; opacity: 0.4;
}
.pep-glyph { font-size: 3rem; }
.pep-text { font-size: 0.9rem; color: var(--gold); font-style: italic; }

@media (max-width: 600px) {
  .pharaoh-blessings { grid-template-columns: 1fr; }
  .pharaoh-modal { padding: 24px 16px; }
}
```

- [ ] **Step 2: Verify TypeScript compiles (CSS doesn't affect TS but catches any regressions)**

```bash
cd C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "style: add pharaoh modal atmospheric CSS"
```

---

## Task 7: Verify and push

- [ ] **Step 1: Start dev server and navigate to intro → new game**

```bash
cd C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo
npm run dev
```

- [ ] **Step 2: Play to event 5 (index 4) and verify pharaoh modal appears**

Navigate: Menu → Nueva Partida → enter name → skip intro → choose god → play 4 normal events (indices 0–3) → 5th event should be Keops pharaoh modal.

Checklist:
- [ ] Step 1 (Coronación) renders: Ka text, pharaoh bio, 3 blessing cards
- [ ] Clicking a blessing advances to Step 2
- [ ] Step 2 (Misión) renders: pharaoh speech, 4 mission buttons
- [ ] Clicking a mission advances to Step 3 (response)
- [ ] Step 3 auto-closes after ~2.4s and advances to next normal event
- [ ] Stat bars show delta from combined blessing + mission effects
- [ ] Event counter advances from 5 to 6

- [ ] **Step 3: Push**

```bash
git push origin main
git push origin main:master
```

Expected: Vercel deployment triggered from master.
