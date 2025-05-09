import { Request, Response, NextFunction } from 'express';
import { PrismaClient, UserRole } from '@prisma/client';
import jwt from 'jsonwebtoken';

// Environment variables
const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        username: string;
        email?: string;
        role: UserRole;
      };
    }
  }
}

class AuthMiddleware {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Middleware to authenticate requests
   */
  authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Get token from the Authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
      }

      // Check if the header has the correct format
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({
          message: 'Invalid authorization format, use "Bearer [token]"',
        });
        return;
      }

      const token = parts[1];

      try {
        // Fix: Properly type the secret key for verification
        const decoded = jwt.verify(token, JWT_SECRET) as {
          userId: string;
          username: string;
          email?: string;
          role: UserRole;
        };

        // Add user data to request
        req.user = {
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
        };

        // Verify the user exists and is active
        const user = await this.prisma.user.findUnique({
          where: { userId: decoded.userId },
          select: { isActive: true },
        });

        if (!user || !user.isActive) {
          res.status(401).json({ message: 'Account is inactive or not found' });
          return;
        }

        next();
      } catch (error) {
        console.warn('Token validation failed:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
      }
    } catch (error) {
      console.error('Authentication middleware error:', error);
      res
        .status(500)
        .json({ message: 'Internal server error during authentication' });
      return;
    }
  };

  /**
   * Middleware to check if user has required role
   */
  isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      if (req.user.role !== UserRole.ADMIN) {
        res.status(403).json({ message: 'Admin access required' });
        return;
      }

      next();
    } catch (error) {
      console.error('Admin authorization error:', error);
      res
        .status(500)
        .json({ message: 'Internal server error during authorization' });
      return;
    }
  };

  /**
   * Middleware for client access
   */
  isClient = (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      if (
        req.user.role !== UserRole.CLIENT &&
        req.user.role !== UserRole.ADMIN
      ) {
        res.status(403).json({ message: 'Client access required' });
        return;
      }

      next();
    } catch (error) {
      console.error('Client authorization error:', error);
      res
        .status(500)
        .json({ message: 'Internal server error during authorization' });
      return;
    }
  };
}

export default new AuthMiddleware();
