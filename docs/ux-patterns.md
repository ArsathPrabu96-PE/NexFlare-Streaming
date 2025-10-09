# Advanced UX Patterns

## 🎬 Video Discovery Patterns

### Smart Recommendations
```
┌─────────────────────────────────────────┐
│ 🎯 Because you watched "Inception"      │
│ [🎬][🎬][🎬][🎬][🎬] → More            │
├─────────────────────────────────────────┤
│ 🔥 Trending in Sci-Fi                   │
│ [🎬][🎬][🎬][🎬][🎬] → More            │
├─────────────────────────────────────────┤
│ ⭐ Top Rated This Week                   │
│ [🎬][🎬][🎬][🎬][🎬] → More            │
└─────────────────────────────────────────┘
```

### Infinite Scroll with Categories
```
┌─────────────────────────────────────────┐
│ [Action] [Comedy] [Drama] [Sci-Fi]      │
├─────────────────────────────────────────┤
│ [🎬] [🎬] [🎬] [🎬] [🎬] [🎬]           │
│ [🎬] [🎬] [🎬] [🎬] [🎬] [🎬]           │
│ [🎬] [🎬] [🎬] [🎬] [🎬] [🎬]           │
│                                         │
│ ⟳ Loading more content...               │
└─────────────────────────────────────────┘
```

### Visual Search Interface
```
┌─────────────────────────────────────────┐
│ 🔍 [Search box] 📷 🎤 🔍              │
├─────────────────────────────────────────┤
│ Recent: "marvel" "comedy" "2023"        │
│ Trending: "netflix originals" "action"  │
├─────────────────────────────────────────┤
│ 🎭 Genres  👥 Actors  📅 Year          │
│ ⭐ Rating  🏆 Awards  🌍 Language       │
└─────────────────────────────────────────┘
```

## 🎮 Interactive Patterns

### Hover Preview System
```
┌─────────────────────────────────────────┐
│ [🎬 Thumbnail] ──hover──> [▶️ Preview]   │
│                                         │
│ ┌─────────────┐    ┌─────────────────┐  │
│ │   Movie     │    │ ▶️ Auto Preview │  │
│ │   Poster    │ -> │ 📊 Quick Stats  │  │
│ │             │    │ ➕ Add to List  │  │
│ └─────────────┘    │ ⭐ Rate & Save  │  │
│                    └─────────────────┘  │
└─────────────────────────────────────────┘
```

### Progressive Disclosure
```
┌─────────────────────────────────────────┐
│ Movie Title                    [▼ More] │
├─────────────────────────────────────────┤
│ ⭐⭐⭐⭐⭐ 4.8/5 • 2023 • 2h 15m        │
│                                         │
│ [▼ Show Description]                    │
│ ├─ Plot summary...                      │
│ ├─ [▼ Cast & Crew]                      │
│ ├─ [▼ Reviews]                          │
│ └─ [▼ Similar Movies]                   │
└─────────────────────────────────────────┘
```

## 🎯 Personalization Patterns

### Adaptive Interface
```
┌─────────────────────────────────────────┐
│ Good evening, John! 🌙                  │
│ Continue watching: "Breaking Bad" S3E5  │
├─────────────────────────────────────────┤
│ 🎯 Your Taste Profile                   │
│ ████████░░ Action (80%)                 │
│ ██████░░░░ Drama (60%)                  │
│ ████░░░░░░ Comedy (40%)                 │
├─────────────────────────────────────────┤
│ 🔥 Recommended for you                  │
│ [🎬][🎬][🎬][🎬][🎬]                   │
└─────────────────────────────────────────┘
```

### Smart Notifications
```
┌─────────────────────────────────────────┐
│ 🔔 Notifications (3)                    │
├─────────────────────────────────────────┤
│ 🆕 New episode of "Stranger Things"     │
│ ⏰ 2 hours ago                          │
├─────────────────────────────────────────┤
│ 🎬 "Dune 2" now available in 4K        │
│ ⏰ 1 day ago                            │
├─────────────────────────────────────────┤
│ 👥 3 friends watched "The Batman"       │
│ ⏰ 2 days ago                           │
└─────────────────────────────────────────┘
```

## 🎪 Advanced Interactions

### Gesture Controls
```
Mobile Gestures:
├─ Swipe Left/Right: Navigate episodes
├─ Swipe Up: Show details
├─ Swipe Down: Minimize player
├─ Pinch: Zoom video
├─ Double Tap: Like/Unlike
├─ Long Press: Context menu
└─ Shake: Shuffle recommendations
```

### Voice Commands
```
Voice Interface:
├─ "Play Inception"
├─ "Show me action movies"
├─ "Skip intro"
├─ "Turn on subtitles"
├─ "What did they say?"
├─ "Who is that actor?"
└─ "Recommend something funny"
```

### AI-Powered Features
```
┌─────────────────────────────────────────┐
│ 🤖 AI Assistant                         │
├─────────────────────────────────────────┤
│ "I want something like Inception but    │
│  not too confusing"                     │
│                                         │
│ 🎯 Here are 5 mind-bending movies      │
│    with clearer plots:                  │
│ [🎬 Shutter Island]                     │
│ [🎬 The Prestige]                       │
│ [🎬 Memento]                            │
└─────────────────────────────────────────┘
```

## 🎨 Visual Feedback Patterns

### Loading States
```
┌─────────────────────────────────────────┐
│ Content Loading:                        │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│    │
│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│    │
│ └─────────┘ └─────────┘ └─────────┘    │
│                                         │
│ Video Processing: ████████░░ 80%        │
│ Estimated time: 2 minutes remaining     │
└─────────────────────────────────────────┘
```

### Micro-animations
```
Interaction Feedback:
├─ Button Press: Scale down + ripple effect
├─ Card Hover: Lift + glow + preview
├─ Like Action: Heart burst animation
├─ Add to List: Checkmark with bounce
├─ Loading: Skeleton shimmer effect
├─ Success: Green checkmark slide-in
└─ Error: Red shake + error message
```

## 🎭 Accessibility Patterns

### Keyboard Navigation
```
Tab Order:
1. Skip to content link
2. Main navigation
3. Search bar
4. Content grid (arrow keys)
5. Video controls
6. Footer links

Shortcuts:
├─ Space: Play/Pause
├─ ←/→: Seek 10s
├─ ↑/↓: Volume
├─ F: Fullscreen
├─ M: Mute
└─ Esc: Exit fullscreen
```

### Screen Reader Support
```
ARIA Labels:
├─ "Play Inception, 2010 sci-fi thriller"
├─ "Add to watchlist, currently not in list"
├─ "Video progress: 45 minutes of 148 minutes"
├─ "Rating: 4.8 out of 5 stars, 2.1M reviews"
└─ "Similar movies carousel, 12 items"
```