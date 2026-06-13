# Implementation Plan: Convert Landing Page to React + Tailwind CSS

## 1. OBJECTIVE

Convert the existing plain HTML/CSS landing page into a modern React + Tailwind CSS application while:
- **Preserving the exact visual design** (colors, typography, animations, layout)
- **Adding full responsive behavior** for mobile, tablet, and desktop
- **Making the page dynamic** with proper state management and component architecture
- **Implementing Test-Driven Development (TDD)** for every feature
- **Integrating animation libraries** (GSAP, Framer Motion) and Three.js for enhanced effects

## 2. CONTEXT SUMMARY

### Current State
- **Single HTML file** (`/landing-page/index.html`) with ~1550 lines
- All CSS embedded inline, all JavaScript in `<script>` tags
- **Basic responsive breakpoints** only at 1400px and 1024px
- No component reusability, no build system, no testing

### Key Features to Preserve
| Feature | Description |
|---------|-------------|
| Loading Screen | "Aman Kumar" → "AK" monogram animation sequence |
| Circular Navigation | Orbit-based nav with profile image center |
| Page Transitions | Golden curtain/slice animation between sections |
| Hero Section | Badge, title, subtitle, CTA buttons |
| About Section | Text content with stats card |
| Projects Section | Project cards carousel |
| Skills Section | Categorized skill tags |
| Contact Section | Form with inputs |
| Audio Engine | Web Audio API sound effects |
| Background Effects | Animated grid, radial gradients |

### Tech Stack Decision
| Category | Choice | Rationale |
|----------|--------|-----------|
| Framework | React 18 + Vite | Fast HMR, modern tooling, ecosystem |
| Styling | Tailwind CSS 3.4 | Requested, utility-first, responsive |
| Animations | GSAP + Framer Motion | GSAP for complex sequences, Framer Motion for React components |
| 3D Effects | Three.js + React Three Fiber | Requested, declarative Three.js for React |
| Testing | Vitest + React Testing Library + Playwright | Fast unit tests, component tests, E2E tests |
| State Management | Zustand | Lightweight, minimal boilerplate |
| Routing | React Router DOM | Section navigation |
| TypeScript | TypeScript | Type safety, requested for maintainability |

## 3. APPROACH OVERVIEW

### Migration Strategy: Incremental Component Extraction
1. **Phase 1**: Set up React + Vite + Tailwind project with theme configuration
2. **Phase 2**: Create base components with Tailwind, preserving exact visual styles
3. **Phase 3**: Add responsive behavior using Tailwind breakpoints
4. **Phase 4**: Integrate GSAP/Framer Motion for animations
5. **Phase 5**: Add Three.js for background effects
6. **Phase 6**: Implement TDD for all features

### Responsive Design Strategy
- **Mobile-first approach** with Tailwind's responsive prefixes
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- Circular navigation transforms to bottom tab bar on mobile
- Full layout reflow for smaller screens

## 4. IMPLEMENTATION STEPS

### Phase 1: Project Setup & Configuration

#### Step 1.1: Initialize React + Vite Project
- **Goal**: Create a modern build setup
- **Method**: 
  ```bash
  npm create vite@latest landing-page-react -- --template react-ts
  cd landing-page-react
  npm install
  ```
- **Reference**: `/landing-page/`

#### Step 1.2: Configure Tailwind CSS
- **Goal**: Set up Tailwind with custom theme matching exact colors
- **Method**: Install and configure Tailwind with custom color palette:
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- **Reference**: Create `tailwind.config.js` with:
  - Custom colors: `bg-royal-deep`, `bg-royal-mid`, `accent-gold`, etc.
  - Custom fonts: Cinzel, Plus Jakarta Sans
  - Custom animations for grid, pulse effects
- **Test**: Verify Tailwind compiles without errors

#### Step 1.3: Set Up Testing Infrastructure
- **Goal**: Enable TDD from the start
- **Method**:
  ```bash
  npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
  npm install -D @playwright/test
  ```
- **Reference**: Configure `vitest.config.ts` and `playwright.config.ts`
- **Test**: Write a passing test for Tailwind config validation

### Phase 2: Base Component Architecture

#### Step 2.1: Define TypeScript Types & Data
- **Goal**: Create type-safe data structures
- **Method**: Create `/src/types/index.ts`:
  ```typescript
  interface NavOption { id: number; label: string; sectionId: string; }
  interface Project { id: string; title: string; description: string; tags: string[]; }
  interface Skill { category: string; items: string[]; }
  interface ContactForm { name: string; email: string; message: string; }
  ```
- **Test**: Unit test for type definitions

#### Step 2.2: Create Theme Constants
- **Goal**: Centralize design tokens
- **Method**: Create `/src/constants/theme.ts` with all CSS variables as JS constants
- **Reference**: Export colors, fonts, spacing values
- **Test**: Snapshot test for theme object

#### Step 2.3: Set Up Zustand Store
- **Goal**: Global state management for navigation, audio, loading
- **Method**: Create `/src/store/useAppStore.ts`:
  ```typescript
  interface AppState {
    currentSection: number;
    isLoading: boolean;
    isTransitioning: boolean;
    audioEnabled: boolean;
    // actions: navigate, setLoading, toggleAudio, etc.
  }
  ```
- **Test**: Unit tests for store actions

### Phase 3: Core UI Components (with TDD)

#### Step 3.1: Background Component
- **Goal**: Render animated background grid and gradients
- **Method**: Create `/src/components/Background/Background.tsx`
  - Animated grid using CSS animations
  - Radial gradient overlays
- **Test**: 
  - Render test: Component renders without errors
  - Animation test: Grid moves after mount
  - Responsive test: Background covers viewport on all sizes

#### Step 3.2: LoadingScreen Component
- **Goal**: Animated intro sequence
- **Method**: Create `/src/components/LoadingScreen/LoadingScreen.tsx`
  - Character-by-character text animation
  - Monogram block transformation
  - Loading ring animation
  - Skip button functionality
- **Test**:
  - Unit test: Loading screen renders initial state
  - Interaction test: Skip button triggers onClick
  - Animation test: Text merges after delay (mocked timers)
  - E2E test: Full loading sequence completes

#### Step 3.3: PageTransitionOverlay Component
- **Goal**: Golden curtain/slice transition between sections
- **Method**: Create `/src/components/PageTransition/PageTransition.tsx`
  - 5 slice divs with staggered animation
  - GSAP timeline for enter/exit
- **Test**:
  - Unit test: Renders 5 slices
  - Animation test: Slices animate on trigger
  - Integration test: Works with navigation state

#### Step 3.4: CircularNavigation Component
- **Goal**: Orbit-based navigation with profile image
- **Method**: Create `/src/components/CircularNav/CircularNavigation.tsx`
  - Calculate positions using trigonometry
  - Rotation animation on section change
  - Active state styling
- **Test**:
  - Unit test: Renders correct number of nav items
  - Position test: Items positioned in circle
  - Interaction test: Click triggers navigation
  - Responsive test: Mobile fallback (bottom tabs)

#### Step 3.5: HeroSection Component
- **Goal**: Main hero content with badge, title, CTAs
- **Method**: Create `/src/components/sections/HeroSection.tsx`
  - Badge with pulsing dot
  - Highlighted title text
  - Primary and secondary buttons
- **Test**:
  - Render test: All text elements present
  - Style test: Gradient text applied correctly
  - Responsive test: Text sizes scale on mobile

#### Step 3.6: AboutSection Component
- **Goal**: About content with stats card
- **Method**: Create `/src/components/sections/AboutSection.tsx`
  - Text paragraphs
  - Stats grid with animated numbers
- **Test**:
  - Render test: Content renders
  - Stats test: Numbers display correctly
  - Animation test: Stats animate on view

#### Step 3.7: ProjectsSection Component
- **Goal**: Featured works display
- **Method**: Create `/src/components/sections/ProjectsSection.tsx`
  - Project cards with hover effects
  - Image placeholders with gradient backgrounds
- **Test**:
  - Render test: Project cards render
  - Hover test: Card transforms on hover
  - Link test: Project links are clickable

#### Step 3.8: SkillsSection Component
- **Goal**: Categorized skills display
- **Method**: Create `/src/components/sections/SkillsSection.tsx`
  - Skill categories with tags
  - Hover animations on tags
- **Test**:
  - Render test: All categories and tags render
  - Count test: Correct number of tags per category

#### Step 3.9: ContactSection Component
- **Goal**: Contact form with validation
- **Method**: Create `/src/components/sections/ContactSection.tsx`
  - Form inputs with focus states
  - Form submission handler
  - Validation logic
- **Test**:
  - Render test: Form inputs present
  - Validation test: Required fields enforced
  - Submit test: Form data captured on submit
  - E2E test: Form submits successfully

### Phase 4: Audio System (TDD)

#### Step 4.1: AudioEngine Hook
- **Goal**: Web Audio API sound effects
- **Method**: Create `/src/hooks/useAudioEngine.ts`
  - `playHover()`, `playClick()`, `playActive()` methods
  - Toggle enable/disable
- **Test**:
  - Unit test: AudioContext initializes
  - Toggle test: Enable/disable works
  - Method test: Each play method callable

#### Step 4.2: Audio Context Provider
- **Goal**: Global audio state
- **Method**: Create `/src/context/AudioContext.tsx`
- **Test**: Context provides audio methods to children

### Phase 5: Responsive Implementation

#### Step 5.1: Mobile Layout Refactor
- **Goal**: Full responsive support for all screen sizes
- **Method**: 
  - Add Tailwind responsive prefixes to all components
  - Create mobile-specific components (e.g., `MobileNav`)
  - Implement CSS Grid/Flexbox reflows
- **Reference**: Breakpoints in Tailwind config
- **Test**: Playwright E2E tests for each breakpoint

#### Step 5.2: CircularNav Mobile Fallback
- **Goal**: Usable navigation on mobile
- **Method**: Transform circular nav to horizontal bottom tab bar on `< lg`
- **Test**: Navigation works on mobile viewport

#### Step 5.3: Content Reflow
- **Goal**: Sections adapt to screen size
- **Method**: 
  - Hero: Stack elements vertically on mobile
  - About: Single column on mobile
  - Projects: Vertical cards on mobile
  - Contact: Full-width inputs on mobile
- **Test**: Visual regression tests at each breakpoint

### Phase 6: Advanced Animations (TDD)

#### Step 6.1: GSAP Integration
- **Goal**: Smooth, performant animations
- **Method**: Create `/src/animations/useGSAP.ts` hook
  - Loading sequence timeline
  - Page transition orchestration
- **Test**: Animation completes within expected duration

#### Step 6.2: Framer Motion Integration
- **Goal**: Component-level animations
- **Method**: Add Framer Motion to:
  - Card hover effects
  - Section entrance animations
  - Button interactions
- **Test**: Motion variants work correctly

#### Step 6.3: Three.js Background (Optional Enhancement)
- **Goal**: 3D animated background
- **Method**: Create `/src/components/Background/ThreeBackground.tsx`
  - Particle system or geometric shapes
  - Responds to mouse movement
- **Test**: Canvas renders without WebGL errors

### Phase 7: Integration & Polish

#### Step 7.1: Main App Assembly
- **Goal**: Compose all components into App
- **Method**: 
  - Create `/src/App.tsx` with section switching
  - Integrate all context providers
  - Wire up navigation state
- **Test**: Full app renders without errors

#### Step 7.2: Keyboard & Wheel Navigation
- **Goal**: Keyboard shortcuts and scroll wheel
- **Method**: Add event listeners in custom hook
- **Test**: Arrow keys and scroll wheel navigate sections

#### Step 7.3: Performance Optimization
- **Goal**: Fast load and smooth animations
- **Method**: 
  - Lazy load sections
  - Optimize Three.js render loop
  - Use React.memo for static components
- **Test**: Lighthouse score > 90

#### Step 7.4: Accessibility Audit
- **Goal**: WCAG 2.1 AA compliance
- **Method**: 
  - Add ARIA labels
  - Keyboard navigation support
  - Focus management
- **Test**: Axe-core accessibility tests pass

## 5. TESTING AND VALIDATION

### Test Categories & Coverage

| Category | Tool | Coverage Target | Files |
|----------|------|-----------------|-------|
| Unit Tests | Vitest | 90%+ | Components, hooks, utils |
| Component Tests | RTL | 85%+ | All interactive components |
| Integration Tests | Vitest + RTL | 80%+ | Navigation, transitions |
| E2E Tests | Playwright | Critical paths | Full user flows |

### Test Files Structure
```
/landing-page-react/
├── src/
│   ├── __tests__/
│   │   ├── components/
│   │   │   ├── Background.test.tsx
│   │   │   ├── LoadingScreen.test.tsx
│   │   │   ├── CircularNavigation.test.tsx
│   │   │   ├── HeroSection.test.tsx
│   │   │   ├── AboutSection.test.tsx
│   │   │   ├── ProjectsSection.test.tsx
│   │   │   ├── SkillsSection.test.tsx
│   │   │   ├── ContactSection.test.tsx
│   │   │   └── PageTransition.test.tsx
│   │   ├── hooks/
│   │   │   ├── useAudioEngine.test.ts
│   │   │   └── useNavigation.test.ts
│   │   ├── store/
│   │   │   └── useAppStore.test.ts
│   │   └── e2e/
│   │       ├── loading.spec.ts
│   │       ├── navigation.spec.ts
│   │       ├── contact-form.spec.ts
│   │       └── responsive.spec.ts
│   └── ...
```

### Validation Checklist
- [ ] All unit tests pass
- [ ] All component tests pass
- [ ] Playwright E2E tests pass on CI
- [ ] Visual regression tests pass (if using Playwright + screenshot)
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices)
- [ ] Responsive test on BrowserStack or Playwright (5 viewports)
- [ ] Audio toggle works correctly
- [ ] Page transitions are smooth (60fps)
- [ ] Keyboard navigation functional
- [ ] Mobile navigation works

### Success Criteria
1. **Visual fidelity**: Landing page looks identical to original
2. **Responsive**: Works on 320px to 2560px viewports
3. **Performant**: 60fps animations, < 3s load time
4. **Tested**: 90%+ code coverage, all tests passing
5. **Accessible**: WCAG 2.1 AA compliant
6. **Maintainable**: Clean component architecture, TypeScript types
