import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '../../store/useAppStore';

const FULL_NAME = 'Aman Kumar';

export function LoadingScreen() {
  const [showMonogram, setShowMonogram] = useState(false);
  const [showRing, setShowRing] = useState(false);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  
  const textContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    
    // Character by character animation
    const chars = node.querySelectorAll('.load-char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.1, 
        stagger: 0.08,
        ease: 'power2.out'
      }
    );
  }, []);

  const handleSkip = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    // Animate text appearance - show all characters at once
    setTimeout(() => {
      setShowMonogram(true);
      setShowRing(true);
      // Then hide loading screen
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, 1500);
  }, [setIsLoading]);

  return (
    <div 
      id="loading-screen" 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-800"
      style={{ 
        background: 'radial-gradient(circle at center, #0F172A 0%, #070B14 100%)',
        opacity: showMonogram ? 0 : 1,
        visibility: showMonogram ? 'hidden' : 'visible',
      }}
    >
      {/* Ambient Glow */}
      <div className="load-glow absolute w-[500px] h-[500px] rounded-full" 
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(59,7,100,0.2) 50%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'pulseGlow 4s ease-in-out infinite alternate',
        }}
      />

      {/* Loading Text Container */}
      <div ref={textContainerRef} className="relative flex items-center justify-center h-[120px] w-[400px]">
        <div className="load-name font-cinzel text-[3.5rem] font-bold tracking-[0.15em] absolute flex">
          {FULL_NAME.split('').map((char, i) => (
            <span key={i} className="load-char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Monogram Block */}
        <div 
          className="monogram-block absolute w-[130px] h-[130px] rounded-full flex justify-center items-center"
          style={{
            background: 'rgba(14, 22, 38, 0.8)',
            border: '2px solid #D4AF37',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(212, 175, 55, 0.2)',
            backdropFilter: 'blur(10px)',
            opacity: showMonogram ? 1 : 0,
            transform: showMonogram ? 'scale(1)' : 'scale(0)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 2,
          }}
        >
          <span 
            className="monogram-text font-cinzel text-[3rem] font-black"
            style={{ 
              color: '#F3E5AB',
              textShadow: '0 0 15px #D4AF37',
              letterSpacing: '-3px',
            }}
          >
            AK
          </span>
        </div>

        {/* Loader Ring */}
        <div 
          className="loader-ring absolute w-[170px] h-[170px] rounded-full"
          style={{
            border: '3px solid transparent',
            borderTopColor: '#FFFFFF',
            borderBottomColor: '#D4AF37',
            opacity: showRing ? 1 : 0,
            transform: showRing ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.5s ease-out',
            zIndex: 1,
            animation: showRing ? 'spin 2s linear infinite' : 'none',
          }}
        />
      </div>

      {/* Skip Button */}
      <button 
        onClick={handleSkip}
        className="skip-loader absolute bottom-10 right-10 px-6 py-2.5 text-sm tracking-wider rounded-[30px] cursor-pointer backdrop-blur-sm transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#94A3B8',
          zIndex: 10,
        }}
      >
        Skip
      </button>

      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.9; }
        }
        @keyframes spin {
          from { transform: scale(1) rotate(0deg); }
          to { transform: scale(1) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}