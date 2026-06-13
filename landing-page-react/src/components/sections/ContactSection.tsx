import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your inquiry has been securely transmitted to Aman Kumar\'s terminal.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div 
      ref={sectionRef}
      className="page-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      <h2 className="section-header">Initiate Contact</h2>
      
      <div className="max-w-xl">
        <p 
          className="text-lg mb-8"
          style={{ color: '#94A3B8' }}
        >
          Ready to build something intelligent and awe-inspiring together? Drop a message below and I will respond within 24 hours.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="custom-input"
            />
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="custom-input"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Brief details about your project or inquiry..."
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="custom-input resize-none"
            />
          </div>
          
          <button 
            type="submit"
            className="btn-primary w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}