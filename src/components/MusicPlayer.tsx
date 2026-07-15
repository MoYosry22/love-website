import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Track {
  title: string
  artist: string
  videoId: string
}

interface MusicPlayerProps {
  isVisible: boolean
  autoPlayTrack?: number
  muted?: boolean
}

declare global {
  interface Window {
    YT: {
      Player: new (id: string, config: Record<string, unknown>) => YTPlayer
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YTPlayer {
  playVideo(): void
  pauseVideo(): void
  loadVideoById(videoId: string): void
  getCurrentTime(): number
  getDuration(): number
  getPlayerState(): number
  seekTo(seconds: number, allowSeekAhead: boolean): void
  destroy(): void
}

const tracks: Track[] = [
  { title: 'Love Story', artist: 'Taylor Swift', videoId: '8xg3vE8Ie_E' },
  { title: 'The Fate of Ophelia', artist: 'Taylor Swift', videoId: 'ko70cExuzZM' },
  { title: 'Stargazing', artist: 'Myles Smith', videoId: 'tKml80alH3Y' },
  { title: 'her', artist: 'JVKE', videoId: 'f5-IY_Ja1RM' },
  { title: 'CASE 143', artist: 'Stray Kids', videoId: 'jYSlpC6Ud2A' },
  { title: 'Neverending Story', artist: 'Stray Kids', videoId: 'ALd-Pocq7Hk' },
  { title: "Can't Stop", artist: 'Stray Kids', videoId: 'iI2v-CXKXU4' },
  { title: 'Something Just Like This', artist: 'The Chainsmokers & Coldplay', videoId: 'FM7MFYoylVs' },
  { title: 'If the World Was Ending', artist: 'JP Saxe & Julia Michaels', videoId: '1jO2wSpAoxA' },
]

const YT_STATE_PLAYING = 1
const YT_STATE_PAUSED = 2
const YT_STATE_ENDED = 0

export default function MusicPlayer({ isVisible, autoPlayTrack, muted }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(0)
  const playerRef = useRef<YTPlayer | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasAutoPlayed = useRef(false)
  const isReady = useRef(false)
  const isPlayingRef = useRef(false)

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      const player = playerRef.current
      if (!player) return
      try {
        const current = player.getCurrentTime()
        const duration = player.getDuration()
        if (duration > 0) {
          setProgress((current / duration) * 100)
        }
      } catch {
        // player not ready yet
      }
    }, 500)
  }, [])

  const stopProgressTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const handleNextTrack = useCallback(() => {
    setCurrentTrack((prev) => {
      const next = prev < tracks.length - 1 ? prev + 1 : 0
      playerRef.current?.loadVideoById(tracks[next].videoId)
      setProgress(0)
      return next
    })
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer()
        return
      }

      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)

      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    }

    function createPlayer() {
      const container = document.getElementById('youtube-player-container')
      if (!container) return

      // Clear any existing player
      container.innerHTML = ''

      const playerDiv = document.createElement('div')
      playerDiv.id = 'yt-player'
      container.appendChild(playerDiv)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const player = new (window.YT.Player as any)('yt-player', {
        height: '1',
        width: '1',
        videoId: tracks[autoPlayTrack ?? 0].videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: () => {
            isReady.current = true
            playerRef.current = player
            startProgressTracking()

            if (autoPlayTrack !== undefined && autoPlayTrack >= 0 && !hasAutoPlayed.current) {
              hasAutoPlayed.current = true
              setCurrentTrack(autoPlayTrack)
              setTimeout(() => {
                player.playVideo()
                setIsPlaying(true)
              }, 800)
            }
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === YT_STATE_PLAYING) {
              setIsPlaying(true)
              startProgressTracking()
            } else if (event.data === YT_STATE_PAUSED) {
              setIsPlaying(false)
              stopProgressTracking()
            } else if (event.data === YT_STATE_ENDED) {
              setIsPlaying(false)
              stopProgressTracking()
              handleNextTrack()
            }
          },
          onError: () => {
            handleNextTrack()
          },
        },
      })
    }

    loadYouTubeAPI()

    return () => {
      stopProgressTracking()
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch {
          // ignore
        }
        playerRef.current = null
      }
      isReady.current = false
    }
  }, [isVisible, autoPlayTrack, startProgressTracking, stopProgressTracking, handleNextTrack])

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    const player = playerRef.current
    if (!player || !isReady.current) return

    if (muted && isPlayingRef.current) {
      player.pauseVideo()
    } else if (!muted && !isPlayingRef.current) {
      player.playVideo()
    }
  }, [muted])

  const togglePlay = () => {
    const player = playerRef.current
    if (!player || !isReady.current) return

    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  const handleTrackSelect = (index: number) => {
    const player = playerRef.current
    if (!player || !isReady.current) return

    setCurrentTrack(index)
    setProgress(0)
    player.loadVideoById(tracks[index].videoId)
  }

  const handleSeek = (offset: number) => {
    const player = playerRef.current
    if (!player || !isReady.current) return
    const current = player.getCurrentTime()
    const duration = player.getDuration()
    const newTime = Math.max(0, Math.min(current + offset, duration))
    player.seekTo(newTime, true)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Hidden YouTube player container */}
      <div
        id="youtube-player-container"
        className="fixed pointer-events-none"
        style={{ width: 1, height: 1, opacity: 0, bottom: 0, right: 0, zIndex: -1 }}
      />

      {/* Floating music button */}
      <motion.button
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg shadow-rose-300/50 flex items-center justify-center text-white border-2 border-white/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </motion.div>
      </motion.button>

      {/* Music player panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 w-60 sm:w-64 md:w-72 love-card rounded-2xl p-4 sm:p-5 shadow-xl"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <p className="font-[family-name:var(--font-serif)] text-rose-600 font-semibold text-sm mb-3">
              Our Playlist
            </p>

            {/* Track list */}
            <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
              {tracks.map((track, i) => (
                <button
                  key={i}
                  className={`w-full text-left p-2 rounded-lg transition-all duration-200 ${
                    i === currentTrack
                      ? 'bg-rose-200/60'
                      : 'hover:bg-rose-100/40'
                  }`}
                  onClick={() => handleTrackSelect(i)}
                >
                  <p className={`text-xs sm:text-sm font-[family-name:var(--font-body)] ${
                    i === currentTrack ? 'text-rose-600 font-semibold' : 'text-rose-500'
                  }`}>
                    {track.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-rose-400">{track.artist}</p>
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="w-full h-1.5 bg-rose-200/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full music-bar rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <button
                className="text-rose-400 hover:text-rose-600 transition-colors p-1"
                onClick={() => handleTrackSelect(currentTrack > 0 ? currentTrack - 1 : tracks.length - 1)}
                aria-label="Previous track"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>
              <button
                className="text-rose-400 hover:text-rose-600 transition-colors p-1 relative"
                onClick={() => handleSeek(-10)}
                aria-label="Rewind 10 seconds"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-rose-500 mt-0.5">10</span>
              </button>
              <button
                className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-md"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                className="text-rose-400 hover:text-rose-600 transition-colors p-1 relative"
                onClick={() => handleSeek(10)}
                aria-label="Forward 10 seconds"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-rose-500 mt-0.5">10</span>
              </button>
              <button
                className="text-rose-400 hover:text-rose-600 transition-colors p-1"
                onClick={() => handleTrackSelect(currentTrack < tracks.length - 1 ? currentTrack + 1 : 0)}
                aria-label="Next track"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
