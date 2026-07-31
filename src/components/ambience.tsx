import { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Sfx = "sparkle" | "page" | "bloom" | "pop";

type AudioCtxValue = {
  started: boolean;
  muted: boolean;
  start: () => void;
  toggleMute: () => void;
  swell: (level: number) => void;
  sfx: (kind: Sfx) => void;
};

const Ctx = createContext<AudioCtxValue | null>(null);

export function useAmbience() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAmbience must be used inside <AmbienceProvider>");
  return ctx;
}

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
const CHORDS = [
  [130.81, 196.0, 329.63],
  [174.61, 261.63, 349.23],
  [196.0, 293.66, 392.0],
  [146.83, 220.0, 349.23],
];

export function AmbienceProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const ac = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const musicGain = useRef<GainNode | null>(null);
  const timer = useRef<number | null>(null);
  const step = useRef(0);

  const ensure = useCallback(() => {
    if (ac.current) return ac.current;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const c = new AC();
    const m = c.createGain();
    m.gain.value = 0.9;
    m.connect(c.destination);
    const mg = c.createGain();
    mg.gain.value = 0.18;
    mg.connect(m);
    ac.current = c;
    master.current = m;
    musicGain.current = mg;
    return c;
  }, []);

  const note = useCallback(
    (freq: number, time: number, dur: number, gain: number, dest?: GainNode) => {
      const c = ac.current;
      if (!c) return;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(gain, time + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      osc.connect(g);
      g.connect(dest ?? musicGain.current ?? c.destination);
      osc.start(time);
      osc.stop(time + dur + 0.05);
    },
    [],
  );

  const start = useCallback(() => {
    const c = ensure();
    void c.resume();
    if (timer.current) return;
    setStarted(true);
    // wind / air bed
    const buffer = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.35;
    const noise = c.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filt = c.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 420;
    const ng = c.createGain();
    ng.gain.value = 0.02;
    noise.connect(filt).connect(ng).connect(master.current!);
    noise.start();

    const tick = () => {
      const t = c.currentTime + 0.05;
      const chord = CHORDS[step.current % CHORDS.length] ?? CHORDS[0]!;
      chord.forEach((f, i) => note(f, t + i * 0.09, 2.6, 0.09));
      const mel = SCALE[Math.floor(Math.random() * SCALE.length)] ?? 440;
      note(mel, t + 0.5, 1.6, 0.06);
      if (Math.random() > 0.5) note(mel * 1.5, t + 1.2, 1.2, 0.04);
      step.current++;
    };
    tick();
    timer.current = window.setInterval(tick, 3000);
  }, [ensure, note]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (master.current && ac.current) {
        master.current.gain.setTargetAtTime(next ? 0 : 0.9, ac.current.currentTime, 0.2);
      }
      return next;
    });
  }, []);

  const swell = useCallback((level: number) => {
    if (musicGain.current && ac.current) {
      musicGain.current.gain.setTargetAtTime(level, ac.current.currentTime, 0.6);
    }
  }, []);

  const sfx = useCallback(
    (kind: Sfx) => {
      const c = ac.current;
      if (!c || muted) return;
      const t = c.currentTime;
      if (kind === "sparkle") {
        note(1568, t, 0.25, 0.05);
        note(2093, t + 0.06, 0.22, 0.035);
      } else if (kind === "bloom") {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, t + i * 0.07, 0.9, 0.05));
      } else if (kind === "page") {
        const b = c.createBuffer(1, c.sampleRate * 0.35, c.sampleRate);
        const d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++)
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3) * 0.5;
        const s = c.createBufferSource();
        s.buffer = b;
        const f = c.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.value = 2200;
        const g = c.createGain();
        g.gain.value = 0.25;
        s.connect(f).connect(g).connect(master.current!);
        s.start();
      } else {
        note(880, t, 0.18, 0.06);
      }
    },
    [muted, note],
  );

  useEffect(
    () => () => {
      if (timer.current) window.clearInterval(timer.current);
      void ac.current?.close();
    },
    [],
  );

  return (
    <Ctx.Provider value={{ started, muted, start, toggleMute, swell, sfx }}>
      {children}
    </Ctx.Provider>
  );
}

export function MuteButton() {
  const { muted, toggleMute, started } = useAmbience();
  if (!started) return null;
  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-champagne/60 bg-cream/70 text-ink shadow-soft backdrop-blur-md transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  );
}
