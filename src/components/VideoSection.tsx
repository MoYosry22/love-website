import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const videos = [
  { id: 1, title: 'Bent the Knee', src: '/assets/videos/1-bent the knee.mp4', thumb: '/assets/thumbnails/1-bent the knee.jpg', width: 480, height: 864 },
  { id: 2, title: 'The Day We Met', src: '/assets/videos/The Day We Met.mp4', thumb: '/assets/thumbnails/The Day We Met.jpg', width: 478, height: 850 },
  { id: 3, title: 'First Look', src: '/assets/videos/first look.mp4', thumb: '/assets/thumbnails/first look.jpg', width: 478, height: 850 },
  { id: 4, title: 'Your Beautiful Smile', src: '/assets/videos/Your Beautiful Smile.mp4', thumb: '/assets/thumbnails/Your Beautiful Smile.jpg', width: 480, height: 850 },
  { id: 5, title: 'Our Adventure', src: '/assets/videos/Our Adventure.mp4', thumb: '/assets/thumbnails/Our Adventure.jpg', width: 480, height: 864 },
  { id: 6, title: 'Forever & Always', src: '/assets/videos/Forever & Always.mp4', thumb: '/assets/thumbnails/Forever & Always.jpg', width: 480, height: 864 },
  { id: 7, title: 'Having Fun', src: '/assets/videos/having fun.mp4', thumb: '/assets/thumbnails/having fun.jpg', width: 480, height: 864 },
]

function formatTime(s: number) {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

interface VideoSectionProps {
  onVideoMutedChange: (muted: boolean) => void
}

export default function VideoSection({ onVideoMutedChange }: VideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const positionsRef = useRef<Map<number, number>>(new Map())
  const activeVideoRef = useRef(activeVideo)

  // Keep ref in sync with state
  activeVideoRef.current = activeVideo

  const controlsVisible = !isPlaying || showControls

  const startHideTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setShowControls(false), 3000)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setShowControls(true)
    startHideTimer()
  }, [startHideTimer])

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) setShowControls(false)
  }, [isPlaying])

  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    startHideTimer()
  }, [startHideTimer])

  const handleTouchStart = useCallback(() => {
    if (controlsVisible && isPlaying) {
      setShowControls(false)
    } else {
      setShowControls(true)
      startHideTimer()
    }
  }, [controlsVisible, isPlaying, startHideTimer])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [])

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
    const video = videoRef.current
    if (video) {
      positionsRef.current.set(activeVideo, video.currentTime)
      video.pause()
      video.muted = true
    }
    setIsMuted(true)
    setCurrentTime(0)
    setDuration(0)
    setBuffered(0)
    setIsPlaying(false)
    onVideoMutedChange(false)
    setActiveVideo(index)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const bar = progressRef.current
    if (!video || !bar) return
    const rect = bar.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = pct * video.duration
  }

  // Inline event handlers for the <video> element
  const handlePlay = useCallback(() => setIsPlaying(true), [])
  const handlePause = useCallback(() => setIsPlaying(false), [])
  const handleTimeUpdate = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget
    setCurrentTime(v.currentTime)
    positionsRef.current.set(activeVideoRef.current, v.currentTime)
  }, [])
  const handleDurationChange = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration)
  }, [])
  const handleProgressEvent = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget
    if (v.buffered.length > 0) {
      setBuffered(v.buffered.end(v.buffered.length - 1))
    }
  }, [])
  const handleLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget
    const idx = activeVideoRef.current
    const saved = positionsRef.current.get(idx)
    if (saved && saved > 0) {
      v.currentTime = saved
    }
    if (idx === 0) {
      v.play().catch(() => {})
    }
  }, [])

  // IntersectionObserver: auto-play first video when in view, pause when out
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current
        if (!video) return

        if (entry.isIntersecting && activeVideo === 0) {
          video.play().catch(() => {})
        } else if (!entry.isIntersecting) {
          video.pause()
          if (activeVideo !== 0) {
            onVideoMutedChange(false)
            setIsMuted(true)
            video.muted = true
          }
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onVideoMutedChange, activeVideo])

  // Cleanup hide timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const active = videos[activeVideo]
  const videoAspectRatio = `${active.width} / ${active.height}`
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0

  const controlsTransition = 'opacity 0.3s ease, visibility 0.3s ease'

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
          ref={playerRef}
          className="relative rounded-2xl overflow-hidden photo-frame bg-black"
          style={{ aspectRatio: videoAspectRatio }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVideo}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <video
                ref={videoRef}
                src={active.src}
                poster={active.thumb}
                muted
                loop
                playsInline
                preload={activeVideo === 0 ? 'auto' : 'metadata'}
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
                onPlay={handlePlay}
                onPause={handlePause}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                onProgress={handleProgressEvent}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </motion.div>
          </AnimatePresence>

          {/* Center play/pause button — visible when paused OR controls shown */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            style={{ opacity: controlsVisible ? 1 : 0, transition: controlsTransition, visibility: controlsVisible ? 'visible' : 'hidden' }}
          >
            <motion.button
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
              onClick={togglePlay}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Top-right mute button — visible when controls shown */}
          <div
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10"
            style={{ opacity: controlsVisible ? 1 : 0, transition: controlsTransition, visibility: controlsVisible ? 'visible' : 'hidden' }}
          >
            <motion.button
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs sm:text-sm font-[family-name:var(--font-body)] hover:bg-black/60 transition-colors"
              onClick={isMuted ? handleUnmute : handleMute}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Bottom controls — visible when controls shown */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10"
            style={{ opacity: controlsVisible ? 1 : 0, transition: controlsTransition, visibility: controlsVisible ? 'visible' : 'hidden' }}
          >
            {/* Video title */}
            <div className="px-4 sm:px-6 pb-1">
              <p className="text-white font-[family-name:var(--font-script)] text-lg sm:text-xl drop-shadow-lg">
                {active.title}
              </p>
            </div>

            {/* Progress bar */}
            <div
              ref={progressRef}
              className="relative h-1.5 bg-white/20 cursor-pointer group/progress mx-4 sm:mx-6 rounded-full overflow-hidden"
              onClick={handleProgressClick}
            >
              {/* Buffered */}
              <div
                className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                style={{ width: `${bufferedPct}%` }}
              />
              {/* Progress */}
              <div
                className="absolute inset-y-0 left-0 bg-rose-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
              {/* Scrub handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            {/* Time + play button row */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-gradient-to-t from-black/50 to-transparent">
              <button
                className="text-white/90 hover:text-white transition-colors"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <span className="text-white/80 text-xs font-[family-name:var(--font-body)] tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
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
