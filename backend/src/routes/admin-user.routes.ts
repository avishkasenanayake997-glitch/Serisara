import { Router } from 'express';
import { adminUserController } from '../controllers/admin-user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateRoleSchema, updateStatusSchema } from '@serisara/shared';

// ============================================================
// Admin User Management Routes
// ============================================================

const router = Router();

// Only system administrators can access these endpoints
router.use(authMiddleware, requireRole('admin'));

router.get('/', (req, res, next) => adminUserController.listUsers(req, res, next));
router.get('/:id', (req, res, next) => adminUserController.getUser(req, res, next));
router.patch('/:id/role', validate(updateRoleSchema), (req, res, next) => adminUserController.updateRole(req, res, next));
router.patch('/:id/status', validate(updateStatusSchema), (req, res, next) => adminUserController.updateStatus(req, res, next));

export default router;
