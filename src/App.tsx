import { useState, useEffect, useRef } from 'react'
import WelcomeSection from './components/WelcomeSection'
import LoveLetterSection from './components/LoveLetterSection'
import ReasonsILoveYou from './components/ReasonsILoveYou'
import PhotoGallery from './components/PhotoGallery'
import MusicPlayer from './components/MusicPlayer'
import ClosingSection from './components/ClosingSection'
import FloatingPetals from './components/FloatingPetals'
import FloatingHearts from './components/FloatingHearts'
import FloatingRibbons from './components/FloatingRibbons'
import NavigationDots from './components/NavigationDots'

const sectionNames = ['Love Letter', 'Reasons', 'Gallery', 'Forever']

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
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
      <MusicPlayer isVisible={hasEntered} autoPlayTrack={0} />
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
          <ReasonsILoveYou />
        </section>
        <section ref={setSectionRef(2)}>
          <PhotoGallery />
        </section>
        <section ref={setSectionRef(3)}>
          <ClosingSection />
        </section>
      </main>
    </div>
  )
}
