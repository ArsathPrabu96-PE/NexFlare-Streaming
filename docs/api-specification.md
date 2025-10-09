# API Specification

## Authentication Endpoints

### POST /auth/register
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### POST /auth/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST /auth/refresh
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

## Video Endpoints

### GET /videos
Query params: `?category=action&limit=20&page=1`

### GET /videos/:id
Get single video details

### GET /videos/trending
Get trending videos

### GET /videos/search
Query params: `?q=search_term&limit=20`

### POST /videos/upload
Multipart form data with video file

## User Endpoints

### GET /user/profile
Get current user profile

### PUT /user/profile
Update user profile

### GET /user/watchlist
Get user's watchlist

### POST /user/watchlist/:videoId
Add video to watchlist

### DELETE /user/watchlist/:videoId
Remove from watchlist

### GET /user/history
Get watch history

### POST /user/history
Update watch progress

## Subscription Endpoints

### GET /subscriptions/plans
Get available subscription plans

### POST /subscriptions/subscribe
Create new subscription

### GET /subscriptions/status
Get current subscription status

### POST /subscriptions/cancel
Cancel subscription

## Admin Endpoints

### GET /admin/users
Get all users (paginated)

### GET /admin/videos
Get all videos for management

### POST /admin/videos
Upload new video

### PUT /admin/videos/:id
Update video details

### DELETE /admin/videos/:id
Delete video

### GET /admin/analytics
Get platform analytics