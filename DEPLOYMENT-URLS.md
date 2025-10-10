# NexFlare Deployment URLs

## Production URLs

### Backend API
- **URL**: https://nexflare-backend.onrender.com
- **Health Check**: https://nexflare-backend.onrender.com/api/health
- **Status**: ✅ Deployed

### Frontend Application (Main Platform)
- **URL**: https://nexflare-frontend.onrender.com
- **Status**: 🔄 Pending Deployment

### Admin Dashboard
- **URL**: https://nexflare-admin.onrender.com
- **Status**: 🔄 Pending Deployment

## How to Access After Deployment

1. **Main Platform**: Open `https://nexflare-frontend.onrender.com` in any browser
2. **Admin Panel**: Open `https://nexflare-admin.onrender.com` (for admin users)
3. **API Testing**: Use `https://nexflare-backend.onrender.com/api/health` to verify backend

## Mobile Access
- All URLs are mobile-optimized
- Works on iOS Safari, Android Chrome, and all modern browsers
- Responsive design adapts to screen size

## Deployment Notes
- First access may take 30-60 seconds (cold start)
- Mobile performance optimizations are active
- MongoDB Atlas database is connected

## Support
If any URL doesn't load:
1. Wait 30-60 seconds for cold start
2. Check Render dashboard for deployment status
3. Verify environment variables are properly set