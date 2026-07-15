import { useMemo } from 'react'

interface Petal {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  rotation: number
  type: 'petal' | 'cherry'
  color: string
}

export default function FloatingPetals() {
  const petals = useMemo<Petal[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 10,
      size: 14 + Math.random() * 18,
      rotation: Math.random() * 360,
      type: Math.random() > 0.4 ? 'petal' : 'cherry',
      color: `hsl(${340 + Math.random() * 20}, 80%, ${75 + Math.random() * 15}%)`,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden floating-petals">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.type === 'petal' ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 4 8 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 8 12 2 12 2Z"
                fill={p.color}
                opacity="0.8"
              />
            </svg>
          ) : (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="14" r="7" fill="#ffb6c1" opacity="0.85" />
              <circle cx="10" cy="13" r="3" fill="#f9a8d4" opacity="0.6" />
              <path d="M12 7C12 4 10 2 8 1" stroke="#8fbc8f" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="7" cy="2" rx="3" ry="1.5" fill="#90c97a" opacity="0.7" transform="rotate(-30 7 2)" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
