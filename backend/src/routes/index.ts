import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import adminUserRoutes from './admin-user.routes';
import lookupRoutes from './lookup.routes';

// ============================================================
// Route Aggregator
// ============================================================
// All API routes are registered here under /api/v1

const router = Router();

// Health check
router.use('/health', healthRoutes);

// Auth & Profile
router.use('/auth', authRoutes);

// Admin User Management
router.use('/admin/users', adminUserRoutes);

// Lookup Data (Categories, Regions, Amenities)
router.use('/', lookupRoutes);
// router.use('/webhooks', webhookRoutes);

export default router;
