# NexFlare Render Deployment - Quick Start Guide

## 🚀 Quick Deployment Steps

### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub account
- Connect your GitHub repository

### 2. Deploy Backend API
```bash
# Service Name: nexflare-backend
# Type: Web Service
# Build Command: npm install && npm run build
# Start Command: npm start
# Environment Variables:
MONGODB_URI=mongodb+srv://nexflare:Arshath2005@nexflare-cluster.kzqzl.mongodb.net/nexflare?retryWrites=true&w=majority&appName=nexflare-cluster
NODE_ENV=production
PORT=10000
JWT_SECRET=your-jwt-secret-here
CORS_ORIGIN=https://nexflare-frontend.onrender.com,https://nexflare-admin.onrender.com
```

### 3. Deploy Frontend
```bash
# Service Name: nexflare-frontend
# Type: Static Site
# Build Command: npm install && npm run build
# Publish Directory: out
# Environment Variables:
NEXT_PUBLIC_API_URL=https://nexflare-backend.onrender.com/api
NODE_ENV=production
```

### 4. Deploy Admin Dashboard
```bash
# Service Name: nexflare-admin
# Type: Static Site
# Build Command: npm install && npm run build
# Publish Directory: out
# Environment Variables:
NEXT_PUBLIC_API_URL=https://nexflare-backend.onrender.com/api
NODE_ENV=production
```

## 📋 Environment Variables Summary

### Backend (.env.render)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://nexflare:Arshath2005@nexflare-cluster.kzqzl.mongodb.net/nexflare?retryWrites=true&w=majority&appName=nexflare-cluster
JWT_SECRET=your-jwt-secret-here
CORS_ORIGIN=https://nexflare-frontend.onrender.com,https://nexflare-admin.onrender.com
```

### Frontend (.env.render)
```
NEXT_PUBLIC_API_URL=https://nexflare-backend.onrender.com/api
NODE_ENV=production
```

### Admin (.env.render)
```
NEXT_PUBLIC_API_URL=https://nexflare-backend.onrender.com/api
NODE_ENV=production
```

## 🔗 Expected URLs
- **Backend API**: https://nexflare-backend.onrender.com
- **Frontend App**: https://nexflare-frontend.onrender.com
- **Admin Dashboard**: https://nexflare-admin.onrender.com

## ✅ Deployment Checklist
- [ ] Render account created and connected to GitHub
- [ ] Backend service deployed and running
- [ ] Frontend static site deployed
- [ ] Admin dashboard deployed
- [ ] Environment variables configured
- [ ] MongoDB Atlas connection working
- [ ] CORS configured for all domains
- [ ] All services communicating properly

## 🧪 Testing
1. Visit frontend URL and test basic functionality
2. Test user registration/login
3. Test video browsing
4. Access admin dashboard
5. Verify API endpoints responding

## 📞 Support
If you encounter issues:
1. Check Render service logs
2. Verify environment variables
3. Test MongoDB connection
4. Check CORS configuration
5. Review build logs for errors

Your NexFlare streaming platform is ready for production! 🎬✨