import { supabaseAdmin } from '../config/supabase';
import { Profile, UserRole } from '@serisara/shared';
import { DatabaseError, NotFoundError } from '../utils/api-error';

// ============================================================
// User / Profile Repository
// ============================================================

export class UserRepository {
  async findById(id: string): Promise<Profile | null> {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new DatabaseError(`Failed to fetch user profile: ${error.message}`);
    }

    return data as Profile;
  }

  async update(id: string, updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<Profile> {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new DatabaseError(`Failed to update profile: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundError('User profile not found');
    }

    return data as Profile;
  }

  async findAll(options: {
    page: number;
    limit: number;
    search?: string;
    role?: UserRole;
    isActive?: boolean;
  }): Promise<{ profiles: Profile[]; total: number }> {
    const { page, limit, search, role, isActive } = options;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('full_name', `%${search}%`);
    }

    if (role) {
      query = query.eq('role', role);
    }

    if (isActive !== undefined) {
      query = query.eq('is_active', isActive);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      throw new DatabaseError(`Failed to fetch users: ${error.message}`);
    }

    return {
      profiles: (data || []) as Profile[],
      total: count || 0,
    };
  }

  async updateRole(id: string, role: UserRole): Promise<Profile> {
    return this.update(id, { role });
  }

  async updateStatus(id: string, isActive: boolean): Promise<Profile> {
    return this.update(id, { is_active: isActive });
  }
}

export const userRepository = new UserRepository();
