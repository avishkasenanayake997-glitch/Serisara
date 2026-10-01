import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateProfileSchema } from '@serisara/shared';

// ============================================================
// Auth Routes
// ============================================================

const router = Router();

// All auth routes require an active authenticated user session
router.use(authMiddleware);

router.get('/me', (req, res, next) => authController.getMe(req, res, next));
router.patch('/profile', validate(updateProfileSchema), (req, res, next) => authController.updateProfile(req, res, next));
router.post('/avatar', (req, res, next) => authController.updateAvatar(req, res, next));

export default router;
