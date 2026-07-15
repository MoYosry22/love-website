import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  { id: 1, alt: 'Our first date', color: 'from-rose-300 to-pink-200', ratio: 'portrait' as const },
  { id: 2, alt: 'The day we met', color: 'from-pink-300 to-rose-200', ratio: 'square' as const },
  { id: 3, alt: 'Our adventure together', color: 'from-rose-200 to-pink-300', ratio: 'wide' as const },
  { id: 4, alt: 'Your beautiful smile', color: 'from-pink-200 to-rose-300', ratio: 'square' as const },
  { id: 5, alt: 'A moment to remember', color: 'from-rose-400 to-pink-200', ratio: 'portrait' as const },
  { id: 6, alt: 'Forever and always', color: 'from-pink-300 to-rose-300', ratio: 'square' as const },
]

const ratioClasses = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
}

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <section className="min-h-screen py-16 sm:py-20 px-4 md:px-8 relative">
      {/* Ribbon divider */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
        <svg width="60" height="28" viewBox="0 0 60 28" className="mx-3">
          <defs>
            <linearGradient id="divRibbon3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
          </defs>
          <path d="M0 14 Q8 6 20 14 Q8 22 0 14Z" fill="url(#divRibbon3)" opacity="0.7" />
          <path d="M60 14 Q52 6 40 14 Q52 22 60 14Z" fill="url(#divRibbon3)" opacity="0.7" />
          <circle cx="30" cy="14" r="4" fill="#e11d48" opacity="0.6" />
          <ellipse cx="30" cy="13" rx="2.5" ry="2" fill="#be185d" opacity="0.5" />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
      </div>

      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-script)] text-rose-500 mb-4">
          Our Precious Moments
        </h2>
        <p className="font-[family-name:var(--font-body)] text-rose-400 text-base sm:text-lg">
          Every photo tells a story of our love
        </p>
      </motion.div>

      {/* === MOBILE: CSS columns masonry === */}
      <div className="md:hidden columns-2 gap-3 max-w-xl mx-auto">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="photo-frame break-inside-avoid mb-3 rounded-2xl overflow-hidden cursor-pointer relative group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            onClick={() => setSelectedPhoto(photo.id)}
            whileTap={{ scale: 0.97 }}
          >
            <div className={`w-full bg-gradient-to-br ${photo.color} ${ratioClasses[photo.ratio]} flex items-center justify-center`}>
              <div className="text-center p-3">
                <svg className="mx-auto mb-2 opacity-40" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p className="text-white/70 text-xs font-[family-name:var(--font-body)]">
                  {photo.alt}
                </p>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="white" opacity="0.9">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* === DESKTOP: Bento CSS Grid === */}
      <div className="hidden md:grid max-w-5xl mx-auto grid-template-areas-bento grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,180px)] gap-4 lg:gap-5">
        {/* Hero: spans 2 cols × 2 rows */}
        <motion.div
          className="photo-frame bento-hero rounded-2xl overflow-hidden cursor-pointer relative group"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
          onClick={() => setSelectedPhoto(photos[0].id)}
          whileHover={{ scale: 1.02 }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${photos[0].color} flex items-center justify-center`}>
            <div className="text-center p-6">
              <svg className="mx-auto mb-3 opacity-40" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p className="text-white/70 text-sm font-[family-name:var(--font-body)]">
                {photos[0].alt}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity="0.9">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Right column: 2 stacked items */}
        <motion.div
          className="photo-frame bento-tr rounded-2xl overflow-hidden cursor-pointer relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          onClick={() => setSelectedPhoto(photos[1].id)}
          whileHover={{ scale: 1.03 }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${photos[1].color} flex items-center justify-center`}>
            <div className="text-center p-3">
              <svg className="mx-auto mb-2 opacity-40" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p className="text-white/70 text-xs font-[family-name:var(--font-body)]">
                {photos[1].alt}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white" opacity="0.9">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="photo-frame bento-br rounded-2xl overflow-hidden cursor-pointer relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onClick={() => setSelectedPhoto(photos[2].id)}
          whileHover={{ scale: 1.03 }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${photos[2].color} flex items-center justify-center`}>
            <div className="text-center p-3">
              <svg className="mx-auto mb-2 opacity-40" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p className="text-white/70 text-xs font-[family-name:var(--font-body)]">
                {photos[2].alt}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white" opacity="0.9">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Bottom row: 3 items */}
        {[photos[3], photos[4], photos[5]].map((photo, i) => (
          <motion.div
            key={photo.id}
            className="photo-frame bento-bottom rounded-2xl overflow-hidden cursor-pointer relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
            onClick={() => setSelectedPhoto(photo.id)}
            whileHover={{ scale: 1.03 }}
          >
            <div className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
              <div className="text-center p-3">
                <svg className="mx-auto mb-2 opacity-40" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p className="text-white/70 text-xs font-[family-name:var(--font-body)]">
                  {photo.alt}
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="white" opacity="0.9">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-lg w-full rounded-3xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const photo = photos.find((p) => p.id === selectedPhoto)
                if (!photo) return null
                return (
                  <div className={`bg-gradient-to-br ${photo.color} aspect-[4/3] flex items-center justify-center`}>
                    <div className="text-center p-6 sm:p-8">
                      <svg className="mx-auto mb-4 opacity-50" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <p className="text-white font-[family-name:var(--font-script)] text-xl sm:text-2xl mb-2">
                        {photo.alt}
                      </p>
                      <p className="text-white/60 text-xs sm:text-sm font-[family-name:var(--font-body)]">
                        Replace with your photo
                      </p>
                    </div>
                  </div>
                )
              })()}
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close lightbox"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        className="text-center mt-8 sm:mt-10 font-[family-name:var(--font-body)] text-rose-400 text-xs sm:text-sm italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        * Replace placeholder images with your own photos in public/assets/images/
      </motion.p>
    </section>
  )
}
