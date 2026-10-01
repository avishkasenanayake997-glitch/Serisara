import { apiClient } from './api-client';
import type { Profile, UserRole, PaginationMeta } from '@serisara/shared';

export interface UserListParams {
  [key: string]: string | number | boolean | undefined;
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
}

export const adminUserService = {
  async listUsers(params?: UserListParams): Promise<{ users: Profile[]; meta?: PaginationMeta }> {
    const res = await apiClient.get<Profile[]>('/admin/users', { params });
    return { users: res.data, meta: res.meta };
  },

  async getUser(id: string): Promise<Profile> {
    const res = await apiClient.get<Profile>(`/admin/users/${id}`);
    return res.data;
  },

  async updateRole(id: string, role: UserRole): Promise<Profile> {
    const res = await apiClient.patch<Profile>(`/admin/users/${id}/role`, { role });
    return res.data;
  },

  async updateStatus(id: string, isActive: boolean): Promise<Profile> {
    const res = await apiClient.patch<Profile>(`/admin/users/${id}/status`, { isActive });
    return res.data;
  },
};
