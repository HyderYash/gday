import { motion, AnimatePresence } from "motion/react";
import { LETTER_LINES } from "@/lib/romance";

export function LoveLetter({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-10 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-night/50 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.article
            initial={{ rotateX: -85, y: 120, opacity: 0, scale: 0.85 }}
            animate={{ rotateX: 0, y: 0, opacity: 1, scale: 1 }}
            exit={{ rotateX: 60, opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1400, transformOrigin: "top center" }}
            className="paper relative z-10 w-full max-w-2xl rounded-[2px] px-7 py-12 shadow-soft sm:px-14"
          >
            <span className="pointer-events-none absolute inset-0 rounded-[2px] ring-1 ring-champagne/50" />
            <motion.span
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: [1, 1.3, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="absolute -top-6 left-1/2 grid h-10 w-14 -translate-x-1/2 place-items-center rounded-full bg-rose text-cream shadow-glow"
            >
              <span className="font-display text-xl">A</span>
            </motion.span>

            <div className="space-y-5">
              {LETTER_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.9 + i * 0.55, duration: 0.9 }}
                  className={
                    i === 0 || i >= LETTER_LINES.length - 2
                      ? "font-hand text-3xl text-ink sm:text-4xl"
                      : "font-display text-xl leading-relaxed text-ink/90 sm:text-2xl"
                  }
                >
                  {line.text}
                  {line.heart && <span className="ml-2 text-rose">❤</span>}
                </motion.p>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + LETTER_LINES.length * 0.55 }}
              onClick={onClose}
              className="mt-10 rounded-full border border-champagne bg-gold px-8 py-3 font-body text-sm tracking-widest text-ink uppercase shadow-glow transition-transform hover:scale-105"
            >
              Keep reading our story
            </motion.button>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
