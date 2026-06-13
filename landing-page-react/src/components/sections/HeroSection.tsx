import { useEffect, useState } from 'react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="page-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      {/* Badge */}
      <div className="badge mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-sm font-medium tracking-wider" style={{ color: '#D4AF37' }}>
          Available for Projects
        </span>
      </div>
      
      {/* Main Title */}
      <h1 
        className="font-cinzel text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F3E5AB 40%, #D4AF37 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Aman Kumar
      </h1>
      
      {/* Subtitle */}
      <p 
        className="text-xl md:text-2xl font-light mb-8"
        style={{ color: '#94A3B8' }}
      >
        Creative Developer & UI Architect
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="btn-primary">
          Explore Projects
        </button>
        <button className="btn-secondary">
          Download Resume
        </button>
      </div>
      
      {/* Social Links */}
      <div className="flex gap-6 mt-10">
        {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
          <a
            key={social}
            href="#"
            className="text-sm transition-colors duration-300 hover:text-amber-400"
            style={{ color: '#94A3B8' }}
          >
            {social}
          </a>
        ))}
      </div>
    </div>
  );
}