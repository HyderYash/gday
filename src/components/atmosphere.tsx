import { useEffect, useRef, useState } from "react";
import { seeded } from "@/lib/romance";

export function Stars({ count = 90, className = "" }: { count?: number; className?: string }) {
  const rnd = seeded(7);
  const stars = Array.from({ length: count }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    s: 1 + rnd() * 2.2,
    d: rnd() * 4,
    o: 0.3 + rnd() * 0.7,
  }));
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-cream"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: s.o,
            animationDelay: `${s.d}s`,
            boxShadow: "0 0 6px currentColor",
          }}
        />
      ))}
    </div>
  );
}

export function Petals({ count = 22, tone = "blush" }: { count?: number; tone?: string }) {
  const rnd = seeded(21);
  const petals = Array.from({ length: count }, () => ({
    x: rnd() * 100,
    dur: 12 + rnd() * 16,
    delay: -rnd() * 20,
    scale: 0.5 + rnd() * 1.1,
    dx: (rnd() - 0.5) * 220,
    rot: 180 + rnd() * 540,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-drift absolute h-4 w-4"
          style={{
            left: `${p.x}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            transform: `scale(${p.scale})`,
            ["--dx" as string]: `${p.dx}px`,
            ["--rot" as string]: `${p.rot}deg`,
            color: i % 3 === 0 ? "var(--rose)" : i % 3 === 1 ? "var(--blush)" : "var(--champagne)",
            opacity: 0.85,
          }}
        >
          <path
            fill="currentColor"
            d="M12 2c5 3.2 8 6.5 8 10.2C20 17 16.4 22 12 22S4 17 4 12.2C4 8.5 7 5.2 12 2Z"
          />
        </svg>
      ))}
    </div>
  );
}

export function FloatingHearts({ count = 12 }: { count?: number }) {
  const rnd = seeded(99);
  const hearts = Array.from({ length: count }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    s: 8 + rnd() * 18,
    d: rnd() * 6,
    dur: 6 + rnd() * 6,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-floaty absolute text-rose"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            width: h.s,
            height: h.s,
            opacity: 0.35,
            animationDelay: `${h.d}s`,
            animationDuration: `${h.dur}s`,
            filter: "blur(0.3px)",
          }}
        >
          <path
            fill="currentColor"
            d="M12 21s-7.5-4.7-9.5-9A5.3 5.3 0 0 1 12 6.6 5.3 5.3 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9Z"
          />
        </svg>
      ))}
    </div>
  );
}

export function Fireflies({ count = 26 }: { count?: number }) {
  const rnd = seeded(1337);
  const flies = Array.from({ length: count }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    d: rnd() * 5,
    dur: 4 + rnd() * 5,
    s: 3 + rnd() * 4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.s,
            height: f.s,
            background: "oklch(0.93 0.14 105)",
            boxShadow: "0 0 12px 3px oklch(0.9 0.14 105 / 0.7)",
            animationDelay: `${f.d}s`,
            animationDuration: `${f.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Bokeh() {
  const rnd = seeded(555);
  const orbs = Array.from({ length: 14 }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    s: 40 + rnd() * 160,
    o: 0.08 + rnd() * 0.18,
    d: rnd() * 8,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((o, i) => (
        <span
          key={i}
          className="animate-floaty absolute rounded-full"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.s,
            height: o.s,
            opacity: o.o,
            background:
              "radial-gradient(circle, oklch(0.95 0.09 85) 0%, oklch(0.9 0.08 40 / 0) 70%)",
            filter: "blur(6px)",
            animationDelay: `${o.d}s`,
            animationDuration: `${8 + o.d}s`,
          }}
        />
      ))}
    </div>
  );
}

type Spark = { id: number; x: number; y: number; hue: string };

/** Cursor sparkle trail + click butterflies. */
export function CursorMagic() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [wings, setWings] = useState<Spark[]>([]);
  const id = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last.current < 55) return;
      last.current = now;
      const s: Spark = {
        id: id.current++,
        x: e.clientX,
        y: e.clientY,
        hue: Math.random() > 0.5 ? "var(--champagne)" : "var(--blush)",
      };
      setSparks((p) => [...p.slice(-16), s]);
      window.setTimeout(() => setSparks((p) => p.filter((q) => q.id !== s.id)), 900);
    };
    const click = (e: PointerEvent) => {
      const b: Spark = { id: id.current++, x: e.clientX, y: e.clientY, hue: "var(--lavender)" };
      setWings((p) => [...p.slice(-10), b]);
      window.setTimeout(() => setWings((p) => p.filter((q) => q.id !== b.id)), 2600);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: s.x,
            top: s.y,
            background: s.hue,
            boxShadow: `0 0 10px 2px ${s.hue}`,
            animation: "twinkle 0.9s ease-out forwards",
          }}
        />
      ))}
      {wings.map((b) => (
        <svg
          key={b.id}
          viewBox="0 0 32 24"
          className="absolute h-6 w-8"
          style={{
            left: b.x - 16,
            top: b.y - 12,
            color: "oklch(0.85 0.07 300)",
            animation: "drift 2.6s ease-out forwards",
            ["--dx" as string]: `${(Math.random() - 0.5) * 160}px`,
            ["--rot" as string]: "0deg",
            transform: "translateY(0)",
          }}
        >
          <g fill="currentColor" opacity="0.9">
            <path d="M16 12C13 3 4 3 3 9c-1 6 8 9 13 3Z" />
            <path d="M16 12c3-9 12-9 13-3 1 6-8 9-13 3Z" />
          </g>
        </svg>
      ))}
    </div>
  );
}

export function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 overflow-hidden opacity-50">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-floaty absolute rounded-full"
          style={{
            left: `${i * 34 - 10}%`,
            top: `${8 + i * 12}%`,
            width: `${280 + i * 120}px`,
            height: `${90 + i * 30}px`,
            background: "radial-gradient(circle, oklch(0.98 0.02 60 / 0.7), transparent 70%)",
            filter: "blur(18px)",
            animationDuration: `${14 + i * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
