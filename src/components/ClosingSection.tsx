import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Sparkle {
  id: number
  left: string
  top: string
  duration: number
  delay: number
}

export default function ClosingSection() {
  const sparkles = useMemo<Sparkle[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${15 + Math.random() * 70}%`,
      top: `${15 + Math.random() * 70}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 3,
    })), [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Large background heart */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="opacity-[0.04] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] animate-heart-breathe"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#e11d48"
          />
        </svg>
      </div>

      {/* Sparkle effects */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute pointer-events-none will-change-transform"
          style={{
            left: s.left,
            top: s.top,
            animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24">
            <path d="M12 0l3 9h9l-7.5 5.5L19 24l-7-5.5L5 24l2.5-9.5L0 9h9z" />
          </svg>
        </div>
      ))}

      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Decorative bow */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
        >
          <svg width="120" height="132" viewBox="0 0 100 110" fill="none" style={{ animation: 'bowBreathe 5s ease-in-out infinite' }}>
            <defs>
              <linearGradient id="closingBowGrad" x1="0.3" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
            <path d="M50 44 C48 34 38 8 18 8 C8 8 2 16 2 26 C2 36 8 44 16 44 Z" fill="url(#closingBowGrad)" />
            <path d="M50 44 C52 34 62 8 82 8 C92 8 98 16 98 26 C98 36 92 44 84 44 Z" fill="url(#closingBowGrad)" />
            <ellipse cx="50" cy="44" rx="5" ry="4.5" fill="#db2777" />
            <path d="M46 47 L40 82 L36 94 L32 82 L44 47Z" fill="url(#closingBowGrad)" opacity="0.85" />
            <path d="M54 47 L60 82 L64 94 L68 82 L56 47Z" fill="url(#closingBowGrad)" opacity="0.85" />
          </svg>
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-[family-name:var(--font-script)] text-rose-500 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I Love You
        </motion.h2>

        <motion.p
          className="font-[family-name:var(--font-body)] text-lg sm:text-xl md:text-2xl text-rose-600/80 max-w-lg mx-auto mb-8 leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Today, tomorrow, and for all the days to come.
          You are my person, my love, my everything.
        </motion.p>

        <motion.div
          className="glow-text px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8, type: 'spring' }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-script)] text-rose-400 break-words">
            To the Seventh Sky and Beyond, My Love
          </p>
        </motion.div>

        {/* Hearts burst */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <svg
              key={i}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#f472b6"
              className="animate-heart-bounce will-change-transform"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer ribbon */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      >
        <svg width="220" height="40" viewBox="0 0 220 40" className="opacity-40">
          <defs>
            <linearGradient id="footRibbon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
          </defs>
          <path d="M0 20 Q15 10 35 20 Q15 30 0 20Z" fill="url(#footRibbon)" opacity="0.7" />
          <path d="M35 20 Q80 8 110 20 Q140 32 185 20" fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.5" />
          <path d="M220 20 Q205 10 185 20 Q205 30 220 20Z" fill="url(#footRibbon)" opacity="0.7" />
          <circle cx="110" cy="20" r="5" fill="#e11d48" opacity="0.6" />
          <ellipse cx="110" cy="19" rx="3" ry="2.5" fill="#be185d" opacity="0.5" />
        </svg>
      </motion.div>
    </section>
  )
}
