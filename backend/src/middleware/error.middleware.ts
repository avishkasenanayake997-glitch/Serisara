import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { logger } from '../config/logger';
import { env } from '../config/env';

// ============================================================
// Global Error Handling Middleware
// ============================================================
// Must be registered LAST in the middleware chain

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Log the error
  logger.error('Unhandled error', {
    error: err.message,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    userId: req.user?.id,
  });

  // Known application errors
  if (err instanceof AppError) {
    ApiResponse.error(res, err.statusCode, err.message, err.errors);
    return;
  }

  // Zod validation errors (if they somehow bypass the validate middleware)
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    ApiResponse.error(res, 400, 'Validation failed', errors);
    return;
  }

  // Unknown errors — don't leak details in production
  const message =
    env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message || 'Internal server error';

  ApiResponse.error(res, 500, message);
}
