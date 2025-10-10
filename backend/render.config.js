// Environment configuration override for Render deployment
module.exports = {
  NODE_ENV: 'production',
  PORT: process.env.PORT || 10000,
  MONGODB_URI: 'mongodb+srv://arsathprabu996_db_user:Prabu1996@cluster0.4twhzfv.mongodb.net/nexflare',
  JWT_SECRET: 'nexflare-super-secure-jwt-secret-key-production-render-2024-streaming-platform-auth-token',
  CORS_ORIGIN: 'https://nexflare-frontend.onrender.com,https://nexflare-admin.onrender.com'
};