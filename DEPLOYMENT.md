# 🚀 NexFlare Deployment Guide

## Live Demo
- **Frontend (GitHub Pages):** https://arsathprabu96-pe.github.io/NexFlare-Streaming
- **Backend:** Deploy to Heroku, Railway, or Vercel

## 📋 Deployment Options

### Option 1: GitHub Pages + Heroku (Recommended)
```bash
# Frontend: Automatically deploys via GitHub Actions
# Backend: Deploy to Heroku
```

### Option 2: Vercel (Full-Stack)
```bash
# Deploy entire project to Vercel
npm install -g vercel
vercel --prod
```

### Option 3: Railway (Backend)
```bash
# Deploy backend to Railway
npm install -g @railway/cli
railway login
railway deploy
```

## 🛠️ Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Source: Deploy from a branch
4. Branch: `gh-pages`
5. Folder: `/ (root)`

### 2. Backend Deployment (Heroku)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create nexflare-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git subtree push --prefix backend heroku main
```

### 3. Environment Variables Needed

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.herokuapp.com/api
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🎯 Deployment Checklist

- [ ] Frontend builds successfully
- [ ] Backend environment variables set
- [ ] MongoDB Atlas connection configured
- [ ] GitHub Actions enabled
- [ ] Domain configured (optional)
- [ ] SSL certificate enabled
- [ ] API endpoints tested

## 🌐 Custom Domain (Optional)

1. Create `CNAME` file in frontend/public:
   ```
   nexflare.yourdomain.com
   ```

2. Configure DNS:
   ```
   CNAME nexflare arsathprabu96-pe.github.io
   ```

## 📊 Monitoring & Analytics

- GitHub Actions for deployment status
- Vercel Analytics (if using Vercel)
- MongoDB Atlas monitoring
- Error tracking with Sentry

## 🚨 Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version compatibility
2. **Assets not loading**: Verify assetPrefix in next.config.js
3. **API not connecting**: Check CORS settings in backend
4. **Environment variables**: Ensure all required vars are set

## 🔄 Continuous Deployment

Every push to `main` branch automatically:
1. Builds the frontend
2. Runs tests
3. Deploys to GitHub Pages
4. Updates live site

## 📱 Mobile Optimization

The deployment includes:
- Responsive design
- Progressive Web App features
- Optimized images
- Fast loading times

---

Built with ❤️ for the ultimate streaming experience 🎬