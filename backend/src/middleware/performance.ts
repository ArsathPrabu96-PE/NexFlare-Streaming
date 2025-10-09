import { Request, Response, NextFunction } from 'express';

interface PerformanceRequest extends Request {
  startTime?: number;
}

export const performanceMonitor = (req: PerformanceRequest, res: Response, next: NextFunction) => {
  req.startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - (req.startTime || 0);
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    
    if (duration > 1000) {
      console.warn(`Slow request detected: ${req.method} ${req.path} took ${duration}ms`);
    }
  });
  
  next();
};

export const rateLimitByUser = (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
  const requests = new Map();
  
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = req.ip;
    const now = Date.now();
    
    if (!requests.has(userId)) {
      requests.set(userId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const userRequests = requests.get(userId);
    
    if (now > userRequests.resetTime) {
      requests.set(userId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (userRequests.count >= maxRequests) {
      return res.status(429).json({ message: 'Too many requests' });
    }
    
    userRequests.count++;
    next();
  };
};