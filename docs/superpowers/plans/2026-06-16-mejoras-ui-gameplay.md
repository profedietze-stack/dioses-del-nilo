# Mejoras UI + Gameplay — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 12 improvements across typography, screens, modals, puzzles, advisors, and end screen for "Dioses del Nilo".

**Architecture:** All changes are self-contained per screen/component. No new state architecture needed — mostly CSS, component edits, and one new modal. Phases ordered by risk (low → high). Each phase is independently shippable.

**Tech Stack:** Vite + React 18 + TypeScript strict, Framer Motion v11, CSS custom properties, save key `diosesNilo_v3`.

---

## 📁 File Map

| File | Action | Reason |
|------|--------|--------|
| `src/styles/globals.css` | Modify | Font size scale, pyramid CSS, end screen papyrus, option label styles |
| `src/components/screens/NameScreen.tsx` | Modify | Add "Volver" button |
| `src/components/screens/PapirosScreen.tsx` | Modify | Accept `fromScreen` prop, back navigates correctly |
| `src/components/screens/IntroScreen.tsx` | Modify | Step 0: PNG map; step 2: pyramid + Esclavos; step 4: all 6 stats |
| `src/components/screens/EndScreen.tsx` | Modify | 10+ titles, narrative text, player name, papyrus aesthetic |
| `src/components/ui/GodModal.tsx` | Modify | Add "Los Dioses Te Hablan" announcement header |
| `src/components/ui/AdvisorPanel.tsx` | Modify | Click chip → AdvisorModal overlay instead of inline bubble |
| `src/components/ui/AdvisorModal.tsx` | **Create** | Full-screen overlay modal for advisor advice |
| `src/App.tsx` | Modify | Pass `fromScreen` to PapirosScreen; pass `playerName` to EndScreen; NameScreen back button handler |
| `public/images/mapa-egipto.png` | **User provides** | Realistic Egyptian empire map image |

---

## 📦 PHASE 1 — Quick Fixes (no new files)

### Task 1: Typography Scale

**Files:**
- Modify: `src/styles/globals.css`

Increase base font size and all UI text. Currently body uses `font-size: 14px` or similar small defaults. Target: make everything ~15-20% larger.

- [ ] **Step 1: Find current root font size**

Open `src/styles/globals.css`, search for `:root` or `html` or `body` font-size declaration.

- [ ] **Step 2: Increase base font and text scales**

In `src/styles/globals.css`, find and update (replace exact values found in step 1):

```css
/* Root scale */
html { font-size: 17px; }   /* was ~14-15px */

/* Event panel text */
.ev-title { font-size: 1.35rem; }   /* was ~1.1rem */
.ev-desc  { font-size: 1.05rem; line-height: 1.7; }
.hist-ctx p { font-size: 0.95rem; }

/* Stats panel */
.stat-lbl { font-size: 0.8rem; }    /* was ~0.65rem */
.stat-val { font-size: 0.85rem; }

/* Option buttons */
.opt      { font-size: 0.95rem; min-height: 56px; }

/* Modals */
.gm-text  { font-size: 1rem; }
.si-desc  { font-size: 1rem; }
.si-tips-list li { font-size: 0.95rem; }

/* Intro */
.intro-panel p { font-size: 0.95rem; }
.intro-fact-box p { font-size: 0.95rem; }
.ihr-card small { font-size: 0.82rem; }
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "style: increase typography scale ~15% across all screens"
```

---

### Task 2: NameScreen — "Volver" button

**Files:**
- Modify: `src/components/screens/NameScreen.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Update NameScreen Props and add button**

In `src/components/screens/NameScreen.tsx`, update Props interface and add button:

```tsx
interface Props {
  onFinish: (name: string) => void
  onBack: () => void   // ADD THIS
}

export function NameScreen({ onFinish, onBack }: Props) {
```

Add back button just before `</div>` closing the `.ns-card`:

```tsx
        <button
          className="btn-o ns-back-btn"
          onClick={onBack}
          style={{ marginTop: 12, width: '100%' }}
        >
          ← Volver al Menú
        </button>
```

- [ ] **Step 2: Wire onBack in App.tsx**

In `src/App.tsx`, find the NameScreen render line:

```tsx
if (screen === 'name') return <NameScreen key="name" onFinish={n => { setPlayerName(n); setScreen('intro') }} />
```

Change to:

```tsx
if (screen === 'name') return <NameScreen key="name" onFinish={n => { setPlayerName(n); setScreen('intro') }} onBack={() => setScreen('menu')} />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/screens/NameScreen.tsx src/App.tsx
git commit -m "feat: add back button to NameScreen"
```

---

### Task 3: PapirosScreen — Back goes to correct screen

**Files:**
- Modify: `src/components/screens/PapirosScreen.tsx`
- Modify: `src/App.tsx`

Currently `PapirosScreen` always calls `onBack` which in App goes to 'menu'. The papiros button exists in the game screen too (stats panel), so back should return to 'game' when opened from there.

- [ ] **Step 1: No changes to PapirosScreen needed** — it already calls `onBack()`. The fix is in App.tsx where we open it.

- [ ] **Step 2: Track where papiros was opened from**

In `src/App.tsx`, add state to track origin:

```tsx
const [papirosPrev, setPapirosPrev] = useState<Screen>('menu')
```

- [ ] **Step 3: Set origin when opening papiros**

In `src/App.tsx`, find both places that set screen to 'papiros':

1. In the stats panel button (inside `gameJSX`):
```tsx
<button className="btn-o sm" onClick={() => { setPapirosPrev('game'); setScreen('papiros') }}>📜 Papiros</button>
```

2. In MenuScreen's onAchievements:
```tsx
if (screen === 'menu') return <MenuScreen ... onAchievements={() => { setPapirosPrev('menu'); setScreen('papiros') }} ... />
```

- [ ] **Step 4: Pass correct onBack to PapirosScreen**

In `src/App.tsx`, find the PapirosScreen render:
```tsx
if (screen === 'papiros') return <PapirosScreen ... onBack={() => setScreen('menu')} />
```
Change to:
```tsx
if (screen === 'papiros') return <PapirosScreen ... onBack={() => setScreen(papirosPrev)} />
```

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "fix: PapirosScreen back button returns to correct screen (game or menu)"
```

---

### Task 4: GodModal — "Los Dioses Te Hablan" header

**Files:**
- Modify: `src/components/ui/GodModal.tsx`
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add announcement banner to GodModal**

In `src/components/ui/GodModal.tsx`, add a `gm-announce` div as first child of `gm-card`, before `gm-header`:

```tsx
<motion.div className="gm-card" ...>
  <div className="gm-announce">
    <span className="gm-announce-ico">✨</span>
    <span className="gm-announce-txt">Los Dioses Te Hablan</span>
    <span className="gm-announce-ico">✨</span>
  </div>

  <div className="gm-header">
    {/* existing header content unchanged */}
  </div>
  {/* rest unchanged */}
```

- [ ] **Step 2: Add CSS**

In `src/styles/globals.css`, add after existing `.gm-*` rules:

```css
.gm-announce {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: color-mix(in srgb, var(--gcol) 20%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--gcol) 40%, transparent);
  border-radius: 12px 12px 0 0;
  margin: -20px -20px 16px -20px;
}
.gm-announce-txt {
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--gcol);
  text-transform: uppercase;
}
.gm-announce-ico {
  font-size: 0.9rem;
  opacity: 0.8;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/GodModal.tsx src/styles/globals.css
git commit -m "feat: add 'Los Dioses Te Hablan' announcement header to GodModal"
```

---

### Task 5: Option Buttons — type label inside button

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/globals.css`

Currently option buttons are wrapped in `<Tooltip>` showing the type label on hover. Replace with a small badge inside the button.

OPTION_TYPE_LABELS is already imported in App.tsx from `data/periods`.

- [ ] **Step 1: Remove Tooltip wrapper from options**

In `src/App.tsx`, find the opts.map block:

```tsx
{ev.opts.map((opt, i) => (
  <Tooltip key={i} text={OPTION_TYPE_LABELS[opt.type] ?? opt.type} pos="top" className="tip-block">
    <button className={`opt ${opt.type}`} onClick={() => handleChoice(opt)}>
      <span className="opt-txt">{opt.t}</span>
    </button>
  </Tooltip>
))}
```

Replace with:

```tsx
{ev.opts.map((opt, i) => (
  <button key={i} className={`opt ${opt.type}`} onClick={() => handleChoice(opt)}>
    <span className="opt-type-badge">
      {OPT_TYPE_ICONS[opt.type] ?? '⚡'} {OPTION_TYPE_LABELS[opt.type] ?? opt.type}
    </span>
    <span className="opt-txt">{opt.t}</span>
  </button>
))}
```

- [ ] **Step 2: Add OPT_TYPE_ICONS constant in App.tsx** (above the App function):

```tsx
const OPT_TYPE_ICONS: Record<string, string> = {
  militar:     '⚔️',
  social:      '🤝',
  diplomatico: '🕊️',
  cultural:    '🎭',
  economico:   '💰',
  religioso:   '𓂀',
  cruel:       '💀',
  default:     '⚡',
}
```

- [ ] **Step 3: Add CSS for badge**

In `src/styles/globals.css`, add inside/after `.opt` rules:

```css
.opt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.opt-type-badge {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  opacity: 0.75;
  text-transform: uppercase;
  pointer-events: none;
}
.opt-txt {
  font-size: 0.95rem;
  line-height: 1.4;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/styles/globals.css
git commit -m "feat: show option type label as badge inside button (remove tooltip)"
```

---

## 📦 PHASE 2 — Intro Screen

### Task 6: Step 0 — PNG map image

**FIRST: Tell the user where to place the image.**

> **Place the map image at:** `C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo\public\images\mapa-egipto.png`
> Vite serves everything in `public/` at the root URL, so the image will be accessible as `/images/mapa-egipto.png`.

**Files:**
- Modify: `src/components/screens/IntroScreen.tsx`
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Replace SVG map with `<img>` in step 0**

In `src/components/screens/IntroScreen.tsx`, find step 0 (`{step === 0 && ...}`).
Find the `<EgyptMap interactive={false} ... />` inside `.intro-map-col` and replace with:

```tsx
<div className="intro-map-col">
  <img
    src="/images/mapa-egipto.png"
    alt="Mapa del Imperio Egipcio"
    className="intro-map-img"
  />
</div>
```

The `EgyptMap` component stays for step 3 (interactive map). Only step 0 changes.

- [ ] **Step 2: Add CSS for the image**

In `src/styles/globals.css`, add after existing `.intro-map-col` rules:

```css
.intro-map-img {
  width: 100%;
  max-width: 320px;
  height: auto;
  border-radius: 12px;
  border: 2px solid rgba(212, 160, 23, 0.4);
  box-shadow: 0 4px 24px rgba(0,0,0,0.5);
  object-fit: cover;
}
```

- [ ] **Step 3: Commit** (commit after user adds the image)

```bash
git add src/components/screens/IntroScreen.tsx src/styles/globals.css
git commit -m "feat: replace SVG map in intro step 0 with realistic PNG image"
```

---

### Task 7: Step 2 — Pyramid layout + Esclavos

**Files:**
- Modify: `src/components/screens/IntroScreen.tsx`
- Modify: `src/styles/globals.css`

Currently step 2 has `.intro-hier` with `.ihr-row` containing cards in a flat layout. Need to make it visually a pyramid (each row wider than the one above) and add Esclavos at the base.

- [ ] **Step 1: Update step 2 JSX to add Esclavos and pyramid structure**

In `src/components/screens/IntroScreen.tsx`, find step 2 (`{step === 2 && ...}`).

Replace the entire `<div className="intro-hier">` block with:

```tsx
<div className="intro-hier">
  {/* Tier 1 — Faraón (apex) */}
  <div className="ihr-tier ihr-tier--1">
    <div className="ihr-card ihr-gold ihr-apex">
      <span>𓃭</span>
      <strong>El Faraón</strong>
      <small>Dios en la Tierra. Rey absoluto. Responsable de mantener la Maat: el orden del universo.</small>
    </div>
  </div>

  {/* Tier 2 — Visir + Sumo Sacerdote */}
  <div className="ihr-tier ihr-tier--2">
    <div className="ihr-card">
      <span>𓀭</span>
      <strong>El Visir</strong>
      <small>Primer ministro. Administraba justicia y coordinaba el Imperio en nombre del faraón.</small>
    </div>
    <div className="ihr-card">
      <span>𓂀</span>
      <strong>Sumo Sacerdote</strong>
      <small>Controlaba los templos y sus enormes riquezas. Interpretaba la voluntad de los dioses.</small>
    </div>
  </div>

  {/* Tier 3 — Escribas */}
  <div className="ihr-tier ihr-tier--3">
    <div className="ihr-card ihr-dim">
      <span>📜</span>
      <strong>Escribas y Funcionarios</strong>
      <small>Registraban impuestos, contratos, leyes. Eran los administradores del Imperio.</small>
    </div>
  </div>

  {/* Tier 4 — Campesinos */}
  <div className="ihr-tier ihr-tier--4">
    <div className="ihr-card ihr-dim">
      <span>🌾</span>
      <strong>Campesinos</strong>
      <small>La mayoría del pueblo. Pagaban impuestos con trabajo y alimento. Sostuvieron todo el sistema.</small>
    </div>
  </div>

  {/* Tier 5 — Esclavos (base) */}
  <div className="ihr-tier ihr-tier--5">
    <div className="ihr-card ihr-dim ihr-base">
      <span>⛓️</span>
      <strong>Esclavos y Prisioneros</strong>
      <small>Prisioneros de guerra y deudores. Trabajaban en construcción, minas y labores domésticas. Una minoría de la población.</small>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add pyramid CSS**

In `src/styles/globals.css`, find `.intro-hier` and `.ihr-row` rules. Replace/add:

```css
.intro-hier {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
}
/* Draw pyramid lines */
.intro-hier::before {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  width: 0;
  border-left: 2px dashed rgba(212,160,23,0.2);
  pointer-events: none;
}

.ihr-tier {
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 3px 0;
}
.ihr-tier--1 { width: 44%; }
.ihr-tier--2 { width: 72%; }
.ihr-tier--3 { width: 82%; }
.ihr-tier--4 { width: 90%; }
.ihr-tier--5 { width: 100%; }

.ihr-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(212,160,23,0.25);
  border-radius: 8px;
  text-align: center;
}
.ihr-card span { font-size: 1.4rem; }
.ihr-card strong { font-size: 0.82rem; font-family: 'Cinzel', serif; color: var(--papyrus); }
.ihr-card small { font-size: 0.72rem; color: var(--txt); opacity: 0.75; line-height: 1.4; }

.ihr-gold { border-color: rgba(212,160,23,0.6); background: rgba(212,160,23,0.12); }
.ihr-gold strong { color: #D4A017; }
.ihr-apex { border-width: 2px; }
.ihr-base { border-color: rgba(180,100,60,0.4); background: rgba(80,40,20,0.2); }
.ihr-dim { opacity: 0.85; }
```

- [ ] **Step 3: Commit**

```bash
git add src/components/screens/IntroScreen.tsx src/styles/globals.css
git commit -m "feat: intro pyramid layout with Esclavos tier at base"
```

---

### Task 8: Step 4 — Show all 6 stats in tutorial

**Files:**
- Modify: `src/components/screens/IntroScreen.tsx`

Currently step 4 hardcodes only 4 stats: `(['estabilidad','riqueza','cultura','influencia'] as const)`.

- [ ] **Step 1: Update stats list to all 6**

In `src/components/screens/IntroScreen.tsx`, find step 4 (`{step === 4 && ...}`), find the `.intro-stats-grid` mapping:

```tsx
{(['estabilidad','riqueza','cultura','influencia'] as const).map(k => (
```

Change to:

```tsx
{(['estabilidad','riqueza','cultura','influencia','fe','comercio'] as const).map(k => (
```

Also import `StatKey` from types if not already imported (it may already be imported via `STAT_COLORS` etc.), and update the type cast to `StatKey[]` or just use `as const`.

- [ ] **Step 2: Commit**

```bash
git add src/components/screens/IntroScreen.tsx
git commit -m "feat: show all 6 stats (fe + comercio) in intro tutorial slide"
```

---

## 📦 PHASE 3 — Advisor Modal

### Task 9: Advisor click → full modal

**Files:**
- Create: `src/components/ui/AdvisorModal.tsx`
- Modify: `src/components/ui/AdvisorPanel.tsx`
- Modify: `src/styles/globals.css`

Currently clicking an advisor chip expands an inline `adv-bubble`. Replace with a proper overlay modal (same pattern as StatInfoModal).

- [ ] **Step 1: Create AdvisorModal.tsx**

Create `src/components/ui/AdvisorModal.tsx`:

```tsx
import { motion } from 'framer-motion'
import type { Advisor } from '../../data/advisors'

interface Props {
  advisor: Advisor
  advice: string
  urgency: 'normal' | 'warning' | 'critical'
  onClose: () => void
}

export function AdvisorModal({ advisor, advice, urgency, onClose }: Props) {
  const urgencyLabel = urgency === 'critical' ? '⚠ SITUACIÓN CRÍTICA' : urgency === 'warning' ? '! ATENCIÓN REQUERIDA' : null

  return (
    <motion.div
      className="advm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="advm-card"
        style={{ '--advm-col': advisor.color } as React.CSSProperties}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="advm-header">
          <span className="advm-icon">{advisor.icon}</span>
          <div className="advm-header-text">
            <strong className="advm-name">{advisor.name}</strong>
            <span className="advm-title">{advisor.title}</span>
          </div>
          <div className="advm-bar" />
        </div>

        {urgencyLabel && (
          <div className={`advm-urgency advm-urgency--${urgency}`}>
            {urgencyLabel}
          </div>
        )}

        <p className="advm-advice">"{advice}"</p>

        <button className="btn-g advm-btn" onClick={onClose}>Entendido →</button>
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Update AdvisorPanel to use modal**

In `src/components/ui/AdvisorPanel.tsx`, replace the current state and render logic:

Remove `import { Tooltip } from './Tooltip'`.
Add import: `import { AdvisorModal } from './AdvisorModal'`.

Keep state `const [open, setOpen] = useState<string | null>(null)` but now it controls the modal, not an inline bubble.

Replace the chip + bubble render with:

```tsx
return (
  <div className="adv-panel">
    <div className="adv-panel-header">
      <span className="adv-panel-title">𓆣 Consejeros</span>
      {hasAlert && <span className="adv-panel-alert">¡Tienen algo que decirte!</span>}
    </div>
    <div className="adv-chips">
      {advisorData.map(({ adv, line, urgency }) => (
        <button
          key={adv.id}
          className={`adv-chip urgency-${urgency}`}
          style={{ '--acol': adv.color } as React.CSSProperties}
          onClick={() => setOpen(adv.id)}
          title={`${adv.name} · ${adv.title}`}
        >
          <span className="adv-chip-icon">{adv.icon}</span>
          <span className="adv-chip-name">{adv.name}</span>
          {urgency !== 'normal' && (
            <span className={`adv-pulse pulse-${urgency}`} />
          )}
        </button>
      ))}
    </div>

    <AnimatePresence>
      {open && (() => {
        const d = advisorData.find(x => x.adv.id === open)
        if (!d) return null
        return (
          <AdvisorModal
            key="advm"
            advisor={d.adv}
            advice={d.line}
            urgency={d.urgency}
            onClose={() => setOpen(null)}
          />
        )
      })()}
    </AnimatePresence>
  </div>
)
```

- [ ] **Step 3: Check Advisor type export**

In `src/data/advisors.ts`, verify `Advisor` interface is exported (or export it if not):
```ts
export interface Advisor { id: string; name: string; title: string; icon: string; color: string; ... }
```

If it's not exported, add `export` keyword.

- [ ] **Step 4: Add AdvisorModal CSS**

In `src/styles/globals.css`, add after `.si-*` rules:

```css
/* ── AdvisorModal ───────────────────────────────────────── */
.advm-overlay {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(10,8,4,0.75);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}
.advm-card {
  background: var(--stone);
  border: 1px solid color-mix(in srgb, var(--advm-col) 35%, transparent);
  border-radius: 16px;
  padding: 20px;
  width: 100%; max-width: 400px;
  display: flex; flex-direction: column; gap: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
}
.advm-header {
  display: flex; align-items: center; gap: 12px;
  position: relative;
}
.advm-icon { font-size: 2rem; }
.advm-header-text { display: flex; flex-direction: column; flex: 1; }
.advm-name {
  font-family: 'Cinzel', serif;
  font-size: 1rem; font-weight: 700;
  color: var(--advm-col);
  text-transform: uppercase; letter-spacing: 0.06em;
}
.advm-title { font-size: 0.78rem; color: var(--txt); opacity: 0.65; }
.advm-bar {
  position: absolute; bottom: -10px; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--advm-col) 0%, transparent 100%);
  opacity: 0.5;
}
.advm-urgency {
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 6px;
  text-align: center;
}
.advm-urgency--warning  { background: rgba(255,160,0,0.15); color: #FFA000; }
.advm-urgency--critical { background: rgba(220,50,50,0.15); color: #E53935; }
.advm-advice {
  font-size: 1rem; line-height: 1.65;
  color: var(--txt);
  font-style: italic;
  padding: 0 4px;
}
.advm-btn { width: 100%; }
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/AdvisorModal.tsx src/components/ui/AdvisorPanel.tsx src/styles/globals.css
git commit -m "feat: advisor click opens full modal instead of inline bubble"
```

---

## 📦 PHASE 4 — End Screen Overhaul

### Task 10: Complete EndScreen redesign

**Files:**
- Modify: `src/components/screens/EndScreen.tsx`
- Modify: `src/App.tsx` (pass playerName)
- Modify: `src/styles/globals.css`

Requirements:
- 10+ titles (not just per-god, but universal titles based on stats/score/decisions)
- Narrative paragraph about the player's reign
- Player name displayed prominently
- Papyrus aesthetic (parchment texture via CSS)
- Score recalculated with 6 stats (currently maxScore = 400, should be 600)

- [ ] **Step 1: Pass playerName to EndScreen in App.tsx**

In `src/App.tsx`, find EndScreen render:
```tsx
if (screen === 'end') return <EndScreen key="end" stats={stats} achievements={achievements} god={god} startTime={startTime.current} onNew={...} onMenu={...} />
```
Add `playerName={playerName}`:
```tsx
if (screen === 'end') return <EndScreen key="end" stats={stats} achievements={achievements} god={god} startTime={startTime.current} playerName={playerName} onNew={...} onMenu={...} />
```

- [ ] **Step 2: Rewrite EndScreen.tsx**

Replace the full contents of `src/components/screens/EndScreen.tsx` with:

```tsx
import { motion } from 'framer-motion'
import type { God, Stats } from '../../types'
import { ACHIEVEMENTS } from '../../data/achievements'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS } from '../../data/periods'

interface Props {
  stats: Stats
  achievements: string[]
  god: God | null
  startTime: number
  playerName: string
  onNew: () => void
  onMenu: () => void
}

// ── 10+ universal titles based on score + dominant stats ─────────────────────
function assignTitle(stats: Stats, achievements: string[], score: number): string {
  const pct = (score / 600) * 100
  const { estabilidad, riqueza, cultura, influencia, fe, comercio } = stats

  // Legendary (top tier)
  if (pct >= 90) return 'Faraón de los Dos Reinos'
  // Achievement-gated specials
  if (achievements.includes('puzzlemaster') && pct >= 75) return 'El Sabio de Karnak'
  if (achievements.includes('tragedia') && pct >= 50) return 'Señor de Hierro del Desierto'
  // Stat-dominant titles
  if (fe >= 75 && pct >= 65)        return 'Sumo Sacerdote del Nilo'
  if (comercio >= 75 && pct >= 65)  return 'Gran Mercader de las Dos Tierras'
  if (cultura >= 75 && pct >= 65)   return 'Maestro de los Jeroglíficos'
  if (influencia >= 75 && pct >= 60) return 'Conquistador del Levante'
  if (estabilidad >= 75 && pct >= 60) return 'Guardián de la Maat'
  if (riqueza >= 75 && pct >= 60)   return 'Señor de los Tesoros de Amón'
  // Mid-tier general
  if (pct >= 70) return 'Gran Visir del Imperio'
  if (pct >= 55) return 'Nomarca del Alto Egipto'
  if (pct >= 40) return 'Escriba Real de Menfis'
  if (pct >= 25) return 'Guardián del Templo Menor'
  return 'Iniciado de la Casa de la Vida'
}

// ── Narrative generator ───────────────────────────────────────────────────────
function buildNarrative(stats: Stats, achievements: string[], god: God | null, playerName: string): string {
  const { estabilidad, riqueza, cultura, influencia, fe, comercio } = stats
  const strengths: string[] = []
  const weaknesses: string[] = []

  if (estabilidad >= 65) strengths.push('mantuviste el orden y la paz en todo el Imperio')
  else if (estabilidad < 40) weaknesses.push('el pueblo sufrió bajo la inestabilidad de tu reinado')

  if (riqueza >= 65) strengths.push('los graneros y los tesoros del faraón jamás estuvieron vacíos')
  else if (riqueza < 40) weaknesses.push('las arcas reales se vieron empobrecidas')

  if (cultura >= 65) strengths.push('los escribas y artistas florecieron bajo tu patronazgo')
  else if (cultura < 40) weaknesses.push('los saberes del Imperio se descuidaron durante tu gobierno')

  if (influencia >= 65) strengths.push('los pueblos vecinos temieron y respetaron tu nombre')
  else if (influencia < 40) weaknesses.push('tu influencia más allá de las fronteras fue escasa')

  if (fe >= 65) strengths.push('los dioses recibieron sus ofrendas y los templos prosperaron')
  else if (fe < 40) weaknesses.push('la fe del pueblo menguó sin el sostén de los rituales')

  if (comercio >= 65) strengths.push('las rutas de Nubia y el Levante enriquecieron a tu pueblo')
  else if (comercio < 40) weaknesses.push('el comercio exterior se vio limitado en tu época')

  const godName = god?.name ?? 'los dioses'
  let text = `Bajo la protección de ${godName}, el faraón ${playerName} gobernó el Imperio Egipcio con mano firme. `

  if (strengths.length > 0) {
    text += `Se destacó porque ${strengths.slice(0,2).join(' y ')}. `
  }
  if (weaknesses.length > 0) {
    text += `Sin embargo, la historia recuerda que ${weaknesses[0]}. `
  }
  if (achievements.includes('equilibrio')) {
    text += 'Los historiadores lo recuerdan como un gobernante equilibrado, fiel a la Maat. '
  } else if (achievements.includes('conquistador')) {
    text += 'Su nombre se grabó en las estelas de conquista a lo largo del Nilo. '
  } else if (achievements.includes('artesano')) {
    text += 'Los monumentos y papiros de su época sobrevivieron hasta nuestros días. '
  }
  text += 'Su cartucho quedará grabado en los muros del templo por la eternidad.'
  return text
}

// ── Component ─────────────────────────────────────────────────────────────────
export function EndScreen({ stats, achievements, god, startTime, playerName, onNew, onMenu }: Props) {
  const score = Object.values(stats).reduce((a, b) => a + b, 0)
  const maxScore = 600
  const pct = Math.round((score / maxScore) * 100)
  const title = assignTitle(stats, achievements, score)
  const narrative = buildNarrative(stats, achievements, god, playerName || 'Sin nombre')
  const unlockedAch = ACHIEVEMENTS.filter(a => achievements.includes(a.id))
  const playMins = Math.floor((Date.now() - startTime) / 60000)

  return (
    <motion.div
      className="end"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Papyrus header */}
      <div className="end-papyrus-header">
        <div className="end-papyrus-border-top" />
        <div className="end-papyrus-glyph">𓆣 𓇳 𓆣</div>

        <div className="end-god-row">
          <span className="end-god-icon">{god?.icon}</span>
          <div>
            <div className="end-god-name">{god?.name}</div>
            <div className="end-god-title-lbl">Dios Protector</div>
          </div>
        </div>

        <div className="end-divine-title">{title}</div>

        <div className="end-player-name">{playerName}</div>

        <p className="end-narrative">{narrative}</p>
        <div className="end-papyrus-border-bottom" />
      </div>

      {/* Score */}
      <div className="end-score-section">
        <h3 className="end-section-title">📊 Legado del Imperio</h3>
        <div className="end-score-big">
          <span className="end-score-num">{score}</span>
          <span className="end-score-max"> / {maxScore}</span>
        </div>
        <div className="end-score-bar">
          <motion.div
            className="end-score-fill"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          />
        </div>
        <div className="end-score-pct">{pct}% de legado</div>
      </div>

      {/* Stats */}
      <div className="end-stats-section">
        <div className="end-stats">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="end-stat">
              <span>{STAT_ICONS[k]} {STAT_LABELS[k]}</span>
              <div className="mini">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${v}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                  style={{ height: '100%', borderRadius: 3, background: STAT_COLORS[k] }}
                />
              </div>
              <span style={{ color: STAT_COLORS[k], fontFamily: "'Cinzel',serif", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="end-meta">
          <span>⏱ {playMins} min de juego</span>
          <span>🧩 {achievements.length} logros</span>
        </div>
      </div>

      {/* Achievements */}
      {unlockedAch.length > 0 && (
        <div className="end-ach-section">
          <h3 className="end-section-title">📜 Logros del Reinado</h3>
          <div className="end-ach-list">
            {unlockedAch.map(a => (
              <div key={a.id} className={`end-ach-item type-${a.type}`}>
                <span className="end-ach-ico">{a.ico}</span>
                <div>
                  <strong>{a.name}</strong>
                  <p>{a.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="end-acts">
        <button className="btn-g" onClick={onNew}>⚡ Nueva Partida</button>
        <button className="btn-o" onClick={onMenu}>🏠 Menú Principal</button>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 3: Add CSS for new EndScreen elements**

In `src/styles/globals.css`, add/replace `.end-*` rules:

```css
/* EndScreen — papyrus aesthetic additions */
.end-papyrus-header {
  background: linear-gradient(180deg, #3D2B1A 0%, #2A1F0F 100%);
  border: 2px solid rgba(212,160,23,0.4);
  border-radius: 12px;
  padding: 24px 20px;
  margin-bottom: 20px;
  position: relative;
  text-align: center;
}
.end-papyrus-border-top,
.end-papyrus-border-bottom {
  height: 3px;
  background: repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 8px, transparent 8px, transparent 16px);
  opacity: 0.5;
  margin: 8px -20px;
}
.end-papyrus-glyph {
  font-size: 1.4rem;
  letter-spacing: 12px;
  opacity: 0.5;
  margin-bottom: 16px;
}
.end-divine-title {
  font-family: 'Cinzel', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #D4A017;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 12px 0 8px;
}
.end-player-name {
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
  color: var(--papyrus);
  opacity: 0.9;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}
.end-narrative {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--txt);
  font-style: italic;
  text-align: left;
  max-width: 480px;
  margin: 0 auto;
}
.end-score-section,
.end-stats-section,
.end-ach-section {
  margin-bottom: 20px;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/screens/EndScreen.tsx src/App.tsx src/styles/globals.css
git commit -m "feat: EndScreen overhaul — 10+ titles, narrative text, player name, papyrus aesthetic"
```

---

## 📦 PHASE 5 — Puzzle Reward/Penalty Visibility

### Task 11: Improve puzzle stat feedback

**Files:**
- Modify: `src/components/puzzles/GlyphPuzzle.tsx`
- Modify: `src/components/puzzles/WordOrder.tsx`
- Modify: `src/styles/globals.css`

Both puzzles already calculate `statDelta` and pass it to `onDone`, and `handlePuzDone` in App.tsx already applies it. The issue is the visual feedback is minimal. We need to:
1. Make the reward/penalty more impactful (larger delta)
2. Show a clear animated result screen after each puzzle

- [ ] **Step 1: Increase statDelta in GlyphPuzzle**

In `src/components/puzzles/GlyphPuzzle.tsx`, find the `statDelta` calculation (the `useEffect` with `setStatDelta`):

Current: max range -8 to +8. Increase to -12 to +12:
```tsx
setStatDelta(Math.max(-12, Math.min(12, delta * 1.5 | 0)))
```

Also update the score threshold — `onDone` first arg: currently calls with `score >= target`. Add a clear visual result banner:

After `<div className={`puz-res ${score >= target ? 'ok' : 'fail'}`}>`, add:
```tsx
<div className={`puz-stat-result ${statDelta >= 0 ? 'reward' : 'penalty'}`}>
  {statDelta >= 0
    ? `✨ Todos los stats +${Math.abs(Math.round(statDelta / 2))} por tu buen trabajo`
    : `⚠ Todos los stats ${Math.round(statDelta / 2)} por los errores cometidos`
  }
</div>
```

- [ ] **Step 2: Increase statDelta in WordOrder**

In `src/components/puzzles/WordOrder.tsx`, find:
```tsx
setStatDelta((correct * 2) - ((total - correct) * 1))
```
Change to:
```tsx
setStatDelta((correct * 3) - ((total - correct) * 2))
```

After the `puz-res` div in the feedback section, add:
```tsx
<div className={`puz-stat-result ${statDelta >= 0 ? 'reward' : 'penalty'}`}>
  {statDelta >= 0
    ? `✨ Todos los stats +${Math.abs(Math.round(statDelta / 2))} por tu buen trabajo`
    : `⚠ Todos los stats ${Math.round(statDelta / 2)} por los errores cometidos`
  }
</div>
```

- [ ] **Step 3: Add CSS**

In `src/styles/globals.css`, add after `.puz-res` rules:

```css
.puz-stat-result {
  margin-top: 8px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}
.puz-stat-result.reward {
  background: rgba(80,180,100,0.15);
  color: #6fcf74;
  border: 1px solid rgba(80,180,100,0.3);
}
.puz-stat-result.penalty {
  background: rgba(220,80,60,0.15);
  color: #e07060;
  border: 1px solid rgba(220,80,60,0.3);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/puzzles/GlyphPuzzle.tsx src/components/puzzles/WordOrder.tsx src/styles/globals.css
git commit -m "feat: increase puzzle stat impact and add clear reward/penalty banner"
```

---

## 📦 PHASE 6 — Final Push

### Task 12: Verify all changes, update CLAUDE.md

- [ ] **Step 1: Start dev server and test all flows**

```bash
cd C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo
npm run dev
```

Test checklist:
- [ ] Typography larger on mobile (390px viewport)
- [ ] NameScreen has "Volver" button → goes to menu
- [ ] Papiros from game → back → returns to game
- [ ] Papiros from menu → back → returns to menu
- [ ] GodModal shows "Los Dioses Te Hablan" banner
- [ ] Option buttons show type badge (⚔️ MILITAR, etc.)
- [ ] Advisor click → modal overlay (not inline bubble)
- [ ] Intro step 0: PNG map displayed (after user adds image)
- [ ] Intro step 2: pyramid layout with Esclavos
- [ ] Intro step 4: shows all 6 stats
- [ ] Puzzles: statDelta banner shows after completion
- [ ] EndScreen: title + narrative + player name + papyrus header

- [ ] **Step 2: Push to main and master**

```bash
git push origin main
git push origin master
```

---

## ⚠️ Notes

**Image path:** Place your PNG at:
```
C:\Users\nicod\Documents\JuegosEducativos\dioses-del-nilo\public\images\mapa-egipto.png
```
Any PNG works. Recommended size: 600×800px portrait (matches SVG map aspect ratio). After adding it, run Task 6.

**Future — Difficulty System:** Add `difficulty: 'facil' | 'normal' | 'dificil'` to game state. In `facil`: events apply 80% fx magnitude; puzzle statDelta halved; stats start at 55. In `dificil`: events apply 120% fx; puzzles have less time; stats start at 45. Add a difficulty selector screen between NameScreen and IntroScreen.

---

## Self-Review

| Requirement | Task |
|-------------|------|
| Letras más grandes | Task 1 |
| PNG mapa en intro step 0 | Task 6 |
| Pirámide social + Esclavos | Task 7 |
| Puzzles premian/castigan stats | Task 11 (already partial in App, improved) |
| Botones de opciones con leyenda interna | Task 5 |
| Consejeros click → modal | Task 9 |
| GodModal "Los Dioses Te Hablan" | Task 4 |
| Papiros back → correct screen | Task 3 |
| NameScreen botón volver | Task 2 |
| EndScreen completo (títulos, narrativa, nombre, papiro) | Task 10 |
| Stats nuevos en intro tutorial | Task 8 |
| Dificultades (futuro) | Noted at end |
