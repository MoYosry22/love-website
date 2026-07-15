import { motion } from 'framer-motion'

const paragraphs = [
  {
    text: "From the moment I first saw you, my world changed forever. You walked into my life like a dream I never want to wake up from, and since that day, every heartbeat of mine has whispered your name.",
    delay: 0,
  },
  {
    text: "Your smile lights up my darkest days, and your laughter is the most beautiful melody I have ever heard. In a world full of chaos, you are my calm, my peace, my everything.",
    delay: 0.15,
  },
  {
    text: "I want you to know that every moment we share is a treasure I hold close to my heart. The way you look at me, the way you hold my hand — these are the moments that make life worth living.",
    delay: 0.3,
  },
  {
    text: "You are not just the love of my life; you are the reason I believe in love itself. Every day with you is a gift, and I promise to spend every one of those days making you feel as special as you make me feel.",
    delay: 0.45,
  },
  {
    text: "I love you more than words could ever express, more than the stars in the sky, more than the waves in the ocean. You are my forever, my always, my everything.",
    delay: 0.6,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

export default function LoveLetterSection() {
  return (
    <section className="min-h-screen py-16 sm:py-20 px-5 md:px-8 lg:px-8 relative">
      {/* Decorative ribbon top */}
      <div className="flex items-center justify-center mb-12">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
        <svg width="60" height="28" viewBox="0 0 60 28" className="mx-3">
          <defs>
            <linearGradient id="divRibbon1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
          </defs>
          {/* Left ribbon strip */}
          <path d="M0 14 Q8 6 20 14 Q8 22 0 14Z" fill="url(#divRibbon1)" opacity="0.7" />
          {/* Right ribbon strip */}
          <path d="M60 14 Q52 6 40 14 Q52 22 60 14Z" fill="url(#divRibbon1)" opacity="0.7" />
          {/* Center bow knot */}
          <circle cx="30" cy="14" r="4" fill="#e11d48" opacity="0.6" />
          <ellipse cx="30" cy="13" rx="2.5" ry="2" fill="#be185d" opacity="0.5" />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
      </div>

      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-script)] text-rose-500 mb-4">
            My Love Letter To You
          </h2>
          <div className="flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fda4af">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-rose-400 text-sm font-[family-name:var(--font-body)] tracking-widest uppercase">
              With all my heart
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fda4af">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>

        {/* Letter paper */}
        <div className="love-card rounded-3xl p-5 sm:p-8 md:p-12 relative">
          {/* Corner cherries */}
          <div className="absolute -top-3 -left-3 opacity-50">
            <svg width="44" height="52" viewBox="0 0 44 52">
              <path d="M14 20 Q18 6 22 2 Q26 6 30 20" stroke="#5a8a3c" strokeWidth="1.5" fill="none" />
              <ellipse cx="18" cy="5" rx="7" ry="4" fill="#6b9f4e" opacity="0.7" transform="rotate(-20 18 5)" />
              <circle cx="14" cy="30" r="9" fill="#de3163" />
              <circle cx="14" cy="28" r="3" fill="#fff" opacity="0.25" />
              <circle cx="30" cy="32" r="8" fill="#e11d48" />
              <circle cx="30" cy="30" r="2.5" fill="#fff" opacity="0.25" />
            </svg>
          </div>
          <div className="absolute -top-3 -right-3 opacity-50 scale-x-[-1]">
            <svg width="44" height="52" viewBox="0 0 44 52">
              <path d="M14 20 Q18 6 22 2 Q26 6 30 20" stroke="#5a8a3c" strokeWidth="1.5" fill="none" />
              <ellipse cx="18" cy="5" rx="7" ry="4" fill="#6b9f4e" opacity="0.7" transform="rotate(-20 18 5)" />
              <circle cx="14" cy="30" r="9" fill="#de3163" />
              <circle cx="14" cy="28" r="3" fill="#fff" opacity="0.25" />
              <circle cx="30" cy="32" r="8" fill="#e11d48" />
              <circle cx="30" cy="30" r="2.5" fill="#fff" opacity="0.25" />
            </svg>
          </div>
          <div className="absolute -bottom-3 -left-3 opacity-50 scale-y-[-1]">
            <svg width="44" height="52" viewBox="0 0 44 52">
              <path d="M14 20 Q18 6 22 2 Q26 6 30 20" stroke="#5a8a3c" strokeWidth="1.5" fill="none" />
              <ellipse cx="18" cy="5" rx="7" ry="4" fill="#6b9f4e" opacity="0.7" transform="rotate(-20 18 5)" />
              <circle cx="14" cy="30" r="9" fill="#de3163" />
              <circle cx="14" cy="28" r="3" fill="#fff" opacity="0.25" />
              <circle cx="30" cy="32" r="8" fill="#e11d48" />
              <circle cx="30" cy="30" r="2.5" fill="#fff" opacity="0.25" />
            </svg>
          </div>
          <div className="absolute -bottom-3 -right-3 opacity-50 scale-[-1]">
            <svg width="44" height="52" viewBox="0 0 44 52">
              <path d="M14 20 Q18 6 22 2 Q26 6 30 20" stroke="#5a8a3c" strokeWidth="1.5" fill="none" />
              <ellipse cx="18" cy="5" rx="7" ry="4" fill="#6b9f4e" opacity="0.7" transform="rotate(-20 18 5)" />
              <circle cx="14" cy="30" r="9" fill="#de3163" />
              <circle cx="14" cy="28" r="3" fill="#fff" opacity="0.25" />
              <circle cx="30" cy="32" r="8" fill="#e11d48" />
              <circle cx="30" cy="30" r="2.5" fill="#fff" opacity="0.25" />
            </svg>
          </div>

          {paragraphs.map((para, i) => (
            <motion.div key={i} variants={itemVariants} className="mb-8 last:mb-0">
              <p className="font-[family-name:var(--font-body)] text-lg md:text-xl leading-relaxed text-center text-rose-900/80 italic">
                {para.text}
              </p>
              {i < paragraphs.length - 1 && (
                <div className="flex justify-center mt-6">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fda4af" opacity="0.6">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}

          {/* Signature */}
          <motion.div
            className="text-center mt-10 pt-6 border-t border-rose-200/50"
            variants={itemVariants}
          >
            <p className="font-[family-name:var(--font-body)] text-rose-400 text-sm tracking-widest uppercase mb-3">
              Forever and always yours,
            </p>
            <p className="font-[family-name:var(--font-script)] text-3xl md:text-4xl text-rose-500">
              Basbostk
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
