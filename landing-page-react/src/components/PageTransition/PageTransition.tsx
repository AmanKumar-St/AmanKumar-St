import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAppStore } from '../../store/useAppStore';

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useAppStore((state) => state.isTransitioning);

  useEffect(() => {
    if (!overlayRef.current) return;
    
    const slices = overlayRef.current.querySelectorAll('.transition-slice');
    
    if (isTransitioning) {
      // Animate slices closing
      gsap.to(slices, {
        xPercent: (i) => (i < 5 ? 100 : -100),
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.inOut',
      });
    } else {
      // Animate slices opening
      gsap.to(slices, {
        xPercent: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.inOut',
      });
    }
  }, [isTransitioning]);

  return (
    <div 
      ref={overlayRef}
      id="page-transition-overlay"
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="transition-slice absolute top-0 h-full"
          style={{
            left: `${i * 10}%`,
            width: '10%',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.1) 100%)',
            borderLeft: i > 0 ? '1px solid rgba(212, 175, 55, 0.2)' : 'none',
            borderRight: i < 9 ? '1px solid rgba(212, 175, 55, 0.2)' : 'none',
          }}
        />
      ))}
    </div>
  );
}