# 🚄 Railway Backend Deployment Guide for NexFlare

## 🎯 Quick Overview
Railway offers $5 free credits monthly (enough for small apps) with no sleep mode and excellent GitHub integration.

---

## 📋 Prerequisites
- ✅ GitHub repository (you already have this!)
- ✅ MongoDB Atlas account (for database)
- 🆕 Railway account (free signup)

---

## 🚀 Step-by-Step Railway Deployment

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Sign up with GitHub (recommended)
4. Verify your account

### Step 2: Deploy from GitHub
1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `NexFlare-Streaming`
4. Select the **backend** folder (important!)
5. Click **"Deploy Now"**

### Step 3: Configure Environment Variables
In Railway dashboard → Settings → Environment:

```bash
# Required Variables
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/nexflare
JWT_SECRET=your-super-secure-secret-key-at-least-32-chars
CORS_ORIGIN=https://arsathprabu96-pe.github.io
```

### Step 4: Get Your MongoDB URI
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `nexflare`

### Step 5: Generate JWT Secret
```bash
# Run this in any terminal to generate a secure secret:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 6: Configure Domain & HTTPS
1. In Railway dashboard → Settings → Networking
2. Click **"Generate Domain"** 
3. You'll get a URL like: `your-app-name.railway.app`
4. Copy this URL for frontend configuration

### Step 7: Monitor Deployment
1. Go to **Deployments** tab
2. Watch the build logs
3. Look for ✅ "Build successful"
4. Check if service is **"Active"**

---

## 🔧 Configuration Files Created

### `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Updated `package.json` scripts
```json
{
  "scripts": {
    "start:railway": "npm run build && npm start"
  }
}
```

---

## 🌐 Frontend Configuration Update

After Railway deployment, update your frontend to use the new API URL:

### Update `frontend/next.config.js`
```javascript
env: {
  NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-app-name.railway.app/api'
    : 'http://localhost:5000/api',
}
```

---

## ✅ Testing Your Deployment

### 1. Test API Endpoints
```bash
# Health check
curl https://your-app-name.railway.app/api/health

# Test auth endpoint
curl https://your-app-name.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'
```

### 2. Check Frontend Connection
1. Open your GitHub Pages site
2. Try to register/login
3. Check browser DevTools → Network tab
4. Verify API calls go to Railway URL

---

## 💰 Railway Free Tier Details

### What's Included FREE:
- ✅ $5 credits monthly (renews each month)
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Auto-scaling
- ✅ No sleep mode
- ✅ GitHub integration

### Typical Usage:
- **Small API:** ~$1-2/month
- **Medium API:** ~$3-4/month  
- **Your NexFlare backend:** Should fit in $5/month easily

---

## 🐛 Common Issues & Solutions

### Issue 1: Build Fails
**Solution:** Make sure you selected the `backend` folder during setup

### Issue 2: Port Already in Use
**Solution:** Railway handles ports automatically, use `process.env.PORT`

### Issue 3: Database Connection Failed
**Solution:** 
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify MONGODB_URI is correct
- Check username/password in connection string

### Issue 4: CORS Errors
**Solution:** Add your GitHub Pages URL to CORS_ORIGIN environment variable

---

## 🚀 Post-Deployment Steps

1. **Update Frontend**: Change API URLs to Railway
2. **Test All Features**: Registration, login, video upload
3. **Monitor Usage**: Check Railway dashboard for usage
4. **Set Up Monitoring**: Optional - add health checks

---

## 🎯 Expected Results

After successful deployment:
- ✅ Backend API running on Railway
- ✅ Database connected to MongoDB Atlas  
- ✅ Frontend (GitHub Pages) → Backend (Railway) communication
- ✅ Full NexFlare streaming platform functional

**Your live API will be available at:**
`https://your-app-name.railway.app/api`

---

## 🔗 Useful Links

- [Railway Dashboard](https://railway.app/dashboard)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas](https://cloud.mongodb.com)
- [Your GitHub Pages Site](https://arsathprabu96-pe.github.io/NexFlare-Streaming/)

---

## 🆘 Need Help?

If you encounter issues:
1. Check Railway deployment logs
2. Verify environment variables
3. Test MongoDB connection
4. Check this guide again
5. Ask for help! 

Ready to deploy? Let's go! 🚀