import { useAppStore } from '../../store/useAppStore';
import { NAV_OPTIONS } from '../../constants/theme';

interface MobileNavProps {
  onNavigate: (index: number) => void;
}

export function MobileNav({ onNavigate }: MobileNavProps) {
  const currentSection = useAppStore((state) => state.currentSection);
  const isTransitioning = useAppStore((state) => state.isTransitioning);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div 
        className="flex items-center justify-around px-4 py-3"
        style={{
          background: 'rgba(14, 22, 38, 0.95)',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {NAV_OPTIONS.map((option, index) => {
          const isActive = currentSection === index;
          return (
            <button
              key={option.id}
              onClick={() => !isTransitioning && !isActive && onNavigate(index)}
              className="flex flex-col items-center gap-1 p-2 transition-all duration-300"
              style={{
                opacity: isActive ? 1 : 0.6,
              }}
            >
              <span 
                className="text-xs font-medium"
                style={{ color: isActive ? '#D4AF37' : '#94A3B8' }}
              >
                {option.id + 1}
              </span>
              <div 
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: isActive ? '#D4AF37' : 'transparent',
                  border: isActive ? 'none' : '1px solid #94A3B8',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
