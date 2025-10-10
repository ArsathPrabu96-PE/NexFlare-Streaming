import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import videoRoutes from './routes/videos';
import userRoutes from './routes/users';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
let PORT = parseInt(process.env.PORT || '5002');

// Function to check if a port is available
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = require('net').createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on('error', () => resolve(false));
  });
};

// Function to find an available port
const findAvailablePort = async (startPort: number): Promise<number> => {
  let currentPort = startPort;
  while (currentPort < startPort + 10) { // Try up to 10 ports
    if (await isPortAvailable(currentPort)) {
      return currentPort;
    }
    currentPort++;
  }
  throw new Error(`No available port found in range ${startPort}-${startPort + 9}`);
};

// Connect to MongoDB with options from environment
const initializeDatabase = async () => {
  const dbOptions = {
    maxRetries: parseInt(process.env.DB_MAX_RETRIES || '5'),
    retryDelay: parseInt(process.env.DB_RETRY_DELAY || '5000'),
  };
  
  await connectDB(dbOptions);
};

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true,
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Nexflare Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStates: { [key: number]: string } = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  const health = {
    status: dbStatus === 1 ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    database: {
      status: dbStates[dbStatus] || 'unknown',
      connected: dbStatus === 1,
      host: mongoose.connection.host || 'unknown',
      name: mongoose.connection.name || 'unknown'
    },
    services: {
      api: 'operational',
      auth: 'operational',
      videos: 'operational',
      users: 'operational'
    }
  };
  
  // Return appropriate HTTP status
  const httpStatus = dbStatus === 1 ? 200 : 503;
  res.status(httpStatus).json(health);
});

// Legacy health check endpoint
app.get('/health', (req, res) => {
  res.redirect('/api/health');
});

// Database health check endpoint
app.get('/health/db', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  
  if (dbStatus === 1) {
    res.json({
      status: 'healthy',
      connected: true,
      host: mongoose.connection.host,
      database: mongoose.connection.name,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(503).json({
      status: 'unhealthy',
      connected: false,
      readyState: dbStatus,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Global error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error stack:', err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val: any) => val.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }
  
  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server with port conflict handling
const startServer = async () => {
  try {
    const availablePort = await findAvailablePort(PORT);
    PORT = availablePort;
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
      if (PORT !== parseInt(process.env.PORT || '5002')) {
        console.log(`⚠️  Note: Started on port ${PORT} instead of ${process.env.PORT || '5002'} (original port was in use)`);
      }
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        mongoose.connection.close().then(() => {
          console.log('✅ MongoDB connection closed');
          process.exit(0);
        });
      });
    });

    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        mongoose.connection.close().then(() => {
          console.log('✅ MongoDB connection closed');
          process.exit(0);
        });
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('💥 Uncaught Exception:', err);
      console.log('🛑 Shutting down due to uncaught exception...');
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: any) => {
      console.error('💥 Unhandled Rejection:', err);
      console.log('🛑 Shutting down due to unhandled promise rejection...');
      server.close(() => {
        process.exit(1);
      });
    });

  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Initialize database connection (non-blocking for development)
if (process.env.NODE_ENV !== 'development') {
  initializeDatabase().catch((error) => {
    console.error('💀 Failed to initialize database:', error);
    console.log('❌ Production mode requires database connection');
    process.exit(1);
  });
} else {
  console.log('� Development mode: Starting without database requirement');
  initializeDatabase().catch((error) => {
    console.error('⚠️  Database connection failed in development:', error.message);
    console.log('🔄 Server continuing without database connection');
  });
}