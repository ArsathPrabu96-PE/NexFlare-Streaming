# Mobile-First Design System

## 📱 Mobile Navigation Patterns

### Bottom Tab Navigation
```
┌─────────────────────────────────────────┐
│                Content                  │
│                                         │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│ [🏠] [🔍] [📱] [❤️] [👤]               │
│ Home Search Downloads List Profile      │
└─────────────────────────────────────────┘
```

### Swipe Gestures
```
Mobile Interactions:
├─ Swipe Right: Go back / Previous episode
├─ Swipe Left: Next episode / Forward
├─ Swipe Up: Show details / More info
├─ Swipe Down: Minimize player / Close
├─ Pull to Refresh: Update content
└─ Long Press: Context menu / Quick actions
```

### Thumb-Friendly Design
```
┌─────────────────────────────────────────┐
│ ✅ Easy reach zone (thumb area)          │
│ ┌─────────────────────────────────────┐ │
│ │ Primary actions here                │ │
│ │ [Play] [Add] [Share]                │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ⚠️ Harder to reach                      │
│ [Secondary actions]                     │
└─────────────────────────────────────────┘
```

## 🎬 Mobile Video Experience

### Portrait Video Player
```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │         Video Player                │ │
│ │                                     │ │
│ │ [⏸️] ──●────────── [🔊] [⚙️] [⛶]    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Movie Title                             │
│ ⭐⭐⭐⭐⭐ 4.8 • 2023 • 2h 15m           │
│                                         │
│ [▶️ Play] [➕ My List] [👍] [👎]         │
│                                         │
│ Description...                          │
│                                         │
│ More Like This ──────────────────────── │
│ [🎬][🎬][🎬][🎬]                       │
└─────────────────────────────────────────┘
```

### Landscape Immersive Mode
```
┌─────────────────────────────────────────┐
│                                         │
│              Full Video                 │
│                                         │
│     [⏸️] ──●────── [🔊] [⚙️] [⛶]        │
└─────────────────────────────────────────┘
```

## 🎯 Touch Interactions

### Card Interactions
```
Mobile Card States:
├─ Default: Clean, minimal info
├─ Tap: Quick preview + actions
├─ Long Press: Context menu
├─ Swipe Left: Quick actions (Add, Share)
├─ Swipe Right: Mark as watched
└─ Double Tap: Add to favorites
```

### Progressive Enhancement
```
Mobile Features:
├─ Offline Downloads
├─ Background Play
├─ Picture-in-Picture
├─ Chromecast Support
├─ AirPlay Integration
├─ Haptic Feedback
├─ Voice Search
└─ Camera Search (Visual)
```

## 🎨 Responsive Components

### Adaptive Grid
```css
.video-grid {
  display: grid;
  grid-template-columns: 
    repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .video-grid {
    grid-template-columns: 
      repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .video-grid {
    grid-template-columns: 
      repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
```

### Mobile-First Typography
```css
/* Mobile base */
.title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.2;
}

.description {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  line-height: 1.5;
}

/* Tablet and up */
@media (min-width: 768px) {
  .title {
    font-size: clamp(2rem, 3vw, 2.5rem);
  }
}
```

## 🎪 Mobile Performance

### Lazy Loading Strategy
```jsx
<IntersectionObserver
  threshold={0.1}
  rootMargin="50px"
>
  <VideoCard
    loading="lazy"
    placeholder="blur"
    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  />
</IntersectionObserver>
```

### Image Optimization
```jsx
<Image
  src={video.thumbnail}
  alt={video.title}
  width={300}
  height={169}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority={index < 6} // Above fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 🎭 Accessibility on Mobile

### Touch Targets
```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
  margin: 4px;
}

.button {
  padding: 16px 24px;
  font-size: 16px; /* Prevents zoom on iOS */
}
```

### Screen Reader Navigation
```jsx
<nav aria-label="Main navigation">
  <ul role="tablist">
    <li role="tab" aria-selected="true">
      <a href="/home" aria-label="Home, currently selected">
        <HomeIcon />
        <span className="sr-only">Home</span>
      </a>
    </li>
  </ul>
</nav>
```

## 🌟 Progressive Web App Features

### App-like Experience
```json
{
  "name": "Nexflare",
  "short_name": "Nexflare",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#E50914",
  "background_color": "#141414",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Offline Support
```jsx
<ServiceWorker
  strategies={{
    pages: 'NetworkFirst',
    images: 'CacheFirst',
    videos: 'NetworkOnly',
    api: 'StaleWhileRevalidate'
  }}
  precache={[
    '/offline.html',
    '/icons/',
    '/critical.css'
  ]}
/>
```

## 🎯 Mobile-Specific Features

### Download Management
```
┌─────────────────────────────────────────┐
│ 📱 Downloads                            │
├─────────────────────────────────────────┤
│ ✅ The Batman (4.2 GB)                  │
│ ⏳ Inception (downloading... 60%)        │
│ ⏸️ Dune (paused)                        │
│ ❌ Interstellar (failed - retry?)       │
├─────────────────────────────────────────┤
│ Storage: 12.8 GB used of 64 GB          │
│ [Manage Storage] [Download Settings]    │
└─────────────────────────────────────────┘
```

### Smart Notifications
```jsx
<PushNotification
  title="New episode available!"
  body="Stranger Things S4E9 is ready to watch"
  icon="/notification-icon.png"
  badge="/badge-icon.png"
  actions={[
    { action: 'watch', title: 'Watch Now' },
    { action: 'later', title: 'Watch Later' }
  ]}
  vibrate={[200, 100, 200]}
/>
```