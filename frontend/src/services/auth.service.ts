import { apiClient } from './api-client';
import type { Profile, UpdateProfileInput } from '@serisara/shared';

export interface MeResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  profile: Profile;
}

export const authApiService = {
  async getMe(): Promise<MeResponse> {
    const res = await apiClient.get<MeResponse>('/auth/me');
    return res.data;
  },

  async updateProfile(data: UpdateProfileInput): Promise<Profile> {
    const res = await apiClient.patch<Profile>('/auth/profile', data);
    return res.data;
  },

  async updateAvatar(avatarUrl: string): Promise<Profile> {
    const res = await apiClient.post<Profile>('/auth/avatar', { avatarUrl });
    return res.data;
  },
};
