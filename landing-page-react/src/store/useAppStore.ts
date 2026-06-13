import { create } from 'zustand';

interface AppState {
  currentSection: number;
  isLoading: boolean;
  isTransitioning: boolean;
  audioEnabled: boolean;
  
  // Actions
  setCurrentSection: (section: number) => void;
  setIsLoading: (loading: boolean) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  toggleAudio: () => void;
  setAudioEnabled: (enabled: boolean) => void;
  navigateNext: () => void;
  navigatePrev: () => void;
}

const TOTAL_SECTIONS = 5;

export const useAppStore = create<AppState>((set, get) => ({
  currentSection: 0,
  isLoading: true,
  isTransitioning: false,
  audioEnabled: true,

  setCurrentSection: (section) => set({ currentSection: section }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  
  navigateNext: () => {
    const { currentSection, isTransitioning } = get();
    if (isTransitioning) return;
    const next = (currentSection + 1) % TOTAL_SECTIONS;
    set({ currentSection: next, isTransitioning: true });
    setTimeout(() => set({ isTransitioning: false }), 600);
  },
  
  navigatePrev: () => {
    const { currentSection, isTransitioning } = get();
    if (isTransitioning) return;
    const prev = (currentSection - 1 + TOTAL_SECTIONS) % TOTAL_SECTIONS;
    set({ currentSection: prev, isTransitioning: true });
    setTimeout(() => set({ isTransitioning: false }), 600);
  },
}));