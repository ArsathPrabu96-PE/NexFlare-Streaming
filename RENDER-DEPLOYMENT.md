# 🚀 Complete Render Deployment Guide for NexFlare

## 🎯 Overview
Deploy your full NexFlare streaming platform on Render with both frontend and backend services.

**Render URLs after deployment:**
- **Frontend**: `https://nexflare-frontend.onrender.com`
- **Backend**: `https://nexflare-backend.onrender.com`
- **API**: `https://nexflare-backend.onrender.com/api`

---

## 📋 Prerequisites
- ✅ GitHub repository (you have this!)
- ✅ MongoDB Atlas database (you have this!)
- 🆕 Render account (free signup at render.com)

---

## 🚀 Step-by-Step Deployment

### STEP 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Connect your GitHub account
4. Verify your email

### STEP 2: Deploy Backend (API Server)

#### 2.1 Create Web Service
1. In Render dashboard: **"New"** → **"Web Service"**
2. **Connect Repository**: Select `NexFlare-Streaming`
3. **Service Name**: `nexflare-backend`
4. **Root Directory**: `backend`
5. **Environment**: `Node`
6. **Region**: `Oregon (US West)` or closest to you

#### 2.2 Configure Build Settings
```bash
Build Command: npm install && npm run build
Start Command: npm start
```

#### 2.3 Set Environment Variables
In **Environment** tab, add these variables:
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://arsathprabu996_db_user:Prabu1996@cluster0.4twhzfv.mongodb.net/nexflare?retryWrites=true&w=majority
JWT_SECRET=nexflare_production_jwt_secret_key_super_secure_2025
CORS_ORIGIN=https://nexflare-frontend.onrender.com
MAX_FILE_SIZE=10485760
UPLOAD_PATH=/tmp/uploads
```

#### 2.4 Advanced Settings
- **Health Check Path**: `/api/health`
- **Auto-Deploy**: ✅ Yes
- **Branch**: `main`

#### 2.5 Deploy Backend
1. Click **"Create Web Service"**
2. Wait for build to complete (3-5 minutes)
3. Test: `https://nexflare-backend.onrender.com/api/health`

### STEP 3: Deploy Frontend (Static Site)

#### 3.1 Create Static Site
1. **"New"** → **"Static Site"**
2. **Connect Repository**: Select `NexFlare-Streaming`
3. **Site Name**: `nexflare-frontend`
4. **Root Directory**: `frontend`
5. **Branch**: `main`

#### 3.2 Configure Build Settings
```bash
Build Command: npm install && npm run build
Publish Directory: out
```

#### 3.3 Set Environment Variables
```bash
NEXT_PUBLIC_API_URL=https://nexflare-backend.onrender.com/api
NODE_ENV=production
```

#### 3.4 Deploy Frontend
1. Click **"Create Static Site"**
2. Wait for build (2-3 minutes)
3. Test: `https://nexflare-frontend.onrender.com`

### STEP 4: Update Backend CORS
1. Go to backend service in Render
2. Update **CORS_ORIGIN** environment variable to your actual frontend URL
3. Example: `https://nexflare-frontend-abc123.onrender.com`

---

## 🔧 Configuration Files Created

### Backend Configuration (`backend/render.yaml`)
```yaml
# Build Command: npm install && npm run build
# Start Command: npm start
# Health Check: /api/health
```

### Frontend Configuration (`frontend/next.config.js`)
```javascript
// Updated to use Render backend URL
NEXT_PUBLIC_API_URL: 'https://nexflare-backend.onrender.com/api'
```

---

## 🧪 Testing Your Deployment

### Test Backend API
```bash
# Health check
curl https://nexflare-backend.onrender.com/api/health

# Should return: {"status":"ok","timestamp":"..."}

# Test registration
curl -X POST https://nexflare-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'
```

### Test Frontend
1. Open: `https://nexflare-frontend.onrender.com`
2. Try to register/login
3. Check browser Network tab for API calls
4. Verify API calls go to Render backend

---

## 🎯 Expected Results

### After Successful Deployment:
- ✅ **Frontend**: Live streaming platform UI
- ✅ **Backend**: API responding to requests
- ✅ **Database**: Connected to MongoDB Atlas
- ✅ **Authentication**: Registration/login working
- ✅ **File Upload**: Video upload functionality
- ✅ **Admin Panel**: Management interface

### Performance Expectations:
- **Cold Start**: 15-30 seconds (free tier)
- **Response Time**: 200-500ms after warm-up
- **Uptime**: 99% (Render free tier)
- **Sleep**: After 15 minutes of inactivity

---

## 🔄 Auto-Deployment

### Automatic Updates:
1. **Push to GitHub** → **Auto-deploys to Render**
2. **Build logs** available in Render dashboard
3. **Environment variables** persist across deployments
4. **Custom domains** can be added later

---

## 🐛 Troubleshooting

### Common Issues:

#### Backend not starting?
- Check **Logs** tab in Render dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

#### Frontend not connecting to backend?
- Check **CORS_ORIGIN** matches frontend URL exactly
- Verify **NEXT_PUBLIC_API_URL** points to backend
- Check browser console for CORS errors

#### Database connection failed?
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check username/password in connection string
- Ensure database name is `nexflare`

#### 502 Bad Gateway?
- Backend is likely sleeping or crashed
- Check backend logs
- Visit backend URL to wake it up

---

## 💰 Render Free Tier Limits

### What's Included FREE:
- ✅ 750 hours/month for web services
- ✅ 100GB bandwidth/month for static sites
- ✅ SSL certificates
- ✅ Custom domains
- ✅ GitHub integration
- ✅ Automatic deployments

### Important Notes:
- **Sleep Mode**: Services sleep after 15 minutes of inactivity
- **Wake Time**: 30-60 seconds to wake up
- **Build Time**: 15 minutes per month for web services

---

## 🎉 Final Steps

### 1. Custom Domain (Optional)
- Add your domain in Render dashboard
- Update DNS records
- SSL certificate auto-generated

### 2. Monitor Usage
- Check **Metrics** tab for usage
- Monitor **Logs** for errors
- Set up **Notifications** for issues

### 3. Scaling (When Ready)
- **Starter Plan**: $7/month (no sleep mode)
- **Standard Plan**: $25/month (auto-scaling)

---

## 🌐 Your Live URLs

After deployment, your NexFlare platform will be live at:
- **Main App**: `https://nexflare-frontend.onrender.com`
- **API**: `https://nexflare-backend.onrender.com/api`
- **Admin Panel**: Deploy separately or use subdomain

---

## 🚀 Deployment Commands Summary

```bash
# Deploy Backend
1. Render Dashboard → New Web Service
2. Repository: NexFlare-Streaming, Directory: backend
3. Build: npm install && npm run build
4. Start: npm start
5. Add environment variables from .env.render

# Deploy Frontend  
1. Render Dashboard → New Static Site
2. Repository: NexFlare-Streaming, Directory: frontend
3. Build: npm install && npm run build
4. Publish: out
5. Add NEXT_PUBLIC_API_URL environment variable
```

Your NexFlare streaming platform will be fully deployed and live in 10-15 minutes! 🎬✨