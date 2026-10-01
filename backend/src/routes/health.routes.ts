import { Router, Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response';

// ============================================================
// Health Check Route
// ============================================================

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  ApiResponse.success(res, 'Serisara API is running', {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

export default router;
