import { useState } from 'react'
import { motion } from 'framer-motion'

interface WelcomeSectionProps {
  onEnter: () => void
}

export default function WelcomeSection({ onEnter }: WelcomeSectionProps) {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = () => {
    if (isOpened) return
    setIsOpened(true)
    setTimeout(() => onEnter(), 2000)
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center mb-10 sm:mb-12"
      >
        <motion.p
          className="text-base sm:text-lg md:text-xl text-rose-500 font-[family-name:var(--font-body)] tracking-widest uppercase mb-4"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.2em' }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          A Special Letter For You
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-script)] text-rose-600 mb-2 px-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, type: 'spring', stiffness: 100 }}
        >
          Maryomty
        </motion.h1>
        <motion.div
          className="flex items-center justify-center gap-3 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-rose-400" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#f472b6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-rose-400" />
        </motion.div>
      </motion.div>

      <div className="envelope-container cursor-pointer" onClick={handleOpen}>
        <motion.div
          className="relative w-[340px] h-[245px] sm:w-[420px] sm:h-[300px] md:w-[500px] md:h-[355px]"
          whileHover={!isOpened ? { scale: 1.03 } : undefined}
          whileTap={!isOpened ? { scale: 0.98 } : undefined}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isOpened ? 1.05 : 1,
          }}
          transition={{ delay: 1.5, duration: 0.8, type: 'spring' }}
        >
          <svg viewBox="-20 -80 420 390" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff5f7" />
                <stop offset="40%" stopColor="#ffe4ec" />
                <stop offset="100%" stopColor="#fdd5e2" />
              </linearGradient>
              <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fce7f3" />
                <stop offset="100%" stopColor="#fbcfe8" />
              </linearGradient>
              <linearGradient id="envFlapBack" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#fce7f3" />
                <stop offset="100%" stopColor="#f9a8d4" />
              </linearGradient>
              <linearGradient id="sealGrad" x1="0.3" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="letterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fff5f7" />
              </linearGradient>
              <filter id="envDropShadow" x="-5%" y="-5%" width="110%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#f472b6" floodOpacity="0.25" />
              </filter>
              <filter id="letterShadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
              </filter>
            </defs>

            {/* Envelope body - always visible */}
            <rect x="0" y="0" width="380" height="270" rx="8" fill="url(#envBody)" filter="url(#envDropShadow)" />

            {/* Small hearts inside envelope */}
            {[
              { x: 50, y: 60, s: 0.6, o: 0.08 },
              { x: 130, y: 80, s: 0.5, o: 0.06 },
              { x: 250, y: 55, s: 0.55, o: 0.07 },
              { x: 320, y: 75, s: 0.5, o: 0.06 },
              { x: 80, y: 160, s: 0.45, o: 0.05 },
              { x: 300, y: 170, s: 0.5, o: 0.06 },
              { x: 190, y: 100, s: 0.4, o: 0.04 },
            ].map((h, i) => (
              <path
                key={i}
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#e11d48"
                opacity={h.o}
                transform={`translate(${h.x}, ${h.y}) scale(${h.s})`}
              />
            ))}

            {/* Open flap - points upward above the envelope */}
            <motion.g
              animate={{ opacity: isOpened ? 1 : 0 }}
              transition={{ duration: 0.4, delay: isOpened ? 0.15 : 0 }}
            >
              <path
                d="M0 0 L190 -80 L380 0 Z"
                fill="url(#envFlapBack)"
                stroke="#f9a8d4"
                strokeWidth="0.8"
              />
            </motion.g>

            {/* Closed flap + bow + seal (visible when closed, fades out on open) */}
            <motion.g
              animate={{ opacity: isOpened ? 0 : 1 }}
              transition={{ duration: 0.35 }}
            >
              {/* Closed flap triangle */}
              <path
                d="M0 0 L190 120 L380 0 Z"
                fill="url(#envFlap)"
                stroke="#f9a8d4"
                strokeWidth="1"
              />
              {/* Decorative bow */}
              <g style={{ animation: 'bowBreathe 4s ease-in-out infinite' }}>
                <defs>
                  <linearGradient id="bowGrad2" x1="0.3" y1="0" x2="0.7" y2="1">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>
                <path d="M190 120 C188 110 178 84 158 84 C148 84 142 92 142 102 C142 112 148 120 156 120 Z" fill="url(#bowGrad2)" />
                <path d="M190 120 C192 110 202 84 222 84 C232 84 238 92 238 102 C238 112 232 120 224 120 Z" fill="url(#bowGrad2)" />
                <ellipse cx="190" cy="120" rx="5" ry="4.5" fill="#db2777" />
                <path d="M186 123 L180 158 L176 170 L172 158 L184 123Z" fill="url(#bowGrad2)" opacity="0.85" />
                <path d="M194 123 L200 158 L204 170 L208 158 L196 123Z" fill="url(#bowGrad2)" opacity="0.85" />
              </g>
              {/* Wax seal */}
              <g filter="url(#sealShadow)" style={{ animation: 'heartBreathe 3s ease-in-out infinite' }}>
                <circle cx="190" cy="210" r="22" fill="url(#sealGrad)" />
                <circle cx="190" cy="210" r="18" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.3" />
                <circle cx="190" cy="210" r="14" fill="none" stroke="#fff" strokeWidth="0.4" opacity="0.2" />
                <path
                  d="M190 218 l-1.2-1.1C184.5 212.8 182 210.2 182 207.1 182 204.6 183.7 203 185.8 203c1.2 0 2.3.6 3.2 1.4C189.9 203.6 191 203 192.2 203 194.3 203 196 204.6 196 207.1c0 3.1-2.5 5.7-6.8 9.8L190 218z"
                  fill="#fff"
                  opacity="0.85"
                  transform="translate(0, -3) scale(0.9)"
                />
              </g>
            </motion.g>

            {/* Letter sliding up */}
            <motion.g
              filter="url(#letterShadow)"
              initial={false}
              animate={{
                y: isOpened ? -30 : 50,
                opacity: isOpened ? 1 : 0,
              }}
              transition={{ duration: 0.8, delay: isOpened ? 0.3 : 0, ease: [0.4, 0, 0.2, 1] }}
            >
              <rect x="30" y="-50" width="320" height="80" rx="4" fill="url(#letterGrad)" stroke="#fda4af" strokeWidth="0.5" />
              <path
                d="M108 -6 l-0.9-0.8C104.4 -9.5 102.5 -11.5 102.5 -13.8 102.5 -15.7 103.8 -17 105.4 -17c.9 0 1.7.5 2.4 1 .7-.6 1.5-1 2.4-1 1.6 0 2.9 1.3 2.9 3.2 0 2.3-1.9 4.3-5.1 7.3L108 -6z"
                fill="#e11d48"
                opacity="0.7"
              />
              <text x="190" y="-2" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="26" fill="#e11d48" opacity="0.85">
                I love you
              </text>
              <path
                d="M272 -6 l-0.9-0.8C268.4 -9.5 266.5 -11.5 266.5 -13.8 266.5 -15.7 267.8 -17 269.4 -17c.9 0 1.7.5 2.4 1 .7-.6 1.5-1 2.4-1 1.6 0 2.9 1.3 2.9 3.2 0 2.3-1.9 4.3-5.1 7.3L272 -6z"
                fill="#e11d48"
                opacity="0.7"
              />
            </motion.g>

            {/* Inner pocket shadow */}
            <path
              d="M0 8 L190 0 L380 8 L380 10 L190 2 L0 10 Z"
              fill="rgba(0,0,0,0.04)"
            />
          </svg>
        </motion.div>

        <motion.p
          className="text-center mt-6 sm:mt-8 text-rose-400 font-[family-name:var(--font-body)] text-sm sm:text-base md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpened ? 0 : 1 }}
          transition={{ delay: isOpened ? 0 : 2, duration: 0.5 }}
        >
          {isOpened ? '' : 'Tap to open the envelope'}
        </motion.p>
      </div>

      {/* Cherry blossom decorations */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 opacity-30 hidden sm:block">
        <svg width="80" height="80" viewBox="0 0 80 80">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse key={i} cx="40" cy="40" rx="12" ry="6" fill="#f9a8d4" transform={`rotate(${angle} 40 40) translate(0 -12)`} opacity="0.6" />
          ))}
          <circle cx="40" cy="40" r="5" fill="#fbbf24" opacity="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-6 sm:bottom-12 sm:right-8 opacity-25 rotate-45 hidden sm:block">
        <svg width="60" height="60" viewBox="0 0 80 80">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse key={i} cx="40" cy="40" rx="10" ry="5" fill="#fda4af" transform={`rotate(${angle} 40 40) translate(0 -10)`} opacity="0.6" />
          ))}
          <circle cx="40" cy="40" r="4" fill="#fbbf24" opacity="0.7" />
        </svg>
      </div>
    </section>
  )
}
