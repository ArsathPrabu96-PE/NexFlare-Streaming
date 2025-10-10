# 📖 Manual Render Deployment - Step by Step Guide

## 🎯 Service 1: Backend API Deployment

### Step 1.1: Create Backend Service
1. Go to https://dashboard.render.com
2. Click **"New"** button (top right)
3. Select **"Web Service"**
4. Click **"Connect a repository"**
5. Find and select: `ArsathPrabu96-PE/NexFlare-Streaming`
6. Click **"Connect"**

### Step 1.2: Configure Backend Service
**Basic Settings:**
```
Name: nexflare-backend
Root Directory: backend
Environment: Node
Region: Oregon (US West)
Branch: main
```

**Build & Deploy:**
```
Build Command: npm install && npm run build
Start Command: npm start
```

**Instance Settings:**
```
Instance Type: Free
```

### Step 1.3: Environment Variables (Critical!)
Click **"Advanced"** and add these environment variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://arsathprabu996_db_user:Prabu1996@cluster0.4twhzfv.mongodb.net/nexflare
JWT_SECRET=nexflare-super-secure-jwt-secret-key-production-render-2024-streaming-platform-auth-token
CORS_ORIGIN=https://nexflare-frontend.onrender.com,https://nexflare-admin.onrender.com
MAX_FILE_SIZE=10485760
UPLOAD_PATH=/tmp/uploads
```

**Health Check:**
```
Health Check Path: /api/health
```

### Step 1.4: Deploy Backend
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your backend will be available at: `https://nexflare-backend.onrender.com`

---

## 🎯 Service 2: Frontend Deployment

### Step 2.1: Create Frontend Service
1. Click **"New"** → **"Static Site"**
2. Connect the same repository: `ArsathPrabu96-PE/NexFlare-Streaming`

### Step 2.2: Configure Frontend Service
**Basic Settings:**
```
Name: nexflare-frontend
Root Directory: frontend
Branch: main
```

**Build Settings:**
```
Build Command: npm install && npm run build
Publish Directory: out
```

### Step 2.3: Frontend Environment Variables
```
NEXT_PUBLIC_API_URL=https://nexflare-backend.onrender.com/api
NODE_ENV=production
```

### Step 2.4: Deploy Frontend
1. Click **"Create Static Site"**
2. Wait for deployment (3-5 minutes)
3. Your frontend will be available at: `https://nexflare-frontend.onrender.com`

---

## 🎯 Service 3: Admin Dashboard Deployment

### Step 3.1: Create Admin Service
1. Click **"New"** → **"Static Site"**
2. Connect the same repository: `ArsathPrabu96-PE/NexFlare-Streaming`

### Step 3.2: Configure Admin Service
**Basic Settings:**
```
Name: nexflare-admin
Root Directory: admin
Branch: main
```

**Build Settings:**
```
Build Command: npm install && npm run build
Publish Directory: out
```

### Step 3.3: Admin Environment Variables
```
NEXT_PUBLIC_API_URL=https://nexflare-backend.onrender.com/api
NODE_ENV=production
```

### Step 3.4: Deploy Admin
1. Click **"Create Static Site"**
2. Wait for deployment (3-5 minutes)
3. Your admin will be available at: `https://nexflare-admin.onrender.com`

---

## ✅ Verification Steps

### Test Backend API
1. Visit: `https://nexflare-backend.onrender.com/api/health`
2. Should return: `{"status": "ok", "message": "NexFlare API is running"}`

### Test Frontend
1. Visit: `https://nexflare-frontend.onrender.com`
2. Should load the NexFlare homepage with mobile optimizations

### Test Admin Dashboard
1. Visit: `https://nexflare-admin.onrender.com`
2. Should load the admin interface

### Test API Connection
1. Try registering a user on the frontend
2. Check if the frontend can communicate with the backend API

---

## 🚨 Troubleshooting

### If Backend Fails to Deploy:
- Check build logs for Node.js errors
- Verify MongoDB URI is correct
- Ensure all environment variables are set

### If Frontend/Admin Fails:
- Check if `out` directory is generated during build
- Verify environment variables are set correctly
- Check build logs for Next.js errors

### If API Connection Fails:
- Verify CORS settings in backend
- Check network tab in browser for API calls
- Ensure backend health check passes

---

## 📞 Support

If you encounter issues:
1. Check the "Logs" tab in Render dashboard
2. Verify all environment variables are correctly set
3. Test locally first: `npm run build` in each directory
4. Check MongoDB Atlas connection status

Your NexFlare application will be live at:
- **Frontend**: https://nexflare-frontend.onrender.com
- **Backend**: https://nexflare-backend.onrender.com
- **Admin**: https://nexflare-admin.onrender.com