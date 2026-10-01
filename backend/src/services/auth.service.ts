import { userRepository } from '../repositories/user.repository';
import { Profile, UpdateProfileInput } from '@serisara/shared';
import { NotFoundError } from '../utils/api-error';

// ============================================================
// Auth & Profile Service
// ============================================================

export class AuthService {
  async getProfile(userId: string): Promise<Profile> {
    const profile = await userRepository.findById(userId);
    if (!profile) {
      throw new NotFoundError('User profile not found');
    }
    return profile;
  }

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<Profile> {
    const updates: Record<string, unknown> = {};

    if (input.fullName !== undefined) updates.full_name = input.fullName;
    if (input.bio !== undefined) updates.bio = input.bio;
    if (input.phone !== undefined) updates.phone = input.phone;
    if (input.country !== undefined) updates.country = input.country;
    if (input.avatarUrl !== undefined) updates.avatar_url = input.avatarUrl;

    return userRepository.update(userId, updates);
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<Profile> {
    return userRepository.update(userId, { avatar_url: avatarUrl });
  }
}

export const authService = new AuthService();
