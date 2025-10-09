# Design System V2 - Advanced

## 🎨 Enhanced Color System

### Primary Palette
```css
--primary-50: #FEF2F2;
--primary-100: #FEE2E2;
--primary-200: #FECACA;
--primary-300: #FCA5A5;
--primary-400: #F87171;
--primary-500: #E50914;  /* Main brand */
--primary-600: #DC2626;
--primary-700: #B91C1C;
--primary-800: #991B1B;
--primary-900: #7F1D1D;
```

### Semantic Colors
```css
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;

--success-bg: rgba(16, 185, 129, 0.1);
--warning-bg: rgba(245, 158, 11, 0.1);
--error-bg: rgba(239, 68, 68, 0.1);
--info-bg: rgba(59, 130, 246, 0.1);
```

### Glass Morphism
```css
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-blur: blur(20px);
```

## 🌟 Advanced Typography

### Font Stack
```css
--font-primary: 'Inter Variable', 'Inter', system-ui, sans-serif;
--font-display: 'Poppins', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Typography Scale
```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
--text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);
```

## 🎭 Animation System

### Easing Functions
```css
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Micro-interactions
```css
--hover-scale: scale(1.02);
--hover-lift: translateY(-2px);
--press-scale: scale(0.98);
--bounce-in: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 🌈 Gradient System

### Brand Gradients
```css
--gradient-primary: linear-gradient(135deg, #E50914 0%, #B20710 100%);
--gradient-hero: linear-gradient(135deg, #000000 0%, #E50914 100%);
--gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
```

### Animated Gradients
```css
--gradient-animated: linear-gradient(-45deg, #E50914, #B20710, #FF1E2D, #E50914);
background-size: 400% 400%;
animation: gradientShift 15s ease infinite;
```

## 🎯 Component Variants

### Button System
- **Primary**: Solid background with hover effects
- **Secondary**: Outline with fill animation
- **Ghost**: Transparent with subtle hover
- **Gradient**: Animated gradient background
- **Glass**: Glass morphism effect
- **Floating**: Elevated with shadow

### Card Variants
- **Default**: Basic card with shadow
- **Glass**: Glass morphism effect
- **Elevated**: Multiple shadow layers
- **Outlined**: Border-only design
- **Gradient**: Gradient border/background
- **Interactive**: Hover animations

## 📱 Responsive Grid System

### Container Sizes
```css
--container-xs: 100%;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Grid System
```css
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.grid-masonry {
  columns: 3;
  column-gap: 1.5rem;
  break-inside: avoid;
}
```

## 🎪 Advanced Layouts

### Hero Patterns
- **Split Screen**: Content + Video
- **Fullscreen Video**: Background video with overlay
- **Carousel Hero**: Multiple featured content
- **Interactive**: Parallax scrolling effects

### Navigation Patterns
- **Sticky Header**: Transparent to solid on scroll
- **Mega Menu**: Multi-column dropdowns
- **Sidebar**: Collapsible navigation
- **Bottom Tab**: Mobile navigation
- **Breadcrumb**: Hierarchical navigation