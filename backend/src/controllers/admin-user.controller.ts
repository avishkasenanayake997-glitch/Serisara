import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../repositories/user.repository';
import { ApiResponse } from '../utils/api-response';
import { NotFoundError } from '../utils/api-error';
import { buildPaginationMeta } from '../utils/pagination';
import type { UserRole } from '@serisara/shared';

// ============================================================
// Admin User Management Controller
// ============================================================

export class AdminUserController {
  async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const search = req.query.search as string | undefined;
      const role = req.query.role as UserRole | undefined;
      const isActive = req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined;

      const { profiles, total } = await userRepository.findAll({
        page,
        limit,
        search,
        role,
        isActive,
      });

      const meta = buildPaginationMeta(page, limit, total);
      ApiResponse.success(res, 'Users retrieved successfully', profiles, meta);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const profile = await userRepository.findById(id);

      if (!profile) {
        throw new NotFoundError('User profile not found');
      }

      ApiResponse.success(res, 'User retrieved successfully', profile);
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const { role } = req.body as { role: UserRole };

      const profile = await userRepository.updateRole(id, role);
      ApiResponse.success(res, `User role updated to ${role}`, profile);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const { isActive } = req.body as { isActive: boolean };

      const profile = await userRepository.updateStatus(id, isActive);
      ApiResponse.success(
        res,
        `User account ${isActive ? 'activated' : 'deactivated'} successfully`,
        profile
      );
    } catch (error) {
      next(error);
    }
  }
}

export const adminUserController = new AdminUserController();
