export const NAME = "Ayushi";
export const FROM = "Yash";

/** Deterministic PRNG so SSR and client render identical particle fields. */
export function seeded(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

export const LETTER_LINES = [
  { text: `My Dearest ${NAME},`, heart: false },
  { text: "Happy Girlfriend's Day", heart: true },
  {
    text: "Every day with you feels brighter, warmer, and more meaningful.",
    heart: false,
  },
  {
    text: "You've become my comfort, my happiness, and my favorite part of every day.",
    heart: true,
  },
  {
    text: "Thank you for being  with me, for believing in me",
    heart: false,
  },
  {
    text: "No matter where life takes us, I hope we continue making beautiful memories together.",
    heart: false,
  },
  { text: "You truly make my life more beautiful.", heart: true },
  { text: "I love you.", heart: true },
  { text: "Forever yours,", heart: false },
  { text: `${FROM}`, heart: true },
];

export const MEMORIES = [
  { caption: "Our little adventures", rotate: -6 },
  { caption: "My favorite smile", rotate: 4 },
  { caption: "Forever us", rotate: -3 },
  { caption: "Our happiest moments", rotate: 7 },
];

export const STICKY_NOTES = [
  "I miss you",
  "You make me smile",
  "You are my safe place",
  "My favorite person",
  "Always you",
];

export const COMPLIMENTS = [
  "You're adorable.",
  "You're magical.",
  "You're enough.",
  "You're beautiful.",
  "You're my happiness.",
  "You're my calm.",
  "You're endlessly kind.",
  "You're my favorite hello.",
  "You're my hardest goodbye.",
  "You're brilliant.",
  "You're my home.",
  "You're pure sunshine.",
  "You're softly unforgettable.",
  "You're my lucky star.",
  "You're stronger than you know.",
  "You're my best decision.",
  "You're poetry.",
  "You're my favorite song.",
  "You're wonderfully you.",
  "You're my safe place.",
  "You're the warmest heart.",
  "You're worth every mile.",
  "You're my favorite thought.",
  "You're breathtaking.",
  "You're my whole world.",
  "You're the reason I smile.",
  "You're effortlessly lovely.",
  "You're my forever plan.",
  "You're my quiet joy.",
  "You're loved. Always.",
];
