import { useEffect, useCallback } from 'react';
import { useAppStore } from './store/useAppStore';
import { Background } from './components/Background/Background';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { PageTransition } from './components/PageTransition/PageTransition';
import { CircularNav } from './components/CircularNav/CircularNav';
import { MobileNav } from './components/MobileNav/MobileNav';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';
import { useAudioEngine } from './hooks/useAudioEngine';

const SECTIONS = [HeroSection, AboutSection, ProjectsSection, SkillsSection, ContactSection];

function App() {
  const isLoading = useAppStore((state) => state.isLoading);
  const currentSection = useAppStore((state) => state.currentSection);
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);
  const setIsTransitioning = useAppStore((state) => state.setIsTransitioning);
  
  const { playActive } = useAudioEngine();

  const navigateTo = useCallback((targetIndex: number) => {
    if (targetIndex === currentSection) return;
    
    playActive();
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentSection(targetIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 550);
  }, [currentSection, setCurrentSection, setIsTransitioning, playActive]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = (currentSection + 1) % SECTIONS.length;
        navigateTo(next);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = (currentSection - 1 + SECTIONS.length) % SECTIONS.length;
        navigateTo(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, navigateTo]);

  // Mouse Wheel Navigation
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (scrollTimeout) return;
      
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        
        if (e.deltaY > 0) {
          const next = (currentSection + 1) % SECTIONS.length;
          navigateTo(next);
        } else {
          const prev = (currentSection - 1 + SECTIONS.length) % SECTIONS.length;
          navigateTo(prev);
        }
      }, 200);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, navigateTo]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <Background>
        <div 
          id="main-app"
          className="relative w-full h-screen overflow-hidden"
          style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 1s ease-out' }}
        >
          <div className="flex h-full">
            {/* Content Area - Left Side */}
            <div className="content-area relative flex items-center h-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 z-10 w-full lg:w-[60%] xl:w-[65%]">
              {SECTIONS.map((Section, index) => (
                <div
                  key={index}
                  className="page-section absolute left-6 right-4 sm:left-8 sm:right-6 md:left-10 md:right-8 lg:left-12 lg:right-4 xl:left-16 xl:right-8 top-1/2 -translate-y-1/2 w-auto"
                  style={{
                    opacity: currentSection === index ? 1 : 0,
                    pointerEvents: currentSection === index ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease-out',
                  }}
                >
                  <Section />
                </div>
              ))}
            </div>
            
            {/* Circular Navigation - Right Side (Desktop only) */}
            <div className="hidden lg:flex flex-[0_0_40%] xl:flex-[0_0_35%] h-full relative items-center justify-center">
              <CircularNav onNavigate={navigateTo} />
            </div>
          </div>
          
          {/* Mobile Navigation - Bottom */}
          <MobileNav onNavigate={navigateTo} />
          
          {/* Page Transition Overlay */}
          <PageTransition />
        </div>
      </Background>
    </>
  );
}

export default App;
