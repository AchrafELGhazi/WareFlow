import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';

export const verifyRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      if (!roles.includes(req.user.role)) {
        res.status(403).json({
          message: `Access denied. Required role: ${roles.join(' or ')}`,
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Role verification error:', error);
      res.status(500).json({
        message: 'Internal server error during authorization',
      });
    }
  };
};
