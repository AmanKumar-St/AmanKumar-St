import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BackgroundProps {
  children?: React.ReactNode;
}

export function Background({ children }: BackgroundProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    const grid = gridRef.current;
    gsap.to(grid, {
      backgroundPositionY: '+=60px',
      duration: 30,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <div className="bg-art">
      <div 
        ref={gridRef}
        className="bg-grid"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
        }}
      />
      {children}
    </div>
  );
}