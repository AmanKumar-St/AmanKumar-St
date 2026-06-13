import { useEffect, useState, useRef } from 'react';
import { STATS } from '../../constants/theme';

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="page-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      <h2 className="section-header">About Aman</h2>
      
      <div className="max-w-2xl">
        <p className="text-lg mb-4 leading-relaxed" style={{ color: '#E2E8F0' }}>
          I am a Full Stack Developer with a passion for creating immersive digital experiences. 
          With over 7 years of experience in web development, I specialize in building 
          high-performance applications that combine stunning visuals with robust functionality.
        </p>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#94A3B8' }}>
          My expertise spans across modern JavaScript frameworks, 3D graphics with Three.js, 
          and crafting responsive, accessible user interfaces that delight users and drive business results.
        </p>
      </div>
      
      {/* Stats Card */}
      <div className="stats-card p-8 rounded-xl max-w-2xl"
        style={{
          background: 'rgba(24, 37, 63, 0.4)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => (
            <div 
              key={index}
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${index * 0.1}s`,
              }}
            >
              <div 
                className="text-4xl font-bold mb-2 font-cinzel"
                style={{ color: '#D4AF37' }}
              >
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: '#94A3B8' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}