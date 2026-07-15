import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  { id: 1, alt: 'Our first date', src: '/assets/images/Our first date.jpeg' },
  { id: 2, alt: 'The day we met', src: '/assets/images/The day we met.jpeg' },
  { id: 3, alt: 'Our adventure together', src: '/assets/images/Our adventure together.jpeg' },
  { id: 4, alt: 'Your beautiful smile', src: '/assets/images/Your beautiful smile.jpeg' },
  { id: 5, alt: 'A moment to remember', src: '/assets/images/A moment to remember.jpeg' },
  { id: 6, alt: 'Forever and always', src: '/assets/images/Forever and always.jpeg' },
  { id: 7, alt: 'Bent the knee', src: '/assets/images/bent the knee.jpeg' },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <section className="min-h-screen py-8 sm:py-10 px-4 md:px-8 relative">
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
        className="text-center mb-6 sm:mb-8"
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
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* === DESKTOP: Bento CSS Grid === */}
      <div className="hidden md:grid max-w-5xl mx-auto grid-template-areas-bento grid-cols-[repeat(3,1fr)] grid-rows-[repeat(4,180px)] gap-4 lg:gap-5">
        {/* Hero: spans 2 cols x 2 rows */}
        <motion.div
          className="photo-frame bento-hero rounded-2xl overflow-hidden cursor-pointer relative group"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
          onClick={() => setSelectedPhoto(photos[0].id)}
          whileHover={{ scale: 1.02 }}
        >
          <img src={photos[0].src} alt={photos[0].alt} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500" />
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
          <img src={photos[1].src} alt={photos[1].alt} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500" />
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
          <img src={photos[2].src} alt={photos[2].alt} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500" />
        </motion.div>

        {/* Bottom row: 4 items (3 small + 1 full-width) */}
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
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500" />
          </motion.div>
        ))}

        {/* 7th photo: full width bottom */}
        <motion.div
          className="photo-frame bento-bottom rounded-2xl overflow-hidden cursor-pointer relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.6 }}
          onClick={() => setSelectedPhoto(photos[6].id)}
          whileHover={{ scale: 1.02 }}
        >
          <img src={photos[6].src} alt={photos[6].alt} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/20 transition-all duration-500" />
        </motion.div>
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
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const photo = photos.find((p) => p.id === selectedPhoto)
                if (!photo) return null
                const currentIndex = photos.findIndex((p) => p.id === selectedPhoto)
                return (
                  <div className="bg-black relative">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full max-h-[80vh] object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                      <p className="text-white font-[family-name:var(--font-script)] text-xl sm:text-2xl">
                        {photo.alt}
                      </p>
                      <p className="text-white/50 text-xs sm:text-sm font-[family-name:var(--font-body)]">
                        {currentIndex + 1} / {photos.length}
                      </p>
                    </div>
                    {/* Previous arrow */}
                    <button
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      onClick={() => {
                        const prev = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
                        setSelectedPhoto(photos[prev].id)
                      }}
                      aria-label="Previous photo"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    {/* Next arrow */}
                    <button
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      onClick={() => {
                        const next = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
                        setSelectedPhoto(photos[next].id)
                      }}
                      aria-label="Next photo"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                )
              })()}
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
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
    </section>
  )
}
