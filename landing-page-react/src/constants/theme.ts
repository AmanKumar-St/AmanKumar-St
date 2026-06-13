export const COLORS = {
  royalDeep: '#070B14',
  royalMid: '#0E1626',
  royalLight: '#18253F',
  accentGold: '#D4AF37',
  accentGoldLight: '#F3E5AB',
  accentGoldGlow: 'rgba(212, 175, 55, 0.5)',
  neonWhite: '#FFFFFF',
  neonWhiteGlow: 'rgba(255, 255, 255, 0.8)',
  neonCyanGlow: 'rgba(0, 240, 255, 0.6)',
  textMain: '#E2E8F0',
  textMuted: '#94A3B8',
  cardBg: 'rgba(24, 37, 63, 0.4)',
  cardBorder: 'rgba(212, 175, 55, 0.2)',
} as const;

export const FONTS = {
  cinzel: "'Cinzel', serif",
  jakarta: "'Plus Jakarta Sans', sans-serif",
} as const;

export const NAV_OPTIONS = [
  { id: 0, label: "01. Home Hero", sectionId: "section-0" },
  { id: 1, label: "02. About Me", sectionId: "section-1" },
  { id: 2, label: "03. Projects", sectionId: "section-2" },
  { id: 3, label: "04. Expertise", sectionId: "section-3" },
  { id: 4, label: "05. Contact", sectionId: "section-4" },
] as const;

export const STATS = [
  { value: "7+", label: "Years of Crafting Digital Experiences" },
  { value: "50+", label: "Projects Crafted" },
  { value: "100%", label: "Client Satisfaction Rate" },
] as const;

export const SKILLS = [
  {
    category: "Frontend Mastery",
    items: [
      "HTML5 / Modern CSS3",
      "JavaScript (ES6+) / TypeScript",
      "React.js / Next.js Framework",
      "Vue.js / Nuxt Architectural Systems",
    ],
  },
  {
    category: "Creative Engineering",
    items: [
      "Three.js & WebGL 3D Engines",
      "Figma Prototyping & Design Systems",
      "Tailwind CSS / GSAP Smooth Animations",
    ],
  },
] as const;

export const PROJECTS = [
  {
    id: 'aetheria',
    title: 'Aetheria Immersive OS',
    description: 'A highly intelligent, WebGL-powered spatial operating system designed for next-gen luxury fashion showcases.',
    tags: ['Three.js', 'WebGL', 'React'],
    imageText: 'Aetheria 3D',
    liveUrl: '#',
  },
  {
    id: 'kronos',
    title: 'Kronos Financial Suite',
    description: 'An institutional banking dashboard wrapped in a futuristic, artistic cyberpunk gaming aesthetic with real-time analytics.',
    tags: ['React', 'D3.js', 'WebSocket'],
    imageText: 'Kronos AI',
    liveUrl: '#',
  },
] as const;