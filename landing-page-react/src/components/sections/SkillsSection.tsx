import { useEffect, useState, useRef } from 'react';
import { SKILLS } from '../../constants/theme';

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      <h2 className="section-header">Expertise & Skills</h2>
      
      <div className="flex flex-col gap-8 max-w-3xl">
        {SKILLS.map((category, catIndex) => (
          <div
            key={category.category}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease-out ${catIndex * 0.1}s`,
            }}
          >
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: '#D4AF37' }}
            >
              {category.category}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {category.items.map((skill, skillIndex) => (
                <div
                  key={skill}
                  className="skill-tag inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#E2E8F0',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                    transition: `all 0.4s ease-out ${catIndex * 0.1 + skillIndex * 0.05}s`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}