import { useMemo } from 'react'

interface Heart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  color: string
}

export default function FloatingHearts() {
  const hearts = useMemo<Heart[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 8,
      size: 12 + Math.random() * 16,
      color: `hsl(${335 + Math.random() * 25}, ${70 + Math.random() * 20}%, ${65 + Math.random() * 20}%)`,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden floating-hearts">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-0"
          style={{
            left: `${h.left}%`,
            animation: `heartFloat ${h.duration}s ease-in-out ${h.delay}s infinite`,
          }}
        >
          <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={h.color}
              opacity="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
