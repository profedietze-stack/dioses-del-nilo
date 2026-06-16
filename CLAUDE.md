# Dioses del Nilo — CLAUDE.md

Juego educativo sobre historia del Antiguo Egipto. ProfeD. (profedietze@gmail.com).

## Stack

- Vite + React 18 + TypeScript strict
- Framer Motion v11 (AnimatePresence, motion.div, motion.path)
- CSS puro en `src/styles/globals.css` — sin Tailwind, sin CSS modules
- Save key localStorage: `diosesNilo_v3`
- Dev port: 5182 (ver `.claude/launch.json`)

## Deploy

- GitHub: https://github.com/profedietze-stack/dioses-del-nilo
- Ramas: `main` y `master` (ambas reciben push)
- Vercel: https://dioses-del-nilo.vercel.app/ (auto-deploy desde `master`)

## Estructura de screens

```
Screen = 'menu' | 'name' | 'intro' | 'godSelect' | 'game' | 'papiros' | 'end' | 'periodTransition'
```

Flujo nueva partida: `menu → name → intro → godSelect → game`

## Archivos clave

| Archivo | Rol |
|---|---|
| `src/App.tsx` | Estado global, routing entre screens, handleChoice, period boundary detection |
| `src/types/index.ts` | Todos los tipos: Stats, Screen, PeriodTransitionData, SaveData, etc. |
| `src/data/events.ts` + `events_extra.ts` | Eventos del juego (~32 por partida, shuffled) |
| `src/data/eventPools.ts` | `buildGameEvents(perPeriod)` y `getEventsById()` |
| `src/data/periods.ts` | PERIODS[], STAT_ICONS, STAT_LABELS, STAT_COLORS |
| `src/data/periodLore.ts` | PLAY_STYLES, PERIOD_LORE, getLegacyVerdict, ADVISOR_PERIOD_LINES |
| `src/data/advisors.ts` | ADVISORS — IDs: aldeana, escriba, sacerdote, general |
| `src/data/glossary.ts` | GLOSSARY — glosario de términos egipcios |
| `src/utils/save.ts` | loadSave / writeSave / clearSave |
| `src/utils/devParams.ts` | URL params para testing DEV |
| `src/styles/globals.css` | Todo el CSS (design tokens en :root) |

## Screens implementadas

### NameScreen (`src/components/screens/NameScreen.tsx`)
- Input nombre del faraón, mínimo 4 caracteres
- Validación en tiempo real con hint dinámico
- Enter para submitear

### IntroScreen (`src/components/screens/IntroScreen.tsx`)
- 5 slides con animación direccional
- Slide 0: mapa SVG de Egipto + saludo con nombre del jugador
- Slide 2: mapa interactivo con 6 regiones clickeables
- Slide 4: tutorial de stats + consejeros en grid 2×2
- Botón "Saltar intro ›"

### PeriodTransitionScreen (`src/components/screens/PeriodTransitionScreen.tsx`)
- Aparece al cruzar el límite de cada período (evIdx cruza múltiplo de perP)
- Secciones: Header → Legado (verdict+stats) → Estilo de gobierno → 4 consejeros → Hecho histórico → Oráculo → Próximo período → CTA
- Props: `{ data: PeriodTransitionData, onContinue: () => void }`

### PapirosScreen (`src/components/screens/PapirosScreen.tsx`)
- Tabs: Logros | Línea de Tiempo | Historia | Glosario
- Glosario con filtro por categoría

## Lógica de períodos

```ts
const perP = totalEvents / 4  // eventos por período
const fromPIdx = Math.floor(evIdx / perP)
const toPIdx   = Math.floor(nIdx  / perP)
// Si toPIdx > fromPIdx && fromPIdx < 3 → mostrar PeriodTransitionScreen
```

4 períodos: antiguo (idx 0), medio (1), nuevo (2), tardio (3)

## Consejeros

| ID | Nombre | Stat |
|---|---|---|
| `aldeana` | Nefertari | estabilidad |
| `escriba` | Heqanakhte | riqueza |
| `sacerdote` | Amenhotep | cultura |
| `general` | Meritaten | influencia |

## Sistemas DEV (solo `import.meta.env.DEV`)

Invisibles para jugadores en producción — Vite los elimina en build.

### Debug Panel (`src/components/dev/DebugPanel.tsx`)
- Botón 🐛 esquina inferior derecha
- Sliders para evIdx y 4 stats
- Botones: Skip evento, P1→P2/P2→P3/P3→P4, → End, → Menú
- Keyboard: `Shift+→` salta evento, `Shift+P` triggerear transición de período

### Error Boundary (`src/components/dev/ErrorBoundary.tsx`)
- DEV: muestra stack trace completo + botón "Intentar recuperar"
- PROD: mensaje friendly "Los dioses interrumpieron el reinado" + reload

### URL params (`src/utils/devParams.ts`)
```
?godId=ra&evIdx=7&estabilidad=10&riqueza=45&cultura=60&influencia=30
```
Carga el juego directamente con ese estado al abrir la URL.

## Convenciones CSS

- Variables en `:root`: `--gold`, `--stone`, `--stone-m`, `--stone-l`, `--nile-l`, `--papyrus`, `--dim`, `--font-title`
- Prefijos de clases por componente: `pt-*` (PeriodTransition), `intro-*` (Intro), `ns-*` (NameScreen), `dbg-*` (DebugPanel)
- Media query responsive: `@media (max-width: 600px)`

## Encoding

NUNCA usar PowerShell `Set-Content` para escribir archivos con emojis o caracteres especiales. Usar siempre el Write tool de Claude o Python binario.
