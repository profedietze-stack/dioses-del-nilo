# Pharaoh Events — Design Spec
**Date:** 2026-06-21  
**Project:** Dioses del Nilo  
**Status:** Approved

---

## Overview

Add 4 fixed "pharaoh events" — one per historical period — that replace a normal event slot at the midpoint of each period. Each pharaoh event is a 2-step mystical modal:

1. **Coronación del Ka** — The Ka witnesses a new pharaoh rising. Player chooses a divine blessing (stat boost).
2. **Consulta Divina** — The pharaoh addresses the Ka with reverence, asking for divine direction. Player assigns a mission (stat effect).

Purpose: reinforce the "Ka Eterno" identity established in the intro, and give students direct engagement with historically accurate pharaohs.

---

## Pharaohs (Fixed, One Per Period)

| Event Index | Period | Pharaoh | Years |
|---|---|---|---|
| 4 | Antiguo Imperio | **Keops (Jufu)** | 2589–2566 a.C. |
| 12 | Imperio Medio | **Senusret III** | 1878–1839 a.C. |
| 20 | Imperio Nuevo | **Ramsés II** | 1279–1213 a.C. |
| 28 | Período Tardío | **Nectanebo I** | 380–362 a.C. |

Total game events = 32. Periods of 8 each. Pharaoh replaces slot at index 4 within each period (mid-period).

---

## Data Model

### `PharaohBlessing`
```ts
interface PharaohBlessing {
  id: string
  icon: string
  label: string        // "Sabiduría Eterna"
  desc: string         // 1 sentence — what this blessing means historically
  fx: Partial<Stats>   // stat effects (e.g. { cultura: +8, fe: +5 })
}
```

### `PharaohMission`
```ts
interface PharaohMission {
  id: string
  icon: string
  label: string              // "Construir un gran templo"
  desc: string               // 1 sentence — historical context
  pharaohResponse: string    // Pharaoh's 1-sentence reply when assigned this mission
  fx: Partial<Stats>
}
```

### `PharaohData`
```ts
interface PharaohData {
  id: string
  name: string               // "Keops"
  nameGlyph: string          // hieroglyph or icon for name cartouche
  icon: string               // main visual symbol
  years: string              // "2589–2566 a.C."
  dynasty: string            // "IV Dinastía"
  title: string              // "Constructor de la Gran Pirámide de Guiza"
  bio: string                // 2-3 sentences — who this pharaoh was historically
  coronationText: string     // Ka's mystical inner monologue on feeling the new pharaoh rise
  pharaohGreeting: string    // Pharaoh's opening words to the Ka (reverent, personal)
  blessings: PharaohBlessing[]  // exactly 3
  missions: PharaohMission[]    // exactly 4
}
```

---

## Event Integration

### `buildGameEvents` modification
- Currently builds 32 events from normal pools.
- Change: build 28 normal events, insert 4 special pharaoh placeholder events at absolute indices 4, 12, 20, 28.
- Pharaoh placeholder event shape (satisfies `GameEvent` interface): `{ id: 'pharaoh_keops', isPharaoh: true, pharaohId: 'keops', per: 'antiguo', ... }` — minimal fields, never rendered as a normal event.
- Requires adding `isPharaoh?: boolean; pharaohId?: string` to `GameEvent` type.

### `App.tsx` render logic
In the event panel render:
```tsx
if (ev.isPharaoh && ev.pharaohId) {
  // render PharaohModal instead of normal event card
}
```

### `handlePharaohDone(blessingFx, missionFx)`
New handler in App.tsx:
- Merges `blessingFx + missionFx` into stats via `applyFx`
- Adds a history entry with `eventId: ev.id`
- Advances `evIdx`
- Triggers normal post-event checks (period transition, end detection)
- No `ConsejerModal` after pharaoh events — the pharaoh modal itself handles the full narrative closure.

---

## Component: `PharaohModal`

**File:** `src/components/ui/PharaohModal.tsx`

**Props:**
```ts
interface Props {
  pharaoh: PharaohData
  onDone: (blessingFx: Partial<Stats>, missionFx: Partial<Stats>) => void
}
```

**Internal state:** `step: 'coronation' | 'mission'`, `chosenBlessing: PharaohBlessing | null`

**Step 1 — Coronación del Ka:**
- Full-screen atmospheric overlay (near-black, gold dust CSS)
- Ka's mystical text (`pharaoh.coronationText`) — italic, gold
- Pharaoh info reveal: icon, name, years, dynasty, bio
- 3 blessing cards — player picks one
- Blessing locked → transition to step 2 with animation

**Step 2 — Consulta Divina:**
- Same atmospheric overlay (continuity)
- Pharaoh's greeting (`pharaoh.pharaohGreeting`) displayed as speech/quote
- 4 mission options (buttons)
- On pick: brief `pharaohResponse` shown (1 sentence), then modal closes and calls `onDone`

**No close/skip button** — pharaoh events are narrative beats, not dismissable. (Consistent with period transition screen.)

---

## CSS

New class block `.pharaoh-modal-*`:
- `.pharaoh-overlay` — `position: fixed; inset: 0; background: rgba(3,1,0,.97); backdrop-filter: blur(6px)` — near opaque, atmospheric
- `.pharaoh-modal` — centered card, max-width 560px, gold border with glow animation
- `.pharaoh-cartouche` — styled name container mimicking Egyptian cartouche shape (border-radius pill with horizontal bars)
- `.pharaoh-ka-text` — italic, gold, larger font — for Ka's mystical inner voice
- `.pharaoh-speech` — quote-styled, sand color — for pharaoh's words to the Ka
- `.pharaoh-blessing-grid` — 3-column grid of blessing cards
- `.pharaoh-mission-list` — vertical list of mission buttons
- `.pharaoh-response` — appears after mission pick: brief pharaoh reply before close
- Background glyph pattern: CSS `::before` pseudo with opacity-10 hieroglyph characters tiled

---

## Narrative Tone Guide

**Ka's voice (coronation text):** Ancient, cosmic, impersonal yet intimate. Third-person perspective of an eternal force observing. Uses elemental imagery (Nile, sun, sand, wind). No contractions. Long sentences.

**Pharaoh's voice (greeting + response):** First-person, reverent, slightly vulnerable. The most powerful human on earth humbled before the Ka. Short sentences. Direct. Emotional but controlled.

**Example — Ramsés II:**
- *Ka text:* "El Ka siente un rugido desde el norte. Setenta años de piedra y conquista se condensan en un solo nombre. El portador del cartucho más repetido del Imperio se inclina — no ante los hombres, sino ante la voluntad que lo precede."
- *Greeting:* "Ka Eterno... He combatido en Qadesh, he grabado mi nombre en cada piedra del Imperio. Pero sin tu voluntad, soy polvo como los demás. ¿Hacia dónde debe mirar el halcón?"

---

## Files Changed

| File | Action |
|---|---|
| `src/types.ts` | Add `isPharaoh?: boolean; pharaohId?: string` to `GameEvent` |
| `src/data/pharaohs.ts` | **New** — all 4 pharaoh objects with full content |
| `src/data/eventPools.ts` | Inject pharaoh placeholders at indices 4, 12, 20, 28 |
| `src/components/ui/PharaohModal.tsx` | **New** — 2-step modal component |
| `src/App.tsx` | Detect `ev.isPharaoh`, render PharaohModal, add `handlePharaohDone` |
| `src/styles/globals.css` | Add `.pharaoh-*` styles |

---

## Out of Scope

- Pharaoh achievements (can be added later)
- Pharaoh events appearing in Papiros history screen (can be added later)
- More than 1 pharaoh per period
- Skippable pharaoh events
