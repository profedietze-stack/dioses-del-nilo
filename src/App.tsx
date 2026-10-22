import { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import type { God, Stats, StatKey, Screen, HistoryEntry, GameStats, EventOption, GameEvent, PeriodTransitionData, SaveData, TimelineCard } from './types'
import { GODS } from './data/gods'
import { PERIODS } from './data/periods'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS, OPTION_TYPE_LABELS } from './data/periods'
import { buildGameEvents, getEventsById } from './data/eventPools'
import { PUZZLES_DEF } from './data/puzzles'
import { INIT, clamp } from './utils/gameLogic'
import { loadSave, writeSave, clearSave } from './utils/save'
import { pendingPuzzle } from './utils/puzzleSchedule'
import { barajar } from './utils/barajar'
import { EMPTY_GS, resolverDecision, resolverCoronacion, aplicarPuzzle } from './utils/turnos'
import type { EstadoTurno, ResultadoTurno } from './utils/turnos'
import { evaluateAchievements } from './utils/achievements'
import { startMusic, stopMusic, playSound } from './audio/musicEngine'
import { useAjustes } from './hooks/useAjustes'
import { AjustesModal } from './components/ui/AjustesModal'
import { SplashScreen } from './components/screens/SplashScreen'
import { MenuScreen } from './components/screens/MenuScreen'
import { NameScreen } from './components/screens/NameScreen'
import { IntroScreen } from './components/screens/IntroScreen'
import { GodSelectScreen } from './components/screens/GodSelectScreen'
import { PapirosScreen } from './components/screens/PapirosScreen'
import { EndScreen } from './components/screens/EndScreen'
import { PeriodTransitionScreen } from './components/screens/PeriodTransitionScreen'
import { DebugPanel } from './components/dev/DebugPanel'
import { parseDevParams } from './utils/devParams'
import { useDevTools } from './hooks/useDevTools'

// Code-split: puzzles load on demand. Screens are NOT lazy — they're swapped
// via AnimatePresence, and React.lazy's Suspense boundary breaks framer-motion's
// exit-animation unmount cycle (old screens get stuck mounted forever when the
// incoming lazy screen suspends). Verified regression on the live site.
const GlyphPuzzle     = lazy(() => import('./components/puzzles/GlyphPuzzle').then(m => ({ default: m.GlyphPuzzle })))
const WordOrder       = lazy(() => import('./components/puzzles/WordOrder').then(m => ({ default: m.WordOrder })))
const MaatScale       = lazy(() => import('./components/puzzles/MaatScale').then(m => ({ default: m.MaatScale })))
const PharaohTimeline = lazy(() => import('./components/puzzles/PharaohTimeline').then(m => ({ default: m.PharaohTimeline })))
import { InfoModal } from './components/ui/InfoModal'
import { ConsejerModal } from './components/ui/ConsejerModal'
import { AdvisorPanel } from './components/ui/AdvisorPanel'
import { GlossaryModal } from './components/ui/GlossaryModal'
import { GodModal } from './components/ui/GodModal'
import { StatInfoModal } from './components/ui/StatInfoModal'
import { PharaohModal } from './components/ui/PharaohModal'
import { ConfirmModal } from './components/ui/ConfirmModal'
import { PHARAOHS } from './data/pharaohs'
import { buildGodModal } from './data/godLore'
import { processGlossary } from './utils/processGlossary'

const OPT_TYPE_ICONS: Record<string, string> = {
  militar:     '⚔️',
  social:      '🤝',
  diplomatico: '🕊️',
  cultural:    '🎭',
  economico:   '💰',
  religioso:   '𓂀',
  cruel:       '💀',
}

function requestFS() {
  const el = document.documentElement
  if (el.requestFullscreen) el.requestFullscreen().catch(() => { /* ignore */ })
}

function CatImage({ cat }: { cat: string }) {
  const { ajustes } = useAjustes()
  const [err, setErr] = useState(false)
  if (err || !ajustes.imagenes) return null
  return (
    <img
      key={cat}
      src={`${import.meta.env.BASE_URL}images/cat-${cat}.jpg`}
      alt=""
      aria-hidden="true"
      className="ev-cat-img"
      loading="lazy"
      decoding="async"
      onError={() => setErr(true)}
    />
  )
}

function AnimatedStatBar({ value, color }: { value: number; color: string }) {
  const spring = useSpring(value, { stiffness: 80, damping: 18 })
  useEffect(() => { spring.set(value) }, [value, spring])
  const width = useTransform(spring, v => `${v}%`)
  return <motion.div className="stat-fill" style={{ width, background: color }} />
}

export function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [god, setGod] = useState<God | null>(null)
  const [gameEvents, setGameEvents] = useState<GameEvent[]>([])
  const [stats, setStats] = useState<Stats>(INIT)
  const [evIdx, setEvIdx] = useState(0)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [lastFx, setLastFx] = useState<Partial<Stats> | null>(null)
  const [achievements, setAchievements] = useState<string[]>([])
  const [puzFail, setPuzFail] = useState(0)
  const [puzOk, setPuzOk] = useState(0)
  const [puzDone, setPuzDone] = useState<number[]>([])
  const [showModal, setShowModal] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const [consejer, setConsejer] = useState<{ fx: Partial<Stats>; choice: string; power: { name: string; note: Partial<Stats> } | null; card: TimelineCard } | null>(null)
  const [glossWord, setGlossWord] = useState<string | null>(null)
  const { ajustes, cambiar } = useAjustes()
  const musicOn = ajustes.musica
  const [showAjustes, setShowAjustes] = useState(false)
  // La música la arranca y la para la partida; el ajuste solo guarda lo que el jugador prefiere.
  // Desde el menú principal (donde no suena nada) solo se guarda la preferencia.
  const alternarMusica = (activa: boolean) => {
    cambiar({ musica: activa })
    if (screen !== 'game') return
    if (activa) startMusic(); else stopMusic()
  }
  const [gs, setGs] = useState<GameStats>(EMPTY_GS)
  const [periodTransData, setPeriodTransData] = useState<PeriodTransitionData | null>(null)
  const [godModalData, setGodModalData] = useState<{ approval: string; encouragement: string; fact: string } | null>(null)
  const [statInfoKey, setStatInfoKey] = useState<StatKey | null>(null)
  const [playerName, setPlayerName] = useState('')
  const [papirosPrev, setPapirosPrev] = useState<Screen>('menu')
  const [confirmMenu, setConfirmMenu] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  // En telefono arranca plegado (ahorra pantalla); en escritorio, abierto. Se recuerda la eleccion.
  const [statsOpen, setStatsOpen] = useState<boolean>(() => {
    try {
      const g = localStorage.getItem('diosesNilo_statsOpen')
      if (g === '1' || g === '0') return g === '1'
    } catch { /* sin almacenamiento: se usa el valor por defecto */ }
    return !window.matchMedia('(max-width: 768px)').matches
  })
  const toggleStats = () => {
    const n = !statsOpen
    setStatsOpen(n)
    try { localStorage.setItem('diosesNilo_statsOpen', n ? '1' : '0') } catch { /* ignorar */ }
  }
  const startTime = useRef(Date.now())
  const pendingEnd = useRef(false)
  const pendingPeriodTrans = useRef<PeriodTransitionData | null>(null)
  const pendingGodModal = useRef<{ approval: string; encouragement: string; fact: string } | null>(null)
  const nextGodModalAt = useRef(3 + Math.floor(Math.random() * 3))

  // ── SPLASH: brief loading screen on first mount ────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200)
    return () => clearTimeout(t)
  }, [])

  // ── DEV: URL params ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const p = parseDevParams()
    if (!p) return
    if (p.godId) {
      const g = GODS.find(x => x.id === p.godId)
      if (g) {
        const events = buildGameEvents(8, g.id)
        const baseStats = { ...INIT }
        for (const k in g.bon) baseStats[k as keyof typeof baseStats] = clamp(50 + g.bon[k as keyof typeof baseStats])
        const s = p.stats ? { ...baseStats, ...p.stats } : baseStats
        const idx = p.evIdx ?? 0
        writeSave({ godId: g.id, playerName: 'Faraón', stats: s, evIdx: idx, eventIds: events.map(e => e.id), history: [], achievements: [], puzDone: [], puzOk: 0, puzFail: 0, gs: EMPTY_GS, t: Date.now() })
        setGod(g); setStats(s); setEvIdx(idx); setGameEvents(events); setHistory([])
        setScreen((p.screen as Screen) ?? 'game')
        console.info('[DEV] URL params applied:', p)
      }
    }
  }, [])

  const hasSave = !!loadSave()
  // El puzzle pendiente se deduce del avance, no de un contador: ver puzzleSchedule.
  // Mientras toca una coronación el puzzle espera, para que no se pisen.
  const evNow = gameEvents[evIdx]
  const curPuzDef = screen === 'game' && evNow && !evNow.isPharaoh ? pendingPuzzle(evIdx, puzDone) : undefined

  useEffect(() => {
    if (curPuzDef) playSound('puzzle_open')
  }, [curPuzDef?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  /** La partida tal como está ahora, con los valores nuevos que todavía no pasaron por el estado. */
  const persist = (over: Partial<SaveData>) => {
    if (!god) return
    writeSave({
      godId: god.id, playerName: playerName || 'Faraón', stats, evIdx,
      eventIds: gameEvents.map(e => e.id), history, achievements,
      puzDone, puzOk, puzFail, gs, t: Date.now(), ...over,
    })
  }

  const updateAchievements = (ns: Stats, nh: HistoryEntry[], ngs: GameStats, final: boolean): string[] => {
    const ach = evaluateAchievements({
      godId: god?.id, stats: ns, history: nh, gs: ngs, puzOk, puzFail,
      puzTotal: PUZZLES_DEF.length, elapsedMs: Date.now() - startTime.current,
    }, achievements, final)
    setAchievements(ach)
    return ach
  }

  const startGame = (g: God) => {
    requestFS()
    playSound('select_god')
    if (ajustes.musica) startMusic()
    const s = { ...INIT }
    for (const k in g.bon) s[k as keyof Stats] = clamp(50 + g.bon[k as keyof Stats])
    const events = buildGameEvents(8, g.id)
    setGod(g); setStats(s); setEvIdx(0); setHistory([]); setLastFx(null)
    setGameEvents(events)
    setAchievements([]); setPuzFail(0); setPuzOk(0); setPuzDone([])
    setGs(EMPTY_GS)
    startTime.current = Date.now()
    nextGodModalAt.current = 3 + Math.floor(Math.random() * 3)
    writeSave({ godId: g.id, playerName: playerName || 'Faraón', stats: s, evIdx: 0, eventIds: events.map(e => e.id), history: [], achievements: [], puzDone: [], puzOk: 0, puzFail: 0, gs: EMPTY_GS, t: Date.now() })
    setScreen('game')
  }

  const continueGame = () => {
    const sv = loadSave(); if (!sv) return
    const g = GODS.find(x => x.id === sv.godId); if (!g) return
    // Resolve saved event IDs; if any fail (e.g. pools changed since save), start fresh
    // rather than desyncing evIdx from a shorter list.
    const resolved = sv.eventIds?.length ? getEventsById(sv.eventIds) : null
    const events = resolved ?? buildGameEvents(8, g.id)
    const savedIdx = resolved ? Math.min(sv.evIdx ?? 0, events.length) : 0
    requestFS()
    if (ajustes.musica) startMusic()
    setGod(g); setStats(sv.stats ?? INIT)
    setPlayerName(sv.playerName || 'Faraón')
    setGameEvents(events)
    setEvIdx(savedIdx); setHistory(resolved ? (sv.history ?? []) : [])
    setAchievements(resolved ? sv.achievements : [])
    setPuzDone(resolved ? sv.puzDone : []); setPuzOk(resolved ? sv.puzOk : 0); setPuzFail(resolved ? sv.puzFail : 0)
    setGs(resolved ? sv.gs : EMPTY_GS)
    nextGodModalAt.current = savedIdx + 3 + Math.floor(Math.random() * 3)
    // A save written right as the game ended can have evIdx === events.length
    // (one past the last valid index) — resuming into 'game' would try to
    // render gameEvents[evIdx], which is undefined, and get stuck on the
    // "Cargando..." fallback forever. Send it straight to the end screen.
    setScreen(savedIdx >= events.length ? 'end' : 'game')
  }

  /** El estado de la partida tal como lo necesita la lógica de turnos (utils/turnos). */
  const estadoTurno = (): EstadoTurno => ({ godId: god?.id, stats, gs, history, evIdx, events: gameEvents })

  /** Reparte el resultado de un turno: estado, logros, guardado y lo que queda pendiente para el cierre. */
  const aplicarTurno = (r: ResultadoTurno) => {
    setStats(r.stats); setHistory(r.history); setLastFx(r.fx); setGs(r.gs)
    setAnimKey(k => k + 1)
    setEvIdx(r.evIdx)
    playSound('event_result')
    const ach = updateAchievements(r.stats, r.history, r.gs, r.fin)
    persist({ stats: r.stats, evIdx: r.evIdx, history: r.history, achievements: ach, gs: r.gs })
  }

  const handleChoice = (opt: EventOption) => {
    const r = resolverDecision(estadoTurno(), opt)
    const ev = gameEvents[evIdx]
    aplicarTurno(r)
    setConsejer({ fx: r.fx, choice: opt.t, power: r.poder, card: ev.tl })
    // god modal trigger — every 3-5 events, not on last event
    if (r.evIdx >= nextGodModalAt.current && r.evIdx < gameEvents.length && god) {
      const vals = Object.values(r.stats); const avg = vals.reduce((a, b) => a + b, 0) / vals.length
      pendingGodModal.current = buildGodModal(god.id, opt.type, avg, ev.cat)
      nextGodModalAt.current = r.evIdx + 3 + Math.floor(Math.random() * 3)
    }
    if (r.fin) pendingEnd.current = true
    else if (r.transicion) pendingPeriodTrans.current = r.transicion
  }

  const handlePuzDone = (ok: boolean, statDelta: number) => {
    if (!curPuzDef) return
    const nDone = [...puzDone, curPuzDef.id]
    const nOk = puzOk + (ok ? 1 : 0)
    const nFail = puzFail + (ok ? 0 : 1)
    setPuzDone(nDone); setPuzOk(nOk); setPuzFail(nFail)
    playSound(ok ? 'success' : 'error')
    const ns = aplicarPuzzle(stats, curPuzDef, statDelta)
    if (ns !== stats) setStats(ns)
    // Lo que el alumno hizo en el puzzle se guarda ya, no recién en la próxima decisión.
    persist({ stats: ns, puzDone: nDone, puzOk: nOk, puzFail: nFail })
  }

  const handlePharaohDone = (bFx: Partial<Stats>, mFx: Partial<Stats>) => {
    const r = resolverCoronacion(estadoTurno(), bFx, mFx)
    aplicarTurno(r)
    if (r.fin) setScreen('end')
  }

  const totalEvents = gameEvents.length || 32
  const perP = totalEvents / 4
  const curPeriod = PERIODS[Math.min(3, Math.floor(evIdx / perP))]
  const ev = gameEvents[evIdx]
  const evPeriod = ev && PERIODS.find(p => p.id === ev.per)

  // Las opciones se escriben con la «trampa» (la cruel) al final y la mejor casi siempre
  // arriba: medido sobre los 62 eventos, la cruel cae en la D 59 veces y la mejor en la A
  // el 60 %. Sin barajar, el alumno aprende el patrón en diez minutos y no lee. El orden
  // vive acá, en el estado de la pantalla, y `handleChoice` recibe la opción, no un índice.
  const shownOpts = useMemo(() => (ev ? barajar(ev.opts) : []), [ev])

  const gameJSX = (
    <motion.div
      key="game"
      className="game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Encabezado: nombre del juego y los botones a mano (Papiros, Opciones, Menú, Música) */}
      <header className="game-hd">
        <div className="game-hd-in">
          <h1 className="game-hd-title">𓆣 Dioses del Nilo</h1>
          <div className="game-hd-actions">
            <button className="hd-btn" aria-label="Papiros" title="Papiros" onClick={() => { setPapirosPrev('game'); setScreen('papiros') }}>
              <span aria-hidden="true">📜</span><span className="hd-txt">Papiros</span>
            </button>
            <button className="hd-btn hd-btn--opc" aria-label="Opciones" title="Opciones" onClick={() => setShowAjustes(true)}>
              <span aria-hidden="true">⚙️</span><span className="hd-txt">Opciones</span>
            </button>
            <button className="hd-btn hd-btn--menu" aria-label="Menú" title="Menú" onClick={() => setConfirmMenu(true)}>
              <span aria-hidden="true">🏠</span><span className="hd-txt">Menú</span>
            </button>
            <button className="hd-btn hd-btn--music" onClick={() => alternarMusica(!musicOn)} title={musicOn ? 'Silenciar música' : 'Activar música'} aria-label={musicOn ? 'Silenciar música' : 'Activar música'}>
              <span aria-hidden="true">{musicOn ? '🔊' : '🔇'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Timeline */}
      <div className="tl-bar">
        <div className="tl-inner">
          {PERIODS.map((p, i) => {
            const completed = Math.max(0, Math.min(perP, evIdx - i * perP))
            const pct = Math.round((completed / perP) * 100)
            return (
              <div
                key={p.id}
                className={`period${curPeriod?.id === p.id ? ' active' : ''}`}
                style={{ '--pcol': p.col, '--pct': `${pct}%` } as React.CSSProperties}
                aria-label={`${p.name}, ${p.dates}`}
              >
                <div className="period-fill" />
                <span className="period-name">
                  <span className="pn-full">{p.name}</span>
                  <span className="pn-short" aria-hidden="true">{p.name.replace(/^Imperio |^Período | Imperio$/, '')}</span>
                </span>
                <span className="period-dates">{p.dates}</span>
              </div>
            )
          })}
          <div className="ev-counter">{Math.min(evIdx + 1, totalEvents)}/{totalEvents}</div>
        </div>
      </div>

      {/* Layout */}
      <div className="game-layout">
        {/* Stats panel */}
        <aside className={`stats-panel${statsOpen ? '' : ' stats-panel--plegado'}`}>
          <div className="sp-top">
            <div className="god-badge">
              <span className="god-badge-icon">{god?.icon}</span>
              <span className="god-badge-name">{god?.name}</span>
            </div>
            <button
              className="sp-toggle"
              aria-expanded={statsOpen}
              aria-controls="stats-body"
              aria-label="Estadísticas del reino"
              onClick={toggleStats}
            >
              <span className="sp-toggle-txt">Estadísticas</span>
              <span aria-hidden="true" className="sp-chev">{statsOpen ? '▴' : '▾'}</span>
            </button>
          </div>
          <div id="stats-body" className={statsOpen ? 'sp-body' : 'sp-body sp-chips'}>
            {statsOpen ? (
              <>
            {(Object.keys(INIT) as (keyof Stats)[]).map(k => (
              <div
                key={k}
                className="stat-row stat-row--clickable"
                onClick={() => setStatInfoKey(k)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStatInfoKey(k) } }}
                role="button"
                tabIndex={0}
                aria-label={`${STAT_LABELS[k]}: ${stats[k]}. Más información`}
                title="Toca para más info"
              >
                <div className="stat-hd">
                  <span className="stat-ico" aria-hidden="true">{STAT_ICONS[k]}</span>
                  <span className="stat-lbl">{STAT_LABELS[k]}</span>
                  <span className="stat-val">{stats[k]}</span>
                </div>
                <div className="stat-bg">
                  <AnimatedStatBar value={stats[k]} color={STAT_COLORS[k]} />
                </div>
                {lastFx && lastFx[k] !== undefined && lastFx[k] !== 0 && (
                  <span key={`${animKey}${k}`} className={`stat-delta ${(lastFx[k] ?? 0) > 0 ? 'pos' : 'neg'}`}>
                    {(lastFx[k] ?? 0) > 0 ? '+' : ''}{lastFx[k]}
                  </span>
                )}
              </div>
            ))}
              </>
            ) : (
              (Object.keys(INIT) as (keyof Stats)[]).map(k => (
                <button
                  key={k}
                  className="stat-chip"
                  onClick={() => setStatInfoKey(k)}
                  aria-label={`${STAT_LABELS[k]}: ${stats[k]}. Más información`}
                  title={STAT_LABELS[k]}
                >
                  <span className="stat-chip-ico" aria-hidden="true">{STAT_ICONS[k]}</span>
                  <span className="stat-chip-val">{stats[k]}</span>
                  <span className="stat-chip-bar" aria-hidden="true"><span style={{ width: `${stats[k]}%`, background: STAT_COLORS[k] }} /></span>
                  {lastFx && lastFx[k] !== undefined && lastFx[k] !== 0 && (
                    <span key={`${animKey}${k}`} className={`stat-delta ${(lastFx[k] ?? 0) > 0 ? 'pos' : 'neg'}`}>
                      {(lastFx[k] ?? 0) > 0 ? '+' : ''}{lastFx[k]}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Event / Puzzle */}
        <main className="event-panel">
          {curPuzDef ? (
            <motion.div
              key={`puz-${curPuzDef.id}`}
              className="puz-wrap"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Local Suspense boundary: a puzzle chunk suspending must only
                  blank this panel, not bubble up and interrupt the parent
                  AnimatePresence screen-transition (see lazy-loading note above). */}
              <Suspense fallback={<div className="lazy-fallback lazy-fallback--inline">𓇳</div>}>
                {curPuzDef.type === 'glifos' && <GlyphPuzzle puz={curPuzDef} onDone={handlePuzDone} />}
                {curPuzDef.type === 'ordenar' && <WordOrder puz={curPuzDef} onDone={handlePuzDone} />}
                {curPuzDef.type === 'balanza' && <MaatScale puz={curPuzDef} onDone={handlePuzDone} />}
                {curPuzDef.type === 'faraones' && <PharaohTimeline puz={curPuzDef} onDone={handlePuzDone} />}
              </Suspense>
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
            <motion.div
              key={evIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <CatImage key={ev.cat} cat={ev.cat} />
              <div className="ev-hd">
                <span className="ev-num">Evento {evIdx + 1} / {totalEvents}</span>
                {evPeriod && <span className="ev-tag period">{evPeriod.name}</span>}
                <span className="ev-tag cat">{ev.cat.toUpperCase()}</span>
                {ev.godOnly && god && <span className="ev-tag god" style={{ borderColor: god.col, color: god.col }}>{god.icon} Evento de {god.name}</span>}
              </div>
              <h2 className="ev-title">{ev.title}</h2>
              <p className="ev-desc">{processGlossary(ev.desc, setGlossWord)}</p>
              <div className="hist-ctx">
                <span className="ctx-lbl">📚 Contexto histórico</span>
                <p>{processGlossary(ev.ctx, setGlossWord)}</p>
              </div>
              <AdvisorPanel stats={stats} eventCat={ev.cat} />
              <div className="opts">
                {shownOpts.map((opt, i) => (
                  <button key={i} className={`opt ${opt.type}`} onClick={() => handleChoice(opt)}>
                    <span className="opt-type-badge">
                      {OPT_TYPE_ICONS[opt.type] ?? '⚡'} {OPTION_TYPE_LABELS[opt.type] ?? opt.type}
                    </span>
                    <span className="opt-txt">{opt.t}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--dim)' }}>Cargando...</div>
          )}
        </main>
      </div>

      {showModal && <InfoModal onClose={() => setShowModal(false)} />}

      <AnimatePresence>
        {glossWord && (
          <GlossaryModal key="gmod" word={glossWord} onClose={() => setGlossWord(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {godModalData && god && (
          <GodModal
            key="godmod"
            god={god}
            approval={godModalData.approval}
            encouragement={godModalData.encouragement}
            fact={godModalData.fact}
            onClose={() => {
              setGodModalData(null)
              if (pendingEnd.current) {
                pendingEnd.current = false
                setScreen('end')
              } else if (pendingPeriodTrans.current) {
                const d = pendingPeriodTrans.current
                pendingPeriodTrans.current = null
                setPeriodTransData(d)
                setScreen('periodTransition')
              }
            }}
          />
        )}
      </AnimatePresence>


      <AnimatePresence>
        {statInfoKey && (
          <StatInfoModal
            key="si"
            statKey={statInfoKey}
            onClose={() => setStatInfoKey(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ev?.isPharaoh && ev.pharaohId && PHARAOHS[ev.pharaohId] && (
          <PharaohModal
            key="pharaoh-modal"
            pharaoh={PHARAOHS[ev.pharaohId]}
            onDone={handlePharaohDone}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmMenu && (
          <ConfirmModal
            key="confirm-menu"
            title="¿Volver al menú?"
            message="La partida está guardada. Podrás continuarla más tarde."
            confirmLabel="Volver al menú"
            cancelLabel="Seguir jugando"
            icon="🏠"
            onConfirm={() => { setConfirmMenu(false); stopMusic(); setScreen('menu') }}
            onCancel={() => setConfirmMenu(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )

  // ── DEV: debug helpers (extracted) ────────────────────────────────────────
  const { skipEvent, triggerPeriodTransition } = useDevTools({
    gameEvents, evIdx, stats, totalEvents, handleChoice,
    setPeriodTransData, setScreen,
  })

  function renderScreen() {
    if (screen === 'menu')      return <MenuScreen      key="menu"      hasSave={hasSave} onNew={() => setScreen('name')} onContinue={continueGame} onAchievements={() => { setPapirosPrev('menu'); setScreen('papiros') }} onOpciones={() => setShowAjustes(true)} onInfo={() => setShowModal(true)} onDeleteSave={() => { clearSave(); setScreen('menu') }} />
    if (screen === 'name')      return <NameScreen      key="name"      onFinish={n => { setPlayerName(n); setScreen('intro') }} onBack={() => setScreen('menu')} />
    if (screen === 'intro')     return <IntroScreen     key="intro"     playerName={playerName} onFinish={() => setScreen('godSelect')} />
    if (screen === 'godSelect') return <GodSelectScreen key="godSelect" onSelect={startGame} onBack={() => setScreen('menu')} />
    if (screen === 'papiros')         return <PapirosScreen         key="papiros"         achievements={achievements} history={history} god={god} stats={stats} startTime={startTime.current} onBack={() => setScreen(papirosPrev)} />
    if (screen === 'end')             return <EndScreen             key="end"             stats={stats} achievements={achievements} god={god} startTime={startTime.current} playerName={playerName} onNew={() => { clearSave(); setScreen('menu') }} onMenu={() => setScreen('menu')} />
    if (screen === 'periodTransition' && periodTransData) return <PeriodTransitionScreen key="periodTransition" data={periodTransData} onContinue={() => setScreen('game')} />
    return gameJSX
  }

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen key="splash" />}</AnimatePresence>
      <AnimatePresence>{renderScreen()}</AnimatePresence>
      {/* Fuera de `gameJSX`, a propósito. Está en la raíz de <App>, como InfoModal, y sin AnimatePresence.
          En ~1 de cada 10 partidas del e2e el primer modal de consejeros quedaba en pantalla con
          `consejer === null`: el árbol de React lo seguía teniendo bajo la cadena
          cmod < game < game, o sea dentro de una copia vieja del elemento `game` que conserva el
          AnimatePresence de las pantallas. Acá su cierre depende sólo de su propio estado. */}
      {consejer && (
        <ConsejerModal
          key="cmod"
          choice={consejer.choice}
          fx={consejer.fx}
          power={consejer.power}
          card={consejer.card}
          onContinue={() => {
            setConsejer(null)
            if (pendingGodModal.current) {
              const d = pendingGodModal.current
              pendingGodModal.current = null
              setGodModalData(d)
            } else if (pendingEnd.current) {
              pendingEnd.current = false
              setScreen('end')
            } else if (pendingPeriodTrans.current) {
              const d = pendingPeriodTrans.current
              pendingPeriodTrans.current = null
              setPeriodTransData(d)
              setScreen('periodTransition')
            }
          }}
        />
      )}
      {showModal && <InfoModal onClose={() => setShowModal(false)} />}
      {showAjustes && <AjustesModal onClose={() => setShowAjustes(false)} onMusica={alternarMusica} />}
      {import.meta.env.DEV && (
        <DebugPanel actions={{
          evIdx, totalEvents, stats, god, screen,
          setEvIdx, setStats, setScreen,
          skipEvent, triggerPeriodTransition,
        }} />
      )}
    </>
  )
}
