import { Router } from 'express';
import { lookupController } from '../controllers/lookup.controller';

// ============================================================
// Public Lookup Routes (Categories, Regions, Amenities)
// ============================================================

const router = Router();

router.get('/categories', (req, res, next) => lookupController.getCategories(req, res, next));
router.get('/regions', (req, res, next) => lookupController.getRegions(req, res, next));
router.get('/amenities', (req, res, next) => lookupController.getAmenities(req, res, next));

export default router;
