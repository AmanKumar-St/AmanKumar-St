import { useCallback, useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

type SoundType = 'hover' | 'click' | 'active';

interface AudioEngineHook {
  playHover: () => void;
  playClick: () => void;
  playActive: () => void;
  toggleAudio: () => void;
  isEnabled: boolean;
}

export function useAudioEngine(): AudioEngineHook {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioEnabled = useAppStore((state) => state.audioEnabled);
  const toggleAudio = useAppStore((state) => state.toggleAudio);

  useEffect(() => {
    // Lazy initialize AudioContext on first user interaction
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      document.removeEventListener('click', initAudioContext);
    };
    
    document.addEventListener('click', initAudioContext);
    return () => document.removeEventListener('click', initAudioContext);
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!audioEnabled || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    switch (type) {
      case 'hover':
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;
        
      case 'click':
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
        break;
        
      case 'active':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
    }
  }, [audioEnabled]);

  return {
    playHover: useCallback(() => playSound('hover'), [playSound]),
    playClick: useCallback(() => playSound('click'), [playSound]),
    playActive: useCallback(() => playSound('active'), [playSound]),
    toggleAudio,
    isEnabled: audioEnabled,
  };
}