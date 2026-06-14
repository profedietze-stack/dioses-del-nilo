import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import type { God, Stats, Screen, HistoryEntry, GameStats, EventOption, GameEvent } from './types'
import { GODS } from './data/gods'
import { PERIODS } from './data/periods'
import { STAT_ICONS, STAT_LABELS, STAT_COLORS } from './data/periods'
import { buildGameEvents, getEventsById } from './data/eventPools'
import { PUZZLES_DEF } from './data/puzzles'
import { INIT, clamp, applyFx } from './utils/gameLogic'
import { loadSave, writeSave, clearSave } from './utils/save'
import { startMusic, stopMusic, toggleMusic, playSound } from './audio/musicEngine'
import { MenuScreen } from './components/screens/MenuScreen'
import { GodSelectScreen } from './components/screens/GodSelectScreen'
import { PapirosScreen } from './components/screens/PapirosScreen'
import { EndScreen } from './components/screens/EndScreen'
import { GlyphPuzzle } from './components/puzzles/GlyphPuzzle'
import { WordOrder } from './components/puzzles/WordOrder'
import { InfoModal } from './components/ui/InfoModal'
import { ConsejerModal } from './components/ui/ConsejerModal'
import { AdvisorPanel } from './components/ui/AdvisorPanel'

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
  const [musicOn, setMusicOn] = useState(true)
  const [gs, setGs] = useState<GameStats>({ mil: 0, peace: 0, revived: false, stabStr: 0, infMax: 0, cruel: 0 })
  const startTime = useRef(Date.now())
  const pendingEnd = useRef(false)

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
    if (nIdx >= gameEvents.length) pendingEnd.current = true
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
            <div key={k} className="stat-row">
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
              <p className="ev-desc">{ev.desc}</p>
              <div className="hist-ctx">
                <span className="ctx-lbl">📚 Contexto histórico</span>
                <p>{ev.ctx}</p>
              </div>
              <AdvisorPanel stats={stats} eventCat={ev.cat} />
              <div className="opts">
                {ev.opts.map((opt, i) => (
                  <button key={i} className={`opt ${opt.type}`} onClick={() => handleChoice(opt)}>
                    <span className="opt-txt">{opt.t}</span>
                  </button>
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
        {consejer && (
          <ConsejerModal
            key="cmod"
            choice={consejer.choice}
            fx={consejer.fx}
            onContinue={() => {
              setConsejer(null)
              if (pendingEnd.current) { pendingEnd.current = false; setScreen('end') }
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )

  function renderScreen() {
    if (screen === 'menu')      return <MenuScreen      key="menu"      hasSave={hasSave} onNew={() => setScreen('godSelect')} onContinue={continueGame} onAchievements={() => setScreen('papiros')} onInfo={() => setShowModal(true)} />
    if (screen === 'godSelect') return <GodSelectScreen key="godSelect" onSelect={startGame} onBack={() => setScreen('menu')} />
    if (screen === 'papiros')   return <PapirosScreen   key="papiros"   achievements={achievements} history={history} god={god} stats={stats} startTime={startTime.current} onBack={() => setScreen('menu')} />
    if (screen === 'end')       return <EndScreen       key="end"       stats={stats} achievements={achievements} god={god} startTime={startTime.current} onNew={() => { clearSave(); setScreen('menu') }} onMenu={() => setScreen('menu')} />
    return gameJSX
  }

  return (
    <>
      <AnimatePresence>{renderScreen()}</AnimatePresence>
      {showModal && <InfoModal onClose={() => setShowModal(false)} />}
    </>
  )
}
