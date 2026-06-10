// Egyptian ambient music engine — Web Audio API, no files needed
// Preserved exactly from prototype. Maqam Hijaz Kar scale, doumbek patterns.

let audioCtx: AudioContext | null = null
let musicNodes: AudioScheduledSourceNode[] = []
let musicPlaying = false
let musicGain: GainNode | null = null
let luteTimeout: ReturnType<typeof setTimeout> | null = null
let neyTimeout: ReturnType<typeof setTimeout> | null = null
let drumTimeout: ReturnType<typeof setTimeout> | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

function pluckNote(ctx: AudioContext, freq: number, time: number, dur: number, vol: number, gain: GainNode) {
  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const osc3 = ctx.createOscillator()
  const env = ctx.createGain()
  const filt = ctx.createBiquadFilter()
  osc1.type = 'triangle'; osc1.frequency.value = freq
  osc2.type = 'sawtooth'; osc2.frequency.value = freq * 2.01
  osc3.type = 'sine'; osc3.frequency.value = freq * 3.0
  filt.type = 'lowpass'
  filt.frequency.setValueAtTime(freq * 8, time)
  filt.frequency.exponentialRampToValueAtTime(freq * 2, time + dur * 0.3)
  filt.Q.value = 1.5
  env.gain.setValueAtTime(0, time)
  env.gain.linearRampToValueAtTime(vol, time + 0.008)
  env.gain.exponentialRampToValueAtTime(vol * 0.6, time + dur * 0.15)
  env.gain.exponentialRampToValueAtTime(0.0001, time + dur)
  const m1 = ctx.createGain(); m1.gain.value = 1.0
  const m2 = ctx.createGain(); m2.gain.value = 0.3
  const m3 = ctx.createGain(); m3.gain.value = 0.1
  osc1.connect(m1); m1.connect(filt)
  osc2.connect(m2); m2.connect(filt)
  osc3.connect(m3); m3.connect(filt)
  filt.connect(env); env.connect(gain)
  osc1.start(time); osc1.stop(time + dur)
  osc2.start(time); osc2.stop(time + dur)
  osc3.start(time); osc3.stop(time + dur)
  musicNodes.push(osc1, osc2, osc3)
}

function drumHit(ctx: AudioContext, time: number, vol: number, type: string, gain: GainNode) {
  const osc = ctx.createOscillator()
  const env = ctx.createGain()
  const filt = ctx.createBiquadFilter()
  if (type === 'dum') {
    osc.type = 'sine'
    osc.frequency.setValueAtTime(160, time)
    osc.frequency.exponentialRampToValueAtTime(60, time + 0.15)
    filt.type = 'lowpass'; filt.frequency.value = 300
    env.gain.setValueAtTime(vol, time)
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.18)
  } else if (type === 'tek') {
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(400, time)
    osc.frequency.exponentialRampToValueAtTime(200, time + 0.06)
    filt.type = 'highpass'; filt.frequency.value = 200
    env.gain.setValueAtTime(vol * 0.7, time)
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.08)
  } else {
    osc.type = 'sine'
    osc.frequency.setValueAtTime(280, time)
    osc.frequency.exponentialRampToValueAtTime(180, time + 0.05)
    filt.type = 'bandpass'; filt.frequency.value = 800; filt.Q.value = 2
    env.gain.setValueAtTime(vol * 0.4, time)
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.06)
  }
  osc.connect(filt); filt.connect(env); env.connect(gain)
  osc.start(time); osc.stop(time + 0.25)
  musicNodes.push(osc)
}

function neyNote(ctx: AudioContext, freq: number, time: number, dur: number, vol: number, gain: GainNode) {
  const osc = ctx.createOscillator()
  const noise = ctx.createOscillator()
  const env = ctx.createGain()
  const filt = ctx.createBiquadFilter()
  const noiseFilt = ctx.createBiquadFilter()
  const noiseGain = ctx.createGain()
  osc.type = 'sawtooth'; osc.frequency.value = freq
  const vib = ctx.createOscillator()
  const vibGain = ctx.createGain()
  vib.frequency.value = 5.5; vibGain.gain.value = freq * 0.012
  vib.connect(vibGain); vibGain.connect(osc.frequency)
  filt.type = 'bandpass'; filt.frequency.value = freq * 1.5; filt.Q.value = 3
  noise.type = 'sawtooth'; noise.frequency.value = freq * 0.5 + Math.random() * 20
  noiseFilt.type = 'highpass'; noiseFilt.frequency.value = freq * 3
  noiseGain.gain.value = 0.04
  env.gain.setValueAtTime(0, time)
  env.gain.linearRampToValueAtTime(vol * 0.6, time + 0.06)
  env.gain.setValueAtTime(vol * 0.5, time + dur - 0.05)
  env.gain.linearRampToValueAtTime(0, time + dur)
  osc.connect(filt); filt.connect(env); env.connect(gain)
  noise.connect(noiseFilt); noiseFilt.connect(noiseGain); noiseGain.connect(gain)
  osc.start(time); osc.stop(time + dur)
  noise.start(time); noise.stop(time + dur)
  vib.start(time); vib.stop(time + dur)
  musicNodes.push(osc, noise, vib)
}

// Maqam Hijaz Kar scale frequencies
const D3=146.83,D4=293.66,Eb4=311.13,F4=349.23,G4=392,Ab4=415.3,A4=440,Bb3=233.08
const C5=261.63*2,D5=293.66*2,F5=349.23*2,G5=392*2,A5=440*2

const LUTE_PHRASES: [number, number, number][][] = [
  [[D5,0.3,0.7],[C5,0.2,0.6],[Bb3*2,0.3,0.65],[A5*0.5,0.2,0.5],[G4,0.4,0.6],[F4,0.3,0.55],[Eb4,0.5,0.7],[D4,0.6,0.8]],
  [[D4,0.2,0.6],[F4,0.15,0.55],[G4,0.2,0.6],[Ab4,0.15,0.5],[A4,0.3,0.7],[C5,0.2,0.6],[D5,0.5,0.8],[C5,0.2,0.5],[A4,0.4,0.6]],
  [[A4,0.4,0.7],[G4,0.15,0.5],[Ab4,0.15,0.55],[G4,0.3,0.6],[F4,0.2,0.5],[Eb4,0.35,0.65],[D4,0.15,0.5],[Eb4,0.15,0.5],[F4,0.4,0.7],[D4,0.6,0.75]],
  [[G4,0.2,0.6],[F4,0.15,0.5],[Eb4,0.2,0.6],[D4,0.3,0.7],[Eb4,0.15,0.5],[F4,0.4,0.65],[G4,0.5,0.75]],
  [[D5,0.2,0.65],[Eb4*2,0.15,0.55],[F5,0.25,0.7],[G5*0.5,0.2,0.6],[A5*0.5,0.35,0.75],[G5*0.5,0.15,0.5],[F5,0.2,0.55],[Eb4*2,0.3,0.6],[D5,0.5,0.8]],
]

const NEY_PHRASES: [number, number, number][][] = [
  [[D5,0.6,0.35],[F5,0.4,0.3],[G5*0.5,0.8,0.4],[F5,0.3,0.3],[D5,1.0,0.35]],
  [[A5*0.5,0.5,0.3],[G5*0.5,0.3,0.25],[F5,0.4,0.3],[Eb4*2,0.6,0.35],[D5,0.8,0.4]],
  [[G4*2,0.4,0.3],[Ab4*2,0.3,0.25],[G4*2,0.3,0.3],[F4*2,0.5,0.35],[Eb4*2,0.4,0.3],[D3*2,1.0,0.4]],
]

const MAQSUM = [
  {t:0,v:0.4,s:'dum'},{t:0.5,v:0.3,s:'tek'},{t:0.75,v:0.2,s:'ka'},
  {t:1.0,v:0.3,s:'tek'},{t:1.5,v:0.4,s:'dum'},{t:1.75,v:0.25,s:'tek'},
  {t:2.0,v:0.25,s:'tek'},{t:2.25,v:0.2,s:'ka'},
]

const MASMOUDI = [
  {t:0,v:0.45,s:'dum'},{t:0.75,v:0.2,s:'ka'},{t:1.0,v:0.35,s:'dum'},
  {t:1.5,v:0.3,s:'tek'},{t:2.0,v:0.2,s:'ka'},{t:2.5,v:0.35,s:'tek'},
  {t:3.0,v:0.4,s:'dum'},{t:3.5,v:0.25,s:'tek'},
]

export function startMusic() {
  if (musicPlaying) return
  try {
    const ctx = getCtx()
    musicPlaying = true
    musicGain = ctx.createGain()
    musicGain.gain.setValueAtTime(0, ctx.currentTime)
    musicGain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 2)
    const delay = ctx.createDelay(0.3)
    const delayGain = ctx.createGain()
    delay.delayTime.value = 0.18; delayGain.gain.value = 0.18
    musicGain.connect(delay); delay.connect(delayGain); delayGain.connect(delay)
    const luteGain = ctx.createGain(); luteGain.gain.value = 0.9
    const neyGain = ctx.createGain(); neyGain.gain.value = 0.5
    const drumGain = ctx.createGain(); drumGain.gain.value = 0.7
    luteGain.connect(musicGain); neyGain.connect(musicGain); drumGain.connect(musicGain)
    delayGain.connect(ctx.destination); musicGain.connect(ctx.destination)
    let phraseIdx = 0, neyPhraseIdx = 0, usePattern = 0
    function playLutePhrase() {
      if (!musicPlaying) return
      const c = getCtx(); const now = c.currentTime
      const phrase = LUTE_PHRASES[phraseIdx % LUTE_PHRASES.length]; phraseIdx++
      let totalDur = 0
      phrase.forEach(([freq, dur, vol]) => { pluckNote(c, freq, now + totalDur, dur * 1.1, vol * 0.18, luteGain); totalDur += dur })
      luteTimeout = setTimeout(playLutePhrase, (totalDur * 1000) + 400 + Math.random() * 800)
    }
    function playNeyPhrase() {
      if (!musicPlaying) return
      const c = getCtx(); const now = c.currentTime
      const phrase = NEY_PHRASES[neyPhraseIdx % NEY_PHRASES.length]; neyPhraseIdx++
      let totalDur = 0
      phrase.forEach(([freq, dur, vol]) => { neyNote(c, freq, now + totalDur, dur * 1.2, vol * 0.12, neyGain); totalDur += dur })
      neyTimeout = setTimeout(playNeyPhrase, (totalDur * 1000) + 2000 + Math.random() * 3000)
    }
    function playDrumCycle() {
      if (!musicPlaying) return
      const c = getCtx(); const now = c.currentTime
      const pattern = usePattern % 4 < 3 ? MAQSUM : MASMOUDI
      const cycleDur = usePattern % 4 < 3 ? 2.5 : 4.0; usePattern++
      pattern.forEach(({ t, v, s }) => { drumHit(c, now + t, v * 0.12, s, drumGain) })
      drumTimeout = setTimeout(playDrumCycle, cycleDur * 1000)
    }
    playLutePhrase()
    setTimeout(playNeyPhrase, 3000)
    setTimeout(playDrumCycle, 1500)
  } catch { musicPlaying = false }
}

export function stopMusic() {
  musicPlaying = false
  if (luteTimeout) clearTimeout(luteTimeout)
  if (neyTimeout) clearTimeout(neyTimeout)
  if (drumTimeout) clearTimeout(drumTimeout)
  luteTimeout = neyTimeout = drumTimeout = null
  musicNodes.forEach(n => { try { n.stop() } catch { /* already stopped */ } })
  musicNodes = []
  if (musicGain) {
    try {
      const ctx = getCtx()
      musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime)
      musicGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
    } catch { /* ignore */ }
    musicGain = null
  }
}

export function toggleMusic(): boolean {
  if (musicPlaying) { stopMusic(); return false }
  else { startMusic(); return true }
}

export function isMusicPlaying(): boolean {
  return musicPlaying
}

export function playSound(type: string) {
  try {
    const ctx = getCtx()
    const g = ctx.createGain()
    g.connect(ctx.destination)
    const now = ctx.currentTime
    if (type === 'click') {
      const o = ctx.createOscillator(); o.type = 'sine'
      o.frequency.setValueAtTime(280, now); o.frequency.exponentialRampToValueAtTime(140, now + 0.08)
      g.gain.setValueAtTime(0.18, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
      o.connect(g); o.start(now); o.stop(now + 0.12)
    } else if (type === 'hover') {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(520, now)
      g.gain.setValueAtTime(0.06, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      o.connect(g); o.start(now); o.stop(now + 0.05)
    } else if (type === 'success') {
      ;[392, 523, 659, 784].forEach((freq, i) => {
        const o = ctx.createOscillator(); const og = ctx.createGain()
        o.type = 'triangle'; o.frequency.value = freq
        og.gain.setValueAtTime(0, now + i * 0.1); og.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.04)
        og.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35)
        o.connect(og); og.connect(ctx.destination); o.start(now + i * 0.1); o.stop(now + i * 0.1 + 0.35)
      })
    } else if (type === 'error') {
      const o = ctx.createOscillator(); o.type = 'sawtooth'
      o.frequency.setValueAtTime(120, now); o.frequency.exponentialRampToValueAtTime(60, now + 0.2)
      g.gain.setValueAtTime(0.15, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
      o.connect(g); o.start(now); o.stop(now + 0.25)
    } else if (type === 'select_god') {
      ;[80, 160, 240].forEach((freq, i) => {
        const o = ctx.createOscillator(); const og = ctx.createGain()
        o.type = 'sine'; o.frequency.value = freq
        og.gain.setValueAtTime(0.18 - i * 0.04, now); og.gain.exponentialRampToValueAtTime(0.001, now + 1.5)
        o.connect(og); og.connect(ctx.destination); o.start(now); o.stop(now + 1.5)
      })
    } else if (type === 'puzzle_open') {
      ;[523, 659, 784, 1047].forEach((freq, i) => {
        const o = ctx.createOscillator(); const og = ctx.createGain()
        o.type = 'sine'; o.frequency.value = freq
        og.gain.setValueAtTime(0, now + i * 0.06); og.gain.linearRampToValueAtTime(0.12, now + i * 0.06 + 0.05)
        og.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.5)
        o.connect(og); og.connect(ctx.destination); o.start(now + i * 0.06); o.stop(now + i * 0.06 + 0.5)
      })
    } else if (type === 'event_result') {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3
      const src = ctx.createBufferSource(); src.buffer = buf
      const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'
      filter.frequency.value = 2000; filter.Q.value = 0.5
      src.connect(filter); filter.connect(g)
      g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
      src.start(now); src.stop(now + 0.12)
    }
  } catch { /* audio not available */ }
}
