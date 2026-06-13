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
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {/* Badge */}
      <div className="badge">
        <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: 'pulseDot 2s infinite alternate' }}></span>
        <span className="text-sm font-medium tracking-wider" style={{ color: '#D4AF37' }}>
          Available for Projects
        </span>
      </div>
      
      {/* Main Title */}
      <h1 
        className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
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
        className="text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-lg"
        style={{ color: '#94A3B8' }}
      >
        Creative Developer & UI Architect crafting immersive digital experiences
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
        {[
          { name: 'GitHub', url: 'https://github.com' },
          { name: 'LinkedIn', url: 'https://linkedin.com' },
          { name: 'Twitter', url: 'https://twitter.com' },
        ].map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-300 hover:text-amber-400"
            style={{ color: '#94A3B8' }}
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>
  );
}