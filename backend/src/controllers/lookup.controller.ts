import { Request, Response, NextFunction } from 'express';
import { lookupRepository } from '../repositories/lookup.repository';
import { ApiResponse } from '../utils/api-response';

// ============================================================
// Lookup Controller
// ============================================================

export class LookupController {
  async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const type = req.query.type as 'destination' | 'experience' | 'both' | undefined;
      const categories = await lookupRepository.getCategories(type);
      ApiResponse.success(res, 'Categories retrieved successfully', categories);
    } catch (error) {
      next(error);
    }
  }

  async getRegions(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const regions = await lookupRepository.getRegions();
      ApiResponse.success(res, 'Regions retrieved successfully', regions);
    } catch (error) {
      next(error);
    }
  }

  async getAmenities(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const amenities = await lookupRepository.getAmenities();
      ApiResponse.success(res, 'Amenities retrieved successfully', amenities);
    } catch (error) {
      next(error);
    }
  }
}

export const lookupController = new LookupController();
