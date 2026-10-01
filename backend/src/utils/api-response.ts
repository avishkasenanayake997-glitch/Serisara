import { Response } from 'express';
import type { PaginationMeta } from '@serisara/shared';

// ============================================================
// Standardized API Response Helper
// ============================================================

export class ApiResponse {
  static success<T>(res: Response, message: string, data: T, meta?: PaginationMeta): Response {
    return res.status(200).json({
      success: true,
      message,
      data,
      ...(meta && { meta }),
    });
  }

  static created<T>(res: Response, message: string, data: T): Response {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static error(
    res: Response,
    statusCode: number,
    message: string,
    errors?: Array<{ field: string; message: string }>
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
    });
  }
}
