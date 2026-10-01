import { supabaseAdmin } from '../config/supabase';
import { REGIONS, CATEGORIES, AMENITIES } from '@serisara/shared';

// ============================================================
// Lookup Repository (Categories, Regions, Amenities)
// ============================================================

export class LookupRepository {
  async getCategories(type?: 'destination' | 'experience' | 'both') {
    try {
      let query = supabaseAdmin.from('categories').select('*').order('name');
      if (type && type !== 'both') {
        query = query.or(`type.eq.${type},type.eq.both`);
      }
      const { data, error } = await query;
      if (error || !data || data.length === 0) {
        return CATEGORIES;
      }
      return data;
    } catch {
      return CATEGORIES;
    }
  }

  async getRegions() {
    try {
      const { data, error } = await supabaseAdmin.from('regions').select('*').order('name');
      if (error || !data || data.length === 0) {
        return REGIONS;
      }
      return data;
    } catch {
      return REGIONS;
    }
  }

  async getAmenities() {
    try {
      const { data, error } = await supabaseAdmin.from('amenities').select('*').order('name');
      if (error || !data || data.length === 0) {
        return AMENITIES;
      }
      return data;
    } catch {
      return AMENITIES;
    }
  }
}

export const lookupRepository = new LookupRepository();
