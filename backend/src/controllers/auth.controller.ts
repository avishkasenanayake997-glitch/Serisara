import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { ApiResponse } from '../utils/api-response';
import { UpdateProfileInput } from '@serisara/shared';

// ============================================================
// Auth Controller
// ============================================================

export class AuthController {
  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await authService.getProfile(req.user!.id);
      ApiResponse.success(res, 'Profile retrieved successfully', {
        user: {
          id: req.user!.id,
          email: req.user!.email,
          role: req.user!.role,
        },
        profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = req.body as UpdateProfileInput;
      const profile = await authService.updateProfile(req.user!.id, input);
      ApiResponse.success(res, 'Profile updated successfully', profile);
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { avatarUrl } = req.body;
      const profile = await authService.updateAvatar(req.user!.id, avatarUrl);
      ApiResponse.success(res, 'Avatar updated successfully', profile);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
