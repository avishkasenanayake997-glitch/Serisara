import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/api-error';
import type { UserRole } from '@serisara/shared';

// ============================================================
// Role-Based Access Control Middleware
// ============================================================

export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError(`This action requires one of the following roles: ${roles.join(', ')}`));
    }

    next();
  };
}
