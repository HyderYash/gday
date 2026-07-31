import { motion } from "motion/react";

function Rose({ color, glow }: { color: string; glow: string }) {
  return (
    <g>
      <circle cx="0" cy="0" r="19" fill={glow} opacity="0.3" />
      {Array.from({ length: 7 }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-8"
          rx="8"
          ry="11"
          fill={color}
          opacity="0.9"
          transform={`rotate(${i * 51.4})`}
        />
      ))}
      <circle cx="0" cy="0" r="9.5" fill={color} />
      <circle cx="0" cy="0" r="9.5" fill="oklch(1 0 0 / 0.1)" />
      <circle cx="0" cy="0" r="5.5" fill="oklch(0 0 0 / 0.12)" />
      <path
        d="M0-5.5a5.5 5.5 0 1 1-3.8 9.5"
        fill="none"
        stroke="oklch(1 0 0 / 0.45)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </g>
  );
}


function Tulip({ color }: { color: string }) {
  return (
    <g>
      <path d="M-11 4c0-9 4-15 11-18 7 3 11 9 11 18 0 6-5 9-11 9S-11 10-11 4Z" fill={color} />
      <path d="M0-14c3 5 3 14 0 27-3-13-3-22 0-27Z" fill="oklch(1 0 0 / 0.18)" />
    </g>
  );
}

function Peony({ color }: { color: string }) {
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-9"
          rx="6.5"
          ry="10"
          fill={color}
          opacity={0.85}
          transform={`rotate(${i * 45})`}
        />
      ))}
      <circle cx="0" cy="0" r="5" fill="oklch(0.95 0.07 90)" />
    </g>
  );
}

function BabysBreath({ n = 9 }: { n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        const r = 10 + (i % 3) * 5;
        return (
          <circle
            key={i}
            cx={Number((Math.cos(a) * r).toFixed(3))}
            cy={Number((Math.sin(a) * r * 0.8).toFixed(3))}
            r="2.6"
            fill="oklch(0.985 0.01 90)"
            opacity="0.95"
          />
        );
      })}
    </g>
  );
}

type Props = { open: boolean; onOpen: () => void };

export function Bouquet({ open, onOpen }: Props) {
  const spread = open ? 1 : 0;

  const blooms = [
    { x: -78, y: -40, r: -18, kind: "rose", c: "oklch(0.62 0.19 18)", g: "oklch(0.7 0.2 18)" },
    { x: 78, y: -34, r: 16, kind: "rose", c: "oklch(0.66 0.17 14)", g: "oklch(0.74 0.18 14)" },
    { x: -34, y: -92, r: -8, kind: "peony", c: "oklch(0.88 0.06 350)", g: "" },
    { x: 38, y: -96, r: 9, kind: "peony", c: "oklch(0.9 0.05 320)", g: "" },
    { x: 0, y: -52, r: 0, kind: "rose", c: "oklch(0.58 0.2 20)", g: "oklch(0.68 0.21 20)" },
    { x: -104, y: -104, r: -24, kind: "tulip", c: "oklch(0.86 0.08 30)", g: "" },
    { x: 106, y: -100, r: 22, kind: "tulip", c: "oklch(0.83 0.09 350)", g: "" },
    { x: -60, y: -132, r: -14, kind: "breath", c: "", g: "" },
    { x: 62, y: -136, r: 12, kind: "breath", c: "", g: "" },
    { x: 4, y: -150, r: 0, kind: "breath", c: "", g: "" },
  ] as const;

  return (
    <motion.button
      onClick={onOpen}
      aria-label="Open the bouquet"
      className="heart-cursor group relative block bg-transparent focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-champagne"
      whileHover={{ scale: 1.03 }}
      animate={open ? { scale: 1.05 } : { rotate: [-1.6, 1.6, -1.6] }}
      transition={
        open
          ? { duration: 0.8 }
          : { duration: 7, repeat: Infinity, ease: "easeInOut" }
      }
      style={{ transformOrigin: "50% 90%" }}
    >
      <svg viewBox="-190 -230 380 420" className="h-[62vh] max-h-[560px] w-auto drop-shadow-2xl">
        <defs>
          <radialGradient id="bqGlow" cx="50%" cy="35%">
            <stop offset="0%" stopColor="oklch(0.95 0.09 85)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.9 0.08 40)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="silk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.9 0.07 350)" />
            <stop offset="50%" stopColor="oklch(0.97 0.03 340)" />
            <stop offset="100%" stopColor="oklch(0.86 0.08 350)" />
          </linearGradient>
          <linearGradient id="wrap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.97 0.02 85)" />
            <stop offset="100%" stopColor="oklch(0.88 0.04 80)" />
          </linearGradient>
        </defs>

        <circle
          cx="0"
          cy="-70"
          r="190"
          fill="url(#bqGlow)"
          className="opacity-70 transition-opacity duration-700 group-hover:opacity-100"
        />

        {/* stems */}
        {blooms.map((b, i) => (
          <path
            key={`s${i}`}
            d={`M0 120 C ${b.x * 0.3} 40, ${b.x * 0.75} ${b.y * 0.6}, ${b.x * (1 + spread * 0.55)} ${b.y * (1 + spread * 0.35)}`}
            stroke="oklch(0.52 0.09 145)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
        ))}

        {/* leaves */}
        {[-1, 1].map((s) => (
          <path
            key={s}
            d={`M0 110 C ${s * 60} 70, ${s * 96} 30, ${s * 120} -10 C ${s * 78} 22, ${s * 40} 62, 0 110Z`}
            fill="oklch(0.55 0.1 148)"
            opacity="0.75"
          />
        ))}

        {/* blooms */}
        {blooms.map((b, i) => (
          <motion.g
            key={i}
            initial={false}
            animate={{
              x: b.x * (1 + spread * 0.55),
              y: b.y * (1 + spread * 0.35),
              rotate: b.r + (open ? b.r * 1.4 : 0),
              scale: open ? 1.12 : 1,
            }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            className="transition-transform duration-500 group-hover:scale-105"
          >
            {b.kind === "rose" && <Rose color={b.c} glow={b.g} />}
            {b.kind === "tulip" && <Tulip color={b.c} />}
            {b.kind === "peony" && <Peony color={b.c} />}
            {b.kind === "breath" && <BabysBreath />}
          </motion.g>
        ))}

        {/* wrap */}
        <path d="M-92 108 L0 40 L92 108 L54 190 L-54 190Z" fill="url(#wrap)" opacity="0.95" />
        <path d="M-92 108 L0 40 L92 108 Z" fill="oklch(1 0 0 / 0.35)" />
        {/* silk ribbon */}
        <motion.g
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "0px 120px" }}
        >
          <rect x="-70" y="112" width="140" height="14" rx="7" fill="url(#silk)" />
          <path d="M-8 119 C-34 100 -58 116 -44 130 C-34 140 -14 132 -8 119Z" fill="url(#silk)" />
          <path d="M8 119 C34 100 58 116 44 130 C34 140 14 132 8 119Z" fill="url(#silk)" />
          <path
            d="M-4 124 C-10 142 -18 156 -26 168"
            stroke="oklch(0.9 0.06 348)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M4 124 C10 142 18 156 26 168"
            stroke="oklch(0.9 0.06 348)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="0" cy="120" r="9" fill="oklch(0.93 0.05 345)" />
        </motion.g>
      </svg>
    </motion.button>
  );
}
