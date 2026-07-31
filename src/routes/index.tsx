import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import {
  Stars,
  Petals,
  FloatingHearts,
  Fireflies,
  Bokeh,
  Clouds,
  CursorMagic,
} from "@/components/atmosphere";
import { Bouquet } from "@/components/bouquet";
import { LoveLetter } from "@/components/love-letter";
import { StickyNotes, HeartGarden } from "@/components/sections";
import { AmbienceProvider, MuteButton, useAmbience } from "@/components/ambience";
import { NAME, FROM } from "@/lib/romance";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Girlfriend's Day, ${NAME} — A Love Letter in Bloom` },
      {
        name: "description",
        content: `A handcrafted, cinematic Girlfriend's Day experience for ${NAME}: a blooming bouquet, a love letter, a heart garden and a sky full of wishes.`,
      },
      { property: "og:title", content: `Happy Girlfriend's Day, ${NAME}` },
      {
        property: "og:description",
        content: "A magical interactive love letter — bouquet, memories, fireflies and a moonlit finale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AmbienceProvider>
      <Experience />
    </AmbienceProvider>
  ),
});

function EnterScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section
      className="bg-night fixed inset-0 z-60 grid place-items-center overflow-hidden px-6"
      exit={{ opacity: 0, scale: 1.35, filter: "blur(14px)" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Stars count={140} />
      <Petals count={14} />
      <FloatingHearts count={9} />
      <motion.div
        className="relative z-10 text-center"
        initial={{ scale: 0.86 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, delay: 0.8 }}
          className="text-glow font-display text-5xl font-light tracking-tight text-cream sm:text-7xl md:text-8xl"
        >
          Happy Girlfriend&apos;s Day <span className="text-rose">❤</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 2.4 }}
          className="mt-6 font-hand text-3xl text-champagne sm:text-4xl"
        >
          To my Ayushi.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 3.8 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnter}
          className="group relative mt-14 rounded-full border border-champagne/70 bg-cream/10 px-14 py-4 font-body text-sm tracking-[0.4em] text-cream uppercase shadow-glow backdrop-blur-sm transition-colors hover:bg-cream/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        >
          Enter
          <span className="pointer-events-none absolute -inset-6 opacity-0 transition-opacity group-hover:opacity-100">
            <Stars count={18} />
          </span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

function GardenScene({ onLetter }: { onLetter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const [opened, setOpened] = useState(false);
  const { sfx, swell } = useAmbience();

  const openBouquet = () => {
    if (opened) return;
    setOpened(true);
    sfx("bloom");
    swell(0.3);
    window.setTimeout(() => {
      sfx("page");
      onLetter();
    }, 2600);
  };

  return (
    <section ref={ref} className="bg-sunset relative grid min-h-screen place-items-center overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <Clouds />
        <Bokeh />
      </motion.div>
      <Petals count={18} />
      <Fireflies count={16} />

      <motion.div style={{ y: y2 }} className="relative z-10 flex flex-col items-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="font-hand text-6xl text-rose sm:text-7xl"
          style={{ textShadow: "0 2px 20px oklch(0.98 0.02 60 / 0.8)" }}
        >
          For You
        </motion.p>

        <div className="relative mt-4 w-full max-w-[420px] scale-[0.85] px-4 sm:max-w-none sm:scale-100 sm:px-0">
          <Bouquet open={opened} onOpen={openBouquet} />
          <AnimatePresence>
            {opened &&
              Array.from({ length: 26 }, (_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: (i % 2 ? 1 : -1) * (40 + i * 9),
                    y: -120 - i * 8,
                    scale: 1,
                  }}
                  transition={{ duration: 2.6, delay: i * 0.05 }}
                  className="pointer-events-none absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full"
                  style={{
                    background: "oklch(0.92 0.11 90)",
                    boxShadow: "0 0 12px 3px oklch(0.9 0.11 90 / 0.8)",
                  }}
                />
              ))}
          </AnimatePresence>
        </div>

        <motion.p
          animate={{ opacity: opened ? 0 : [0.6, 1, 0.6], scale: opened ? 0.9 : 1 }}
          transition={{ duration: 2.4, repeat: opened ? 0 : Infinity }}
          className="mt-2 rounded-full border border-champagne/70 bg-cream/60 px-6 py-2 font-body text-xs tracking-[0.35em] text-ink uppercase shadow-glow backdrop-blur-sm"
        >
          Click me ❤
        </motion.p>
      </motion.div>
    </section>
  );
}

function FinaleScene() {
  const [surprise, setSurprise] = useState(false);
  const { sfx, swell } = useAmbience();

  return (
    <section className="bg-night relative grid min-h-screen place-items-center overflow-hidden px-6 py-32">
      <Stars count={160} />
      <Fireflies count={22} />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4 }}
        className="absolute top-[8%] h-56 w-56 rounded-full sm:h-72 sm:w-72"
        style={{
          background: "radial-gradient(circle at 35% 35%, oklch(0.98 0.03 90), oklch(0.88 0.05 85))",
          boxShadow: "0 0 120px 40px oklch(0.9 0.06 85 / 0.35)",
        }}
      />

      <div className="relative z-10 mt-64 text-center sm:mt-72">
        <svg viewBox="0 0 200 180" className="mx-auto h-40 w-52 text-champagne sm:h-52 sm:w-64">
          <motion.path
            d="M100 160 C40 120 20 84 30 56 C40 26 78 22 100 54 C122 22 160 26 170 56 C180 84 160 120 100 160Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3.6, ease: "easeInOut" }}
          />
          {[
            [100, 160],
            [40, 120],
            [30, 56],
            [78, 22],
            [100, 54],
            [122, 22],
            [170, 56],
            [160, 120],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="2.6"
              fill="oklch(0.97 0.03 90)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.35, duration: 0.8 }}
              style={{ filter: "drop-shadow(0 0 6px oklch(0.95 0.08 90))" }}
            />
          ))}
        </svg>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 1 }}
          className="text-glow mt-10 font-hand text-4xl text-cream sm:text-6xl"
        >
          I&apos;d choose you in every lifetime.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setSurprise(true);
            sfx("bloom");
            swell(0.34);
          }}
          className="mt-14 rounded-full border border-champagne bg-gold px-12 py-4 font-body text-xs tracking-[0.4em] text-ink uppercase shadow-glow"
        >
          One more surprise
        </motion.button>
      </div>

      <AnimatePresence>
        {surprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-55 grid place-items-center overflow-hidden bg-night/85 px-6 backdrop-blur-sm"
          >
            <Petals count={60} />
            <FloatingHearts count={26} />
            {Array.from({ length: 8 }, (_, i) => (
              <Firework key={i} index={i} />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 2.2, delay: 1 }}
              className="relative z-10 max-w-2xl text-center"
            >
              <h2 className="gold-text font-display text-4xl sm:text-6xl">
                Happy Girlfriend&apos;s Day, {NAME}.
              </h2>
              <p className="mt-6 font-display text-xl text-cream/90 sm:text-2xl">
                Thank you for making life beautiful.
              </p>
              <p className="mt-4 font-hand text-4xl text-rose sm:text-5xl">I love you endlessly ❤</p>
              <p className="mt-10 font-body text-xs tracking-[0.4em] text-champagne/80 uppercase">
                — {FROM}
              </p>
              <button
                onClick={() => setSurprise(false)}
                className="mt-10 rounded-full border border-champagne/60 px-8 py-3 font-body text-[10px] tracking-[0.35em] text-cream/80 uppercase transition-colors hover:bg-cream/10"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Firework({ index }: { index: number }) {
  const cx = 12 + ((index * 13) % 76);
  const cy = 18 + ((index * 29) % 56);
  return (
    <div className="pointer-events-none absolute" style={{ left: `${cx}%`, top: `${cy}%` }}>
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos(a) * 130,
              y: Math.sin(a) * 130,
              scale: [0.4, 1, 0.6],
            }}
            transition={{
              duration: 2.2,
              delay: index * 0.4 + i * 0.01,
              repeat: Infinity,
              repeatDelay: 1.6,
            }}
            className="absolute text-lg"
            style={{ color: i % 2 ? "var(--rose)" : "var(--champagne)" }}
          >
            ❤
          </motion.span>
        );
      })}
    </div>
  );
}

function Experience() {
  const [entered, setEntered] = useState(false);
  const [letter, setLetter] = useState(false);
  const { start, swell } = useAmbience();

  useEffect(() => {
    if (!entered) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [entered]);

  return (
    <main className="relative">
      <CursorMagic />
      <MuteButton />

      <AnimatePresence>
        {!entered && (
          <EnterScreen
            onEnter={() => {
              start();
              setEntered(true);
            }}
          />
        )}
      </AnimatePresence>

      <GardenScene
        onLetter={() => {
          setLetter(true);
        }}
      />

      <LoveLetter
        open={letter}
        onClose={() => {
          setLetter(false);
          swell(0.18);
        }}
      />

      <div className="relative overflow-hidden bg-linear-to-b from-cream via-blush/50 to-lavender/40">
        <Petals count={12} />
        <StickyNotes />
        <HeartGarden />
      </div>

      <FinaleScene />
    </main>
  );
}
