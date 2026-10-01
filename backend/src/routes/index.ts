import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import adminUserRoutes from './admin-user.routes';

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
// router.use('/destinations', destinationRoutes);
// router.use('/accommodations', accommodationRoutes);
// router.use('/experiences', experienceRoutes);
// router.use('/reviews', reviewRoutes);
// router.use('/favorites', favoriteRoutes);
// router.use('/trips', tripRoutes);
// router.use('/bookings', bookingRoutes);
// router.use('/inquiries', inquiryRoutes);
// router.use('/upload', uploadRoutes);
// router.use('/search', searchRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/regions', regionRoutes);
// router.use('/amenities', amenityRoutes);
// router.use('/webhooks', webhookRoutes);

export default router;
