import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { UnauthorizedError, ForbiddenError } from '../utils/api-error';
import { logger } from '../config/logger';
import type { AuthUser } from '@serisara/shared';

// ============================================================
// Extend Express Request with user
// ============================================================

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      token?: string;
    }
  }
}

// ============================================================
// Authentication Middleware
// ============================================================
// Verifies the JWT from the Authorization header using Supabase Admin

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Missing or invalid authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify the token with Supabase
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      logger.warn('Auth middleware: Invalid token', { error: error?.message });
      throw new UnauthorizedError('Invalid or expired token');
    }

    // Fetch the user's profile for role information
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role, is_active')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      logger.warn('Auth middleware: Profile not found', { userId: user.id });
      throw new UnauthorizedError('User profile not found');
    }

    if (!profile.is_active) {
      throw new ForbiddenError('Account has been deactivated');
    }

    // Attach user info to the request
    req.user = {
      id: user.id,
      email: user.email!,
      role: profile.role,
    };
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
}

// ============================================================
// Optional Auth Middleware
// ============================================================
// Attaches user if token present, but doesn't require it

export async function optionalAuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.replace('Bearer ', '');

    const {
      data: { user },
    } = await supabaseAdmin.auth.getUser(token);

    if (user) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('role, is_active')
        .eq('id', user.id)
        .single();

      if (profile && profile.is_active) {
        req.user = {
          id: user.id,
          email: user.email!,
          role: profile.role,
        };
        req.token = token;
      }
    }

    next();
  } catch {
    // If token verification fails, continue without user
    next();
  }
}
