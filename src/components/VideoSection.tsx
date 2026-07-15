import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const videos = [
  { id: 1, title: 'Bent the Knee', src: '/assets/videos/1-bent the knee.mp4', thumb: '/assets/thumbnails/1-bent the knee.jpg', width: 480, height: 864 },
  { id: 2, title: 'The Day We Met', src: '/assets/videos/The Day We Met.mp4', thumb: '/assets/thumbnails/The Day We Met.jpg', width: 478, height: 850 },
  { id: 3, title: 'First Look', src: '/assets/videos/first look.mp4', thumb: '/assets/thumbnails/first look.jpg', width: 478, height: 850 },
  { id: 4, title: 'Your Beautiful Smile', src: '/assets/videos/Your Beautiful Smile.mp4', thumb: '/assets/thumbnails/Your Beautiful Smile.jpg', width: 960, height: 1280 },
  { id: 5, title: 'Our Adventure', src: '/assets/videos/Our Adventure.mp4', thumb: '/assets/thumbnails/Our Adventure.jpg', width: 480, height: 864 },
  { id: 6, title: 'Forever & Always', src: '/assets/videos/Forever & Always.mp4', thumb: '/assets/thumbnails/Forever & Always.jpg', width: 480, height: 864 },
  { id: 7, title: 'Having Fun', src: '/assets/videos/having fun.mp4', thumb: '/assets/thumbnails/having fun.jpg', width: 480, height: 864 },
]

interface VideoSectionProps {
  onVideoMutedChange: (muted: boolean) => void
}

export default function VideoSection({ onVideoMutedChange }: VideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const handleUnmute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    setIsMuted(false)
    onVideoMutedChange(true)
  }, [onVideoMutedChange])

  const handleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    setIsMuted(true)
    onVideoMutedChange(false)
  }, [onVideoMutedChange])

  const handleThumbnailClick = (index: number) => {
    if (index === activeVideo) return
    setActiveVideo(index)
    setIsMuted(true)
    if (videoRef.current) videoRef.current.muted = true
    onVideoMutedChange(false)
  }

  // Auto-play when active video changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [activeVideo])

  // IntersectionObserver: autoplay when in view, pause when out
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current
        if (!video) return

        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
          onVideoMutedChange(false)
          setIsMuted(true)
          video.muted = true
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onVideoMutedChange])

  const active = videos[activeVideo]
  const videoAspectRatio = `${active.width} / ${active.height}`

  return (
    <section ref={sectionRef} className="py-8 sm:py-10 px-4 md:px-8 relative">
      {/* Ribbon divider */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
        <svg width="60" height="28" viewBox="0 0 60 28" className="mx-3">
          <defs>
            <linearGradient id="divRibbonVideo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
          </defs>
          <path d="M0 14 Q8 6 20 14 Q8 22 0 14Z" fill="url(#divRibbonVideo)" opacity="0.7" />
          <path d="M60 14 Q52 6 40 14 Q52 22 60 14Z" fill="url(#divRibbonVideo)" opacity="0.7" />
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
          Our Story in Motion
        </h2>
        <p className="font-[family-name:var(--font-body)] text-rose-400 text-base sm:text-lg">
          Every frame, a memory of us
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Main video player */}
        <div
          className="relative rounded-2xl overflow-hidden photo-frame bg-black"
          style={{ aspectRatio: videoAspectRatio }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVideo}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <video
                ref={videoRef}
                src={active.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Unmute / Mute button */}
          <motion.button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs sm:text-sm font-[family-name:var(--font-body)] hover:bg-black/60 transition-colors z-10"
            onClick={isMuted ? handleUnmute : handleMute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <span>Unmute</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <span>Mute</span>
              </>
            )}
          </motion.button>

          {/* Video title overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6 z-10">
            <p className="text-white font-[family-name:var(--font-script)] text-lg sm:text-xl">
              {active.title}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          {videos.map((video, i) => (
            <motion.button
              key={video.id}
              className={`video-thumb relative rounded-xl overflow-hidden border-0 p-0 cursor-pointer ${
                i === activeVideo ? 'active ring-2 ring-rose-500' : 'opacity-50 hover:opacity-80'
              }`}
              onClick={() => handleThumbnailClick(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: i === activeVideo ? 1 : 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="w-16 h-10 sm:w-24 sm:h-14 bg-black flex items-center justify-center overflow-hidden">
                <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.8" className="absolute">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <motion.p
        className="text-center mt-8 sm:mt-10 font-[family-name:var(--font-body)] text-rose-400 text-xs sm:text-sm italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
      </motion.p>
    </section>
  )
}
