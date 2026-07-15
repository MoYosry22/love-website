interface NavigationDotsProps {
  sections: string[]
  activeSection: number
  onDotClick: (index: number) => void
}

export default function NavigationDots({ sections, activeSection, onDotClick }: NavigationDotsProps) {
  return (
    <nav
      className="fixed right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-2.5 sm:gap-3 opacity-0 animate-[fade-in_0.5s_2s_ease_forwards]"
      aria-label="Section navigation"
    >
      {sections.map((label, i) => (
        <button
          key={i}
          className="group relative flex items-center justify-end"
          onClick={() => onDotClick(i)}
          title={label}
          aria-label={`Go to ${label}`}
        >
          {/* Tooltip */}
          <span className="absolute right-7 whitespace-nowrap bg-white/90 backdrop-blur-sm text-rose-500 text-[10px] sm:text-xs font-[family-name:var(--font-body)] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none">
            {label}
          </span>
          {/* Dot */}
          <div
            className={`rounded-full transition-all duration-300 will-change-transform ${
              activeSection === i
                ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-br from-rose-400 to-pink-500 shadow-md shadow-rose-300/50 animate-dot-pulse'
                : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-300/50 hover:bg-rose-400/70'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
