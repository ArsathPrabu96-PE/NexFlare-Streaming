# MongoDB Connection Troubleshooting for Render

## ⚠️ CRITICAL: Environment Variable Format in Render

**RENDER DASHBOARD SETUP:**

When setting environment variables in Render dashboard:

1. **Key**: `MONGODB_URI` (just the variable name)
2. **Value**: `mongodb+srv://nexflare:Arshath2005@nexflare-cluster.kzqzl.mongodb.net/nexflare` (just the URI, NO key=value format)

### ❌ WRONG (Don't do this):
```
MONGODB_URI=mongodb+srv://nexflare:Arshath2005@nexflare-cluster.kzqzl.mongodb.net/nexflare
```

### ✅ CORRECT (Do this):
**Key**: `MONGODB_URI`  
**Value**: `mongodb+srv://nexflare:Arshath2005@nexflare-cluster.kzqzl.mongodb.net/nexflare`

## Required Environment Variables in Render Dashboard:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | `mongodb+srv://nexflare:Arshath2005@nexflare-cluster.kzqzl.mongodb.net/nexflare` |
| `JWT_SECRET` | `nexflare-super-secure-jwt-secret-key-production-render-2024-streaming-platform-auth-token` |
| `CORS_ORIGIN` | `https://nexflare-frontend.onrender.com,https://nexflare-admin.onrender.com` |

### IMPORTANT NOTES:

1. **Copy the MONGODB_URI exactly as shown above** - no extra spaces or characters
2. **Do NOT include quotes** around the environment variable values in Render dashboard
3. **Double-check for hidden characters** when copying from this file

### Alternative MongoDB URI (if main one fails):
```bash
MONGODB_URI=mongodb+srv://nexflare:Arshath2005@nexflare-cluster.kzqzl.mongodb.net/?retryWrites=true&w=majority
```

### Debugging Steps:
1. Check Render logs for "URI starts with" message
2. Verify URI length matches expected length
3. Ensure no trailing spaces or newlines in Render environment variables
4. Try the alternative URI format above

### MongoDB Atlas Network Access:
- Ensure "0.0.0.0/0" is added to IP whitelist for Render's dynamic IPs
- Or add Render's IP ranges if available

### Build Commands for Render:
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Health Check Path: `/api/health`