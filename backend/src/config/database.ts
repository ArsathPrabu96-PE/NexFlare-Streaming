import mongoose from 'mongoose';

interface ConnectionOptions {
  maxRetries?: number;
  retryDelay?: number;
}

const connectDB = async (options: ConnectionOptions = {}): Promise<void> => {
  const { maxRetries = 5, retryDelay = 5000 } = options;
  
  // MongoDB connection options optimized for Render deployment
  const mongooseOptions = {
    serverSelectionTimeoutMS: 30000, // 30 seconds for cloud deployment
    socketTimeoutMS: 60000, // 60 seconds 
    connectTimeoutMS: 30000, // 30 seconds
    bufferCommands: false,
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 30000,
    retryWrites: true,
    ssl: true,
    authSource: 'admin'
  };

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexflare';
  
  // Validate and clean the MongoDB URI
  const cleanUri = mongoUri.trim().replace(/\s/g, '');
  
  console.log(`🔄 Attempting to connect to MongoDB...`);
  console.log(`📍 Raw URI length: ${mongoUri.length}`);
  console.log(`📍 Cleaned URI length: ${cleanUri.length}`);
  console.log(`📍 URI starts with: ${cleanUri.substring(0, 20)}...`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Validate URI format
  if (!cleanUri.startsWith('mongodb://') && !cleanUri.startsWith('mongodb+srv://')) {
    console.error(`❌ Invalid MongoDB URI format. URI: "${cleanUri}"`);
    console.error(`❌ Expected format: mongodb:// or mongodb+srv://`);
    throw new Error('Invalid MongoDB connection string format');
  }

  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const conn = await mongoose.connect(cleanUri, mongooseOptions);
      
      console.log(`✅ MongoDB Connected Successfully!`);
      console.log(`📦 Host: ${conn.connection.host}`);
      console.log(`🗄️  Database: ${conn.connection.name}`);
      console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
      
      // Connection event listeners
      mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️  MongoDB disconnected');
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected');
      });
      
      return;
      
    } catch (error) {
      retries++;
      console.error(`❌ Database connection failed (Attempt ${retries}/${maxRetries}):`, error);
      
      if (retries >= maxRetries) {
        console.error('💀 Maximum connection retries exceeded.');
        console.warn('⚠️  Server will continue running without database connection.');
        
        // Provide helpful error messages
        if (error instanceof Error) {
          if (error.message.includes('ECONNREFUSED')) {
            console.error('💡 Tip: Make sure MongoDB is running locally or check your connection string');
            console.error('   Local MongoDB: Install and start MongoDB service');
            console.error('   MongoDB Atlas: Verify your connection string and network access');
            console.error('   Docker: Run `docker run -d -p 27017:27017 --name mongodb mongo:latest`');
          }
          
          if (error.message.includes('authentication failed')) {
            console.error('💡 Tip: Check your MongoDB username and password');
          }
          
          if (error.message.includes('timeout')) {
            console.error('💡 Tip: Check your network connection and MongoDB server status');
          }
        }
        
        // Don't exit in development mode - allow server to run without database
        if (process.env.NODE_ENV !== 'production') {
          console.warn('🔧 Development mode: Server continuing without database');
          return;
        }
        
        process.exit(1);
      }
      
      console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during MongoDB disconnection:', error);
    process.exit(1);
  }
});

export default connectDB;