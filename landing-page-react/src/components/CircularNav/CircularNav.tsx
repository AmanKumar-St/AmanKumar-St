import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { NAV_OPTIONS } from '../../constants/theme';

interface CircularNavProps {
  onNavigate: (index: number) => void;
}

export function CircularNav({ onNavigate }: CircularNavProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentSection = useAppStore((state) => state.currentSection);
  const isTransitioning = useAppStore((state) => state.isTransitioning);
  
  const radius = 340;
  const totalOptions = NAV_OPTIONS.length;

  const updateRotation = useCallback(() => {
    if (!wrapperRef.current) return;
    
    const rotationAngle = -(currentSection * (360 / totalOptions));
    wrapperRef.current.style.transform = `rotate(${rotationAngle}deg)`;
    
    // Update active classes and counter-rotate text
    const items = wrapperRef.current.querySelectorAll('.nav-item');
    items.forEach((item, i) => {
      const baseAngle = Math.PI;
      const angleStep = (2 * Math.PI) / totalOptions;
      const itemAngle = baseAngle + (i * angleStep);
      const x = radius * Math.cos(itemAngle);
      const y = radius * Math.sin(itemAngle);
      
      if (i === currentSection) {
        item.className = 'nav-item active';
      } else {
        item.className = 'nav-item';
      }
      
      item.setAttribute('style', `transform: translate(${x}px, ${y}px) rotate(${-rotationAngle}deg)`);
    });
  }, [currentSection, totalOptions]);

  useEffect(() => {
    updateRotation();
  }, [updateRotation]);

  return (
    <div className="fixed right-[5%] top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      {/* Profile Image in Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-amber-400/40 shadow-lg"
        style={{
          background: 'linear-gradient(145deg, #0E1626, #18253F)',
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-cinzel text-3xl font-bold" style={{ color: '#D4AF37' }}>AK</span>
        </div>
      </div>
      
      {/* Navigation Items */}
      <div 
        ref={wrapperRef}
        className="relative w-[800px] h-[800px] transition-transform duration-500"
        style={{ marginLeft: '-300px' }}
      >
        {NAV_OPTIONS.map((option, i) => (
          <div
            key={option.id}
            className="nav-item absolute left-1/2 top-1/2 cursor-pointer transition-all duration-300"
            onClick={() => !isTransitioning && i !== currentSection && onNavigate(i)}
            data-index={i}
          >
            <span 
              className="block whitespace-nowrap px-4 py-2 rounded-full text-sm tracking-wider transition-all duration-300"
              style={{
                background: i === currentSection 
                  ? 'rgba(212, 175, 55, 0.2)' 
                  : 'rgba(14, 22, 38, 0.6)',
                border: i === currentSection 
                  ? '1px solid rgba(212, 175, 55, 0.6)' 
                  : '1px solid rgba(212, 175, 55, 0.2)',
                color: i === currentSection ? '#D4AF37' : '#94A3B8',
              }}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* SFX Toggle */}
      <button 
        id="sfx-toggle"
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-all duration-300 active-sfx"
        style={{
          background: 'rgba(212, 175, 55, 0.2)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          color: '#D4AF37',
        }}
        onClick={() => useAppStore.getState().toggleAudio()}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
        SFX: On
      </button>
    </div>
  );
}