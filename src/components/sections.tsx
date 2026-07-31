import { useState } from "react";
import { motion } from "motion/react";
import { COMPLIMENTS, MEMORIES, STICKY_NOTES, seeded } from "@/lib/romance";
import { useAmbience } from "@/components/ambience";

export function MemoriesWall() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <h2 className="text-center font-hand text-5xl text-rose sm:text-6xl">Floating memories</h2>
      <p className="mt-3 text-center font-body text-sm tracking-[0.3em] text-ink/60 uppercase">
        hover to hold them
      </p>
    </section>
  );
}

export function StickyNotes() {
  const rnd = seeded(404);
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {STICKY_NOTES.map((n, i) => {
          const rot = (rnd() - 0.5) * 16;
          return (
            <motion.button
              key={n}
              onHoverStart={() => setFlipped(i)}
              onHoverEnd={() => setFlipped(null)}
              onClick={() => setFlipped(flipped === i ? null : i)}
              whileHover={{ y: -10, scale: 1.08 }}
              animate={{ rotateY: flipped === i ? 12 : 0 }}
              className="animate-floaty grid h-36 w-36 place-items-center rounded-[4px] p-4 text-center font-hand text-2xl text-ink shadow-soft"
              style={{
                rotate: `${rot}deg`,
                animationDelay: `${i * 0.7}s`,
                background:
                  i % 3 === 0
                    ? "oklch(0.93 0.05 350)"
                    : i % 3 === 1
                      ? "oklch(0.94 0.06 95)"
                      : "oklch(0.92 0.05 300)",
              }}
            >
              {n} ❤
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export function HeartGarden() {
  const { sfx } = useAmbience();
  const [openIdx, setOpenIdx] = useState<Record<number, boolean>>({});
  const rnd = seeded(88);
  const flowers = COMPLIMENTS.map((c, i) => ({
    text: c,
    delay: rnd() * 3,
    lift: rnd() * 30,
    hue: [350, 18, 330, 300][i % 4],
  }));

  return (
<></>
  );
}
