import { useEffect, useState, useRef } from 'react';
import { PROJECTS } from '../../constants/theme';

export function ProjectsSection() {
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
      <h2 className="section-header">Featured Works</h2>
      
      <div className="flex flex-col gap-6 max-w-3xl">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="project-card p-0 rounded-xl overflow-hidden"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: `all 0.6s ease-out ${index * 0.15}s`,
            }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Project Image/Placeholder */}
              <div 
                className="project-img w-full md:w-1/3 h-40 md:h-auto flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #18253F, #0E1626)',
                  minHeight: '160px',
                }}
              >
                <span className="font-cinzel text-xl" style={{ color: '#D4AF37' }}>
                  {project.imageText}
                </span>
              </div>
              
              {/* Project Info */}
              <div className="p-6 flex-1">
                <h3 
                  className="font-cinzel text-xl font-bold mb-3"
                  style={{ color: '#E2E8F0' }}
                >
                  {project.title}
                </h3>
                <p 
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: '#94A3B8' }}
                >
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: '#D4AF37',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <a 
                  href={project.liveUrl || '#'}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-amber-400"
                  style={{ color: '#D4AF37' }}
                >
                  Live Preview
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}