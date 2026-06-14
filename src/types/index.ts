export type StatKey = 'estabilidad' | 'riqueza' | 'cultura' | 'influencia'

export interface Stats {
  estabilidad: number
  riqueza: number
  cultura: number
  influencia: number
}

export interface GodBonus {
  estabilidad: number
  riqueza: number
  cultura: number
  influencia: number
}

export interface God {
  id: string
  name: string
  title: string
  desc: string
  icon: string
  col: string
  bon: GodBonus
  lore: string
}

export interface Period {
  id: string
  name: string
  dates: string
  col: string
}

export type OptionType = 'cultural' | 'social' | 'militar' | 'economico' | 'diplomatico' | 'politico' | 'cruel'

export interface EventOption {
  t: string
  fx: Stats
  type: OptionType
}

export interface TimelineCard {
  date: string
  ph: string
  ev: string
  tip: string
}

export interface GameEvent {
  id: number
  per: string
  cat: string
  title: string
  desc: string
  ctx: string
  opts: EventOption[]
  tl: TimelineCard
}

export type AchievementType = 'ankh' | 'escarabajo' | 'corona' | 'papiro'

export interface Achievement {
  id: string
  name: string
  ico: string
  type: AchievementType
  secret: boolean
  title: string
  desc: string
  god?: string
}

export interface Glyph {
  s: string
  c: boolean
  lbl: string
  desc: string
}

export type PuzzleType = 'ordenar' | 'glifos' | 'memoria'

export interface PuzzleDef {
  id: number
  type: PuzzleType
  afterEvent: number
  tpl?: string
  words?: string[]
  penalty: number
  cat?: string
  timeLimit?: number
  target?: number
  glyphs?: Glyph[]
}

export interface HistoryEntry {
  eventId: number
  choice: string
  effects: Stats
  statsAfter: Stats
}

export interface GameStats {
  mil: number
  peace: number
  revived: boolean
  stabStr: number
  infMax: number
  cruel: number
}

export type Screen = 'menu' | 'intro' | 'godSelect' | 'game' | 'papiros' | 'end' | 'periodTransition'

export interface PlayStyle {
  icon: string
  title: string
  desc: string
}

export interface LegacyVerdict {
  verdict: string
  color: string
  desc: string
}

export interface PeriodLore {
  id: string
  summary: string
  historicalFact: string
  factTitle: string
  achievement: string
  achievementTitle: string
  augurio: string
  nextPeriodName: string
  nextPeriodIntro: string
  nextChallenges: string[]
}

export interface PeriodTransitionData {
  fromPeriod: Period
  toPeriod: Period | null
  statsAtEnd: Stats
  playStyle: PlayStyle
  lore: PeriodLore
  verdict: LegacyVerdict
}

export interface SaveData {
  godId: string
  stats: Stats
  evIdx: number
  eventIds: number[]
  history: HistoryEntry[]
  achievements: string[]
  t: number
}
