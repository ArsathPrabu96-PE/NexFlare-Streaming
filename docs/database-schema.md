# Database Schema

## User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  avatar: String (URL),
  subscription: {
    plan: String, // 'free', 'basic', 'premium'
    status: String, // 'active', 'cancelled', 'expired'
    expiresAt: Date,
    stripeCustomerId: String
  },
  preferences: {
    language: String,
    quality: String, // 'auto', 'hd', '4k'
    autoplay: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Video Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  thumbnail: String (URL),
  videoUrl: String (URL),
  hlsUrl: String (URL), // For adaptive streaming
  duration: Number, // in seconds
  category: String,
  tags: [String],
  rating: String, // 'G', 'PG', 'PG-13', 'R'
  releaseYear: Number,
  views: Number,
  likes: Number,
  isPremium: Boolean,
  status: String, // 'processing', 'ready', 'failed'
  uploadedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Category Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  description: String,
  image: String (URL),
  isActive: Boolean,
  createdAt: Date
}
```

## WatchHistory Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  videoId: ObjectId (ref: Video),
  progress: Number, // seconds watched
  completed: Boolean,
  lastWatchedAt: Date,
  createdAt: Date
}
```

## Watchlist Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  videoId: ObjectId (ref: Video),
  addedAt: Date
}
```

## Comment Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  videoId: ObjectId (ref: Video),
  content: String,
  likes: Number,
  parentId: ObjectId (ref: Comment), // for replies
  isDeleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Subscription Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  plan: String, // 'basic', 'premium'
  status: String, // 'active', 'cancelled', 'past_due'
  stripeSubscriptionId: String,
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
  cancelAtPeriodEnd: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```