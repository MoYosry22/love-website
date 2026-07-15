import { useMemo } from 'react'

interface RibbonBow {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  color1: string
  color2: string
  rotation: number
  opacity: number
}

const bowColors: [string, string][] = [
  ['#be185d', '#e11d48'],
  ['#f9a8d4', '#f472b6'],
  ['#d4a574', '#f472b6'],
  ['#fda4af', '#fb7185'],
  ['#e11d48', '#f9a8d4'],
  ['#fce7f3', '#e11d48'],
]

const bowsData: RibbonBow[] = Array.from({ length: 14 }, (_, i) => {
  const color = bowColors[i % bowColors.length]
  return {
    id: i,
    left: (i * 7.3 + 2) % 100,
    delay: (i * 1.5) % 12,
    duration: 16 + (i * 3.7) % 12,
    size: 36 + (i * 7) % 24,
    color1: color[0],
    color2: color[1],
    rotation: -20 + (i * 13) % 40,
    opacity: 0.2 + (i * 0.04) % 0.2,
  }
})

function BowSvg({ color1, color2, size }: { color1: string; color2: string; size: number }) {
  const id = `b${color1.replace('#', '')}${size}`
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none">
      <defs>
        <linearGradient id={`g${id}`} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      {/* Left loop - squarish */}
      <path d="M50 44 C48 34 38 8 18 8 C8 8 2 16 2 26 C2 36 8 44 16 44 Z" fill={`url(#g${id})`} />
      {/* Right loop - squarish */}
      <path d="M50 44 C52 34 62 8 82 8 C92 8 98 16 98 26 C98 36 92 44 84 44 Z" fill={`url(#g${id})`} />
      {/* Center knot */}
      <ellipse cx="50" cy="44" rx="5" ry="4.5" fill={color2} />
      {/* Left tail */}
      <path d="M46 47 L40 82 L36 94 L32 82 L44 47Z" fill={`url(#g${id})`} opacity="0.85" />
      {/* Right tail */}
      <path d="M54 47 L60 82 L64 94 L68 82 L56 47Z" fill={`url(#g${id})`} opacity="0.85" />
    </svg>
  )
}

export default function FloatingRibbons() {
  const bows = useMemo(() => bowsData, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {bows.map((b) => (
        <div
          key={b.id}
          className="absolute will-change-transform"
          style={{
            left: `${b.left}%`,
            top: '-60px',
            '--rot': `${b.rotation}deg`,
            '--op': b.opacity,
            animation: `ribbonDrift ${b.duration}s ease-in-out ${b.delay}s infinite`,
          } as React.CSSProperties}
        >
          <BowSvg color1={b.color1} color2={b.color2} size={b.size} />
        </div>
      ))}
    </div>
  )
}
