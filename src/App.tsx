import { useState, useEffect, useRef } from 'react'
import WelcomeSection from './components/WelcomeSection'
import LoveLetterSection from './components/LoveLetterSection'
import ReasonsILoveYou from './components/ReasonsILoveYou'
import PhotoGallery from './components/PhotoGallery'
import MusicPlayer from './components/MusicPlayer'
import VideoSection from './components/VideoSection'
import ClosingSection from './components/ClosingSection'
import FloatingPetals from './components/FloatingPetals'
import FloatingHearts from './components/FloatingHearts'
import FloatingRibbons from './components/FloatingRibbons'
import NavigationDots from './components/NavigationDots'

const sectionNames = ['Love Letter', 'Videos', 'Reasons', 'Gallery', 'Forever']

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [videoMuted, setVideoMuted] = useState(false)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!hasEntered) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement)
            if (index !== -1) setActiveSection(index)
          }
        })
      },
      { threshold: 0.3 }
    )

    const currentRefs = sectionRefs.current.filter((ref): ref is HTMLElement => Boolean(ref))
    currentRefs.forEach((ref) => observer.observe(ref))

    return () => {
      currentRefs.forEach((ref) => observer.unobserve(ref))
    }
  }, [hasEntered])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }

  if (!hasEntered) {
    return (
      <>
        <FloatingPetals />
        <FloatingRibbons />
        <WelcomeSection onEnter={() => setHasEntered(true)} />
      </>
    )
  }

  return (
    <div className="relative">
      <FloatingPetals />
      <FloatingHearts />
      <FloatingRibbons />
      <MusicPlayer isVisible={hasEntered} autoPlayTrack={0} muted={videoMuted} />
      <NavigationDots
        sections={sectionNames}
        activeSection={activeSection}
        onDotClick={scrollToSection}
      />

      <main>
        <section ref={setSectionRef(0)}>
          <LoveLetterSection />
        </section>
        <section ref={setSectionRef(1)}>
          <VideoSection onVideoMutedChange={setVideoMuted} />
        </section>
        <section ref={setSectionRef(2)}>
          <ReasonsILoveYou />
        </section>
        <section ref={setSectionRef(3)}>
          <PhotoGallery />
        </section>
        <section ref={setSectionRef(4)}>
          <ClosingSection />
        </section>

        {/* Footer copyright */}
        <footer className="text-center py-8 sm:py-10 border-t border-rose-200/40">
          <p className="font-[family-name:var(--font-body)] text-rose-400 text-sm sm:text-base">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
          <p className="font-[family-name:var(--font-body)] text-rose-400/70 text-xs sm:text-sm mt-1">
            Created by <span className="text-rose-500 font-semibold">Mohamed Yousry</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
