import { motion } from 'framer-motion'

const reasons = [
  { icon: '🌹', title: 'Your Smile', desc: 'It brightens even my darkest days and makes everything feel magical.' },
  { icon: '💗', title: 'Your Heart', desc: 'So pure, so kind, so full of love — it makes me want to be a better person.' },
  { icon: '🌸', title: 'Your Laughter', desc: 'The most beautiful melody in the world. It heals every wound.' },
  { icon: '🍒', title: 'Your Sweetness', desc: 'The way you care for everyone around you melts my heart every time.' },
  { icon: '✨', title: 'Your Eyes', desc: 'They sparkle like diamonds and hold entire galaxies I want to get lost in.' },
  { icon: '🦋', title: 'Your Soul', desc: 'Beautiful, free, and extraordinary — just like you.' },
  { icon: '🎀', title: 'Your Caring', desc: 'The way you look after everyone with such tenderness shows the depth of your beautiful heart.' },
  { icon: '🌙', title: 'Your Presence', desc: 'Being near you feels like coming home. You are my safe place.' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
}

export default function ReasonsILoveYou() {
  return (
    <section className="min-h-screen py-20 px-4 md:px-8 relative">
      {/* Ribbon divider */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
        <svg width="60" height="28" viewBox="0 0 60 28" className="mx-3">
          <defs>
            <linearGradient id="divRibbon2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
          </defs>
          <path d="M0 14 Q8 6 20 14 Q8 22 0 14Z" fill="url(#divRibbon2)" opacity="0.7" />
          <path d="M60 14 Q52 6 40 14 Q52 22 60 14Z" fill="url(#divRibbon2)" opacity="0.7" />
          <circle cx="30" cy="14" r="4" fill="#e11d48" opacity="0.6" />
          <ellipse cx="30" cy="13" rx="2.5" ry="2" fill="#be185d" opacity="0.5" />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
      </div>

      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-script)] text-rose-500 mb-4">
          Reasons I Love You
        </h2>
        <p className="font-[family-name:var(--font-body)] text-rose-400 text-lg">
          A never-ending list of why you mean the world to me
        </p>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
            className="love-card relative rounded-2xl p-6 text-center cursor-default group"
          >
            <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-125">
              {reason.icon}
            </div>
            <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold text-rose-600 mb-2">
              {reason.title}
            </h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-rose-700/70 leading-relaxed">
              {reason.desc}
            </p>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-rose-300/10 to-pink-300/10" />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-center mt-12 font-[family-name:var(--font-script)] text-2xl text-rose-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        ...and a million more reasons that fill my heart
      </motion.p>
    </section>
  )
}
