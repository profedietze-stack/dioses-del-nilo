import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import type { God, Stats, StatKey, Screen, HistoryEntry, GameStats, EventOption, GameEvent, PeriodTransitionData } from './types'
import { GODS } from './data/gods'
import { PERIODS } from './data/periods'
import { PLAY_STYLES, PERIOD_LORE, getLegacyVerdict } from './data/periodLore'
import { PeriodTransitionScreen } from './components/screens/PeriodTransitionScreen'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS, STAT_DESC, OPTION_TYPE_LABELS } from './data/periods'
import { Tooltip } from './components/ui/Tooltip'
import { buildGameEvents, getEventsById } from './data/eventPools'
import { PUZZLES_DEF } from './data/puzzles'
import { INIT, clamp, applyFx } from './utils/gameLogic'
import { loadSave, writeSave, clearSave } from './utils/save'
import { startMusic, stopMusic, toggleMusic, playSound } from './audio/musicEngine'
import { MenuScreen } from './components/screens/MenuScreen'
import { IntroScreen } from './components/screens/IntroScreen'
import { NameScreen } from './components/screens/NameScreen'
import { DebugPanel } from './components/dev/DebugPanel'
import { parseDevParams } from './utils/devParams'
import { GodSelectScreen } from './components/screens/GodSelectScreen'
import { PapirosScreen } from './components/screens/PapirosScreen'
import { EndScreen } from './components/screens/EndScreen'
import { GlyphPuzzle } from './components/puzzles/GlyphPuzzle'
import { WordOrder } from './components/puzzles/WordOrder'
import { InfoModal } from './components/ui/InfoModal'
import { ConsejerModal } from './components/ui/ConsejerModal'
import { AdvisorPanel } from './components/ui/AdvisorPanel'
import { GlossaryModal } from './components/ui/GlossaryModal'
import { GodModal } from './components/ui/GodModal'
import { StatInfoModal } from './components/ui/StatInfoModal'
import { buildGodModal } from './data/godLore'
import { processGlossary } from './utils/processGlossary'

function requestFS() {
  const el = document.documentElement
  if (el.requestFullscreen) el.requestFullscreen().catch(() => { /* ignore */ })
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
  const [puzIdx, setPuzIdx] = useState(0)
  const [showPuz, setShowPuz] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const [consejer, setConsejer] = useState<{ fx: Partial<Stats>; choice: string } | null>(null)
  const [glossWord, setGlossWord] = useState<string | null>(null)
  const [musicOn, setMusicOn] = useState(true)
  const [gs, setGs] = useState<GameStats>({ mil: 0, peace: 0, revived: false, stabStr: 0, infMax: 0, cruel: 0 })
  const [periodTransData, setPeriodTransData] = useState<PeriodTransitionData | null>(null)
  const [godModalData, setGodModalData] = useState<{ approval: string; encouragement: string; fact: string } | null>(null)
  const [statInfoKey, setStatInfoKey] = useState<StatKey | null>(null)
  const [playerName, setPlayerName] = useState('')
  const startTime = useRef(Date.now())
  const pendingEnd = useRef(false)
  const pendingPeriodTrans = useRef<PeriodTransitionData | null>(null)
  const pendingGodModal = useRef<{ approval: string; encouragement: string; fact: string } | null>(null)
  const nextGodModalAt = useRef(3 + Math.floor(Math.random() * 3))

  // ── DEV: URL params ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const p = parseDevParams()
    if (!p) return
    if (p.godId) {
      const g = GODS.find(x => x.id === p.godId)
      if (g) {
        const events = buildGameEvents(8)
        const baseStats = { ...INIT }
        for (const k in g.bon) baseStats[k as keyof typeof baseStats] = clamp(50 + g.bon[k as keyof typeof baseStats])
        const s = p.stats ? { ...baseStats, ...p.stats } : baseStats
        const idx = p.evIdx ?? 0
        writeSave({ godId: g.id, stats: s, evIdx: idx, eventIds: events.map(e => e.id), history: [], achievements: [], t: Date.now() })
        setGod(g); setStats(s); setEvIdx(idx); setGameEvents(events); setHistory([])
        setScreen((p.screen as Screen) ?? 'game')
        console.info('[DEV] URL params applied:', p)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasSave = !!loadSave()
  const curPuzDef = PUZZLES_DEF[puzIdx]

  useEffect(() => {
    if (curPuzDef && evIdx === curPuzDef.afterEvent && !showPuz) {
      setShowPuz(true)
      playSound('puzzle_open')
    }
  }, [evIdx, puzIdx, curPuzDef, showPuz])

  const checkAch = useCallback((ns: Stats, nh: HistoryEntry[], ngs: GameStats, nPF: number, nPO: number) => {
    const gid = god?.id
    const pt = Date.now() - startTime.current
    const checks: Record<string, boolean> = {
      escriba: nPF <= 1,
      conquistador: ns.influencia > 68,
      artesano: ns.cultura > 72,
      mercader: ns.riqueza > 68,
      guardian: ns.estabilidad > 72,
      puzzlemaster: nPO >= 5,
      speedrun: pt < 3600000,
      equilibrio: nh.every(h2 => h2.statsAfter && Object.values(h2.statsAfter).every(v => v >= 40 && v <= 60)),
      tragedia: ngs.cruel >= 3,
      resurrector: ngs.revived,
      ra_solar: gid === 'ra' && Object.values(ns).every(v => v > 58),
      ra_fuego: gid === 'ra' && ngs.stabStr >= 10,
      osiris_cosecha: gid === 'osiris' && ns.riqueza > 70 && ns.estabilidad > 68,
      osiris_renacer: gid === 'osiris' && ngs.revived,
      thoth_ibis: gid === 'thoth' && ns.cultura > 75,
      horus_halcon: gid === 'horus' && ns.influencia > 75,
      horus_vengador: gid === 'horus' && ngs.mil >= 5,
      hathor_armonia: gid === 'hathor' && Object.values(ns).filter(v => v > 62).length >= 2,
      hathor_amor: gid === 'hathor' && nh.length > 0 && (ngs.peace / nh.length) >= 0.7,
      sekhmet_leona: gid === 'sekhmet' && ns.influencia > 70 && ns.riqueza > 62,
      anubis_guardian: gid === 'anubis' && ns.cultura > 68,
      anubis_guia: gid === 'anubis' && ngs.infMax <= 50,
      bastet_gato: gid === 'bastet' && ngs.stabStr >= 20,
      bastet_gracia: gid === 'bastet' && ns.influencia > 62 && ns.estabilidad > 68,
    }
    setAchievements(prev => {
      const newOnes = Object.entries(checks).filter(([id, ok]) => ok && !prev.includes(id)).map(([id]) => id)
      return newOnes.length ? [...prev, ...newOnes] : prev
    })
  }, [god])

  const startGame = (g: God) => {
    requestFS()
    playSound('select_god')
    startMusic()
    const s = { ...INIT }
    for (const k in g.bon) s[k as keyof Stats] = clamp(50 + g.bon[k as keyof Stats])
    const events = buildGameEvents(8)
    setGod(g); setStats(s); setEvIdx(0); setHistory([]); setLastFx(null)
    setGameEvents(events)
    setAchievements([]); setPuzFail(0); setPuzOk(0); setShowPuz(false); setPuzIdx(0)
    setGs({ mil: 0, peace: 0, revived: false, stabStr: 0, infMax: 0, cruel: 0 })
    startTime.current = Date.now()
    writeSave({ godId: g.id, stats: s, evIdx: 0, eventIds: events.map(e => e.id), history: [], achievements: [], t: Date.now() })
    setScreen('game')
  }

  const continueGame = () => {
    requestFS()
    startMusic()
    const sv = loadSave(); if (!sv) return
    const g = GODS.find(x => x.id === sv.godId); if (!g) return
    const events = sv.eventIds?.length ? getEventsById(sv.eventIds) : buildGameEvents(8)
    setGod(g); setStats(sv.stats ?? INIT)
    setGameEvents(events)
    setEvIdx(sv.evIdx ?? 0); setHistory(sv.history ?? [])
    setAchievements(sv.achievements ?? [])
    setScreen('game')
  }

  const handleChoice = (opt: EventOption) => {
    const ns = applyFx(stats, opt.fx)
    const ev = gameEvents[evIdx]
    const ngs = { ...gs }
    if (opt.type === 'militar') ngs.mil++
    if (['social', 'diplomatico', 'cultural'].includes(opt.type)) ngs.peace++
    if (opt.type === 'cruel') ngs.cruel++
    const hadLow = Object.values(stats).some(v => v <= 5)
    if (hadLow && Object.values(ns).every(v => v >= 50)) ngs.revived = true
    const noLoss = Object.values(opt.fx).every(v => v >= 0)
    ngs.stabStr = noLoss ? ngs.stabStr + 1 : 0
    ngs.infMax = Math.max(ngs.infMax, ns.influencia)

    const nh = [...history, { eventId: ev.id, choice: opt.t, effects: opt.fx, statsAfter: ns }]
    const nIdx = evIdx + 1

    setStats(ns); setHistory(nh); setLastFx(opt.fx); setGs(ngs)
    setAnimKey(k => k + 1)
    setEvIdx(nIdx)
    playSound('event_result')
    setConsejer({ fx: opt.fx, choice: opt.t })
    checkAch(ns, nh, ngs, puzFail, puzOk)
    if (god) writeSave({ godId: god.id, stats: ns, evIdx: nIdx, eventIds: gameEvents.map(e => e.id), history: nh, achievements: [...achievements], t: Date.now() })
    // god modal trigger — every 3-5 events, not on last event
    if (nIdx >= nextGodModalAt.current && nIdx < gameEvents.length && god) {
      const vals = Object.values(ns); const avg = vals.reduce((a, b) => a + b, 0) / vals.length
      pendingGodModal.current = buildGodModal(god.id, opt.type, avg, ev.cat)
      nextGodModalAt.current = nIdx + 3 + Math.floor(Math.random() * 3)
    }

    if (nIdx >= gameEvents.length) {
      pendingEnd.current = true
    } else {
      // detect period boundary crossing
      const total = gameEvents.length
      const perP = total / 4
      const fromPIdx = Math.floor(evIdx / perP)
      const toPIdx   = Math.floor(nIdx  / perP)
      if (toPIdx > fromPIdx && fromPIdx < 3) {
        const fromPeriod = PERIODS[fromPIdx]
        const toPeriod   = PERIODS[Math.min(3, toPIdx)]
        const pStart     = Math.round(fromPIdx * perP)
        const periodHistory = nh.slice(pStart)
        // detect play style from period history
        const typeCounts: Record<string, number> = {}
        for (const entry of periodHistory) {
          const gev = gameEvents.find(e => e.id === entry.eventId)
          const matched = gev?.opts.find(o => o.t === entry.choice)
          if (matched) typeCounts[matched.type] = (typeCounts[matched.type] ?? 0) + 1
        }
        const dominant = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'default'
        const playStyle = PLAY_STYLES[dominant] ?? PLAY_STYLES.default
        const lore = PERIOD_LORE[fromPeriod.id]
        const verdict = getLegacyVerdict(ns)
        pendingPeriodTrans.current = { fromPeriod, toPeriod, statsAtEnd: ns, playStyle, lore, verdict }
      }
    }
  }

  const handlePuzDone = (ok: boolean, statDelta: number) => {
    setShowPuz(false)
    setPuzIdx(p => p + 1)
    if (ok) { setPuzOk(p => p + 1); playSound('success') }
    else { setPuzFail(p => p + 1); playSound('error') }
    if (statDelta !== 0) {
      const perStat = Math.round(statDelta / 2)
      setStats(prev => {
        const n = { ...prev }
        for (const k of Object.keys(INIT) as (keyof Stats)[]) n[k] = clamp(n[k] + perStat)
        return n
      })
    }
  }

  const totalEvents = gameEvents.length || 32
  const perP = totalEvents / 4
  const curPeriod = PERIODS[Math.min(3, Math.floor(evIdx / perP))]
  const ev = gameEvents[evIdx]
  const evPeriod = ev && PERIODS.find(p => p.id === ev.per)

  const gameJSX = (
    <motion.div
      key="game"
      className="game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
              >
                <div className="period-fill" />
                <span className="period-name">{p.name}</span>
                <span className="period-dates">{p.dates}</span>
              </div>
            )
          })}
          <div className="ev-counter">{evIdx}/{totalEvents}</div>
        </div>
      </div>

      {/* Layout */}
      <div className="game-layout">
        {/* Stats panel */}
        <aside className="stats-panel">
          <div className="god-badge">
            <span className="god-badge-icon">{god?.icon}</span>
            <span className="god-badge-name">{god?.name}</span>
          </div>
          {(Object.keys(INIT) as (keyof Stats)[]).map(k => (
            <div key={k} className="stat-row stat-row--clickable" onClick={() => setStatInfoKey(k)} title="Toca para más info">
              <div className="stat-hd">
                <span className="stat-ico">{STAT_ICONS[k]}</span>
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
          <button className="btn-o sm" onClick={() => setScreen('papiros')}>📜 Papiros</button>
          <button className="btn-menu" onClick={() => { if (confirm('¿Volver al menú? La partida está guardada.')) { stopMusic(); setScreen('menu') } }}>🏠 Menú</button>
          <button className="btn-music" onClick={() => { const on = toggleMusic(); setMusicOn(on) }} title={musicOn ? 'Silenciar música' : 'Activar música'}>
            {musicOn ? '🔊' : '🔇'}
          </button>
        </aside>

        {/* Event / Puzzle */}
        <main className="event-panel">
          {showPuz && curPuzDef ? (
            <motion.div
              className="puz-wrap"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {curPuzDef.type === 'glifos' && <GlyphPuzzle puz={curPuzDef} onDone={handlePuzDone} />}
              {curPuzDef.type === 'ordenar' && <WordOrder puz={curPuzDef} onDone={handlePuzDone} />}
            </motion.div>
          ) : ev ? (
            <motion.div
              key={evIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="ev-hd">
                <span className="ev-num">Evento {evIdx + 1} / {totalEvents}</span>
                {evPeriod && <span className="ev-tag period">{evPeriod.name}</span>}
                <span className="ev-tag cat">{ev.cat.toUpperCase()}</span>
              </div>
              <h2 className="ev-title">{ev.title}</h2>
              <p className="ev-desc">{processGlossary(ev.desc, setGlossWord)}</p>
              <div className="hist-ctx">
                <span className="ctx-lbl">📚 Contexto histórico</span>
                <p>{processGlossary(ev.ctx, setGlossWord)}</p>
              </div>
              <AdvisorPanel stats={stats} eventCat={ev.cat} />
              <div className="opts">
                {ev.opts.map((opt, i) => (
                  <Tooltip key={i} text={OPTION_TYPE_LABELS[opt.type] ?? opt.type} pos="top" className="tip-block">
                    <button className={`opt ${opt.type}`} onClick={() => handleChoice(opt)}>
                      <span className="opt-txt">{opt.t}</span>
                    </button>
                  </Tooltip>
                ))}
              </div>
              {ev.tl && (
                <div className="tl-card">
                  <span className="tl-card-ico">📅</span>
                  <div>
                    <strong>{ev.tl.date} · {ev.tl.ph}</strong>
                    <p>{ev.tl.ev}</p>
                    <em>{ev.tl.tip}</em>
                  </div>
                </div>
              )}
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
        {consejer && (
          <ConsejerModal
            key="cmod"
            choice={consejer.choice}
            fx={consejer.fx}
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
    </motion.div>
  )

  // ── DEV: debug helpers ────────────────────────────────────────────────────
  const devRef = useRef({ gameEvents, evIdx, stats, totalEvents, handleChoice: null as unknown as typeof handleChoice })
  devRef.current = { gameEvents, evIdx, stats, totalEvents, handleChoice }

  const skipEvent = useCallback(() => {
    if (!import.meta.env.DEV) return
    const { gameEvents: evs, evIdx: idx, handleChoice: hc } = devRef.current
    const ev = evs[idx]
    if (!ev) return
    const opt = ev.opts[Math.floor(Math.random() * ev.opts.length)]
    if (opt) hc(opt)
  }, [])

  const triggerPeriodTransition = useCallback((fromPeriodIdx: number) => {
    if (!import.meta.env.DEV) return
    const fromPeriod = PERIODS[fromPeriodIdx]
    const toPeriod   = PERIODS[Math.min(3, fromPeriodIdx + 1)]
    if (!fromPeriod) return
    const { stats: s } = devRef.current
    const lore    = PERIOD_LORE[fromPeriod.id]
    const verdict = getLegacyVerdict(s)
    setPeriodTransData({ fromPeriod, toPeriod, statsAtEnd: s, playStyle: PLAY_STYLES.default, lore, verdict })
    setScreen('periodTransition')
  }, [])

  // ── DEV: keyboard shortcuts ───────────────────────────────────────────────
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const handler = (e: KeyboardEvent) => {
      if (!e.shiftKey) return
      if (e.key === 'ArrowRight') { e.preventDefault(); skipEvent() }
      if (e.key === 'P') {
        e.preventDefault()
        const { evIdx: idx, totalEvents: tot } = devRef.current
        triggerPeriodTransition(Math.min(2, Math.floor(idx / (tot / 4))))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [skipEvent, triggerPeriodTransition])

  function renderScreen() {
    if (screen === 'menu')      return <MenuScreen      key="menu"      hasSave={hasSave} onNew={() => setScreen('name')} onContinue={continueGame} onAchievements={() => setScreen('papiros')} onInfo={() => setShowModal(true)} />
    if (screen === 'name')      return <NameScreen      key="name"      onFinish={n => { setPlayerName(n); setScreen('intro') }} onBack={() => setScreen('menu')} />
    if (screen === 'intro')     return <IntroScreen     key="intro"     playerName={playerName} onFinish={() => setScreen('godSelect')} />
    if (screen === 'godSelect') return <GodSelectScreen key="godSelect" onSelect={startGame} onBack={() => setScreen('menu')} />
    if (screen === 'papiros')         return <PapirosScreen         key="papiros"         achievements={achievements} history={history} god={god} stats={stats} startTime={startTime.current} onBack={() => setScreen('menu')} />
    if (screen === 'end')             return <EndScreen             key="end"             stats={stats} achievements={achievements} god={god} startTime={startTime.current} onNew={() => { clearSave(); setScreen('menu') }} onMenu={() => setScreen('menu')} />
    if (screen === 'periodTransition' && periodTransData) return <PeriodTransitionScreen key="periodTransition" data={periodTransData} onContinue={() => setScreen('game')} />
    return gameJSX
  }

  return (
    <>
      <AnimatePresence>{renderScreen()}</AnimatePresence>
      {showModal && <InfoModal onClose={() => setShowModal(false)} />}
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
